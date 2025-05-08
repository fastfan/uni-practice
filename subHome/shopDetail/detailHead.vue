<template>
	<view class="detail-head">
		<view class="detail-head-top">
			<view class="detail-head-top-tleft">
				<image class="img" :src="detailsInfo.logoUrl"></image>
				<text class="font4" v-if="detailsInfo.openingStatus == '1'">歇业中</text>
				<!-- <swiper @change="bannerSlideOn" :current="banerIndex" style="height: 200rpx" :autoplay="true" :circular="true" interval="3000">
					<swiper-item v-for="(item, index) in bannerList" :key="item.id">
						<image class="img" :src="item.url"></image>
					</swiper-item>
				</swiper> -->
			</view>
			<view class="detail-head-top-tmid">
				<view class="tmid-title">{{ detailsInfo.storeName }}</view>
				<view class="tmid-title2">
					<image class="img" src="https://oss.ruikedz.com/51life/static/images/shop/ic_xinji@2x.png"></image>
					<view class="font">
						{{ detailsInfo.score }}
						<!-- <text style="margin-left: 20rpx">{{ detailsInfo.openingTime + '-' + detailsInfo.closeTime }}</text> -->
						<text style="margin-left: 20rpx">￥{{ detailsInfo.avgAmount }}/人</text>
						<!-- <text style="margin-left: 20rpx" class="font4" v-if="detailsInfo.openingStatus == '1'">歇业中</text> -->
					</view>
				</view>
			</view>
			<view class="detail-head-top-tright">
				<view class="list" v-for="(item, index) in detailsInfo.shopShareList" :key="item.type" @click="clickItem(item)">
					<image class="img" :src="item.icon" v-if="index !== 1"></image>
					<button
						v-else
						open-type="share"
						:data-share="{
							title: `${detailsInfo.storeName}`,
							path: `/pages/index/index?d=${url}`,
							imageUrl: `${detailsInfo.displayImgUrl}`
						}"
						class="btm_btn btn"
					>
						<image class="img" :src="item.icon"></image>
					</button>
				</view>
			</view>
		</view>
		<view class="detail-head-mid flex_box">
			<view class="text" v-for="(tag, tags) in detailsInfo.tagList" :key="tags">{{ tag.name }}</view>
		</view>
		<view class="detail-head-map" @click="openLocation">
			<view class="text">{{ detailsInfo.address }}</view>
			<image class="img" src="https://oss.ruikedz.com/51life/static/images/shop/icon_daohang2@2x.png"></image>
		</view>
		<view class="detail-head-bottom">
			<view
				class="bottom-item"
				v-for="(item, index) in detailsInfo.shopIconList"
				:key="item.type"
				@click.native="onClickShopIconItem(item)"
			>
				<image class="img" :src="item.icon"></image>
				<view class="text">{{ item.name }}</view>
			</view>
		</view>
		<canvas class="canvas-hide" canvas-id="qrcode" :style="'width:' + winWidth + 'px;' + 'height:' + winWidth + 'px;'" />
	</view>
</template>

