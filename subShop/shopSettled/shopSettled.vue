<template>
	<view class="shop-settled">
		<view class="top-box">
			<image class="img" src="/static/images/shop/store_manager_bg@2x.png"></image>
			<view class="top-fixed">
				<view class="top_box_title" :style="{ height: statusBarHeight + 'px' }"></view>
				<view class="top_box_title" :style="{ height: navBarHeight + 'px', lineHeight: navBarHeight + 'px' }">
					<uni-icons type="left" size="28" class="top_box_unicon" color="#fff"></uni-icons>
					<view class="text">商家免费入驻</view>
					<view class="text2">51积分 商家必备营销服务平台</view>
					<my-tabs
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
			</view>
		</view>
		<view class="top-mid">
			<view class="title">让更多人看到你的店</view>
			<view class="title-bg"></view>
			<view class="title-small">平台曝光引流</view>
			<image class="title-img" src="/static/images/shop/img_dianpu @2x.png"></image>
		</view>
		<view class="top-mid top-mid2">
			<view class="title">商家如何进入平台</view>
			<view class="title-bg"></view>
			<view class="process">
				<view class="process-list" v-for="(item, index) in processList" :key="index">
					<view class="process-list-item">
						<image class="process-list-item-icon" :src="item.src"></image>
						<view class="process-list-item-text">
							{{ item.text }}
							<br />
							{{ item.text2 }}
						</view>
					</view>
					<image v-if="index !== 3" class="process-list-line" src="/static/images/shop/icon_jiantou@2x.png"></image>
				</view>
			</view>
		</view>
		<view class="top-mid top-mid3">
			<view class="title">锁粉赚钱跨界收益</view>
			<view class="title-bg"></view>
			<view class="process">
				<view class="process-list" v-for="item in processList2" :key="ite.id">
					<image :src="item.src" class="process-list-icon"></image>
					<view class="process-list-text">{{ item.text }}</view>
					<view class="process-list-text2">
						{{ item.text2 }}
						<br />
						{{ item.text3 }}
					</view>
				</view>
			</view>
		</view>
		<button class="btn">申请入驻</button>
	</view>
</template>

<script>
export default {
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
			currentTab: 0,
			processList: [
				{
					id: 1,
					src: '/static/images/shop/img_01@2x.png',
					text: '商家',
					text2: '申请入驻'
				},
				{
					id: 1,
					src: '/static/images/shop/img_02@2x.png',
					text: '线上',
					text2: '店铺装修'
				},
				{
					id: 1,
					src: '/static/images/shop/img_03@2x.png',
					text: '商家',
					text2: '专业培训'
				},
				{
					id: 1,
					src: '/static/images/shop/img_04@2x.png',
					text: '开始',
					text2: '线上推广'
				}
			],
			processList2: [
				{
					id: 1,
					src: '/static/images/shop/icon_juhe@2x.png',
					text: '聚合收款',
					text2: '生成赚钱码',
					text3: '支付桌码进万家'
				},
				{
					id: 2,
					src: '/static/images/shop/icon_daihuo@2x.png',
					text: '直播带货',
					text2: '线上带动线下',
					text3: '经营扩张'
				},
				{
					id: 3,
					src: '/static/images/shop/icon_suofen@2x.png',
					text: '分享锁粉',
					text2: '借助分享赚',
					text3: '实现跨界收益'
				}
			]
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

<style lang="scss">
.shop-settled {
	.top-box {
		position: relative;
		width: 100%;
		.img {
			width: 100%;
			height: 490rpx;
		}
		.top-fixed {
			position: absolute;
			top: 0;
			width: 100%;
			.text {
				font-family: PangMenZhengDao;
				font-size: 64rpx;
				color: #ffffff;
				text-align: center;
			}
			.text2 {
				font-weight: 600;
				font-size: 36rpx;
				color: #ffffff;
				text-align: center;
				margin: 20rpx 0 42rpx 0;
			}
		}
	}
	.top-mid {
		text-align: center;
		.title {
			font-weight: 400;
			font-size: 40rpx;
			color: #333333;
			text-align: center;
			margin: 44rpx 0 14rpx 0;
			position: relative;
			z-index: 10;
		}
		.title-bg {
			width: 240rpx;
			height: 16rpx;
			background: #f9dd7a;
			position: relative;
			left: 50%;
			transform: translateX(-50%);
			top: -28rpx;
		}
		.title-small {
			font-weight: 400;
			font-size: 28rpx;
			color: #535353;
			text-align: center;
		}
		.title-img {
			width: 584rpx;
			height: 158rpx;
			margin-top: 24rpx;
		}
	}
	.top-mid2 {
		.title {
			margin-top: 30rpx;
		}
		.process {
			display: flex;
			justify-content: space-between;
			padding: 0 34rpx;
			.process-list {
				display: flex;
				&-item {
					&-icon {
						width: 114rpx;
						height: 122rpx;
						margin-bottom: 24rpx;
					}
					&-text {
						font-weight: 500;
						font-size: 22rpx;
						color: #5c1f08;
						line-height: 32rpx;
					}
				}
				&-line {
					width: 18rpx;
					height: 24rpx;
					margin-top: 68rpx;
					margin-left: 34rpx;
				}
			}
		}
	}
	.top-mid3 {
		.title {
			margin-top: 30rpx;
		}
		.process {
			display: flex;
			justify-content: space-between;
			padding: 0 20rpx;
			margin-top: 42rpx;
			.process-list {
				display: flex;
				height: 154rpx;
				background: #fff7ec;
				border-radius: 8rpx;
				margin-right: 18rpx;
				flex-direction: column;
				flex: 1;
				&:last-child {
					margin-right: 0;
				}
				&-icon {
					width: 72rpx;
					height: 72rpx;
					// margin-bottom: 24rpx;
					position: relative;
					left: 50%;
					transform: translateX(-50%);
					top: -36rpx;
				}
				&-text {
					font-weight: 500;
					font-size: 24rpx;
					color: #5c1f08;
					line-height: 34rpx;
					text-align: center;
					margin-bottom: 8rpx;
					margin-top: -22rpx;
				}
				&-text2 {
					font-weight: 400;
					font-size: 20rpx;
					color: #817f7f;
					line-height: 28rpx;
				}
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
		margin-top: 64rpx;
		margin-bottom: 32rpx;
	}
}
</style>
