<template>
	<!-- 登录 -页面 -->
	<view>
		<!-- 返回首页 -->
		<!-- <view class="back-home" @click="backHome">
			<uni-icons type="home-filled" size="30" color="#792909"></uni-icons>
		</view> -->
		<uni-nav-bar title=" " left-icon=" " background-color="#FFF7EB" @clickLeft="backHome" :statusBar="true" :fixed="true" :border="false">
			<block slot="left">
				<uni-icons type="home-filled" size="30" color="#792909"></uni-icons>
			</block>
		</uni-nav-bar>
		<view class="login">
			<!-- 登录 -->
			<view class="login-box">
				<view class="login-btn">
					<button @click="onLogin">手机号快捷登录</button>
				</view>
				<!-- 协议 -->
				<view class="login-protocol">
					<view class="agree-btn" @click="isCheck = !isCheck">
						<image
							class="img"
							:src="
								isCheck
									? 'https://51plat.oss-cn-beijing.aliyuncs.com/51Integral/static/images/myzone/service/service_select.png'
									: 'https://51plat.oss-cn-beijing.aliyuncs.com/51Integral/static/images/myzone/service/service_select_no.png'
							"
							mode=""
						></image>
					</view>
					<view class="title">
						请阅读并勾选《
						<span class="pro" @click="onClickProtocol">用户隐私协议</span>
						》
					</view>
				</view>
			</view>
		</view>

		<!-- 授权弹窗 -->
		<tui-modal :show="modal" custom>
			<view class="modal">
				<view class="modal-title">提示</view>
				<view class="modal-content">为了更好的为您提供服务，请点击授权按钮，授权手机号！</view>
				<view class="modal-btn">
					<button :size="28" type="danger" @click="modal = false">取消</button>
					<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权</button>
				</view>
			</view>
		</tui-modal>
	</view>
</template>

<script>
import { UserServer } from '@/viewModel/user/user.js'
import { DataServer } from '@/viewModel/data.js'
const userServerApi = new UserServer()
const dataServer = new DataServer()
export default {
	data() {
		return {
			// 登录参数
			loginParams: {
				appKey: '',
				timestamp: 0,
				code: '',
				phoneCode: ''
			},
			isCheck: false,
			modal: false,
			userAgreement: ''
		}
	},
	onShow() {},
	onLoad() {
		this.getRulesApi()
	},
	methods: {
		// 查看协议
		onClickProtocol() {
			uni.navigateTo({
				url: '/subHome/webview/webview?url=' + this.userAgreement
			})
		},
		// 返回首页
		backHome() {
			uni.switchTab({
				url: '/pages/index/index'
			})
		},
		// 登录
		onLogin() {
			if (!this.isCheck) return this.$tui.toast('请阅读并勾选用户协议')

			uni.login({
				provider: 'weixin',
				success: (res) => {
					let { code } = res
					this.loginParams = {
						code,
						timestamp: new Date().getTime(),
						appKey: this.$store.state.appKey
					}
					this.wxLogin(this.loginParams)
				}
			})
		},
		// 获取手机号
		getPhoneNumber(e) {
			let phoneCode = e.detail.code || ''
			this.modal = false
			if (e.detail.errMsg == 'getPhoneNumber:ok') {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						let { code } = res
						let referUserId = uni.getStorageSync('inviteUserId') || ''
						let referMchId = uni.getStorageSync('storeId') || ''
						this.loginParams = {
							code,
							phoneCode,
							timestamp: new Date().getTime(),
							appKey: this.$store.state.appKey,
							referUserId,
							referMchId
						}
						this.wxLogin(this.loginParams)
					}
				})
			}
		},
		// 微信登录
		wxLogin(loginParams) {
			userServerApi.wxLogin(loginParams).then((res) => {
				if (res.code == 200) {
					//设置用户信息
					getApp().globalData.userInfo = res.data
					//设置token
					this.$tui.setUserInfo(res.data)
					// this.$tui.showRedDot(res)
					this.$tui.setToken(res.data)
					this.$tui.toast('登录成功！')
					this.$store.dispatch('updateUserRefer')
					this.$store.dispatch('updateFansCount')
					this.$store.dispatch('updateTotalPoints')
					let referUserId = uni.getStorageSync('inviteUserId')
					let referMchId = uni.getStorageSync('storeId')
					if (referUserId) {
						uni.removeStorageSync('inviteUserId')
					}
					if (referMchId) {
						uni.removeStorageSync('storeId')
					}
					if (this.$tui.fromPage == 102) {
						uni.setStorageSync('earnBySharingPopup', 1)
					}
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				} else if (res.code == 2009) {
					// 打开授权弹窗
					this.modal = true
				} else {
					this.$tui.toast(res.msg)
				}
			})
		},
		/**
		 * 获取协议
		 */
		getRulesApi() {
			dataServer.getIndexBanner({ category: '6' }).then((res) => {
				if (res.code === 200) {
					this.userAgreement = res.data.records[0].htmlUrl
					getApp().globalData.userAgreement = this.userAgreement
				}
			})
		}
	}
}
</script>

<style lang="scss">
page {
	background: #fff7eb;
}
.login {
	width: 100vw;
	height: 100vh;
	// background: url(https://oss.ruikedz.com/51life/static/images/home/home_empower_bg@2x.png) no-repeat;
	background: url(https://oss.ruikedz.com/51life/static/images/home/home_login_bg@2x.png) no-repeat;
	background-size: 100% 100%;
	position: relative;
	margin-top: -114rpx;
	.back-home {
		position: absolute;
		top: 70rpx;
		left: 30rpx;
		z-index: 999;
	}

	.login-box {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.login-btn {
			width: 80%;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 52vh;
			box-sizing: border-box;

			// button {
			// 	width: 100%;
			// 	height: 100%;
			// 	background: #fff;
			// 	border-radius: 50rpx;
			// 	font-size: 32rpx;
			// 	color: #333;
			// 	box-shadow: 0 0 10rpx #ccc;

			// }
			button {
				width: 100%;
				height: 100%;
				display: inline-block;
				line-height: 100rpx;
				background-image: linear-gradient(to right, #f9e7d4, #ffe6c8);
				font-weight: 600;
				font-size: 38rpx;
				color: #c85900;
				border-radius: 20px;
				text-align: center;
				cursor: pointer;
				/* 鼠标悬停时显示手形指针 */
			}
		}

		.login-protocol {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			margin-top: 60rpx;

			.agree-btn {
				margin-right: 16rpx;
				width: 35rpx;
				height: 35rpx;

				.img {
					width: 100%;
					height: 100%;
				}
			}

			.title {
				color: #858585;
				font-size: 28rpx;
				.pro {
					color: royalblue;
					border-bottom: 1px solid royalblue;
				}
			}
		}
	}
}
.modal {
	.modal-title {
		width: 100%;
		font-size: 40rpx;
		color: #333;
		border-bottom: 1px solid #f5f5f5;
		text-align: center;
		padding-bottom: 20rpx;
	}

	.modal-content {
		padding: 40rpx 0;
	}

	.modal-btn {
		display: flex;
		margin-top: 10rpx;

		button {
			height: 72rpx;
			line-height: 72rpx;

			&:nth-child(1) {
				width: 46%;
				background-image: linear-gradient(to right, #f9e7d4, #ffe6c8);
				color: #ff7801;
			}

			&:nth-child(2) {
				width: 46%;
				background: #fa4f0b;
				color: #fff;
			}
		}
	}
}
</style>
