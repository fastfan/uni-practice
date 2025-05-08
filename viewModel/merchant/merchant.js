import tui from '@/common/httpRequest.js'
import utils from '@/utils/util.js'

const authByUserToken = '/api/mch/userAuth/authByUserToken'
const mchRefreshToken = '/api/mch/userAuth/refreshToken'
const orderList = '/api/mch/order/pageList'
const orderDetail = '/api/mch/order/detail'


const whiteList = [
	mchRefreshToken
]

class MerchantServer {

	allowRequest(url) {
		let allow = false
		for (let i = 0; i < whiteList.length; i++) {
			let endpoint = whiteList[i]
			if (url.includes(endpoint)) {
				allow = true
				break
			}
		}
		return allow
	}

	request(params) {
		params['isMerchant'] = true
		return tui.request(params)
	}

	authByUserToken(params) {
		return this.request({
			url: authByUserToken,
			data: params
		})
	}

	mchRefreshToken(params) {
		return this.request({
			url: mchRefreshToken,
			data: params
		})
	}

	// 获取我的商家
	getMyStore(params) {
		return this.request({
			url: '/api/mch/store/getMyStore',
			data: params
		})
	}

	// 编辑商家基本信息
	editStoreInfo(params) {
		return this.request({
			url: '/api/mch/store/updateBaseInfo',
			data: params
		})
	}

	// 商家收入统计
	incomeStatistics(params) {
		return this.request({
			url: '/api/mch/order/incomeStatistics',
			data: params
		})
	}

	// 分享赚收益统计
	shareStatistics(params) {
		return this.request({
			url: '/api/mch/store/shareStatistics',
			data: params
		})
	}

	// 商家余额统计
	storeBalance(params) {
		return this.request({
			url: '/api/mch/store/getBalance',
			data: params
		})
	}

	// 商家余额列表
	balanceRecords(params) {
		return this.request({
			url: '/api/mch/balanceRecord/pageList',
			data: params
		})
	}

	// 订单列表
	orderList(params) {
		return this.request({
			url: orderList,
			data: params
		})
	}

	// 订单详情
	orderDetail(params) {
		return this.request({
			url: orderDetail,
			data: params
		})
	}

	// 确认取件
	orderPickedUp(params) {
		return this.request({
			url: '/api/mch/order/pickedUp',
			data: params
		})
	}

	// 开始配送
	startDelivery(params) {
		return this.request({
			url: '/api/mch/order/startDelivery',
			data: params
		})
	}

	// 删除订单
	orderDelete(params) {
		return this.request({
			url: '',
			data: params
		})
	}

	// 桌位添加
	insertDesk(params) {
		return this.request({
			url: '/api/mch/storeTable/insert',
			data: params
		})
	}

	// 桌位列表
	deskList(params) {
		return this.request({
			url: '/api/mch/storeTable/list',
			data: params
		})
	}

	// 桌位编辑
	updateDesk(params) {
		return this.request({
			url: '/api/mch/storeTable/update',
			data: params
		})
	}

	// 桌位删除
	deleteDesk(params) {
		return this.request({
			url: '/api/mch/storeTable/delete',
			data: params
		})
	}

	// 配送管理配置信息
	getDeliveryConfig(params) {
		return this.request({
			url: '/api/mch/deliveryConfig/getDeliveryConfig',
			data: params
		})
	}

	// 配送管理修改配置信息
	setDeliveryConfig(params) {
		return this.request({
			url: '/api/mch/deliveryConfig/setDeliveryConfig',
			data: params
		})
	}

	// wifi添加
	insertWifi(params) {
		return this.request({
			url: '/api/mch/storeWifi/insert',
			data: params
		})
	}

	// wifi列表
	WifiList(params) {
		return this.request({
			url: '/api/mch/storeWifi/list',
			data: params
		})
	}

	// wifi编辑
	updateWifi(params) {
		return this.request({
			url: '/api/mch/storeWifi/update',
			data: params
		})
	}

	// wifi删除
	deleteWifi(params) {
		return this.request({
			url: '/api/mch/storeWifi/delete',
			data: params
		})
	}

	// 员工邀请
	getRequestId(params) {
		return this.request({
			url: '/api/mch/user/getRequestId',
			data: params
		})
	}

	// 员工列表
	employeeList(params) {
		return this.request({
			url: '/api/mch/user/pageList',
			data: params
		})
	}

	// 员工编辑
	updateEmployee(params) {
		return this.request({
			url: '/api/mch/user/update',
			data: params
		})
	}

	// 员工删除
	deleteEmployee(params) {
		return this.request({
			url: '/api/mch/user/delete',
			data: params
		})
	}

	// 商家粉丝
	merchantFansPageList(params) {
		return this.request({
			url: '/api/mch/store/fansPageList',
			data: params
		})
	}

	// 商家广告
	merchantAdvertList(params) {
		return this.request({
			url: '/api/cms/advert/pageList',
			data: params
		})
	}
}

const merchantServer = new MerchantServer()

export {
	merchantServer
}