import jsPDF from "jspdf";
import "jspdf-autotable";
import dateUtils from "./dateUtils";
import fontUtils from "./fontUtils";

var pageHeight = 0;
var pageWidth = 0;
let paegDefaultYPos = 15;
let paegDefaultXPos = 15;
let pageDefaultImageWidth = 100;
let pageDefaultImageHeight = 100;
let pageDefaultTableHeadStyle = { halign: "center", valign: "middle" };
let pageDefaultTablestyles = { font: "NotoSans-Regular", fontStyle: "normal" };

var methods = {
  async jsonToPdf(pdfDataList, fileNm) {
    try {
      $nuxt.$loading.start();
      var doc = this.createPdf();
      this.setPdfFont(doc);

      pageHeight =
        doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
      pageWidth =
        doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

      await this.addCover(doc, fileNm);
      doc.page = 1;
      await this.createContent(doc, pdfDataList);
      await this.setFooter(doc);
      await this.downloadPdf(doc, fileNm);
    } catch (err) {
      console.log(err);
    } finally {
      $nuxt.$loading.finish();
    }
  },

  createPdf() {
    return new jsPDF("p", "mm", "a4");
  },

  downloadPdf(doc, fileNm) {
    doc.save(dateUtils.getDateWithLabel(0, fileNm) + ".pdf");
  },

  createContent(doc, pdfDataList) {
    return new Promise(function (resolve, reject) {
      try {
        pdfDataList.forEach((pdfData) => {
          doc.addPage();
          var yPos = paegDefaultYPos;
          var xPos = paegDefaultXPos;
          var titleLineHeight = doc.getLineHeight(pdfData.title);
          doc.text(yPos, xPos, "■ " + pdfData.title);
          yPos += titleLineHeight;
          pdfData.body.forEach((bodyData) => {
            if (bodyData[0] == "text") {
              var lineHeight = doc.getLineHeight(bodyData[1]);
              var splittedText = doc.splitTextToSize(
                bodyData[1],
                pageWidth - 40
              );
              var lines = splittedText.length;
              var blockHeight = lines * lineHeight;
              if (yPos + blockHeight >= pageHeight) {
                yPos = paegDefaultYPos;
                doc.addPage();
              }
              doc.text(xPos, yPos, splittedText);
              if (yPos + blockHeight >= pageHeight) {
                yPos = paegDefaultYPos;
                doc.addPage();
              } else {
                yPos = yPos + blockHeight;
              }
            } else if (bodyData[0] == "img") {
              if (yPos + pageDefaultImageWidth >= pageHeight) {
                yPos = paegDefaultYPos;
                doc.addPage();
              }
              doc.addImage(
                bodyData[1],
                "JPEG",
                xPos,
                yPos,
                pageDefaultImageWidth,
                pageDefaultImageHeight
              );
              if (yPos + pageDefaultImageWidth >= pageHeight) {
                yPos = paegDefaultYPos;
                doc.addPage();
              } else {
                yPos = yPos + pageDefaultImageWidth + 20;
              }
            } else if (bodyData[0] == "table") {
              doc.autoTable({
                headStyles: pageDefaultTableHeadStyle,
                startX: paegDefaultXPos,
                startY: yPos,
                margin: { left: 10, top: 20, right: 10 },
                tableWidth: pageWidth - 20,
                styles: pageDefaultTablestyles,
                head: [bodyData[1].head],
                body: bodyData[1].body,
              });
              if (doc.lastAutoTable.finalY >= pageHeight) {
                yPos = paegDefaultYPos;
                doc.addPage();
              } else {
                yPos = doc.lastAutoTable.finalY + 20;
              }
            }
          });
        });
        resolve(200);
      } catch (err) {
        reject(err);
      }
    });
  },

  //
  //var pageHeight = 0;
  //var pageWidth = 0;
  setFooter(doc) {
    return new Promise(function (resolve, reject) {
      try {
        const pageCount = doc.internal.getNumberOfPages();
        for (var i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.text(
            String(i) + " / " + String(pageCount),
            pageWidth / 2,
            pageHeight - 10,
            null,
            null,
            "center"
          );
        }
        resolve(200);
      } catch (err) {
        reject(err);
      }
    });
  },

  setPdfFont(doc) {
    doc.addFileToVFS("NotoSans-Regular-normal.ttf", fontUtils.getNanumGothic()); //_fonts 변수는 Base64 형태로 변환된 내용입니다.
    doc.addFont("NotoSans-Regular-normal.ttf", "NotoSans-Regular", "normal");
    doc.setFont("NotoSans-Regular");
  },

  addCover(doc, fileNm) {
    return new Promise(function (resolve, reject) {
      try {
        doc.setFontSize(22);
        doc.text(fileNm + "보고서", pageWidth / 2, 40, { align: "center" });
        doc.setFontSize(16);
        doc.text("보고서 작성일 : " + dateUtils.getTodayToStr(), 190, 200, {
          align: "right",
        });
        doc.text("사용자 : ", 190, 220, { align: "right" });
        resolve(200);
      } catch (err) {
        reject(err);
      }
    });
  },
};

export default methods;
