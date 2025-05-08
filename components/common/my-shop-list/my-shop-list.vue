<template>
	<view class="my-shop-list">
		<view
			:class="[
				item.type === 'normal' ? 'my-shop-list-content' : item.type === 'single' ? 'my-shop-list-content2' : 'my-shop-list-content3'
			]"
			v-for="(item, index) in dataList"
			:key="item.id"
		>
			<view v-if="item.type === 'normal'" class="content-naomal" @click="onClickItem(item)">
				<view class="content-top">
					<view class="content-top-lt">
						<view style="display: flex">
							<view class="img-box">
								<image :src="item.logoUrl" class="panel-img"></image>
								<view class="font4" v-if="item.openingStatus == '1'">歇业中</view>
							</view>
							<view class="lefttop">
								<view class="title-text">{{ item.storeName }}</view>
								<view class="text">
									<image class="img" src="https://oss.ruikedz.com/51life/static/images/home/ic_xinji@2x.png"></image>
									<view class="font">{{ item.score }}</view>
									<view class="font2">¥{{ item.avgAmount }}/人</view>
									<!-- 	<text class="font3" v-if="item.openingTime && item.openingStatus == '0'">
										{{ item.openingTime + '-' + item.closeTime }}
									</text> -->
								</view>
							</view>
						</view>
					</view>
					<view class="content-top-rt">
						<view class="texts">距您{{ $util.setMorKm(Number(item.distance)) }}</view>
						<view class="text flex_box">
							<image class="img-icon" src="https://oss.ruikedz.com/51life/static/images/home/ic_chongdian@2x.png"></image>
							<image v-if="item.hasWifi" class="img-icon2" src="https://oss.ruikedz.com/51life/static/images/home/ic_wuxian@2x.png"></image>
							<image class="img-icon3" src="https://oss.ruikedz.com/51life/static/images/home/ic_jinbi@2x.png"></image>
						</view>
					</view>
				</view>
				<scroll-view class="content-mid" scroll-x="true" v-if="item && item.productVoList.length > 0">
					<view class="content-mid-item">
						<view
							v-for="(items, indexs) in item.productVoList"
							class="item"
							:class="[item.productVoList.length > 3 ? 'item2' : '']"
							:key="items.id"
							@click.stop="onClickItem(item, items)"
						>
							<view :style="{ position: 'relative', height: item.productVoList.length > 3 ? '180rpx' : '204rpx' }">
								<image
									:src="items.displayImgUrl"
									class="panel-img"
									:style="{ height: item.productVoList.length > 3 ? '180rpx' : '204rpx' }"
								></image>
								<view class="silver" v-if="items.enSilverPoints === '1'">
									<text class="silver-text">￥</text>
									<text class="silver-text2">{{ calculatePrice(items.currentPrice, items.maxSilverPoints) }}</text>
									<text class="silver-text4">+</text>
									<text class="silver-text2">{{ items.maxSilverPoints }}</text>
									<text class="silver-text3">银积分</text>
								</view>
							</view>
							<view class="panel-name text-one-line">{{ items.productName }}</view>
							<view class="panel-tag">
								<view class="tag-text" v-for="(tag, tags) in items.productLabelList" :key="tags">{{ tag }}</view>
							</view>
							<view class="flex_box flex_col_bottom flex_row_between">
								<view class="text2 flex_box">
									<view class="text5">￥</view>
									<view class="text3">{{ items.currentPrice }}</view>
								</view>
								<view class="text4">已售{{ items.saleCount }}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-if="item.type === 'single'" class="content-single" @click="onClickItem(item)">
				<view class="img-box">
					<image :src="item.logoUrl" class="panel-img"></image>
					<view class="font4" v-if="item.openingStatus == '1'">歇业中</view>
				</view>
				<view class="content-top">
					<view class="content-top-lt">
						<view class="lefttop">
							<view class="title-text">{{ item.storeName }}</view>
							<view class="text">
								<image class="img" src="https://oss.ruikedz.com/51life/static/images/home/ic_xinji@2x.png"></image>
								<view class="font">{{ item.score }}</view>
								<view class="font2">¥{{ item.avgAmount }}/人</view>
								<!-- 	<text class="font3" v-if="item.openingTime && item.openingStatus == '0'">
									{{ item.openingTime + '-' + item.closeTime }}
								</text> -->
								<!-- <view class="font4" v-if="item.openingStatus == '1'">歇业中</view> -->
							</view>
						</view>
					</view>
					<view class="content-top-rt">
						<view class="texts">距您{{ $util.setMorKm(Number(item.distance)) }}</view>
						<view class="text flex_box">
							<!-- <image class="img-icon" src="https://oss.ruikedz.com/51life/static/images/home/ic_chongdian@2x.png"></image> -->
							<image v-if="item.hasWifi" class="img-icon2" src="https://oss.ruikedz.com/51life/static/images/home/ic_wuxian@2x.png"></image>
							<image class="img-icon3" src="https://oss.ruikedz.com/51life/static/images/home/ic_jinbi@2x.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view v-if="item.type === 'empty'" class="content-single" @click="onClickItem(item)">
				<image :src="item.logoUrl" class="panel-img" mode="widthFix"></image>
				<view class="content-top">
					<view class="content-top-lt">
						<view class="lefttop">
							<view class="title-text">{{ item.storeName }}</view>
						</view>
					</view>
					<view class="content-top-rt">
						<view class="texts">距您{{ $util.setMorKm(Number(item.distance)) }}</view>
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
		},
		productPageSize: {
			type: Number,
			default: () => {
				return 3
			}
		}
	},
	data() {
		return {}
	},
	methods: {
		onClickItem(item, items) {
			this.$emit('onClickEvent', item, items)
		},
		calculatePrice(price, silver) {
			return Number(price) - Number(silver)
		}
	},
	mounted() {
		// console.log('dataList::::::::::', this.dataList)
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
		box-shadow: 0rpx 4rpx 12rpx 6rpx rgba(255, 116, 110, 0.1);
		border-radius: 20rpx;
		// border: 2rpx solid #ffe1e1;
		padding: 20rpx;
		margin-bottom: 20rpx;
		.content-single {
			.img-box {
				height: 334rpx !important;
				margin-bottom: 12rpx;
				position: relative;
				.panel-img {
					height: 334rpx !important;
					width: 100%;
					border-radius: 20rpx;
					// border-bottom-left-radius: 0;
					// border-bottom-right-radius: 0;
				}
				.font4 {
					width: 100%;
					height: 58rpx;
					background: rgba(0, 0, 0, 0.5);
					border-radius: 0rpx 0rpx 12rpx 12rpx;
					font-weight: 600;
					font-size: 28rpx;
					color: #ffffff;
					text-align: center;
					line-height: 58rpx;
					position: absolute;
					bottom: 0;
				}
			}
		}
		.content-top {
			overflow: hidden;
			display: flex;
			.title-text {
				font-weight: bolder;
				font-size: 32rpx;
				color: #333333;
				margin-top: 16rpx;
			}
			&-lt {
				flex: 1;
				.img-box {
					width: 164rpx;
					height: 164rpx;
					margin: 0 18rpx 0 0;
					position: relative;
					.panel-img {
						width: 164rpx;
						height: 164rpx;
						border-radius: 20rpx;
					}
					// .font4 {
					// 	width: 94rpx;
					// 	height: 36rpx;
					// 	line-height: 36rpx;
					// 	background: #ff3e2a;
					// 	border-radius: 20rpx;
					// 	color: #fff;
					// 	text-align: center;
					// 	position: absolute;
					// 	bottom: 8rpx;
					// 	left: 50%;
					// 	transform: translateX(-50%);
					// 	font-size: 20rpx;
					// }
					.font4 {
						width: 100%;
						height: 58rpx;
						background: rgba(0, 0, 0, 0.5);
						border-radius: 0rpx 0rpx 12rpx 12rpx;
						font-weight: 600;
						font-size: 28rpx;
						color: #ffffff;
						text-align: center;
						line-height: 58rpx;
						position: absolute;
						bottom: 0;
						left: 0;
					}
				}
				.lefttop {
					padding-top: 6rpx;
					flex: 1;
				}
				.text {
					display: flex;
					margin-top: 22rpx;
					font-weight: 400;
					font-size: 26rpx;
					color: #333333;
					.img {
						width: 24rpx;
						height: 24rpx;
					}
					.font,
					.font2,
					.font3 {
						font-size: 22rpx;
						margin-right: 20rpx;
						margin-left: 6rpx;
					}
					// .font4 {
					// 	width: 94rpx;
					// 	height: 36rpx;
					// 	background: #ff3e2a;
					// 	border-radius: 20rpx;
					// 	color: #fff;
					// 	text-align: center;
					// }
				}
			}
			&-rt {
				// float: right;
				width: 154rpx;
				margin-left: 4rpx;
				.text {
					display: flex;
					margin-top: 22rpx;
					justify-content: center;
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
					margin-top: 24rpx;
					text-align: center;
				}
				.img-icon {
					width: 32rpx;
					height: 32rpx;
					margin-right: 14rpx;
				}
				.img-icon2 {
					width: 40rpx;
					height: 28rpx;
					margin-right: 14rpx;
				}
				.img-icon3 {
					width: 38rpx;
					height: 30rpx;
				}
			}
		}
	}
	&-content2 {
		padding: 0;
		// box-shadow: none;
		.content-top {
			padding: 0 20rpx 20rpx;
		}
	}
	&-content3 {
		padding: 0;
		// box-shadow: none;
		// border-bottom-left-radius: 0;
		// border-bottom-right-radius: 0;
		// border: none;
		.content-top {
			padding: 0 20rpx 20rpx;
		}
	}
	.content-mid {
		clear: both;
		margin: 36rpx 0 0 0;
		&-item {
			display: flex;
			.silver {
				background: url('https://oss.ruikedz.com/51life/static/images/shop/bg_yinjif@2x.png') no-repeat;
				background-size: cover;
				color: #fff;
				height: 36rpx;
				line-height: 36rpx;
				// padding-left: 8rpx;
				position: absolute;
				bottom: 0;
				width: 100%;
				&-text {
					font-size: 20rpx;
					margin-left: 8rpx;
				}
				&-text2 {
					font-weight: 500;
					font-size: 36rpx;
				}
				&-text3 {
					font-weight: 500;
					font-size: 16rpx;
					margin: 0 4rpx;
				}
				&-text4 {
					font-weight: 500;
					font-size: 32rpx;
				}
			}
			.item {
				width: calc((100% - 36rpx) / 3);
				margin: 0 18rpx 0 0;
				position: relative;
				&:nth-child(3n) {
					margin-right: 0;
				}
				.panel-name {
					font-weight: 400;
					font-size: 28rpx;
					color: #333333;
					width: 204rpx;
					margin-bottom: 8rpx;
				}
				.panel-tag {
					display: flex;
					flex-wrap: wrap;
					.tag-text {
						width: fit-content;
						border-radius: 4px;
						border: 1px solid #ff9797;
						font-weight: 400;
						font-size: 18rpx;
						color: #ff5e52;
						text-align: center;
						padding: 3rpx 8rpx;
						margin: 0 8rpx 8rpx 0;
						&:nth-child(3n) {
							margin-right: 0;
						}
					}
				}
				.panel-img {
					width: 100%;
					height: 204rpx;
					margin: 0 0 14rpx 0;
					border-radius: 12rpx;
				}
				.panel-img2 {
					width: 20rpx;
					height: 20rpx;
					margin: 0 0 0 4rpx;
					vertical-align: middle;
				}
				.text {
					border-radius: 4px;
					border: 1px solid #ff9797;
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
					align-items: flex-end;
				}
				.text3 {
					font-weight: bolder;
					font-size: 36rpx;
					color: #ff5e52;
					line-height: 36rpx;
				}
				.text4 {
					font-weight: 400;
					font-size: 22rpx;
					color: #666666;
				}
				.text5 {
					// margin-top: 10rpx;
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
			.item2 {
				width: calc((100% - 134rpx) / 3);
				.silver {
					background-size: contain;
					bottom: -2rpx;
				}
				.panel-name {
					width: 190rpx;
				}
				&:nth-child(3n) {
					margin-right: 18rpx;
				}
				.panel-tag {
					.tag-text {
						&:nth-child(2n) {
							margin-right: 0;
						}
					}
				}
				.silver-text2 {
					font-size: 28rpx;
				}
			}
		}
	}
}
</style>
