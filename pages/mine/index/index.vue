<template>
	<view class="user_center">
		<!-- 		<u-modal :show="show" :title="title" :content='content' showCancelButton="true" confirm-text="立即登录"
			cancel-text="稍后登录" @cancel="cancel" @confirm="confirm"></u-modal> -->
		<view class="user_center_top">
			<view class="lt user_center_top_left"></view>
			<view class="lt user_center_top_right" @click="savePageAsImage">
				<view>{{ userInfo.nickname }}</view>
				<view style="margin-top: 10rpx">{{ userInfo.phoneNumber }}</view>
			</view>
			<!-- 	<view class="user_center_top_bot">
				<view class="bot_text">
					<view>{{ userInfo.integral || 0 }}</view>
					<view>积分</view>
				</view>
				<view class="bot_text">
					<view>1000</view>
					<view>激励分</view>
				</view>
			</view> -->
		</view>
		<view class="user_center_mid">
			<!-- <u--image src="/static/fenxiangzhuan@2x.png" width="100%" height="272rpx" @click="clickToShare"></u--image> -->
			<!-- 	<u-button type="primary" class="user_center_mid_text" :plain="true" text="我的邀请弹窗" @click="clickInvite"></u-button> -->
		</view>
		<view class="user_center_btm">
			<my-shares></my-shares>
		</view>
		<my-invite ref="myInvite" @close="closeEvent" @ensure="ensureEvent"></my-invite>
		<!-- 	<u-button text="获取当前用户的司机信息" :plain="true" type="primary" @click="getDriverInfo">
		</u-button> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			isVisible: false,
			title: '提示',
			content: '为了您更好的体验，请先前往登录！',
			userInfo: {
				headImgUrl: '/static/default_avatar.png',
				nickname: '路易威登',
				phoneNumber: '15967145046'
			},
			driverInfo: {}
		}
	},
	methods: {
		clickInvite() {
			this.$refs.myInvite.open()
		},
		ensureEvent(e) {
			console.log('e::::::::::点击了查看玩法', e)
		},
		closeEvent(e) {
			console.log('e::::::::::点击了关闭', e)
		},
		confirm() {
			uni.$u.route({
				url: '/pages/login/login',
				type: 'to'
			})
		},
		cancel() {
			this.show = false
			uni.$u.route({
				url: '/pages/home/index/index',
				type: 'tab'
			})
		},
		async getDriverInfo() {
			const data = {
				accessToken: this.accessToken,
				appKey: '6285175579683467',
				timestamp: new Date().getTime()
			}
			const res = await this.$mpApi.getDriverInfo(data)
			console.log('获取用户司机信息:::::::::', res)
			if (res.code == 200) {
				Object.keys(res.data).map((key, index) => {
					this.driverInfo[key] = res.data[key]
				})
			} else {
				uni.$u.toast(res.msg)
			}
			console.log('driverInfo:::::::::', this.driverInfo)
		}
	},
	computed: {
		//这里需要把store 动态的数据放到computed里面才会同步更新 视图
		accessToken() {
			return this.$store.getters.accessToken
		},
		refreshToken() {
			return this.$store.getters.refreshToken
		}
	},
	async onShow() {
		console.log('this.accessToken:::::::::::', this.accessToken)
		console.log('this.refreshToken:::::::::::', this.refreshToken)
		// if (this.refreshToken) {
		// 	console.log(1111111111)
		// 	this.show = false
		// 	const data = {
		// 		accessToken: this.accessToken,
		// 		appKey: '6285175579683467',
		// 		timestamp: new Date().getTime()
		// 	}
		// 	const res = await this.$mpApi.getUserInfo(data)
		// 	console.log('获取用户信息:::::::::', res)
		// 	if (res.code === 200) {
		// 		Object.keys(res.data).map((key, index) => {
		// 			this.userInfo[key] = res.data[key]
		// 		})
		// 		console.log('userInfo:::::::::', this.userInfo)
		// 	}
		// 	const data2 = {
		// 		accessToken: this.accessToken,
		// 		appKey: '6285175579683467',
		// 		timestamp: new Date().getTime()
		// 	}
		// 	const res2 = await this.$mpApi.getUserPoints(data2)
		// 	if (res2.code === 200) {
		// 		this.userInfo.integral = res2.data
		// 	}
		// } else {
		// 	console.log(222222222)
		// 	this.show = true
		// }
	},
	onLoad() {
		// this.show = true
		// console.log('load:::::::::::', this.$store.getters)
		// // 在微信小程序中，确保显示分享菜单
		// #ifdef MP-WEIXIN
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		})
		// #endif
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 判断分享是否来自页面内分享按钮
			console.log('res111:::::', res)
			const { title, path, imageUrl } = res.target.dataset.share
			return {
				title,
				path,
				imageUrl
			}
		}
		return {
			title,
			path,
			imageUrl: this.$store.getters.shareImgUrl
		}
	},
	onShareTimeline(res) {
		console.log('res222:::::', res)
		return {
			title: '分享赚',
			query: '/pages/home/index/index',
			imageUrl: this.$store.getters.shareImgUrl
		}
	}
}
</script>

<style lang="scss" scoped>
.user_center {
	&_top {
		height: 300rpx;
		background: linear-gradient(90deg, #f82a24 0%, #f82a24 1%, #fe544b 100%);
		padding: 100rpx 24rpx 0 24rpx;
		margin-bottom: 24rpx;
		position: relative;

		.lt {
			float: left;
		}

		&_left,
		&_right {
			font-weight: 500;
			font-size: 44rpx;
			color: #ffffff;
		}

		&_right {
			margin-left: 24rpx;
		}

		&_bot {
			height: 168rpx;
			background: linear-gradient(90deg, #222222 0%, #54534e 99%, #54534e 100%);
			box-shadow: -1rpx -16rpx 42rpx 0rpx rgba(174, 8, 0, 0.24);
			position: absolute;
			bottom: 0;
			width: 94%;
			border-radius: 24rpx;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			display: flex;

			.bot_text {
				font-weight: 500;
				font-size: 52rpx;
				color: #fcedd3;
				flex: 1;
				border-right: 1px solid #ccc;
				text-align: center;
				padding-top: 12rpx;
			}
		}
	}

	&_mid {
		// height: 284rpx;
		background: #ffffff;
		padding: 0 24rpx;

		&_text {
			margin: 0 0 24rpx 0;
		}
	}

	&_btm {
		// height: 284rpx;
		background: #ffffff;
		padding: 0 24rpx;
		margin-top: 24rpx;
	}
}
</style>