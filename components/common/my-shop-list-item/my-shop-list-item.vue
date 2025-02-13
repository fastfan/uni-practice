<template>
	<view class="my-shop-list-item">
		<view class="product_item" v-for="(cell, cIndex) in dataList" :key="cIndex">
			<image :src="cell.img" mode="aspectFill" class="product_img"></image>
			<view :class="type === 'product' ? 'prodcut_info' : 'prodcut_info2'">
				<view class="name">
					{{ cell.name }}
				</view>
				<view class="flex_box type-box">
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
						<image class="img" src="/static/images/shop/btn_add@2x.png" @click="clickAdd(cell)"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const carList = []
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
			item.count = item.count ? item.count : 0
			item.count++
			this.$set(item, 'count', item.count)
			// 添加购物车
			// 通过商品id来判断，相同count+1,不同就push
			const goods = carList.find((res) => res.goodsId === item.goodsId)
			if (!goods) {
				carList.push(item)
			}
			// console.log('this.carList:::::::', carList)
			this.$store.dispatch('updateShopCarList', carList)
		},
		clickDelete(item) {
			item.count--
			this.$set(item, 'count', item.count)
			// 将数量为0的商品移除购物车
			const goodsIndex = carList.findIndex((res) => res.count === 0)
			if (goodsIndex !== -1) {
				carList.splice(goodsIndex, 1)
			}
			this.$store.dispatch('updateShopCarList', carList)
		}
	},
	watch: {
		list: {
			handler: function (val) {
				this.dataList = [...val]
			},
			immediate: true,
			deep: true
		}
	},
	mounted() {}
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
			width: 200rpx;
			height: 200rpx;
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
				margin-bottom: 10rpx;
				line-height: 40rpx;
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
				.count-left {
					font-weight: 500;
					font-size: 22rpx;
					color: #ff5e52;
					display: flex;
					align-items: flex-end;
					.icon {
					}
					.price {
						font-size: 36rpx;
						line-height: 36rpx;
					}
				}
				.count-right {
					display: flex;
					align-items: flex-end;
					.num {
						font-size: 24rpx;
						color: #000000;
						margin: 0 10rpx;
						line-height: 56rpx;
					}
					.img {
						width: 56rpx;
						height: 56rpx;
					}
					.img2 {
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
