var methods = {
	getToday() {
		const today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth() + 1 + "";
		var day = today.getDay() + "";
		const date =
			year + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");
		return date;
	},
	getTodayToStr(){
		const today = new Date();
		return today.toLocaleString();
	},

	getDay(days) {
		const today = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
		var year = today.getFullYear();
		var month = today.getMonth() + 1 + "";
		var day = today.getDate() + "";
		const date =
			year + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");
		return date;
	},
	getDayHours(days) {
		const today = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
		var year = today.getFullYear();
		var month = today.getMonth() + 1 + "";
		var day = today.getDate() + "";
		var hour = today.getHours() + "";
		var min = today.getMinutes() + "";
		const date =
			year + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0")+" "+ hour.padStart(2, "0")+":"+min.padStart(2, "0");
		return date;
	},
	getDateWithLabel(days, title) {
		const today = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
		var year = today.getFullYear();
		var month = today.getMonth() + 1 + "";
		var day = today.getDate() + "";
		var hour = today.getHours() + "";
		var min = today.getMinutes() + "";
		var sec = today.getSeconds() + "";
		const date = year + month.padStart(2, "0") + day.padStart(2, "0") + hour.padStart(2, "0") + min.padStart(2, "0") + sec.padStart(2, "0");
		return title +"_"+ date;
	},

	getDate(days) {
		const today = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
		var year = today.getFullYear();
		var month = today.getMonth() + 1 + "";
		var day = today.getDate() + "";
		var hour = today.getHours() + "";
		var min = today.getMinutes() + "";
		var sec = today.getSeconds() + "";
		const date = year + month.padStart(2, "0") + day.padStart(2, "0") + hour.padStart(2, "0") + min.padStart(2, "0") + sec.padStart(2, "0");
		return date;
	},

	getDateByString(str) {
		return new Date(str)
	},

	getDateToStr(date){
		var year = date.getFullYear();
		var month = date.getMonth() + 1 + "";
		var day = date.getDate() + "";
		var hour = date.getHours() + "";
		var min = date.getMinutes() + "";
		var sec = date.getSeconds() + "";
		const str = year + month.padStart(2, "0") + day.padStart(2, "0") + hour.padStart(2, "0") + min.padStart(2, "0") + sec.padStart(2, "0");
		return str;
	},

	getDateToyyyymmdd(date) {
		var year = date.getFullYear();
		var month = date.getMonth() + 1 + "";
		var day = date.getDate() + "";
		return year + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");
	},

	getDateDiffByDay(date1, days){
		var diff = new Date(Date.now() + days * 24 * 60 * 60 * 1000) - date1;
		return diff>=0 ? false : true
	},
	//시작일이 종료일보다 뒷 날짜일 경우.. 작은 경우 시작일이 종료일보다 앞서는 경우 false
	getDayDiff(startDate, endDate){
		var sdt = new Date(startDate);
		var edt = new Date(endDate);
		var dateDiff = Math.ceil((edt.getTime()-sdt.getTime())/(1000*3600*24));
		return dateDiff<0 ? false: true;
	},
	getDefaultSelectedTime(){
		const today = new Date();
		var hour=(today.getHours()+"").padStart(2,"0")+":";
		var min="";
		if(today.getMinutes()<30){
			min="30";
		}else{
			hour=(today.getHours()+1+"").padStart(2,"0")+":";
			min="00";
		}
		return hour+min;
	}
};

export default methods;
