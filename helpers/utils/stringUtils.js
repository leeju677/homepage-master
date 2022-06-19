var methods = {
	isEmptyBool(str) {
		if (typeof str == "undefined" || str == null || str == "") return true;
		else return false;
	},
	isEmpty(str, defaultStr) {
		if (typeof str == "undefined" || str == null || str == "") str = defaultStr;

		return str;
	},

	trimString(str, length) {
		return str.length > length ? str.substring(0,length) : str;
	},
	htmlDecodeString(str) {
		if(str==null||str==''){
			return '';
		}
		return str
			.replaceAll('&amp;', '&')
			.replaceAll('&lt;', '<')
			.replaceAll('&gt;', '>');
	},
	// 특수문자 코드 변환
	getSpecialChar(str){
		if(str !== undefined && str !== null && str !== '') {
			str = String(str);
			str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
			str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
			var element = document.createElement('div');
			element.innerHTML = str;
			str = element.textContent;
			element.textContent = '';
		}
		return str;
	},
};

export default methods;
