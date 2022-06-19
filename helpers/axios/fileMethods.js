import { axiosInstanceCredentials } from "@/store/index";
const FileDownload = require('js-file-download');


var methods = {

  async download(fileSeq, fileDtlSeq, fileName) {
    return await new Promise((resolve, reject) => {
      axiosInstanceCredentials
        .get("/agile/file/down", {
          params: {
            fileSeq,
            fileDtlSeq,
          },
          responseType: 'blob',
        })
        .then((resp) => {
          // console.log(resp);
          FileDownload(resp.data, fileName);
          // resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

};

export default methods;
