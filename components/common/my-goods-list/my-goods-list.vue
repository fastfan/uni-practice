<template>
	<view class="my-goods-list" v-if="listItem">
		<view class="item">
			<view style="position: relative">
				<image :src="listItem.displayImgUrl" class="panel-img" mode="widthFix"></image>
				<view v-if="listItem.id !== '9999'" class="item-list-position">
					<image :src="listItem.storeVo.logoUrl" class="panel-img2"></image>
					<text class="store-text text-one-line">{{ listItem.storeVo.storeName }}</text>
					<text style="color: #f5f5f5">｜</text>
					<text>{{ $util.setMorKm(Number(listItem.storeVo.distance)) }}</text>
				</view>
			</view>
			<view v-if="listItem.id !== '9999'" class="item-list">
				<view class="item-list-name">{{ listItem.productName }}</view>
				<view class="panel-tag">
					<view class="tag-text" v-for="(tag, tags) in listItem.productLabelList" :key="tags">{{ tag }}</view>
				</view>
				<view class="item-list-text flex_box">
					<view class="text2 flex_box" v-if="listItem.enSilverPoints === '0'">
						<view class="text7">￥</view>
						<view class="text3">{{ listItem.currentPrice }}</view>
						<view class="text4 flex_box" v-show="Number(listItem.originalPrice) > 0">
							<view class="text8">￥</view>
							<view class="text5">{{ listItem.originalPrice }}</view>
						</view>
					</view>
					<view class="silvers" v-else>
						<view class="flex_box silver_top">
							<text class="silvers-text">￥</text>
							<text class="silvers-text2">{{ calculatePrice(listItem.currentPrice, listItem.maxSilverPoints) }}</text>
							<text class="silvers-text4">+</text>
							<text class="silvers-text5">{{ listItem.maxSilverPoints }}</text>
							<text class="silvers-text3">银积分</text>
						</view>
						<!-- <view class="silver_bottom">
							<image class="img" src="https://oss.ruikedz.com/51life/static/images/home/yinjifen@2x.png"></image>
							<text class="text9">可抵扣{{ listItem.maxSilverPoints }}银积分</text>
						</view> -->
					</view>
					<view class="text6">已售{{ listItem.saleCount }}</view>
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
				return {
					id: '1'
				}
			}
		}
	},
	data() {
		return {}
	},
	methods: {
		calculatePrice(price, silver) {
			return Number(price) - Number(silver)
		}
	},
	mounted() {
		// console.log(this.listItem)
	}
}
</script>

<style lang="scss">
.my-goods-list {
	margin-bottom: 20rpx;
	.item {
		// height: auto;
		background: #fff;
		border-radius: 20rpx;
		.panel-tag {
			display: flex;
			flex-wrap: wrap;
			.tag-text {
				width: fit-content;
				border-radius: 4px;
				border: 1px solid #ff9797;
				font-weight: 400;
				font-size: 18rpx;
				color: #ff5e52;
				text-align: center;
				padding: 3rpx 8rpx;
				margin: 8rpx 8rpx 8rpx 0;
				&:nth-child(3n) {
					margin-right: 0;
				}
			}
		}
		.store-text {
			width: 140rpx;
		}
		.item-list {
			padding: 0 20rpx;
			margin: 16rpx 0 0 0;
			overflow: auto;
			&-name {
				font-weight: 400;
				font-size: 32rpx;
				color: #333333;
			}
			&-text {
				line-height: 42rpx;
				margin: 8rpx 0 12rpx;
				justify-content: space-between;
			}
		}
		.item-list-position {
			width: 90%;
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
			display: flex;
			align-items: center;
		}
		.panel-img {
			width: 100%;
			height: 336rpx;
			vertical-align: bottom;
			border-radius: 12rpx;
		}
		.panel-img2 {
			width: 34rpx;
			height: 34rpx;
			margin: 0 10rpx 0 6rpx;
			vertical-align: text-bottom;
			border-radius: 12rpx;
		}
		.silver {
			// background: #fff0f0;
			// border-radius: 32rpx;
			// padding: 8rpx 20rpx;
			// width: fit-content;
			&_top {
				// align-items: baseline;
				height: 52rpx;
				line-height: 52rpx;
			}
			&_bottom {
				height: 18rpx;
				line-height: 18rpx;
				display: flex;
				margin-top: 4rpx;
				.img {
					width: 18rpx;
					height: 18rpx;
					margin-right: 4rpx;
				}
			}
		}
		.silvers {
			width: 220rpx;
			height: 52rpx;
			background: linear-gradient(90deg, #ffb700 0%, #ff1b00 100%);
			border-radius: 0rpx 26rpx 26rpx 0rpx;
			color: #fff;
			.silvers-text {
				font-weight: 500;
				font-size: 20rpx;
				margin-left: 8rpx;
				margin-top: 8rpx;
			}
			.silvers-text2 {
				font-weight: 500;
				font-size: 36rpx;
			}
			.silvers-text3 {
				font-weight: 500;
				font-size: 18rpx;
				margin: 2rpx 4rpx 0;
			}
			.silvers-text4 {
				font-size: 32rpx;
				font-weight: 500;
				margin-left: 8rpx;
			}
			.silvers-text5 {
				font-size: 32rpx;
			}
		}
		.text2 {
			font-weight: 500;
			font-size: 32rpx;
			color: #ff5e52;
			align-items: baseline;
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
			align-items: baseline;
		}

		.text5 {
			font-weight: 400;
			color: #7d7d7d;
			text-decoration: line-through;
			font-size: 24rpx;
		}
		.text6 {
			font-weight: 400;
			font-size: 22rpx;
			color: #666666;
		}
		.text7 {
			font-weight: 400;
			font-size: 20rpx;
			color: #ff5e52;
		}
		.text8 {
			font-weight: 400;
			font-size: 24rpx;
			color: #7d7d7d;
			text-decoration: line-through;
		}
		.text9 {
			font-weight: 400;
			font-size: 14rpx;
			color: #f92c29;
		}
	}
}
</style>
