<template>
	<!-- <lime-painter /> -->
	<l-painter css="width: 750rpx;height:2000rpx;" @fail="fail" @done="done" pathType="url" ref="poster" performance>
		<l-painter-view css="margin-top:100rpx;display: flex;justify-content: center;align-items: center;">
			<l-painter-image src="/static/share/img_haibao1.png"
				css="width: 90%;height: 1132rpx;color:#fff;object-fit: cover;" />
			<l-painter-view
				css="height: 410rpx;border-radius: 8rpx;width: 82%;position: absolute;top: 660rpx;left:68rpx;background: linear-gradient(180deg, #F9F5F5 0%, #FFE1CE 100%);">
				<l-painter-view css="display: flex;justify-content: center;align-items: center;text-align:right;">
					<l-painter-view css="flex: 1;margin-top: 46rpx;display:flex;">
						<l-painter-image src="/static/share/icon.png"
							css="margin:0 20rpx 0 24rpx;width: 84rpx;height: 84rpx;border-radius: 50%;border: 2rpx solid rgba(255, 157, 100, 1);"></l-painter-image>
						<l-painter-view css="color:#A9492A;float:left;">
							<l-painter-text css="font-weight: 500;font-size: 26rpx;display:block;margin-bottom:10rpx;"
								text="大门牙胖仔"></l-painter-text>
							<l-painter-text css="font-weight: 500;font-size: 22rpx;"
								text="189****1312"></l-painter-text>
						</l-painter-view>
					</l-painter-view>
					<l-painter-view css="flex: 1;">
						<l-painter-image src="/static/share/img_jinbi.png"
							css="width: 170rpx;height: 114rpx;margin: 20rpx 40rpx 0 0;" />
					</l-painter-view>
				</l-painter-view>

				<l-painter-view css="display: flex;margin-top: 20rpx;">
					<l-painter-view
						css="background-position: center;width: 180rpx;height: 180rpx;margin: 24rpx 88rpx 0 24rpx;background-repeat: no-repeat;">
						<l-painter-qrcode css="width: 202rpx;height: 202rpx;padding: 6rpx;"
							text="9BFC4502C50814351A7633BF3B20FBD63256E88747374DFA19F925CB00E87411"></l-painter-qrcode>
					</l-painter-view>
					<l-painter-view css="text-align: center;">
						<l-painter-view css="display: flex;margin: 46rpx 0 14rpx 0rpx;">
							<l-painter-image src="/static/share/img_shou.png" css="width: 64rpx;height: 42rpx;margin-right:10rpx;" />
							<l-painter-text css="margin-top: 6rpx;display:block;" text="扫码一起赚钱"></l-painter-text>
						</l-painter-view>
						<l-painter-view css="font-weight: 500;font-size: 32rpx;margin-top:-90rpx;">
							<l-painter-text css="font-weight: 500;font-size: 32rpx;display:block;margin-bottom:10rpx;" text="加入51积分"></l-painter-text>
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
		data() {
			return {

			};
		},
		onShow() {
			console.log(1111111111111)
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
						this.picture2 = res.tempFilePath
						this.saveImage()
					},
					fail(e) {
						console.log('???????????', e)
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>