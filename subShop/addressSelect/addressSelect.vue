<template>
	<view class="address-select">
		<uni-nav-bar
			title="选择收货地址"
			left-icon="left"
			@clickLeft="leftClick"
			:statusBar="true"
			:fixed="true"
			:border="false"
		></uni-nav-bar>
		<view class="container">
			<view class="container-top">
				<view class="title">我的收货地址</view>
				<view class="manage" @click="gotoManage">管理</view>
			</view>
			<view class="container-mid" v-for="(item, index) in addressList" :key="index" @click="selectAddress(index)">
				<view class="mid-left">
					<view class="title">{{ item.address }}</view>
					<view class="text">
						<text class="name">{{ item.name }}</text>
						{{ item.phone }}
					</view>
				</view>
				<view class="mid-right">
					<image v-if="current === index" class="img" src="/static/images/shop/icon_xuanzedizhi@2x.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0,
			addressList: [
				{
					id: 1,
					address: '银川市的士学校院内的士港湾餐饮店1',
					name: '海燕',
					phone: '13358245846'
				},
				{
					id: 2,
					address: '银川市的士学校院内的士港湾餐饮店2',
					name: '海燕2',
					phone: '13358245846'
				},
				{
					id: 3,
					address: '银川市的士学校院内的士港湾餐饮店3',
					name: '海燕3',
					phone: '13358245846'
				}
			]
		}
	},
	methods: {
		leftClick() {
			uni.navigateBack()
		},
		selectAddress(index) {
			this.current = index
			setTimeout(() => {
				uni.navigateBack()
			}, 1000)
		},
		gotoManage() {
			uni.navigateTo({
				url: `/subShop/addressManage/addressManage`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.address-select {
	.container {
		background: #fff;
		margin-top: 26rpx;
		padding: 28rpx;
		&-top {
			display: flex;
			justify-content: space-between;
			margin-bottom: 30rpx;
			.title {
				font-weight: 400;
				font-size: 28rpx;
				color: #333333;
			}
			.manage {
				font-weight: 400;
				font-size: 28rpx;
				color: #fa5f21;
			}
		}
		&-mid {
			display: flex;
			align-items: center;
			padding-bottom: 34rpx;
			padding-top: 28rpx;
			border-bottom: 1rpx solid #f4f4f4;
			.mid-left {
				flex: 1;
				.title {
					font-weight: 500;
					font-size: 32rpx;
					color: #333333;
					margin-bottom: 16rpx;
				}
				.text {
					font-weight: 400;
					font-size: 28rpx;
					color: #666666;
				}
				.mame {
					margin-right: 48rpx;
				}
			}
			.mid-right {
				width: 60rpx;
				text-align: center;
				.img {
					width: 36rpx;
					height: 36rpx;
				}
			}
		}
	}
}
</style>
