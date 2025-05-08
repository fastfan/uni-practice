import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import store from './store'
import tui from './common/httpRequest'
import utils from './utils/util.js'

//import "common/default-passive-events.js"
// 引入银联云闪付 移除
// import {initJgoldPlan} from "common/jgoldplan.js"
// initJgoldPlan();

// 初始化zfbsdk 移除
// import zfb from "common/zfbsdk/zfbsdk.js"

// 引入银联云闪付小程序sdk 移除
// import upsdk from 'common/upsdk/upsdk.js'

// 引入云闪付小程序授权组件 移除
// import VueCupUi from '@/components/vue-cup-ui'
// Vue.use(VueCupUi);
// 引入银联云闪付小程序sdk 移除
// Vue.prototype.$upsdk = upsdk

// 初始化zfbsdk 移除
// Vue.prototype.$zfb = zfb
Vue.config.productionTip = false
// 初始化下拉刷新控件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.prototype.$tui = tui
Vue.prototype.$util = utils
Vue.prototype.$store = store
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
App.mpType = 'app'
// #ifndef MP-TOUTIAO
//网络监听
setTimeout(() => {
	uni.onNetworkStatusChange(function(res) {
		//console.log(res.networkType);
		store.commit("networkChange", {
			isConnected: res.isConnected
		})
	});
}, 100)
// #endif

import {
	mpApi
} from '@/api'

Vue.prototype.$mpApi = mpApi
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif









App.mpType = 'app'