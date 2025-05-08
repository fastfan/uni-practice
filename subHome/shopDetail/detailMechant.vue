<template>
	<view class="detail-mechant" style="height: 100vh">
		<view class="content-video" v-if="detail.videoUrl">
			<video class="video" id="videoId" :src="detail.videoUrl" controls loop></video>
		</view>
		<view class="content-shop has-border">
			<view class="top">
				<view class="icon-left">
					<image class="img" src="https://oss.ruikedz.com/51life/static/images/shop/icon_dianpu@2x.png"></image>
				</view>
				<view class="icon-text">店铺照片</view>
			</view>
			<view class="bottom">
				<view>
					<image @click="scanImg('front', 0)" class="img" :src="detail.displayImgUrl"></image>
				</view>
				<view v-if="detail.photoFileList.length > 0">
					<image @click="scanImg('other', 0)" class="img" :src="detail.photoFileList[0].fileUrl"></image>
				</view>
				<view class="bottom-block" @click="scanImg('more', 0)" v-if="detail.photoFileList.length > 0">查看更多</view>
			</view>
		</view>
		<view class="content-shop has-border">
			<view class="top" @click="scanImg('one', 0)">
				<view class="icon-left">
					<image class="img" src="https://oss.ruikedz.com/51life/static/images/shop/icon_zhengjian@2x.png"></image>
				</view>
				<view class="icon-text">查看店铺营业执照</view>
				<view class="icon-right">
					<uni-icons type="right" class="img" :color="'#969696'" size="20"></uni-icons>
				</view>
			</view>
		</view>
		<view class="content-shop has-border" v-if="detail.enFoodLicenseUrl">
			<view class="top" @click="scanImg('food', 0)">
				<view class="icon-left">
					<image class="img" src="https://oss.ruikedz.com/51life/static/images/shop/icon_zhengjian@2x.png"></image>
				</view>
				<view class="icon-text">查看店铺食品安全许可证</view>
				<view class="icon-right">
					<uni-icons type="right" class="img" :color="'#969696'" size="20"></uni-icons>
				</view>
			</view>
		</view>
		<view class="content-shop has-border" v-if="deliveryTime">
			<view class="top">
				<view class="icon-left">
					<image class="img" src="https://oss.ruikedz.com/51life/static/images/shop/icon_shijian@2x.png"></image>
				</view>
				<view class="icon-text">配送时间：{{ deliveryTime }}</view>
			</view>
		</view>
		<view class="content-shop">
			<view class="top">
				<view class="icon-left">
					<image class="img" src="https://oss.ruikedz.com/51life/static/images/shop/icon_fuwu@2x.png"></image>
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
	props: {
		detail: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			imgList: [],
			show: false
		}
	},
	computed: {
		deliveryTime() {
			const deliveryConfigVo = this.detail.deliveryConfigVo
			return deliveryConfigVo.deliveryType.indexOf('1') !== -1 ? deliveryConfigVo.startTime + '-' + deliveryConfigVo.endTime : ''
		}
	},
	methods: {
		scanImg(type, current) {
			if (type === 'more') {
				this.imgList =
					this.detail.photoFileList.length > 0
						? this.detail.photoFileList.map((res) => {
								return res.fileUrl
						  })
						: []
			} else if (type === 'one') {
				if (this.detail.enLicenceUrl) {
					this.imgList = [].concat([this.detail.enLicenceUrl])
				} else {
					this.imgList = []
					this.$tui.toast('暂无营业执照')
				}
			} else if (type === 'food') {
				if (this.detail.enFoodLicenseUrl) {
					this.imgList = this.detail.enFoodLicenseUrl ? [].concat([this.detail.enFoodLicenseUrl]) : []
				} else {
					this.imgList = []
					this.$tui.toast('暂无食品安全许可证')
				}
			} else if (type === 'front') {
				this.imgList = this.detail.displayImgUrl ? [].concat([this.detail.displayImgUrl]) : []
			} else if (type === 'other') {
				this.imgList = this.detail.photoFileList.length > 0 ? [].concat([this.detail.photoFileList[0].fileUrl]) : []
			} else {
				this.imgList = []
			}
			// 预览图片
			if (this.imgList.length > 0) {
				uni.previewImage({
					current,
					urls: this.imgList,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function (data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片')
						},
						fail: function (err) {
							console.log(err.errMsg)
						}
					}
				})
			}
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
		// background: rgba(0, 0, 0, 0.32);
		border-radius: 20rpx;
		margin-bottom: 24rpx;
		.video {
			width: 100%;
			height: 100%;
			border-radius: 20rpx;
		}
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
				margin-right: 20rpx;
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
				// flex: 1;
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
