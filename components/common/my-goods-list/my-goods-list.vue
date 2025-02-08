<template>
	<view class="my-goods-list">
		<view class="item">
			<view style="position: relative">
				<image :src="listItem.goodImg" class="panel-img" mode="widthFix"></image>
				<view v-if="!listItem.type" class="item-list-position">
					<image :src="listItem.goodImg" class="panel-img2" mode="widthFix"></image>
					优每超市 ｜800m
				</view>
			</view>
			<view v-if="!listItem.type" class="item-list">
				<view class="item-list-name">{{ listItem.goodName }}</view>
				<view class="flex_box">
					<view class="text" v-for="(tag, tags) in listItem.taglist" :key="tags">{{ tag }}</view>
				</view>
				<view class="overflow_hidden item-list-text">
					<view class="ft text2 flex_box">
						<view class="">￥</view>
						<view class="text3">{{ listItem.goodPriced }}</view>
					</view>
					<view class="ft text4 flex_box">
						<view class="">￥</view>
						<view class="text5">{{ listItem.goodPrice }}</view>
					</view>
					<view class="rt text6">已售{{ listItem.goodSold }}</view>
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
		// height: auto;
		background: #fff;
		border-radius: 12rpx;
		.item-list {
			padding: 0 20rpx;
			margin: 16rpx 0;
			overflow: auto;
			&-name {
				font-weight: 400;
				font-size: 32rpx;
				color: #333333;
			}
			&-text {
				line-height: 42rpx;
				margin: 14rpx 0;
			}
		}
		.item-list-position {
			width: 264rpx;
			height: 44rpx;
			background: #ffffff;
			border-radius: 8rpx;
			border: 1rpx solid #d8d8d8;
			position: absolute;
			bottom: -14rpx;
			left: 18rpx;
			font-weight: 400;
			font-size: 24rpx;
			color: #6f6f6f;
			text-align: center;
			line-height: 44rpx;
		}
		.panel-img {
			width: 100%;
			height: 336rpx;
			vertical-align: bottom;
		}
		.panel-img2 {
			width: 34rpx;
			height: 34rpx;
			margin: 0 10rpx 0 0;
			vertical-align: text-bottom;
		}

		.text {
			border-radius: 4rpx;
			border: 1rpx solid #ff5d4c;
			font-weight: 400;
			font-size: 20rpx;
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
			margin-top: 4rpx;
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
