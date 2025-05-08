import tui from '@/common/httpRequest'
import utils from '@/utils/util.js'
import {
	decrypt
} from '@/common/sm4/sm4.js'

/*
 * @Description: 跳转
 * @param {number} fromId - 跳转来源标识
 *   2: 司机端 -- 已弃用
 *   3: 地图叫车页 -- 已弃用
 *   4: 应聘列表
 *   5: 车机授权登录
 *   6: 员工扫码核销座套更换
 *   7: 员工商城扫码核销
 *   8: 员工扫码核销中奖记录页面 -- 后台占用
 *   9: 员工扫码核销礼品 -- 后台占用
 *   10: 跳转我的礼品列表
 *   11: 跳转到我的中奖记录
 *   12: 跳转到司机找人列表
 *   13: 跳转员工服务
 *   14: 跳转邀新活动页面 
 *   15: 跳转到我的订单页面
 *   16: 跳转到教师扫码点餐页面
 *   17: 跳转到我的找人列表页面
 *   18: 跳转到我的找车列表页面
 *   19: 跳转到门贴定制商品详情页面
 *   20: 跳转到商城列表页
 *   21: 跳转到座套更换列表
 *   22: 跳转到新车预约活动页面
 *   23: 跳转至新车预约记录页面
 *   24: 跳转至景点线路详情页面
 * 	 25: 跳转到抽奖页面
 * 	 26: 跳转到站点详情
 *   60: 跳转到商家端订单详情
 *   100: 跳转到商家详情
 *   101: 跳转到商家入驻页面
 *   102: 分享赚邀请人弹窗
 *   103: 员工邀请弹窗
 */

function miniQueryOptions(options) {
	console.log('options:::::::', options)
	let params = {}
	try {
		if (!utils.isEmpty(options.q)) {
			let newQuery = ''
			let query = decodeURIComponent(options.q)
			newQuery = utils.getQueryObject(query)
			if (!utils.isEmpty(newQuery)) {
				if (newQuery.d) {
					let decryptData = decrypt(newQuery.d)
					console.log('-----解密数据-----:', decryptData)
					params = utils.getQueryObject(decryptData)
				} else {
					params = newQuery
				}
			}
		} else {
			if (options.d) {
				let decryptData = decrypt(options.d)
				console.log('-----解密数据-----:', decryptData)
				params = utils.getQueryObject(decryptData)
			} else {
				let query = decodeURLRecursively(options)
				if (utils.isValidUrl(query)) {
					const obj = utils.getQueryObject(query)
					if (obj.d) {
						let decryptData = decrypt(obj.d)
						console.log('-----解密数据-----:', decryptData)
						params = utils.getQueryObject(decryptData)
					} else {
						params = obj
					}
				} else {
					params = utils.getQueryObject(query)
				}
			}
		}
	} catch (e) {
		console.log('miniQueryOptions error:' + e.message)
	}

	// if (options.q || options.d) {
	// 	let newQuery = ''
	// 	let query = options.q ? decodeURIComponent(options.q) : options.d
	// 	if (options.q) {
	// 		if (query.includes("https://")) {
	// 			newQuery = utils.getQueryObject(query)
	// 		} else {
	// 			newQuery = utils.getQueryObject(query).d
	// 		}
	// 	}
	// 	if (options.d) {
	// 		newQuery = query
	// 	}
	// 	console.log('newQuery:', newQuery)
	// 	let decryptData = decrypt(newQuery)
	// 	console.log('-----解密数据-----:', decryptData)
	// 	params = utils.getQueryObject(decryptData)
	// } else {
	// 	params = {
	// 		...options
	// 	}
	// }
	console.log('-----params-----:', params)
	tui.fromPage = params.from
	params.uid && uni.setStorageSync('inviteUserId', params.uid)
	params.inviteUserId && uni.setStorageSync('inviteUserId', params.inviteUserId)
	params.takeOverStoreUid && uni.setStorageSync('inviteUserId', params.takeOverStoreUid)
	params.storeId && uni.setStorageSync('storeId', params.storeId)
	return params
}

function decodeURLRecursively(url) {
	if (url.indexOf('%') != -1) {
		return decodeURLRecursively(decodeURIComponent(url));
	}
	return url;
}


