import { axiosInstanceCredentials } from "@/store/index";

var methods = {
  async readPageTest(perPage, currentPage, searchType, search, sortDir, sortBy) {
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .get("/agile/menu", {
          params: {
          },
        })
        .then((resp) => {
          if (resp.status == 200 && resp.data.returnCode == "S") {
            console.log(resp);
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

  async readPage(perPage, currentPage, searchType, search, sortDir, sortBy) {
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .get("/agile/menu", {
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
            console.log(resp.data.data);
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

  async create(menu) {
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .post("/agile/menu", {
          "parantMenuId": menu.parantMenuId,
          "menuOrder": menu.menuOrder,
          "menuLevel": menu.menuLevel,
          "menuName": menu.menuName,
          "icon": menu.icon,
          "resUrl": menu.resUrl,
          "resNm": menu.resNm,
          "roleId":  menu.roleId,
          "resId": menu.resId
        })
        .then((resp) => {
          if (resp.status == 200 && resp.data.returnCode == "S") {
            console.log(resp);
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

  async edit(menu) {
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .post(
          "/agile/menu/" + menu.menuId,
          {
            //"parantMenuId": menu.parantMenuId,
            //"menuOrder": menu.menuOrder,
            //"menuLevel": menu.menuLevel,
            "menuName": menu.menuName,
            //"icon": menu.icon,
            //"resUrl": menu.resUrl,
            //"resNm": menu.resNm,
            //"roleId":  menu.roleId,
            //"resId": menu.resId
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
        .delete("/agile/menu/" + index)
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
