<template>
	<view class="detail-head">
		<view class="detail-head-top">
			<view class="detail-head-top-tleft">
				<image class="img" :src="detailsInfo.img"></image>
			</view>
			<view class="detail-head-top-tmid">
				<view class="tmid-title">{{ detailsInfo.shopName }}</view>
				<view class="tmid-title2">
					<image class="img" src="/static/images/shop/ic_xinji@2x.png"></image>
					<view class="font">
						{{ detailsInfo.shopRate }}
						<text style="margin-left: 20rpx">{{ detailsInfo.shopTime }}</text>
					</view>
				</view>
			</view>
			<view class="detail-head-top-tright">
				<image class="img" :src="item.icon" v-for="(item, index) in detailsInfo.shopShareList" :key="item.type"></image>
			</view>
		</view>
		<view class="detail-head-mid flex_box">
			<view class="text" v-for="(tag, tags) in detailsInfo.tagList" :key="tags">{{ tag.name }}</view>
		</view>
		<view class="detail-head-map">
			<view class="text">{{ detailsInfo.shopAddress }}</view>
			<image class="img" src="/static/images/shop/icon_daohang@2x.png"></image>
		</view>
		<view class="detail-head-bottom">
			<view class="bottom-item" v-for="(item, index) in detailsInfo.shopIconList" :key="item.type">
				<image class="img" :src="item.icon"></image>
				<view class="text">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			detailsInfo: {
				img: 'https://vcg01.cfp.cn/creative/vcg/800/new/VCG211360187468.jpg',
				shopName: '佳品会生活超市',
				shopRate: '5.0',
				shopTime: '8:00-20:00',
				shopAddress: '银川市兴庆区燕鸽湖管委会石油城七区2号营',
				shopShareList: [
					{ id: 1, type: 'phone', icon: '/static/images/shop/icon_dianhua@2x.png' },
					{ id: 2, type: 'share', icon: '/static/images/shop/icon_fenxiang@2x.png' },
					{ id: 3, type: 'code', icon: '/static/images/shop/icon_erweima@2x.png' }
				],
				shopIconList: [
					{ id: 1, type: 'WIFI', name: '免费WiFi', icon: '/static/images/shop/icon_wifi@2x.png' },
					{ id: 2, type: 'charge', name: '快捷充电', icon: '/static/images/shop/icon_chundian@2x.png' },
					{ id: 3, type: 'integral', name: '消费赚积分', icon: '/static/images/shop/icon_jifen@2x.png' },
					{ id: 4, type: 'pay', name: '扫码支付', icon: '/static/images/shop/icon_zhifu@2x.png' }
				],
				tagList: [
					{ id: 1, type: 'distribution', name: '商家自配' },
					{ id: 2, type: 'selfPicup', name: '到店自提' },
					{ id: 3, type: 'delivery', name: '快递配送' }
				]
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.detail-head {
	height: 378rpx;
	background: #ffffff;
	border-radius: 24rpx;
	padding: 24rpx 24rpx 0;
	box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(255, 116, 110, 0.1);
	&-top {
		display: flex;
		justify-content: space-between;
		display: flex;
		justify-content: space-between;
		position: relative;
		top: -66rpx;
		&-tleft {
			width: 160rpx;
			.img {
				width: 160rpx;
				height: 160rpx;
				border-radius: 18rpx;
				vertical-align: bottom;
			}
		}
		&-tmid {
			flex: 1;
			margin-left: 22rpx;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			.tmid-title {
				font-weight: 400;
				color: #333333;
				font-size: 32rpx;
			}
			.tmid-title2 {
				@extend .tmid-title;
				font-size: 26rpx;
				display: flex;
				margin-top: 22rpx;
				.font {
					margin-left: 6rpx;
				}
				.img {
					width: 26rpx;
					height: 24rpx;
					margin-top: 4rpx;
				}
			}
		}
		&-tright {
			padding-top: 66rpx;
			.img {
				width: 44rpx;
				height: 44rpx;
				margin-right: 14rpx;
				&:nth-child(3n) {
					margin-right: 0;
				}
			}
		}
	}
	&-mid {
		margin-top: -34rpx;
		.text {
			border-radius: 4rpx;
			border: 1rpx solid #ff5d4c;
			font-weight: 400;
			font-size: 20rpx;
			color: #ff5e52;
			text-align: center;
			padding: 4rpx 14rpx;
			margin: 0 12rpx 0 0;
		}
	}
	&-map {
		display: flex;
		margin: 24rpx 0;
		.text {
			flex: 1;
			font-weight: 400;
			font-size: 24rpx;
			color: #727272;
		}
		.img {
			width: 28rpx;
			height: 28rpx;
			margin-left: 50rpx;
		}
	}
	&-bottom {
		display: flex;
		text-align: center;
		.bottom-item {
			margin-right: 24rpx;
			.img {
				width: 60rpx;
				height: 60rpx;
				margin-bottom: 8rpx;
			}
			.text {
				font-weight: 400;
				font-size: 22rpx;
				color: #333333;
			}
		}
	}
}
</style>