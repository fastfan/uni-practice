import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user.js'
import base from './modules/base.js'
import share from './modules/share.js'
import shopDetail from './modules/shopDetail.js'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		base,
		share,
		shopDetail
	},
	state: {

	},
	mutations: {

	},
	actions: {

	},
	getters
})