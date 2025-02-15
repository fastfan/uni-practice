<template>
	<mescroll-uni :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
		<!-- 瀑布流布局列表 -->
		<view class="content_mid">
			<my-waterfall-flow :wfList="dataList">
				<template #left="{ leftList }">
					<my-goods-list v-for="(item, index) in leftList" :key="index" :listItem="item" @click.native="itemTap(item)"></my-goods-list>
				</template>
				<template #right="{ rightList }">
					<my-goods-list v-for="(item, index) in rightList" :key="index" :listItem="item" @click.native="itemTap(item)"></my-goods-list>
				</template>
			</my-waterfall-flow>
		</view>
	</mescroll-uni>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue'
import { apiGoods } from '@/api/mock/mock.js'
export default {
	mixins: [MescrollMixin],
	components: {
		MescrollUni
	},
	props: {
		index: {
			// 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			type: Number,
			default() {
				return 0
			}
		},
		tabs: {
			// 为了请求数据,演示用,可根据自己的项目判断是否要传
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
		return {
			// 上拉加载的配置(可选, 绝大部分情况无需配置)
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 999, // 配置列表的总数量要大于等于999条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			},
			dataList: []
		}
	},
	methods: {
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			// 此处可以继续请求其他接口
			//联网加载数据
			let word = this.tabs[this.index].name // 具体项目中,您可能取的是tab中的type,status等字段
			apiGoods(page.num, page.size, word)
				.then((res) => {
					// console.log(res)
					let curPageLen = res.list.length
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					let totalPage = res.totalPage
					this.mescroll.endByPage(curPageLen, totalPage)
					//设置列表数据
					if (page.num == 1) {
						this.dataList = [] //如果是第一页需手动制空列表
					}
					this.dataList = this.dataList.concat(res.list) //追加新数据
					if (page.num == 1 && word === '推荐') {
						this.dataList.splice(1, 0, {
							id: '',
							goodImg: 'https://oss.ruikedz.com/51life/static/images/home/ruzhu_banner@2x.png',
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
	}
}
</script>

<style lang="scss">
.content_mid {
	padding: 0 20rpx;
	margin-top: 20rpx;
}
</style>
