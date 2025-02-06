<template>
	<view class="my-shop-list">
		<view class="my-shop-list-content" v-for="(item, index) in dataList" :key="item.id">
			<view class="content-top">
				<view class="content-top-lt">
					<view style="display: flex">
						<image src="/static/img_shanpin.min.png" class="panel-img"></image>
						<view>
							<view>{{ item.shopName }}</view>
							<view class="text">
								<u--image src="/static/ic_xinji.png" width="24rpx" height="24rpx"></u--image>
								<view class="font">{{ item.shopRate }}</view>
								<view class="font2">人均¥{{ item.shopPrevage }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="content-top-rt">
					<view class="texts">距您{{ item.shopDistance }}米</view>
					<view class="text flex_box flex_row_between">
						<u--image src="/static/ic_chongdian.png" width="24rpx" height="24rpx"></u--image>
						<u--image src="/static/ic_wuxian.png" width="24rpx" height="24rpx"></u--image>
						<u--image src="/static/ic_jinbi.png" width="24rpx" height="24rpx"></u--image>
					</view>
				</view>
			</view>
			<view class="content-mid">
				<view class="content-mid-item">
					<view v-for="(items, indexs) in item.children" class="item" :key="items.name">
						<image src="/static/img_shanpin.min.png" class="panel-img"></image>
						<view class="panel-name">{{ items.name }}</view>
						<view class="flex_box">
							<view class="text" v-for="(tag, tags) in items.tagList" :key="tags">{{ tag }}</view>
						</view>
						<view class="overflow_hidden">
							<view class="ft text2 flex_box">
								<view class="text5">￥</view>
								<view class="text3">{{ items.price }}</view>
								<view class="text6" v-if="items.count">
									<view class="text7">+{{ items.count }}</view>
									<image src="/static/yinjifen.png" class="panel-img2"></image>
								</view>
							</view>
							<view class="rt text4">已售{{ items.soled }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		dataList: {
			type: Array,
			default: () => {
				return []
			}
		}
	},
	data() {
		return {}
	}
}
</script>

<style lang="scss">
.my-shop-list {
	height: 1106rpx;
	overflow-y: scroll;
	clear: both;
	margin-top: 30rpx;
	&-content {
		height: 528rpx;
		background: #ffffff;
		box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(255, 116, 110, 0.1);
		border-radius: 20rpx;
		border: 2rpx solid #ffe1e1;
		padding: 20rpx;
		margin-bottom: 20rpx;

		.content-top {
			overflow: hidden;

			&-lt {
				float: left;

				.panel-img {
					width: 100rpx;
					height: 100rpx;
					margin: 0 18rpx 0 0;
				}

				.text {
					display: flex;
					margin-top: 20rpx;
					font-weight: 400;
					font-size: 26rpx;
					color: #333333;
					.font,
					.font2 {
						font-size: 22rpx;
						margin-right: 20rpx;
						margin-left: 6rpx;
					}
				}
			}

			&-rt {
				float: right;

				.text {
					display: flex;
					margin-top: 14rpx;
				}

				.texts {
					font-weight: 400;
					font-size: 28rpx;
					color: #727272;
				}
			}
		}
	}
}

.content-mid {
	clear: both;
	margin: 36rpx 0 0 0;

	&-item {
		display: flex;

		.item {
			flex: 1;
			height: 204rpx;
			margin: 0 18rpx 0 0;

			&:nth-child(3n) {
				margin-right: 0;
			}
			.panel-name {
				font-weight: 400;
				font-size: 28rpx;
				color: #333333;
			}
			.panel-img {
				width: 100%;
				height: 204rpx;
				margin: 0 0 14rpx 0;
			}

			.panel-img2 {
				width: 20rpx;
				height: 20rpx;
				margin: 0 0 0 4rpx;
				vertical-align: middle;
			}

			.text {
				border-radius: 4rpx;
				border: 1rpx solid #ff5d4c;
				font-weight: 400;
				font-size: 18rpx;
				color: #ff5e52;
				text-align: center;
				padding: 3rpx 8rpx;
				margin: 8rpx 8rpx 8rpx 0;
			}

			.text2 {
				font-weight: 500;
				font-size: 20rpx;
				color: #ff5e52;
			}

			.text3 {
				font-weight: 400;
				font-size: 36rpx;
				color: #ff5e52;
			}

			.text4 {
				font-weight: 400;
				font-size: 20rpx;
				color: #666666;
				margin-top: 16rpx;
			}
			.text5 {
				margin-top: 10rpx;
			}
			.text6 {
				font-weight: 500;
				font-size: 24rpx;
				color: #f04a43;
				margin-top: 4rpx;
			}
			.text7 {
				display: inline-block;
				margin-top: 2rpx;
			}
		}
	}
}
</style>
