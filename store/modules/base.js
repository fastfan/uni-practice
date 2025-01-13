let clientHeight, clientWidth
uni.getSystemInfo({
	success: function(res) {
		console.log(res.windowHeight)
		clientWidth = res.screenWidth
		clientWidth = res.screenHeight
	}
})
const base = {
	state: {
		bodyHeight: clientHeight,
		bodyWidth: clientWidth,
		judgeValue: 20,
		homeRefresh: 60,
		loading: false,
	},
	mutations: {
		SET_BODY_HEIGHT(state, bodyHeight) {
			state.bodyHeight = bodyHeight || ''
		},
		SET_BODY_WIDTH(state, bodyWidth) {
			state.bodyWidth = bodyWidth || ''
		}
	},
	actions: {}
}

export default base