import tui from '@/common/httpRequest.js'
import utils from '@/utils/util.js'

const moduleCategory = '/api/mch/moduleCategory'
const store = '/api/mch/store'
const certRecord = '/api/mch/certRecord'
const product = '/api/mch/product'
const productCategory = '/api/mch/productCategory'
const inviteRecord = '/api/mch/inviteRecord'
class ShopServer {
	/* 首页获取一级分类的时候和商家认证选择商家分类的时候调用 */
	getShopCate(data) {
		return tui.request({
			url: `${moduleCategory}/parentList`,
			data: data,
		})
	}
	/* 首页调用此接口获取两级分类列表 */
	getShopCateTree(data) {
		return tui.request({
			url: `${moduleCategory}/treeList`,
			data: data,
		})
	}
	/* 51积分生活服务商城页面根据一级分类编号获取二级分类列表 */
	getShopCateChild(data) {
		return tui.request({
			url: `${moduleCategory}/listByCategoryNo`,
			data: data,
		})
	}
	/* 查询商家信息（包括优选商家） */
	getShopStorePageList(data) {
		return tui.request({
			url: `${store}/pageList`,
			data: data,
		})
	}
	/*
		根据商家ID查询商家详情
	*/
	getShopDetailById(data) {
		return tui.request({
			url: `${store}/getDetailById`,
			data: data,
		})
	}

	/*
		商家入驻
		51积分生活服务商家入驻调用此接
		用户信息中storeCertStatus为0（未认证）或者空的时候可以请求此接口 
	*/
	shopCertRecordInsert(data) {
		return tui.request({
			url: `${certRecord}/insert`,
			data: data,
		})
	}
	/*
		调用此接口获取商家认证记录
	*/
	shopCertRecordDetail(data) {
		return tui.request({
			url: `${certRecord}/detail`,
			data: data,
		})
	}
	/*
		商家入驻审核未通过，入驻信息修改调用此接口
	*/
	shopCertRecordUpdate(data) {
		return tui.request({
			url: `${certRecord}/update`,
			data: data,
		})
	}
	/* 首页查询优选商品列表 */
	getRecommendProductList(data) {
		return tui.request({
			url: `${product}/recommendList`,
			data: data,
		})
	}
	/* 进入商家店铺页面，调用此接口分页查询商品列表 */
	getProductPageList(data) {
		return tui.request({
			url: `${product}/pageList`,
			data: data,
		})
	}
	/*
		根据商家ID获取商家商品分类
	*/
	getProductCategoryList(data) {
		return tui.request({
			url: `${productCategory}/list`,
			data: data,
		})
	}

	// 查询附近的商家
	nearbyPageList(data) {
		return tui.request({
			url: `${store}/nearbyPageList`,
			data: data
		})
	}


	// 用户点击商家管理员分享的邀请员工加入连接进入邀请页面，同意加入后调用此接口成为商家的用户
	employeeJoinStore(data) {
		return tui.request({
			url: `${store}/joinStore`,
			data: data
		})
	}

	// 收店页面调用此接口查询当前用户的收店的收益统计信息
	inviteStatistics(data) {
		return tui.request({
			url: `${inviteRecord}/inviteStatistics`,
			data: data
		})
	}

	// 收店页面调用此接口分页查询邀请商家入驻的记录
	inviteRecordList(data) {
		return tui.request({
			url: `${inviteRecord}/pageList`,
			data: data
		})
	}
	// 收店收益的排行榜
	inviteRankingList(data) {
		return tui.request({
			url: `${inviteRecord}/rankingList`,
			data: data
		})
	}
}

export {
	ShopServer
}