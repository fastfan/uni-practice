<template>
	<mescroll-uni :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
		<my-shop-list :dataList="shopList" @onClickEvent="onClickShopList"></my-shop-list>
	</mescroll-uni>
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
	props: {
		stickyTop: {
			type: Number,
			default: 0
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
			shopList: []
		}
	},
	methods: {
		// 商家列表点击
		onClickShopList(data) {
			console.log('商家列表：：：：：', data)
			uni.navigateTo({
				url: '/subShop/shopDetail/shopDetail'
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
	}
}
</script>

<style lang="scss"></style>
