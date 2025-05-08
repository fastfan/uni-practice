import tui from '@/common/httpRequest.js'
import util from '@/utils/util.js'
const order = '/api/mch/order'
const refund = '/api/mch/refund'
const orderEvaluation = '/api/mch/orderEvaluation'
class OrderServer {
	// 用户订单列表
	orderList(data) {
		return tui.request({
			url: `${order}/pageList`,
			data: data
		})
	}

	// 员工获取订单列表
	staffOrderList(data) {
		return tui.request({
			url: '/api/pms/orderInfo/staff/pageList',
			data: data
		})
	}

	// 查询订单详情接口
	orderDetail(data) {
		return tui.request({
			url: `${order}/detail`,
			data: data
		})
	}

	//根据二维码信息查询订单详情接口
	orderDetailByQrcode(data) {
		return tui.request({
			url: '/api/pms/orderInfo/staff/getDetail',
			data: data
		})
	}

	//员工根据订单id查询订单详情接口
	orderDetailById(data) {
		return tui.request({
			url: '/api/pms/orderInfo/staff/getDetailById',
			data: data
		})
	}

	// 删除订单
	orderDelete(data) {
		return tui.request({
			url: `${order}/delete`,
			data: data
		})
	}

	/* 定时获取扫码状态 */
	getScanResult(data) {
		return tui.request({
			url: `${order}/getScanResult`,
			data: data
		});
	}

	/* 获取二维码数据 */
	getQrScran(data) {
		return tui.request({
			url: `${order}/generateQrCode`,
			data: data
		});
	}

	// 取消订单
	orderCancel(data) {
		return tui.request({
			url: `${order}/cancel`,
			data: data
		})
	}

	// 申请退款
	orderForbackMoney(data) {
		return tui.request({
			url: `${refund}/applyRefund`,
			data: data
		})
	}

	// 确认完成订单
	orderComplate(data) {
		return tui.request({
			url: '/api/pms/orderInfo/complete',
			data: data
		})
	}


	// 根据订单id获取支付信息
	wxPayByOrderId(data) {
		return tui.request({
			url: `${order}/goToPay`,
			data: data
		})
	}

	//订单评价
	orderEvaluationInsert(data) {
		return tui.request({
			url: `${orderEvaluation}/insert`,
			data: data
		})
	}

	//商家查看订单评价
	orderEvaluationListByStoreId(data) {
		return tui.request({
			url: `${orderEvaluation}/listByStoreId`,
			data: data
		})
	}
	// 商家小票页面订单详情
	getTicketByOrderNo(data) {
		return tui.request({
			url: '/api/pms/merchant/getTicketByOrderNo',
			data: data
		})
	}

	//员工确认商品订单被取件
	orderComplate(data) {
		return tui.request({
			url: '/api/pms/orderInfo/staff/setCompleted',
			data: data
		})
	}
}

let orderServer = new OrderServer()

export {
	orderServer
}