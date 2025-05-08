<template>
	<page-meta :page-style="'overflow:' + (visible ? 'hidden' : 'visible')"></page-meta>
	<view class="subhome-search-history" @click.capture="external">
		<view>
			<mescroll-uni
				height="100%"
				:fixed="false"
				@init="mescrollInit"
				@down="downCallback"
				@up="upCallback"
				:up="upOption"
				:down="downOption"
			>
				<view class="sticy-search">
					<uni-nav-bar
						class="nav"
						left-icon="left"
						@clickLeft="leftClick"
						:statusBar="true"
						:fixed="true"
						:border="false"
						leftWidth="40rpx"
						:rightWidth="menuButtonWidth"
						title="搜索"
					></uni-nav-bar>
					<view class="search-con">
						<view class="search">
							<text class="search-text" @click.stop="clickSelect">{{ selectVal }}</text>
							<tui-icon name="turningdown" size="26" style="margin-top: 8rpx" @click.stop="clickSelect" />
							<text class="text2">|</text>
							<input
								confirm-type="search"
								class="search-input"
								placeholder="请输入搜索内容"
								v-model="searchKeyValue"
								:focus="focusState"
								@focus="onFocus"
								@blur="onBlur"
								@confirm="onClickSearchValue"
							/>
							<uni-icons type="clear" v-if="searchKeyValue && focusState" size="20" @click.native="clearValue"></uni-icons>
							<view class="search-btn" @click="onClickSearchValue">搜索</view>
						</view>
					</view>
					<view class="bubble" v-show="show" :style="{ top: topHeight }">
						<view
							class="item"
							:class="item.key === selectKey ? 'active' : ''"
							v-for="(item, index) in list"
							:key="item.key"
							@click="clickItem(item)"
						>
							{{ item.name }}
						</view>
					</view>
					<view class="block" v-if="!isClickSearch">
						<view class="top">
							<view class="text">历史搜索</view>
							<uni-icons type="trash" size="20" @click="onClickDelete"></uni-icons>
						</view>
						<view class="bottom" v-if="tagList.length > 0">
							<view class="tag" v-for="(item, index) in tagList" :key="index">
								<uni-tag
									:text="item.searchKeyValue"
									:circle="true"
									@click="clickTag(item)"
									custom-style="background-color:#f8f8f8;color:#666666;padding:10rpx 34rpx;font-size:28rpx;"
								/>
							</view>
						</view>
					</view>
					<view v-if="selectKey === 'shops'">
						<my-dropdown :menuList="menuList" active-color="#FA520D" @change="change" @cancel="cancel">
							<my-dropdown-item v-model="countyId" dropdownKey="district" :options="columnOptions" type="radioList"></my-dropdown-item>
							<my-dropdown-item v-model="distance" dropdownKey="distance" :options="distanceOptions" type="radioBlock"></my-dropdown-item>
						</my-dropdown>
					</view>
				</view>
				<view v-if="selectKey === 'shops'" class="content_mid">
					<my-shop-list :dataList="dataList" :productPageSize="5" @onClickEvent="onClickShopList"></my-shop-list>
				</view>
				<view class="content_mid" v-if="selectKey === 'goods'">
					<my-waterfall-flow :wfList="dataList" @itemTap="itemTap"></my-waterfall-flow>
				</view>
			</mescroll-uni>
		</view>
		<global-location-modal ref="globalLOcationModal"></global-location-modal>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue'
