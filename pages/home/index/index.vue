<template>
	<view class="HomeIndex">
		<view class="top_box" :style="{ paddingTop: topHeight }">
			<view class="top_fixed">
				<view class="top_box_title" :style="{ height: statusBarHeight + 'px' }"></view>
				<view class="top_box_title" :style="{ height: navBarHeight + 'px' }">
					<uni-icons type="location" size="22" class="top_box_unicon"></uni-icons>
					银川市的士学校
				</view>
				<view class="search-con padding_24" @click="jump('searchHistory')">
					<view class="search">
						<image class="img" src="/static/images/home/ic_search@2x.png" mode=""></image>
						<input type="text" disabled class="search-input" placeholder="请输入商品名称" v-model="searchKeyValue" />
						<view class="search-btn" @click="onClickSearchValue">搜索</view>
					</view>
					<image class="change" src="/static/images/home/icon_sousuo@2x.png" @click="onClickScan"></image>
				</view>
			</view>
			<view class="top_box_ad padding_24">
				<image class="img" src="/static/images/home/banner@2x.png"></image>
			</view>
			<view class="top_box_top flex_box">
				<view class="top_box_top_left">
					<image src="/static/images/home/taxt_bdsh@2x.png" class="panel_img"></image>
				</view>
				<view class="top_box_top_mid">
					<!-- <view>95128宁夏开始运营啦</view>
					<view>各位司机朋友，新款顶灯现已到货</view> -->
					<swiper
						class="news-swiper"
						:interval="3000"
						:duration="1000"
						:vertical="true"
						:circular="true"
						:indicator-dots="false"
						:autoplay="true"
					>
						<swiper-item v-for="(anew, index) in news" :key="index">
							<view class="swiper-item">
								<view class="msg">
									{{ anew.noticeTitle }}
								</view>
								<view class="tag" v-if="anew.level && anew.level !== '0'">
									{{ anew.level == '1' ? '重要' : anew.level == '2' ? '紧急' : '' }}
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="top_box_top_right">
					<image src="/static/images/home/gonggao@2x.png" class="panel_img2"></image>
				</view>
			</view>
			<view class="top_box_mid padding_24">
				<view class="top_box_mid_list" v-for="(item, index) in imgList" :key="index" @click="clickMakeMoney(item)">
					<image class="img" :src="item.src"></image>
				</view>
				<view class="top_box_mid_circle">
					<image class="img" src="/static/images/home/zhuqianba@2x.png"></image>
				</view>
			</view>
		</view>
		<view class="top_banner flex_box flex_row_between padding_24">
			<image class="img" src="/static/images/home/banner_ruzhu@2x.png" mode="widthFix"></image>
		</view>
		<view class="mid_box">
			<view class="mid_box_paneltop">
				<my-tabs
					:tabs="list"
					field="name"
					v-model="currentTab"
					@change="tabClick"
					height="112rpx"
					lineColor="#F3483C"
					activeColor="#F3483C"
					activeFontSize="36rpx"
					fontSize="30rpx"
				></my-tabs>
			</view>
			<!-- 九宫格内容区域 -->
			<swiper @change="slideOn" :current="currentTab" style="height: calc(844rpx - 112rpx)">
				<swiper-item v-for="(item, index) in gridData" :key="index" class="mid_box_panelmid">
					<view class="mid_box_panelmid_item" v-for="(items, indexs) in gridData[currentTab]" :key="indexs">
						<image class="img" :src="items.src"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="bottom_box">
			<view class="bottom_box_paneltop overflow_hidden">
				<view class="bottom_box_paneltop_left">
					<image src="/static/images/home/icon_shangjia@2x.png" class="panel_img"></image>
					优选商家
				</view>
				<view class="bottom_box_paneltop_right" @click="jump('shopList')">
					查看更多
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
			<view class="bottom_box_panellist">
				<MescrollMoreItemShop></MescrollMoreItemShop>
			</view>
		</view>
		<view class="bottom_box bottom_box2" style="margin-bottom: 0">
			<view class="bottom_box_paneltop bottom_box2_paneltop overflow_hidden">
				<view class="bottom_box_paneltop_left">
					<image src="/static/images/home/ic_shangcheng@2x.png" class="panel_img"></image>
					优选商城
				</view>
				<view class="bottom_box_paneltop_right bottom_box2_paneltop_right" @click="jump('shop')">
					查看更多
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
			<view class="bottom_box_panelmid2">
				<my-tabs
					:tabs="list2"
					field="name"
					v-model="currentTab2"
					@change="tabClick2"
					height="112rpx"
					lineColor="#F3483C"
					activeColor="#F3483C"
					activeFontSize="36rpx"
					fontSize="30rpx"
				></my-tabs>
			</view>
			<view class="bottom_box_panellist bottom_box2_panellist">
				<MescrollMoreItemGoods ref="mescrollItem" :index="currentTab2" :tabs="list2"></MescrollMoreItemGoods>
			</view>
		</view>
	</view>
