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
										<image src="/static/share/28.png" mode="widthFix"></image>
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
		<xWxmlToCanvas ref="xWxmlToCanvas" :hide="true" :width="290" :height="458" :xStyle="style" :xWxml="wxml">
		</xWxmlToCanvas>
	</view>
</template>
<script>
	import uQRCode from '@/common/Sansnn-uQRCode/uqrcode.js'
	import xWxmlToCanvas from '@/components/x-wxml-to-canvas/x-wxml-to-canvas';
	export default {
		props: {
			isVisible: {
				type: Boolean,
				required: true,
				default: false
			}
		},
		components: {
			xWxmlToCanvas
		},
		data() {
			return {
				wxml: null,
				style: null,
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
						textColor: "#A9492A",
						borderStyle: '2rpx solid rgba(255, 157, 100, 1)',
						qrCodePic: '/static/share/img_kung1.png',
						userName: '大门牙胖仔',
						phone: '189****1312'
					},
					{
						imageUrl: '/static/share/img_haibao2.png',
						class: 'blue',
						textColor: "#1E81F6",
						borderStyle: '2rpx solid rgba(101, 172, 255, 1)',
						qrCodePic: '/static/share/img_kung2.png',
						userName: '大门牙胖仔',
						phone: '189****1312'
					},
					{
						imageUrl: '/static/share/img_haibao3.png',
						class: 'green',
						textColor: "#0BA827",
						borderStyle: '2rpx solid rgba(102, 230, 37, 1)',
						qrCodePic: '/static/share/img_kung3.png',
						userName: '大门牙胖仔',
						phone: '189****1312'
					},
					{
						imageUrl: '/static/share/img_haibao4.png',
						class: 'purple',
						textColor: "#E54685",
						borderStyle: '2rpx solid rgba(228, 119, 177, 1)',
						qrCodePic: '/static/share/img_kung4.png',
						userName: '大门牙胖仔',
						phone: '189****1312'
					},
					{
						imageUrl: '/static/share/img_haibao5.png',
						class: 'orange',
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
			},
			handleClickOutside(event) {
				console.log('父元素被点击');
				this.$emit('modelClose')
			},
			async clickShareBtn(e) {
				console.log("e:::::::", e)
				console.log('子元素被点击');
				if (e.type === 'savePic') {
					// this.savePageAsImage()
					console.log("item::::::", this.posterList[this.currentIndex])
					const mode = 'aspectFit';
					// const imgSrc = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-xyzgy/7d75b690-6087-11eb-918d-3d24828c498c.jpeg';
					const imgSrc = this.scanImage
					const imgSrc2 = "/static/share/28.png"
					const imgSrc3 = "/static/share/img_jinbi.png"
					const imgSrc4 = "/static/share/img_shou.png"
					const item = this.posterList[this.currentIndex]
					this.wxml = `
								<view class="poster_item" >
														<image class="poster_item_imgs" src="${item.imageUrl}" mode="${mode}"></image>
														<view  class="poster_item_box ${item.class}">
															<view class="poster_item_box_top">
																<view class="box_top_left">
																	<view class="box_top_left_l" style="border:${item.borderStyle}">
																		<image class="l_img" src="${imgSrc2}" mode="${mode}"></image>
																	</view>
																	<view class="box_top_left_r" style="color:${item.textColor}">
																		<view class="r_text">${item.userName}</view>
																		<view class="r_text r_text2">${item.phone}</view>
																	</view>
																</view>
																<view class="box_top_right">
																	<image class="right_img" src="${imgSrc3}" mode="${mode}"></image>
																</view>
															</view>
															<view class="poster_item_box_btm">
																<view class="box_btm_left" style="background:'url(' + ${item.qrCodePic} + ')'">
																	<image class="btm_img"  src="${imgSrc}" mode=""></image>
																</view>
																<view class="box_btm_right">
																	<view class="box_btm_right_t">
																		<image class="t_img" src="${imgSrc4}" mode="${mode}"></image>
																		<view class="right_t_text">扫码一起赚钱</view>
																	</view>
																	<view class="box_btm_right_b" style="color:${item.textColor}">
																		<view>加入51积分</view>
																		<view>尊享赚钱项目</view>
																	</view>
																</view>
															</view>
														</view>
													</view>
						`;
					this.style = {
						poster_item: {
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							transition: 'transform 0.3 s ease',
							width: 290,
							height: 458
						},
						poster_item_imgs: {
							width: 290,
							height: 458
						},
						poster_item_box: {
							height: 255,
							borderRadius: 4,
							width: 237,
							position: 'absolute',
							top: 240
						},
						poster_item_box_top: {
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							textAlign: 'right',
							width: 258,
							height: 67
						},
						box_top_left: {
							flex: 1,
							marginTop: 23,
							width: 129,
							height: 44
						},
						box_top_left_l: {
							borderRadius: '50%',
							border: '2 rpx solid rgba(255, 157, 100, 1)',
							color: 'rgba(169, 73, 42, 1)',
							width: 88,
							height: 88,
							marginRight: 8,
							marginLeft: 12,
							float: 'left'
						},
						l_img: {
							width: 44,
							height: 44,
							borderRadius: '50% '
						},
						box_top_left_r: {
							float: 'left',
							lineHeight: 23,
							width: 66,
							height: 44
						},
						r_text: {
							fontWeight: 500,
							fontSize: 13,
							width: 66,
							height: 22
						},
						r_text2: {
							fontSize: 11,
							width: 66,
							height: 22
						},
						box_top_right: {
							flex: 1,
							width: 130,
							height: 67
						},
						right_img: {
							width: 85,
							height: 57,
							marginTop: 10,
							marginRight: 10
						},
						poster_item_box_btm: {
							display: 'flex',
							marginTop: 15,
							width: 258,
							height: 113
						},
						box_btm_left: {
							backgroundPosition: 'center',
							width: 90,
							height: 90,
							margin: 12,
							backgroundRepeat: 'no-repeat',
							backgroundsize: 'cover'
						},
						left_img: {
							width: 86,
							height: 86,
							padding: 3
						},
						box_btm_right: {
							textAlign: 'center',
							width: 116,
							height: 114
						},
						box_btm_right_t: {
							display: 'flex',
							marginTop: 46,
							marginRight: 14,
							width: 116,
							height: 21
						},
						t_img: {
							width: 32,
							height: 21
						},
						right_t_text: {
							marginTop: 3,
							width: 84,
							height: 19
						},
						box_btm_right_b: {
							fontWeight: 500,
							fontSize: 16,
							width: 116,
							height: 114
						},
						red: {
							background: 'linear-gradient(180 deg, #F9F5F5 0% , #FFE1CE 100% )'
						},
						blue: {
							background: 'rgba(255, 255, 255, 0.28)',
							backdropFilter: 'blur(20)'
						},
						green: {
							background: 'rgba(255, 255, 255, 0.47)',
							backdropFilter: 'blur(20)'
						},
						purple: {
							background: 'rgba(255, 255, 255, 0.51)',
							backdropFilter: 'blur(20)'
						},
						orange: {
							background: 'rgba(255, 255, 255, 0.58)',
							backdropFilter: 'blur(20)'
						},
					}
					// await this.renderToCanvas()
					// await this.canvasToTempFilePath()
					setTimeout(async () => {
						await this.getCanvasImage()
					}, 300)

				} else if (e.type === 'wechatMoment') {
					uni.showToast({
						title: '请点击右上角三个点唤起菜单，找到分享到朋友圈并点击',
						icon: 'none',
						duration: 3000
					});
				}
			},
			renderToCanvas() {
				this.$refs.xWxmlToCanvas.renderToCanvas();
			},
			canvasToTempFilePath() {
				this.$refs.xWxmlToCanvas.canvasToTempFilePath().then(res => {
					this.src = res;
				});
			},
			getCanvasImage() {
				this.$refs.xWxmlToCanvas.getCanvasImage().then(res => {
					console.log("res::::", res)
					this.src = res;
					this.saveImageToPhotosAlbum()
				});
			},
			saveImageToPhotosAlbum() {
				if (!this.src) return uni.showToast({
					title: '未获取路径',
					icon: 'none'
				})
				this.$refs.xWxmlToCanvas.saveImageToPhotosAlbum(this.src)
			},
			async savePageAsImage() {
				try {
					// 获取要转换为图片的页面元素
					// 获取要截图的元素
					const element = uni.createSelectorQuery().in(this).select('.poster_slider');
					const rect = await new Promise((resolve, reject) => {
						element.boundingClientRect(resolve).exec();
					});
					console.log(rect)
					const canvas = await html2canvas(rect, {
						// 配置项可根据需要调整，如 width、height 等
						useCORS: true,
						logging: false
					});
					const imageData = canvas.toDataURL('image/png');
					console.log('生成的图片数据:', imageData);

					// 将图片数据转换为 Blob 对象
					const blob = await (await fetch(imageData)).blob();
					const file = new File([blob], 'page_image.png', {
						type: 'image/png'
					});

					// 将 Blob 对象上传到服务器或使用本地存储，这里使用本地存储示例
					const reader = new FileReader();
					reader.onloadend = () => {
						const base64Data = reader.result;
						uni.downloadFile({
							url: base64Data,
							success: (res) => {
								if (res.statusCode === 200) {
									console.log('图片下载成功，临时路径:', res.tempFilePath);
									// 保存图片到相册
									wx.saveImageToPhotosAlbum({
										filePath: res.tempFilePath,
										success: () => {
											console.log('图片保存成功');
											uni.showToast({
												title: '图片保存成功',
												icon: 'success',
												duration: 2000
											});
										},
										fail: (err) => {
											console.log('图片保存失败', err);
											uni.showToast({
												title: '图片保存失败',
												icon: 'none',
												duration: 2000
											});
										}
									});
								} else {
									console.log('图片下载失败');
									uni.showToast({
										title: '图片下载失败',
										icon: 'none',
										duration: 2000
									});
								}
							},
							fail: (err) => {
								console.log('图片下载失败', err);
								uni.showToast({
									title: '图片下载失败',
									icon: 'none',
									duration: 2000
								});
							}
						});
					};
					reader.readAsDataURL(file);
				} catch (error) {
					console.error('保存页面为图片出错:', error);
					uni.showToast({
						title: '保存页面为图片出错',
						icon: 'none',
						duration: 2000
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
			// width: 166rpx !important;
			// height: 168rpx !important;
			// padding: 0;
			// position: absolute;
			// top: 195rpx;
			// left: 31rpx;
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

							float: left;
						}

						&_r {
							float: left;
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