var methods = {

  getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  },

  isImage(filename) {
    var ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg ':
      case 'gif':
      case 'bmp':
      case 'png':
      case 'webp':
        //etc
        return true;
    }
    return false;
  },

  isVideo(filename) {
    var ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'm4v':
      case 'avi':
      case 'mpg':
      case 'mp4':
      case 'mov':
      case 'wmv':
      case 'flv':
      case 'f4v':
      case 'swf':
      case 'web':
        // etc
        return true;
    }
    return false;
  },

  isFileSizeLimit(fileSize, limit = 5 * 1024 * 1024){
    if( fileSize < limit)
      return false;
    return true;
  }
};

export default methods;
