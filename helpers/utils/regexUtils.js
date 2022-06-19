const passMinLength = 10;
const passMaxLength = 16;

const idMinLength = 4;
const idMaxLength = 16;
const nickMinLength = 4;
const nickMaxLength = 16;
const textDetailMaxLength = 150;

const idRegExe = /[^A-za-z0-9]/g;
const idReg = /^(?=.*[a-zA-Z0-9]).{4,16}$/;

const passwordRegExe = /[^A-za-z0-9!@#$%^&*]/g;
//const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{10,16}$/;
const passwordReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,16}$/;

const nickRegExe = /[^A-za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g;
const nickReg = /^(?=.*[A-za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]).{4,16}$/;

var methods = {

    passwordSameValuecheck(pass, pass2, passName, passName2) {
        if (pass === pass2) {
            document
                .getElementById(passName)
                .classList
                .remove('is-invalid');
            document
                .getElementById(passName)
                .classList
                .add('is-valid');
            document
                .getElementById(passName2)
                .classList
                .remove('is-invalid');
            document
                .getElementById(passName2)
                .classList
                .add('is-valid');
            return true;
        } else {
            document
                .getElementById(passName)
                .classList
                .remove('is-valid');
            document
                .getElementById(passName)
                .classList
                .add('is-invalid');
            document
                .getElementById(passName2)
                .classList
                .remove('is-valid');
            document
                .getElementById(passName2)
                .classList
                .add('is-invalid');
            return false;
        }
    },
    passwordRegex(val, model, size = passMaxLength) {
        if (passwordRegExe.exec(val) !== null || model.length > size) {
            return model = model.slice(0, -1);
        } else {
            return model;
        }
    },

    passwodRegexCheck(val){
        if(val.length >= passMinLength && val.length < passMaxLength) {
            if (passwordReg.test(val)) {
                return true;
            }
            return false;
        }
        return false;
    },

    passwordValidCheck(pass, pass2, formName, formName2, type) {
        this.passValid = false;
        if (type == 0) { // single type.
            if (pass.length >= passMinLength) {
                if (passwordReg.test(pass)) {
                    if (pass === pass2) {
                        this.passValid = true;
                        document
                            .getElementById(formName2)
                            .classList
                            .remove('is-invalid');
                        document
                            .getElementById(formName2)
                            .classList
                            .add('is-valid');
                    }
                    document
                        .getElementById(formName)
                        .classList
                        .remove('is-invalid');
                    document
                        .getElementById(formName)
                        .classList
                        .add('is-valid');
                } else {
                    this.passValid = false;
                    document
                        .getElementById(formName)
                        .classList
                        .remove('is-valid');
                    document
                        .getElementById(formName)
                        .classList
                        .add('is-invalid');
                }
            } else {
                this.passValid = false;
                document
                    .getElementById(formName)
                    .classList
                    .remove('is-valid');
                document
                    .getElementById(formName)
                    .classList
                    .add('is-invalid');
            }

        } else if (type == 1) {
            if (pass2.length >= passMinLength) {
                if (passwordReg.test(pass2)) {
                    if (pass === pass2) {
                        this.passValid = true;
                        document
                            .getElementById(formName)
                            .classList
                            .remove('is-invalid');
                        document
                            .getElementById(formName)
                            .classList
                            .add('is-valid');
                    }
                    document
                        .getElementById(formName2)
                        .classList
                        .remove('is-invalid');
                    document
                        .getElementById(formName2)
                        .classList
                        .add('is-valid');
                } else {
                    this.passValid = false;
                    document
                        .getElementById(formName2)
                        .classList
                        .remove('is-valid');
                    document
                        .getElementById(formName2)
                        .classList
                        .add('is-invalid');
                }
            } else {
                this.passValid = false;
                document
                    .getElementById(formName2)
                    .classList
                    .remove('is-valid');
                document
                    .getElementById(formName2)
                    .classList
                    .add('is-invalid');
            }
        }
        return this.passValid;
    },

    idRegex(val, model, size = idMaxLength) {
        if (idRegExe.exec(val) !== null || model.length > size) {
            return model = model.slice(0, -1);
        } else {
            return model;
        }
    },

    idRegexCheck(val){
        if(val.length >= idMinLength && val.length < idMaxLength) {
            if (idReg.test(val)) {
                return true;
            }
            return false;
        }
        return false;
    },

    nickRegex(val, model, size = nickMaxLength) { //
        if (nickRegExe.exec(val) !== null  || model.length > size) {
            return model = model.slice(0, -1);
        } else {
            return model;
        }
    },

    nickRegexCheck(val){
        if(val.length >= nickMinLength && val.length < nickMaxLength) {
            if (nickReg.test(val)) {
                return true;
            }
            return false;
        }
        return false;
    },

    detailRegex(val, model) { //
        if (model.length > textDetailMaxLength) {
            return model = model.slice(0, -1);
        } else {
            return model;
        }
    },

    textRegex(model, size = textDetailMaxLength) {
        if (model.length > size) {
            return model = model.slice(0, -1);
        } else {
            return model;
        }
    }
}

export default methods
