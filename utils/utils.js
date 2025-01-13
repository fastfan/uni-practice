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

// 获取时间戳差值
export const getFinalTimestap = function(time) {
	const NowTime = new Date().getTime() // 当前时间时间戳
	// 另一个时间戳
	const timestamp = time
	// 计算两个时间戳的差值
	const diffInMilliseconds = NowTime - timestamp;
	// 将差值转换为秒、分钟、小时
	const diffInSeconds = diffInMilliseconds / 1000;
	const diffInMinutes = diffInSeconds / 60;
	const diffInHours = diffInMinutes / 60;
	// console.log(`时间戳差值: ${diffInMilliseconds} 毫秒`);
	// console.log(`时间戳差值: ${diffInSeconds} 秒`);
	// console.log(`时间戳差值: ${diffInMinutes} 分钟`);
	console.log(`时间戳差值: ${diffInHours} 小时`);
	return diffInHours
}