</template>

<script>
import MescrollMoreItemShop from './mescroll-more-item-shop.vue'
import MescrollMoreItemGoods from './mescroll-more-item-goods.vue'
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import MescrollMoreItemMixin from '@/components/mescroll-uni/mixins/mescroll-more-item.js'
import { gridData } from '@/api/mock/data.js'
export default {
	mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
	components: {
		MescrollMoreItemShop,
		MescrollMoreItemGoods
	},
	data() {
		return {
			searchKeyValue: '',
			topHeight: 0,
			news: [
				{
					createTime: '2023-10-19 09:30:37',
					id: '13',
					level: '0',
					noticeContent: '',
					noticeTitle: '宁AT2234-您定制的门贴现已制作完成，请前往的士学校调度服务中心领取。'
				},
				{
					createTime: '2023-10-19 09:03:00',
					id: '12',
					level: '0',
					noticeContent: '',
					noticeTitle: '宁AT1234-您定制的门贴现已制作完成，请前往的士学校调度服务中心领取。'
				},
				{
					createTime: '2022-08-11 14:40:49',
					id: '10',
					level: '0',
					noticeContent: '',
					noticeTitle: '银川全力推进网约车合规化'
				}
			],
			statusBarHeight: getApp().globalData.statusBarHeight,
			navBarHeight: getApp().globalData.navBarHeight,
			currentTab: 0,
			currentTab2: 0,
			titleStyle: { fontWeight: 500, fontSize: '36rpx', color: '#333333' },
			bgColor: '#FEC0BC',
			list: [
				{
					id: 1,
					name: '商超购物'
					// disabled: true
				},
				{
					id: 2,
					name: '美食餐饮'
					// disabled: true
				},
				{
					id: 3,
					name: '家政服务'
					// disabled: true
				},
				{
					id: 4,
					name: '出租车服务'
					// disabled: true
				}
			],
			list2: [
				{
					id: 1,
					name: '推荐'
					// disabled: true
				},
				{
					id: 1,
					name: '商超购物'
					// disabled: true
				},
				{
					id: 2,
					name: '美食餐饮'
					// disabled: true
				},
				{
					id: 3,
					name: '家政服务'
					// disabled: true
				},
				{
					id: 4,
					name: '出租车服务'
					// disabled: true
				}
			],
			// 95128宁夏
			taxiMiniData: {
				miniAppId: 'wx6f464f83da33faf9',
				miniAppPath: 'pages/home/home'
			},
			// 51畅行通
			travelMiniData: {
				miniAppId: 'wxed37c897ab04150b',
				miniAppPath: 'pages/home/index/index'
			},
			// 51暖心餐厅
			diningMiniData: {
				miniAppId: 'wx546912a79a869b5c',
				miniAppPath: 'pages/index/index'
			},
			imgList: [
				{
					isMiniProgrom: true,
					MiniData: {
						miniAppId: 'wxed37c897ab04150b',
						miniAppPath: 'pages/home/index/index'
					},
					url: '',
					src: '/static/images/home/bnr_lvyou@2x.png'
				},
				{
					isMiniProgrom: false,
					MiniData: {},
					url: '',
					src: '/static/images/home/bnr_fenxz@2x.png'
				},
				{
					isMiniProgrom: false,
					MiniData: {},
					url: '',
					src: '/static/images/home/bnr_mlwd@2x.png'
				},
				{
					isMiniProgrom: false,
					MiniData: {},
					url: '',
					src: '/static/images/home/bnr_rys@2x.png'
				}
			],
			gridData
		}
	},
	onShow() {
		this.requestData()
	},
	methods: {
		onClickSearchValue() {
			console.log('点击了搜索')
		},
		onClickScan() {
			console.log('点击了扫一扫')
		},
		jump(type) {
			if (type === 'shop') {
				uni.switchTab({
					url: '/pages/shop/index/index'
				})
			} else if (type === 'shopList') {
				uni.navigateTo({
					url: `/subShop/${type}/${type}`
				})
			} else if (type === 'searchHistory') {
				uni.navigateTo({
					url: `/subHome/${type}/${type}`
				})
			}
		},
		leftClick() {
			console.log('点击了定位')
		},
		slideOn(e) {
			this.currentTab = e.detail.current
		},
		tabClick(index) {
			console.log(index)
			this.currentTab = index
		},
		tabClick2(index) {
			// console.log(index)
			this.currentTab2 = index
			this.$nextTick(() => {
				this.$refs.mescrollItem.dataList = [] // 先置空列表,显示加载进度
				this.$refs.mescrollItem.mescroll.resetUpScroll() // 再刷新列表数据
			})
		},
		itemTap(item) {
			console.log(item)
		},
		// 点击赚钱吧
		clickMakeMoney(item) {
			const { isMiniProgrom, MiniData, url } = item
			if (isMiniProgrom) {
				this.openMiniProgram(MiniData)
			} else {
				console.log(url)
			}
		},
		/**
		 * 打开外部小程序
		 */
		openMiniProgram(e) {
			console.log('打开小程序: ', e)
			let appId = e.miniAppId
			let path = e.miniAppPath
			let _that = this
			const accountInfo = uni.getAccountInfoSync()
			const currentAppid = accountInfo.miniProgram.appId
			if (appId == currentAppid) {
				this.openMiniUrl(path)
			} else {
				uni.navigateToMiniProgram({
					appId,
					path,
					success: function (res) {},
					fail: function (res) {
						console.log('打开失败')
					}
				})
			}
		},
		/**
		 * 打开小程序内部页面
		 */
		openMiniUrl(url) {
			if (this.jumpToLogin()) {
				let [, subUrl] = url.split('/')
				if (!url) {
					return that.$tui.toast('请联系管理员配置正确的路径！')
				}
				if (subUrl == 'pages') {
					uni.switchTab({
						url
					})
				} else {
					uni.navigateTo({
						url
					})
				}
			}
		},
		jumpToLogin() {
			if (!this.$tui.isLogin()) {
				uni.showModal({
					title: '提示',
					content: '为了您更好的体验，请先前往登录！',
					cancelText: '稍后登录',
					confirmText: '立即登录',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					}
				})
				return false
			}
			return true
		},
		requestData() {}
	},
	onLoad() {
		console.log(getApp())
		this.topHeight = uni.rpx2px(136) + this.statusBarHeight + this.navBarHeight + 'px'
	}
}
</script>
<style lang="scss">
.HomeIndex {
	background-color: #f2f2f2;
	.top_banner {
		height: 190rpx;
		background: #ffffff;
		line-height: 162rpx;
		text-align: center;
		padding: 0 24rpx 0 24rpx;
		margin-bottom: 28rpx;
		.img {
			height: 152rpx;
			width: 100%;
		}
	}
	::v-deep .uni-navbar-btn-text text {
		font-size: 26rpx !important;
		font-weight: 500;
	}
	.top_fixed {
		position: fixed;
		z-index: 999;
		top: 0;
		background: linear-gradient(180deg, #fec0bc 5%, #fee3e1 100%);
		width: 100%;
	}
	.top_box {
		background: linear-gradient(180deg, #fec0bc 5%, #fee3e1 30%, #fff4ea 84%, #ffffff 100%);
		padding: 0 0 48rpx 0;
		margin: 0 0 32rpx 0;
		.search-con {
			margin: 22rpx 0 34rpx 0;
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			.search {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				background: #fff;
				width: 100%;
				border-radius: 35rpx;
				height: 66rpx;
				line-height: 66rpx;

				.img {
					width: 44rpx;
					height: 46rpx;
					margin-left: 30rpx;
				}

				.search-input {
					flex: 1;
					margin: 0 20rpx;
					font-size: 28rpx;
				}

				.search-btn {
					height: 58rpx;
					line-height: 58rpx;
					border-radius: 35rpx;
					color: #fff;
					text-align: center;
					background: #ff7a4a;
					width: 104rpx;
					margin-right: 4rpx;
				}
			}

			.change {
				width: 40rpx;
				height: 40rpx;
				margin-left: 20rpx;
			}
		}
		&_title {
			// height: 88rpx;
			line-height: 88rpx;
			padding-left: 24rpx;
			font-size: 24rpx;
			font-weight: 500;
		}
		&_unicon {
			vertical-align: middle;
		}

		&_ad {
			margin: 0 0 24rpx 0;
			.img {
				width: 100%;
				height: 250rpx;
				border-radius: 6rpx;
			}
		}

		&_top {
			height: 120rpx;
			background-color: #fff;
			border-radius: 6rpx;
			margin: 0 24rpx 34rpx;

			.panel_img2 {
				width: 60rpx;
				height: 60rpx;
			}

			.panel_img {
				width: 72rpx;
				height: 82rpx;
				vertical-align: baseline;
			}

			&_left {
				width: 72rpx;
				margin: 0 30rpx 0 20rpx;
			}

			&_mid {
				flex-grow: 1;
				.news-swiper {
					width: 100%;
					height: 80rpx;
				}

				.swiper-item {
					display: flex;
					flex-direction: row;
					align-items: center;
					overflow: hidden;

					.msg {
						color: $uni-text-color;
						display: flex;
						flex-direction: column;
						justify-content: center;
						font-size: 28rpx;
						// line-height: 80rpx;
					}

					.tag {
						margin-left: 20rpx;
						background-image: linear-gradient(0deg, #ffb686 0%, #ff7e7b 100%);
						border-radius: 2px;
						border-radius: 5rpx;
						font-size: 22rpx;
						color: #ffffff;
						padding: 0 5rpx;
					}
				}
			}

			&_right {
				width: 84rpx;
			}
		}

		&_mid {
			height: 404rpx;
			display: flex;
			flex-wrap: wrap;
			position: relative;

			// background-color: #ccc;
			// border-radius: 50rpx;
			&_list {
				margin: 0 22rpx 24rpx 0;
				.img {
					width: 340rpx;
					height: 190rpx;
				}

				&:nth-child(2n) {
					margin-right: 0;
				}
			}

			&_circle {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				.img {
					width: 220rpx;
					height: 220rpx;
				}
			}
		}
	}

	.mid_box {
		margin: 0 0 28rpx 0;
		// padding: 0 24rpx;
		background: #fff;
		height: 844rpx;

		&_paneltop {
			height: 112rpx;
			border-bottom: 1rpx solid #ccc;
		}
		&_panelmid {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			margin: 0 24rpx;
			height: auto !important;

			&_item {
				height: 212rpx;
				background: #ffffff;
				flex: 0 0 calc((100% - 100rpx) / 3);
				margin: 24rpx 24rpx 0 0;
				.img {
					width: 100%;
					height: 212rpx;
				}
				&:nth-child(3n) {
					margin-right: 0;
				}
			}
		}
	}

	.bottom_box {
		padding: 0 24rpx;
		background: #fff;
		margin: 0 0 28rpx 0;

		&_paneltop {
			background: #fff;
			height: 104rpx;
			line-height: 104rpx;
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: space-between;
			&_left {
				.panel_img {
					width: 34rpx;
					height: 34rpx;
					vertical-align: middle;
					margin: -10rpx 18rpx 0 0;
				}
			}

			&_right {
				display: flex;
				font-weight: 400;
				font-size: 24rpx;
				color: #666666;
			}
		}
		&_panellist {
			height: 100vh;
			// overflow-y: scroll;
		}
		&_panelmid2 {
			margin: 20rpx 0;

			.item {
				flex: 1;
				height: 76rpx;
				border-right: 2rpx solid #ccc;
				text-align: center;

				&:nth-child(4) {
					border-right: none;
				}

				.text {
					font-weight: 500;
					font-size: 32rpx;
					color: #333333;
					margin-bottom: 16rpx;
				}

				.text2 {
					font-weight: 400;
					font-size: 20rpx;
					color: #666666;
				}

				.texts {
					font-weight: 500;
					font-size: 32rpx;
					color: #ff5314;
					margin-bottom: 16rpx;
				}

				.texts2 {
					background: #ff552e;
					border-radius: 22rpx;
					font-weight: 500;
					font-size: 20rpx;
					color: #ffffff;
					text-align: center;
					padding: 2rpx 12rpx;
					width: fit-content;
				}
			}
		}
	}

	.bottom_box2 {
		background: none;
		padding: 0;

		&_paneltop {
			padding: 0 24rpx;
			&_right {
			}
		}

		.content_mid {
			padding: 0 20rpx;
			margin-top: 20rpx;
		}
	}
}
</style>
