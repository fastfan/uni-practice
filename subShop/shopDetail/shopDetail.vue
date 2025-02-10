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
		<view class="mid_area area_height" data-type="1"></view>
		<view class="tabs-content" :style="{ paddingTop: '312rpx' }">
			<!-- tab切换 -->
			<view :class="['tabs', 'area_height', oops >= 1 ? 'active' : '']" data-type="2" :style="{ top: topHeight }"></view>
			<template v-if="tabIndex == 0">
				<!-- 广告位置 -->
				<view class="advert_area area_height" data-type="1">
					<view class="img_box">
						<image class="img" src="https://vcg02.cfp.cn/creative/vcg/800/new/VCG41N2186093764.jpg"></image>
					</view>
				</view>

				<!-- 菜品区域 -->
				<view class="cate_content">
					<scroll-view
						scroll-y="true"
						:scroll-top="leftScrollTop"
						class="left"
						:style="{ height: scrollHeight + 'px', top: stickyTop + 'px' }"
					>
						<view class="">
							<view
								class="menu_name"
								:id="'menu_name' + index"
								:class="{ menu_name_active: currentIndex == index }"
								v-for="(item, index) in productList"
								@click="onChangeCate(item, index)"
								:key="index"
							>
								{{ item.name }}
							</view>
						</view>
					</scroll-view>
					<view class="right">
						<view class="item" v-for="(item, index) in productList" :key="index">
							<view class="title sticky_title" :style="{ top: stickyTop + 'px' }">
								{{ item.name }}
							</view>
							<view class="content">
								<view class="product_item" v-for="(cell, cIndex) in item.list" :key="cIndex">
									<image :src="cell.img" mode="aspectFill" class="product_img"></image>
									<view class="prodcut_info">
										<view class="name">
											{{ cell.name }}
										</view>
										<view class="price">￥{{ cell.price }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>

			<!-- 评论 -->
			<view class="" v-if="tabIndex == 1"></view>
			<!-- 商家信息 -->
			<view class="" v-if="tabIndex == 2"></view>
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
export default {
	data() {
		return {
			oops: '',
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
			productList: [
				{
					name: '美味中餐',
					id: '1',
					icon: '',
					list: [
						{
							name: '七味盐黄金豆腐',
							img: 'https://qcloud.dpfile.com/pc/wU3rvxK40IRQSH-ME1GftzbPAzUEH2TKcu_Umu2cXIBUnUZhRs1BQ-3fNG1nS2hQ5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 188
						},
						{
							name: '龙井凤尾虾仁',
							img: 'https://qcloud.dpfile.com/pc/oUbzBcAwYHbcXkxpAKlEs-C8fJQSNvsbJU8yORW5Ev8LwkSAC8kXSFYMi29l17Qs5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 58
						},
						{
							name: '绿茶饼',
							img: 'https://qcloud.dpfile.com/pc/BDNSIx7XBHIm2AZ-68Yq8CsI0vGyA_Bjnzl6bPXAAqciRqcwCz8FTdU3fU3gYaOR5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 18
						}
					]
				},
				{
					name: '地道西餐',
					id: '2',
					icon: '',
					list: [
						{
							name: '绿茶烤鸡',
							img: 'https://qcloud.dpfile.com/pc/qnYmJT9l5QbBNCNfezzLojGCAHfoE6xmprOQlvoyvpiwK8Lj0colHBWeX6r06i-Y5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 36
						},
						{
							name: '石锅鸡汤',
							img: 'https://qcloud.dpfile.com/pc/eK-lcbiSwCMfuurDzas6sDXooZ-820qyij7E-_2Guvl3SQvBEuZcM3cJ5XDTpMvP5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 58
						},
						{
							name: '绿茶葱香',
							img: 'https://qcloud.dpfile.com/pc/8To1nn0bLS0Z8UXhWs7d_6_4hgdHYJDB9PY0bTHn51l0M4tvZgWeKDKSXjsROSf95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 48
						},
						{
							name: '面包诱惑',
							img: 'https://qcloud.dpfile.com/pc/S1Yt03ZHevIEbvb3fhAy67V74qWD5ZJURHvRhFUOlP2YaCqE8KEE8D3jXlKeA1a95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 32
						},
						{
							name: '石锅鸡汤',
							img: 'https://qcloud.dpfile.com/pc/eK-lcbiSwCMfuurDzas6sDXooZ-820qyij7E-_2Guvl3SQvBEuZcM3cJ5XDTpMvP5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 58
						},
						{
							name: '绿茶葱香',
							img: 'https://qcloud.dpfile.com/pc/8To1nn0bLS0Z8UXhWs7d_6_4hgdHYJDB9PY0bTHn51l0M4tvZgWeKDKSXjsROSf95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 48
						},
						{
							name: '面包诱惑',
							img: 'https://qcloud.dpfile.com/pc/S1Yt03ZHevIEbvb3fhAy67V74qWD5ZJURHvRhFUOlP2YaCqE8KEE8D3jXlKeA1a95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 32
						}
					]
				},
				{
					name: '甜品点心',
					id: '1',
					icon: '',
					list: [
						{
							name: '七味盐黄金豆腐',
							img: 'https://qcloud.dpfile.com/pc/wU3rvxK40IRQSH-ME1GftzbPAzUEH2TKcu_Umu2cXIBUnUZhRs1BQ-3fNG1nS2hQ5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 188
						},
						{
							name: '龙井凤尾虾仁',
							img: 'https://qcloud.dpfile.com/pc/oUbzBcAwYHbcXkxpAKlEs-C8fJQSNvsbJU8yORW5Ev8LwkSAC8kXSFYMi29l17Qs5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 58
						},
						{
							name: '绿茶饼',
							img: 'https://qcloud.dpfile.com/pc/BDNSIx7XBHIm2AZ-68Yq8CsI0vGyA_Bjnzl6bPXAAqciRqcwCz8FTdU3fU3gYaOR5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 18
						}
					]
				},
				{
					name: '早点早餐',
					id: '2',
					icon: '',
					list: [
						{
							name: '绿茶烤鸡',
							img: 'https://qcloud.dpfile.com/pc/qnYmJT9l5QbBNCNfezzLojGCAHfoE6xmprOQlvoyvpiwK8Lj0colHBWeX6r06i-Y5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 36
						},
						{
							name: '石锅鸡汤',
							img: 'https://qcloud.dpfile.com/pc/eK-lcbiSwCMfuurDzas6sDXooZ-820qyij7E-_2Guvl3SQvBEuZcM3cJ5XDTpMvP5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 58
						},
						{
							name: '绿茶葱香',
							img: 'https://qcloud.dpfile.com/pc/8To1nn0bLS0Z8UXhWs7d_6_4hgdHYJDB9PY0bTHn51l0M4tvZgWeKDKSXjsROSf95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 48
						},
						{
							name: '面包诱惑',
							img: 'https://qcloud.dpfile.com/pc/S1Yt03ZHevIEbvb3fhAy67V74qWD5ZJURHvRhFUOlP2YaCqE8KEE8D3jXlKeA1a95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 32
						},
						{
							name: '石锅鸡汤',
							img: 'https://qcloud.dpfile.com/pc/eK-lcbiSwCMfuurDzas6sDXooZ-820qyij7E-_2Guvl3SQvBEuZcM3cJ5XDTpMvP5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 58
						},
						{
							name: '绿茶葱香',
							img: 'https://qcloud.dpfile.com/pc/8To1nn0bLS0Z8UXhWs7d_6_4hgdHYJDB9PY0bTHn51l0M4tvZgWeKDKSXjsROSf95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 48
						},
						{
							name: '面包诱惑',
							img: 'https://qcloud.dpfile.com/pc/S1Yt03ZHevIEbvb3fhAy67V74qWD5ZJURHvRhFUOlP2YaCqE8KEE8D3jXlKeA1a95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 32
						}
					]
				},
				{
					name: '包子油条·',
					id: '1',
					icon: '',
					list: [
						{
							name: '七味盐黄金豆腐',
							img: 'https://qcloud.dpfile.com/pc/wU3rvxK40IRQSH-ME1GftzbPAzUEH2TKcu_Umu2cXIBUnUZhRs1BQ-3fNG1nS2hQ5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 188
						},
						{
							name: '龙井凤尾虾仁',
							img: 'https://qcloud.dpfile.com/pc/oUbzBcAwYHbcXkxpAKlEs-C8fJQSNvsbJU8yORW5Ev8LwkSAC8kXSFYMi29l17Qs5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 58
						},
						{
							name: '绿茶饼',
							img: 'https://qcloud.dpfile.com/pc/BDNSIx7XBHIm2AZ-68Yq8CsI0vGyA_Bjnzl6bPXAAqciRqcwCz8FTdU3fU3gYaOR5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 18
						}
					]
				},
				{
					name: '豆浆饮品',
					id: '2',
					icon: '',
					list: [
						{
							name: '绿茶烤鸡',
							img: 'https://qcloud.dpfile.com/pc/qnYmJT9l5QbBNCNfezzLojGCAHfoE6xmprOQlvoyvpiwK8Lj0colHBWeX6r06i-Y5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 36
						},
						{
							name: '石锅鸡汤',
							img: 'https://qcloud.dpfile.com/pc/eK-lcbiSwCMfuurDzas6sDXooZ-820qyij7E-_2Guvl3SQvBEuZcM3cJ5XDTpMvP5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 58
						},
						{
							name: '绿茶葱香',
							img: 'https://qcloud.dpfile.com/pc/8To1nn0bLS0Z8UXhWs7d_6_4hgdHYJDB9PY0bTHn51l0M4tvZgWeKDKSXjsROSf95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 48
						},
						{
							name: '面包诱惑',
							img: 'https://qcloud.dpfile.com/pc/S1Yt03ZHevIEbvb3fhAy67V74qWD5ZJURHvRhFUOlP2YaCqE8KEE8D3jXlKeA1a95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 32
						},
						{
							name: '石锅鸡汤',
							img: 'https://qcloud.dpfile.com/pc/eK-lcbiSwCMfuurDzas6sDXooZ-820qyij7E-_2Guvl3SQvBEuZcM3cJ5XDTpMvP5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 58
						},
						{
							name: '绿茶葱香',
							img: 'https://qcloud.dpfile.com/pc/8To1nn0bLS0Z8UXhWs7d_6_4hgdHYJDB9PY0bTHn51l0M4tvZgWeKDKSXjsROSf95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 48
						},
						{
							name: '面包诱惑',
							img: 'https://qcloud.dpfile.com/pc/S1Yt03ZHevIEbvb3fhAy67V74qWD5ZJURHvRhFUOlP2YaCqE8KEE8D3jXlKeA1a95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 32
						}
					]
				},
				{
					name: '汉堡薯条',
					id: '1',
					icon: '',
					list: [
						{
							name: '七味盐黄金豆腐',
							img: 'https://qcloud.dpfile.com/pc/wU3rvxK40IRQSH-ME1GftzbPAzUEH2TKcu_Umu2cXIBUnUZhRs1BQ-3fNG1nS2hQ5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 188
						},
						{
							name: '龙井凤尾虾仁',
							img: 'https://qcloud.dpfile.com/pc/oUbzBcAwYHbcXkxpAKlEs-C8fJQSNvsbJU8yORW5Ev8LwkSAC8kXSFYMi29l17Qs5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 58
						},
						{
							name: '绿茶饼',
							img: 'https://qcloud.dpfile.com/pc/BDNSIx7XBHIm2AZ-68Yq8CsI0vGyA_Bjnzl6bPXAAqciRqcwCz8FTdU3fU3gYaOR5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 18
						}
					]
				},
				{
					name: '生煎铁板',
					id: '2',
					icon: '',
					list: [
						{
							name: '绿茶烤鸡',
							img: 'https://qcloud.dpfile.com/pc/qnYmJT9l5QbBNCNfezzLojGCAHfoE6xmprOQlvoyvpiwK8Lj0colHBWeX6r06i-Y5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 36
						},
						{
							name: '石锅鸡汤',
							img: 'https://qcloud.dpfile.com/pc/eK-lcbiSwCMfuurDzas6sDXooZ-820qyij7E-_2Guvl3SQvBEuZcM3cJ5XDTpMvP5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 58
						},
						{
							name: '绿茶葱香',
							img: 'https://qcloud.dpfile.com/pc/8To1nn0bLS0Z8UXhWs7d_6_4hgdHYJDB9PY0bTHn51l0M4tvZgWeKDKSXjsROSf95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 48
						},
						{
							name: '面包诱惑',
							img: 'https://qcloud.dpfile.com/pc/S1Yt03ZHevIEbvb3fhAy67V74qWD5ZJURHvRhFUOlP2YaCqE8KEE8D3jXlKeA1a95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 32
						},
						{
							name: '石锅鸡汤',
							img: 'https://qcloud.dpfile.com/pc/eK-lcbiSwCMfuurDzas6sDXooZ-820qyij7E-_2Guvl3SQvBEuZcM3cJ5XDTpMvP5g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 58
						},
						{
							name: '绿茶葱香',
							img: 'https://qcloud.dpfile.com/pc/8To1nn0bLS0Z8UXhWs7d_6_4hgdHYJDB9PY0bTHn51l0M4tvZgWeKDKSXjsROSf95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 48
						},
						{
							name: '面包诱惑',
							img: 'https://qcloud.dpfile.com/pc/S1Yt03ZHevIEbvb3fhAy67V74qWD5ZJURHvRhFUOlP2YaCqE8KEE8D3jXlKeA1a95g_3Oo7Z9EXqcoVvW9arsw.jpg',
							price: 32
						}
					]
				}
			],
			list4: [
				{
					name: '点餐'
				},
				{
					name: '评论'
				},
				{
					name: '商家'
				}
			],
			tabIndex: 0,
			isClick: false
		}
	},
	onPageScroll(e) {
		let opacity = (e.scrollTop / 100).toFixed(2)
		console.log(opacity)
		this.oops = opacity
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
			this.topHeight2 = uni.rpx2px(midAreaTop + midAreaHeight + midAreaHeightMarginBottom) + 'px'
		} else {
			this.topHeight = uni.rpx2px(midAreaTop + midAreaHeight + midAreaHeightMarginBottom) + 'px'
			this.topHeight2 = uni.rpx2px(midAreaTop + midAreaHeight + midAreaHeightMarginBottom) + 'px'
		}
		if (!this.isClick) {
			let scrollTop = parseInt(e.scrollTop)
			for (var i = 0; i < this.topList.length; i++) {
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
						this.scrollHeight = this.windowHeight - this.navBarHeight - 40
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
			const query = uni.createSelectorQuery().in(this)
			query
				.select('.menu_name')
				.boundingClientRect()
				.selectAll('.item')
				.boundingClientRect()
				.exec((data) => {
					if (data) {
						this.rightItemHeight = data[0].height //获取左侧的第一个菜单的高度
						data[1].map((item, index) => {
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
		onChangeCate(item, index) {
			if (this.currentIndex == index) {
				return
			}
			this.isClick = true
			this.currentIndex = index
			this.leftScrollTop = this.rightItemHeight * index
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
			this.tabIndex = data.index
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
	height: 378rpx;
	background: #ffffff;
	box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(255, 116, 110, 0.1);
	border-radius: 24rpx;
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

	.left {
		position: sticky;
		top: 100rpx;
		width: 200rpx;
		background: #fff;
		// border: 1px solid red;

		.menu_name {
			/* 	position: sticky;
				top: 0; */
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #8d8d8d;
		}

		.menu_name_active {
			background: #f5f5f5;
			color: #333;
		}
	}

	.right {
		flex: 1;
		min-height: 100rpx;
		background: #f5f5f5;
		padding: 0 20rpx;

		.item {
			border-bottom: 1px solid #eee;
			background: #fff;

			.title {
				position: sticky;
				top: 100rpx;
				height: 60rpx;
				line-height: 60rpx;
				background: #fff;
				padding-left: 20rpx;
			}

			.product_item {
				height: 120rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;
				padding: 0 20rpx;

				.product_img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 6rpx;
				}

				.prodcut_info {
					flex: 1;
					padding-left: 20rpx;
				}
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
