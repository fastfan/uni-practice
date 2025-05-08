const shopDetail = {
	state: {
		shopCarList: [], // 购物车列表
		storeType: 'normal', // 商家类型
		shopFirstCategoryList: [], // 商家一级分类列表
	},
	mutations: {
		SET_SHOP_CAR_LIST(state, shopCarList) {
			state.shopCarList = shopCarList || []
		},
		SET_SHOP_TYPE(state, storeType) {
			state.storeType = storeType || []
		},
		SET_SHOP_FIRST_CATEGORY_LIST(state, shopFirstCategoryList) {
			state.shopFirstCategoryList = shopFirstCategoryList || []
		}
	},
	actions: {
		updateShopCarList({
			commit
		}, data) {
			commit('SET_SHOP_CAR_LIST', data);
		},
		updatestoreType({
			commit
		}, data) {
			commit('SET_SHOP_TYPE', data);
		},
		updateShopFirstCategoryList({
			commit
		}, data) {
			commit('SET_SHOP_FIRST_CATEGORY_LIST', data);
		}
	}
}

export default shopDetail