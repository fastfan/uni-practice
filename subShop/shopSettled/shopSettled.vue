<template>
	<view class="shop-settled">
		<view class="top-box">
			<image class="img" src="/static/images/shop/store_manager_bg@2x.png"></image>
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
					<image class="text-img" src="/static/images/shop/text_ruzhu@2x.png"></image>
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
		<button class="btn">申请入驻</button>
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
		}
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
		border-radius: 40rpx;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 32rpx;
	}
}
</style>
