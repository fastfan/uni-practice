//获取当前时间戳
export const getTimestamp = function() {
	//return(Date.parse(new Date()) / 1000).toString();
	var date = new Date()
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	return time;
};