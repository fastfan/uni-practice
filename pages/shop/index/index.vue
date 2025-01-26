<template>
	<!-- <mescroll-body @init="mescrollInit" @down="downCallback" @up="upCallback"> -->
	<view class="shop-center">
		<u-navbar title="商城" :left-icon="' '" :is-back="false" :placeholder="true"></u-navbar>
		<my-dropdown :menuList="menuList" active-color="#FA520D">
			<my-dropdown-item v-model="synthesisValue" dropdownKey="synthesis" :options="columnOptions" type="radioList" @change="handlerColumnChange"></my-dropdown-item>
			<my-dropdown-item v-model="priceValue" dropdownKey="price" :options="priceOptions" type="radioBlock" @change="handlerTypeChange"></my-dropdown-item>
			<my-dropdown-item v-model="salesValue" dropdownKey="sales" :options="salesOptions" type="radioBlock" @change="handlerTypeChange"></my-dropdown-item>
		</my-dropdown>
		<mescroll-body @init="mescrollInit" @down="downCallback" @up="upCallback">
			<!-- 瀑布流布局列表 -->
			<view class="pubuBox">
				<view class="pubuItem">
					<my-waterfall-flow :wfList="dataList" @itemTap="itemTap" v-slot="{ item }">
						<view class="item-masonry">
							<image :src="item.goodImg" mode="widthFix"></image>
							<view class="listtitle" v-if="!item.type">
								<!-- 这是没有高度的父盒子（下半部分） -->
								<view class="listtitle1">{{ item.goodName }}</view>
								<view class="listtitle2">
									{{ item.goodPrice }}
								</view>
								<view class="listtitle3">
									{{ item.goodSold }}
								</view>
							</view>
						</view>
					</my-waterfall-flow>
				</view>
			</view>
		</mescroll-body>
	</view>
	<!-- </mescroll-body> -->
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue'
import { apiGoods } from '@/api/mock/mock.js'
export default {
	mixins: [MescrollMixin],
	components: {
		MescrollBody
	},
	data() {
		return {
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
			dataList: []
		}
	},
	methods: {
		itemTap(item) {
			console.log(item)
		},
		handlerColumnChange(e) {
			console.log(111, e)
			this.$set(this.menuList[0], 'title', e.label)
		},
		handlerTypeChange(e) {
			console.log(e)
			if (e.cancel) return
		},
		insertItem() {
			// const length = Math.ceil(this.dataList.length / 2)
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			// 此处可以继续请求其他接口
			// if(page.num == 1){
			// 	// 请求其他接口...
			// }

			// 如果希望先请求其他接口,再触发upCallback,可参考以下写法
			// if(!this.isInitxx){
			// 	apiGetxx().then(res=>{
			// 		this.isInitxx = true
			// 		this.mescroll.resetUpScroll() // 重新触发upCallback
			// 	}).catch(()=>{
			// 		this.mescroll.endErr()
			// 	})
			// 	return // 此处return,先获取xx
			// }

			//联网加载数据
			apiGoods(page.num, page.size)
				.then((res) => {
					console.log(page)
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;

					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					//this.mescroll.endByPage(res.list.length, totalPage); //必传参数(当前页的数据个数, 总页数)

					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					//this.mescroll.endBySize(res.list.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					//this.mescroll.endSuccess(res.list.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
					this.mescroll.endSuccess(res.list.length)

					//设置列表数据
					if (page.num == 1) {
						this.dataList = [] //如果是第一页需手动制空列表
					}

					this.dataList = this.dataList.concat(res.list) //追加新数据
					if (page.num == 1) {
						this.dataList.splice(1, 0, {
							id: '',
							goodImg: '/static/ruzhu_banner.min.png',
							goodName: '',
							goodPrice: '',
							goodSold: '',
							type: 'insert'
						})
					}
				})
				.catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr()
				})
		}
	},
	mounted() {}
}
</script>

<style lang="scss">
.shop-center {
	background: #f8f9fa;
}

//瀑布流
page {
	background-color: #eee;
	height: 100%;
	// overflow: hidden;
}

.pubuBox {
	padding: 22rpx;
}

.pubuItem {
	// column-count: 2;
	// column-gap: 20rpx;
	// display: flex;
	// flex-wrap: wrap;
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
	// margin-right: 20rpx;
	// width: calc(50% - 10rpx);
	box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);

	// &:nth-child(2n) {
	// 	margin-right: 0;
	// }
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
