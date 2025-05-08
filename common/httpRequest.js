/**
 * 常用方法封装 请求，文件上传等
 * @author echo. 
 **/

import store from '@/store/index.js';
import util from '@/utils/util.js';
import {
	Screct
} from './cryptojs/sha_1.js'
import {
	UserServer
} from '@/viewModel/user/user.js'
import {
	merchantServer
} from '@/viewModel/merchant/merchant.js'

const dev = true; // 0 开发 1 正式	
const tui = {
	//接口地址
	interfaceUrl: function() {
		return dev ? 'https://testplat.ruikedz.com' : 'https://51plat.ruikedz.com'
	},
	//商家地址
	interfaceMchUrl: function() {
		return dev ? 'https://testmch.ruikedz.com' : 'https://mch.ruikedz.com'
	},
	//前端访问地址
	rootUrl: function() {
		return dev ? 'https://test.ruikedz.com' : 'https://51jifen.ruikedz.com'
	},
	fromPage: '0',
	fromWebView: false,
	// 是否需要完善手机号
	isNeedComplatePhone: false,
	//测试账户
	testAcount: 'test01', //test03
	shareUrl: 'https://51jifen.ruikedz.com/#/',
	redirectUrl: '',
	miniUrl: 'https://51lsp.ruikedz.com',
	// 刷新登录
	refreshLogin: function() {
		let _that = this;
		//获取微信授权
		let refreshToken = '';
		refreshToken = uni.getStorageSync('refreshToken');
		if (!util.isEmpty(refreshToken)) {
			let userServer = new UserServer();
			userServer.refreshToken({
				refreshToken: refreshToken
			}).then(res => {
				if (res.code === 200) {
					tui.setToken(res.data);
					//获取用户信息
					let userServer = new UserServer();
					userServer.userInfo().then(res => {
						if (res.code === 200) {
							getApp().globalData.userInfo = res.data;
							tui.setUserInfo(res.data);
							tui.setToken(res.data);
							// tui.showRedDot(res);
						} else if (res.code === 1000 || res.code === 1001) {
							util.clearStorage();
						} else {
							tui.toast(res.msg);
						}
					}).catch(err => {});
				} else {
					util.clearStorage();
				}
			}).catch(err => {
				util.clearStorage();
			});
		} else {
			util.clearStorage();
		}
	},

	showRedDot(res) {
		if (res.data.newsCount == 0 || !res.data.newsCount) {
			uni.hideTabBarRedDot({
				index: 2
			});
		} else {
			uni.showTabBarRedDot({
				index: 2
			});
		}
	},
	/**
	 * 请求数据处理
	 * @param string url 请求地址
	 * @param string method 请求方式
	 *  GET or POST
	 * @param {*} postData 请求参数
	 * @param bool isDelay 是否延迟显示loading
	 * @param bool isForm 数据格式
	 *  true: 'application/x-www-form-urlencoded'
	 *  false:'application/json'
	 * @param bool hideLoading 是否隐藏loading
	 *  true: 隐藏
	 *  false:显示
	 */
	request: function(params) {
		let url = params.url;
		let method = params.method || 'POST';
		let postData = params.data || {};
		let isDelay = params.isDelay || 60;
		let isForm = params.isForm || false;
		let hideLoading = params.hideLoading || false;
		let isMerchant = params.isMerchant || false;
		//接口请求
		let loadding = false;
		tui.delayed && uni.hideLoading();
		clearTimeout(tui.delayed);
		tui.delayed = null;
		if (!hideLoading) {
			tui.delayed = setTimeout(() => {
				uni.showLoading({
					mask: true,
					title: '请稍候...',
					success(res) {
						loadding = true
					}
				})
			}, isDelay ? 1000 : 0)
		}

		return new Promise((resolve, reject) => {
			let token = tui.getToken(isMerchant);
			if (token.length > 1) {
				postData['accessToken'] = token;
			}
			postData['appKey'] = store.state.appKey;
			postData['timestamp'] = new Date().getTime();
			let scertStr = url + JSON.stringify(postData) + store.state.appSecret;
			let s = Screct(scertStr, store.state.appSecret);
			let requestUrl = isMerchant ? (tui.interfaceMchUrl() + url) : (tui.interfaceUrl() + url);
			uni.request({
				url: requestUrl,
				data: postData,
				method: method,
				header: {
					'Content-Type': isForm ? 'application/x-www-form-urlencoded;charset=utf-8' :
						'application/json;charset=utf-8',
					'sign': s,
				},
				success: (res) => {
					clearTimeout(tui.delayed)
					tui.delayed = null;
					if (loadding && !hideLoading) {
						uni.hideLoading()
					}
					if (store.state.isDebug) {
						console.log('========= API Start ==========');
						console.log('apiUrl:', url)
						console.log('parameter: ', postData);
						console.log('callback: ', res.data);
						console.log('========= API end ==========');
					}
					if (res.data.code === 1000) {
						util.throttle(() => {
							tui.refreshLogin();
						}, 2000);

					} else if (res.data.code === 1001) {
						util.clearStorage();
						uni.navigateTo({
							url: '/pages/login/login'
						})

					} else if (res.data.code === 2009) {
						//设置用户信息
						getApp().globalData.userInfo = res.data;
						//设置wxopenid
						uni.setStorageSync('wxOpenId', res.data.wxOpenId);

						tui.isNeedComplatePhone = true;

						resolve(res.data);
					} else {
						resolve(res.data);
					}
				},
				fail: (res) => {
					clearTimeout(tui.delayed)
					tui.delayed = null;
					tui.toast("网络不给力，请稍后再试~")
					reject(res)
				}
			})
		})
	},
	/*
	 * 是否还有更多数据
	 */
	isHaveMore: function(res) {
		return (res.data.current * res.data.size) < res.data.total
	},
	/**
	 * 上传文件
	 * @param string url 请求地址
	 * @param string src 文件路径
	 */
	uploadFile: function(params) {
		uni.showLoading({
			title: '请稍候...'
		})
		let url = params.url;
		let file = params.file || '';
		let fileModule = params.fileModule || 0;
		let isMerchant = params.isMerchant || false;
		let token = tui.getToken(isMerchant);
		let requestUrl = isMerchant ? (tui.interfaceMchUrl() + url) : (tui.interfaceUrl() + url);
		return new Promise((resolve, reject) => {
			const uploadTask = uni.uploadFile({
				url: requestUrl,
				filePath: file,
				method: 'POST',
				name: 'file',
				timeout: 20 * 60 * 1000,
				header: {
					//'content-type': 'multipart/form-data'
				},
				formData: {
					file: file,
					accessToken: token,
					fileModule: fileModule,
					clientType: 8
				},
				success: function(res) {
					let d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}")
					if (d.code % 100 == 0) {
						//返回图片地址
						let fileObj = d.data;
						resolve(fileObj)
					} else {
						tui.toast(d.msg);
					}
				},
				fail: function(res) {
					console.log(res);
					reject(res)
					tui.toast(res.msg);
				}
			})
		})
	},
	toast: function(text, duration, success) {
		if (!text) {
			return
		}
		uni.showToast({
			title: text || "",
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
	},
	modal: function(title, content, showCancel, callback, confirmColor, confirmText, cancelText) {
		uni.showModal({
			title: title || '提示',
			content: content,
			showCancel: showCancel,
			cancelColor: "#555",
			cancelText: cancelText || '取消',
			confirmColor: confirmColor || "#FF7E7B",
			confirmText: confirmText || "确定",
			success(res) {
				if (res.confirm) {
					callback && callback(true)
				} else {
					callback && callback(false)
				}
			}
		})
	},
	isAndroid: function() {
		const res = uni.getSystemInfoSync();
		return res.platform.toLocaleLowerCase() == "android"
	},
	isPhoneX: function() {
		const res = uni.getSystemInfoSync();
		let iphonex = false;
		let models = ['iphonex', 'iphonexr', 'iphonexsmax', 'iphone11', 'iphone11pro', 'iphone11promax']
		const model = res.model.replace(/\s/g, "").toLowerCase()
		if (models.includes(model)) {
			iphonex = true;
		}
		return iphonex;
	},
	constNum: function() {
		let time = 0;
		// #ifdef APP-PLUS
		time = this.isAndroid() ? 300 : 0;
		// #endif
		return time
	},
	delayed: null,
	tuiJsonp: function(url, callback, callbackname) {
		// #ifdef H5
		window[callbackname] = callback;
		let tuiScript = document.createElement("script");
		tuiScript.src = url;
		tuiScript.type = "text/javascript";
		document.head.appendChild(tuiScript);
		document.head.removeChild(tuiScript);
		// #endif
	},
	//设置用户信息
	setUserInfo: function(userInfo) {
		uni.setStorageSync("userInfo", userInfo)
		uni.setStorageSync("phoneNumber", userInfo.phoneNumber)

	},
	//设置登录信息
	setToken: function(res) {
		uni.setStorageSync("accessToken", res.accessToken)
		uni.setStorageSync("refreshToken", res.refreshToken)
		uni.setStorageSync("wxOpenId", res.wxOpenId)
	},
	//设置登录信息
	setMchToken: function(res) {
		uni.setStorageSync("mchAccessToken", res.accessToken)
		uni.setStorageSync("mchRefreshToken", res.refreshToken)
		uni.setStorageSync('mchUserInfo', res)
	},
	//获取token
	getToken(isMerchant = false) {
		if (isMerchant) {
			return uni.getStorageSync("mchAccessToken") ? uni.getStorageSync("mchAccessToken") : uni.getStorageSync(
				"accessToken")
		}
		return uni.getStorageSync("accessToken")
	},
	//获取手机号
	getPhone() {
		return uni.getStorageSync('phoneNumber');
	},
	//设置手机号
	setPhone(phone) {
		uni.setStorageSync("phoneNumber", phone);
	},
	//判断是否登录
	isLogin() {
		return util.isEmpty(uni.getStorageSync("refreshToken")) ? false : true;
	},
	//判断商家是否登录
	isMchLogin() {
		return util.isEmpty(uni.getStorageSync("mchRefreshToken")) ? false : true;
	},
	//获取用户身份
	getIdentity: function() {
		let userInfo = uni.getStorageSync('userInfo');

		return userInfo ? parseInt(userInfo.userType) : 0;
	},
	//跳转页面，校验登录状态
	href(url, isVerify) {
		if (isVerify && !tui.isLogin()) {
			uni.navigateTo({
				url: '/pages/common/login/login'
			})
		} else {
			uni.navigateTo({
				url: url
			});
		}
	},
	//解析URL 参数
	getUrlParam(name) {
		let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
		let r = window.location.search.substr(1).match(reg)
		if (r != null) {
			return unescape(r[2])
		}
		return null
	},
	getQueryVariable(url, variable) {
		let urlParams = url.split('?');
		for (let j = 0; j < urlParams.length; j++) {
			let url = urlParams[j];
			var vars = url.split("&");
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split("=");
				if (pair[0] == variable) {
					return pair[1];
				}
			}
		}
		return ('');
	},
	ridUrlParam(url, aParam) {
		aParam.forEach(item => {
			const fromindex = url.indexOf(`${item}=`) //必须加=号，避免参数值中包含item字符串
			if (fromindex !== -1) {
				// 通过url特殊符号，计算出=号后面的的字符数，用于生成replace正则
				const startIndex = url.indexOf('=', fromindex)
				const endIndex = url.indexOf('&', fromindex)
				const hashIndex = url.indexOf('#', fromindex)

				let reg;
				if (endIndex !== -1) { // 后面还有search参数的情况
					const num = endIndex - startIndex
					reg = new RegExp(`${item}=.{${num}}`)
					url = url.replace(reg, '')
				} else if (hashIndex !== -1) { // 有hash参数的情况
					const num = hashIndex - startIndex - 1
					reg = new RegExp(`&?${item}=.{${num}}`)
					url = url.replace(reg, '')
				} else { // search参数在最后或只有一个参数的情况
					reg = new RegExp(`&?${item}=.+`)
					url = url.replace(reg, '')
				}
			}
		});
		const noSearchParam = url.indexOf('=')
		if (noSearchParam === -1) {
			url = url.replace(/\?/, '') // 如果已经没有参数，删除？号
		}
		return url
	}
}

export default tui