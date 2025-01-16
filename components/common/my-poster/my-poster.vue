<template>
	<view v-if="isVisible" class="poster_slider" @click="handleClickOutside">
		<view class="poster_slider_container">
			<swiper class="swiper" :indicator-dots="false" :autoplay="false" :circular="true" :duration="300"
				:vertical="false" :current="currentIndex" @change="handleSwiperChange" :display-multiple-items="1"
				previous-margin="60rpx" next-margin="60rpx">
				<swiper-item v-for="(item, index) in posterList" :key="index" class="swiper_item_custom">
					<view class="poster_item" :class="currentIndex===index?'poster_item_current':''">
						<image :src="item.imageUrl" mode="widthFix"></image>
						<view class="poster_item_box" :class="item.class">
							<view class="poster_item_box_top">
								<view class="box_top_left">
									<view class="box_top_left_l" :style="{border:item.borderStyle}">
										<image src="/static/share/icon.png" mode="widthFix"></image>
									</view>
									<view class="box_top_left_r" :style="{color:item.textColor}">
										<view class="text">{{item.userName}}</view>
										<view class="text text2">{{item.phone}}</view>
									</view>
								</view>
								<view class="box_top_right">
									<image src="/static/share/img_jinbi.png" mode="widthFix"></image>
								</view>
							</view>
							<view class="poster_item_box_btm">
								<view class="box_btm_left" :style="{background:'url(' + item.qrCodePic + ')'}">
									<!-- <image :src="item.qrCodePic" mode="widthFix"></image> -->
									<canvas class="canvas-hide" canvas-id="qrcode" />
									<image class="scan" :class="isExpire?'expire': ''" :src="scanImage" mode=""></image>
								</view>
								<view class="box_btm_right">
									<view class="box_btm_right_t">
										<image src="/static/share/img_shou.png" mode="widthFix"></image>
										<view class="right_t_text">扫码一起赚钱</view>
									</view>
									<view class="box_btm_right_b" :style="{color:item.textColor}">
										<view>加入51积分</view>
										<view>尊享赚钱项目</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<button class="poster_slider_btn" @click.native.stop="clickShareBtn({type:'wechatMoment'})">
			<view class="btn_img">
				<image src="/static/share/ic_pengyousuan.png" mode="widthFix"></image>
			</view>
			<view class="btn_text">
				分享至朋友圈
			</view>
		</button>
		<view class="poster_slider_share">
			<button class="share_list" @click.native.stop="clickShareBtn(shareList[0])" open-type="share" :data-share="{
				  title: '分享的标题',
				  path: `/pages/mine/index/index`
				}">
				<image :src="shareList[0].icon" mode="widthFix">
				</image>
				<view class="share_list_text">{{shareList[0].text}}</view>
			</button>
			<button class="share_list" @click.native.stop="clickShareBtn(shareList[1])">
				<image :src="shareList[1].icon" mode="widthFix">
				</image>
				<view class="share_list_text">{{shareList[1].text}}</view>
			</button>
		</view>
		<poster-model ref="PosterModel" v-if="showPainter" :painterProps="posterList[currentIndex]"></poster-model>
	</view>
