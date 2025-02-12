const shopCar = {
	state: {
		shopCarList: [],
	},
	mutations: {
		SET_SHOP_CAR_LIST(state, shopCarList) {
			state.shopCarList = shopCarList || []
		}
	},
	actions: {
		updateShopCarList({
			commit
		}, data) {
			commit('SET_SHOP_CAR_LIST', data);
		}
	}
}

export default shopCar