<script>
import uQRCode from '@/common/Sansnn-uQRCode/uqrcode.js'
import { encrypt, decrypt } from '@/common/sm4/sm4.js'
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
			winWidth: getApp().globalData.winWidth * 2 * 0.65,
			winHeight: getApp().globalData.winHeight,
			scanImage: '',
			url: '',
			detailsInfo: {
				storeName: '',
				score: '',
				openingTime: '',
				closeTime: '',
				openingStatus: '',
				avgAmount: '',
				shopShareList: [
					{ id: 1, type: 'phone', icon: 'https://oss.ruikedz.com/51life/static/images/shop/icon_dianhua@2x.png' },
					{ id: 2, type: 'share', icon: 'https://oss.ruikedz.com/51life/static/images/shop/icon_fenxiang@2x.png' },
					{ id: 3, type: 'code', icon: 'https://oss.ruikedz.com/51life/static/images/shop/icon_erweima@2x.png' }
				],
				shopIconList: [
					// { id: 2, type: 'charge', name: '快捷充电', icon: 'https://oss.ruikedz.com/51life/static/images/shop/icon_chundian@2x.png' },
					{ id: 3, type: 'integral', name: '消费赚积分', icon: 'https://oss.ruikedz.com/51life/static/images/shop/icon_jifen@2x.png' }
					// { id: 4, type: 'pay', name: '去支付', icon: 'https://oss.ruikedz.com/51life/static/images/shop/icon_zhifu2@2x.png' }
				],
				tagList: []
			}
		}
	},
	methods: {
		onClickShopIconItem(item) {
			// console.log(1111111)
			if (item.type == 'pay') {
				uni.navigateTo({
					url: '/subHome/keyBoradPay/keyBoradPay'
				})
			} else if (item.type == 'charge') {
				this.$util.toast('即将上线')
			} else if (item.type == 'WIFI') {
				uni.navigateTo({
					url: '/subHome/wifiConnect/wifiConnect?wifiList=' + encodeURIComponent(JSON.stringify(this.detailsInfo.storeWifiVoList))
				})
			} else if (item.type == 'integral') {
				uni.navigateTo({
					url: '/subHome/earnBySharing/earnBySharing'
				})
			}
		},
		clickItem(item) {
			console.log(item)
			if (item.type === 'phone') {
				uni.makePhoneCall({
					phoneNumber: this.detailsInfo.contactNumber
				})
			} else if (item.type === 'code') {
				// this.$refs.popup.open('center')
				this.$emit('openPopups', this.scanImage)
			}
		},
		openLocation() {
			let latitude = Number(this.detailsInfo.latitude)
			let longitude = Number(this.detailsInfo.longitude)
			uni.openLocation({
				latitude,
				longitude,
				name: this.detailsInfo.storeName, // 位置名
				address: this.detailsInfo.address, // 地址详情说明
				success: function () {
					console.log('success')
				},
				fail: function (error) {
					console.log('位置打开失败', error)
				}
			})
		},
		fetchQrcode() {
			uQRCode
				.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.fetchShareUrl(),
					size: this.winHeight / 2,
					margin: 0,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					correctLevel: uQRCode.errorCorrectLevel.H
				})
				.then((res) => {
					this.scanImage = res
				})
		},
		fetchShareUrl() {
			const url = encrypt(`?from=100&storeId=${this.detailsInfo.id}`)
			console.log(url)
			// console.log(decrypt(d))
			this.url = url
			this.$emit('shareUrl', this.url)
			console.log(this.$tui.miniUrl + '?d=' + url)
			return this.$tui.miniUrl + '?d=' + url
		}
	},
	computed: {
		storeType() {
			return this.$store.getters.storeType
		}
	},
	watch: {
		detail: {
			handler: function (val) {
				if (!this.$util.isEmpty(val)) {
					this.detailsInfo = { ...this.detailsInfo, ...val }
					const deliveryConfigVo = val.deliveryConfigVo
					const deliveryType = deliveryConfigVo.deliveryType.split(',')
					const wifiListLength = this.detailsInfo.storeWifiVoList.length
					if (wifiListLength > 0) {
						this.detailsInfo.shopIconList.unshift({
							id: 1,
							type: 'WIFI',
							name: '免费WiFi',
							icon: 'https://oss.ruikedz.com/51life/static/images/shop/icon_wifi@2x.png'
						})
					}
					this.detailsInfo.tagList = deliveryType.map((_tt) => {
						return {
							id: _tt,
							type: _tt === '0' ? 'selfPicup' : _tt === '1' ? 'distribution' : _tt === '2' ? 'delivery' : 'selfPicup',
							name: _tt === '0' ? '到店自提' : _tt === '1' ? '商家配送' : _tt === '2' ? '快递配送' : '到店自提'
						}
					})
					console.log('this.detailsInfo :::::::', this.detailsInfo)
					this.fetchQrcode()
				}
			},
			immediate: true,
			deep: true
		}
	}
}
</script>
<style lang="scss" scoped>
::v-deep .canvas-hide {
	/* 1 */
	position: fixed !important;
	right: 100vw;
	bottom: 100vh;
	/* 2 */
	z-index: -9999;
	/* 3 */
	opacity: 0 !important;
	overflow: hidden !important;
}
.detail-head {
	height: auto;
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
			position: relative;
			.img {
				width: 160rpx;
				height: 160rpx;
				border-radius: 18rpx;
				vertical-align: bottom;
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
				left: 0;
			}
		}
		&-tmid {
			flex: 1;
			margin-left: 22rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-top: 60rpx;
			.tmid-title {
				font-weight: 400;
				color: #333333;
				font-size: 32rpx;
			}
			.tmid-title2 {
				@extend .tmid-title;
				font-size: 26rpx;
				display: flex;
				// margin-top: 22rpx;
				.font {
					margin-left: 6rpx;
				}
				// .font4 {
				// 	width: 94rpx;
				// 	height: 36rpx;
				// 	background: #ff3e2a;
				// 	border-radius: 20rpx;
				// 	color: #fff;
				// 	text-align: center;
				// 	display: inline-block;
				// }
				.img {
					width: 26rpx;
					height: 24rpx;
					margin-top: 6rpx;
				}
			}
		}
		&-tright {
			padding-top: 66rpx;
			display: flex;
			align-items: baseline;
			.list {
				margin-right: 14rpx;
				&:nth-child(3n) {
					margin-right: 0;
				}
			}
			.btm_btn {
				width: 100%;
				height: 44rpx;
				line-height: 44rpx;
				background: transparent;
				padding: 0;
			}
			.img {
				width: 44rpx;
				height: 44rpx;
			}
		}
	}
	&-mid {
		margin-top: -46rpx;
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
			margin-bottom: 24rpx;
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
