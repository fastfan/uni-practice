<script>
// import auth from '@/utils/auth'
export default {
	onLaunch: function () {
		console.log('App Launch')
		// auth()
		//获取系统信息
		uni.getSystemInfo({
			success: (res) => {
				console.log('res:::::::', res)
				this.globalData.winWidth = res.windowWidth
				this.globalData.winHeight = res.windowHeight
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
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	},
	globalData: {
		winWidth: 0,
		winHeight: 0,
		navBarHeight: 0,
		statusBarHeight: 0,
		winTabbarHeight: 0
	}
}
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uview-ui/index.scss';
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
