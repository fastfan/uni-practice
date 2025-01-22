<template>
	<view class="shop-center">
		<u-navbar title="商城" :left-icon="' '" :is-back="false" :placeholder="true"></u-navbar>
		<u-sticky><my-dropdown :menuList="menuList" active-color="#FA520D">
				<my-dropdown-item v-model="synthesisValue" dropdownKey="synthesis" :options="columnOptions"
					@change="handlerColumnChange"></my-dropdown-item>
				<my-dropdown-item v-model="priceValue" dropdownKey="price" :options="priceOptions" type="column"
					:backgroundColor="'#FFDECE'" @change="handlerTypeChange"></my-dropdown-item>
				<my-dropdown-item v-model="salesValue" dropdownKey="sales" :options="salesOptions" type="column"
					:backgroundColor="'#FFDECE'" @change="handlerTypeChange"></my-dropdown-item>
			</my-dropdown></u-sticky>

		<scroll-view scroll-y="true" @scrolltolower="onScrollToLower" style="height: calc(100vh - 270rpx);">
			<!-- 瀑布流布局列表 -->
			<view class="pubuBox">
				<view class="pubuItem">
					<view class="item-masonry" v-for="(item, index) in dataList" :key="index">
						<image :src="item.img" mode="widthFix"></image>
						<view class="listtitle" v-if="!item.type"> <!-- 这是没有高度的父盒子（下半部分） -->
							<view class="listtitle1">{{ item.title }}</view>
							<view class="listtitle2">
								{{ item.price }}
							</view>
							<view class="listtitle3">
								{{ item.desc }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus" />
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuList: [{
					title: '区域',
					dropdownKey: 'synthesis'
				}, {
					title: '行业分类',
					dropdownKey: 'price'
				}, {
					title: '距离',
					dropdownKey: 'sales'
				}],
				synthesisValue: '',
				columnOptions: [{
						label: '金凤区',
						value: '1',
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
				],
				priceValue: '',
				priceOptions: [{
					title: '',
					key: 'type',
					default: '',
					list: [{
						text: '早餐早点',
						value: '1'
					}, {
						text: '麻辣烧烤',
						value: '2'
					}, {
						text: '火锅',
						value: '3'
					}, {
						text: '甜品饮料',
						value: '4'
					}, {
						text: '水果蔬菜',
						value: '5'
					}]
				}],
				salesValue: '',
				salesOptions: [{
					title: '',
					key: 'type',
					default: '',
					list: [{
						text: '1km内',
						value: 1
					}, {
						text: '2km内',
						value: 2
					}, {
						text: '3km内',
						value: 3
					}, {
						text: '5km内',
						value: 5
					}, {
						text: '7km内',
						value: 7
					}]
				}],
				loadStatus: 'loadmore',
				dataList: [{
						img: 'https://minio.ruikedz.com/51plat-test/test/pms/product/5cfe59b33fee45f694e95d8fccba8d02.png',
						title: '我是标题1',
						desc: '描述描述描述描述描述描述描述描述1',
						price: 20
					},
					{
						img: '/static/img_datu.png',
						title: '我是标题2',
						desc: '描述描述描述描述描述描述描述描述2',
						price: 20
					},
					{
						img: 'https://minio.ruikedz.com/51plat-test/test/pms/product/13d1d5023182457b8563864c6a79eb74.png',
						title: '我是标题2',
						desc: '描述描述描述描述描述描述描述描述2',
						price: 20
					},
					{
						img: 'https://minio.ruikedz.com/51plat-test/test/pms/product/5d13c771d19747368394d3f0847454d3.png',
						title: '我是标题3',
						desc: '描述描述描述描述描述描述描述描述3',
						price: 20
					},
					{
						img: 'https://minio.ruikedz.com/51plat-test/test/pms/product/0915b6e7b90b45529fffda925982f9bc.png',
						title: '我是标题4',
						desc: '描述描述描述描述描述描述描述描述4',
						price: 20
					},
					{
						img: 'https://minio.ruikedz.com/51plat-test/test/pms/product/51f911a141b347c6a9b44c3decc175cf.png',
						title: '我是标题5',
						desc: '描述描述描述描述描述描述描述描述5',
						price: 20
					},
					{
						img: 'https://minio.ruikedz.com/51plat-test/test/pms/product/a1308cf7e6eb400d9868fd4828b792a2.jpeg',
						title: '我是标题6',
						desc: '描述描述描述描述描述描述描述描述6',
						price: 20
					},
					{
						img: 'https://minio.ruikedz.com/51plat-test/test/pms/product/7910754789dd4bfe881009a79775af02.jpg',
						title: '我是标题7',
						desc: '描述描述描述描述描述描述描述描述7',
						price: 20
					}, {
						img: 'https://minio.ruikedz.com/51plat-test/test/pms/product/a7816477276746e8a6cbf36e3a338497.jpg',
						title: '我是标题8',
						desc: '描述描述描述描述描述描述描述描述58',
						price: 20
					},
					{
						img: 'https://minio.ruikedz.com/51plat-test/test/pms/product/3efb217c176047db9c7f236efdca4e80.jpg',
						title: '我是标题9',
						desc: '描述描述描述描述描述描述描述描述9',
						price: 20
					},
					{
						img: 'https://minio.ruikedz.com/51plat-test/test/pms/product/a6898b34438f41629c52021fd7bbd614.jpg',
						title: '我是标题10',
						desc: '描述描述描述描述描述描述描述描述10',
						price: 20
					}
				]
			}
		},
		methods: {
			handlerColumnChange(e) {
				console.log(111, e);
				this.$set(this.menuList[0], 'title', e.label)
			},
			handlerTypeChange(e) {
				console.log(e);
				if (e.cancel) return;
			},
			insertItem() {
				const length = Math.ceil(this.dataList.length / 2)
				this.dataList.splice(length, 0, {
					img: '/static/ruzhu_banner.png',
					title: '',
					desc: '',
					price: '',
					type: 'insert'
				})
			},
			loadData() {
				setTimeout(() => {
					const newData = [];
					for (let i = 0; i < 10; i++) {
						newData.push({
							img: 'https://minio.ruikedz.com/51plat-test/test/pms/product/a6898b34438f41629c52021fd7bbd614.jpg',
							title: '我是标题10',
							desc: '描述描述描述描述描述描述描述描述10',
							price: 20
						});
					}
					// 将新数据添加到列表中
					this.dataList = [...this.dataList, ...newData]
					this.dataList.forEach((item, index) => {
						if (item.type && item.type === 'insert') {
							this.dataList.splice(index, 1)
							this.insertItem()
						}
					})
				}, 1000)
			},
			onScrollToLower() {
				// 滚动到底部时，加载下一页数据
				// this.loadStatus = 'loading';
				setTimeout(() => {
					if (this.dataList.length > 50) {
						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loading';
						this.loadData();
					}
				}, 1000)
			}
		},
		mounted() {
			this.insertItem()
		}
	}
