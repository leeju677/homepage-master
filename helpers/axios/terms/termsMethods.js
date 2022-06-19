import { axiosInstanceCredentials, KApi } from "@/store/index";

var methods = {
  readPage() {
    let res = KApi.get("/agile/term", {});
    return res;
    /*
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .get("/agile/term", {
          params: {},
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
    */
  },

  async read(id) {
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .get("/agile/term/" + id)
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

  async create(term) {
    var formData = new FormData();

    formData.append("subject", term.subject);
    formData.append("content", term.content);
    formData.append("required", term.required);
    formData.append("type", term.type);
    formData.append("useYn", term.useYn);
    formData.append("cretId", term.cretId);
    formData.append("amtId", term.amtId);

    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .post("/agile/term", formData, {
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
        .get("/agile/term", {
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

  async edit(term) {
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .post(
          "/agile/term/" + term.seq,
          {
            title: term.title,
            sbst: term.sbst,
            //cretId: term.cretId,
            amtId: term.cretId
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
        .delete("/agile/term/" + index)
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