</template>
<script>
	import uQRCode from '@/common/Sansnn-uQRCode/uqrcode.js'
	import PosterModel from "./poster.vue"
	export default {
		props: {
			isVisible: {
				type: Boolean,
				required: true,
				default: false
			}
		},
		components: {
			PosterModel
		},
		data() {
			return {
				showPainter: false,
				currentIndex: 0,
				winWidth: 176,
				winHeight: 176,
				scanImage: null,
				qrData: {
					qrCodeData: '9BFC4502C50814351A7633BF3B20FBD63256E88747374DFA19F925CB00E87411'
				},
				isExpire: false,
				posterList: [{
						imageUrl: '/static/share/img_haibao1.png',
						class: 'red',
						background: 'linear-gradient(180deg, #F9F5F5 0%, #FFE1CE 100%)',
						textColor: "#A9492A",
						borderStyle: '2rpx solid rgba(255, 157, 100, 1)',
						qrCodePic: '/static/share/img_kung1.png',
						userName: '大门牙胖仔',
						phone: '189****1312'
					},
					{
						imageUrl: '/static/share/img_haibao2.png',
						class: 'blue',
						background: 'rgba(255, 255, 255, 0.28)',
						textColor: "#1E81F6",
						borderStyle: '2rpx solid rgba(101, 172, 255, 1)',
						qrCodePic: '/static/share/img_kung2.png',
						userName: '大门牙胖仔',
						phone: '189****1312'
					},
					{
						imageUrl: '/static/share/img_haibao3.png',
						class: 'green',
						background: 'rgba(255, 255, 255, 0.47)',
						textColor: "#0BA827",
						borderStyle: '2rpx solid rgba(102, 230, 37, 1)',
						qrCodePic: '/static/share/img_kung3.png',
						userName: '大门牙胖仔',
						phone: '189****1312'
					},
					{
						imageUrl: '/static/share/img_haibao4.png',
						class: 'purple',
						background: 'rgba(255, 255, 255, 0.51)',
						textColor: "#E54685",
						borderStyle: '2rpx solid rgba(228, 119, 177, 1)',
						qrCodePic: '/static/share/img_kung4.png',
						userName: '大门牙胖仔',
						phone: '189****1312'
					},
					{
						imageUrl: '/static/share/img_haibao5.png',
						class: 'orange',
						background: 'rgba(255, 255, 255, 0.58)',
						textColor: "#CC4502",
						borderStyle: '2rpx solid rgba(255, 157, 100, 1)',
						qrCodePic: '/static/share/img_kung5.png',
						userName: '大门牙胖仔',
						phone: '189****1312'
					},
				],
				shareList: [{
						icon: '/static/share/icon_weixin.png',
						text: '微信好友',
						type: 'wechat'
					},
					// {
					// 	icon: '/static/share/icon_qq.png',
					// 	text: 'QQ好友',
					// 	type:'QQFriend'
					// },
					// {
					// 	icon: '/static/share/icon_qqkongjian.png',
					// 	text: 'QQ空间',
					// 	type:'QQZone'
					// },
					// {
					// 	icon: '/static/share/icon_weibo.png',
					// 	text: '微博',
					// 	type:'weibo'
					// },
					{
						icon: '/static/share/icon_xiazai.png',
						text: '保存图片',
						type: 'savePic'
					},
				],
				src: ''
			};
		},
		methods: {
			handleSwiperChange(e) {
				this.currentIndex = e.detail.current;
				this.showPainter = false
			},
			handleClickOutside(event) {
				console.log('父元素被点击');
				this.$emit('modelClose')
				this.showPainter = false
			},
			async clickShareBtn(e) {
				console.log("e:::::::", e)
				console.log('子元素被点击');
				if (e.type === 'savePic') {
					this.showPainter = true
					this.$nextTick(() => {
						console.log('PosterModel::::', this.$refs.PosterModel)
						this.$refs.PosterModel.save()
					})
				} else if (e.type === 'wechatMoment') {
					uni.showToast({
						title: '请点击右上角三个点唤起菜单，找到分享到朋友圈并点击',
						icon: 'none',
						duration: 3000
					});
				}
			},
			make() {
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.qrData.qrCodeData,
					size: this.winHeight / 2,
					margin: 0,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					correctLevel: uQRCode.errorCorrectLevel.H
				}).then(res => {
					this.scanImage = res;
				});
			}
		},
		mounted() {

		},
		onLoad() {

		}
	}
