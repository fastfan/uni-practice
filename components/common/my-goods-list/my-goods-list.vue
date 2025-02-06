<template>
	<view class="my-goods-list">
		<view class="item">
			<image :src="listItem.goodImg" class="panel-img" mode="widthFix"></image>
			<view v-if="!listItem.type" class="item-list">
				<view class="flex_box">
					<view class="text">返积分</view>
					<view class="text">积分可抵扣</view>
				</view>
				<view class="item-list-name">{{ listItem.goodName }}</view>
				<view class="overflow_hidden item-list-text">
					<view class="ft text2 flex_box">
						<view class="">￥</view>
						<view class="text3">20</view>
					</view>
					<view class="ft text4 flex_box">
						<view class="">￥</view>
						<view class="text5">24</view>
					</view>
					<view class="rt text6">已售25</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		listItem: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {}
	}
}
</script>

<style lang="scss">
.my-goods-list {
	margin-bottom: 28rpx;
	.item {
		height: auto;
		background: #fff;
		border-radius: 12rpx;
		.item-list {
			padding: 0 20rpx;
			margin: 10rpx 0;
			overflow: auto;
			&-name {
			}
			&-text {
				line-height: 42rpx;
				margin: 14rpx 0;
			}
		}
		.panel-img {
			width: 100%;
			height: 336rpx;
		}

		.text {
			border-radius: 4rpx;
			border: 1rpx solid #ff5d4c;
			font-weight: 400;
			font-size: 18rpx;
			color: #ff5e52;
			text-align: center;
			padding: 6rpx 8rpx;
			margin: 8rpx 8rpx 8rpx 0;
		}

		.text2 {
			font-weight: 500;
			font-size: 32rpx;
			color: #ff5e52;
		}

		.text3 {
			font-weight: 400;
			font-size: 48rpx;
			color: #ff5e52;
		}

		.text4 {
			font-weight: 400;
			color: #666666;
			text-decoration: line-through;
			font-size: 24rpx;
			margin-left: 6rpx;
		}

		.text5 {
			font-weight: 400;
			color: #666666;
			text-decoration: line-through;
			font-size: 24rpx;
		}
		.text6 {
			font-weight: 400;
			font-size: 20rpx;
			color: #666666;
			margin-top: 4rpx;
		}
	}
}
</style>
