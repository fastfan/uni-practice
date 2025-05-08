<template>
	<view class="car-product-list">
		<view class="list-top" @click="clearShopCar">
			<uni-icons type="trash" size="28" color="#858585" style="vertical-align: middle"></uni-icons>
			清空购物车
		</view>
		<view v-if="shopCarList.length > 0">
			<scroll-view class="scroll-con" scroll-y="true" :style="{ maxHeight: '800rpx' }">
				<view class="product_item" v-for="(cell, cIndex) in shopCarList" :key="cIndex">
					<view class="product_box" :style="{ width: cell.isOverInventory ? '188rpx' : '132rpx' }">
						<uni-icons
							type="trash"
							size="28"
							color="#858585"
							style="vertical-align: middle; margin-left: -8rpx; margin-right: 13rpx"
							v-if="cell.isOverInventory"
							@click="deleteShopCar(cell)"
						></uni-icons>
						<image :src="cell.displayImgUrl" mode="aspectFill" class="product_img"></image>
					</view>
					<view :class="type === 'product' ? 'prodcut_info' : 'prodcut_info2'">
						<view class="name">
							{{ cell.productName }}
						</view>
						<view class="sepDescription">{{ cell.specificationVo.sepDescription }}</view>
						<view class="count flex_box">
							<view class="count-left">
								<view class="icon">￥</view>
								<view class="price">{{ cell.currentPrice }}</view>
							</view>
							<view class="count-right">
								<image
									class="img"
									src="https://oss.ruikedz.com/51life/static/images/shop/btn_reduce@2x.png"
									v-if="cell.count && cell.count > 0"
									@click="clickDelete(cell)"
								></image>
								<text v-if="cell.count && cell.count > 0" class="num">{{ cell.count }}</text>
								<image class="img" src="https://oss.ruikedz.com/51life/static/images/shop/btn_add@2x.png" @click="clickAdd(cell)"></image>
							</view>
						</view>
						<view style="color: red" v-if="cell.isOverInventory">库存不足,点击删除后重新添加！</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<template v-else>
			<view class="image-con">
				<image
					class="img"
					src="https://51plat.oss-cn-beijing.aliyuncs.com/51Integral/static/images/mall/img_default_shop.png"
					mode=""
				></image>
			</view>
			<view class="nothing-title">购物车空空如也~</view>
		</template>
	</view>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: 'product'
		}
	},
	data() {
		return {
			dataList: [],
			carList: []
		}
	},
	computed: {
		shopCarList() {
			// console.log(this.$store.getters.shopCarList)
			return this.$store.getters.shopCarList
		}
	},
	methods: {
		clickAdd(item) {
			if (item.specificationTag === '1') {
				// console.log(111111111, item)
				// const count = Number(item.specificationVo.inventory) - item.buyQuantity
				// console.log('count:::', count)
				if (item.count < Number(item.specificationVo.inventory)) {
					this.$emit('add', item)
				} else {
					this.$tui.toast(`当前所选规格购物车商品已达最大库存量,不能再多了呦~`)
					return
				}
			} else {
				this.$emit('add', item)
			}
		},
		clickDelete(item) {
			this.$emit('reduce', item)
		},
		clearShopCar() {
			this.$root.$emit('clearShopCar')
		},
		deleteShopCar(data) {
			this.$root.$emit('deleteShopCar', data)
		}
	},
	watch: {
		shopCarList: {
			handler: function (val) {
				// console.log(val)
			},
			immediate: true,
			deep: true
		}
	},
	mounted() {}
}
</script>

<style lang="scss" scoped>
.car-product-list {
	.list-top {
		height: 108rpx;
		border-bottom: 1rpx solid #f5f5f5;
		margin: 0 16rpx;
		text-align: right;
		line-height: 108rpx;
		font-size: 30rpx;
		color: #858585;
	}

	.image-con {
		margin-top: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.img {
			width: 320rpx;
			height: 320rpx;
		}
	}

	.nothing-title {
		color: #666666;
		text-align: center;
		font-size: 28rpx;
		margin-bottom: 100rpx;
	}

	.product_item {
		min-height: 132rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 20rpx;
		padding: 16rpx;
		background: #fff;
		border-radius: 8rpx;
		border-bottom: 1rpx solid #f5f5f5;

		&:last-child {
			border-bottom: none;
		}
		.product_box {
			height: 132rpx;
			display: flex;
			align-items: center;
		}
		.product_img {
			width: 132rpx;
			height: 132rpx;
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

			.sepDescription {
				font-weight: 400;
				font-size: 24rpx;
				color: #858585;
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
	}
}
</style>
