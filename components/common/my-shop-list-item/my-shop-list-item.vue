<template>
	<view class="my-shop-list-item">
		<view
			class="product_item"
			v-for="(cell, cIndex) in dataList"
			:key="cIndex"
			@click="goToMallDetail(cell)"
			:style="{ background: cell.background ? cell.background : '#fff' }"
		>
			<view style="position: relative; height: 204rpx">
				<image :src="cell.displayImgUrl" mode="aspectFill" class="product_img"></image>
				<view class="silvers" v-if="cell.enSilverPoints === '1'">
					<text class="silvers-text">￥</text>
					<text class="silvers-text2">{{ calculatePrice(cell.currentPrice, cell.maxSilverPoints) }}</text>
					<text class="silvers-text4">+</text>
					<text class="silvers-text2">{{ cell.maxSilverPoints }}</text>
					<text class="silvers-text3">银积分</text>
				</view>
			</view>

			<view :class="storeType === 'normal' ? 'prodcut_info' : 'prodcut_info2'">
				<view class="name">
					{{ cell.productName }}
				</view>
				<view class="panel-tag">
					<view class="tag-text" v-for="(tag, tags) in cell.productLabelList" :key="tags">{{ tag }}</view>
				</view>
				<view class="price-text" v-if="cell.enSilverPoints === '0'">
					<view class="icon">￥</view>
					<view class="price">{{ cell.currentPrice }}</view>
					<view class="text10" v-show="Number(cell.originalPrice) > 0">￥</view>
					<view class="text5" v-show="Number(cell.originalPrice) > 0">{{ cell.originalPrice }}</view>
				</view>
				<view class="silver" v-else-if="cell.enSilverPoints === '1'">
					<view class="flex_box silver_top">
						<view class="text7">￥</view>
						<view class="text3">{{ cell.currentPrice }}</view>
						<view class="text8" v-show="Number(cell.originalPrice) > 0">￥</view>
						<view class="text5" v-show="Number(cell.originalPrice) > 0">{{ cell.originalPrice }}</view>
					</view>
					<!-- 	<view class="silver_bottom">
						<image class="img" src="https://oss.ruikedz.com/51life/static/images/home/yinjifen@2x.png"></image>
						<text class="text9">可抵扣{{ cell.maxSilverPoints }}银积分</text>
					</view> -->
				</view>
				<view class="count flex_box">
					<view class="count-left sold">已售{{ cell.saleCount }}</view>
					<view class="count-right">
						<view @click.stop="rushToPurchase(cell)" v-if="storeType == 'single' && cell.inventory != 0" class="btn">去抢购</view>
						<uni-badge
							class="uni-badge-left-margin"
							v-if="cell.specificationTag === '1' && storeType == 'normal' && cell.inventory != 0"
							:text="cell.count"
							absolute="rightTop"
							:offset="[5, 0]"
							size="small"
							:customStyle="{ background: 'linear-gradient(135deg, #ff7f2b 0%, #fa4f0b 100%)' }"
						>
							<view @click.stop="clickAdd(cell)" class="btn">选规格</view>
						</uni-badge>
						<view class="count-right" v-if="cell.specificationTag === '0' && storeType == 'normal' && cell.inventory != 0">
							<image
								class="img"
								src="https://oss.ruikedz.com/51life/static/images/shop/btn_reduce@2x.png"
								v-if="cell.count && cell.count > 0"
								@click.stop="clickDelete(cell)"
							></image>
							<text v-if="cell.count && cell.count > 0" class="num">{{ cell.count }}</text>
							<image
								class="img"
								src="https://oss.ruikedz.com/51life/static/images/shop/btn_add@2x.png"
								@click.stop="clickAdd(cell)"
							></image>
						</view>
						<view v-if="cell.inventory == 0">已售罄</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const carList = []
export default {
	props: {
		list: {
			type: Array,
			default: () => {
				return []
			}
		},
		type: {
			type: String,
			default: 'product'
		}
	},
	data() {
		return {
			dataList: []
		}
	},
	computed: {
		storeType() {
			// console.log('this.storeType:::::::', this.$store.getters.storeType)
			return this.$store.getters.storeType
		}
	},
	methods: {
		change(e) {
			// console.log(e)
			this.$emit('change', e)
		},
		goToMallDetail(item) {
			uni.navigateTo({
				url: `/subMall/mallDetail/mallDetail?mallId=${item.id}`
			})
		},
		clickAdd(item) {
			if (!this.$tui.isLogin()) {
				uni.showModal({
					title: '提示',
					content: '为了您更好的体验，请先前往登录！',
					cancelText: '稍后登录',
					confirmText: '立即登录',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					}
				})
			} else {
				console.log(item)
				item.isShowBtn = false
				if (item.customTag === '1' && item.count === 0) {
					//定制化商品且数量为0跳转去商品详情页面
					this.goToMallDetail(item)
				} else if (item.specificationTag === '1') {
					this.selectItem = item
					for (let x = 0; x < this.selectItem.propertyNameList.length; x++) {
						let attr = this.selectItem.propertyNameList[x]
						for (let z = 0; z < attr.propertyValueList.length; z++) {
							let child = attr.propertyValueList[z]
							if (z == 0) {
								child['select'] = true
							} else {
								child['select'] = false
							}
							child['isSpc'] = true
						}
					}
					// setTimeout(() => {
					this.$emit('openPopup', this.selectItem)
					// }, 1000)
				} else {
					this.$emit('add', item)
				}
				// 添加购物车
				// 通过商品id来判断，相同count+1,不同就push
				// const goods = carList.find((res) => res.id === item.id)
				// if (!goods) {
				// 	carList.push(item)
				// }
				// // console.log('this.carList:::::::', carList)
				// this.$store.dispatch('updateShopCarList', carList)
			}
		},
		clickDelete(item) {
			this.$emit('reduce', item)
			// this.$store.dispatch('updateShopCarList', carList)
		},
		rushToPurchase(item) {
			if (!this.$tui.isLogin()) {
				uni.showModal({
					title: '提示',
					content: '为了您更好的体验，请先前往登录！',
					cancelText: '稍后登录',
					confirmText: '立即登录',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					}
				})
			} else {
				this.$emit('purchase', item)
			}
		},
		calculatePrice(price, silver) {
			return Number(price) - Number(silver)
		}
	},
	watch: {
		list: {
			handler: function (val) {
				this.dataList = [...val]
				// console.log(this.dataList)
			},
			immediate: true,
			deep: true
		}
	},
	mounted() {}
}
</script>

