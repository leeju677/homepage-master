export default {
    methods: {
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
    }
  };
  