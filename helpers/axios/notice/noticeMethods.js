import { axiosInstanceCredentials } from "@/store/index";

var methods = {
  async readPage(perPage, currentPage, searchType, search, sortDir, sortBy) {
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .get("/agile/notice", {
          params: {
            offset: currentPage,
            rowCount: perPage,
            [searchType] : search,
            sortDir : sortDir,
            sortBy : sortBy
          },
        })
        .then((resp) => {
          if (resp.status == 200 && resp.data.returnCode == "S") {
            resolve(resp.data.data);
          } else {
            reject(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async read(seq) {
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .get("/agile/notice/" + seq)
        .then((resp) => {
          if (resp.status == 200 && resp.data.returnCode == "S") {
            resolve(resp.data.data);
          } else {
            reject(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async create(notice) {
    var formData = new FormData();
    formData.append("title", notice.title);
    formData.append("sbst", notice.sbst);
    formData.append("cretId", notice.cretId);
    formData.append("amtId", notice.amtId);
    formData.append("file", notice.uploadFiles);

    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .post("/agile/notice", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          if (resp.status == 200 && resp.data.returnCode == "S") {
            resolve(resp.data);
          } else {
            reject(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async readDetail(index) {
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .get("/agile/notice", {
          params: {
            limit: index,
          },
        })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async edit(notice) {
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .post(
          "/agile/notice/" + notice.seq,
          {
            title: notice.title,
            sbst: notice.sbst,
            //cretId: notice.cretId,
            amtId: notice.cretId
          }
          // , {
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //   },
          // }
        )
        .then((resp) => {
          if (resp.status == 200 && resp.data.returnCode == "S") {
            resolve(resp.data);
          } else {
            reject(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async delete(index) {
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .delete("/agile/notice/" + index)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default methods;
