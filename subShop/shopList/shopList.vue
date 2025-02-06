<template>
	<view class="sub-shop-list">
		<u-navbar title="商家列表" :placeholder="true" :border="false" @leftClick="leftClick"></u-navbar>
		<u-search
			class="sub-shop-list-search"
			placeholder="请输入搜索内容"
			v-model="keyword"
			:clearabled="true"
			:showAction="false"
			bgColor="#ffffff"
		></u-search>
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
					title: '行业分类',
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
			shopList: [
				{
					id: 1,
					type: 'normal',
					shopName: '喜阿婆粥饼店',
					shopRate: '5.0',
					shopPrevage: '60',
					shopDistance: '100',
					children: [
						{
							name: '八宝粥1',
							src: '/static/img_shanpin.min.png',
							tagList: ['返积分', '积分可抵扣'],
							price: '12',
							count: '6',
							soled: '123'
						},
						{
							name: '八宝粥2',
							src: '/static/img_shanpin.min.png',
							tagList: ['返积分', '积分可抵扣'],
							price: '12',
							count: '',
							soled: '123'
						},
						{
							name: '八宝粥3',
							src: '/static/img_shanpin.min.png',
							tagList: ['返积分', '积分可抵扣'],
							price: '12',
							count: '6',
							soled: '123'
						}
					]
				},
				{
					id: 2,
					type: 'normal',
					shopName: '喜阿婆粥饼店2',
					shopRate: '5.0',
					shopPrevage: '60',
					shopDistance: '100',
					children: [
						{
							name: '八宝粥4',
							src: '/static/img_shanpin.min.png',
							tagList: ['返积分', '积分可抵扣'],
							price: '12',
							count: '6',
							soled: '123'
						},
						{
							name: '八宝粥5',
							src: '/static/img_shanpin.min.png',
							tagList: ['返积分', '积分可抵扣'],
							price: '12',
							count: '6',
							soled: '123'
						},
						{
							name: '八宝粥6',
							src: '/static/img_shanpin.min.png',
							tagList: ['返积分', '积分可抵扣'],
							price: '12',
							count: '',
							soled: '123'
						}
					]
				},
				{
					id: 3,
					type: 'normal',
					shopName: '喜阿婆粥饼店3',
					shopRate: '5.0',
					shopPrevage: '60',
					shopDistance: '100',
					children: [
						{
							name: '八宝粥7',
							src: '/static/img_shanpin.min.png',
							tagList: ['返积分', '积分可抵扣'],
							price: '12',
							count: '6',
							soled: '123'
						},
						{
							name: '八宝粥8',
							src: '/static/img_shanpin.min.png',
							tagList: ['返积分', '积分可抵扣'],
							price: '12',
							count: '',
							soled: '123'
						},
						{
							name: '八宝粥9',
							src: '/static/img_shanpin.min.png',
							tagList: ['返积分', '积分可抵扣'],
							price: '12',
							count: '6',
							soled: '123'
						}
					]
				},
				{
					id: 4,
					type: 'single',
					shopName: '【世外桃源】自助烧烤',
					shopRate: '5.0',
					shopPrevage: '60',
					shopDistance: '100',
					shopSrc: '/static/img_shanpin.min.png',
					children: []
				},
				{
					id: 5,
					type: 'empty',
					shopName: '【世外桃源】自助烧烤',
					shopRate: '',
					shopPrevage: '',
					shopDistance: '100',
					children: []
				}
			]
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
	::v-deep .u-search {
		margin: 28rpx 24rpx 30rpx !important;
	}
	&-item {
		padding: 24rpx;
		height: calc(100vh - 380rpx);
		overflow-y: scroll;
	}
}
</style>
