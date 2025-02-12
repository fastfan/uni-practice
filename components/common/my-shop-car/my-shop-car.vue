<template>
	<view class="my-shop-car">
		<view class="inner">
			<view class="icon_box">
				<view class="car-left">
					<image class="img" v-if="carLength === 0" src="/static/images/shop/icon_gouwuche_pro@2x.png"></image>
					<image class="img" v-else src="/static/images/shop/icon_gouwuche@2x.png"></image>
					<view class="text4" v-if="count > 0">{{ count }}</view>
				</view>
				<view class="car-mid" v-if="carLength > 0">
					<view class="text">待支付</view>
					<view class="text2">¥</view>
					<view class="text3">{{ totalPrice }}</view>
				</view>
			</view>
			<view class="car-right">
				<button type="default" :class="[carLength > 0 ? '' : 'active', 'car-btn']">立即下单</button>
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
		}
	},
	data() {
		return {}
	},
	computed: {
		carLength() {
			const carList = this.$store.getters.shopCarList
			return carList.length
		},
		count() {
			const carList = this.$store.getters.shopCarList
			return carList.reduce((a, c) => a + c.count, 0)
		},
		totalPrice() {
			const carList = this.$store.getters.shopCarList
			return carList.reduce((a, c) => a + c.count * c.price, 0)
		}
	},
	mounted() {
		console.log(this.carLength)
	}
}
</script>

<style lang="scss" scoped>
.my-shop-car {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1000;
	min-height: 136rpx;
	// padding-bottom: constant(safe-area-inset-bottom);
	// padding-bottom: env(safe-area-inset-bottom);
	background: #fff;
	box-shadow: 0 -4px 10px -3px rgba(0, 0, 0, 0.2);

	.inner {
		height: 136rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
	}

	.icon_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		.car-left {
			position: relative;
			display: flex;
			.img {
				width: 86rpx;
				height: 86rpx;
				margin-right: 8rpx;
			}
			.text4 {
				width: 32rpx;
				height: 32rpx;
				line-height: 32rpx;
				text-align: center;
				background: #ff5b5b;
				border: 1rpx solid #ffffff;
				border-radius: 50%;
				font-weight: 600;
				font-size: 20rpx;
				color: #ffffff;
				// padding: 10rpx;
				position: absolute;
				left: 54rpx;
				top: 0;
			}
		}
		.car-mid {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.text {
				font-weight: 600;
				font-size: 28rpx;
				color: #333333;
				margin-right: 16rpx;
			}
			.text2 {
				font-weight: 500;
				font-size: 28rpx;
				color: #fa4f0b;
				margin-right: 8rpx;
			}
			.text3 {
				font-weight: 500;
				font-size: 44rpx;
				color: #fa4f0b;
				margin-bottom: 10rpx;
			}
		}
	}
	.car-btn {
		background: linear-gradient(135deg, #ff7f2b 0%, #fa4f0b 100%);
		box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(255, 116, 110, 0.2);
		border-radius: 46rpx;
		font-weight: 600;
		font-size: 36rpx;
		color: #ffffff;
		padding: 0rpx 54rpx;
		height: 82rpx;
		line-height: 82rpx;
	}
	.active {
		opacity: 0.22;
	}
}

.cart_list {
	padding-bottom: calc(constant(safe-area-inset-bottom) + 100rpx);
	padding-bottom: calc(env(safe-area-inset-bottom) + 100rpx);

	.cart_item {
		height: 120rpx;
		border-bottom: 1px solid #eee;
	}
}
</style>
