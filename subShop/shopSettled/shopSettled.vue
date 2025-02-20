<template>
	<view class="shop-settled">
		<view class="top-box">
			<image class="img" src="https://oss.ruikedz.com/51life/static/images/shop/store_manager_bg@2x.png"></image>
			<view class="top-fixed">
				<!-- <view class="top_box_title" :style="{ height: statusBarHeight + 'px' }"></view> -->
				<!-- 	<view class="top_box_title" :style="{ height: navBarHeight + 'px', lineHeight: navBarHeight + 'px' }">
					<uni-icons type="left" size="28" class="top_box_unicon" color="#fff" @click="leftClick"></uni-icons>
				</view> -->
				<uni-nav-bar
					title=" "
					background-color="transparent"
					color="#fff"
					left-icon="left"
					@clickLeft="leftClick"
					:statusBar="true"
					:fixed="true"
					:border="false"
				/>
				<view class="text">
					<image class="text-img" src="https://oss.ruikedz.com/51life/static/images/shop/text_ruzhu@2x.png"></image>
				</view>
				<view class="text2">51积分 商家必备营销服务平台</view>
			</view>
			<my-tabs
				class="top-tab"
				:tabs="list"
				field="name"
				v-model="currentTab"
				@change="tabClick"
				height="102rpx"
				lineColor="#FF6554;"
				activeColor="#fff"
				color="#fff"
				bgColor="rgba(98,36,23,0.27)"
				activeFontSize="36rpx"
				fontSize="30rpx"
				:scroll="false"
				:lineScale="0.3"
			></my-tabs>
		</view>
		<view class="mid-box">
			<tab-one v-show="currentTab === 0"></tab-one>
			<tab-two v-show="currentTab === 1"></tab-two>
			<tab-three v-show="currentTab === 2"></tab-three>
		</view>
		<button class="btn" @click="goShopSettledApplication">申请入驻</button>
		<uni-popup ref="popup" background-color="#fff" @change="change">
			<view class="flex_box popup-content">
				<view class="popup-content-top" v-if="status === 'error'">
					<image class="popup-img" src="https://oss.ruikedz.com/51life/static/images/shop/img_shibai@2x.png"></image>
					<view class="popup-text">审核失败</view>
					<view class="popup-text2">
						<text class="popup-text3">审核失败原因：</text>
						店铺门脸照片不清晰，看不到
					</view>
					<view class="popup-btn" @click="goShopSettledApplication">修改资料</view>
				</view>
				<view class="popup-content-top" v-if="status === 'check'">
					<image class="popup-img3" src="https://oss.ruikedz.com/51life/static/images/shop/state_yitijiao@2x.png"></image>
					<view class="popup-text4">入驻信息已提交</view>
					<view class="popup-text5">审核期1-2个工作日，请耐心等待！</view>
				</view>
				<image class="popup-img2" src="https://oss.ruikedz.com/51life/static/images/shop/icon_buanbi@2x.png" @click="close"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import tabOne from './tabOne'
import tabTwo from './tabTwo'
import tabThree from './tabThree'
export default {
	components: { tabOne, tabTwo, tabThree },
	data() {
		return {
			statusBarHeight: getApp().globalData.statusBarHeight,
			navBarHeight: getApp().globalData.navBarHeight,
			status: 'check',
			list: [
				{
					id: 1,
					name: '平台优势'
					// disabled: true
				},
				{
					id: 2,
					name: '商家权益'
					// disabled: true
				},
				{
					id: 3,
					name: '入驻流程'
					// disabled: true
				}
			],
			currentTab: 0
		}
	},
	methods: {
		leftClick() {
			uni.navigateBack()
		},
		tabClick(index) {
			console.log(index)
			this.currentTab = index
		},
		goShopSettledApplication() {
			uni.navigateTo({
				url: `/subShop/shopSettledApplication/shopSettledApplication?id=${1}`
			})
		},
		close() {
			this.$refs.popup.close()
		},
		change(e) {
			console.log(e)
		}
	},
	onLoad() {
		this.$refs.popup.open('center')
		setTimeout(() => {
			this.status = 'error'
		}, 5000)
	}
}
</script>

<style lang="scss" scoped>
.shop-settled {
	background: #fff;
	height: 100vh;
	::v-deep .uniui-left {
		font-size: 46rpx !important;
	}
	.top-box {
		position: relative;
		height: 430rpx;
		width: 100%;
		.top-tab {
			position: absolute;
			bottom: 0;
			width: 100%;
		}
		.img {
			width: 100%;
			height: 430rpx;
			position: absolute;
			top: 0;
			width: 100%;
		}
		.top-fixed {
			position: absolute;
			top: 0;
			width: 100%;
			.text {
				margin-bottom: 28rpx;
				text-align: center;
				.text-img {
					width: 368rpx;
					height: 50rpx;
				}
			}
			.text2 {
				font-weight: 600;
				font-size: 36rpx;
				color: #ffffff;
				text-align: center;
				margin: 0 0 12rpx 0;
				line-height: 36rpx;
			}
		}
	}
	.btn {
		width: 608rpx;
		height: 108rpx;
		background: linear-gradient(135deg, #ff7f2b 0%, #fa4f0b 100%);
		text-align: center;
		font-weight: 500;
		font-size: 48rpx;
		line-height: 108rpx;
		color: #fff;
		border-radius: 60rpx;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 32rpx;
	}
	.popup-content {
		flex-direction: column;
		.popup-content-top {
			width: 560rpx;
			// height: 688rpx;
			background: #ffffff;
			box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.06);
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			padding: 24rpx;
			margin-bottom: 34rpx;
			.popup-img {
				width: 312rpx;
				height: 220rpx;
				margin: 52rpx 0 42rpx 0;
			}
			.popup-img3 {
				width: 384rpx;
				height: 320rpx;
				margin: 52rpx 0 84rpx 0;
			}
			.popup-text {
				font-weight: 500;
				font-size: 44rpx;
				color: #333333;
				margin-bottom: 52rpx;
			}
			.popup-text2 {
				font-weight: 400;
				font-size: 36rpx;
				color: #666;
				margin-bottom: 42rpx;
			}
			.popup-text3 {
				font-weight: 400;
				font-size: 36rpx;
				color: #cd0000;
			}
			.popup-text4 {
				font-weight: 400;
				font-size: 42rpx;
				color: #363a43;
				margin-bottom: 14rpx;
			}
			.popup-text5 {
				font-weight: 400;
				font-size: 28rpx;
				color: #979da9;
				margin-bottom: 46rpx;
			}
			.popup-btn {
				width: 398rpx;
				height: 76rpx;
				line-height: 76rpx;
				background: linear-gradient(135deg, #ff7f2b 0%, #fa4f0b 100%);
				border-radius: 60rpx;
				font-weight: 500;
				font-size: 36rpx;
				color: #ffffff;
				text-align: center;
			}
		}
		.popup-img2 {
			width: 52rpx;
			height: 52rpx;
		}
	}
}
</style>
