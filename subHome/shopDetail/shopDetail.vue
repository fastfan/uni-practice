<template>
	<page-meta :page-style="'overflow:' + (visible ? 'hidden' : 'visible')"></page-meta>
	<view :class="['subhome-shop-detail', currentTab === 0 ? 'bottom-area' : '']" style="position: relative">
		<!-- 顶部导航栏 -->
		<view class="nav_bar" :style="{ height: navBarHeight2 + 'px', backgroundColor: backgroundColor }">
			<view class="state_height" :style="{ height: statusBarHeight + 'px' }"></view>
			<view class="nav_bar_inner" :style="{ height: navBarHeight + 'px', lineHeight: navBarHeight + 'px' }">
				<image src="https://oss.ruikedz.com/51life/static/images/shop/icon_back@2x.png" class="img" @click="onBack"></image>
				<text class="text text-one-line" v-show="opacity >= 1">{{ shopDetail.storeName }}</text>
			</view>
		</view>
		<!-- 顶部区域背景 -->
		<view
			class="top_area area_height"
			data-type="1"
			:style="{ backgroundImage: shopDetail.displayImgUrl ? `url(${shopDetail.displayImgUrl})` : '' }"
		></view>
		<view class="mid_area area_height" data-type="1">
			<detail-head-vue :detail="shopDetail" @openPopups="openPopups" @shareUrl="getUrl"></detail-head-vue>
		</view>
		<view class="tabs-content" :style="{ paddingTop: midAreaHeight - 40 + 'px' }">
			<!-- tab切换 -->
			<view :class="['tabs', 'area_height', opacity >= 1 ? 'active' : '']" data-type="2" :style="{ top: topHeight }">
				<my-tabs
					:tabs="list"
					field="name"
					v-model="currentTab"
					@change="tabClick"
					height="100rpx"
					lineColor="#F3483C"
					activeColor="#F3483C"
					activeFontSize="32rpx"
					fontSize="32rpx"
					paddingItem="40rpx"
					lineScale="0.3"
				></my-tabs>
				<view class="desk-no" v-if="isScanCode">
					<text class="desk-no-text">桌号：</text>
					<text class="desk-no-texts">001</text>
				</view>
			</view>
			<view v-if="currentTab == 0 && storeType === 'normal'">
				<!-- 菜品区域 -->
				<view class="cate_content" v-if="sideBarList.length > 0">
					<scroll-view
						scroll-y="true"
						:scroll-top="leftScrollTop"
						class="left"
						:style="{ height: scrollHeight + 'px', top: stickyTop + 'px' }"
					>
						<view class="menu_item">
							<my-aside-bar ref="myAsideBar" :currentIndex="currentIndex" :list="sideBarList" @change="onChangeCate"></my-aside-bar>
						</view>
					</scroll-view>
					<view class="right">
						<view class="item">
							<!-- <view v-if="goods.length > 0">
								<my-shop-list-item
									v-if="categoryId === sideBarList[currentIndex].id"
									:list="goods"
									class="differ-product"
									:storeId="storeId"
									@add="addToShopCar"
									@reduce="reduceToShopCar"
									@change="change"
									@openPopup="openPopup"
								></my-shop-list-item>
							</view> -->
							<swiper :style="{ height: 'calc(100vh - 420rpx)' }" :current="currentIndex" @change="swiperChange">
								<swiper-item v-for="(tab, i) in sideBarList" :key="i">
									<mescroll-item
										:ref="'mescrollItem' + i"
										:i="i"
										:index="currentIndex"
										:list="sideBarList"
										:selectedGoods="goods"
										:storeId="storeId"
										:productId="productId"
										:height="'100vh'"
										@change="change"
									></mescroll-item>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
				<view class="cate_content cate_content2" v-else>
					<mescroll-empty :option="{ tip: '暂未上架商品' }" />
				</view>
			</view>
			<view v-if="currentTab == 0 && storeType !== 'normal'">
				<!-- 菜品区域 -->
				<view class="cate_content">
					<view class="right">
						<view class="item">
							<swiper :style="{ height: 'calc(100vh - 420rpx)' }" :current="currentIndex" @change="swiperChange">
								<swiper-item>
									<mescroll-item
										:ref="'mescrollItem' + 0"
										:i="0"
										:index="currentIndex"
										:list="sideBarList"
										:storeId="storeId"
										:selectedGoods="goods"
										:productId="productId"
										:height="'100vh'"
										@change="change"
									></mescroll-item>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
			<!-- 评论 -->
			<view class="" v-if="currentTab == 1">
				<detail-comment-vue :storeId="storeId"></detail-comment-vue>
			</view>
			<!-- 商家信息 -->
			<view class="" v-if="currentTab == 2">
				<detail-mechant-vue :detail="shopDetail"></detail-mechant-vue>
			</view>
		</view>

		<!-- 底部区域 -->
		<my-shop-car
			v-show="currentTab == 0"
			ref="myShopCar"
			@change="change"
			@goToOrder="goToOrder"
			:openingStatus="shopDetail.openingStatus"
		></my-shop-car>
		<uni-popup ref="popup" background-color="#fff" class="diff-popup" @change="changess" z-index="1000" type="center">
			<view class="popup-content2">
				<custome-specification-select :selectItem="selectItem" ref="customeSpecificationSelect"></custome-specification-select>
				<image class="popup-img2" src="https://oss.ruikedz.com/51life/static/images/shop/icon_buanbi@2x.png" @click="close"></image>
			</view>
		</uni-popup>
		<uni-popup ref="popup2" background-color="#fff" @change="changes" class="diff-popup" z-index="1000" type="center">
			<view class="popup-content3">
				<view class="popup-content-top">
					<view class="box">
						<image class="popup-img3" src="https://oss.ruikedz.com/51life/static/images/shop/img_hongbao@2x.png"></image>
						<image class="popup-img4" src="https://oss.ruikedz.com/51life/static/images/shop/img_wenzi@2x.png"></image>
						<view class="image-text" :style="'width:' + winWidth + 'rpx;' + 'height:' + winWidth + 'rpx;'">
							<image class="img" :src="scanImage" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<image class="popup-img2" src="https://oss.ruikedz.com/51life/static/images/shop/icon_buanbi@2x.png" @click="close2"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import DetailHeadVue from './detailHead.vue'
