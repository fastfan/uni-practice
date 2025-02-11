<template>
	<view class="subhome-shop-detail">
		<!-- 顶部导航栏 -->
		<view class="nav_bar" :style="{ height: navBarHeight + 'px', backgroundColor: backgroundColor }">
			<view class="state_height"></view>
			<view class="nav_bar_inner" :style="{ height: navBarHeight / 2 + 'px' }">
				<image src="/static/images/shop/icon_back@2x.png" class="img" @click="onBack"></image>
			</view>
		</view>
		<!-- 顶部区域背景 -->
		<view class="top_area area_height" data-type="1"></view>
		<view class="mid_area area_height" data-type="1">
			<detail-head-vue></detail-head-vue>
		</view>
		<view class="tabs-content">
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
			</view>
			<template v-if="currentTab == 0">
				<!-- 广告位置 -->
				<!-- <view class="advert_area area_height" data-type="1">
					<view class="img_box">
						<image class="img" src="https://vcg02.cfp.cn/creative/vcg/800/new/VCG41N2186093764.jpg"></image>
					</view>
				</view> -->

				<!-- 菜品区域 -->
				<view class="cate_content">
					<scroll-view
						scroll-y="true"
						:scroll-top="leftScrollTop"
						class="left"
						:style="{ height: scrollHeight + 'px', top: stickyTop + 'px' }"
					>
						<view class="menu_item">
							<my-aside-bar ref="myAsideBar" :currentIndex="currentIndex" :list="productList" @change="onChangeCate"></my-aside-bar>
						</view>
					</scroll-view>
					<view class="right">
						<view class="item" v-for="(item, index) in productList" :key="index">
							<view class="title sticky_title" :style="{ top: stickyTop + 'px' }">
								{{ item.name }}
							</view>
							<my-shop-list-item :list="item.list" :type="'product'"></my-shop-list-item>
						</view>
					</view>
				</view>
			</template>

			<!-- 评论 -->
			<view class="" v-if="currentTab == 1"></view>
			<!-- 商家信息 -->
			<view class="" v-if="currentTab == 2"></view>
		</view>

		<!-- 底部区域 -->
		<view class="foot">
			<view class="inner">
				<view class="icon_box">
					<u-icon name="shopping-cart" color="#e93323" size="32"></u-icon>
				</view>
				<view class="">
					<u-button
						text="去结算"
						type="primary"
						iconColor="#e93323"
						shape="circle"
						:customStyle="{
							width: '120px',
							backgroundColor: '#e93323',
							borderColor: '#e93323'
						}"
					></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import DetailHeadVue from './detailHead.vue'
