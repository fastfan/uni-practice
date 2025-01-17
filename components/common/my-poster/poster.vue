<template>
	<!-- <lime-painter /> -->
	<l-painter css="width: 750rpx;height:1092rpx;background-color: transparent;" @fail="fail" @done="done" pathType="url"
		ref="poster" performance>
		<l-painter-view css="margin-top:100rpx;display: flex;justify-content: center;align-items: center;">
			<l-painter-image :src="painterProps.imageUrl" css="width: 88%;height: 1092rpx;color:#fff;" />
			<l-painter-view
				:css="{backGround: painterProps.background,height: '410rpx',borderRadius: '8rpx',width: '80%',position: 'absolute',top: '640rpx',left:'72rpx',backdropFilter: 'blur(20rpx)'}">
				<l-painter-view css="display: flex;justify-content: center;align-items: center;text-align:right;">
					<l-painter-view css="flex: 1;margin-top: 46rpx;display:flex;">
						<l-painter-image src="/static/share/icon.png"
							:css="{margin:'0 20rpx 0 24rpx',width: '84rpx',height: '84rpx',borderRadius: '50%',border:painterProps.borderStyle}"></l-painter-image>
						<l-painter-view :css="{color: painterProps.textColor}">
							<l-painter-text css="font-weight: 500;font-size: 26rpx;display:block;margin-bottom:10rpx;"
								:text="painterProps.userName"></l-painter-text>
							<l-painter-text css="font-weight: 500;font-size: 22rpx;" :text="painterProps.phone"></l-painter-text>
						</l-painter-view>
					</l-painter-view>
					<l-painter-view css="flex: 1;">
						<l-painter-image src="/static/share/img_jinbi.png"
							css="width: 170rpx;height: 114rpx;margin: 20rpx 40rpx 0 0;" />
					</l-painter-view>
				</l-painter-view>

				<l-painter-view css="display: flex;margin-top: 20rpx;">
					<l-painter-view
						:css="{backgroundImage:`url(${painterProps.qrCodePic})`,backgroundPosition:'center',width: '180rpx',height: '180rpx',margin: '24rpx 58rpx 0 24rpx'}">
						<l-painter-qrcode css="width: 166rpx;height: 168rpx;padding: 6rpx;"
							text="9BFC4502C50814351A7633BF3B20FBD63256E88747374DFA19F925CB00E87411"></l-painter-qrcode>
					</l-painter-view>
					<l-painter-view css="text-align: center;">
						<l-painter-view css="display: flex;margin: 36rpx 0 14rpx 0rpx;">
							<l-painter-image src="/static/share/img_shou.png" css="width: 64rpx;height: 42rpx;margin-right:10rpx;" />
							<l-painter-text css="margin-top: 6rpx;display:block;" text="扫码一起赚钱"></l-painter-text>
						</l-painter-view>
						<l-painter-view :css="{color: painterProps.textColor,fontWeight: 500,fontSize: '32rpx',marginTop:'-95rpx'}">
							<l-painter-text css="font-weight: 500;font-size: 32rpx;display:block;margin-bottom:5rpx;"
								text="加入51积分"></l-painter-text>
							<l-painter-text css="font-weight: 500;font-size: 32rpx;" text="尊享赚钱项目"></l-painter-text>
						</l-painter-view>
					</l-painter-view>
				</l-painter-view>
			</l-painter-view>
		</l-painter-view>
	</l-painter>
</template>

<script>
	export default {
		props: {
			painterProps: {
				type: Object,
				default: () => {
					return {
						imageUrl: '',
						class: '',
						textColor: "",
						borderStyle: '',
						qrCodePic: '',
						userName: '',
						phone: ''
					}
				}
			}
		},
		data() {
			return {
				picture: ""
			};
		},
		onShow() {

		},
		methods: {
			fail(v) {
				console.log(v)
			},
			done(v) {
				console.log('绘制完成:')
			},
			save() {
				this.$refs.poster.canvasToTempFilePathSync({
					fileType: 'jpg',
					quality: 1,
					success: (res) => {
						console.log(res.tempFilePath)
						this.picture = res.tempFilePath
						this.$store.dispatch('updateSharedData', res.tempFilePath)
						uni.showLoading({
							title: "正在保存图片"
						})
						this.saveImage()
						// wx.showShareImageMenu({
						// 	path: res.tempFilePath
						// })
					},
					fail(e) {
						console.log('???????????', e)
					}
				})
			},
			saveImage() {
				// #ifndef H5
				try {
					uni.saveImageToPhotosAlbum({
						filePath: this.picture,
						success(res) {
							uni.hideLoading()
							uni.showToast({
								title: '已保存到相册',
								icon: 'success',
								duration: 2000
							});
						},
						fail(err) {
							uni.hideLoading()
							uni.getSetting({
								success(res) {
									if (!res.authSetting['scope.writePhotosAlbum']) {
										uni.showModal({
											title: '提示',
											content: `图片保存失败，请前往设置页面允许保存相册`,
											confirmColor: '#8C5CDD',
											success: function(res) {
												if (res.confirm) {
													uni.openSetting({
														success(res) {
															console.log('用户打开设置页面');
															// 可在此处再次检查权限设置，若已授权则进行保存图片操作
														}
													});
												} else if (res.cancel) {
													uni.showToast({
														icon: 'none',
														title: '取消'
													});
												}
											}
										});
									}
								}
							});
						}
					});
				} catch (error) {
					console.error('保存页面为图片出错:', error);
					uni.showToast({
						title: '保存页面为图片出错',
						icon: 'none',
						duration: 2000
					});
				}

				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>