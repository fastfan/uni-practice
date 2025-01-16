<template>
	<view class="login_box">
		<u--image src="/static/btn_popup.png" width="100%" height="100vh"></u--image>
		<view class="login_box_icon" @click="goBack">
			<u-icon name="home" size="24"></u-icon>
		</view>
		<view class="login_box_btn" @click="goLogin">
			手机号快捷登录
		</view>
		<view class="flex_box login_box_agree">
			<view @click="agreeStatus = !agreeStatus" class="flex_box login_agree_main">
				<view class="login_box_agree_dot"></view>
				<u-checkbox-group>
					<u-checkbox size="24rpx" :checked="agreeStatus" activeColor="#0FBCF9" shape="circle"></u-checkbox>
				</u-checkbox-group>
				<view class="login_box_agree_text">请阅读并勾选<u-link @tap.stop="showAgree">《用户隐私协议》</u-link></view>
			</view>
		</view>
		<u-modal :show="show" :title="title" :showConfirmButton="false">
			<view>为了更好的为您服务，请点击授权按钮，授权手机号！</view>
			<view class="flex_box flex_row_between" style="margin-top: 24rpx;">
				<u-button text="取消" :plain="true" type="primary" @click="cancel">
				</u-button>
				<u-button text="授权" :plain="true" type="error" throttleTime="1000" open-type="getPhoneNumber"
					@getphonenumber="getPhoneNumber"></u-button>
			</view>

		</u-modal>
	</view>
</template>

<script>
	import {
		getTimestamp
	} from "@/utils/utils.js"
	export default {
		data() {
			return {
				agreeStatus: false, //勾选服务控制变量
				show: false, //授权拟态框控制变量
				title: '提示',
				code: '', //微信临时登录凭证
				phoneCode: '' //手机号获取的code
			};
		},
		methods: {
			goBack() {
				uni.$u.route({
					url: '/pages/home/index/index',
					type: 'tab'
				})
			},
			showAgree() { //跳转到用户协议页面
				uni.$u.route({
					url: '/pages/login/agreement',
					type: 'to'
				})
			},
			goLogin() { //点击手机号快捷登录
				// this.show = true
				if (this.agreeStatus) {
					this.show = true
				} else {
					// console.log(uni.$u)
					uni.$u.toast('请阅读并勾选用户隐私协议')
					return
				}
			},
			async getPhoneNumber(e) { //微信授权登录
				console.log('用户信息，加密数据', e);
				// const code = this.$store.getters.code
				const code = this.code
				this.phoneCode = e.detail.code
				const data = {
					code,
					phoneCode: this.phoneCode || '',
					appKey: '6285175579683467',
					timestamp: new Date().getTime()
				}
				// console.log(this.$mpApi)
				console.log('获取信息:::::::::', data)
				// const secretKey = "60ffacb3fe9744a3a9ee8b82d0d64d10"
				// const url = '/api/wxLspAuth/login'
				// const datas = JSON.stringify(data)
				// const signStr = url.concat(datas, secretKey)
				// console.log('#########signStr##############', signStr)
				// const signature =
				// 	CryptoJS.HmacSHA1(signStr, secretKey);
				// console.log('#########signature##############', signature.toString());
				const res = await this.$mpApi.usertelephoneLogin(data)
				// uni.request({
				// 	url: 'https://testplat.ruikedz.com' + url,
				// 	method: 'post',
				// 	header: {
				// 		'Content-Type': 'application/json;charset=utf-8',
				// 		'sign': signature.toString()
				// 	},
				// 	data: data,
				// 	success: (res) => {
				// 		console.log('获取信息eeeeeee:::::::::', res);
				// 	},
				// 	fail: (err) => {
				// 		console.error(err);
				// 	}
				// });
				console.log('获取信息:::::::::', res)
				if (res.code == 200) {
					this.show = false
					this.$store.commit('SET_USER_INFO', {
						code,
						...res.data
					})
					uni.$u.route({
						url: '/pages/mine/index/index',
						type: 'tab'
					})
				}
			},

			cancel() {
				this.show = false
			}
		},
		onLoad: function() {
			// uni.login({
			// 	success: (res) => {
			// 		console.log("res:::::::::::", res)
			// 		if (res.errMsg == "login:ok") {
			// 			this.code = res.code;
			// 		} else {
			// 			uni.showToast({
			// 				title: '系统异常，请联系管理员!'
			// 			})
			// 		}
			// 	}
			// })
		},
	}
</script>

<style lang="scss" scoped>
	.login_box {
		height: 100vh;
		overflow: hidden;
		position: relative;

		::v-deep .u-modal__content {
			flex-direction: column;
		}

		::v-deep .u-button {
			margin-right: 50rpx;
		}

		::v-deep .u-button:nth-child(2) {
			margin-right: 0;
		}

		&_icon {
			position: absolute;
			top: 120rpx;
			left: 24rpx;
		}

		&_btn {
			background: url("@/static/btn_popups.png") no-repeat;
			background-size: cover;
			width: 600rpx;
			height: 112rpx;
			line-height: 112rpx;
			position: absolute;
			bottom: 416rpx;
			left: 50%;
			transform: translateX(-50%);
			font-weight: 600;
			font-size: 48rpx;
			color: #C85900;
			text-align: center;
		}

		&_agree {
			padding: 40rpx 0 60rpx;
			position: absolute;
			bottom: 270rpx;
			left: 50%;
			transform: translateX(-50%);

			&_dot {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 2;
				width: 40rpx;
				height: 40rpx;
			}

			&_text {
				font-size: 26rpx;

				text {
					color: #0FBCF9;
				}
			}
		}
	}
</style>