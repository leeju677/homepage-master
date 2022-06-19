var methods = {
  showToast({
    vm,
    message,
    position = "right-top",
    type = "info",
    isDefault = false
  }) {
    if (isDefault == true) {
      this.showToastDefault(vm, message, position, type);
    } else {
      this.showToastCustom(vm, message, position, type);
    }
  },
  showToastDefault(vm, message, position, type) {
    var vmToast = vm.$toasted[type];
    if (typeof vmToast === "function") {
      vmToast(message, {
        action: {
          text: "Cancel",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
        position: position,
      }).goAway(1500);
    } else {
      // @TODO
    }
  },

  showToastCustom(vm, message, position, type) {
    type = "global_toast_" + type;
    var vmToast = vm.$toasted.global[type];
    if (typeof vmToast === "function") {
      vmToast({
        message: message,
      }).goAway(1500);
    } else {
      // @TODO
    }
  },
};

export default methods;