function globalJump(target) {
	let {
		from,
		qrCodeData,
		mealStoreNo,
		recruitingId,
		applyJobId,
		uid,
		aid,
		storeNo,
		storeType,
		storeId,
		inviteUserId,
		takeOverStoreUid,
		takeOverStorePhone,
		orderId,
		createTime
	} = target
	// uid && uni.setStorageSync('uid', uid)
	takeOverStoreUid && uni.setStorageSync('takeOverStoreUid', takeOverStoreUid)
	let fromId = Number(from)
	let currentPage = utils.getCurrentPagePath()
	switch (fromId) {
		// 应聘列表
		case 4:
			uni.navigateTo({
				url: '/subHome/recruitingNewList/recruitingNewList'
			})
			break;
			// 车机授权登录
		case 5:
			uni.navigateTo({
				url: `/pages/tabletAuth/auth/auth?qrCodeData=${qrCodeData}`
			})
			break;
			// 员工扫码核销座套更换
		case 6:
			uni.navigateTo({
				url: `/subMy/staffService/superChangeSeatCover/superChangeSeatCover?qrCodeData=${qrCodeData}`
			})
			break;
		case 7:
			// 员工商城扫码核销
			uni.navigateTo({
				url: `/subMy/staffService/mallOrderCheckIn/mallOrderCheckIn?qrCodeData=${qrCodeData}`
			})
			break;
			// 跳转我的礼品列表
		case 10:
			break;
			// 跳转到我的中奖记录
		case 11:
			uni.navigateTo({
				url: '/subMy/gameRecordList/gameRecordList'
			})
			break;
			// 跳转到司机找人列表
		case 12:
			uni.navigateTo({
				url: '/subHome/recruitingNewList/recruitingNewList'
			})
			break;
			// 跳转员工服务
		case 13:
			uni.navigateTo({
				url: `/subMy/staffService/staffService?qrCodeData=${qrCodeData}`
			})
			break;
			// 跳转邀新活动页面 
		case 14:
			break;
			// 跳转到我的订单页面
		case 15:
			uni.navigateTo({
				url: '/subMy/orderList/orderList'
			})
			break;

			// 跳转到教师扫码点餐页面
		case 16:
			uni.navigateTo({
				url: `/subHome/teacherPay/teacherPay?mealStoreNo=${mealStoreNo}`
			})
			break;
			// 跳转到我的找人列表页面
		case 17:
			uni.navigateTo({
				url: `/subMy/recruitingNewList/myAcceptOfferList/myAcceptOfferList?type=0&recruitingId=${recruitingId}`
			})
			break;
			// 跳转到我的找车列表页面
		case 18:
			uni.navigateTo({
				url: `/subMy/recruitingNewList/myAcceptOfferList/myAcceptOfferList?type=1&recruitingId=${applyJobId}`
			})
			break;
			// 跳转到门贴定制商品详情页面	
		case 19:
			uni.navigateTo({
				url: `/subMall/mallDetail/mallDetail?productNo=MTDZ01`
			})
			break;
			// 跳转到商城列表页
		case 20:
			uni.switchTab({
				url: '/pages/mall/mall'
			})
			break;
			// 跳转到座套更换列表
		case 21:
			tui.fromPage = 21

			// uni.navigateTo({
			// 	url: '/subHome/siteList/siteList'
			// })
			break;
			// 跳转到新车预约活动页面
		case 22:
			uni.navigateTo({
				url: '/subHome/buyCar/buyCar'
			})
			break;
			//跳转至新车预约记录页面
		case 23:
			uni.navigateTo({
				url: '/subHome/buyCar/myBuyCarRecord/myBuyCarRecord?fromd=2'
			})
			break;
			//跳转至景点线路详情页面
		case 24:
			uni.navigateTo({
				url: `/subHome/tripDetail/tripDetail?id=${aid}`
			})
			break;
			// 跳转至抽奖页面
		case 25:
			break;
		case 26:
			uni.navigateTo({
				url: `/subHome/siteDetail/siteDetail?storeNo=${storeNo}`
			})
			break;
		case 60:
			// 跳转至商家订单
			if (currentPage == 'subMy/shopManage/shopManage') { //处理从商家管理页面进入时的跳转问题
				uni.navigateTo({
					url: `/subShopManage/orderDetail/orderDetail?orderId=${orderId}&createTime=${createTime}&from=${from}`
				})
			} else {
				uni.navigateTo({
					url: `/subMy/shopManage/shopManage?orderId=${orderId}&createTime=${createTime}&from=${from}`
				})
			}
			break;
		case 100:
			// 跳转到商家详情
			uni.navigateTo({
				url: `/subHome/shopDetail/shopDetail?storeId=${storeId}`
			})
			break;
		case 101:
			// 跳转到商家入驻
			uni.navigateTo({
				url: `/subHome/shopSettled/shopSettled`
			})
			break;
	}
}

export {
	miniQueryOptions,
	globalJump
}