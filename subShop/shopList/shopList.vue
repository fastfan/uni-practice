<template>
	<view class="sub-shop-list">
		<uni-nav-bar title="商家列表" left-icon="left" @clickLeft="leftClick" :statusBar="true" :fixed="true" :border="false" />
		<view class="search-con">
			<view class="search">
				<image class="img" src="/static/images/home/ic_search@2x.png" mode=""></image>
				<input type="text" class="search-input" placeholder="请输入商品名称" v-model="searchKeyValue" />
				<!-- <view class="search-btn" @click="onClickSearchValue">搜索</view> -->
			</view>
		</view>
		<my-dropdown :menuList="menuList" active-color="#FA520D">
			<my-dropdown-item
				v-model="synthesisValue"
				dropdownKey="synthesis"
				:options="columnOptions"
				type="radioList"
				@change="handlerColumnChange"
			></my-dropdown-item>
			<my-dropdown-item
				v-model="priceValue"
				dropdownKey="price"
				:options="priceOptions"
				type="radioBlock"
				@change="handlerTypeChange"
			></my-dropdown-item>
			<my-dropdown-item
				v-model="salesValue"
				dropdownKey="sales"
				:options="salesOptions"
				type="radioBlock"
				@change="handlerTypeChange"
			></my-dropdown-item>
		</my-dropdown>
		<view class="sub-shop-list-item">
			<my-shop-list :dataList="shopList"></my-shop-list>
		</view>
	</view>
</template>

<script>
import { shopList, shopList2 } from '@/api/mock/data.js'
export default {
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
			synthesisValue: '',
			columnOptions: [
				{
					key: 'type',
					list: [
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
			priceValue: '',
			priceOptions: [
				{
					title: '',
					key: 'type',
					default: '',
					list: [
						{
							text: '早餐早点',
							value: '1'
						},
						{
							text: '麻辣烧烤',
							value: '2'
						},
						{
							text: '火锅',
							value: '3'
						},
						{
							text: '甜品饮料',
							value: '4'
						},
						{
							text: '水果蔬菜',
							value: '5'
						}
					]
				}
			],
			salesValue: '',
			salesOptions: [
				{
					title: '',
					key: 'type',
					default: '',
					list: [
						{
							text: '1km内',
							value: 1
						},
						{
							text: '2km内',
							value: 2
						},
						{
							text: '3km内',
							value: 3
						},
						{
							text: '5km内',
							value: 5
						},
						{
							text: '7km内',
							value: 7
						}
					]
				}
			],
			shopList: [...shopList, ...shopList2]
		}
	},
	methods: {
		leftClick() {
			uni.navigateBack()
		},
		handlerColumnChange(e) {
			console.log(111, e)
			this.$set(this.menuList[0], 'title', e.label)
		},
		handlerTypeChange(e) {
			console.log(e)
			if (e.cancel) return
		}
	},
	onLoad() {}
}
</script>

<style lang="scss" scoped>
.sub-shop-list {
	background: #f2f2f2;
	&-item {
		padding: 24rpx;
		height: calc(100vh - 420rpx);
		overflow-y: scroll;
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
</style>
