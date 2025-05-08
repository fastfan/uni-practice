import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import shopDetail from './modules/shopDetail.js'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		shopDetail
	},
	state: {
		//用户登录手机号
		mobile: uni.getStorageSync("phone") || "echo.",
		//是否登录 项目中改为真实登录信息判断，如token
		isLogin: uni.getStorageSync("token") ? true : false,
		//登录后跳转的页面路径 + 页面参数
		returnUrl: "",
		//app版本
		version: "1.0.0",
		//appId
		appId: 'wx54f5c089f781517c',
		//appKey
		appKey: '6285175579683467',
		//appSecret
		appSecret: '60ffacb3fe9744a3a9ee8b82d0d64d10',
		//当前是否有网络连接
		networkConnected: true,
		isOnline: false,
		fromWebView: false,
		isDebug: false,
		modal: {
			visible: false,
			title: '',
			content: '',
			showCancel: true,
			showConfirm: true,
			cancelText: '取消',
			confirmText: '确定',
			data: {},
			success: () => {},
			fail: () => {},
			complete: () => {}
		},
		location: {
			latitude: '',
			longitude: ''
		}
	},
	mutations: {
		SET_MODAL_VISIBLE(state, payload) {
			state.modal.visible = payload;
		},
		UPDATE_MODAL_OPTIONS(state, options) {
			for (let key in options) {
				if (options.hasOwnProperty(key)) {
					state.modal[key] = options[key];
				}
			}
		},
		SET_STATE_DATA(state, {
			key,
			value
		} = {}) {
			state[key] = value
		},
		login(state, payload) {
			if (payload) {
				state.mobile = payload.mobile
			}
			state.isLogin = true
		},
		logout(state) {
			state.mobile = ""
			state.isLogin = false
			state.returnUrl = ""
		},
		setReturnUrl(state, returnUrl) {
			state.returnUrl = returnUrl
		},
		networkChange(state, payload) {
			state.networkConnected = payload.isConnected
		},
		setOnline(state, payload) {
			state.isOnline = state.isOnline
		}
	},
	actions: {
		showCustomModal({
			commit
		}, options) {
			const defaultOptions = {
				title: '提示',
				content: '',
				showCancel: true,
				showConfirm: true,
				cancelText: '取消',
				confirmText: '确定',
				data: {},
				success: () => {},
				fail: () => {},
				complete: () => {}
			};
			const finalOptions = {
				...defaultOptions,
				...options
			};
			commit('UPDATE_MODAL_OPTIONS', finalOptions);
			commit('SET_MODAL_VISIBLE', true);
		},
		hideCustomModal({
			commit
		}) {
			commit('SET_MODAL_VISIBLE', false);
		},
		SET_DEBUG({
			commit
		}, payload) {
			commit('SET_STATE_DATA', {
				key: 'isDebug',
				value: payload
			})
		},
		SET_LOCATION({
			commit
		}, location) {
			commit('SET_STATE_DATA', {
				key: 'location',
				value: location
			})
		},
		getOnlineStatus: async function({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				// #ifndef MP-WEIXIN
				resolve(true)
				// #endif
				// #ifdef MP-WEIXIN
				if (state.isOnline) {
					resolve(state.isOnline)
				} else {
					fetch.request("/Home/GetStatus", "GET", {}, false, true, true).then((res) => {
						if (res.code == 100 && res.data == 1) {
							commit('setOnline', {
								isOnline: true
							})
							resolve(true)
						} else {
							commit('setOnline', {
								isOnline: false
							})
							resolve(false)
						}
					}).catch((res) => {
						reject(false)
					})
				}
				// #endif
			})
		}
	},
	getters: {
		getModalState: state => state.modal,
		...getters
	}
})