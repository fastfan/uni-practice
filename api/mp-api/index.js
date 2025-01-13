/**
 * @Author: weifan
 * @CreateTime: 2024-12-30 16:38:51
 * @Description: 小程序相关的接口定义 
 */
import instance from './instance'
import {
	convertRESTAPI
} from '../util'

// 登录和注册
function usertelephoneLogin(data, opts = {}) {
	return instance({
		method: 'post',
		url: '/api/wxLspAuth/login',
		opts: Object.assign({
			headers: {
				'Accept': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				'Content-Type': 'application/json;charset=utf-8'
			}
		}, {
			data
		}, opts)
	})
}

// 获取用户信息
function getUserInfo(data, opts = {}) {
	return instance({
		method: 'post',
		url: '/api/mem/user/getUserInfo',
		opts: Object.assign({
			headers: {
				'Accept': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				'Content-Type': 'application/json;charset=utf-8'
			}
		}, {
			data
		}, opts)
	})
}

// 获取用户信息
function getDriverInfo(data, opts = {}) {
	return instance({
		method: 'post',
		url: '/api/tms/driver/getDriverInfo',
		opts: Object.assign({
			headers: {
				'Accept': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				'Content-Type': 'application/json;charset=utf-8'
			}
		}, {
			data
		}, opts)
	})
}

// 获取用户积分
function getUserPoints(data, opts = {}) {
	return instance({
		method: 'post',
		url: '/api/mem/user/getUserPoints',
		opts: Object.assign({
			headers: {
				'Accept': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				'Content-Type': 'application/json;charset=utf-8'
			}
		}, {
			data
		}, opts)
	})
}
// function usertelephoneGetopenid(data, opts = {}) {
// 	return instance({
// 		method: 'get',
// 		url: convertRESTAPI('/v1/demo/usertelephone/getopenid/{code}', {
// 			path: data
// 		}),
// 		opts: Object.assign({
// 			headers: {
// 				'Content-Type': 'application/json;charset=UTF-8'
// 			}
// 		}, opts)
// 	})
// }


export {
	usertelephoneLogin,
	getUserInfo,
	getDriverInfo,
	getUserPoints
}