import DetailMechantVue from './detailMechant.vue'
import DetailCommentVue from './detailComment.vue'
import MescrollItem from './mescroll-more-item.vue'
import { ShopServer } from '@/viewModel/shop/shop'
import { MallServer } from '@/viewModel/mall/mall'
import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue'
const shopServer = new ShopServer()
const mallServer = new MallServer()
export default {
	components: { DetailHeadVue, DetailMechantVue, DetailCommentVue, MescrollItem, MescrollEmpty },
	data() {
		return {
			shareUrl: '',
			scanImage: '',
			isScanCode: false,
			selectItem: {},
			visible: false,
			goods: [], // 指定的商品
			categoryId: '', // 指定的商品分类id
			storeType: 'normal',
			storeId: '',
			productId: '',
			shopCarList: [],
			products: {},
			opacity: '',
			currentTab: 0,
			shopCarCount: 0,
			shopDetail: {},
			winWidth: getApp().globalData.winWidth * 2 * 0.65,
			windowHeight: getApp().globalData.winHeight, //窗口高度
			scrollHeight: getApp().globalData.winHeight, //滚动高度
			statusBarHeight: getApp().globalData.statusBarHeight, //顶部状态栏高度
			navBarHeight2: getApp().globalData.navBarHeight + getApp().globalData.statusBarHeight, //顶部导航高度
			navBarHeight: getApp().globalData.navBarHeight, //顶部导航高度
			backgroundColor: 'rgba(255,255,255,0)',
			midAreaHeight: 0,
			midAreaTop: 0,
			topHeight: 0, //tab距离顶部高度
			topHeight2: 0,
			allAreaHeight: 0, //顶部的总区域高度
			topList: [], //
			currentIndex: 0,
			leftScrollTop: 0,
			rightItemHeight: 0,
			stickyTop: 0, //吸顶的距离
			productList: [],
			sideBarList: [],
			list: [
				{
					name: '商品'
				},
				{
					name: '评价'
				},
				{
					name: '商家'
				}
			],
			currentTab: 0,
			isClick: false
		}
	},
	onPageScroll(e) {
		let opacity = (e.scrollTop / 100).toFixed(2)
		this.opacity = opacity
		this.backgroundColor = 'rgba(255,255,255,' + (opacity >= 1 ? 1 : opacity) + ')'
		uni.setNavigationBarColor({
			frontColor: opacity >= 1 ? '#000000' : '#ffffff',
			backgroundColor: opacity >= 1 ? '#ffffff' : '#000000'
		})
		const midAreaTop = this.midAreaTop // 距离顶部距离
		const midAreaHeight = this.midAreaHeight // 自身高度
		const midAreaHeightMarginBottom = 24 // 下外边距
		if (opacity >= 1) {
			this.topHeight = this.navBarHeight2 + 'px'
		} else {
			this.topHeight = uni.rpx2px(midAreaTop + midAreaHeight + midAreaHeightMarginBottom) + 'px'
		}
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 判断分享是否来自页面内分享按钮
			console.log('分享按钮:::::', res)
			const { title, path, imageUrl } = res.target.dataset.share
			return {
				title,
				path,
				imageUrl
			}
		}
		return {
			title: `${this.shopDetail.storeName}`,
			path: `/pages/index/index?d=${this.shareUrl}`,
			imageUrl: `${this.shopDetail.displayImgUrl}`
		}
	},
	onLoad(option) {
		console.log('option:::::', option)
		this.storeId = option.storeId
		if (!this.$util.isEmpty(option.products)) {
			this.products = JSON.parse(decodeURIComponent(option.products))
			console.log(this.products)
			this.productId = this.products.id
			this.categoryId = this.products.categoryId
			this.goods.push({ count: 0, shopCarId: '', background: '#fffde7', ...this.products })
		}
		if (option.storeId) {
			this.getDetail({ id: option.storeId })
		} else if (option.storeNo) {
			this.getDetail({ storeNo: option.storeNo })
		}
		this.$nextTick(() => {
			const midAreaTop = this.midAreaTop // 距离顶部距离
			const midAreaHeight = this.midAreaHeight // 自身高度
			const midAreaHeightMarginBottom = 24 // 下外边距
			this.topHeight = uni.rpx2px(midAreaTop + midAreaHeight + midAreaHeightMarginBottom) + 'px'
			this.topHeight2 = uni.rpx2px(midAreaTop + midAreaHeight + midAreaHeightMarginBottom) + 'px'
			const query = uni.createSelectorQuery().in(this)
			//自定义顶部导航的时候 计算吸顶的距离
			query
				.select('.tabs')
				.boundingClientRect((data) => {
					if (data) {
						//吸顶距离 = 顶部标题栏高度与状态栏高度之和 + 需要吸顶的元素本身的高度
						this.stickyTop = this.navBarHeight2 + data.height
					}
				})
				.exec()
			if (this.storeType === 'normal') {
				query
					.selectAll('.area_height')
					.boundingClientRect((data) => {
						if (data) {
							this.allAreaHeight = 0 //需要减去的区域高度
							let addHeight = 0 //不需要减去的总高度
							for (var i = 0; i < data.length; i++) {
								if (data[i].dataset.type == '1') {
									// type = 1 是需要减去的区域  type = 2 是不需要减去的区域
									this.allAreaHeight += data[i].height //计算顶部总区域高度
								} else {
									addHeight += data[i].height
								}
							}
							//左侧菜单可滚动的高度 = 屏幕窗口总高度 - 需要减去的区域高度 + 不需要减去的区域高度 + 18;
							this.scrollHeight = this.windowHeight - this.navBarHeight2 - 88
						}
					})
					.exec()
				// setTimeout(() => {
				// 	this.getTop()
				// }, 800)
			}
		})
	},
	watch: {
		shopCarList: {
			handler: function (val) {
				// console.log('val:::::::::', val)
				// console.log('this.sideBarList::::::', this.sideBarList)
				const reduceRes = val.reduce((result, cur, index) => {
					const { categoryId, count, buyQuantity, ...res } = cur
					const someIndex = result.findIndex((item) => {
						return item.categoryId === cur.categoryId
					})
					someIndex === -1 && result.push({ categoryId, count, buyQuantity, ...res })
					someIndex !== -1 && (result[someIndex].buyQuantity += buyQuantity)
					return result
				}, [])
				// console.log('reduceRes:::::::::', reduceRes)
				if (reduceRes.length > 0) {
					reduceRes.forEach((_tt) => {
						this.sideBarList.forEach((_mm) => {
							if (_tt.categoryId === _mm.id) {
								_mm.count = _tt.buyQuantity
							}
						})
					})
				} else {
					this.sideBarList.forEach((_mm) => {
						_mm.count = 0
					})
				}
				console.log('this.sideBarList::::::', this.sideBarList)
			},
			deep: true
		}
	},
	onShow() {
		if (this.storeId) {
			this.$nextTick(() => {
				this.getStoreShopCarListApi()
			})
		}
	},
	mounted() {
		this.$root.$on('clearShopCar', () => {
			console.log('this.shopCarList:::', this.shopCarList)
			const idList = this.shopCarList.map((_tt) => {
				return _tt.id
			})
			let _that = this
			_that.$tui.modal(
				'提示',
				'确认是否清空购物车？',
				true,
				async (confirm) => {
					if (confirm) {
						try {
							const { msg } = await mallServer.shopCarDelete({ idList })
							this.$tui.toast(msg)
							this.shopCarList = []
							// this.goods = []
							this.$store.dispatch('updateShopCarList', this.shopCarList)
							this.getStoreShopCarListApi()
						} catch (error) {
							this.$tui.toast(msg)
						}
					}
				},
				'',
				'确定'
			)
		})
		this.$root.$on('deleteShopCar', async (item) => {
			// console.log('deleteShopCar:::', item)
			try {
				const { msg, code } = await mallServer.shopCarDelete({ idList: [item.id] })
				this.$tui.toast(code === 200 ? '删除成功' : msg)
				this.getStoreShopCarListApi()
			} catch (error) {
				this.$tui.toast(msg)
			}
		})
		this.$root.$on('addItem', (data) => {
			this.addToShopCar(data)
		})
	},
	methods: {
		getUrl(data) {
			this.shareUrl = data
		},
		openPopups(data) {
			this.scanImage = data
			this.$refs.popup2.open()
		},
		close2() {
			this.$refs.popup2.close()
		},
		close() {
			this.$refs.popup.close()
		},
		tabClick(index) {
			// console.log(index)
			this.currentTab = index
			if (index === 0) {
				this.currentIndex = 0
			}
		},
		/**
		 * 返回上一级
		 */
		onBack() {
			let pages = getCurrentPages()
			if (this.$util.isEmpty(pages) || pages.length == 1) {
				uni.switchTab({
					url: '/pages/index/index'
				})
			} else {
				uni.navigateBack()
			}
		},
		/**
		 * 获取右边内容距离顶部的距离
		 */
		getTop() {
			const query2 = uni.createSelectorQuery().in(this.$refs.myAsideBar)
			query2
				.select('.menu_name')
				.boundingClientRect()
				.exec((data) => {
					// console.log(data)
					if (data && data[0]) {
						this.rightItemHeight = data[0].height //获取左侧的第一个菜单的高度
					}
				})
		},
		/**
		 * @param {Object} item
		 * @param {Object} index
		 * 点击商品分类
		 */
		onChangeCate(data) {
			const { item, index } = data
			this.currentIndex = index
			// this.leftScrollTop = this.rightItemHeight * index
		},
		/**
		 * @param {Object} data
		 * 点击切换tab
		 */
		onChangeTab(data) {
			this.currentTab = data.index
		},
		// 轮播菜单
		swiperChange(e) {
			this.currentIndex = e.detail.current
		},
		changes(e) {
			this.visible = e.show
		},
		changess(e) {
			this.visible = e.show
			if (!e.show) {
				this.$refs.customeSpecificationSelect.selectNumber = 1
			}
		},
		change(e) {
			this.visible = e.show
			if (!e.show) {
			}
		},
		goToOrder() {
			let shopCar_ids = []
			const shorCarList = this.shopCarList
			for (let i = 0; i < shorCarList.length; i++) {
				let innerItem = shorCarList[i]
				if (!shorCarList[i].isOverInventory) {
					shopCar_ids.push(innerItem.id)
				}
			}
			if (shopCar_ids.length > 0) {
				uni.navigateTo({
					url: '/subMall/payOrder/payOrder?carids=' + shopCar_ids.join(',')
				})
			} else {
				this.$tui.toast('购物车中有商品库存不足，请您删减后再下单！')
			}
		},
		/**
		 * @param {String} id,storeNo
		 * 获取商家详情
		 */
		async getDetail(params) {
			try {
				const { code, data, msg } = await shopServer.getShopDetailById({ ...params })
				if (code === 200) {
					// console.log('data::::::', data)
					this.shopDetail = data
					this.storeId = data.id
					this.getProductCategoryListApi(data.id)
					this.getStoreShopCarListApi()
					setTimeout(() => {
						uni
							.createSelectorQuery()
							.select('.mid_area')
							.boundingClientRect((data) => {
								this.midAreaHeight = data.height
								this.midAreaTop = data.top
							})
							.exec()
					})
				} else {
					this.$tui.toast(msg)
				}
			} catch (error) {
				this.$tui.toast(error)
			}
		},
		/**
		 * @param {String} id
		 * 获取商家分类列表
		 */
		async getProductCategoryListApi(id) {
			try {
				const { code, data, msg } = await shopServer.getProductCategoryList({ storeId: id })
				if (code === 200) {
					console.log('购物车fenleidata::::::', data)
					if (data.length > 1) {
						this.storeType = 'normal'
					} else {
						this.storeType = 'single'
					}
					this.$store.dispatch('updatestoreType', this.storeType)
					this.sideBarList = data.map((item) => {
						return {
							count: 0,
							...item
						}
					})
					if (this.categoryId) {
						const index = this.sideBarList.findIndex((item) => item.id === this.categoryId)
						// console.log(index)
						this.currentIndex = index === -1 ? 0 : index
					}
				} else {
					this.$tui.toast(msg)
				}
			} catch (error) {
				this.$tui.toast(error)
			}
		},
		/**
		 * @param {String} storeId
		 * 获取商家购物车列表
		 */
		async getStoreShopCarListApi() {
			try {
				const { code, data, msg } = await mallServer.getStoreShopCarList({ storeId: this.storeId })
				if (code === 200) {
					this.shopCarList = data.map((_tt) => {
						return {
							count: Number(_tt.buyQuantity),
							price: Number(_tt.currentPrice),
							shopCarId: _tt.id,
							isOverInventory:
								_tt.specificationTag == '0' && Number(_tt.buyQuantity) <= Number(_tt.inventory)
									? false
									: _tt.specificationTag == '1' && Number(_tt.buyQuantity) <= Number(_tt.specificationVo.inventory)
									? false
									: true, // 是否超出库存
							..._tt
						}
					})
					// if (this.goods.length > 0) {
					// 	const reduceRes = this.shopCarList.reduce((result, cur, index) => {
					// 		const { productId, count, ...res } = cur
					// 		const someIndex = result.findIndex((item) => {
					// 			return item.productId === cur.productId
					// 		})
					// 		someIndex === -1 &&
					// 			result.push({
					// 				productId,
					// 				count,
					// 				...res
					// 			})
					// 		someIndex !== -1 && (result[someIndex].count += count)
					// 		return result
					// 	}, [])
					// 	console.log(reduceRes)
					// 	if (reduceRes.length > 0) {
					// 		reduceRes.forEach((_mm) => {
					// 			if (this.goods[0].id === _mm.productId) {
					// 				this.goods[0].count = _mm.count // 遍历购物车列表给商品数量赋值
					// 				this.goods[0].shopCarId = _mm.id // 遍历购物车列表给商品购物车id赋值
					// 			}
					// 		})
					// 	} else {
					// 		this.goods[0].count = 0
					// 		this.goods[0].shopCarId = ''
					// 	}
					// }
					this.$store.dispatch('updateShopCarList', this.shopCarList)
				} else {
					this.$tui.toast(msg)
				}
			} catch (error) {
				this.$tui.toast(error)
			}
		},
		/**
		 * @param {String}
		 * 获取待支付信息
		 */
		async getShopCarPayInfoApi() {
			try {
				const { code, data, msg } = await mallServer.getShopCarPayInfo({})
				if (code === 200) {
					console.log('paydata::::::', data)
				} else {
					this.$tui.toast(msg)
				}
			} catch (error) {
				this.$tui.toast(error)
			}
		},
		// 购物车增加
		async addToShopCar(item) {
			// console.log('购物车增加:::::::',item)
			try {
				if (item.count >= Number(item.inventory)) {
					this.$tui.toast('当前所选商品已达最大库存量，不能再多了~')
					return
				} else {
					let params = {}
					if (item.shopCarId) {
						// 购物车+1
						params = {
							id: item.shopCarId
						}
						const { code, msg } = await mallServer.shopCarAdd({ ...params })
						// console.log('this.$parent::::', this.$parent)
						if (code === 200) {
							item.count++
							this.$set(item, 'count', item.count)
							this.$set(item, 'shopCarId', item.shopCarId)
							this.getStoreShopCarListApi()
						} else {
							this.$tui.toast(msg)
						}
					} else {
						// 加入购物车
						if (item.specificationTag === '1') {
							// 多规格商品
							let selectspecificationId = ''
							if (!this.$util.isEmpty(item.selectspecification)) {
								selectspecificationId = item.selectspecification.id
							}
							params = {
								productId: item.id,
								buyQuantity: item.selectNumber,
								specificationId: selectspecificationId
							}
						} else {
							params = {
								productId: item.id
							}
						}
						const { code, msg } = await mallServer.addShopCar({ ...params })
						// console.log('this.$parent::::', this.$parent)
						if (code === 200) {
							item.count++
							this.$set(item, 'count', item.count)
							this.$set(item, 'shopCarId', item.shopCarId)
							this.getStoreShopCarListApi()
						} else {
							this.$tui.toast(msg)
						}
					}
				}
			} catch (error) {
				//TODO handle the exception
				this.$tui.toast(error)
			}
		},
		// 购物车减少
		async reduceToShopCar(item) {
			// 购物车-1
			let params = {
				id: item.shopCarId
			}
			const { code, msg } = await mallServer.shopCarDec({ ...params })
			if (code === 200) {
				item.count--
				this.$set(item, 'count', item.count)
				// console.log(item)
				this.$set(item, 'shopCarId', item.shopCarId)
				if (item.count === 0) {
					this.$set(item, 'shopCarId', '')
				}
				this.getStoreShopCarListApi()
			} else {
				this.$tui.toast(msg)
			}
			try {
			} catch (error) {
				//TODO handle the exception
				this.$tui.toast(error)
			}
		},
		// 去抢购
		rushToPurchase(item) {
			const data = {
				id: item.id,
				buyQuantity: 1
			}
			mallServer.productToPay(data).then((res) => {
				if (res.code === 200) {
					uni.navigateTo({
						url: '/subMall/payOrder/payOrder?payInfo=' + encodeURIComponent(JSON.stringify(res.data))
					})
				} else {
					this.$tui.toast(res.msg)
				}
			})
		},
		openPopup(item) {
			this.selectItem = item
			// console.log('this.selectItem::::::::', this.selectItem)
			this.$refs.popup.open()
		}
	}
}
</script>
<style>
page {
	height: auto;
}
</style>
<style lang="scss" scoped>
view {
	box-sizing: border-box;
}

