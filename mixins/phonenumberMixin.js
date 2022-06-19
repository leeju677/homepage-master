export default {
    methods: {
        formatPhoneNumber(str) {
            if (str) {
                str = str.replace(/[^0-9]/g, '');
                let tmp = '';
                if (str.length < 4) {
                    return str;
                } else if (str.length < 7) {
                    tmp += str.substring(0, 3);
                    tmp += '-';
                    tmp += str.substring(3, 7);
                    return tmp;
                } else if (str.length == 9) {
                    if (str.substring(0,2) == "02") {
                        tmp += str.substring(0, 2);
                        tmp += '-';
                        tmp += str.substring(2, 5);
                        tmp += '-';
                        tmp += str.substring(5, 9);
                        return tmp;
                    }
                } else if (str.length == 10) {
                    if (str.substring(0,2) == "02") {
                        tmp += str.substring(0, 2);
                        tmp += '-';
                        tmp += str.substring(2, 6);
                        tmp += '-';
                        tmp += str.substring(6, 10);
                        return tmp;
                    } else {
                        tmp += str.substring(0, 3);
                        tmp += '-';
                        tmp += str.substring(3, 6);
                        tmp += '-';
                        tmp += str.substring(6, 10);
                        return tmp;
                    }
                } else if (str.length == 11) {
                    tmp += str.substring(0, 3);
                    tmp += '-';
                    tmp += str.substring(3, 7);
                    tmp += '-';
                    tmp += str.substring(7, 11);
                    return tmp;
                }
            }
            return str;
        },
        isVaildPhoneNumber(number) {
            if (number) {
                let numberMap = number.replace(/-/gi, '');
                if (numberMap.substring(0,1) == '0') {
                    if (numberMap.length >= 9 && numberMap.length <= 11) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            return false;
        },
        eventPhoneNumber(event) {
            if (event.target.value != '') {
                event.target.value = this.formatPhoneNumber(event.target.value)
            }
        },
        checkPhoneNumber(event, callback) {
            if (event.target.value != '') {
                if (this.isVaildPhoneNumber(event.target.value)) {
                    if (callback) {
                        callback(true, "올바른 전화번호입니다.");
                    }
                } else {
                    if (callback) {
                        callback(false, "전화번호가 올바르지 않습니다.");
                    }
                } 
            } else {
                if (callback) {
                    callback(false, "전화번호를 입력하세요.")
                }
            }
        }
    }
  };
  