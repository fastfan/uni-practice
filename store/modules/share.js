const share = {
	state: {
		shareImgUrl: ''
	},
	mutations: {
		SET_SHARE_IMGURL(state, shareImgUrl) {
			state.shareImgUrl = shareImgUrl || ''
		}
	},
	actions: {
		updateSharedData({
			commit
		}, data) {
			commit('SET_SHARE_IMGURL', data);
		}
	}
}

export default share