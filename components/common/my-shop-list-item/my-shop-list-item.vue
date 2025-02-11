<template>
	<view class="my-shop-list-item">
		<view class="product_item" v-for="(cell, cIndex) in dataList" :key="cIndex">
			<image :src="cell.img" mode="aspectFill" class="product_img"></image>
			<view :class="type === 'product' ? 'prodcut_info' : 'prodcut_info2'">
				<view class="name">
					{{ cell.name }}
				</view>
				<view class="flex_box">
					<view class="text" v-for="(tag, tags) in cell.taglist" :key="tags">{{ tag }}</view>
				</view>
				<view class="sold">已售{{ cell.sold }}</view>
				<view class="count flex_box">
					<view class="count-left">
						<view class="icon">￥</view>
						<view class="price">{{ cell.price }}</view>
					</view>
					<view class="count-right">
						<image
							class="img"
							src="/static/images/shop/btn_reduce@2x.png"
							v-if="cell.count && cell.count > 0"
							@click="clickDelete(cell)"
						></image>
						<text v-if="cell.count && cell.count > 0" class="num">{{ cell.count }}</text>
						<image class="img2" src="/static/images/shop/btn_add@2x.png" @click="clickAdd(cell)"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => {
				return []
			}
		},
		type: {
			type: String,
			default: 'product'
		}
	},
	data() {
		return {
			dataList: []
		}
	},
	methods: {
		clickAdd(item) {
			console.log(item)
			this.$nextTick(() => {
				item.count = item.count ? item.count : 0
				item.count++
				this.$set(item, 'count', item.count)
			})
		},
		clickDelete(item) {
			console.log(item)
			item.count--
			this.$set(item, 'count', item.count)
		}
	},
	mounted() {
		this.dataList = [...this.list]
	}
}
</script>

<style lang="scss">
.my-shop-list-item {
	.product_item {
		// height: 200rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 20rpx;
		padding: 16rpx;
		background: #fff;
		border-radius: 8rpx;

		.product_img {
			width: 80rpx;
			height: 80rpx;
			border-radius: 8rpx;
		}

		.prodcut_info,
		.prodcut_info2 {
			flex: 1;
			padding-left: 20rpx;
			.name {
				font-weight: 400;
				font-size: 28rpx;
				color: #333333;
			}
			.text {
				border-radius: 4rpx;
				border: 1rpx solid #ff5d4c;
				font-weight: 400;
				font-size: 18rpx;
				color: #ff5e52;
				text-align: center;
				padding: 2rpx 12rpx;
				margin: 4rpx 8rpx 10rpx 0;
			}
			.sold {
				font-weight: 400;
				font-size: 20rpx;
				color: #666666;
			}
			.count {
				justify-content: space-between;
				margin-top: 8rpx;
				.count-left {
					font-weight: 500;
					font-size: 22rpx;
					color: #ff5e52;
					display: flex;
					align-items: flex-end;
					.icon {
						line-height: 0;
					}
					.price {
						font-size: 36rpx;
						line-height: 36rpx;
						margin-bottom: -12rpx;
					}
				}
				.count-right {
					display: flex;
					align-items: flex-end;
					.num {
						font-size: 24rpx;
						color: #000000;
						margin: 0 10rpx 0 20rpx;
						line-height: 36rpx;
					}
					.img {
						width: 40rpx;
						height: 40rpx;
					}
					.img2 {
						width: 56rpx;
						height: 56rpx;
						margin-bottom: -10rpx;
					}
				}
			}
		}
		.prodcut_info2 {
			.name {
			}
			.text {
			}
			.sold {
			}
			.count {
				.count-left {
					.price {
					}
				}
				.count-right {
					.img {
					}
					.img2 {
					}
				}
			}
		}
	}
}
</style>
