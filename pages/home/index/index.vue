<template>
	<view class="HomeIndex">
		<view class="top_box" :style="{ paddingTop: topHeight }">
			<view class="top_fixed">
				<view class="top_box_title" :style="{ height: statusBarHeight + 'px' }"></view>
				<view class="top_box_title" :style="{ height: navBarHeight + 'px' }">
					<uni-icons type="location" size="22" class="top_box_unicon"></uni-icons>
					银川市的士学校
				</view>
				<view class="search-con padding_24" @click="jump('searchHistory')">
					<view class="search">
						<image class="img" src="/static/images/home/ic_search@2x.png" mode=""></image>
						<input type="text" class="search-input" placeholder="请输入商品名称" v-model="searchKeyValue" />
						<view class="search-btn" @click="onClickSearchValue">搜索</view>
					</view>
					<image class="change" src="/static/images/home/icon_sousuo@2x.png" @click="onClickScan"></image>
				</view>
			</view>
			<!-- <uni-nav-bar
				left-icon="location"
				leftText="银川市的士学校"
				leftWidth="300rpx"
				backgroundColor="#FEC0BC"
				title=" "
				@clickLeft="leftClick"
				:statusBar="true"
				:fixed="true"
				:border="false"
			></uni-nav-bar> -->
			<view class="top_box_ad padding_24">
				<image class="img" src="/static/images/home/banner@2x.png"></image>
			</view>
			<view class="top_box_top flex_box">
				<view class="top_box_top_left">
					<image src="/static/images/home/taxt_bdsh@2x.png" class="panel_img"></image>
				</view>
				<view class="top_box_top_mid">
					<view>95128宁夏开始运营啦</view>
					<view>各位司机朋友，新款顶灯现已到货</view>
				</view>
				<view class="top_box_top_right">
					<image src="/static/images/home/gonggao@2x.png" class="panel_img2"></image>
				</view>
			</view>
			<view class="top_box_mid padding_24">
				<view class="top_box_mid_list" v-for="(item, index) in imgList" :key="index">
					<image class="img" :src="item.src"></image>
				</view>
				<view class="top_box_mid_circle">
					<image class="img" src="/static/images/home/zhuqianba@2x.png"></image>
				</view>
			</view>
		</view>
		<view class="top_banner flex_box flex_row_between padding_24">
			<image class="img" src="/static/images/home/banner_ruzhu@2x.png" mode="widthFix"></image>
		</view>
		<view class="mid_box">
			<view class="mid_box_paneltop">
				<my-tabs
					:tabs="list"
					field="name"
					v-model="currentTab"
					@change="tabClick"
					height="112rpx"
					lineColor="#F3483C"
					activeColor="#F3483C"
					activeFontSize="36rpx"
					fontSize="30rpx"
				></my-tabs>
			</view>
			<!-- 九宫格内容区域 -->
			<swiper @change="slideOn" :current="currentTab" style="height: calc(844rpx - 112rpx)">
				<swiper-item v-for="(item, index) in gridData" :key="index" class="mid_box_panelmid">
					<view class="mid_box_panelmid_item" v-for="(items, indexs) in gridData[currentTab]" :key="indexs">
						<image class="img" :src="items.src"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="bottom_box">
			<view class="bottom_box_paneltop overflow_hidden">
				<view class="bottom_box_paneltop_left">
					<image src="/static/images/home/icon_shangjia@2x.png" class="panel_img"></image>
					优选商家
				</view>
				<view class="bottom_box_paneltop_right" @click="jump('shopList')">
					查看更多
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
			<view class="bottom_box_panellist">
				<my-shop-list :dataList="shopList"></my-shop-list>
			</view>
		</view>
		<view class="bottom_box bottom_box2" style="margin-bottom: 0">
			<view class="bottom_box_paneltop bottom_box2_paneltop overflow_hidden">
				<view class="bottom_box_paneltop_left">
					<image src="/static/images/home/ic_shangcheng@2x.png" class="panel_img"></image>
					优选商城
				</view>
				<view class="bottom_box_paneltop_right bottom_box2_paneltop_right" @click="jump('shop')">
					查看更多
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
			<view class="bottom_box_panelmid2 flex_box" :style="{ padding: '0 20rpx' }">
				<view class="item" v-for="item in 4" :key="item">
					<view class="flex_box flex_direction" v-if="item === 0">
						<view class="texts">精选</view>
						<view class="texts2">为您精选</view>
					</view>
					<view class="" v-else>
						<view class="text">果蔬</view>
						<view class="text2">地方特产</view>
					</view>
				</view>
			</view>
			<mescroll-body @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
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
			</mescroll-body>
		</view>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue'
