<template>
	<view class="tabTwo">
		<view class="process flex_box" v-for="(item, index) in processList" :key="index">
			<view class="process-left" v-show="index === 0 || index === 2">
				<view class="top-text">
					<view class="title">{{ item.title }}</view>
					<view class="title-bg"></view>
				</view>
				<view class="bottom-text">{{ item.content }}</view>
			</view>
			<view class="process-left" v-show="index === 1 || index === 3">
				<image class="process-img" :src="item.src" mode="widthFix"></image>
			</view>
			<view class="process-right" v-show="index === 0 || index === 2">
				<image class="process-img" :src="item.src" mode="widthFix"></image>
			</view>
			<view class="process-right" v-show="index === 1 || index === 3">
				<view class="top-text">
					<view class="title">{{ item.title }}</view>
					<view class="title-bg"></view>
				</view>
				<view class="bottom-text">{{ item.content }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			processList: [
				{
					title: '免费入驻',
					content: '商家免费入驻51积分，互联互通享受数据资产、私域流量变现等多项跨界收益。',
					src: '/static/images/shop/img_ruzhu@2x.png'
				},
				{
					title: '赋能商家',
					content: '顾客到店充电、支付、选购套餐，享受消费返、分享赚等福利活动。',
					src: '/static/images/shop/img_hezuo@2x.png'
				},
				{
					title: '增加复购',
					content: '激励顾客二次到店消费、分 享、享受联盟店收益。',
					src: '/static/images/shop/img_fugou@2x.png'
				},
				{
					title: '合作共赢',
					content: '店家精准成交顾客，店家获得私域流量变现，顾客获得实惠痛快买单，多方参与人人共赢。',
					src: '/static/images/shop/img_funeng@2x.png'
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped>
.tabTwo {
	.process {
		justify-content: space-between;
		padding: 0 42rpx;
		margin-bottom: 70rpx;
		&:first-child {
			margin-top: 38rpx;
		}
		&:last-child {
			margin-bottom: 50rpx;
		}
		.process-left {
			margin-right: 40rpx;
		}
		.top-text {
			.title {
				font-weight: 400;
				font-size: 40rpx;
				color: #333333;
				text-align: center;
				margin: 0 0 14rpx 0;
				position: relative;
				z-index: 10;
			}
			.title-bg {
				width: 110rpx;
				height: 16rpx;
				background: #f9dd7a;
				position: relative;
				left: 50%;
				transform: translateX(-50%);
				top: -28rpx;
			}
		}
		.bottom-text {
			font-weight: 400;
			font-size: 28rpx;
			color: #535353;
		}
		.process-img {
			width: 202rpx;
			height: 192rpx;
			vertical-align: baseline;
		}
	}
}
</style>
