<template>
	<view class="my-shop-list">
		<view
			:class="[
				item.type === 'normal' ? 'my-shop-list-content' : item.type === 'single' ? 'my-shop-list-content2' : 'my-shop-list-content3'
			]"
			v-for="(item, index) in dataList"
			:key="item.id"
		>
			<view v-if="item.type === 'normal'">
				<view class="content-top">
					<view class="content-top-lt">
						<view style="display: flex">
							<image :src="item.src" class="panel-img"></image>
							<view class="lefttop">
								<view>{{ item.shopName }}</view>
								<view class="text">
									<image class="img" src="/static/images/home/ic_xinji@2x.png"></image>
									<view class="font">{{ item.shopRate }}</view>
									<view class="font2">人均¥{{ item.shopPrevage }}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="content-top-rt">
						<view class="texts">距您{{ item.shopDistance }}米</view>
						<view class="text flex_box flex_row_between">
							<image class="img" src="/static/images/home/ic_chongdian@2x.png" mode="widthFix"></image>
							<image class="img" src="/static/images/home/ic_wuxian@2x.png" mode="widthFix"></image>
							<image class="img" src="/static/images/home/ic_jinbi@2x.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="content-mid">
					<view class="content-mid-item">
						<view v-for="(items, indexs) in item.children" class="item" :key="items.name">
							<image :src="item.src" class="panel-img"></image>
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
										<image src="/static/images/home/yinjifen@2x.png" class="panel-img2"></image>
									</view>
								</view>
								<view class="rt text4">已售{{ items.soled }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="item.type === 'single'" class="content-single">
				<image :src="item.src" class="panel-img" mode="widthFix"></image>
				<view class="content-top">
					<view class="content-top-lt">
						<view class="lefttop">
							<view>{{ item.shopName }}</view>
							<view class="text">
								<image class="img" src="/static/images/home/ic_xinji@2x.png"></image>
								<view class="font">{{ item.shopRate }}</view>
								<view class="font2">人均¥{{ item.shopPrevage }}</view>
							</view>
						</view>
					</view>
					<view class="content-top-rt">
						<view class="texts">距您{{ item.shopDistance }}米</view>
						<view class="text flex_box flex_row_between">
							<image class="img" src="/static/images/home/ic_chongdian@2x.png" mode="widthFix"></image>
							<image class="img" src="/static/images/home/ic_wuxian@2x.png" mode="widthFix"></image>
							<image class="img" src="/static/images/home/ic_jinbi@2x.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
			<view v-if="item.type === 'empty'" class="content-single">
				<image :src="item.src" class="panel-img" mode="widthFix"></image>
				<view class="content-top">
					<view class="content-top-lt">
						<view class="lefttop">
							<view>{{ item.shopName }}</view>
						</view>
					</view>
					<view class="content-top-rt">
						<view class="texts">距您{{ item.shopDistance }}米</view>
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
	clear: both;
	&-content,
	&-content2,
	&-content3 {
		height: auto;
		background: #ffffff;
		box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(255, 116, 110, 0.1);
		border-radius: 20rpx;
		border: 2rpx solid #ffe1e1;
		padding: 20rpx;
		margin-bottom: 20rpx;
		.content-single {
			.panel-img {
				height: 334rpx !important;
				width: 100%;
				margin-bottom: 12rpx;
			}
		}
		.content-top {
			overflow: hidden;
			&-lt {
				float: left;
				.panel-img {
					width: 100rpx;
					height: 100rpx;
					margin: 0 18rpx 0 0;
				}
				.lefttop {
					padding-top: 10rpx;
				}
				.text {
					display: flex;
					margin-top: 20rpx;
					font-weight: 400;
					font-size: 26rpx;
					color: #333333;
					.img {
						width: 24rpx;
						height: 24rpx;
					}
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
					margin-top: 20rpx;
					.img {
						width: 100%;
						margin-right: 16rpx;
						&:nth-child(3) {
							margin-right: 0;
						}
					}
				}
				.texts {
					font-weight: 400;
					font-size: 28rpx;
					color: #727272;
					margin-top: 10rpx;
				}
			}
		}
	}
	&-content2 {
		padding: 0;
		box-shadow: none;
		.content-top {
			padding: 0 20rpx 20rpx;
		}
	}
	&-content3 {
		padding: 0;
		box-shadow: none;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		border: none;
		.content-top {
			padding: 0 20rpx 20rpx;
		}
	}
	.content-mid {
		clear: both;
		margin: 36rpx 0 0 0;
		&-item {
			display: flex;
			.item {
				flex: 1;
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
}
</style>
