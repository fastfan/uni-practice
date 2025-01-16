import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user.js'
import base from './modules/base.js'
import share from './modules/share.js'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		base,
		share
	},
	state: {

	},
	mutations: {

	},
	actions: {

	},
	getters
})