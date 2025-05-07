<template>
	<view class="slide_item">
		<!--
		注意：这是 H5、微信小程序界面，请勿和 new_index.nvue、index.nvue 混用
		 
		1. new_index.nvue、index.nvue这两个是App页面
		 
		2. 另外：data.js 是上一版本留下的假数据，这一版改成了 URL 请求了（如不需要可以删除，也可作为后端请求参考）
		 
		3. 请各位大神多多留手，我已经把请求内存开到最大了
		 
		4. 视频 id 切记是字符串类型 
		 -->
		<view class="status_bar">
			<!-- 状态栏占位 -->
		</view>
		<!-- 导航栏 -->
		<view class="tabs-container">
			<view v-for="(tab, index) in tabList" :key="index" @tap="tabsOn(index)" :class="{ active: tabsId === index }" class="tab">
				{{ tab.title }}
				<view class="line" v-if="tabsId === index"></view>
			</view>
		</view>
		<!-- 视频 -->
		<view>
			<swiper @change="slideOn" :current="tabsId" style="flex-grow: 1; height: calc(100vh - 50rpx)">
				<swiper-item v-for="(tab, indexs) in contentList" :key="indexs">
					<view v-if="indexs != 3" class="slide_one">{{ tab.content }}</view>
					<view v-if="indexs === tabsId">
						<swiper
							class="swiper"
							@change="changefun"
							@animationfinish="animationfinishfun"
							:current="current"
							:circular="false"
							:vertical="true"
						>
							<block v-if="PayVideo">
								<swiper-item v-for="(item, indexes) in PayVideo" :key="item.id">
									<view class="swiper-item uni-bg-black">
										<video
											v-if="indexes == current"
											class="video"
											:id="'id' + indexes"
											:src="item.part_url"
											:custom-cache="false"
											:controls="true"
											:show-progress="true"
											:initial-time="0"
											:show-loading="true"
											:show-mute-btn="true"
											:loop="true"
											:autoplay="true"
											:muted="false"
											:play-strategy="2"
											:object-fit="'contain'"
											:direction="90"
											:enable-progress-gesture="false"
											:show-center-play-btn="false"
											vslide-gesture-in-fullscreen
											:play-btn-position="'center'"
											:show-play-btn="true"
											:mobilenet-hint-type="1"
										></video>
									</view>
								</swiper-item>
							</block>
						</swiper>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 侧边栏 -->

		<view class="toolbar mb1r" v-if="tabsId === 3">
			<view class="avatar-ctn mb2r">
				<img class="avatar" src="/static/28.png" alt="" />
				<transition name="fade">
					<view class="options">
						<img class="no" src="/static/add-light.png" alt="" />
						<img class="yes" src="/static/ok-red.png" alt="" />
					</view>
				</transition>
			</view>
			<view class="love mb2r">
				<view>
					<!-- <u-icon name="heart" color="#fff" size="40"></u-icon> -->
				</view>
				<span>{{ formatNumbers(64) }}</span>
			</view>
			<view class="message mb2r">
				<!-- <u-icon name="chat" color="#fff" size="40"></u-icon> -->
				<span>{{ formatNumbers(1250) }}</span>
			</view>
			<view class="message mb2r">
				<!-- <u-icon name="star" color="#fff" size="40"></u-icon> -->
				<span>{{ formatNumbers(6450000) }}</span>
			</view>
			<view class="share mb2r">
				<!-- <u-icon name="share" color="#fff" size="40"></u-icon> -->
				<span>{{ formatNumbers(999999) }}</span>
			</view>
		</view>

		<!-- 作者加视频简介 -->
		<view class="desbar" v-if="tabsId === 3">
			<view class="text">@路易十三</view>
			<view class="text2">
				#玫瑰豌豆黄
				据《中国历代御膳大观》记载，豌豆糕在清初传入北京，经改良制作改名叫豌豆黄，成燕京著名小吃，于是有了“从来食物属燕京，豌豆黄儿久著名，红枣都嵌金居里，十文一块买黄琼”之说。#寻找古籍守护人
				#全民晒书
			</view>
		</view>
	</view>
</template>

