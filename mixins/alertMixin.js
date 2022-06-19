import Vue from 'vue'
const methods = {
    Alert(title, contents, options, callback) {
        let size = '';
        let buttonSize = 'sm';
        let okVariant = 'success';
        let headerClass = 'p-2 border-bottom-0';
        let footerClass = 'p-2 border-top-0';
        let centered = true;
        if (options) {
            if (options.size) {
                size = options.size;
            }
            if (options.buttonSize) {
                buttonSize = options.buttonSize;
            }
            if (options.okVariant) {
                okVariant = options.okVariant;
            }
            if (options.headerClass) {
                headerClass = options.headerClass;
            }
            if (options.footerClass) {
                footerClass = options.footerClass;
            }
            if (options.centered) {
                centered = options.centered;
            }
        }
        if (contents == null) {
            contents = title;
            title = '';
        }
        this.$bvModal.msgBoxOk(contents, {
            title: title,
            size: size,
            buttonSize: buttonSize,
            okVariant: okVariant,
            headerClass: headerClass,
            footerClass: footerClass,
            centered: centered
        })
        .then(value => {
            callback(value);
        })
        .catch(err => {
            // An error occurred
        })
    },
    Confirm(title, contents, options, callback) {
        let size = '';
        let buttonSize = 'sm';
        let okVariant = 'success';
        let headerClass = 'p-2 border-bottom-0';
        let footerClass = 'p-2 border-top-0';
        let centered = true;
        let okTitle = '확인';
        let cancelTitle = '취소';
        let hideHeaderClose = false;

        if (options) {
            if (options.size) {
                size = options.size;
            }
            if (options.buttonSize) {
                buttonSize = options.buttonSize;
            }
            if (options.okVariant) {
                okVariant = options.okVariant;
            }
            if (options.headerClass) {
                headerClass = options.headerClass;
            }
            if (options.footerClass) {
                footerClass = options.footerClass;
            }
            if (options.centered) {
                centered = options.centered;
            }
            if (options.okTitle) {
                okTitle = options.okTitle;
            }
            if (options.cancelTitle) {
                cancelTitle = options.cancelTitle;
            }
            if (options.hideHeaderClose) {
                hideHeaderClose = options.hideHeaderClose;
            }
        }
        this.$bvModal.msgBoxConfirm(contents, {
            title: title,
            size: size,
            buttonSize: buttonSize,
            okVariant: okVariant,
            okTitle: '확인',
            cancelTitle: '취소',
            hideHeaderClose: false,
            headerClass: headerClass,
            footerClass: footerClass,
            centered: centered,
            okTitle: okTitle,
            cancelTitle: cancelTitle,
            hideHeaderClose: hideHeaderClose
        })
        .then(value => {
            callback(value);
        })
        .catch(err => {
            // An error occurred
        })
    },
    showAlert(title, contents, btns, showOk) {
        this.$store.dispatch('alert/setAlert', {
            title,
            contents,
            btns,
            showOk
        });
    },
    hideAlert() {
        this.$store.dispatch('alert/hideAlert');
    },
}
export default {
    methods
}

Vue.prototype.$Alert = methods.Alert;
Vue.prototype.$Confirm = methods.Confirm;

Vue.prototype.$AlertShow = methods.showAlert;
Vue.prototype.$AlertHide = methods.hideAlert;