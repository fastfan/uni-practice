<template>
	<!-- 不能用v-if (i: 每个tab页的专属下标;  index: 当前tab的下标; 申明在 MescrollMoreItemMixin )-->
	<!-- <view style="height: 100vh" v-show="i === index"> -->
	<!--
	swiper中的transfrom会使fixed失效,此时用height固定高度; 
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,只能用mescroll-uni,不能用mescroll-body
	-->
	<!-- top的高度等于悬浮菜单tabs的高度 -->
	<mescroll-uni
		:fixed="false"
		@init="mescrollInit"
		:down="downOption"
		@down="downCallback"
		:up="upOption"
		@up="upCallback"
		@scroll="goscroll"
	>
		<!-- 数据列表 -->
		<my-shop-list-item
			@change="change"
			:list="goods"
			:type="type"
			:storeId="storeId"
			@add="addToShopCar"
			@reduce="reduceToShopCar"
			@purchase="rushToPurchase"
			@openPopup="openPopup"
		></my-shop-list-item>
	</mescroll-uni>
	<!-- </view> -->
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import MescrollMoreItemMixin from '@/components/mescroll-uni/mixins/mescroll-more-item.js'
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue'
import { ShopServer } from '@/viewModel/shop/shop'
import { MallServer } from '@/viewModel/mall/mall'
const shopServer = new ShopServer()
const mallServer = new MallServer()
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
			type: String,
			default() {
				return 'product'
			}
		},
		storeId: {
			type: String,
			default() {
				return ''
			}
		},
		productId: {
			type: String,
			default() {
				return ''
			}
		},
		list: {
			type: Array,
			default() {
				return []
			}
		},
		selectedGoods: {
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
				if (!this.$util.isEmpty(val)) {
					// console.log(val)
					// this.mescroll.resetUpScroll()
					setTimeout(() => {
						// console.log('this.goods：：：：：：：：', this.goods)
						this.goods.forEach((_tt) => {
							_tt.count = 0 // 给所有商品初始化商品数值
							_tt.shopCarId = '' // 给所有商品初始化一个购物车id
							_tt.buyQuantity = 0 // 给所有商品初始化商品数值
							const reduceRes = val.reduce((result, cur, index) => {
								const { productId, count, buyQuantity, ...res } = cur
								const someIndex = result.findIndex((item) => {
									return item.productId === cur.productId
								})
								someIndex === -1 && result.push({ productId, count, buyQuantity, ...res })
								someIndex !== -1 && (result[someIndex].count += count)
								return result
							}, [])
							reduceRes.forEach((_mm) => {
								if (_tt.id === _mm.productId) {
									_tt.shopCarId = _mm.id // 遍历购物车列表给商品购物车id赋值
									_tt.count = Number(_mm.count) // 遍历购物车列表给商品数量赋值
									_tt.buyQuantity = Number(_mm.buyQuantity)
								}
							})
						})
					}, 500)
				}
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
			downOption: {
				isLock: true,
				use: false,
				auto: false,
				beforeEndDelay: 0
			},
			upOption: {
				onScroll: true,
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 3, // 配置列表的总数量要大于等于999条才显示'-- END --'的提示
				textNoMore: '已经到底了~',
				toTop: {
					src: null,
					html: null
				},
				empty: {
					tip: '暂无相关数据'
				}
			},
			isScrolls: true,
			goods: [] //列表数据
		}
	},
	methods: {
		change(e) {
			// console.log(e)
			this.$emit('change', e)
		},
		goscroll(e) {
			if (e.preScrollY > 0 && this.isScrolls) {
				// console.log(this.isScrolls)
				uni.pageScrollTo({
					scrollTop: 405
				})
				this.isScrolls = false
			} else if (e.preScrollY === 0) {
				uni.pageScrollTo({
					scrollTop: 0
				})
				this.isScrolls = true
			}
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		async upCallback(page) {
			// 此处可以继续请求其他接口
			//联网加载数据
			try {
				const params = {
					pageNum: page.num,
					pageSize: page.size,
					storeId: this.storeId,
					categoryId: this.list.length > 0 ? this.list[this.index].id : '',
					neProductId: this.productId
				}
				const { code, data, msg } = await shopServer.getProductPageList({ ...params })
				if (code === 200) {
					// console.log('selectedGoods::::::::', this.selectedGoods)
					// 设置列表数据
					if (page.num == 1) {
						this.goods = [] //如果是第一页需手动制空列表
					}
					const records = data.records
					if (this.list.length > 0 && this.selectedGoods.length > 0 && page.num == 1) {
						if (this.selectedGoods[0].categoryId === this.list[this.index].id) {
							records.unshift(...this.selectedGoods)
						} else {
						}
					}
					records.forEach((_tt) => {
						_tt.count = 0 // 给所有商品初始化商品数值
						_tt.shopCarId = '' // 给所有商品初始化一个购物车id
						// this.$set(_tt, 'count', 0)
						// console.log(this.carList)
						const reduceRes = this.carList.reduce((result, cur, index) => {
							const { productId, count, buyQuantity, ...res } = cur
							const someIndex = result.findIndex((item) => {
								return item.productId === cur.productId
							})
							someIndex === -1 && result.push({ productId, count, buyQuantity, ...res })
							someIndex !== -1 && (result[someIndex].count += count)
							return result
						}, [])
						// console.log(reduceRes)
						reduceRes.forEach((_mm) => {
							if (_tt.id === _mm.productId) {
								_tt.shopCarId = _mm.id // 遍历购物车列表给商品购物车id赋值
								_tt.count = Number(_mm.count) // 遍历购物车列表给商品数量赋值
								_tt.buyQuantity = Number(_mm.buyQuantity)
							}
						})
					})
					this.goods = this.goods.concat(data.records) //追加新数据
					this.$nextTick(() => {
						this.mescroll.endByPage(data.records.length, data.pages) //必传参数(当前页的数据个数, 总页数)
					})
				} else {
					console.log(msg)
				}
			} catch (error) {
				// this.$tui.toast(error)
				console.log(error)
			}
		},
		async addToShopCar(item) {
			// console.log('item::::', item)
			this.$parent.addToShopCar(item)
		},
		async reduceToShopCar(item) {
			// console.log('item::::', item)
			this.$parent.reduceToShopCar(item)
		},
		async rushToPurchase(item) {
			// console.log('item::::', item)
			this.$parent.rushToPurchase(item)
		},
		async openPopup(item) {
			// console.log('item::::', item)
			this.$parent.openPopup(item)
		}
	}
}
</script>

<style lang="scss" scoped>
::v-deep .mescroll-totop {
	display: none !important;
}
</style>
