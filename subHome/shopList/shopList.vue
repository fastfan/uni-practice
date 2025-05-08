<template>
	<view class="sub-shop-list">
		<mescroll-uni
			height="100%"
			:fixed="false"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
			:up="upOption"
			:down="downOption"
			@scroll="goScroll"
		>
			<view class="sticy-search">
				<uni-nav-bar title="商家列表" left-icon="left" @clickLeft="leftClick" :statusBar="true" :fixed="true" :border="false" />
				<view class="search-con">
					<view class="search">
						<image class="img" src="https://oss.ruikedz.com/51life/static/images/home/ic_search@2x.png" mode=""></image>
						<input
							type="text"
							class="search-input"
							placeholder="请输入门店名称"
							v-model="storeName"
							confirm-type="search"
							@confirm="onClickSearchValue"
						/>
						<uni-icons type="clear" v-if="storeName" size="20" @click.native="clearValue" style="margin-right: 20rpx"></uni-icons>
						<!-- <view class="search-btn" @click="onClickSearchValue">搜索</view> -->
					</view>
				</view>
				<my-dropdown ref="myDropDown" :menuList="menuList" active-color="#FA520D" @change="change" @cancel="cancel">
					<my-dropdown-item v-model="countyId" dropdownKey="district" :options="columnOptions" type="radioList"></my-dropdown-item>
					<my-dropdown-item
						v-model="subCategoryId"
						dropdownKey="storeType"
						:options="shopCategoryList"
						type="radioBlock"
					></my-dropdown-item>
					<my-dropdown-item v-model="distance" dropdownKey="distance" :options="distanceOptions" type="radioBlock"></my-dropdown-item>
				</my-dropdown>
			</view>
			<view class="sub-shop-list-item">
				<my-shop-list :dataList="shopList" :productPageSize="3" @onClickEvent="onClickShopList"></my-shop-list>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue'
