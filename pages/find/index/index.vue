<template>
	<!-- <lime-painter /> -->
	<poster-model :painterProps="posterList[currentIndex]"></poster-model>
</template>

<script>
	import PosterModel from "@/components/common/my-poster/poster.vue"
	export default {
		components: {
			PosterModel
		},
		data() {
			return {
				currentIndex: 0,
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
						uni.showLoading({
							title: "正在保存图片"
						})
						this.saveImage()
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
							console.log('图片保存失败', err);
							uni.showToast({
								title: '图片保存失败',
								icon: 'none',
								duration: 2000
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

<style lang="scss">

</style>