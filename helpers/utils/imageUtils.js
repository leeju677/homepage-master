import html2canvas from "html2canvas";
var methods = {
  binaryToImage(binaryData) {
    // return 'data:image/jpeg;base64,' + binaryData;
    return "data:image/jpeg;base64," + binaryData;
  },
  hexToBase64(str) {
    return btoa(
      String.fromCharCode.apply(
        null,
        str
          .replace(/\r|\n/g, "")
          .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
          .replace(/ +$/, "")
          .split(" ")
      )
    );
  },

  /**
   * html 내의 ref내역들을 base64로 전환
   * @param {*} ref
   * @returns
   */
  htmlToBase64(
    ref
  ) {
    return new Promise((resolve, reject) => {
      try {
        html2canvas(ref.$el).then((canvas) => {
          var imgURI = canvas.toDataURL();
          resolve(imgURI);
        });
      } catch (err) {
        console.log(err);
        reject("err");
      }
    });
  },
  /**
   * url or file type을 Base64로 return
   * @param {*} file
   * @param {*} maxWidth
   * @param {*} maxHeight
   * @returns base64
   */
  imageEncodeToBase64 (file, maxWidth=200, maxHeight=200) {
    let src = ''
    if (typeof file === 'string') {
      src = file
    } else {
      src = URL.createObjectURL(file)
    }
    return new Promise((resolve, reject) => {
      let image = new Image()
      image.onload = function (event) {
        let canvas = document.createElement('canvas')
        canvas.width = (image.naturalWidth > maxWidth) ? maxWidth : image.naturalWidth
        canvas.height = (image.naturalWidth > maxHeight) ? maxHeight : image.naturalHeight
        canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height)
        resolve(canvas)
      }
      image.crossOrigin = 'Anonymous';
      image.src = src
    })
  }
};

export default methods;
