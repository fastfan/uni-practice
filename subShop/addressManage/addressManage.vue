<template>
	<view class="address-manage">
		<uni-nav-bar
			title="收货地址管理"
			left-icon="left"
			@clickLeft="leftClick"
			:statusBar="true"
			:fixed="true"
			:border="false"
		></uni-nav-bar>
		<view class="container">
			<view class="container-mid" v-for="(item, index) in addressList" :key="index" @click="editAddress('edit', item)">
				<view class="mid-left">
					<view class="title">{{ item.address }}</view>
					<view class="text">
						<text class="name">{{ item.name }}</text>
						{{ item.phone }}
					</view>
				</view>
				<view class="mid-right">
					<image class="img" src="/static/images/shop/ic_bianji@2x.png"></image>
				</view>
			</view>
		</view>
		<view class="btn-fixed">
			<view class="add-btn" @click="editAddress('add')">新增地址</view>
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
		editAddress(type, item) {
			console.log(item)
			uni.navigateTo({
				url: `/subShop/addressEdit/addressEdit?type=${type}`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.address-manage {
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
	.btn-fixed {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 204rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.add-btn {
			width: 608rpx;
			height: 108rpx;
			background: linear-gradient(135deg, #ff7f2b 0%, #fa4f0b 100%);
			font-weight: 500;
			font-size: 48rpx;
			color: #ffffff;
			line-height: 108rpx;
			text-align: center;
			border-radius: 60rpx;
		}
	}
}
</style>