</script>

<style lang="scss">
	.shop-center {
		background: #F8F9FA;
	}

	//瀑布流
	page {
		background-color: #eee;
		height: 100%;
		overflow: hidden;
	}

	.pubuBox {
		padding: 22rpx;
	}

	.pubuItem {
		column-count: 2;
		column-gap: 20rpx;
	}

	.item-masonry {
		box-sizing: border-box;
		border-radius: 15rpx;
		overflow: hidden;
		background-color: #fff;
		break-inside: avoid;
		/*避免在元素内部插入分页符*/
		box-sizing: border-box;
		margin-bottom: 20rpx;
		box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);
	}

	.item-masonry image {
		width: 100%;
	}

	.listtitle {
		padding-left: 22rpx;
		font-size: 24rpx;
		padding-bottom: 22rpx;

		.listtitle1 {
			line-height: 39rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			min-height: 39rpx;
			max-height: 78rpx;
		}

		.listtitle2 {
			color: #ff0000;
			font-size: 32rpx;
			line-height: 32rpx;
			font-weight: bold;
			padding-top: 22rpx;

			.listtitle2son {
				font-size: 32rpx;
			}
		}

		.listtitle3 {
			font-size: 28rpx;
			color: #909399;
			line-height: 32rpx;
			padding-top: 22rpx;
		}
	}

	.loading {
		text-align: center;
		padding: 10px;
	}
</style>