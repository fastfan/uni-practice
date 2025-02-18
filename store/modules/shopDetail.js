const shopDetail = {
	state: {
		shopCarList: [], // 购物车列表
		shopType: 'normal' // 商家类型
	},
	mutations: {
		SET_SHOP_CAR_LIST(state, shopCarList) {
			state.shopCarList = shopCarList || []
		},
		SET_SHOP_TYPE(state, shopType) {
			state.shopType = shopType || []
		}
	},
	actions: {
		updateShopCarList({
			commit
		}, data) {
			commit('SET_SHOP_CAR_LIST', data);
		},
		updateShopType({
			commit
		}, data) {
			commit('SET_SHOP_TYPE', data);
		}
	}
}

export default shopDetail