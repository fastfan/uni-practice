<template>
	<page-meta :page-style="'overflow:' + (visible ? 'hidden' : 'visible')"></page-meta>
	<view class="HomeIndex">
		<view class="top_box" :style="{ paddingTop: topHeight }">
			<view class="top_fixed">
				<view class="top_box_title" :style="{ height: statusBarHeight + 'px' }"></view>
				<view class="top_box_title" @click="getLocation" :style="{ height: navBarHeight + 'px', lineHeight: navBarHeight + 'px' }">
					<uni-icons type="location" size="22" class="top_box_unicon"></uni-icons>
					{{ address }}
				</view>
				<view class="search-con padding_24" @click="jump('searchHistory')">
					<view class="search">
						<image class="img" src="https://oss.ruikedz.com/51life/static/images/home/ic_search@2x.png" mode=""></image>
						<input type="text" disabled class="search-input" placeholder="请输入商品名称" v-model="searchKeyValue" />
						<view class="search-btn" @click="onClickSearchValue">搜索</view>
					</view>
					<image
						class="change"
						src="https://oss.ruikedz.com/51life/static/images/home/icon_sousuo@2x.png"
						@click.stop="onClickScan"
					></image>
				</view>
			</view>
			<view class="top_box_ad padding_24">
				<!-- <uni-swiper-dot :current="bannerIndex" mode="round" :info="bannerList"> -->
				<swiper @change="bannerSlideOn" :current="bannerIndex" :autoplay="true" :circular="true" interval="4000" class="home-swiper">
					<swiper-item v-for="(item, index) in bannerList" :key="item.id">
						<image
							class="img"
							:src="item.displayImgUrl"
							@click="item.advertType == 3 ? openMiniProgram(item) : onClickBannerItem(item)"
						></image>
					</swiper-item>
				</swiper>
				<!-- </uni-swiper-dot> -->
			</view>
			<view class="top_box_top flex_box">
				<view class="top_box_top_left">
					<image src="https://oss.ruikedz.com/51life/static/images/home/taxt_bdsh@2x.png" class="panel_img"></image>
				</view>
				<view class="top_box_top_mid">
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
							<view class="swiper-item" @click="onClickNewsItem(anew)">
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
					<image src="https://oss.ruikedz.com/51life/static/images/home/gonggao@2x.png" class="panel_img2"></image>
				</view>
			</view>
			<view class="top_box_mid padding_24">
				<view class="top_box_mid_list" v-for="(item, index) in imgList" :key="index" @click="onClickMakeMoney(item)">
					<image class="img" :src="item.src"></image>
				</view>
				<view class="top_box_mid_circle" @click="onClickMakeMoney({ url: '/subHome/makeMoneyBar/makeMoneyBar', needLogin: true })">
					<image class="img" src="https://oss.ruikedz.com/51life/static/images/home/zhuqianba@2x.png"></image>
				</view>
			</view>
		</view>
		<view class="mid_box">
			<view class="mid_box_paneltop">
				<my-tabs
					:tabs="firstCategoryList"
					field="categoryName"
					v-model="currentTab"
					@change="tabClick"
					height="112rpx"
					lineColor="#F3483C"
					activeColor="#F3483C"
					activeFontSize="36rpx"
					fontSize="30rpx"
					:lineScale="0.3"
				></my-tabs>
			</view>
			<!-- 九宫格内容区域 -->
			<!-- <swiper @change="slideOn" :current="currentTab" style="height: calc(844rpx - 112rpx)">
				<swiper-item v-for="(item, index) in gridData" :key="index" class="mid_box_panelmid">
					<view class="mid_box_panelmid_item" v-for="(items, indexs) in gridData[currentTab]" :key="indexs" @click="onClickGrid(items)">
						<image class="img" :src="items.src"></image>
					</view>
				</swiper-item>
			</swiper> -->
			<view class="mid_box_panelmid">
				<view class="mid_box_panelmid_item" v-for="(items, indexs) in gridData" :key="indexs" @click="onClickGrid(items)">
					<image class="img" :src="items.displayImgUrl"></image>
					<text class="text" v-if="items.showText">{{ items.categoryName }}</text>
				</view>
			</view>
		</view>
		<view class="top_banner flex_box flex_row_between padding_24" @click="jump('shopSettled')">
			<image class="img" src="https://oss.ruikedz.com/51life/static/images/home/banner_ruzhu@2x.png" mode="widthFix"></image>
		</view>
		<view class="bottom_box">
			<view class="bottom_box_paneltop overflow_hidden">
				<view class="bottom_box_paneltop_left">
					<image src="https://oss.ruikedz.com/51life/static/images/home/icon_shangjia@2x.png" class="panel_img"></image>
					优选商家
				</view>
				<view class="bottom_box_paneltop_right" @click="jump('shopList')">
					查看更多
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
			<view class="bottom_box_panellist shop-scroll">
				<my-shop-list :dataList="shopList" :productPageSize="3" @onClickEvent="onClickShopList"></my-shop-list>
			</view>
		</view>
		<view class="bottom_box bottom_box2" style="margin-bottom: 0">
			<view class="bottom_box_paneltop bottom_box2_paneltop overflow_hidden">
				<view class="bottom_box_paneltop_left">
					<image src="https://oss.ruikedz.com/51life/static/images/home/ic_shangcheng@2x.png" class="panel_img"></image>
					优选商城
				</view>
				<view class="bottom_box_paneltop_right bottom_box2_paneltop_right" @click="jump('mall')">
					查看更多
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
			<mescroll-body @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption" @scroll="scroll">
				<view
					class="bottom_box_panelmid2"
					id="tabInList"
					:style="{ top: isShowSticky ? topHeight : 0, position: isShowSticky ? 'fixed' : '', zIndex: 999, width: '100%' }"
				>
					<my-tabs
						:tabs="list2"
						field="categoryName"
						v-model="currentTab2"
						@change="tabClick2"
						height="112rpx"
						lineColor="#F3483C"
						activeColor="#F3483C"
						activeFontSize="36rpx"
						fontSize="30rpx"
						:scroll="true"
						:lineScale="0.3"
					></my-tabs>
				</view>

				<view class="bottom_box_panellist bottom_box2_panellist" :style="{ marginTop: isShowSticky ? topHeight : '' }">
					<!-- 瀑布流布局列表 -->
					<view class="content_mid" v-if="dataList.length > 0">
						<my-waterfall-flow :wfList="dataList" @itemTap="itemTap"></my-waterfall-flow>
					</view>
				</view>
			</mescroll-body>
		</view>
		<global-location-modal ref="globalLOcationModal"></global-location-modal>
		<uni-popup class="protocol-popup" ref="agreeProtocolPopup" type="bottom" safe-area="true" :maskClick="false" @change="changes">
			<view class="protocol-con">
				<view class="header-title">隐私协议</view>
				<view class="des-title">感谢您信任并使用51积分本地生活</view>
				<view class="des-content">
					我们十分重视您的个人信息和隐私保护。为了更好的保障您的个人权益，请您仔细阅读并同意
					<span class="dot" @click="onClickProtocol">《使用协议》</span>
					和
					<span class="dot" @click="onClickProtocol">《隐私协议》</span>
					以便我们向您提供更全面和优质的服务！
				</view>
				<view class="des-content">
					另外，我们为了确保业务功能的正常实现，请您知晓
					<span class="dot" @click="onClickSystemProtocol">《51积分本地生活权限明细表》</span>
				</view>
				<view class="des-content">点击同意表示您已阅读并认可所有条款</view>
				<view class="action-con">
					<view class="disagree" @click="onClickDisAgreeProtocol">拒绝</view>
					<button class="agree" open-type="agreePrivacyAuthorization" @agreeprivacyauthorization="handleAgreePrivacyAuthorization">
						同意并继续
					</button>
				</view>
			</view>
		</uni-popup>
		<canvas
			id="tui-color-palette"
			canvas-id="tui-color-palette"
			class="tui-palette-canvas"
			:style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
		></canvas>
		<uni-popup class="avater-popup" ref="avaterPopup" type="bottom" :maskClick="false" z-index="1000" @change="changes">
			<view class="protocol-con">
				<view class="header-title">
					<view class="title">51积分本地生活申请</view>
					<view class="close" @click="clsoePopup">关闭</view>
				</view>
				<view class="header-desc">获取您的微信{{ nickStep == 1 ? '头像' : '昵称' }}</view>
				<view v-if="nickStep == 1">
					<button class="agree-btn" open-type="chooseAvatar" @chooseavatar="chooseAvatar">
						<image :src="headImage ? headImage : '/static/images/home/home_sq_mrtx@2x.png'" class="img"></image>
					</button>
					<view class="action-con">
						<button class="agree" open-type="chooseAvatar" @chooseavatar="chooseAvatar">允许</button>
					</view>
				</view>
				<view v-else class="nick-box">
					<input class="nick-name" type="nickname" maxlength="20" v-model="nickName" @blur="nickNameBlur" />
					<image src="/static/images/home/home_sq_bj@2x.png" class="nick-img"></image>
					<view class="action-con">
						<button class="agree" @click="updateName">保存</button>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue'
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import { mapCallCarServer } from 'viewModel/call/callcar.js'
import { miniQueryOptions, globalJump } from '@/common/globalJump.js'
import { decrypt } from '@/common/sm4/sm4.js'
import { UserServer } from '@/viewModel/user/user.js'
import { DataServer } from '@/viewModel/data.js'
import { ShopServer } from '@/viewModel/shop/shop.js'
const userServer = new UserServer()
const dataServer = new DataServer()
const shopServer = new ShopServer()
export default {
	mixins: [MescrollMixin],
	components: {
		MescrollBody
	},
	data() {
		return {
			nickStep: 1,
			headImage: '',
			nickName: '',
			isOpen: false,
			userInfos: {},
			storeName: '',
			requestId: '',
			visibles: false,
			fromPage: '102',
			inviteUserId: '',
			latitude: '',
			longitude: '',
			address: '',
			stickyTop: 0,
			downOption: {
				isLock: true
			},
			// 上拉加载的配置(可选, 绝大部分情况无需配置)
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 3, // 配置列表的总数量要大于等于3条才显示'-- END --'的提示
				textNoMore: '已经到底了~',
				empty: {
					tip: '暂无相关数据'
				}
			},
			navTop: null, // nav距离到顶部的距离 (如计算不准确,可直接写死某个值)
			isShowSticky: false, // 是否悬浮
			imageCount: 0,
			bannerIndex: 0,
			bannerList: [],
			shopList: [],
			dataList: [],
			searchKeyValue: '',
			userType: 0,
			certStatus: 0,
			messages: 0,
			integralNum: 0,
			taxiInfo: {},
			news: [],
			hots: [],
			isRedirect: false,
			userInfo: getApp().globalData.userInfo,
			topHeight: 0,
			statusBarHeight: getApp().globalData.statusBarHeight,
			navBarHeight: getApp().globalData.navBarHeight,
			currentTab: 0,
			currentTab2: 0,
			headerBgStyle: `linear-gradient(180deg, #fec0bc 5%, #fee3e1 100%)`,
			headerBgStyle2: `linear-gradient(180deg, #fec0bc 5%, #fee3e1 15%, #ffffff 100%)`,
			colorAnalysis: null,
			colorList: [],
			winWidth: 0,
			winHeight: 0,
			canvasWidth: 100,
			canvasHeight: 100,
			firstCategoryList: [
				// 商家一级分类类表
				{
					id: 1,
					categoryName: '商超购物'
					// disabled: true
				}
			],
			list2: [
				{
					id: '',
					categoryName: '推荐',
					value: ''
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
					isMiniProgrom: false,
					MiniData: {},
					url: '/subHome/takeOverStore/takeOverStore',
					src: 'https://oss.ruikedz.com/51life/static/images/home/bnr_shoudian@2x.png',
					needLogin: true
				},
				{
					isMiniProgrom: false,
					MiniData: {},
					url: '/subHome/earnBySharing/earnBySharing',
					src: 'https://oss.ruikedz.com/51life/static/images/home/bnr_fenxz@2x.png',
					needLogin: false
				},
				{
					isMiniProgrom: true,
					MiniData: {
						miniAppId: 'wxed37c897ab04150b',
						miniAppPath: 'pages/home/index/index'
					},
					url: '',
					src: 'https://oss.ruikedz.com/51life/static/images/home/bnr_lvyou2@2x.png'
				},
				// {
				// 	isMiniProgrom: false,
				// 	MiniData: {},
				// 	url: '',
				// 	src: 'https://oss.ruikedz.com/51life/static/images/home/bnr_mlwd@2x.png'
				// },
				// {
				// 	isMiniProgrom: false,
				// 	MiniData: {},
				// 	url: '',
				// 	src: 'https://oss.ruikedz.com/51life/static/images/home/home_bnr_rys@2x.png',
				// 	needLogin: true
				// }
				{
					isMiniProgrom: true,
					MiniData: {
						miniAppId: 'wx6f464f83da33faf9',
						miniAppPath: 'pages/home/home'
					},
					url: '',
					src: 'https://oss.ruikedz.com/51life/static/images/home/home_bnr_95128@2x.png'
				}
			],
			gridData: [],
			tabIndex: 0
		}
	},
	computed: {
		visible() {
			return this.$store.state.modal.visible || this.visibles
		},
		location() {
			return this.$store.state.location
		}
	},
	watch: {
		location: {
			handler: function (val) {
				// console.log('val::::::::', val)
				if (val.latitude && val.longitude) {
					this.latitude = val.latitude
					this.longitude = val.longitude
					mapCallCarServer.reverseGeocode(val.latitude, val.longitude, (data) => {
						this.address = data.name
					})
					const getCurrentPagePath = this.$util.getCurrentPagePath()
					console.log(getCurrentPagePath)
					if (this.mescroll && getCurrentPagePath === 'pages/index/index') {
						this.getShopStorePageListApi()
						this.dataList = [] // 先置空列表,显示加载进度
						this.mescroll.resetUpScroll()
					}
				}
			},
			immediate: true,
			deep: true
		}
	},
	// 使用mescroll-body最简单只需在onPageScroll处理即可
	onPageScroll(e) {
		// console.log('滚动条位置 = ' + e.scrollTop + ', navTop = ' + this.navTop)
		if (this.navTop && e.scrollTop > this.navTop) {
			this.isShowSticky = true // 显示悬浮菜单
		} else {
			this.isShowSticky = false // 隐藏悬浮菜单
		}
	},
	onHide() {},
	onShareAppMessage(res) {
		return {
			title: '诚邀请您加入51积分本地生活',
			path: '/pages/index/index',
			imageUrl: ''
		}
	},
	onShow() {
		if (this.$tui.isLogin()) {
			this.getUserInfoApi()
			this.requestUserPoints()
			this.isShowProtocolPopup()
			this.$store.dispatch('updateUserRefer')
			this.$store.dispatch('updateFansCount')
			this.$store.dispatch('updateTotalPoints')
			const userInfos = uni.getStorageSync('userInfo')
			if (userInfos) this.userInfos = userInfos
		}
		this.requestData()
	},
	onLoad(options) {
		const height = uni.rpx2px(80 + 10 + 32) // 搜索栏高度加搜索栏上下margin
		this.topHeight = height + this.statusBarHeight + this.navBarHeight + 'px'
		Object.keys(options).length > 0 && this.getMinQuery(options)
	},
	onReady() {
		uni.getSystemInfo({
			success: (res) => {
				console.log(res)
				// this.colorAnalysis = new ColorAnalysis('tui-color-palette')
				this.winWidth = res.windowWidth
				this.winHeight = res.windowHeight
			}
		})
	},
	methods: {
		chooseAvatar(e) {
			console.log('e:::::::', e)
			// e.detail.avatarUrl
			this.headImage = e.detail.avatarUrl
			this.uploadImg(e.detail.avatarUrl)
		},
		async uploadImg(file) {
			const _that = this
			const fileImg = await dataServer.uploadFile({
				file,
				fileModule: 63
			})
			this.updateInfo({ headImgId: fileImg.id })
		},
		updateName() {
			if (this.nickName) {
				this.updateInfo({ nickname: this.nickName })
			} else {
				this.$tui.toast('昵称不能为空')
			}
		},
		nickNameBlur(e) {
			this.nickName = e.detail.value
		},
		async updateInfo(params) {
			const { code, data, msg } = await userServer.updateUserInfos({ ...params })
			if (code === 200) {
				uni.hideLoading()
				if (this.nickStep == 1) {
					this.nickStep = 2
				} else {
					this.$tui.toast('操作成功')
					this.$refs.avaterPopup.close()
				}
			} else {
				this.$tui.toast(msg)
				uni.hideLoading()
			}
		},
		clsoePopup() {
			this.$refs.avaterPopup.close()
		},
		// 设置nav到顶部的距离 (滚动条为0, 菜单顶部的数据加载完毕获取到的navTop数值是最精确的)
		setNavTop() {
			let view = uni.createSelectorQuery().select('#tabInList')
			view
				.boundingClientRect((data) => {
					console.log('tabInList基本信息 = ' + JSON.stringify(data))
					this.navTop = data.top - 66 // 到屏幕顶部的距离
				})
				.exec()
		},
		/**
		 * 获取协议
		 */
		getRulesApi() {
			dataServer.getIndexBanner({ category: '7' }).then((res) => {
				if (res.code === 200) {
					getApp().globalData.payMentAgreement = res.data.records[0].htmlUrl
				}
			})
		},
		// 根据图片获取主色调
		fetchImageColor(image) {
			let _that = this
			const length = _that.bannerList.length
			// if (_that.imageCount < length) {
			// 	const image = _that.bannerList[_that.imageCount]['displayImgUrl']
			uni.downloadFile({
				url: image,
				success: function (res) {
					if (res.statusCode === 200) {
						uni.getImageInfo({
							src: res.tempFilePath,
							success: (imgInfo) => {
								let { width, height } = imgInfo
								let scale = (0.6 * _that.winWidth) / Math.max(width, height)
								let canvasWidth = Math.floor(scale * width)
								let canvasHeight = Math.floor(scale * height)
								_that.canvasWidth = canvasWidth
								_that.canvasHeight = canvasHeight
								_that.colorAnalysis.getPalette(
									{
										width: canvasWidth,
										height: canvasHeight,
										imgPath: imgInfo.path,
										maxColors: 2
									},
									(colorArr) => {
										// console.log(colorArr)
										if (colorArr) {
											let color1 = 'rgb(' + colorArr[0][0] + ',' + colorArr[0][1] + ',' + colorArr[0][2] + ')'
											let color2 = 'rgb(' + colorArr[1][0] + ',' + colorArr[1][1] + ',' + colorArr[1][2] + ')'
											// let color3 = 'rgb(' + colorArr[2][0] + ',' + colorArr[2][1] + ',' + colorArr[2][2] + ')'
											// css 渐变色
											_that.headerBgStyle = `linear-gradient(180deg, ${color1} 5%, ${color2} 100%)`
											_that.headerBgStyle2 = `linear-gradient(180deg, ${color1} 5%, ${color2} 15%, #ffffff 100%)`
											// _that.imageCount++
											// _that.colorList.push({
											// 	headerBgStyle: `linear-gradient(180deg, ${color1} 5%, ${color2} 100%)`,
											// 	headerBgStyle2: `linear-gradient(180deg, ${color1} 5%, ${color2} 15%, #ffffff 100%)`
											// })
											// _that.fetchImageColor()
										} else {
											_that.headerBgStyle = `linear-gradient(180deg, #fec0bc 5%, #fee3e1 100%)`
											_that.headerBgStyle2 = `linear-gradient(180deg, #fec0bc 5%, #fee3e1 15%, #ffffff 100%)`
											// _that.colorList.push({
											// 	headerBgStyle: `linear-gradient(180deg, #fec0bc 5%, #fee3e1 100%)`,
											// 	headerBgStyle2: `linear-gradient(180deg, #fec0bc 5%, #fee3e1 15%, #ffffff 100%)`
											// })
										}
									}
								)
							},
							fail() {}
						})
					}
				},
				fail: function () {}
			})
			// }
		},
		getLocation() {
			mapCallCarServer.getUserLocation((flag) => {
				if (flag)
					mapCallCarServer.getLocation((res) => {
						this.$store.dispatch('SET_LOCATION', { latitude: res.latitude, longitude: res.longitude })
					})
			})
		},
		ensure() {
			if (!this.jumpToLogin()) return
			uni.navigateTo({
				url: '/subHome/earnBySharing/earnBySharing'
			})
		},
		confirmEvent() {
			this.$tui.toast('加入成功')
		},
		clickVisible(e) {
			this.visibles = e
			if (!e) {
				uni.showTabBar()
			}
		},
		changes(e) {
			this.visibles = e.show
		},
		getMinQuery(options) {
			let params = miniQueryOptions(options)
			if (params.from === '102') {
				// fenxiangfzhuan
				this.isOpen = true
				let isShow = uni.getStorageSync('earnBySharingPopup') || ''
				// console.log('isShow::::::', isShow)
				if (!isShow) {
					uni.hideTabBar()
					this.$refs.customeInvite.open()
				}
			} else if (params.from === '103') {
				// yuangongguanli
				this.storeName = params.storeName
				this.requestId = params.requestId
				uni.setStorageSync('employeePopup', 0)
				let isShow = uni.getStorageSync('employeePopup') || ''
				// console.log('isShow::::::', isShow)
				if (!isShow) {
					uni.hideTabBar()
					this.$refs.customeInviteEmployee.open()
				}
			} else {
				// 依据获取的参数跳转到指定页面
				globalJump(params)
			}
		},
		// 是否显示协议弹窗
		isShowProtocolPopup() {
			let isShow = uni.getStorageSync('agreeProtocolPopup') || ''
			if (!isShow) {
				this.$refs.agreeProtocolPopup.open()
				uni.hideTabBar()
			}
		},
		// 同意协议并关闭弹窗
		handleAgreePrivacyAuthorization() {
			uni.showTabBar()
			uni.setStorageSync('agreeProtocolPopup', 1)
			this.$refs.agreeProtocolPopup.close()
		},
		// 拒绝协议
		onClickDisAgreeProtocol() {
			this.$tui.toast('如您拒绝同意以下使用协议，请主动关闭退出小程序')
		},
		onClickProtocol() {
			const userAgreement = getApp().globalData.userAgreement
			uni.navigateTo({
				url: '/subHome/webview/webview?url=' + userAgreement
			})
		},
		onClickSystemProtocol() {
			uni.navigateTo({
				url: '/pages/login/systemProtocol'
			})
		},
		fetchIsDriver() {
			if (this.userType == 1 || this.userType == 2 || this.userType == 3 || this.userType == 4 || this.userType == 5) {
				return this.certStatus == 2 ? true : false
			}
			return false
		},
		/**
		 * 获取用户信息接口
		 */
		getUserInfoApi() {
			userServer.userInfo().then((res) => {
				if (res.code === 200) {
					getApp().globalData.userInfo = res.data
					this.userType = parseInt(getApp().globalData.userInfo.userType)
					this.certStatus = parseInt(getApp().globalData.userInfo.certStatus)
					this.$tui.setUserInfo(res.data)
					this.messages = parseInt(res.data.msgCount)
					if (!res.data.headImgUrl) {
						this.nickStep = 1
						this.$refs.avaterPopup.open()
					} else if (!res.data.nickname) {
						this.nickStep = 2
						this.$refs.avaterPopup.open()
					}
					// if (res.data.newsCount == 0 || !res.data.newsCount) {
					// 	uni.hideTabBarRedDot({
					// 		index: 2
					// 	})
					// } else {
					// 	uni.showTabBarRedDot({
					// 		index: 2
					// 	})
					// }
					this.requestTaxiInfo()
					//获取用户未读消息
					userServer.getUserMessageCount({}).then((res) => {
						if (res.code === 200) {
							this.messages = parseInt(res.data)
						}
					})
				} else {
					this.$tui.toast(res.msg)
				}
			})
		},
		// 点击通知消息
		onClickNewsItem(anew) {
			if (!this.jumpToLogin()) return
			uni.navigateTo({
				url: '/subHome/noticeDetail/noticeDetail?id=' + anew.id
			})
		},
		// 点击赚钱吧
		onClickMakeMoney(item = {}) {
			const { isMiniProgrom, MiniData, url } = item
			if (isMiniProgrom) {
				this.openMiniProgram(MiniData)
			} else if (url) {
				// console.log(url)
				if (item.needLogin) {
					if (!this.jumpToLogin()) return
					uni.navigateTo({
						url
					})
				} else {
					uni.navigateTo({
						url
					})
				}
			} else {
				this.$tui.toast('功能开发中...')
			}
		},
		// 点击banner
		onClickBannerItem(banner) {
			console.log('banner: ', banner)
			if (!this.jumpToLogin()) return
			if (banner.advertType == '1') {
				//广告类型,0链接到详情(点击进入详情),1视频播放,2链接到网址,3跳转小程序
				uni.navigateTo({
					url: '/subHome/videoPlayer/videoPlayer?videoUrl=' + banner.videoUrl
				})
			} else if (banner.advertType == '2') {
				uni.navigateTo({
					url: '/subHome/webview/webview?url=' + banner.linkAddress
				})
			} else if (banner.advertType == '0') {
				uni.navigateTo({
					url: '/subHome/webview/webview?url=' + banner.htmlUrl
				})
			}
		},
		/**
		 * 打开外部小程序
		 */
		openMiniProgram(e) {
			console.log('打开小程序: ', e)
			let appId = e.miniAppId
			let path = e.miniAppPath
			if (e.ext) {
				const ext = JSON.parse(e.ext)
				appId = ext.miniAppId
				path = ext.miniAppPath
			}
			let _that = this
			const accountInfo = uni.getAccountInfoSync()
			// console.log('accountInfo: ', accountInfo)
			// console.log('appId: ', appId)
			const currentAppid = accountInfo.miniProgram.appId
			if (appId == currentAppid) {
				this.openMiniUrl(path)
			} else {
				uni.navigateToMiniProgram({
					appId,
					path,
					success: function (res) {},
					fail: function (res) {
						_that.$tui.toast('打开失败')
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
		// 点击换座套按钮
		onClickChange() {
			if (!this.jumpToLogin()) return
			if (this.taxiInfo['operateStatus'] != 1) {
				this.$tui.toast('车辆暂未运营，请在个人中心设置车辆运营状态')
				return
			}
			let userType = parseInt(getApp().globalData.userInfo.userType)
			let certStatus = parseInt(getApp().globalData.userInfo.certStatus)

			if (this.fetchIsDriver()) {
				uni.navigateTo({
					url: '/subHome/siteList/siteList'
				})
			}
		},
		onClickSearchValue() {
			console.log('点击了搜索')
		},
		onClickScan() {
			console.log('点击了扫一扫')

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
				return
			}

			let _that = this
			// 调起条码扫描
			uni.scanCode({
				success: function (res) {
					console.log('条码类型：' + res.scanType)
					console.log('条码内容：' + res.result)
					if (!_that.$util.isEmpty(res.result)) {
						_that.getMinQuery(res.result)
						// _that.getMinQuery(
						// 	'https://51jifen.ruikedz.com#/?from=13&inlet=0&inUiniApp=1&qrCodeData=F81055E9FF3BFF6C671EFC12C31C5FB3841568C8A1326B0E8D8BB61E8A29BADC'
						// )
					}
				}
			})
		},
		// 九宫格点击
		onClickGrid(item) {
			// console.log(item)
			// console.log(this.firstCategoryList[this.currentTab])
			const categoryNo = this.firstCategoryList[this.currentTab].categoryNo
			const parentCategoryId = this.firstCategoryList[this.currentTab].id
			const subCategoryId = item.id
			if (categoryNo === '12') {
				// 出租车服务
				if (item.htmlUrl) {
					uni.navigateTo({
						url: `/subHome/categoryDetail/categoryDetail?url=${item.htmlUrl}`
					})
					return
				}
				let certStatus = parseInt(getApp().globalData.userInfo.certStatus)
				let reCertStatus = parseInt(getApp().globalData.userInfo.reCertStatus)
				// console.log('certStatus', certStatus)
				let action = ''
				let action1 = ''
				if (certStatus == 0) {
					action = '/subMy/identityComplate/chooseIdentityN/chooseIdentityN'
					action1 = action
				} else if (certStatus == 1) {
					action = '/subMy/identityComplate/identityComplate?review=1'
					action1 = action
				} else if (certStatus == 2) {
					action = '/subMy/identityComplate/identitySuccess/identitySuccess'
					action1 = '/subMy/bleachService/bleachService'
				} else if (certStatus == 3) {
					action = '/subMy/identityComplate/chooseIdentityN/chooseIdentityN'
					action1 = action
				}
				if (reCertStatus == 1) {
					action = '/subMy/identityComplate/identityComplate?review=1'
				}
				if (item.categoryNo === '1201') {
					// 换座套
					this.onClickChange()
				} else if (item.categoryNo === '1202') {
					// "座套缴费"
					if (!this.jumpToLogin()) return
					uni.navigateTo({
						url: action1
					})
				} else if (item.categoryNo === '1203') {
					// "座套更换记录"
					if (!this.jumpToLogin()) return
					uni.navigateTo({
						url: '/subMy/changeSeatMark/changeSeatMark'
					})
				} else if (item.categoryNo === '1204') {
					// "新车入网"
					if (!this.jumpToLogin()) return
					uni.navigateTo({
						url: '/subMy/newCarAccess/newCarAccessList'
					})
				} else if (item.categoryNo === '1205') {
					// "司机招聘"
					uni.navigateTo({
						url: '/subHome/recruitingNewList/recruitingNewList'
					})
				} else if (item.categoryNo === '1206') {
					// "出租车商城"
					uni.navigateTo({
						url: `/subHome/shopDetail/shopDetail?storeNo=211017104338`
					})
				} else if (item.categoryNo === '1207') {
					// "门贴定制"
					if (!this.jumpToLogin()) return
					uni.navigateTo({
						url: '/subMall/mallDetail/mallDetail?productNo=MTDZ01'
					})
				} else if (item.categoryNo === '1208') {
					// "司机认证"
					if (!this.jumpToLogin()) return
					uni.navigateTo({
						url: action
					})
				}
			} else {
				if (item.htmlUrl) {
					uni.navigateTo({
						url: `/subHome/categoryDetail/categoryDetail?url=${item.htmlUrl}`
					})
				} else if (item.pagePath) {
					if (item.pagePath.includes('shopSettled')) {
						const userInfo = uni.getStorageSync('userInfo')
						// console.log(userInfo)
						if (userInfo) {
							if (userInfo.storeCertStatus == 2) {
								uni.navigateTo({
									url: '/subMy/shopManage/shopManage'
								})
							} else {
								uni.navigateTo({
									url: item.pagePath
								})
							}
						} else {
							uni.navigateTo({
								url: item.pagePath
							})
						}
					}
				} else {
					uni.navigateTo({
						url: `/subHome/shopList/shopList?parentCategoryId=${parentCategoryId}&subCategoryId=${subCategoryId}`
					})
				}
			}
		},
		jump(type) {
			if (type === 'mall') {
				uni.switchTab({
					url: `/pages/${type}/${type}`
				})
			} else if (type === 'shopSettled') {
				const userInfo = uni.getStorageSync('userInfo')
				// console.log(userInfo)
				if (userInfo) {
					if (userInfo.storeCertStatus == 2) {
						uni.navigateTo({
							url: '/subMy/shopManage/shopManage'
						})
					} else {
						uni.navigateTo({
							url: `/subHome/${type}/${type}`
						})
					}
				} else {
					uni.navigateTo({
						url: `/subHome/${type}/${type}`
					})
				}
				// uni.navigateTo({
				// 	url: `/subHome/${type}/${type}`
				// })
			} else {
				uni.navigateTo({
					url: `/subHome/${type}/${type}`
				})
			}
		},
		leftClick() {
			console.log('点击了定位')
		},
		bannerSlideOn(e) {
			this.bannerIndex = e.detail.current
			let banner = this.bannerList[this.bannerIndex]
			// this.fetchImageColor(banner['displayImgUrl'])
			// console.log('colorList:::::', this.colorList)
			// this.headerBgStyle = this.colorList[this.bannerIndex].headerBgStyle
			// this.headerBgStyle2 = this.colorList[this.bannerIndex].headerBgStyle2
		},
		slideOn(e) {
			this.currentTab = e.detail.current
		},
		tabClick(index) {
			// console.log(index)
			this.currentTab = index
			// this.getShopCateChildApi(index)
			const children = this.firstCategoryList[index].children
			this.gridData = children
		},
		tabClick2(index) {
			// console.log(index)
			this.currentTab2 = index
			// this.$nextTick(() => {
			this.dataList = [] // 先置空列表,显示加载进度
			this.mescroll.resetUpScroll() // 再刷新列表数据
			if (this.isShowSticky)
				uni.pageScrollTo({
					scrollTop: this.navTop + 2
				})
			// })
		},
		itemTap(item) {
			// console.log(item)
			if (item.type === 'insert') {
				console.log('点击了分享赚')
				uni.navigateTo({
					url: item.pagePath
				})
			} else {
				uni.navigateTo({
					url: `/subHome/shopDetail/shopDetail?storeId=${item.storeId}&products=${encodeURIComponent(JSON.stringify(item))}`
				})
			}
		},
		requestTaxiInfo() {
			if (this.fetchIsDriver()) {
				//如果fromPage是21则说明是从菜单来的，主动跳转到站点列表去
				if (this.$tui.fromPage == '21') {
					setTimeout(() => {
						uni.navigateTo({
							url: '/subHome/siteList/siteList'
						})
					}, 1000)
				}
				userServer.getUserTaxiInfo().then((res) => {
					if (res.code == 200) {
						if (res.data) {
							this.taxiInfo = res.data
						}
					}
				})
			}
		},
		/**
		 * 获取用户积分数量Api
		 */
		requestUserPoints() {
			let _that = this
			userServer.getUserPoints().then((res) => {
				if (res.code === 200) {
					_that.integralNum = res.data
				}
			})
		},
		/**
		 * 获取通知消息
		 */
		getNoticeApi() {
			//获取通知消息
			dataServer.getIndexNotice({}).then((res) => {
				if (res.code === 200) {
					this.news = res.data.records
				}
			})
		},
		/**
		 * 获取banner
		 */
		getAdBannerApi() {
			dataServer.getIndexBanner({ category: '4' }).then((res) => {
				if (res.code === 200) {
					this.bannerList = res.data.records
					// this.fetchImageColor()
				}
			})
		},
		/**
		 * 获取两级分类列表
		 */
		async getShopCateTreeApi(categoryNo) {
			try {
				const { code, data, msg } = await shopServer.getShopCateTree({})
				if (code === 200) {
					this.firstCategoryList = data
					this.$store.dispatch('updateShopFirstCategoryList', JSON.parse(JSON.stringify(data)))
					const datas = JSON.parse(JSON.stringify(data))
					this.list2 = [
						{
							id: '',
							categoryName: '推荐'
							// disabled: true
						}
					]
					this.list2 = [...this.list2, ...datas]
					// console.log('this.list2', this.list2)
					data.forEach((item, index) => {
						item.children.forEach((_tt) => {
							_tt.showText = true
						})
						item.children.splice(4, 0, {
							categoryName: item.categoryName,
							categoryNo: item.categoryNo,
							children: [],
							displayImgUrl: item.displayImgUrl,
							htmlUrl: item.htmlUrl,
							id: item.id,
							parentId: item.parentId,
							sort: item.sort,
							showText: false
						})
						let children = item.children
						if (item.children.length > 7 && (item.categoryNo === '10' || item.categoryNo === '11')) {
							item.children = children.slice(0, 8)
						} else {
							item.children = children.slice(0, 9)
						}
						if (item.categoryNo === '10' || item.categoryNo === '11') {
							// 商超购物和美食餐饮
							item.children.push({
								categoryName: '商家入驻',
								displayImgUrl: 'https://oss.ruikedz.com/51life/static/images/home/zhu_ruzhu@2x.png',
								id: 10,
								parentId: item.id,
								sort: 10,
								showText: false,
								pagePath: '/subHome/shopSettled/shopSettled'
							})
						}
					})
					this.gridData = data[this.currentTab].children
				} else {
					console.log(msg)
				}
			} catch (error) {
				// this.$tui.toast(error)
				console.log(error)
			}
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		async upCallback(page) {
			//联网加载数据
			try {
				const params = {
					pageNum: page.num,
					pageSize: page.size,
					latitude: this.latitude,
					longitude: this.longitude,
					parentCategoryId: this.list2[this.currentTab2].id,
					recommendStatus: 1
				}
				setTimeout(async () => {
					const { code, data, msg } = await shopServer.getRecommendProductList({ ...params })
					if (code === 200) {
						// console.log(data)
						// 设置列表数据
						if (page.num == 1) {
							this.dataList = [] //如果是第一页需手动制空列表
						}
						this.dataList = this.dataList.concat(data.records) //追加新数据
						if (page.num == 1 && this.list2[this.currentTab2].categoryName === '推荐') {
							this.dataList.splice(1, 0, {
								id: '9999',
								displayImgUrl: 'https://oss.ruikedz.com/51life/static/images/home/ruzhu_banner@2x.png',
								type: 'insert',
								pagePath: '/subHome/earnBySharing/earnBySharing'
							})
						}
						this.$nextTick(() => {
							this.mescroll.endByPage(data.records.length, data.pages) //必传参数(当前页的数据个数, 总页数)
						})
					} else {
						console.log(msg)
					}
				}, 600)
			} catch (error) {
				// this.$tui.toast(error)
				console.log(error)
			}
		},
		// 商家列表点击
		onClickShopList(data, datas) {
			// console.log('商家列表：：：：：', data)
			// console.log('商家列表商品：：：：：', datas)
			if (datas) {
				uni.navigateTo({
					url: `/subHome/shopDetail/shopDetail?storeId=${data.id}&products=${encodeURIComponent(JSON.stringify(datas))}`
				})
			} else {
				uni.navigateTo({
					url: `/subHome/shopDetail/shopDetail?storeId=${data.id}`
				})
			}
		},
		async getShopStorePageListApi() {
			try {
				const params = {
					pageNum: 1,
					pageSize: 3,
					latitude: this.latitude,
					longitude: this.longitude,
					productPageNum: 1,
					productPageSize: 3,
					recommendStatus: 1 // 是否优选商家 0否1是，不传查所有
				}
				const { code, data, msg } = await shopServer.getShopStorePageList({ ...params })
				if (code === 200) {
					data.records.forEach((item) => {
						item.type = 'normal'
						item.hasWifi = item.storeWifiCount > 0
					})
					this.shopList = data.records //追加新数据
				} else {
					console.log(msg)
				}
			} catch (error) {
				console.log(error)
			}
		},
		requestData() {
			const getNoticeApi = this.getNoticeApi()
			// const getShopCateApi = this.getShopCateApi()
			const getAdBanner = this.getAdBannerApi()
			const getRules = this.getRulesApi()
			const getShopCateTreeApi = this.getShopCateTreeApi()
			const getShopStorePageListApi = this.getShopStorePageListApi()
			Promise.all([getNoticeApi, getAdBanner, getRules, getShopCateTreeApi, getShopStorePageListApi]).then((res) => {
				// console.log(res)
				setTimeout(() => {
					this.isRedirect = true
					// 设置nav到顶部的距离 (需根据自身的情况获取navTop的值, 这里放到列表数据渲染完毕之后)
					// 也可以放到onReady里面,或者菜单顶部的数据(轮播等)加载完毕之后..
					if (!this.navTop) this.setNavTop()
				}, 500)
			})
		}
	}
}
</script>
<style lang="scss">
.mescroll-totop {
	display: none;
}
.HomeIndex {
	background-color: #f2f2f2;
	overflow-x: hidden;
	.home-swiper {
		height: 200rpx;
		overflow: hidden;
		border-radius: 16rpx;
	}
	.tui-palette-canvas {
		z-index: -1;
		position: absolute;
		top: 0;
		left: -400px;
	}
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
		background: linear-gradient(180deg, #fec0bc 5%, #fee3e1 15%, #fff4ea 84%, #ffffff 100%);
		padding: 0 0 48rpx 0;
		margin: 0 0 32rpx 0;
		.search-con {
			margin: 10rpx 0 34rpx 0;
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
			// line-height: 88rpx;
			padding-left: 24rpx;
			font-size: 30rpx;
			font-weight: 500;
		}
		&_unicon {
			vertical-align: middle;
		}
		&_ad {
			margin: 0 0 24rpx 0;
			height: 200rpx;
			.img {
				width: 100%;
				height: 200rpx;
				border-radius: 16rpx;
				vertical-align: bottom;
			}
		}
		&_top {
			height: 120rpx;
			background-color: #fff;
			border-radius: 16rpx;
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
				margin: 0 22rpx 22rpx 0;
				width: 340rpx;
				height: 190rpx;
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
			border-bottom: 1rpx solid #f5f5f5;
		}
		&_panelmid {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			margin: 0 24rpx;
			height: auto !important;
			text-align: center;
			&_item {
				height: 212rpx;
				background: #ffffff;
				width: calc((100% - 100rpx) / 3);
				margin: 24rpx 24rpx 0 0;
				position: relative;
				// display: flex;
				// justify-content: center;
				.img {
					width: 100%;
					height: 212rpx;
				}
				.diff-img {
					width: 212rpx;
					height: 100%;
				}
				&:nth-child(3n) {
					margin-right: 0;
				}
				.text {
					position: absolute;
					bottom: 14rpx;
					width: 100%;
					left: 50%;
					transform: translateX(-50%);
					text-align: center;
					font-weight: 400;
					font-size: 32rpx;
					color: #333333;
				}
			}
		}
	}
	.bottom_box {
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
			border-bottom: 1rpx solid #f5f5f5;
			padding: 0 24rpx;
			&_left {
				.panel_img {
					width: 34rpx;
					height: 34rpx;
					vertical-align: middle;
					margin: -6rpx 18rpx 0 0;
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
			height: auto;
			// overflow-y: scroll;
			padding: 24rpx 24rpx 0;
		}
		.shop-scroll {
			padding-bottom: 24rpx;
		}
		&_panelmid2 {
			// margin: 20rpx 0;
			// height: calc(100vh);
			width: 100%;
			z-index: 999;
		}
	}
	.bottom_box2 {
		background: none;
		padding: 0;
		&_paneltop {
			padding: 0 24rpx;
		}
		&_panellist {
			padding: 0;
		}
		.content_mid {
			padding: 0 20rpx;
			margin-top: 20rpx;
		}
	}
}
.protocol-popup {
	z-index: 2500;
	.protocol-con {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		margin-top: 20rpx;
		padding-top: 30rpx;
		padding-left: 30rpx;
		font-size: 32rpx;
		color: #333;
		font-weight: 500;
		background: #fff;
		.header-title {
			font-size: 34rpx;
			font-weight: bolder;
		}
		.des-title {
			margin-top: 30rpx;
			font-size: 28rpx;
		}
		.des-content {
			margin-top: 30rpx;
			font-size: 28rpx;
			.dot {
				color: #ff5e52;
			}
		}
		.action-con {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			height: 140rpx;
			.agree {
				margin-right: 30rpx;
				background: #ff5e52;
				color: white;
				text-align: center;
				line-height: 70rpx;
				height: 70rpx;
				border-radius: 10rpx;
				font-size: 26rpx;
				padding: 0 20rpx;
				width: 50%;
			}
			.disagree {
				background: #f5f5f5;
				border-radius: 10rpx;
				font-size: 26rpx;
				color: #999;
				text-align: center;
				line-height: 70rpx;
				height: 70rpx;
				width: 30%;
			}
		}
	}
}
.avater-popup {
	z-index: 2006;
	.protocol-con {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		margin-top: 20rpx;
		padding: 30rpx;
		background: #fff;
		.header-title {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			width: 100%;
			.title {
				font-weight: 500;
				font-size: 28rpx;
				color: #333333;
				line-height: 28rpx;
			}
			.close {
				font-weight: 500;
				font-size: 30rpx;
				line-height: 30rpx;
				color: #999999;
			}
		}
		.header-desc {
			font-weight: bold;
			font-size: 36rpx;
			color: #333333;
			margin: 38rpx 0 50rpx 0;
		}
		.action-con {
			.agree {
				width: 100%;
				height: 100rpx;
				background: #f3483c;
				border-radius: 50rpx;
				font-weight: 800;
				font-size: 36rpx;
				color: #ffffff;
			}
		}
		.agree-btn {
			background: #fff;
			.img {
				width: 240rpx;
				height: 240rpx;
			}
		}
		.nick-box {
			position: relative;
			.nick-name {
				height: 100rpx;
				background: #f5f5f5;
				border-radius: 8rpx;
				padding-left: 24rpx;
				margin-bottom: 78rpx;
			}
			.nick-img {
				width: 30rpx;
				height: 34rpx;
				position: absolute;
				top: 34rpx;
				right: 24rpx;
			}
		}
	}
}
</style>
