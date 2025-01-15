<template>
	<view :class="{ hide: hide }">
		<canvas :id="canvasId" :canvas-id="canvasId" type="2d" :style="{ width: width + 'px', height: height + 'px' }"
			@error="canvasIdErrorCallback"></canvas>
	</view>
</template>
<script>
	import {
		xmlParse,
		Widget,
		Draw,
		selectNodesRefInfo,
		renderToCanvas,
		canvasToTempFilePath,
		saveImageToPhotosAlbum
	} from './libs/index.js';
	export default {
		props: {
			hide: {
				//canvas是否可见
				type: Boolean,
				default: true
			},
			width: {
				type: Number,
				default: 300
			},
			height: {
				type: Number,
				default: 300
			},
			xWxml: {
				type: String,
				default: ''
			},
			xStyle: {
				type: Object,
				default: () => {
					return {};
				}
			},
			useCORS: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				canvasId: 'canvas',
				timeId: null
			};
		},
		methods: {
			canvasIdErrorCallback(err) {
				console.log('canvasIdErrorCallback', err);
			},
			renderToCanvas() {
				const {
					ctx,
					canvas,
					useCORS,
					xWxml,
					xStyle
				} = this;
				if (!ctx || !canvas) {
					return uni.showToast({
						title: 'canvas获取失败',
						icon: 'none'
					})
				}
				uni.showLoading({
					title: '生成中'
				})
				return new Promise((resolve, reject) => {
					renderToCanvas({
						ctx,
						canvas,
						useCORS,
						xWxml,
						xStyle
					}).then(res => {
						uni.hideLoading()
						this.boundary = {
							top: res.layoutBox.top,
							left: res.layoutBox.left,
							width: res.computedStyle.width,
							height: res.computedStyle.height
						};
						resolve(res)
					}).catch(err => {
						uni.hideLoading()
						uni.showToast({
							title: '生成失败，稍后重试',
							icon: 'none'
						})
						reject(new Error('canvasToTempFilePath: renderToCanvas 执行失败'))
					});
				});
			},
			canvasToTempFilePath() {
				const {
					canvas,
					canvasId,
					boundary
				} = this;
				if (!boundary) {
					return Promise.reject(new Error('canvasToTempFilePath: renderToCanvas 函数未执行'));
				}
				const {
					top,
					left,
					width,
					height
				} = boundary;
				let _this = this;
				return new Promise((resolve, reject) => {
					canvasToTempFilePath({
						top,
						left,
						width,
						height,
						canvasId,
						canvas
					}).then(res => {
						resolve(res);
					}).catch(err => {
						reject(new Error('canvasToTempFilePath: canvasToTempFilePath 执行失败'))
					});
				});
			},
			getCanvasImage() {
				let _this = this;
				return new Promise((resolve, reject) => {
					_this.renderToCanvas().then(async res => {
						resolve(await _this.canvasToTempFilePath())
					}).catch(err => {
						reject(new Error('canvasToTempFilePath: getCanvasImage 执行失败'))
					})
				});
			},
			saveImageToPhotosAlbum(path, filename, callback) {
				saveImageToPhotosAlbum(path, filename, callback)
			},
			async initCanvasBaseInfo(n = 0) {
				if (this.canvasId) {
					this.timeId && clearTimeout(this.timeId)
					const res = await selectNodesRefInfo(`#${this.canvasId}`, this);
					const {
						canvas,
						ctx,
						width,
						height
					} = res;
					// #ifdef APP-PLUS
					const dpr = 1;
					// #endif
					// #ifdef H5 || MP
					const dpr = uni.getSystemInfoSync().pixelRatio;
					// #endif
					canvas.width = width * dpr;
					canvas.height = height * dpr;
					ctx.scale(dpr, dpr);
					this.canvas = canvas;
					this.ctx = ctx;
				} else {
					if (n > 3) {
						this.timeId && clearTimeout(this.timeId)
						console.error('initCanvasBaseInfo canvasId获取失败', n);
						return
					}
					this.timeId = setTimeout(() => {
						this.initCanvasBaseInfo()
						n++;
					}, 500)
				}

			}
		},
		mounted() {
			this.$nextTick(() => {
				// #ifdef APP-PLUS || H5 || MP
				this.initCanvasBaseInfo()
				// #endif
				// #ifndef APP-PLUS || H5 || MP
				uni.showToast({
					title: '暂未兼容',
					icon: 'none'
				})
				// #endif
			});
		},
		onLoad() {

		}
	};
</script>

<style scoped lang="scss">
	.hide {
		position: fixed;
		left: -800rpx;
	}
</style>
