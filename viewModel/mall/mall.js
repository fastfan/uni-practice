import tui from '@/common/httpRequest.js'
import utils from '@/utils/util.js'
const product = '/api/mch/product'
const shoppingCart = '/api/mch/shoppingCart'
const order = '/api/mch/order'

class MallServer {
	/* 获取商品详情新 */
	mallDetailNew(params) {
		let url = ''
		if (!utils.isEmpty(params.id)) {
			url = `${product}/detail`
		} else if (!utils.isEmpty(params.productNo)) {
			url = `${product}/getDetailByNo`
		}
		return tui.request({
			url: url,
			data: params
		})
	}
	/* 商品下单 */
	orderMall(params) {
		return tui.request({
			url: '/api/pms/orderInfo/generateOrder',
			data: params
		})
	}
	/* 提交订单 */
	uploadOrder(params) {
		return tui.request({
			url: '/api/pms/orderInfo/submitOrder',
			data: params
		})
	}
	/* 获取订单详情 */
	getOrderInfo(params) {
		return tui.request({
			url: '/api/pms/orderInfo/getDetail',
			data: params
		})
	}
	/* 发起支付 */
	pay(params) {
		return tui.request({
			url: '/api/pms/orderInfo/exchange',
			data: params
		})
	}
	/* 分页获取订单列表 */
	orderList(params) {
		return tui.request({
			url: '/api/pms/orderInfo/pageList',
			data: params
		})
	}
	/* 删除订单 */
	deleteOrder(params) {
		return tui.request({
			url: '/api/pms/orderInfo/delete',
			data: params
		})
	}
	/* 取消订单 */
	cancelOrder(params) {
		return tui.request({
			url: '/api/pms/orderInfo/cancel',
			data: params
		})
	}

	/* 获取购物车列表 */
	shopCarList(params) {
		return tui.request({
			url: '/api/pms/shoppingCart/list',
			data: params
		})
	}

	/* 商家分组获取购物车列表 */
	siteShopCarList(params) {
		return tui.request({
			url: `${shoppingCart}/groupList`,
			data: params
		})
	}

	/* 进入商家店铺页面，查询我的购物车列表页面的时候调用此接口 */
	getStoreShopCarList(params) {
		return tui.request({
			url: `${shoppingCart}/listByStore`,
			data: params
		})
	}

	/* 加入购物车 */
	addShopCar(data) {
		return tui.request({
			url: `${shoppingCart}/insert`,
			data: data
		})
	}

	// 购物车增加商品数量
	shopCarAdd(data) {
		return tui.request({
			url: `${shoppingCart}/increase`,
			data: data
		})
	}

	// 购物车减少商品数量
	shopCarDec(data) {
		return tui.request({
			url: `${shoppingCart}/decrease`,
			data: data
		})
	}

	// 清空购物车
	shopCarClear(data) {
		return tui.request({
			url: `${shoppingCart}/clean`,
			data: data
		})
	}

	// 批量删除购物车
	shopCarDelete(data) {
		return tui.request({
			url: `${shoppingCart}/batchDelete`,
			data: data
		})
	}

	// 从购物车支付(从我的购物车页面进入下单页面)
	shopCarToPay(data) {
		return tui.request({
			url: `${shoppingCart}/toPay`,
			data: data
		})
	}

	// 购物车数据变化的时候调用此接口，可以获取待支付信息
	getShopCarPayInfo(data) {
		return tui.request({
			url: `${shoppingCart}/getPayInfo`,
			data: data
		})
	}

	// 下单
	genOrderByCart(data) {
		return tui.request({
			url: data.isProduct == true ? `${order}/genOrderByProduct` : `${order}/genOrderByCart`,
			data: data
		})
	}

	// 单个商品直接支付
	productToPay(data) {
		return tui.request({
			url: `${product}/toPay`,
			data: data
		})
	}

	// 单个商品直接支付
	repurchase(data) {
		return tui.request({
			url: `${order}/repurchase`,
			data: data
		})
	}
}

export {
	MallServer
}