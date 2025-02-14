<template>
	<view class="detail-mechant">
		<view class="content-video"></view>
		<view class="content-shop has-border">
			<view class="top">
				<view class="icon-left">
					<image class="img" src="/static/images/shop/icon_dianpu@2x.png"></image>
				</view>
				<view class="icon-text">店铺照片</view>
			</view>
			<view class="bottom">
				<image v-for="(item, index) in imgList" :key="index" class="img" :src="item.src"></image>
				<view class="bottom-block">查看更多</view>
			</view>
		</view>
		<view class="content-shop has-border">
			<view class="top">
				<view class="icon-left">
					<image class="img" src="/static/images/shop/icon_dianpu@2x.png"></image>
				</view>
				<view class="icon-text">查看店铺营业执照</view>
				<view class="icon-right">
					<image class="img" src="/static/images/shop/ic_come@2x.png"></image>
				</view>
			</view>
		</view>
		<view class="content-shop has-border">
			<view class="top">
				<view class="icon-left">
					<image class="img" src="/static/images/shop/icon_shijian@2x.png"></image>
				</view>
				<view class="icon-text">配送时间：9:10-20:20</view>
			</view>
		</view>
		<view class="content-shop">
			<view class="top">
				<view class="icon-left">
					<image class="img" src="/static/images/shop/icon_fuwu@2x.png"></image>
				</view>
				<view class="icon-text">商家服务</view>
			</view>
			<view class="bottom2">
				<view>到店自取（享优惠）</view>
				<view>消费返积分</view>
				<view>积分全平台可用</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imgList: [
				{ src: 'https://qcloud.dpfile.com/pc/8To1nn0bLS0Z8UXhWs7d_6_4hgdHYJDB9PY0bTHn51l0M4tvZgWeKDKSXjsROSf95g_3Oo7Z9EXqcoVvW9arsw.jpg' },
				{ src: 'https://qcloud.dpfile.com/pc/8To1nn0bLS0Z8UXhWs7d_6_4hgdHYJDB9PY0bTHn51l0M4tvZgWeKDKSXjsROSf95g_3Oo7Z9EXqcoVvW9arsw.jpg' }
			]
		}
	}
}
</script>

<style lang="scss" scoped>
.detail-mechant {
	padding: 24rpx;
	background: #fff;
	.content-video {
		height: 268rpx;
		background: rgba(0, 0, 0, 0.32);
		border-radius: 20rpx;
		margin-bottom: 24rpx;
	}
	.has-border {
		border-bottom: 1px solid #e3e3e3;
	}
	.content-shop {
		padding: 40rpx 0;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			.icon-left {
				width: 36rpx;
				.img {
					width: 36rpx;
					height: 32rpx;
					vertical-align: middle;
				}
				margin-right: 24rpx;
			}
			.icon-text {
				font-weight: 400;
				font-size: 28rpx;
				color: #333333;
				flex: 1;
			}
			.icon-right {
				width: 12rpx;
				.img {
					width: 12rpx;
					height: 20rpx;
					vertical-align: middle;
				}
			}
		}
		.bottom {
			height: 150rpx;
			display: flex;
			margin-top: 22rpx;
			.img {
				width: 200rpx;
				height: 150rpx;
				margin-right: 24rpx;
				border-radius: 12rpx;
				flex: 1;
			}
			.bottom-block {
				flex: 1;
				width: 200rpx;
				height: 150rpx;
				background: #edeeef;
				border-radius: 12rpx;
				font-weight: 400;
				font-size: 26rpx;
				color: #333333;
				text-align: center;
				line-height: 150rpx;
			}
		}
		.bottom2 {
			font-weight: 400;
			font-size: 24rpx;
			color: #333333;
			display: flex;
			justify-content: space-around;
			margin-top: 38rpx;
		}
	}
}
</style>
