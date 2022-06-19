export default {
    methods: {
        /** NUMBER */
        addZero(num, size) {
            let str = '000000000000000'+ num;
            let len = 2;
            if (size) len = size;
            return (str.substring(str.length - len, str.length));
        },
        formatNumber(str) {
            if (!str) return;
            str = String(str);
            return str.replace(/[^0-9.-]/g, '');
        },
        isNumber(value) {
            return !isNaN(value);
        },
    
        formatComma(str) {
            if (!str) return;
            str = String(str);
            str = str.replace(/(-?)[^0-9.-]/g, '');
            return str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
        },
        formatUnComma(str) {
            if (!str) return;
            str = String(str);
            return Number(str.replace(/(-?)[^\d-]+/g, ''));
        },

        inputNumber(event) {
            event = event ? event : window.event;
            const charCode = event.which ? event.which : event.keyCode;
            //console.log(charCode);
            if (
                charCode == 8 ||
                charCode == 9 ||
                charCode == 13 ||
                charCode == 46 ||
                charCode == 188 ||
                (charCode >= 35 && charCode <= 40) ||
                event.key === '.' ||
                event.key === '-' ||
                (event.key >= 0 && event.key <= 9)
            ) {
                return true;
            } else {
                alert('숫자를 입력해주세요');
                if (event.target.value.length >= 1) {
                    event.target.value = event.target.value.replace(/(-)[^0-9-,]/g,'');
                }
                event.preventDefault();
            }
        },
        eventNumber(event) {
            if (event.target.value != '') {
                event.target.value = this.formatNumber(event.target.value)
            }
        },

        eventComma(event) {
            if (event.target.value != '') {
                event.target.value = this.formatNumber(event.target.value)
                event.target.value = this.formatComma(event.target.value)
            }
        },
        eventUnComma(event) {
            event.target.value = this.formatNumber(event.target.value)
            event.target.value = this.formatUnComma(event.target.value)
        },
    
        /** PHONE */
        formatPhoneNumber(str) {
            /** 0311231234 */
            if (str) {
                str = str.replace(/[^0-9]/g, '');
                let tmp = '';
                if (str.length < 4) {
                    console.log('formatPhoneNumber A', str,tmp)
                    return str;
                } else if (str.length < 7) {
                    tmp += str.substring(0, 3);
                    tmp += '-';
                    tmp += str.substring(3, 7);
                    console.log('formatPhoneNumber B', str,tmp)
                    return tmp;
                } else if (str.length == 9) {
                    if (str.substring(0,2) == "02") {
                        tmp += str.substring(0, 2);
                        tmp += '-';
                        tmp += str.substring(2, 5);
                        tmp += '-';
                        tmp += str.substring(5, 9);
                        console.log('formatPhoneNumber C', str,tmp)
                        return tmp;
                    }
                } else if (str.length == 10) {
                    if (str.substring(0,2) == "02") {
                        tmp += str.substring(0, 2);
                        tmp += '-';
                        tmp += str.substring(2, 6);
                        tmp += '-';
                        tmp += str.substring(6, 10);
                        console.log('formatPhoneNumber C', str,tmp)
                        return tmp;
                    } else {
                        tmp += str.substring(0, 3);
                        tmp += '-';
                        tmp += str.substring(3, 6);
                        tmp += '-';
                        tmp += str.substring(6, 10);
                        console.log('formatPhoneNumber C', str,tmp)
                        return tmp;
                    }
                } else if (str.length == 11) {
                    tmp += str.substring(0, 3);
                    tmp += '-';
                    tmp += str.substring(3, 7);
                    tmp += '-';
                    tmp += str.substring(7, 11);
                    console.log('formatPhoneNumber C', str,tmp)
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
        },
        
        /** BISINESS NUMBER */
        formatBizNumber(str) {
            if (str) {
                str = str.replace(/[^0-9]/g, '');
                let tmp = '';
                if (str.length < 4) {
                    return str;
                } else if (str.length < 6) {
                    tmp += str.substr(0, 3);
                    tmp += '-';
                    tmp += str.substr(3);
                    return tmp;
                } else if (str.length < 11) {
                    tmp += str.substr(0, 3);
                    tmp += '-';
                    tmp += str.substr(3, 2);
                    tmp += '-';
                    tmp += str.substr(5);
                    return tmp;
                }
            }
            return str;
        },
        isVaildBizNumber(number) {
            if (number) {
                let numberMap = number
                .replace(/-/gi, '')
                .split('')
                .map(function(d) {
                    return parseInt(d, 10);
                });
            
                if (numberMap.length === 10) {
                    let keyList = [1, 3, 7, 1, 3, 7, 1, 3, 5];
                    let chk = 0;
                    keyList.forEach(function(d, i) {
                        chk += d * numberMap[i];
                    });
            
                    chk += parseInt((keyList[8] * numberMap[8]) / 10, 10);
                    return Math.floor(numberMap[9]) === (10 - (chk % 10)) % 10;
                }
            }
            return false;
        },
        eventBizNumber(event) {
            if (event.target.value != '') {
                event.target.value = this.formatBizNumber(event.target.value)
            }
        },
        checkBizNumber(event, callback) {
            if (event.target.value != '') {
                if (this.isVaildBizNumber(event.target.value)) {
                    if (callback) {
                        callback(true, "올바른 사업자등록번호입니다.");
                    }
                } else {
                    if (callback) {
                        callback(false, "사업자등록번호가 올바르지 않습니다.");
                    }
                } 
            } else {
                if (callback) {
                    callback(false, "사업자등록번호를 입력하세요.")
                }
            }
        }            
    }
};
  