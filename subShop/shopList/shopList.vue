<template>
	<view class="sub-shop-list">
		<uni-nav-bar title="商家列表" left-icon="left" @clickLeft="leftClick" :statusBar="true" :fixed="true" :border="false" />
		<view class="search-con">
			<view class="search">
				<image class="img" src="https://oss.ruikedz.com/51life/static/images/home/ic_search@2x.png" mode=""></image>
				<input type="text" class="search-input" placeholder="请输入商品名称" v-model="searchKeyValue" />
				<!-- <view class="search-btn" @click="onClickSearchValue">搜索</view> -->
			</view>
		</view>
		<my-dropdown :menuList="menuList" active-color="#FA520D" @open="open" close="close" @change="change">
			<my-dropdown-item v-model="synthesisValue" dropdownKey="synthesis" :options="columnOptions" type="radioList"></my-dropdown-item>
			<my-dropdown-item v-model="priceValue" dropdownKey="price" :options="priceOptions" type="radioBlock"></my-dropdown-item>
			<my-dropdown-item v-model="salesValue" dropdownKey="sales" :options="salesOptions" type="radioBlock"></my-dropdown-item>
		</my-dropdown>
		<view class="sub-shop-list-item">
			<mescroll-uni top="213px" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
				<my-shop-list :dataList="shopList" @onClickEvent="onClickShopList"></my-shop-list>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue'
import { apiShopsList } from '@/api/mock/mock.js'
export default {
	mixins: [MescrollMixin],
	components: {
		MescrollUni
	},
	data() {
		return {
			keyword: '',
			menuList: [
				{
					title: '区域',
					dropdownKey: 'synthesis'
				},
				{
					title: '店铺分类',
					dropdownKey: 'price'
				},
				{
					title: '距离',
					dropdownKey: 'sales'
				}
			],
			synthesisValue: '3',
			columnOptions: [
				{
					key: 'firstKey',
					children: [
						{
							label: '金凤区',
							value: '1'
						},
						{
							label: '兴庆区',
							value: '2'
						},
						{
							label: '西夏区',
							value: '3'
						},
						{
							label: '灵武区',
							value: '4'
						},
						{
							label: '贺兰县',
							value: '5'
						}
					]
				}
			],
			priceValue: '12',
			priceOptions: [
				{
					title: '',
					key: 'firstKey',
					default: '',
					children: [
						{
							label: '商超购物',
							value: '1',
							level: 1,
							children: [
								{
									label: '粮油米面',
									value: '11',
									level: 2
								},
								{
									label: '厨房用品',
									value: '12',
									level: 2
								}
							]
						},
						{
							label: '美食餐饮',
							value: '2',
							level: 1,
							children: [
								{
									label: '汉堡薯条',
									value: '21',
									level: 2
								},
								{
									label: '快餐便当',
									value: '22',
									level: 2
								},
								{
									label: '地方菜系',
									value: '23',
									level: 2
								},
								{
									label: '奶茶咖啡',
									value: '24',
									level: 2
								},
								{
									label: '包子粥店',
									value: '25',
									level: 2
								}
							]
						},
						{
							label: '家政服务',
							value: '3',
							level: 1,
							children: [
								{
									label: '卧室清洁',
									value: '31',
									level: 2
								},
								{
									label: '厨房清洁',
									value: '32',
									level: 2
								}
							]
						},
						{
							label: '汽车维修',
							value: '4',
							level: 1,
							children: [
								{
									label: '换坐垫',
									value: '41',
									level: 2
								},
								{
									label: '换门贴',
									value: '42',
									level: 2
								}
							]
						}
					]
				}
			],
			salesValue: '2',
			salesOptions: [
				{
					title: '',
					key: 'firstKey',
					default: '',
					children: [
						{
							label: '1km内',
							value: 1,
							level: 1
						},
						{
							label: '2km内',
							value: 2,
							level: 1
						},
						{
							label: '3km内',
							value: 3,
							level: 1
						},
						{
							label: '5km内',
							value: 5,
							level: 1
						},
						{
							label: '7km内',
							value: 7,
							level: 1
						}
					]
				}
			],
			shopList: [],
			// 上拉加载的配置(可选, 绝大部分情况无需配置)
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 999, // 配置列表的总数量要大于等于999条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			}
		}
	},
	methods: {
		leftClick() {
			uni.navigateBack()
		},
		open(e) {
			console.log('展开：：：：', e)
		},
		close(e) {
			console.log('关闭：：：：', e)
		},
		change(e) {
			console.log('change：：：：', e)
			console.log('this.synthesisValue：：：：', this.synthesisValue)
			console.log('this.priceValue：：：：', this.priceValue)
			console.log('this.salesValue：：：：', this.salesValue)
		},
		// 商家列表点击
		onClickShopList(data) {
			console.log('商家列表：：：：：', data)
			uni.navigateTo({
				url: `/subShop/shopDetail/shopDetail?shopType=${data.type}`
			})
		},
		upCallback(page) {
			//联网加载数据
			apiShopsList(page.num, page.size)
				.then((res) => {
					// console.log(res)
					let curPageLen = res.list.length
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					let totalPage = res.totalPage
					this.mescroll.endByPage(curPageLen, totalPage)
					//设置列表数据
					if (page.num == 1) {
						this.shopList = [] //如果是第一页需手动制空列表
					}
					this.shopList = this.shopList.concat(res.list) //追加新数据
				})
				.catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr()
				})
		}
	},
	onLoad() {}
}
</script>

<style lang="scss" scoped>
.sub-shop-list {
	background: #f2f2f2;
	::v-deep .uni-nav-bar-text {
		font-weight: 500 !important;
		font-size: 36rpx !important;
	}
	::v-deep .uniui-left {
		font-size: 46rpx !important;
	}
	&-item {
		padding: 24rpx;
	}
	.search-con {
		margin: 22rpx 0 34rpx 0;
		padding: 0 24rpx;
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