import { ShopServer } from '@/viewModel/shop/shop.js'
import { mapCallCarServer } from 'viewModel/call/callcar.js'
import { DataServer } from '@/viewModel/data.js'
const shopServer = new ShopServer()
const dataServer = new DataServer()
export default {
	mixins: [MescrollMixin],
	data() {
		return {
			show: false,
			focusState: true,
			isClickSearch: false,
			searchKeyValue: '',
			latitude: '',
			longitude: '',
			menuButtonWidth: '',
			cityId: '',
			countyId: '',
			dataList: [],
			statusBarHeight: getApp().globalData.statusBarHeight,
			navBarHeight: getApp().globalData.navBarHeight,
			menuList: [
				{
					title: '区域',
					dropdownKey: 'district'
				},
				{
					title: '距离',
					dropdownKey: 'distance'
				}
			],
			columnOptions: [
				{
					key: 'firstKey',
					children: []
				}
			],
			distance: '',
			distanceOptions: [
				{
					title: '',
					key: 'firstKey',
					default: '',
					children: [
						{
							label: '1km内',
							value: 1000,
							level: '1'
						},
						{
							label: '2km内',
							value: 2000,
							level: '1'
						},
						{
							label: '3km内',
							value: 3000,
							level: '1'
						},
						{
							label: '5km内',
							value: 5000,
							level: '1'
						},
						{
							label: '7km内',
							value: 7000,
							level: '1'
						}
					]
				}
			],
			topHeight: 0,
			// 上拉加载的配置(可选, 绝大部分情况无需配置)
			downOption: {
				auto: false,
				isLock: true
			},
			upOption: {
				auto: false,
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 11, // 配置列表的总数量要大于等于3条才显示'-- END --'的提示
				textNoMore: '已经到底了~',
				empty: {
					tip: '暂无相关数据'
				}
			},
			selectVal: '商品',
			selectKey: 'goods',
			list: [
				{
					name: '商品',
					key: 'goods'
				},
				{
					name: '店铺',
					key: 'shops'
				}
			],
			tagList: []
		}
	},
	computed: {
		visible() {
			return this.$store.state.modal.visible
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
				}
			},
			immediate: true,
			deep: true
		}
	},
	methods: {
		leftClick() {
			uni.navigateBack()
		},
		external() {
			this.show = false
		},
		onFocus() {
			this.focusState = true
			if (!this.searchKeyValue) {
				this.isClickSearch = false
				this.mescroll.removeEmpty()
				this.mescroll.endUpScroll(false)
			}
		},
		onBlur() {
			this.focusState = false
		},
		clearValue() {
			this.searchKeyValue = ''
			this.onFocus()
		},
		onClickSearchValue() {
			console.log('点击了搜索')
			this.isClickSearch = true
			this.dataList = [] // 先置空列表,显示加载进度
			this.mescroll.resetUpScroll()
			if (!this.$util.isEmpty(this.searchKeyValue)) {
				this.tagList.push({ searchKeyValue: this.searchKeyValue, selectKey: this.selectKey, selectVal: this.selectVal })
				console.log(this.tagList)
				this.tagList = this.tagList.filter((item, index, self) => index === self.findIndex((t) => t.searchKeyValue === item.searchKeyValue))
				// this.tagList = Array.from(new Set(this.tagList.map((a) => JSON.stringify(a)))).map((s) => JSON.parse(s))
				uni.setStorageSync('searchHistory', this.tagList)
			}
		},
		onClickDelete() {
			uni.removeStorageSync('searchHistory')
			this.tagList = []
		},
		clickSelect(e) {
			this.show = !this.show
			this.onFocus()
		},
		clickItem(item) {
			this.selectKey = item.key
			this.selectVal = item.name
			this.show = false
			this.dataList = [] // 先置空列表,显示加载进度
			// this.mescroll.resetUpScroll()
		},
		clickTag(item) {
			console.log(item)
			this.selectKey = item.selectKey
			this.selectVal = item.selectVal
			this.searchKeyValue = item.searchKeyValue
			this.isClickSearch = true
			this.dataList = [] // 先置空列表,显示加载进度
			this.mescroll.resetUpScroll()
		},
		getMenuButtonWidth() {
			// 判断是否在微信小程序环境中
			if (
				uni.getSystemInfoSync().platform === 'devtools' ||
				uni.getSystemInfoSync().platform === 'ios' ||
				uni.getSystemInfoSync().platform === 'android'
			) {
				try {
					const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
					if (menuButtonInfo) {
						this.menuButtonWidth = menuButtonInfo.width
					}
				} catch (error) {
					console.error('获取微信小程序胶囊按钮信息失败:', error)
				}
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
		itemTap(item) {
			console.log(item)
			uni.navigateTo({
				url: `/subHome/shopDetail/shopDetail?storeId=${item.storeId}&products=${encodeURIComponent(JSON.stringify(item))}`
			})
		},
		cancel(e) {
			if (e.dropdownKey === 'distance') {
				this.menuList[1].title = '距离'
				this.distance = ''
			}
			this.isClickSearch = true
			this.dataList = [] // 先置空列表,显示加载进度
			this.mescroll.resetUpScroll()
		},
		change(e) {
			// console.log('change：：：：', e)
			this.isClickSearch = true
			this.dataList = [] // 先置空列表,显示加载进度
			this.mescroll.resetUpScroll()
			// console.log('this.parentCategoryId：：：：', this.parentCategoryId)
			// console.log('this.subCategoryId：：：：', this.subCategoryId)
			// console.log('this.distance：：：：', this.distance)
		},
		async getCityByLngLatList() {
			const { data, code, msg } = await dataServer.getCityByLngLat({
				longitude: this.longitude,
				latitude: this.latitude
			})
			if (code === 200) {
				data.children.forEach((_tt) => {
					_tt.label = _tt.name
					_tt.value = _tt.id
				})
				this.menuList[0].title = data.name
				this.cityId = data.id
				this.columnOptions[0].children = data.children
			} else {
				this.$tui.toast(msg)
			}
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		async upCallback(page) {
			//联网加载数据
			if (this.selectKey === 'goods') {
				console.log('this.datalist::::', this.dataList)
				try {
					const params = {
						pageNum: page.num,
						pageSize: page.size,
						latitude: this.latitude,
						longitude: this.longitude,
						productName: this.searchKeyValue
					}
					setTimeout(async () => {
						const { code, data, msg } = await shopServer.getRecommendProductList({
							...params
						})
						if (code === 200) {
							// console.log(data)
							// 设置列表数据
							if (page.num == 1) {
								this.dataList = [] //如果是第一页需手动制空列表
							}
							this.dataList = this.dataList.concat(data.records) //追加新数据
							this.$nextTick(() => {
								this.mescroll.endByPage(data.records.length, data.pages) //必传参数(当前页的数据个数, 总页数)
							})
						} else {
							console.log(msg)
							this.$tui.toast(msg)
							this.mescroll.endErr()
						}
					}, 500)
				} catch (error) {
					// this.$tui.toast(error)
					console.log(error)
				}
			} else if (this.selectKey === 'shops') {
				try {
					const params = {
						pageNum: page.num,
						pageSize: page.size,
						storeName: this.searchKeyValue,
						latitude: this.latitude,
						longitude: this.longitude,
						cityId: this.cityId,
						countyId: this.countyId,
						distance: this.distance,
						productPageNum: 1,
						productPageSize: 3
					}
					setTimeout(async () => {
						const { code, data, msg } = await shopServer.getShopStorePageList({
							...params
						})
						if (code === 200) {
							// 设置列表数据
							if (page.num == 1) {
								this.dataList = [] //如果是第一页需手动制空列表
							}
							data.records.forEach((item) => {
								item.type = 'normal'
								item.hasWifi = item.storeWifiCount > 0
							})
							this.dataList = this.dataList.concat(data.records) //追加新数据
							this.$nextTick(() => {
								this.mescroll.endByPage(data.records.length, data.pages) //必传参数(当前页的数据个数, 总页数)
							})
						} else {
							console.log(msg)
							this.$tui.toast(msg)
						}
					}, 500)
				} catch (error) {
					console.log(error)
				}
			}
		}
	},
	onLoad() {
		this.getMenuButtonWidth()
		this.getCityByLngLatList()
		console.log(getApp())
		const { statusBarHeight, navBarHeight } = getApp().globalData
		this.topHeight = statusBarHeight + navBarHeight + 58 + 'px'
	},
	onShow() {
		const tagList = uni.getStorageSync('searchHistory')
		// console.log(tagList)
		if (tagList) this.tagList = tagList
	}
}
</script>

<style lang="scss">
.subhome-search-history {
	height: 100vh;
	// overflow: hidden;

	.uni-navbar__header-container {
		padding: 0 !important;
	}

	.uni-nav-bar-text {
		font-weight: 500 !important;
		font-size: 36rpx !important;
	}

	.uniui-left {
		font-size: 46rpx !important;
	}

	.nav {
		color: #333333;
	}
	.content_mid {
		padding: 0 20rpx;
		margin-top: 20rpx;
	}
	/*
	sticky生效条件：
	1、父元素不能overflow:hidden或者overflow:auto属性。(mescroll-body设置:sticky="true"即可, mescroll-uni本身没有设置overflow)
	2、必须指定top、bottom、left、right4个值之一，否则只会处于相对定位
	3、父元素的高度不能低于sticky元素的高度
	4、sticky元素仅在其父元素内生效,所以父元素必须是 mescroll
	*/
	.sticy-search {
		z-index: 990;
		position: sticky;
		top: 0;
		padding-bottom: 1px;
		background-color: #fff;
	}

	.search-con {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin: 34rpx 24rpx;

		.search {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			background: #f8f8f8;
			width: 100%;
			border-radius: 35rpx;
			height: 72rpx;
			line-height: 72rpx;

			.img {
				width: 44rpx;
				height: 46rpx;
				margin-left: 30rpx;
			}

			.search-text {
				display: inline-block;
				font-weight: 400;
				font-size: 32rpx;
				color: #666666;
				margin-left: 32rpx;
				// margin-bottom: 2rpx;
			}

			.search-input {
				flex: 1;
				margin: 0 20rpx;
				font-size: 32rpx;
			}

			.text2 {
				font-size: 32rpx;
				display: inline-block;
				margin-bottom: 4rpx;
				color: #9b9c9c;
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

	.bubble {
		box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.15);
		position: fixed;
		left: 30rpx;
		top: 154rpx;
		z-index: 999;
		background: #fff;

		.item {
			font-weight: 400;
			font-size: 32rpx;
			color: #797979;
			margin: 24rpx 24rpx 0 24rpx;
			border-bottom: 1px solid #d8d8d8;
			padding-bottom: 24rpx;
		}

		.active {
			color: #ff4400;
		}
	}

	.bubble:before {
		content: '';
		width: 0;
		height: 0;
		border: 10px solid transparent;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: -36rpx;
	}

	.bubble:after {
		content: '';
		width: 0;
		height: 0;
		border: 10px solid transparent;
		border-bottom-color: #ffffff;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: -36rpx;
	}

	.block {
		// margin-top: 46rpx;
		padding: 0 24rpx;
		margin-bottom: 24rpx;
		.top {
			display: flex;
			justify-content: space-between;
			padding: 0 12rpx;
			margin-bottom: 34rpx;
			.text {
				font-weight: 400;
				font-size: 32rpx;
				color: #333333;
			}
		}
		.bottom {
			display: flex;
			flex-flow: row wrap;
			/* 设置为行排列并允许换行 */
			flex-direction: row;
			padding: 0 12rpx;
			.tag {
				margin: 22rpx 24rpx 0 0;
				height: 60rpx;
			}
		}
	}
}
</style>