<script>
import { _formatNumber, cloneDeep } from '@/utils'
const { RECORDS } = require('@/static/f_movie_collect_parts.json')
let audo = uni.createInnerAudioContext()
audo.loop = true
export default {
	data() {
		return {
			tabList: [
				{
					title: '关注',
					index: 0
				},
				{
					title: '热点',
					index: 1
				},
				{
					title: '同城',
					index: 2
				},
				{
					title: '推荐',
					index: 3
				}
			],
			contentList: [
				{
					content: '我是关注页面'
				},
				{
					content: '我是热点页面'
				},
				{
					content: '我是同城页面'
				},
				{
					content: ''
				}
			],
			tabsId: 3,
			PayVideo: [],
			videoData: {},
			videoList: [],
			description: '',
			current: 0,
			index_: 0,
			videoContext: '',
			duration: '' //总视频时长
		}
	},
	mounted() {
		this.videoList = RECORDS
		console.log('this.videoList::::::::', this.videoList)
		this.getVideoInfo()
	},
	methods: {
		formatNumbers(val) {
			return _formatNumber(val)
		},
		slideOn(e) {
			this.tabsId = e.detail.current
			// let videoContext = uni.createVideoContext('id' + this.current)
			// videoContext.pause() //停止播放
			this.dataList[this.k].state = 'pause'
			uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this).pause()
		},
		tabsOn(index) {
			this.tabsId = index
		},
		getVideoInfo() {
			const data = {
				id: 1
			}
			this.videoData = data
			this.id = data.id
			// uni.setNavigationBarTitle({
			// 	title: this.videoData.title
			// })
			// this.description = this.videoData.desc
			this.PayVideo = this.videoList //上下滑动总数据
			this.current = this.PayVideo.findIndex((item) => {
				return Number(item.id) === data.id
			})
			// this.duration = res.data.data.videoTime
			// 自动播放当前视频
			this.$nextTick(function () {
				let videoContext = uni.createVideoContext('id' + this.current)
				console.log('index----', videoContext)
			})
			// let data = {
			// 	id
			// }
			// this.yrApi.request('Zuopin/getVideoById', 'POST', data).then(res => {
			// 	if (res.data.code == 0) {
			// 		this.videoData = res.data.data;
			// 		this.id = res.data.data.id
			// 		// uni.setNavigationBarTitle({
			// 		// 	title: this.videoData.title
			// 		// })
			// 		this.description = this.videoData.desc
			// 		this.PayVideo = this.videoList //上下滑动总数据
			// 		this.current = this.PayVideo.findIndex((item) => {
			// 			return item.id === res.data.data.id
			// 		})
			// 		this.duration = res.data.data.videoTime
			// 		// 自动播放当前视频
			// 		this.$nextTick(function() {
			// 			let videoContext = uni.createVideoContext('id' + this.current)
			// 			console.log("index----", videoContext)
			// 			setTimeout(() => {
			// 				videoContext.play()
			// 			}, 500)
			// 		})
			// 	} else {
			// 		uni.showToast({
			// 			title: res.msg,
			// 			icon: 'none'
			// 		})
			// 		// setTimeout(()=>{
			// 		// 	uni.redirectTo({
			// 		// 		url:'/pages/index/index?index=2'
			// 		// 	})
			// 		// },1500)
			// 	}
			// })
		},
		// current改变时会触发change 事件
		changefun(e) {
			let current = e.detail.current
			// uni.setNavigationBarTitle({
			// 	title: this.PayVideo[current].title
			// })
			// if (this.PayVideo[current].desc) {
			// 	this.description = this.PayVideo[current].desc
			// }
			// this.duration = this.PayVideo[current].videoTime
			let videoContext = uni.createVideoContext('id' + this.current)
			videoContext.pause() //停止播放
		},
		// 动画结束时触发
		animationfinishfun(e) {
			let current = e.detail.current
			let videoContext = uni.createVideoContext('id' + this.current)
			videoContext.pause() //停止播放非当前视频
			videoContext = uni.createVideoContext('id' + current)
			videoContext.play() //开始播放当前视频
			this.current = current //保存当前下标 播放下一个视频时停止上一个视频 防止声音重复
		},
		fullscreenchange(e, v) {
			console.log('e::::::::::', e)
		}
	}
}
</script>

<style scoped lang="scss">
.slide_item {
	width: 100%;
	height: 100%;
}

.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}

.tabs-container {
	display: flex;
	justify-content: center;
	padding: 24rpx;
	position: absolute;
	text-align: center;
	z-index: 999;
	width: 100%;

	.tab {
		padding: 26rpx 20rpx;
		color: #ccc;
		font-size: 34rpx;
		font-weight: 600;
		position: relative;
	}

	.active {
		color: #fff;
	}

	.line {
		width: 64rpx;
		height: 6rpx;
		background: #fff;
		position: absolute;
		bottom: 16rpx;
		border-radius: 6rpx;
	}
}

.slide_one {
	background: dimgrey;
	height: 100%;
	line-height: 44px;
	padding: 600rpx 0 0 0;
	text-align: center;
	color: #fff;
	font-size: 60rpx;
}

.swiper {
	height: 100vh;

	.swiper-item {
		height: 100vh;
		position: relative;
	}

	.uni-bg-black {
		background: black;
	}
}

.video {
	width: 100%;
	height: calc(100vh - 50rpx);
}

.toolbar {
	position: absolute;
	bottom: 70rpx;
	right: 20rpx;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;

	.avatar-ctn {
		position: relative;

		.avatar {
			width: 90rpx;
			height: 90rpx;
			border: 6rpx solid white;
			border-radius: 50%;
		}

		.options {
			position: absolute;
			border-radius: 50%;
			margin: auto;
			left: 0;
			right: 0;
			bottom: -15rpx;
			background: red;
			//background: black;
			width: 36rpx;
			height: 36rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: all 1s;

			img {
				position: absolute;
				width: 28rpx;
				height: 28rpx;
				transition: all 1s;
			}

			.yes {
				opacity: 0;
				transform: rotate(-180deg);
			}

			&.attention {
				background: white;

				.no {
					opacity: 0;
					transform: rotate(180deg);
				}

				.yes {
					opacity: 1;
					transform: rotate(0deg);
				}
			}
		}
	}

	.love,
	.message,
	.share {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 40rpx;
	}

	.loved {
		background: red;
	}
}

.desbar {
	position: absolute;
	bottom: 70rpx;
	left: 20rpx;
	color: #fff;
	display: flex;
	flex-direction: column;

	.text {
		font-size: 36rpx;
		font-weight: 500;
		margin-bottom: 10rpx;
	}

	.text2 {
		width: 80%;
	}
}
</style>
