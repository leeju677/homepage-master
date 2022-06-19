export default {
    methods: {
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
  