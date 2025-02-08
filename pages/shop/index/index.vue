<template>
	<view class="shop-center">
		<mescroll-body @init="mescrollInit" @down="downCallback" @up="upCallback">
			<!-- 瀑布流布局列表 -->
			<view class="content-mid">
				<my-waterfall-flow :wfList="dataList">
					<template #left="{ leftList }">
						<my-goods-list v-for="(item, index) in leftList" :key="index" :listItem="item" @click.native="itemTap(item)"></my-goods-list>
					</template>
					<template #right="{ rightList }">
						<my-goods-list v-for="(item, index) in rightList" :key="index" :listItem="item" @click.native="itemTap(item)"></my-goods-list>
					</template>
				</my-waterfall-flow>
			</view>
		</mescroll-body>
	</view>
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
			dataList: []
		}
	},
	methods: {
		leftClick() {
			console.log('点击了定位')
		},
		itemTap(item) {
			console.log(item)
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
	.content-mid {
		padding: 0 20rpx;
	}
	.content-top {
		height: 434rpx;
		background: #ffffff;
		border-radius: 20rpx;
	}
}
</style>