// import { apiShopsList } from '@/common/mock/mock.js'
import { ShopServer } from '@/viewModel/shop/shop.js'
import { DataServer } from '@/viewModel/data.js'
const shopServer = new ShopServer()
const dataServer = new DataServer()
export default {
	mixins: [MescrollMixin],
	components: {
		MescrollUni
	},
	data() {
		return {
			topHeight: 0,
			storeName: '',
			menuList: [
				{
					title: '区域',
					dropdownKey: 'district'
				},
				{
					title: '店铺分类',
					dropdownKey: 'storeType'
				},
				{
					title: '距离',
					dropdownKey: 'distance'
				}
			],
			countyId: '3',
			columnOptions: [
				{
					key: 'firstKey',
					children: []
				}
			],
			parentCategoryId: '',
			subCategoryId: '',
			shopCategoryList: [],
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
			statusBarHeight: getApp().globalData.statusBarHeight,
			navBarHeight: getApp().globalData.navBarHeight,
			shopList: [],
			downOption: {
				isLock: true
			},
			// 上拉加载的配置(可选, 绝大部分情况无需配置)
			upOption: {
				onScroll: true,
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 999, // 配置列表的总数量要大于等于999条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			},
			cityId: '',
			countyId: ''
		}
	},
	computed: {
		shopFirstCategoryList() {
			return this.$store.getters.shopFirstCategoryList
		},
		latitude() {
			return this.$store.state.location.latitude
		},
		longitude() {
			return this.$store.state.location.longitude
		}
	},
	methods: {
		goScroll() {
			this.$refs.myDropDown.handlerMaskClick()
			return
		},
		leftClick() {
			uni.navigateBack()
		},
		open(e) {
			console.log('展开：：：：', e)
		},
		close(e) {
			console.log('关闭：：：：', e)
		},
		clearValue() {
			this.storeName = ''
		},
		onClickSearchValue() {
			console.log('点击了搜索')
			this.mescroll.resetUpScroll()
		},
		cancel(e) {
			if (e.dropdownKey === 'storeType') {
				this.menuList[1].title = '店铺分类'
				this.parentCategoryId = ''
				this.subCategoryId = ''
			} else if (e.dropdownKey === 'distance') {
				this.menuList[2].title = '距离'
				this.distance = ''
			}
			this.mescroll.resetUpScroll()
		},
		change(e) {
			console.log('change：：：：', e)
			if (e.dropdownKey === 'storeType') {
				this.parentCategoryId = e.firstKey.value
				if (!e.secondKey) {
					this.subCategoryId = ''
				}
			}
			this.mescroll.resetUpScroll()
			// console.log('this.parentCategoryId：：：：', this.parentCategoryId)
			// console.log('this.subCategoryId：：：：', this.subCategoryId)
			// console.log('this.distance：：：：', this.distance)
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
		async upCallback(page) {
			// console.log('page:::::::', page)
			//联网加载数据
			// this.mescroll.hideTopBtn()
			// console.log(this.mescroll)
			try {
				const params = {
					pageNum: page.num,
					pageSize: page.size,
					storeName: this.storeName,
					latitude: this.latitude,
					longitude: this.longitude,
					cityId: this.cityId,
					countyId: this.countyId,
					distance: this.distance,
					parentCategoryId: this.parentCategoryId,
					subCategoryId: this.subCategoryId,
					productPageNum: 1,
					productPageSize: 3,
					recommendStatus: '' // 是否优选商家 0否1是，不传查所有
				}
				setTimeout(async () => {
					const { code, data, msg } = await shopServer.getShopStorePageList({ ...params })
					if (code === 200) {
						//设置列表数据
						if (page.num == 1) {
							this.shopList = [] //如果是第一页需手动制空列表
						}
						data.records.forEach((item) => {
							item.type = 'normal'
							item.hasWifi = item.storeWifiCount > 0
						})
						this.shopList = this.shopList.concat(data.records) //追加新数据
						this.$nextTick(() => {
							this.mescroll.endByPage(data.records.length, data.pages) //必传参数(当前页的数据个数, 总页数)
						})
					} else {
						console.log(msg)
						//联网失败, 结束加载
						this.mescroll.endErr()
					}
				}, 500)
			} catch (error) {
				// this.$tui.toast(error)
				console.log(error)
				//联网失败, 结束加载
				this.mescroll.endErr()
			}
		},
		async getCityByLngLatList() {
			const { data, code, msg } = await dataServer.getCityByLngLat({ longitude: this.longitude, latitude: this.latitude })
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
		}
	},
	async onLoad(options) {
		// console.log(this.shopFirstCategoryList)
		const height = uni.rpx2px(90 + 22 + 34 + 90) // 搜索栏高度加搜索栏上下margin
		this.topHeight = height + this.statusBarHeight + this.navBarHeight + 'px'
		this.shopFirstCategoryList.forEach((_tt) => {
			_tt.label = _tt.categoryName
			_tt.value = _tt.id
			_tt.level = '1'
			_tt.children.forEach((_mm) => {
				_mm.label = _mm.categoryName
				_mm.value = _mm.id
				_mm.level = '2'
			})
		})
		this.shopCategoryList.push({
			title: '',
			key: 'firstKey',
			default: '',
			children: this.shopFirstCategoryList
		})
		console.log('options:::::::', options)
		if (options.parentCategoryId && options.subCategoryId) {
			this.parentCategoryId = options.parentCategoryId
			this.subCategoryId = options.subCategoryId
		}
		if (options.distance) {
			this.distance = options.distance
		}
		this.getCityByLngLatList()
	}
}
</script>

<style lang="scss" scoped>
.sub-shop-list {
	background: #f2f2f2;
	::v-deep .my-shop-list {
		padding: 0 24rpx 24rpx;
		background: #f2f2f2;
	}
	.sticy-search {
		z-index: 990;
		position: sticky;
		top: 0;
	}
	&-item {
		margin-top: 24rpx;
	}
	.search-con {
		padding: 22rpx 24rpx 34rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background: #f2f2f2;

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
				margin-right: 0;
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
}
// ::v-deep .my-shop-list {
// 	margin: 0 24rpx;
// }
.sticky-item {
	z-index: 990;
	position: sticky;
	top: 0;
	// background-color: #fff;
}
</style>