<style lang="scss">
.my-shop-list-item {
	.product_item {
		height: auto;
		min-height: 220rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 20rpx;
		padding: 16rpx 16rpx 0rpx;
		background: #fff;
		border-radius: 8rpx;
		position: relative;
		.panel-tag {
			display: flex;
			flex-wrap: wrap;
			.tag-text {
				width: fit-content;
				border-radius: 4px;
				border: 1px solid #ff9797;
				font-weight: 400;
				font-size: 18rpx;
				color: #ff5e52;
				text-align: center;
				padding: 3rpx 8rpx;
				margin: 0 8rpx 14rpx 0;
				&:nth-child(3n) {
					margin-right: 0;
				}
			}
		}
		.silver {
			// background: #fff0f0;
			// border-radius: 32rpx;
			// padding: 8rpx 20rpx;
			// width: fit-content;
			&_top {
				align-items: baseline;
				height: 44rpx;
				line-height: 44rpx;
			}
			&_bottom {
				height: 18rpx;
				line-height: 18rpx;
				display: flex;
				margin-top: 4rpx;
				.img {
					width: 18rpx;
					height: 18rpx;
					margin-right: 4rpx;
				}
			}
			.text5 {
				font-weight: 400;
				color: #7d7d7d;
				text-decoration: line-through;
				font-size: 24rpx;
			}
			.text3 {
				font-weight: 400;
				font-size: 36rpx;
				color: #ff5e52;
				margin-right: 6rpx;
			}
			.text7 {
				font-weight: 400;
				font-size: 20rpx;
				color: #f04a43;
			}
			.text8 {
				font-weight: 400;
				font-size: 24rpx;
				color: #7d7d7d;
				text-decoration: line-through;
			}
			.text9 {
				font-weight: 400;
				font-size: 14rpx;
				color: #f92c29;
			}
		}
		.silvers {
			background: url('https://oss.ruikedz.com/51life/static/images/shop/bg_yinjif@2x.png') no-repeat;
			background-size: cover;
			color: #fff;
			width: 196rpx;
			height: 36rpx;
			line-height: 36rpx;
			// padding-left: 8rpx;
			position: absolute;
			bottom: 0;
			width: 100%;
			&-text,
			&-text4 {
				font-weight: 500;
				font-size: 20rpx;
				margin-left: 8rpx;
			}
			&-text2 {
				font-weight: 500;
				font-size: 36rpx;
			}
			&-text3 {
				font-weight: 500;
				font-size: 16rpx;
				margin: 0 4rpx;
			}
			&-text4 {
				font-size: 32rpx;
			}
		}
		.product_img {
			width: 204rpx;
			height: 204rpx;
			border-radius: 12rpx;
		}
		.price-text {
			display: flex;
			align-items: baseline;
			.icon {
				font-weight: 500;
				font-size: 20rpx;
				color: #ff5e52;
			}
			.price {
				font-weight: 500;
				font-size: 36rpx;
				line-height: 36rpx;
				color: #f04a43;
			}
			.text10 {
				font-weight: 400;
				color: #7d7d7d;
				text-decoration: line-through;
				font-size: 24rpx;
				margin-left: 10rpx;
			}
			.text5 {
				font-weight: 400;
				color: #7d7d7d;
				text-decoration: line-through;
				font-size: 24rpx;
				// margin-left: 10rpx;
			}
		}
		.prodcut_info,
		.prodcut_info2 {
			flex: 1;
			padding-left: 20rpx;
			.name {
				font-weight: 400;
				font-size: 28rpx;
				color: #333333;
				margin-bottom: 10rpx;
				line-height: 40rpx;
			}
			.sold {
				font-weight: 400;
				font-size: 20rpx;
				color: #666666;
			}
			.count {
				justify-content: space-between;
				.count-left {
					font-weight: 400;
					font-size: 22rpx;
					color: #666666;
					display: flex;
					align-items: flex-end;
				}
				.count-right {
					display: flex;
					align-items: flex-end;
					.btn {
						width: 108rpx;
						height: 48rpx;
						background: linear-gradient(135deg, #ffb686 0%, #ff7e7b 100%);
						box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(255, 116, 110, 0.2);
						border-radius: 12rpx;
						line-height: 48rpx;
						font-weight: 500;
						font-size: 24rpx;
						color: #ffffff;
						text-align: center;
					}
					.num {
						font-size: 24rpx;
						color: #000000;
						margin: 0 10rpx;
						line-height: 56rpx;
					}
					.img {
						width: 56rpx;
						height: 56rpx;
					}
					.img2 {
					}
				}
			}
		}
		.prodcut_info2 {
			.name {
				margin-bottom: 20rpx;
			}
			.sold {
				margin: 18rpx 0;
			}
		}
	}
}
</style>
