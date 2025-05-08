<!-- 浏览外部链接 -页面 -->
<template>
	<view class="content">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			url: ''
		}
	},
	onLoad(options) {
		// console.log('options：：：：：：：', options)
		this.url = options.url || ''
	},
	onShareAppMessage(res) {
		return {
			title: '邀请您加入51积分本地生活',
			path: '/subHome/webview/webview?url=' + this.url,
			imageUrl: ''
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	width: 100vw;
	height: 100vh;
}
</style>