import { apiGoods } from '@/api/mock/mock.js'
import { gridData, shopList } from '@/api/mock/data.js'
export default {
	mixins: [MescrollMixin],
	components: {
		MescrollBody
	},
	data() {
		return {
			searchKeyValue: '',
			topHeight: 0,
			statusBarHeight: getApp().globalData.statusBarHeight,
			navBarHeight: getApp().globalData.navBarHeight,
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
			currentTab: 0,
			titleStyle: { fontWeight: 500, fontSize: '36rpx', color: '#333333' },
			dataList: [],
			bgColor: '#FEC0BC',
			list: [
				{
					id: 1,
					name: '商超购物'
					// disabled: true
				},
				{
					id: 2,
					name: '美食餐饮'
					// disabled: true
				},
				{
					id: 3,
					name: '家政服务'
					// disabled: true
				},
				{
					id: 4,
					name: '出租车服务'
					// disabled: true
				}
			],
			imgList: [
				{
					src: '/static/images/home/bnr_lvyou@2x.png'
				},
				{
					src: '/static/images/home/bnr_fenxz@2x.png'
				},
				{
					src: '/static/images/home/bnr_mlwd@2x.png'
				},
				{
					src: '/static/images/home/bnr_rys@2x.png'
				}
			],
			gridData,
			shopList
		}
	},
	methods: {
		onClickSearchValue() {
			console.log('点击了搜索')
		},
		onClickScan() {
			console.log('点击了扫一扫')
		},
		jump(type) {
			if (type === 'shop') {
				uni.switchTab({
					url: '/pages/shop/index/index'
				})
			} else if (type === 'shopList') {
				uni.navigateTo({
					url: `/subShop/${type}/${type}`
				})
			} else if (type === 'searchHistory') {
				uni.navigateTo({
					url: `/subHome/${type}/${type}`
				})
			}
		},
		leftClick() {
			console.log('点击了定位')
		},
		slideOn(e) {
			this.currentTab = e.detail.current
		},
		tabClick(index) {
			console.log(index)
			this.currentTab = index
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
							goodImg: '/static/images/home/ruzhu_banner@2x.png',
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
	onLoad() {
		console.log(getApp())
		this.topHeight = uni.rpx2px(136) + this.statusBarHeight + this.navBarHeight + 'px'
	}
}
</script>
<style lang="scss">
.HomeIndex {
	background-color: #f2f2f2;
	.top_banner {
		height: 190rpx;
		background: #ffffff;
		line-height: 162rpx;
		text-align: center;
		padding: 0 24rpx 0 24rpx;
		margin-bottom: 28rpx;
		.img {
			height: 152rpx;
			width: 100%;
		}
	}
	::v-deep .uni-navbar-btn-text text {
		font-size: 26rpx !important;
		font-weight: 500;
	}
	.top_fixed {
		position: fixed;
		z-index: 999;
		top: 0;
		background: linear-gradient(180deg, #fec0bc 5%, #fee3e1 100%);
		width: 100%;
	}
	.top_box {
		background: linear-gradient(180deg, #fec0bc 5%, #fee3e1 30%, #fff4ea 84%, #ffffff 100%);
		padding: 0 0 48rpx 0;
		margin: 0 0 32rpx 0;
		.search-con {
			margin: 22rpx 0 34rpx 0;
			height: 80rpx;
			line-height: 80rpx;
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
		&_title {
			// height: 88rpx;
			line-height: 88rpx;
			padding-left: 24rpx;
			font-size: 24rpx;
			font-weight: 500;
		}
		&_unicon {
			vertical-align: middle;
		}

		&_ad {
			margin: 0 0 24rpx 0;
			.img {
				width: 100%;
				height: 250rpx;
				border-radius: 6rpx;
			}
		}

		&_top {
			height: 120rpx;
			background-color: #fff;
			border-radius: 6rpx;
			margin: 0 24rpx 34rpx;

			.panel_img2 {
				width: 60rpx;
				height: 60rpx;
			}

			.panel_img {
				width: 72rpx;
				height: 82rpx;
				vertical-align: baseline;
			}

			&_left {
				width: 72rpx;
				margin: 0 30rpx 0 20rpx;
			}

			&_mid {
				flex-grow: 1;
			}

			&_right {
				width: 84rpx;
			}
		}

		&_mid {
			height: 404rpx;
			display: flex;
			flex-wrap: wrap;
			position: relative;

			// background-color: #ccc;
			// border-radius: 50rpx;
			&_list {
				margin: 0 22rpx 24rpx 0;
				.img {
					width: 340rpx;
					height: 190rpx;
				}

				&:nth-child(2n) {
					margin-right: 0;
				}
			}

			&_circle {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				.img {
					width: 220rpx;
					height: 220rpx;
				}
			}
		}
	}

	.mid_box {
		margin: 0 0 28rpx 0;
		// padding: 0 24rpx;
		background: #fff;
		height: 844rpx;

		&_paneltop {
			height: 112rpx;
			border-bottom: 1rpx solid #ccc;
		}
		&_panelmid {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			margin: 0 24rpx;
			height: auto !important;

			&_item {
				height: 212rpx;
				background: #ffffff;
				flex: 0 0 calc((100% - 100rpx) / 3);
				margin: 24rpx 24rpx 0 0;
				.img {
					width: 100%;
					height: 212rpx;
				}
				&:nth-child(3n) {
					margin-right: 0;
				}
			}
		}
	}

	.bottom_box {
		padding: 0 24rpx;
		background: #fff;
		margin: 0 0 28rpx 0;

		&_paneltop {
			background: #fff;
			height: 104rpx;
			line-height: 104rpx;
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: space-between;
			&_left {
				.panel_img {
					width: 34rpx;
					height: 34rpx;
					vertical-align: middle;
					margin: -10rpx 18rpx 0 0;
				}
			}

			&_right {
				display: flex;
				font-weight: 400;
				font-size: 24rpx;
				color: #666666;
			}
		}
		&_panellist {
			height: 1106rpx;
			overflow-y: scroll;
		}
		&_panelmid2 {
			margin: 20rpx 0;

			.item {
				flex: 1;
				height: 76rpx;
				border-right: 2rpx solid #ccc;
				text-align: center;

				&:nth-child(4) {
					border-right: none;
				}

				.text {
					font-weight: 500;
					font-size: 32rpx;
					color: #333333;
					margin-bottom: 16rpx;
				}

				.text2 {
					font-weight: 400;
					font-size: 20rpx;
					color: #666666;
				}

				.texts {
					font-weight: 500;
					font-size: 32rpx;
					color: #ff5314;
					margin-bottom: 16rpx;
				}

				.texts2 {
					background: #ff552e;
					border-radius: 22rpx;
					font-weight: 500;
					font-size: 20rpx;
					color: #ffffff;
					text-align: center;
					padding: 2rpx 12rpx;
					width: fit-content;
				}
			}
		}
	}

	.bottom_box2 {
		background: none;
		padding: 0;

		&_paneltop {
			padding: 0 24rpx;
			&_right {
			}
		}

		.content_mid {
			padding: 0 20rpx;
			margin-top: 20rpx;
		}
	}
}
</style>
