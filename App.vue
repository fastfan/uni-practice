<script>
import tui from 'common/httpRequest.js'
import store from 'store/index.js'
import { UserServer } from 'viewModel/user/user.js'
import { mapCallCarServer } from 'viewModel/call/callcar.js'
export default {
	onLaunch: function (options) {
		// 非开发工具移除 console.log console.info
		// if (uni.getSystemInfoSync().platform !== 'devtools') {
		// 	console.log = () => {}
		// 	console.info = () => {}
		// }
		console.log('App Launch')
		//获取系统信息
		uni.getSystemInfo({
			success: (res) => {
				console.log(res)
				this.globalData.winWidth = res.windowWidth
				this.globalData.winHeight = res.windowHeight
				this.globalData.screenWidth = res.screenWidth
				this.globalData.statusBarHeight = res.statusBarHeight
				let statusBarHeight = res.statusBarHeight // 获取状态栏高度
				let osName = res.osName // 获取设备平台
				if (osName === 'ios') {
					this.globalData.navBarHeight = 44
				} else if (osName === 'android') {
					this.globalData.navBarHeight = 48
				} else {
					this.globalData.navBarHeight = 44
				}
				this.globalData.winTabbarHeight = 50
			}
		})
		tui.refreshLogin()
	},
	onShow: async function () {
		console.log('App Show')
		mapCallCarServer.getUserLocation((flag) => {
			if (flag)
				mapCallCarServer.getLocation((res) => {
					this.globalData.latitude = res.latitude
					this.globalData.longitude = res.longitude
					// const routeList = ['pages/index/index', 'pages/mall/mall', 'pages/login/login']
					// const getCurrentPagePath = this.$util.getCurrentPagePath()
					// console.log(getCurrentPagePath)
					// if (routeList.includes(getCurrentPagePath)) {
					this.$store.dispatch('SET_LOCATION', { latitude: res.latitude, longitude: res.longitude })
					// }
				})
		})
	},
	onHide: function () {
		console.log('App Hide')
	},
	globalData: {
		winWidth: 0,
		winHeight: 0,
		screenWidth: 0,
		navBarHeight: 0,
		statusBarHeight: 0,
		winTabbarHeight: 0,
		openid: '',
		latitude: '',
		longitude: '',
		location: {
			lat: 0,
			lng: 0
		},
		userInfo: uni.getStorageSync('userInfo') || Object,
		recruitingId: '',
		pay: {
			mid: '',
			userName: ''
		},
		qrCodeData: '',
		isShowContainer: false,
		aid: '',
		mealStoreNo: '',
		userAgreement: '',
		payMentAgreement: ''
	}
}
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/common/public.scss';

* {
	user-select: none;
}

#app {
	height: 100%;
	width: 100%;
	position: relative;
}

page {
	// 总容器高度撑满屏幕
	height: 100%;
	// 使容器内元素使用flex布局
	display: flex;
	flex-direction: column;
}
</style>