.state_height {
	// height: var(--status-bar-height);
}

.subhome-shop-detail {
	height: 100%;
	::v-deep .differ-product .product_item {
		background: #fffde7;
	}
	::v-deep .popup-content2 {
		text-align: center;
	}
	::v-deep .popup-img2 {
		width: 52rpx;
		height: 52rpx;
	}
	::v-deep .mescroll-totop {
		display: none !important;
	}
}
.bottom-area {
	padding-bottom: calc(constant(safe-area-inset-bottom) + 64rpx);
	padding-bottom: calc(env(safe-area-inset-bottom) + 64rpx);
}
.nav_bar {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 99;
	background: rgba(0, 0, 0, 0);
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.nav_bar_inner {
		display: flex;
		padding: 0 20rpx;
		align-items: center;
		// justify-content: space-between;
		.img {
			width: 44rpx;
			height: 44rpx;
			vertical-align: sub;
		}
		.text {
			display: inline-block;
			width: 68%;
			font-size: 36rpx;
			padding-left: 10rpx;
			line-height: 36rpx;
		}
	}
}

.top_area {
	height: 312rpx;
	background-color: #fff;
	background-image: url('https://vcg01.cfp.cn/creative/vcg/800/new/VCG211360187468.jpg');
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
.mid_area {
	margin: 0 20rpx;
	position: absolute;
	width: 95%;
	top: 214rpx;
	z-index: 9;
}
.advert_area {
	height: 200rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	.img_box {
		width: 94%;
		.img {
			width: 100%;
			height: 160rpx;
		}
	}
}
.tabs-content {
	// position: absolute;
	width: 100%;
	padding: 352rpx 0 0 0;
	position: relative;
}
.tabs {
	height: 100rpx;
	background: #fff;
	box-shadow: 0 3px 10px -4px rgba(0, 0, 0, 0.2);
	.desk-no {
		width: 168rpx;
		height: 60rpx;
		border-radius: 36rpx;
		border: 2rpx solid #ff2b2b;
		position: absolute;
		right: 20rpx;
		top: 348rpx;
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;
		.desk-no-text {
			font-weight: 400;
			font-size: 26rpx;
			color: #333333;
		}
		.desk-no-texts {
			font-weight: 400;
			font-size: 28rpx;
			color: #ff0000;
		}
	}
}
.active {
	position: sticky;
	top: 0;
	z-index: 99;
}

.swiper_wrap {
}
.cate_content2 {
	height: 300rpx;
	align-items: center;
	justify-content: center;
}
.cate_content {
	/* 	position: sticky;
		top: 100rpx; */
	display: flex;
	flex-direction: row;
	margin-top: 14rpx;
	.left {
		position: sticky;
		top: 100rpx;
		width: 180rpx;
		background: #f2f2f2;
		// border: 1px solid red;
		.menu_item {
		}
	}

	.right {
		flex: 1;
		min-height: 100rpx;
		// background: #f5f5f5;
		padding: 0 20rpx;
		.item {
			border-bottom: 1px solid #eee;
			// background: #fff;
			.title {
				position: sticky;
				top: 100rpx;
				height: 60rpx;
				line-height: 60rpx;
				background: #fff;
				padding-left: 20rpx;
			}
		}
	}
}
.popup-content3 {
	flex-direction: column;
	text-align: center;
	.popup-content-top {
		width: 660rpx;
		height: 770rpx;
		background: linear-gradient(180deg, #ffdfdf 0%, #ffffff 100%);
		border-radius: 30rpx;
		margin-bottom: 34rpx;
		text-align: center;
		.box {
			position: relative;
			top: -114rpx;
		}
		.image-text {
			margin: 0 auto;
			.img {
				width: 100%;
				height: 100%;
			}
		}
		.popup-img3 {
			width: 428rpx;
			height: 212rpx;
		}
		.popup-img4 {
			width: 464rpx;
			height: 94rpx;
			margin: 14rpx 0 12rpx 0;
		}
	}
	.popup-img2 {
		width: 52rpx;
		height: 52rpx;
	}
}
</style>
