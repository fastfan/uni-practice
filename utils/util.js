/**
 * 数据处理
 * @author echo.
 * @version 1.5.0
 **/
import tui from '@/common/httpRequest'
const utils = {
	/*** 显示提示信息
	 * @param {String} title 提示信息
	 * @param {String} icon 图标 默认 none
	 * @param {Number} duration 显示时间 默认3000毫秒
	 */
	toast: (title, icon = 'none', duration = 3000) => {
		if (title) {
			uni.showToast({
				title,
				icon,
				duration
			})
		} else {
			uni.showLoading({
				title: '加载中'
			})
		}
	},
	clearStorage: () => {
		let agreeProtocolPopup = uni.getStorageSync('agreeProtocolPopup');
		let searchHistory = uni.getStorageSync('searchHistory')
		uni.clearStorage();
		uni.setStorageSync('agreeProtocolPopup', agreeProtocolPopup);
		uni.setStorageSync('searchHistory', searchHistory);
	},
	//去空格
	trim: function(value) {
		return value.replace(/\s+/g, "");
	},
	//内容替换
	replaceAll: function(text, repstr, newstr) {
		return text.replace(new RegExp(repstr, "gm"), newstr);
	},
	//格式化手机号码
	formatNumber: function(num) {
		return num.length === 11 ? num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : num;
	},
	//金额格式化
	rmoney: function(money) {
		return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,')
			.replace(
				/\,$/, '').split('').reverse().join('');
	},
	// 数字后2位自动补零
	formatMoney(num) {
		num = num.toString() // 转成字符串类型  如能确定类型 这步可省去
		if (num.indexOf('.') !== -1) {
			let [integerPart, decimalPart] = num.split('.')
			if (decimalPart.length > 2) {
				decimalPart = decimalPart.substring(0, 2)
			} else if (decimalPart.length === 1) {
				decimalPart += '0'
			}
			num = `${integerPart}.${decimalPart}`
		} else {
			num += '.00'
		}
		return num
	},
	//日期格式化
	dateFormat: function(fmt, date) {
		let ret;
		const opt = {
			"Y+": date.getFullYear().toString(), // 年
			"m+": (date.getMonth() + 1).toString(), // 月
			"d+": date.getDate().toString(), // 日
			"H+": date.getHours().toString(), // 时
			"M+": date.getMinutes().toString(), // 分
			"S+": date.getSeconds().toString() // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt);
			if (ret) {
				fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length,
					"0")))
			};
		};
		return fmt;
	},
	rgbToHex: function(r, g, b) {
		return "#" + utils.toHex(r) + utils.toHex(g) + utils.toHex(b)
	},
	toHex: function(n) {
		n = parseInt(n, 10);
		if (isNaN(n)) return "00";
		n = Math.max(0, Math.min(n, 255));
		return "0123456789ABCDEF".charAt((n - n % 16) / 16) +
			"0123456789ABCDEF".charAt(n % 16);
	},
	hexToRgb(hex) {
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	},
	/**
	 * 判断`obj`是否为空
	 * @param {object} obj
	 */
	isEmpty(obj) {
		if (obj === '' || obj === undefined || obj === null || obj === 0) return true
		if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false
		return !Object.keys(obj).length
	},
	/**
	 * 判断是否为身份证
	 * @param {string} str 身份证号
	 */
	isIdCard(str) {
		return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
			.test(str)
	},

	/**
	 * 银行卡每四位+空格
	 * @param {string} s 银行卡号
	 */
	bankSpace(s) {
		if (/^[\d]{0,19}$/.test(s.replace(/\s/g, ''))) {
			//每四位数字加一个空格
			s = s.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ')
		}
		return s
	},
	/**
	 * 检测数字
	 * @param {string} s 所选数字
	 */
	isNum(s) {
		return /^[0-9]*$/.test(s)
	},

	/**
	 * 检测该手机号是否正确
	 * @param {string} s 所选手机号
	 */
	isPhone(s) {
		return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(s)
	},

	/**
	 * 检测该邮箱是否正确
	 * @param {string} s 所选邮箱
	 */
	isMail(s) {
		return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
			s)
	},

	/**
	 * 合法uri
	 * @param {string} s 传入url
	 */
	isValidUrl(str) {
		// const urlRegex =
		// /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?[a-z0-9%&=]*)?(\#[a-z\.0-9]*)?$/;
		// return urlRegex.exec(str)
		const pattern = new RegExp(
			'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', // fragment locator
			'i'
		);
		return pattern.test(str);
	},

	/**
	 * 是否小写字母
	 * @param {string} s 传入字符串
	 */
	validateLowerCase(s) {
		const reg = /^[a-z]+$/
		return reg.test(s)
	},

	/**
	 * 是否大写字母
	 * @param {string} s 传入字符串
	 */
	validateUpperCase(s) {
		const reg = /^[A-Z]+$/
		return reg.test(s)
	},

	/**
	 * 是否大小写字母
	 * @param {string} s 传入字符串
	 */
	validatAlphabets(s) {
		const reg = /^[A-Za-z]+$/
		return reg.test(s)
	},

	/**
	 * 检测该车牌号是否正确
	 * @param {string} s 所选车牌号
	 */
	isPlate(s) {
		const reg =
			/([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/
		return reg.test(s)
	},
	/**
	 *  现金额转大写
	 * @param {number} n
	 */
	digitUppercase(n) {
		var fraction = ['角', '分']
		var digit = [
			'零', '壹', '贰', '叁', '肆',
			'伍', '陆', '柒', '捌', '玖'
		]
		var unit = [
			['元', '万', '亿'],
			['', '拾', '佰', '仟']
		]
		var head = n < 0 ? '欠' : ''
		n = Math.abs(n)
		var s = ''
		for (var i = 0; i < fraction.length; i++) {
			s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
		}
		s = s || '整'
		n = Math.floor(n)
		for (var i = 0; i < unit[0].length && n > 0; i++) {
			var p = ''
			for (var j = 0; j < unit[1].length && n > 0; j++) {
				p = digit[n % 10] + unit[1][j] + p
				n = Math.floor(n / 10)
			}
			s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
		}
		return head + s.replace(/(零.)*零元/, '元')
			.replace(/(零.)+/g, '零')
			.replace(/^整$/, '零元整')
	},
	/**
	 * 计算经纬度两点的距离
	 * @param {string} start 开始经纬度 23.099579542217775,113.24026330500826
	 * @param {string} end 结束经纬度   23.099579542217775,113.24026330500826
	 */
	getDistance(start, end) {
		let lon1 = (Math.PI / 180) * start[1];
		let lon2 = (Math.PI / 180) * end[1];
		let lat1 = (Math.PI / 180) * start[0];
		let lat2 = (Math.PI / 180) * end[0];
		// 地球半径
		let R = 6371;
		// 两点间距离 km，如果想要米的话，结果*1000就可以了
		let d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 -
				lon1)) *
			R;
		return d * 1000;
	},
	/**
	 * 把秒转为 时分秒
	 * @param {string} value 秒
	 */
	formatSeconds(value) {
		let secondTime = parseInt(value), // 秒
			minuteTime = 0, // 分
			hourTime = 0 // 小时
		if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
			//获取分钟，除以60取整数，得到整数分钟
			minuteTime = parseInt(secondTime / 60)
			//获取秒数，秒数取佘，得到整数秒数
			secondTime = parseInt(secondTime % 60)
			//如果分钟大于60，将分钟转换成小时
			if (minuteTime > 60) {
				//获取小时，获取分钟除以60，得到整数小时
				hourTime = parseInt(minuteTime / 60)
				//获取小时后取佘的分，获取分钟除以60取佘的分
				minuteTime = parseInt(minuteTime % 60)
			}
		}
		let result = "" + parseInt(secondTime) + "秒"
		if (minuteTime > 0) {
			result = "" + parseInt(minuteTime) + "分" + result
		}
		if (hourTime > 0) {
			result = "" + parseInt(hourTime) + "小时" + result
		}
		return result
	},
	/**
	 *  返回目标时间距离当前时间时长
	 * @param {date} time 时间
	 * @param {string} option 格式化时间
	 */
	formatTime(time, option) {
		time = +time * 1000
		const d = new Date(time)
		const now = Date.now()
		const diff = (now - d) / 1000
		if (diff < 30) {
			return '刚刚'
		} else if (diff < 3600) { // less 1 hour
			return Math.ceil(diff / 60) + '分钟前'
		} else if (diff < 3600 * 24) {
			return Math.ceil(diff / 3600) + '小时前'
		} else if (diff < 3600 * 24 * 2) {
			return '1天前'
		}
		if (option) {
			return parseTime(time, option)
		} else {
			return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
		}
	},
	/**
	 * 时间戳转时间字符串
	 */
	timestampToTimefomart(timestamp) {
		var date = new Date(timestamp);
		var YY = date.getFullYear() + '-';
		var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
		var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		return YY + MM + DD + " " + hh + mm + ss;
	},
	/**
	 * 深拷贝
	 */
	deepClone(obj) {
		let objClone = Array.isArray(obj) ? [] : {};
		if (obj && typeof obj === "object") {
			for (let key in obj) {
				if (obj.hasOwnProperty(key)) {
					//判断ojb子元素是否为对象，如果是，递归复制
					if (obj[key] && typeof obj[key] === "object") {
						objClone[key] = utils.deepClone(obj[key]);
					} else {
						//如果不是，简单复制
						objClone[key] = obj[key];
					}
				}
			}
		}
		return objClone;
	},

	isArrayFn(value) {
		if (typeof Array.isArray === "function") {
			return Array.isArray(value);
		} else {
			return Object.prototype.toString.call(value) === "[object Array]";
		}
	},
	// 获取当前页面路径
	getCurrentPagePath() {
		const pages = getCurrentPages();
		const currentPage = pages[pages.length - 1];
		return currentPage.route;
	},
	timer: null,
	flag: null,
	/**
	 * 节流原理：在一定时间内，只能触发一次
	 *
	 * @param {Function} func 要执行的回调函数
	 * @param {Number} wait 延时的时间
	 * @param {Boolean} immediate 是否立即执行
	 * @return null
	 */
	throttle(func, wait = 500, immediate = true) {
		if (immediate) {
			if (!utils.flag) {
				utils.flag = true
				// 如果是立即执行，则在wait毫秒内开始时执行
				typeof func === 'function' && func()
				utils.timer = setTimeout(() => {
					utils.flag = false
				}, wait)
			}
		} else if (!utils.flag) {
			utils.flag = true
			// 如果是非立即执行，则在wait毫秒内的结束处执行
			utils.timer = setTimeout(() => {
				utils.flag = false
				typeof func === 'function' && func()
			}, wait)
		}
	},
	/**
	 * @description: 将url参数转为对象
	 * @param {String} url
	 * @return {Object}
	 */
	getQueryObject(url) {
		var search = url.includes('?') ? url.split('?')[1] : url; // 获取查询字符串部分
		if (!search) {
			return {};
		}
		return JSON.parse('{"' + decodeURIComponent(search)
			.replace(/"/g, '\\"')
			.replace(/&/g, '","')
			.replace(/=/g, '":"') + '"}');
	},
	/**
	 * 姓名脱敏
	 * @param {string} name
	 */
	formatName(name) {
		let value = ''
		if (name.length === 2) {
			value = name.substr(0, 1) + '*'
		} else if (name.length > 2) {
			let char = ''
			for (let i = 0, len = name.length - 2; i < len; i++) {
				char += '*'
			}
			value = name.substr(0, 1) + char + name.substr(-1, 1)
		} else {
			value = name
		}
		return value
	},
	isMoney: function(money) {
		const regex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
		return regex.test(money);
	},
	setMorKm: function(m) {
		let n = ''
		if (m) {
			if (m >= 1000) {
				n = (m / 1000).toFixed(2) + 'km'
			} else {
				n = Math.ceil(m) + 'm'
			}
		} else {
			n = '0m'
		}
		return n
	},
	/**
	 * 是否超出库存
	 * @param {object} goods 当前所选非多规格商品数据
	 * @param {Array} shopCarList 购物车数据
	 * @param {string | number} selectNum 当前所选数量
	 * @param {object} selectspecification 当前所选多规格商品数据
	 */
	isOverInventry: function(goods, shopCarList, selectNum, selectspecification) {
		console.log("goods::::::", goods)
		console.log("shopCarList::::::", shopCarList)
		console.log("selectNum::::::", selectNum)
		console.log("selectspecification::::::", selectspecification)
		let flag = false
		let count = 0
		if (goods.specificationTag === '0') { // 非多规格
			const noSpecificationGoods = shopCarList.filter((item) => item.specificationTag === '0' && item.productId ===
				goods.id) // 非多规格商品
			console.log('noSpecificationGoods:::::::', noSpecificationGoods)
			if (noSpecificationGoods.length > 0) { // 如果购物车中有当前商品
				count = Number(goods.inventory) - Number(noSpecificationGoods[0].buyQuantity) // 可选商品数量等于商品库存量减去购物车中数量
			} else { // 如果购物车中没有当前商品
				count = Number(goods.inventory) // 可选商品数量等于商品库存量
			}
			if (Number(selectNum) > count) {
				tui.toast('当前所选商品已达最大库存量~')
				flag = true
			}
		} else if (goods.specificationTag === '1') { // 多规格
			const specificationGoods = shopCarList.filter((item) => item.specificationTag === '1' && item.specificationVo
				.id === selectspecification.id) // 多规格商品
			console.log('specificationGoods:::::::', specificationGoods)
			if (specificationGoods.length > 0) { // 如果购物车中有当前商品
				count = Number(specificationGoods[0].specificationVo.inventory) - Number(specificationGoods[0]
					.buyQuantity) // 可选商品数量等于商品库存量减去购物车中数量
			} else { // 如果购物车中没有当前商品
				count = Number(selectspecification.inventory) // 可选商品数量等于所选多规格商品库存量
			}
			if (Number(selectNum) > count) {
				tui.toast('当前所选商品已达最大库存量~')
				flag = true
			}
		}
		return flag
	},
	checkAuditTime: function(startTime, endTime) {
		console.log(startTime + '-' + endTime)
		// 获取当前时间
		const date = new Date()
		// 获取当前时间的年月日
		const dataStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} `
		// 获取开始时间、结束时间、现在时间的时间戳
		let startDate = new Date(dataStr + startTime).getTime()
		let endDate = new Date(dataStr + endTime).getTime()
		let nowDate = date.getTime()
		const s = startDate > endDate // 判断开始时间否大于结束时间 
		if (s)[startDate, endDate] = [endDate, startDate] // 若开始时间否大于结束时间则交换值 
		// 判断现在的时间是否在开始时间和结束时间之间，若s为true则结果取反
		if (nowDate > startDate && nowDate < endDate) {
			return s ? false : true
		} else {
			return s ? true : false
		}
		// 使用
		// console.log(checkAuditTime('08:00', '20:00'));
	},
	/**
	 * 检测该文件是否是图片
	 * @param {string} s 所选文件
	 */
	isPicture(s) {
		return /.(jpg|jpeg|png|gif|bmp|webp)/.test(s)
	},
	/**
	 * 检测该文件是否是视频ideo
	 * @param {string} s 所选文件
	 */
	isVideo(s) {
		return /.(mp4|wmv|avi|mov)/.test(s)
	},
}

export default utils