import { productList } from '../../api/mock/data'
export default {
	components: { DetailHeadVue },
	data() {
		return {
			opacity: '',
			currentTab: 0,
			windowHeight: getApp().globalData.winHeight, //窗口高度
			scrollHeight: getApp().globalData.winHeight, //滚动高度
			statusBarHeight: getApp().globalData.statusBarHeight, //顶部状态栏高度
			navBarHeight: getApp().globalData.navBarHeight + getApp().globalData.statusBarHeight, //顶部导航高度
			backgroundColor: 'rgba(255,255,255,0)',
			topHeight: 0, //tab距离顶部高度
			topHeight2: 0,
			allAreaHeight: 0, //顶部的总区域高度
			topList: [], //
			currentIndex: 0,
			leftScrollTop: 0,
			rightItemHeight: 0,
			stickyTop: 0, //吸顶的距离
			productList,
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
		console.log(e.scrollTop)
		this.opacity = opacity
		this.backgroundColor = 'rgba(255,255,255,' + (opacity >= 1 ? 1 : opacity) + ')'
		uni.setNavigationBarColor({
			frontColor: opacity >= 1 ? '#000000' : '#ffffff',
			backgroundColor: opacity >= 1 ? '#ffffff' : '#000000'
		})
		const midAreaTop = 212 // 距离顶部距离
		const midAreaHeight = 378 // 自身高度
		const midAreaHeightMarginBottom = 24 // 下外边距
		if (opacity >= 1) {
			this.topHeight = this.navBarHeight + 'px'
			// this.topHeight2 = uni.rpx2px(midAreaTop + midAreaHeight + midAreaHeightMarginBottom) + 'px'
		} else {
			this.topHeight = uni.rpx2px(midAreaTop + midAreaHeight + midAreaHeightMarginBottom) + 'px'
			// this.topHeight2 = uni.rpx2px(midAreaTop + midAreaHeight + midAreaHeightMarginBottom) + 'px'
		}
		if (!this.isClick) {
			let scrollTop = parseInt(e.scrollTop)
			for (let i = 0; i < this.topList.length; i++) {
				if (scrollTop >= this.topList[i].top && scrollTop <= this.topList[i].bottom) {
					this.currentIndex = i
					this.leftScrollTop = this.rightItemHeight * i
					break
				}
			}
		}
	},
	onLoad() {
		this.$nextTick(() => {
			const midAreaTop = 212 // 距离顶部距离
			const midAreaHeight = 378 // 自身高度
			const midAreaHeightMarginBottom = 24 // 下外边距
			this.topHeight = uni.rpx2px(midAreaTop + midAreaHeight + midAreaHeightMarginBottom) + 'px'
			this.topHeight2 = uni.rpx2px(midAreaTop + midAreaHeight + midAreaHeightMarginBottom) + 'px'
			const query = uni.createSelectorQuery().in(this)
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
						this.scrollHeight = this.windowHeight - this.navBarHeight - 88
					}
				})
				.exec()

			//自定义顶部导航的时候 计算吸顶的距离
			query
				.select('.tabs')
				.boundingClientRect((data) => {
					if (data) {
						//吸顶距离 = 顶部标题栏高度与状态栏高度之和 + 需要吸顶的元素本身的高度
						this.stickyTop = this.navBarHeight + data.height
					}
				})
				.exec()

			this.getTop()
		})
	},
	methods: {
		tabClick(index) {
			console.log(index)
			this.currentTab = index
		},
		/**
		 * 返回上一级
		 */
		onBack() {
			uni.navigateBack()
		},
		/**
		 * 获取右边内容距离顶部的距离
		 */
		getTop() {
			// console.log(this.$refs.myAsideBar)
			const query = uni.createSelectorQuery().in(this)
			const query2 = uni.createSelectorQuery().in(this.$refs.myAsideBar)
			query2
				.select('.menu_name')
				.boundingClientRect()
				.exec((data) => {
					console.log(data)
					if (data) {
						this.rightItemHeight = data[0].height //获取左侧的第一个菜单的高度
					}
				})
			query
				.selectAll('.item')
				.boundingClientRect()
				.exec((data) => {
					if (data) {
						console.log(data)
						data[0].map((item, index) => {
							this.topList.push({
								top: parseInt(item.top - this.stickyTop),
								bottom: parseInt(item.bottom - this.stickyTop)
							})
						})
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
			console.log(index)
			console.log(this.rightItemHeight)
			console.log(this.topList)
			this.isClick = true
			this.leftScrollTop = this.rightItemHeight * index
			console.log(this.leftScrollTop)
			uni.pageScrollTo({
				scrollTop: this.topList[index].top
			})
			setTimeout(() => {
				this.isClick = false
			}, 600)
		},
		/**
		 * 显示购物车弹窗
		 */
		onShowCart() {
			this.$refs.slide_cart.open()
		},
		/**
		 * @param {Object} data
		 * 点击切换tab
		 */
		onChangeTab(data) {
			this.currentTab = data.index
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
	height: var(--status-bar-height);
}

.subhome-shop-detail {
	padding-bottom: calc(constant(safe-area-inset-bottom) + 100rpx);
	padding-bottom: calc(env(safe-area-inset-bottom) + 100rpx);
	height: 100%;
}

.nav_bar {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	background: rgba(0, 0, 0, 0);
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.nav_bar_inner {
		display: flex;
		padding: 0 20rpx;
		align-items: center;
		justify-content: space-between;
		.img {
			width: 44rpx;
			height: 44rpx;
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
	padding: 328rpx 0 0 0;
}
.tabs {
	height: 100rpx;
	background: #fff;
	box-shadow: 0 3px 10px -4px rgba(0, 0, 0, 0.2);
}
.active {
	position: sticky;
	top: 0;
	z-index: 999;
}

.swiper_wrap {
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

.foot {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1000;
	min-height: 100rpx;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	background: #fff;
	box-shadow: 0 -4px 10px -3px rgba(0, 0, 0, 0.2);

	.inner {
		height: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
	}

	.icon_box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background: #f5f5f5;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
}

.cart_list {
	padding-bottom: calc(constant(safe-area-inset-bottom) + 100rpx);
	padding-bottom: calc(env(safe-area-inset-bottom) + 100rpx);

	.cart_item {
		height: 120rpx;
		border-bottom: 1px solid #eee;
	}
}
</style>
