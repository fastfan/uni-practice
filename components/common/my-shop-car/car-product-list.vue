<template>
	<view class="car-product-list">
		<view class="list-top" @click="clearShopCar">
			<uni-icons type="trash" size="28" color="#858585" style="vertical-align: middle"></uni-icons>
			清空购物车
		</view>
		<view v-if="shopCarList.length > 0">
			<view class="product_item" v-for="(cell, cIndex) in shopCarList" :key="cIndex">
				<image :src="cell.img" mode="aspectFill" class="product_img"></image>
				<view :class="type === 'product' ? 'prodcut_info' : 'prodcut_info2'">
					<view class="name">
						{{ cell.name }}
					</view>
					<view class="count flex_box">
						<view class="count-left">
							<view class="icon">￥</view>
							<view class="price">{{ cell.price }}</view>
						</view>
						<view class="count-right">
							<image
								class="img"
								src="https://oss.ruikedz.com/51life/static/images/shop/btn_reduce@2x.png"
								v-if="cell.count && cell.count > 0"
								@click="clickDelete(cell)"
							></image>
							<text v-if="cell.count && cell.count > 0" class="num">{{ cell.count }}</text>
							<image
								class="img"
								src="https://oss.ruikedz.com/51life/static/images/shop/btn_add@2x.png"
								@click="clickAdd(cell)"
							></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<template v-else>
			<view class="image-con">
				<image
					class="img"
					src="https://51plat.oss-cn-beijing.aliyuncs.com/51Integral/static/images/mall/img_default_shop.png"
					mode=""
				></image>
			</view>
			<view class="nothing-title">购物车为空</view>
		</template>
	</view>
</template>

<script>
import { computed } from 'vue'

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
			dataList: [],
			carList: []
		}
	},
	computed: {
		shopCarList() {
			console.log(this.$store.getters.shopCarList)
			return this.$store.getters.shopCarList
		}
	},
	methods: {
		clickAdd(item) {
			item.count = item.count ? item.count : 0
			item.count++
			this.$set(item, 'count', item.count)
		},
		clickDelete(item) {
			item.count--
			this.$set(item, 'count', item.count)
			// 将数量为0的商品移除购物车
			const goodsIndex = this.shopCarList.findIndex((res) => res.count === 0)
			if (goodsIndex !== -1) {
				this.shopCarList.splice(goodsIndex, 1)
			}
		},
		clearShopCar() {
			this.$store.dispatch('updateShopCarList', [])
		}
	},
	watch: {
		shopCarList: {
			handler: function (val) {
				console.log(val)
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
		border-bottom: 1rpx solid #dbdbdb;
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
	}
	.product_item {
		height: 132rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 20rpx;
		padding: 16rpx;
		background: #fff;
		border-radius: 8rpx;
		border-bottom: 1rpx solid #dbdbdb;
		&:last-child {
			border-bottom: none;
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