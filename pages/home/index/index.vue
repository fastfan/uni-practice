<template>
	<scroll-view scroll-y class="contentBox">
		<view class="HomeIndex">
			<view class="top_box">
				<u-navbar
					title=" "
					:titleStyle="titleStyle"
					:bgColor="bgColor"
					leftIcon="map"
					leftIconSize="20"
					leftText="银川市的士学校"
					:is-back="false"
					:placeholder="true"
					:border="false"
					@leftClick="leftClick"
				></u-navbar>
				<!-- <view class="top_box_title"></view>
			    <u--text text="51积分" align="center" size="36rpx"></u--text> -->
				<view class="top_box_ad">
					<u--image src="/static/banner.min.png" radius="6" width="100%" height="250rpx"></u--image>
				</view>
				<view class="top_box_top flex_box">
					<view class="top_box_top_left">
						<image src="/static/text.png" class="panel_img"></image>
					</view>
					<view class="top_box_top_mid">
						<view>95128宁夏开始运营啦</view>
						<view>各位司机朋友，新款顶灯现已到货</view>
					</view>
					<view class="top_box_top_right">
						<image src="/static/gonggao.png" class="panel_img2"></image>
					</view>
				</view>
				<view class="top_box_mid">
					<view class="top_box_mid_list" v-for="(item, index) in imgList" :key="index">
						<u--image :src="item.src" width="340rpx" height="190rpx"></u--image>
					</view>
					<view class="top_box_mid_circle">
						<u--image src="/static/zhuqianba.min.png" width="220rpx" height="220rpx"></u--image>
					</view>
				</view>
			</view>
			<view class="top_banner flex_box flex_row_between">
				<!-- <u--image src="/static/bnr_shangjiaruzhu.png" width="100%" height="132rpx"></u--image> -->
				<view>
					<u--image src="/static/bnr_shangjiaruzhul.min.png" width="340rpx" height="152rpx" @click="goDriving"></u--image>
				</view>
				<view>
					<u--image src="/static/bnr_shangjiaruzhu.min.png" width="340rpx" height="152rpx"></u--image>
				</view>
			</view>
			<view class="mid_box">
				<view class="mid_box_paneltop">
					<u-tabs
						class="mid_box_paneltop_tab"
						:list="list"
						lineColor="#F3483C"
						:activeStyle="{ color: '#F3483C', fontWeight: '500', fontSize: '30rpx' }"
						:inactiveStyle="{ color: '#333', fontWeight: '400', fontSize: '26rpx' }"
						itemStyle="height: 112rpx;"
						@click="tabClick"
						:current="currentTab"
					></u-tabs>
				</view>
				<!-- 九宫格内容区域 -->
				<swiper @change="slideOn" :current="currentTab" style="height: calc(844rpx - 112rpx)">
					<swiper-item v-for="(item, index) in gridData" :key="index" class="mid_box_panelmid">
						<view class="mid_box_panelmid_item" v-for="(items, indexs) in gridData[currentTab]" :key="indexs">
							<u--image :src="items.src" width="212rpx" height="212rpx"></u--image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="bottom_box">
				<view class="bottom_box_paneltop overflow_hidden">
					<view class="bottom_box_paneltop_left">
						<image src="/static/ic_shangcheng.png" class="panel_img"></image>
						优选商家
					</view>
					<view class="bottom_box_paneltop_right">
						查看更多
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="bottom_box_panelmid">
					<view class="bottom_box_panelmid_content" v-for="item in 3" :key="item">
						<view class="content_top">
							<view class="content_top_lt">
								<view style="display: flex">
									<image src="/static/img_shanpin.min.png" class="panel_img"></image>
									<view>
										<view>喜阿婆粥饼店</view>
										<view class="text">
											<!-- <u-icon name="star-fill"></u-icon> -->
											<u--image src="/static/ic_xinji.png" width="24rpx" height="24rpx"></u--image>
											<view class="font">5.0</view>
											<view class="font2">人均¥60</view>
										</view>
									</view>
								</view>
							</view>
							<view class="content_top_rt">
								<view class="texts">距您100米</view>
								<view class="text flex_box flex_row_between">
									<u--image src="/static/ic_chongdian.png" width="24rpx" height="24rpx"></u--image>
									<u--image src="/static/ic_wuxian.png" width="24rpx" height="24rpx"></u--image>
									<u--image src="/static/ic_jinbi.png" width="24rpx" height="24rpx"></u--image>
								</view>
							</view>
						</view>
						<view class="content_mid">
							<view class="content_mid_item">
								<view v-for="item in 3" class="item" :key="item">
									<image src="/static/img_shanpin.min.png" class="panel_img"></image>
									<view>八宝粥</view>
									<view class="flex_box">
										<view class="text">返积分</view>
										<view class="text">积分可抵扣</view>
									</view>
									<view class="overflow_hidden" style="line-height: 34rpx">
										<view class="ft text2 flex_box">
											<view class="">￥</view>
											<view class="text3">12.8</view>
											<view class="text6" v-if="item === 1">
												+6
												<image src="/static/yinjifen.png" class="panel_img2"></image>
											</view>
										</view>

										<view class="rt text4">已售123</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom_box bottom_box2" style="margin-bottom: 0">
				<view class="bottom_box_paneltop bottom_box2_paneltop overflow_hidden">
					<view class="bottom_box_paneltop_left">
						<image src="/static/ic_shangcheng.png" class="panel_img"></image>
						优选商城
					</view>
					<view class="bottom_box_paneltop_right bottom_box2_paneltop_right">
						查看更多
						<u-icon name="arrow-right"></u-icon>
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
					<view class="content_mid" :style="{ padding: '0 20rpx 0 20rpx' }">
						<view class="content_mid_item" style="display: block">
							<my-waterfall-flow :wfList="dataList">
								<template #left="{ leftList }">
									<view class="item2" v-for="(item, index) in leftList" :key="index" @itemTap="itemTap(item)">
										<image :src="item.goodImg" class="panel_img" mode="widthFix"></image>
										<view v-if="!item.type">
											<view :style="{ padding: '0 20rpx' }">{{ item.title }}</view>
											<view class="overflow_hidden" style="line-height: 34rpx; padding: 0 14rpx; margin: 14rpx 0">
												<view class="ft text2 flex_box">
													<view class="">￥</view>
													<view class="text3">20</view>
												</view>
												<view class="ft text4 flex_box" style="margin-left: 6rpx">
													<view class="">￥</view>
													<view class="text4">24</view>
												</view>
												<view class="rt text6">已售25</view>
											</view>
										</view>
									</view>
								</template>
								<template #right="{ rightList }">
									<view class="item2" v-for="(item, index) in rightList" :key="index" @itemTap="itemTap(item)">
										<image :src="item.goodImg" class="panel_img" mode="widthFix"></image>
										<view v-if="!item.type">
											<view :style="{ padding: '0 20rpx' }">{{ item.title }}</view>
											<view class="overflow_hidden" style="line-height: 34rpx; padding: 0 14rpx; margin: 14rpx 0">
												<view class="ft text2 flex_box">
													<view class="">￥</view>
													<view class="text3">20</view>
												</view>
												<view class="ft text4 flex_box" style="margin-left: 6rpx">
													<view class="">￥</view>
													<view class="text4">24</view>
												</view>
												<view class="rt text6">已售25</view>
											</view>
										</view>
									</view>
								</template>
							</my-waterfall-flow>
						</view>
					</view>
				</mescroll-body>
			</view>
		</view>
	</scroll-view>
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
			// 上拉加载的配置(可选, 绝大部分情况无需配置)
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 999, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			},
			currentTab: 0,
			loadStatus: 'loadmore',
			titleStyle: { fontWeight: 500, fontSize: '36rpx', color: '#333333' },
			dataList: [],
			bgColor: '#FEC0BC',
			list: [
				{
					name: '美食餐饮'
					// disabled: true
				},
				{
					name: '家政服务'
					// disabled: true
				},
				{
					name: '汽车维修'
					// disabled: true
				}
			],
			imgList: [
				{
					src: '/static/bnr_lvyou.min.png'
				},
				{
					src: '/static/bnr_fenxz.min.png'
				},
				{
					src: '/static/bnr_mlwd.min.png'
				},
				{
					src: '/static/bnr_rys.min.png'
				}
			],
			gridData: [
				[
					{
						src: '/static/sort_zaocan.min.png'
					},
					{
						src: '/static/sort_xiaochi.min.png'
					},
					{
						src: '/static/sort_shaokao.min.png'
					},
					{
						src: '/static/sort_yexiao.min.png'
					},
					{
						src: '/static/sort_zhufenlei.min.png'
					},
					{
						src: '/static/sort_tianpin.min.png'
					},
					{
						src: '/static/sort_linshi.min.png'
					},
					{
						src: '/static/sort_shuiguo.min.png'
					},
					{
						src: '/static/sort_ruzhu.min.png'
					}
				],
				[
					{
						src: '/static/sort_jdwx.png'
					},
					{
						src: '/static/sort_fsfl.png'
					},
					{
						src: '/static/sort_qmwx.png'
					},
					{
						src: '/static/sort_glst.png'
					},
					{
						src: '/static/sort_jzfw.png'
					},
					{
						src: '/static/sort_jtbj.png'
					},
					{
						src: '/static/sort_jdqx.png'
					},
					{
						src: '/static/sort_slwx.png'
					},
					{
						src: '/static/sort_dlwx.png'
					}
				],
				[
					{
						src: '/static/sort_huanzuotao.png'
					},
					{
						src: '/static/sort_jiaofei.png'
					},
					{
						src: '/static/sort_sijirenz.png'
					},
					{
						src: '/static/sort_yexiao.min.png'
					},
					{
						src: '/static/sort_sijifuwu.png'
					},
					{
						src: '/static/sort_zhaopin.png'
					},
					{
						src: '/static/sort_zixun.png'
					},
					{
						src: '/static/sort_shuiguo.min.png'
					},
					{
						src: '/static/sort_ruzhu.min.png'
					}
				]
			]
		}
	},
	methods: {
		leftClick() {
			console.log('点击了定位')
		},
		slideOn(e) {
			this.currentTab = e.detail.current
		},
		tabClick(item) {
			console.log(item)
			const { name, index } = item
			this.currentTab = index
		},
		itemTap(item) {
			console.log(item)
		},
		goDriving() {
			uni.$u.route({
				url: '/pages/driving/driving',
				type: 'to'
			})
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
	onLoad() {}
}
</script>
<style lang="scss">
// page {
// 	overflow: hidden;
// }
</style>
<style lang="scss" scoped>
.HomeIndex {
	background-color: #f2f2f2;
	// overflow-y: scroll;
	.contentBox {
		// 滚动区自适配高度
		flex-grow: 1;
	}

	.top_banner {
		height: 190rpx;
		background: #ffffff;
		line-height: 162rpx;
		text-align: center;
		padding: 0 24rpx 0 24rpx;
		margin-bottom: 28rpx;

		// ::v-deep .u-image {
		// 	margin-top: 8rpx;
		// }
	}

	.top_box {
		height: 1040rpx;
		background: linear-gradient(180deg, #fec0bc 12%, #fee3e1 50%, #fff4ea 84%, #ffffff 100%);
		padding: 0 24rpx 48rpx 24rpx;
		margin: 0 0 32rpx 0;

		&_title {
			height: 110rpx;
		}

		&_ad {
			margin: 24rpx 0;
		}

		&_top {
			height: 120rpx;
			background-color: #fff;
			border-radius: 6rpx;
			margin: 0 0 34rpx 0;

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

				&:nth-child(2n) {
					margin-right: 0;
				}
			}

			&_circle {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
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
			border-bottom: 2rpx solid #ccc;
			position: relative;

			::v-deep .u-tabs {
				position: absolute;
				bottom: -6rpx;
			}
		}
		&_panelmid {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			padding: 0 24rpx;
			height: auto !important;

			&_item {
				height: 212rpx;
				background: #ffffff;
				flex: 0 0 calc((100% - 48rpx) / 3);
				margin: 24rpx 24rpx 0 0;

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
			padding-top: 40rpx;

			&_left {
				float: left;

				.panel_img {
					width: 34rpx;
					height: 34rpx;
					vertical-align: text-top;
					margin: 0 18rpx 0 0;
				}
			}

			&_right {
				float: right;
				display: flex;
				font-weight: 400;
				font-size: 24rpx;
				color: #666666;
				line-height: 46rpx;
			}
		}

		&_panelmid {
			height: 844rpx;
			overflow-y: scroll;
			clear: both;
			margin-top: 30rpx;

			&_content {
				height: 574rpx;
				background: #ffffff;
				box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(255, 116, 110, 0.1);
				border-radius: 20rpx;
				border: 2rpx solid #ffe1e1;
				padding: 20rpx;
				margin-bottom: 20rpx;

				.content_top {
					overflow: hidden;

					&_lt {
						float: left;

						.panel_img {
							width: 100rpx;
							height: 100rpx;
							margin: 0 18rpx 0 0;
						}

						.text {
							display: flex;
							margin-top: 20rpx;
							font-weight: 400;
							font-size: 26rpx;
							color: #333333;
						}

						.font,
						.font2 {
							font-size: 22rpx;
							margin-right: 20rpx;
							margin-left: 6rpx;
						}
					}

					&_rt {
						float: right;

						.text {
							display: flex;
							margin-top: 14rpx;
						}

						.texts {
							font-weight: 400;
							font-size: 28rpx;
							color: #727272;
						}
					}
				}
			}
		}

		.content_mid {
			clear: both;
			margin: 36rpx 0 0 0;

			&_item {
				display: flex;

				.item,
				,
				.item2 {
					flex: 1;
					height: 204rpx;
					// background: #ccc;
					margin: 0 18rpx 0 0;
					// height: 368rpx;
					// background: #FFFFFF;
					// box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(255, 116, 110, 0.1);
					// border-radius: 8rpx;
					// padding: 0 8rpx;

					&:nth-child(3n) {
						margin-right: 0;
					}

					.panel_img {
						width: 100%;
						height: 204rpx;
						margin: 0 0 14rpx 0;
					}

					.panel_img2 {
						width: 20rpx;
						height: 20rpx;
						// background: #ccc;
						margin: 0 0 0 4rpx;
						vertical-align: middle;
					}

					.text {
						border-radius: 4rpx;
						border: 1rpx solid #ff5d4c;
						font-weight: 400;
						font-size: 18rpx;
						color: #ff5e52;
						text-align: center;
						padding: 8rpx;
						margin: 8rpx 8rpx 8rpx 0;
					}

					.text2 {
						font-weight: 500;
						font-size: 20rpx;
						color: #ff5e52;
					}

					.text3 {
						font-weight: 400;
						font-size: 28rpx;
						color: #ff5e52;
					}

					.text4 {
						font-weight: 400;
						font-size: 20rpx;
						color: #666666;
					}

					.text5 {
						border-radius: 18rpx;
						border: 1rpx solid #979797;
						font-weight: 400;
						font-size: 20rpx;
						color: #666666;
						padding: 0 12rpx;
					}
					.text6 {
						font-weight: 400;
						font-size: 20rpx;
						color: #666666;
					}
				}

				.item2 {
					height: 552rpx;
					background: #fff;
					border-radius: 12rpx;

					.panel_img {
						height: 336rpx;
						// background: #ccc;
					}

					.text4 {
						text-decoration: line-through;
					}
				}
			}
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
			background: #fff;
			height: 104rpx;
			line-height: 104rpx;

			&_right {
				margin: 36rpx 0 0 0;
			}
		}

		.content_mid {
			&_item {
				// flex-wrap: wrap;
				// flex-direction: column;
				// justify-content: space-between;
				// column-count: 2;
				// column-gap: 10rpx;
				// column-width: 336rpx;
				// display: block;

				.item2 {
					// flex: none;
					// flex-basis: calc(50% - 20rpx);
					/* 考虑元素之间的间隔 */
					box-sizing: border-box;
					border-radius: 15rpx;
					overflow: hidden;
					background-color: #fff;
					break-inside: avoid;
					/*避免在元素内部插入分页符*/
					box-sizing: border-box;
					margin: 0 0 20rpx 0;
					box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);
					height: auto;

					// &:nth-child(3n) {
					// 	margin-right: 18rpx;
					// }

					.panel_img {
						width: 100%;
						margin: 0;
					}
				}
			}
		}
	}
}
</style>