</script>
<style lang="scss" scoped>
	.poster_slider {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;

		.canvas-hide {
			/* 1 */
			position: fixed;
			right: 100vw;
			bottom: 100vh;
			/* 2 */
			z-index: -9999;
			/* 3 */
			opacity: 0;
		}

		.qrCode_item {}

		.scan {
			padding: 6rpx;
			position: absolute;
			top: 190rpx;
			left: 27rpx;
		}

		.expire {
			opacity: 0.1;
		}

		&_container {
			width: 100%;
			height: 956rpx;
			margin-top: 176rpx;
		}

		.swiper {
			height: 956rpx;
		}

		.poster_item {
			display: flex;
			justify-content: center;
			align-items: center;
			transition: transform 0.3s ease;
			/* 添加过渡效果，使滑动更平滑 */

			&_box {
				height: 410rpx;
				border-radius: 8rpx;
				width: 82%;
				position: absolute;
				top: 480rpx;

				&_top {
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: right;

					.box_top_left {
						flex: 1;
						margin-top: 46rpx;
						display: flex;

						&_l {
							border-radius: 50%;
							border: 2rpx solid rgba(255, 157, 100, 1);
							color: rgba(169, 73, 42, 1);
							width: 88rpx;
							height: 88rpx;
							margin: 0 16rpx 0 24rpx;

							image {
								width: 84rpx;
								height: 84rpx !important;
								border-radius: 50%;
							}
						}

						&_r {
							line-height: 45rpx;

							.text {
								font-weight: 500;
								font-size: 26rpx;
							}

							.text2 {
								font-size: 22rpx;
							}
						}
					}

					.box_top_right {
						flex: 1;

						image {
							width: 170rpx;
							height: 114rpx;
							margin: 20rpx 20rpx 0 0;
						}
					}
				}

				&_btm {
					display: flex;
					margin-top: 30rpx;

					.box_btm_left {
						image {
							width: 162rpx;
							height: 162rpx !important;
							padding: 6rpx;
						}

						background-position: center;
						width: 180rpx;
						height: 180rpx;
						margin: 24rpx;
						background-repeat: no-repeat;
						background-size: cover;
					}

					.box_btm_right {
						text-align: center;

						&_t {
							display: flex;
							margin: 46rpx 0 14rpx 0rpx;

							image {
								width: 64rpx;
								height: 42rpx !important;
							}

							.right_t_text {
								margin-top: 6rpx;
							}
						}

						&_b {
							font-weight: 500;
							font-size: 32rpx;
						}
					}
				}
			}

			.red {
				background: linear-gradient(180deg, #F9F5F5 0%, #FFE1CE 100%);
			}

			.blue {
				background: rgba(255, 255, 255, 0.28);
				backdrop-filter: blur(20rpx);
			}

			.green {
				background: rgba(255, 255, 255, 0.47);
				backdrop-filter: blur(20rpx);
			}

			.purple {
				background: rgba(255, 255, 255, 0.51);
				backdrop-filter: blur(20rpx);
			}

			.orange {
				background: rgba(255, 255, 255, 0.58);
				backdrop-filter: blur(20rpx);
			}
		}

		.swiper_item_custom {
			// width: 90% !important;
			margin-right: 0;
			display: inline-block;
			height: auto !important;
		}

		.poster_item image {
			width: 92%;
			/* 海报图片宽度，可根据实际调整 */
			height: 872rpx;
		}

		&_btn {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 98rpx;
			background: linear-gradient(180deg, #FF8B27 0%, #FF6B31 100%);
			border-radius: 50rpx;
			width: 80%;
			margin-top: 20rpx;
			margin-left: 76rpx;

			.btn_img {

				image {
					width: 48rpx;
					height: 48rpx;
					vertical-align: text-bottom;
				}
			}

			.btn_text {
				font-weight: 500;
				font-size: 36rpx;
				color: #FFFFFF;
				margin-left: 26rpx;
			}
		}

		&_share {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			text-align: center;
			font-weight: 400;
			font-size: 24rpx;
			color: #FFFFFF;
			margin-top: 46rpx;

			button {
				color: #fff;
				background: none !important;
				border-color: transparent;
				border: 0;
				outline: none;
			}

			button::after {
				border: none;
			}

			.share_list {
				// flex: 1;

				image {
					width: 92rpx;
					height: 92rpx;
					// margin-bottom: 8rpx;
				}
			}
		}
	}
</style>