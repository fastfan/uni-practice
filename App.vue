<script>
	// import auth from '@/utils/auth'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// auth()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "@/common/public.css";

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