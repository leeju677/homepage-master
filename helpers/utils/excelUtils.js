import ExcelJS from "exceljs";
import dateUtils from "./dateUtils";
import stringUtils from "./stringUtils";

const options = {
  filename: "./streamed-workbook.xlsx",
  useStyles: true,
  useSharedStrings: true,
};

const styleAlignmentCenter = {
  vertical: "middle",
  horizontal: "center",
};
const styleAlignmentWarptext = {
  wrapText: true,
  vertical: "middle",
};

const styleFontBold = {
  bold: true,
};

const styleThin = {
  top: { style: "thin" },
  left: { style: "thin" },
  bottom: { style: "thin" },
  right: { style: "thin" },
};

const defaultHeaderCellFill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "4167B8" },
  bgColor: { argb: "" },
};

const defaultHeaderCellFont = {
  bold: true,
  color: { argb: "FFFFFF" },
  size: 12,
};

const defaultRowIntervalSize = 5;
var methods = {
  async jsonToExcel(excelDataList, title) {
    try {
      $nuxt.$loading.start();
      const workbook = this.createExcel();
      let fileNm = dateUtils.getDateWithLabel(0, title) + ".xlsx";
      await this.addCover(workbook, title);
      await this.addContent(
        workbook,
        excelDataList,
        this.headerRowStyle,
        this.setColumnAdjustmentLength,
        this.addCanvas
      );
      await this.downloadExcel(workbook, fileNm);
    } catch (err) {
      // @TODO reject.
      console.log(err);
    } finally {
      $nuxt.$loading.finish();
    }
  },

  createExcel() {
    try {
      const workbook = new ExcelJS.Workbook(options);
      workbook.created = new Date();
      workbook.modified = new Date();
      return workbook;
    } catch (err) {
      console.log(err);
    }
  },

  setColumnAdjustmentLength(worksheet, colLengthStand = 55) {
    worksheet.columns.forEach(function (column, i) {
      if (i !== 0) {
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, function (cell) {
          if (cell.value == null) {
            cell.value = "";
          }
          let cellStr = cell.value.toString();
          let cellLength = 0;

          //줄바꿈 ('\n)이 있는 경우, 제일 큰 바이트의 문장을 열의 길이로 사용
          if (cellStr.includes("\n")) {
            let strVal = cellStr.split("\n");
            strVal.forEach((data) => {
              let strByte = data
                .split("")
                .map((s) => s.charCodeAt(0))
                .reduce((prev, c) => prev + (c === 10 ? 2 : c >> 7 ? 2 : 1), 0);

              if (strByte > cellLength) {
                cellLength = strByte;
              }
            });
          } else {
            cellLength = cellStr
              .split("")
              .map((s) => s.charCodeAt(0))
              .reduce((prev, c) => prev + (c === 10 ? 2 : c >> 7 ? 2 : 1), 0);
          }
          if (cellLength > colLengthStand) {
            cellLength = colLengthStand;
          }
          if (cellLength > maxLength) {
            maxLength = cellLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength * 1.25;
      }
    });
  },

  addContent(
    workbook,
    excelDataList,
    headerRowStyle,
    setColumnAdjustmentLength,
    addCanvas
  ) {
    return new Promise(function (resolve, reject) {
      try {
        excelDataList.forEach((excelData) => {
          let worksheet = workbook.getWorksheet(excelData.sheetName);
          if (worksheet == undefined || worksheet == null || worksheet == "") {
            worksheet = workbook.addWorksheet(excelData.sheetName);
          } else {
            for (var i = 0; i < defaultRowIntervalSize; i++) {
              worksheet.addRow([]);
            }
          }
          if (!stringUtils.isEmptyBool(excelData.title)) {
            let titleRow = worksheet.addRow(["■ " + excelData.title]);
          }

          let headerRow = worksheet.addRow(excelData.header);
          let headerRowCount = headerRow.cellCount;
          headerRowStyle(headerRow);
          headerRow.eachCell((cell, number) => {
            cell.fill = defaultHeaderCellFill;
            cell.font = defaultHeaderCellFont;
          });

          if (excelData.type == "text") {
            excelData.body.forEach((excelDataRow) => {
              let row = worksheet.addRow(Object.values(excelDataRow));
              for (var i = 1; i <= headerRowCount; i++) {
                row.getCell(i).border = styleThin;
                row.getCell(i).alignment = styleAlignmentWarptext;
              }
            });
            setColumnAdjustmentLength(worksheet);
          } else if (excelData.type == "img") {
            excelData.body.forEach((excelDataRow) => {
              excelDataRow.forEach((img) => {
                let imgRow = worksheet.addRow([]);
                addCanvas(img, workbook, worksheet, worksheet.rowCount);
              });
            });
          }
        });
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  },

  // 표지 제작
  addCover(workbook, title) {
    return new Promise(function (resolve, reject) {
      try {
        const coverSheet = workbook.addWorksheet("표지");
        // cell 정합
        coverSheet.mergeCells("B5:J7");
        coverSheet.getCell("B5").value = title + " 보고서";
        //cell에 음영 넣기.
        coverSheet.getCell("B5").fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ff0000 " },
          bgColor: { argb: "" },
        };
        coverSheet.getCell("B5").font = {
          bold: true,
          color: { argb: "FFFFFF" },
          size: 16,
        };

        coverSheet.mergeCells("G10:J10");
        coverSheet.getCell("G10").value =
          "보고서 작성일 : " + dateUtils.getTodayToStr();
        coverSheet.getCell("G10").font = {
          bold: true,
          size: 12,
        };
        coverSheet.mergeCells("G11:J11");
        coverSheet.getCell("G11").value = "사용자 : ";
        coverSheet.getCell("G11").font = {
          bold: true,
          size: 12,
        };
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  },

  addCanvas(
    canvas,
    workbook,
    graphworksheet,
    columnS,
    columnInterval = 20,
    rowS = 'A',
    rowE = 'G',
  ) {
    return new Promise((resolve, reject) => {
      try {
        var cells = rowS + columnS + ":" + rowE + (columnS + columnInterval); //'A1:G5';
        graphworksheet.mergeCells(cells);
        //workbook.xlsx.readFile("image.xlsx");
        let img = workbook.addImage({
          base64: canvas,
          extension: "png",
        });
        columnS = columnS + 2 * columnInterval;
        graphworksheet.addImage(img, cells);
        resolve(true);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  },

  headerRowStyle(row) {
    row.eachCell((cell, number) => {
      (cell.alignment = styleAlignmentCenter),
        (cell.border = styleThin),
        (cell.font = styleFontBold);
    });
  },

  bodyRowStyle(row) {
    row.eachCell((cell, number) => {
      cell.border = styleThin;
    });
  },

  downloadExcel(workbook, fileName) {
    new Promise((resolve, reject) => {
      workbook.xlsx
        .writeBuffer()
        .then(function (data) {
          let a = new Blob([data]);
          let url = window.URL.createObjectURL(a);
          let elem = document.createElement("a");
          elem.href = url;
          elem.download = fileName;
          document.body.appendChild(elem);
          elem.style = "display: none";
          elem.click();
          elem.remove();
          resolve(true);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
          // reject(this._handleError(error));
        });
    });
  },
  getByte(str) {
    return str
      .split("")
      .map((s) => s.charCodeAt(0))
      .reduce((prev, c) => prev + (c === 10 ? 2 : c >> 7 ? 2 : 1), 0);
  },
};

export default methods;
