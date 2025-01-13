import {
	mpApi
} from '@/api'
const user = {
	state: {
		// 用户信息
		userInfo: {}
	},
	mutations: {
		SET_USER_INFO(state, userInfo) {
			state.userInfo = userInfo || {}
		}
	},
	actions: {
		/**
		 * 微信登录
		 */
		async Login({
			commit
		}, code) {
			commit('SET_USER_INFO', {
				code
			})
		}
	}
}

export default user