import { axiosInstanceCredentials } from "@/store/index";

var methods = {
  async readPage(perPage, currentPage, type, key, sortDir, sortBy) {
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .get("/agile/lang", {
          params: {
            offset: currentPage,
            rowCount: perPage,
            type: type,
            key: key,
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

  async create(data) {
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .post("/agile/lang", data)
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

  async edit(data) {
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .post(
          "/agile/lang/" + data.langId,
          {
            key: data.key,
            value: data.value,
            type: data.type
          }
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
        .delete("/agile/lang/" + index)
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
};

export default methods;
