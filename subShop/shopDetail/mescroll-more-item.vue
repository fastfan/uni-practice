<template>
	<!-- 不能用v-if (i: 每个tab页的专属下标;  index: 当前tab的下标; 申明在 MescrollMoreItemMixin )-->
	<!-- <view style="height: 100vh" v-show="i === index"> -->
	<!--
	swiper中的transfrom会使fixed失效,此时用height固定高度; 
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,只能用mescroll-uni,不能用mescroll-body
	-->
	<!-- top的高度等于悬浮菜单tabs的高度 -->
	<mescroll-uni :fixed="false" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback">
		<!-- 数据列表 -->
		<my-shop-list-item :list="goods" :type="type"></my-shop-list-item>
	</mescroll-uni>
	<!-- </view> -->
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import MescrollMoreItemMixin from '@/components/mescroll-uni/mixins/mescroll-more-item.js'
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue'
import { apiShops } from '@/common/mock/mock.js'
export default {
	mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
	components: {
		MescrollUni
	},
	props: {
		i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
		index: {
			// 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			type: Number,
			default() {
				return 0
			}
		},
		type: {
			// 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			type: String,
			default() {
				return 'product'
			}
		},
		list: {
			// 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			type: Array,
			default() {
				return []
			}
		},
		height: [Number, String] // mescroll的高度
	},
	watch: {
		carList: {
			handler: function (val) {
				// console.log('val::::::::::', val)
				// console.log('this.goods:::::::::', this.goods)
				// val.forEach((_t) => {
				// 	this.goods.forEach((_m) => {
				// 		if (_t.goodsId === _m.goodsId) {
				// 			_m.count = _t.count
				// 		}
				// 	})
				// })
			},
			deep: true
		},
		goods: {
			handler: function (val) {
				// console.log('val::::::::::', val)
			},
			deep: true
		}
	},
	computed: {
		carList() {
			return this.$store.getters.shopCarList
		}
	},
	data() {
		return {
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 999, // 配置列表的总数量要大于等于999条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			},
			goods: [] //列表数据
		}
	},
	methods: {
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			// this.i: 每个tab页的专属下标
			// this.index: 当前tab的下标
			// let word = this.tabs[this.i].name // 具体项目中,您可能取的是tab中的type,status等字段
			let word = ''
			apiShops(page.num, page.size, word)
				.then((res) => {
					console.log(res)
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(res.list.length)
					//设置列表数据
					// if (page.num == 1) this.goods = [] //如果是第一页需手动制空列表
					this.$nextTick(() => {
						this.goods = this.goods.concat(res.list) //追加新数据
					})
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
