<template>
	<view class="HomeIndex">
		<scroll-view scroll-y class="contentBox">
			<view class="top_box">
				<u-navbar title="51积分" :bgColor="bgColor" :left-icon="' '" :is-back="false"
					:placeholder="true"></u-navbar>
				<!-- <view class="top_box_title"></view>
			    <u--text text="51积分" align="center" size="36rpx"></u--text> -->
				<view class="top_box_ad">
					<u--image src="/static/banner.png" radius="6" width="100%" height="250rpx"></u--image>
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
					<view class="top_box_mid_list" v-for="(item,index) in imgList" :key="index">
						<u--image :src="item.src" width="340rpx" height="190rpx"></u--image>
					</view>
					<view class="top_box_mid_circle">
						<u--image src="/static/zhuqianba.png" width="220rpx" height="220rpx"></u--image>
					</view>
				</view>
			</view>
			<view class="top_banner flex_box flex_row_between">
				<!-- <u--image src="/static/bnr_shangjiaruzhu.png" width="100%" height="132rpx"></u--image> -->
				<view>
					<u--image src="/static/bnr_shangjiaruzhul.png" width="340rpx" height="152rpx"
						@click="goDriving"></u--image>
				</view>
				<view>
					<u--image src="/static/bnr_shangjiaruzhu.png" width="340rpx" height="152rpx"></u--image>
				</view>
			</view>
			<view class="mid_box">
				<view class="mid_box_paneltop">
					<u-tabs class="mid_box_paneltop_tab" :list="list" lineColor="#F3483C"
						:activeStyle="{color: '#F3483C',fontWeight: '500',fontSize: '30rpx'}"
						:inactiveStyle="{color:'#333',fontWeight: '400',fontSize: '26rpx'}"
						itemStyle="height: 112rpx;"></u-tabs>
				</view>
				<view class="mid_box_panelmid">
					<view class="mid_box_panelmid_item" v-for="(item,index) in imgList2" :key="idex">
						<u--image :src="item.src" width="212rpx" height="212rpx"></u--image>
					</view>
				</view>
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
								<view style="display: flex;">
									<image src="/static/img_shanpin.png" class="panel_img"></image>
									<view>
										<view>喜阿婆粥饼店</view>
										<view class="text">
											<!-- <u-icon name="star-fill"></u-icon> -->
											<u--image src="/static/ic_xinji.png" width="24rpx"
												height="24rpx"></u--image>
											<view class="font">5.0 </view>
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
								<view v-for="(item) in 3" class="item" :key="item">
									<image src="/static/img_shanpin.png" class="panel_img"></image>
									<view>八宝粥</view>
									<view class="flex_box">
										<view class="text">返积分</view>
										<view class="text">积分可抵扣</view>
									</view>
									<view class="overflow_hidden" style="line-height: 34rpx;">
										<view class="ft text2 flex_box">
											<view class="">￥</view>
											<view class="text3">
												12.8
											</view>
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
			<view class="bottom_box bottom_box2">
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
				<view class="bottom_box_panelmid2 flex_box" :style="{padding: '0 20rpx'}">
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
				<view class="content_mid" :style="{padding: '0 0 0 20rpx'}">
					<view class="content_mid_item">
						<view v-for="(item) in 2" class="item2" :key="item">
							<image src="/static/img_datu.png" class="panel_img"></image>
							<view :style="{padding: '0 20rpx'}">立白清新柠檬洗洁精1kg</view>
							<view class="overflow_hidden"
								style="line-height: 34rpx;padding: 0 14rpx;margin-top: 14rpx;">
								<view class="ft text2 flex_box">
									<view class="">￥</view>
									<view class="text3">
										20
									</view>
								</view>
								<view class="rt text4">24</view>
							</view>
							<view class="overflow_hidden"
								style="line-height: 34rpx;padding: 0 14rpx;margin-top: 14rpx;">
								<view class="ft text5 flex_box">
									已售25
								</view>
								<view class="rt">
									<u--image src="/static/ic_gouwuche.png" width="32rpx" height="30rpx"></u--image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor: "#FEC0BC",
				list: [{
					name: '美食餐饮',
					// disabled: true
				}, {
					name: '家政服务',
					// disabled: true
				}, {
					name: '汽车维修',
					// disabled: true
				}],
				imgList: [{
					src: "/static/bnr_lvyou.png",
				}, {
					src: "/static/bnr_fenxz.png",
				}, {
					src: "/static/bnr_mlwd.png",
				}, {
					src: "/static/bnr_rys.png",
				}],
				imgList2: [{
					src: "/static/zaocan.png",
				}, {
					src: "/static/xiaochi.png",
				}, {
					src: "/static/shaokao.png",
				}, {
					src: "/static/yexiao.png",
				}, {
					src: "/static/zhufenlei.png",
				}, {
					src: "/static/tianpin.png",
				}, {
					src: "/static/linshi.png",
				}, {
					src: "/static/shuiguo.png",
				}, {
					src: "/static/ruzhu.png",
				}]
			};
		},
		methods: {
			goDriving() {
				uni.$u.route({
					url: '/pages/driving/driving',
					type: 'to'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.HomeIndex {
		background-color: #f2f2f2;

		.contentBox {
			// 滚动区自适配高度
			flex-grow: 1;
		}

		.top_banner {
			height: 190rpx;
			background: #FFFFFF;
			line-height: 162rpx;
			text-align: center;
			padding: 0 24rpx 0 24rpx;
			margin-bottom: 18rpx;

			// ::v-deep .u-image {
			// 	margin-top: 8rpx;
			// }
		}

		.top_box {
			height: 1040rpx;
			background: linear-gradient(180deg, #FEC0BC 12%, #FEE3E1 50%, #FFF4EA 84%, #FFFFFF 100%);
			padding: 0 24rpx 48rpx 24rpx;
			margin: 0 0 18rpx 0;

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
			margin: 0 0 52rpx 0;
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

				// ::v-deep .u-tabs__wrapper__nav__item {
				// 	flex: 1 !important;
				// }
			}

			&_panelmid {
				// height: 112rpx;
				// border-bottom: 2rpx solid #ccc;
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				padding: 0 24rpx;

				&_item {
					height: 212rpx;
					background: #FFFFFF;
					// box-shadow: inset 14rpx 14rpx 30rpx 0rpx rgba(251, 178, 178, 0.32), inset -14rpx -14rpx 30rpx 0rpx rgba(251, 178, 178, 0.31);
					// border-radius: 16rpx;
					flex: 0 0 calc((100% - 48rpx)/3);
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
			margin: 0 0 52rpx 0;

			&_paneltop {
				// height: 46rpx;
				// border-bottom: 2rpx solid #ccc;
				padding-top: 40rpx;

				&_left {
					float: left;

					.panel_img {
						width: 34rpx;
						height: 34rpx;
						// background: #ccc;
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
					background: #FFFFFF;
					box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(255, 116, 110, 0.1);
					border-radius: 20rpx;
					border: 2rpx solid #FFE1E1;
					padding: 20rpx;
					margin-bottom: 20rpx;

					.content_top {
						overflow: hidden;

						&_lt {
							float: left;

							.panel_img {
								width: 100rpx;
								height: 100rpx;
								// background: #ccc;
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
				margin: 42rpx 0 0 0;

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
							border: 1rpx solid #FF5D4C;
							font-weight: 400;
							font-size: 18rpx;
							color: #FF5E52;
							text-align: center;
							padding: 8rpx;
							margin: 8rpx 8rpx 8rpx 0;
						}

						.text2 {
							font-weight: 500;
							font-size: 20rpx;
							color: #FF5E52;
						}

						.text3 {
							font-weight: 400;
							font-size: 28rpx;
							color: #FF5E52;
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
						color: #FF5314;
					}

					.texts2 {
						background: #FF552E;
						border-radius: 22rpx;
						font-weight: 500;
						font-size: 20rpx;
						color: #FFFFFF;
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
		}
	}
</style>