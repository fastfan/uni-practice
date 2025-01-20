<template>
	<view class="slide_item">
		<!--
		注意：这是 H5、微信小程序界面，请勿和 new_index.nvue、index.nvue 混用
		 
		1. new_index.nvue、index.nvue这两个是App页面
		 
		2. 另外：data.js 是上一版本留下的假数据，这一版改成了 URL 请求了（如不需要可以删除，也可作为后端请求参考）
		 
		3. 请各位大神多多留手，我已经把请求内存开到最大了
		 
		4. 视频 id 切记是字符串类型 
		 -->
		<!-- <view class="status_bar"> -->
		<!-- 状态栏占位 -->
		<!-- </view> -->
		<!-- 导航栏 -->
		<view class="tabs-container">
			<view v-for="(tab, index) in tabList" :key="index" @tap="tabsOn(index)" :class="{ active: tabsId === index }"
				class="tab">{{ tab.title }}
				<view class="line" v-if="tabsId === index"></view>
			</view>
		</view>
		<!-- 视频 -->
		<view>
			<swiper @change="slideOn" :current="tabsId" style="flex-grow: 1;height:calc(100vh);">
				<swiper-item v-for="(tab, indexs) in contentList" :key="indexs">
					<view v-if="indexs!=3" class="slide_one">{{ tab.content }}
					</view>
					<view v-if="indexs === tabsId">
						<!-- #ifdef MP -->
						<swiper :style="'width: '+ windowWidth +'px; height: '+ windowHeight +'px; background-color: #000000;'"
							:vertical="true" @animationfinish="animationfinish" @change="change" :current="current"
							:indicator-dots="false" @touchstart="mpTouchstart" @touchend="mpTouchend">
							<swiper-item v-for="(list,index) in dataList" :key="index">
								<view v-if="Math.abs(k-index)<=1">
									<view>
										<!-- 
										1.v-if：用于控制视频在节点的渲染数
										2.muted的默认值是 false，代表默认是禁音视频的
										3.http-cache默认开启视频缓存
										4.poster（封面（方案一））：这里的封面默认处理存储在阿里云的视频
										5.show-loading：这里默认去掉播放转圈的标志
										v-if="Math.abs(k-index)<=1"
										 -->
										<video v-if="isShow" :id="list._id+''+index" :loop="true" :muted="list.isplay" :controls="false"
											:http-cache="true" :page-gesture="false" :show-fullscreen-btn="false" :show-loading="false"
											:show-play-btn="false" :show-center-play-btn="false" :enable-progress-gesture="false"
											:object-fit="'contain'" :src="list.src" @ended="ended" @click="tapVideoHover(list.state,$event)"
											@timeupdate="timeupdate($event,index)"
											:style="'width: '+ windowWidth +'px; height: '+ windowHeight +'px; background-color: #000000;'"></video>
										<!-- 
										1.这里是封面（方案二）：这里的封面可以自定义。
										2.也在代码中做了批注，两种方案可以共存，不会相互影响。
										-->
										<image v-if="!list.playIng" :src="list.src+'?x-oss-process=video/snapshot,t_100,f_jpg'"
											:style="'width: '+ windowWidth +'px; height: '+ windowHeight +'px; position: absolute;'"
											mode="aspectFit">
										</image>
									</view>
									<!-- 播放状态：pause 的时候就会暂停 -->
									<view class="videoHover" @click="tapVideoHover(list.state,$event)">
										<image v-if="list.state=='pause'" class="playState" src="@/static/img/index/play.png"></image>
									</view>
									<view class="userInfo">
										<!-- 1.头像 -->
										<image @click="tozuozhe" class="userAvatar" :src="list.href" mode="aspectFill">
										</image>
										<!-- 2.点赞 -->
										<view @click="cLike(list.like);"
											style="opacity: 0.9; margin-top: 17px;display: flex;justify-content: center;">
											<image v-if="list.like" src="@/static/img/index/xin.png"
												style="width: 40px; height: 40px; position: absolute; right: 6px;">
											</image>
											<image v-if="!list.like" src="@/static/img/index/xin-2.png"
												style="width: 40px; height: 40px; position: absolute; right: 6px;">
											</image>
											<text
												style="color: #FFFFFF; margin-top: 5px; font-size: 14px; text-align: center; margin-top: 40px; font-weight: bold;"
												:class="{'likeNumActive':list.like}">{{list.like_n}}</text>
										</view>
										<!-- 3.评论 -->
										<view class="comment" @click="toComment(index)"
											style="opacity: 0.9; margin-top: 17px;display: flex;justify-content: center;">
											<image src="@/static/img/index/liaotian-2.png"
												style="width: 35px; height: 35px; position: absolute; right: 7px;">
											</image>
											<text
												style="color: #FFFFFF; margin-top: 5px; font-size: 14px; font-weight: bold; text-align: center; margin-top: 40px;">{{list.sms_n}}</text>
										</view>
										<!-- 4.分享 -->
										<view @click="share" style="opacity: 0.9; margin-top: 17px;display: flex;justify-content: center;">
											<image src="@/static/img/index/share-fill.png"
												style="width: 40px; height: 40px; position: absolute; right: 5px;">
											</image>
											<text
												style="color: #FFFFFF; margin-top: 5px; font-size: 14px; text-align: center; font-weight: bold; margin-top: 40px;">分享</text>
										</view>
									</view>
									<!-- 最底下的文字部分 -->
									<view class="content">
										<text class="userName"
											:style="'width: '+ (windowWidth - 90) +'px;'">{{list.title}}</text><!-- i={{i}} -->
										<text class="words"
											:style="'width: '+ (windowWidth - 90) +'px;'">{{list.msg}}-{{k+1}}</text><!-- k={{k}} -->
									</view>
									<!-- 进度条 -->
									<view v-if="k === index" @touchstart.native.stop="touchstart" @touchmove.native.stop="touchmove"
										@touchend.native.stop="touchend"
										:style="'width: '+ (windowWidth - (windowWidth*0.10)) +'px; margin-left: '+ (windowWidth * 0.05) +'px; height: 40px; position: absolute; bottom: 0;'">
										<!-- 不拖动情况下 -->
										<view>
											<!-- 1.底部背景进度条 -->
											<view
												:style="'width: '+ (windowWidth - (windowWidth*0.10)) +'px;position: absolute; margin-top: 36px; height: 2px; border-radius: 10px; background-color: #999999; opacity: 0.6;'">
											</view>
											<!-- 2.播放的进度条 -->
											<view v-if="!isTouch"
												:style="'width: '+ ((windowWidth - (windowWidth*0.10)) * progressBarPercent) +'px; position: absolute; margin-top: 36px; height: 2px; border-radius: 10px; background-color: #e6e4e7; '">
												<view class="slider_squre"
													:style="'left: ' + ((windowWidth - 5 - (windowWidth*0.10)) * progressBarPercent) +'px'">
												</view>
											</view>
											<view v-if="isTouch"
												:style="'width: '+ (videoStartPositon + addPositon) +'px; position: absolute; margin-top: 36px; height: 10px; border-radius: 10px; background-color: #e6e4e7; '">
												<view class="slider_squre2" :style="'left: ' + (videoStartPositon + addPositon - 5) +'px'">
												</view>
											</view>
										</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<swiper :style="'width: '+ windowWidth +'px; height: '+ windowHeight +'px; background-color: #000000;'"
							:vertical="true" @animationfinish="animationfinish" @change="change" :current="current"
							:indicator-dots="false" :duration="duration">
							<swiper-item v-for="(list,index) in dataList" :key="index">
								<view v-if="Math.abs(k-index)<=1">
									<view>
										<!-- 
										1.v-if：用于控制视频在节点的渲染数
										2.muted的默认值是 false，代表默认是禁音视频的
										3.http-cache默认开启视频缓存
										4.poster（封面（方案一））：这里的封面默认处理存储在阿里云的视频
										5.show-loading：这里默认去掉播放转圈的标志
										v-if="Math.abs(k-index)<=1"
										 -->
										<video v-if="isShow" :id="list._id+''+index" :loop="true" :muted="list.isplay" :controls="false"
											:http-cache="true" :page-gesture="false" :show-fullscreen-btn="false" :show-loading="false"
											:show-center-play-btn="false" :enable-progress-gesture="false" :src="list.src" @ended="ended"
											@click="tapVideoHover(list.state,$event)" @timeupdate="timeupdate($event,index)"
											:style="'width: '+ windowWidth +'px; height: '+ windowHeight +'px; background-color: #000000;'"></video>
										<!-- 
										1.这里是封面（方案二）：这里的封面可以自定义。
										2.也在代码中做了批注，两种方案可以共存，不会相互影响。
										-->
										<image v-if="!list.playIng" :src="list.src+'?x-oss-process=video/snapshot,t_100,f_jpg'"
											:style="'width: '+ windowWidth +'px; height: '+ windowHeight +'px; position: absolute;'"
											mode="aspectFit">
										</image>
									</view>
									<!-- 播放状态：pause 的时候就会暂停 -->
									<view class="videoHover" @click="tapVideoHover(list.state,$event)"
										:style="'width: '+ windowWidth +'px; height: '+ windowHeight +'px;'">
										<image v-if="list.state=='pause'" class="playState" src="@/static/img/index/play.png"></image>
									</view>
									<view class="userInfo">
										<!-- 1.头像 -->
										<image @click="tozuozhe" class="userAvatar" :src="list.href" mode="aspectFill">
										</image>
										<!-- 2.点赞 -->
										<view @click="cLike(list.like);"
											style="opacity: 0.9; margin-top: 17px;display: flex;justify-content: center;">
											<image v-if="list.like" src="@/static/img/index/xin.png"
												style="width: 40px; height: 40px; position: absolute; right: 6px;">
											</image>
											<image v-if="!list.like" src="@/static/img/index/xin-2.png"
												style="width: 40px; height: 40px; position: absolute; right: 6px;">
											</image>
											<text
												style="color: #FFFFFF; margin-top: 5px; font-size: 14px; text-align: center; margin-top: 40px; font-weight: bold;"
												:class="{'likeNumActive':list.like}">{{list.like_n}}</text>
										</view>
										<!-- 3.评论 -->
										<view class="comment" @click="toComment(index)"
											style="opacity: 0.9; margin-top: 17px;display: flex;justify-content: center;">
											<image src="@/static/img/index/liaotian-2.png"
												style="width: 35px; height: 35px; position: absolute; right: 7px;">
											</image>
											<text
												style="color: #FFFFFF; margin-top: 5px; font-size: 14px; font-weight: bold; text-align: center; margin-top: 40px;">{{list.sms_n}}</text>
										</view>
										<!-- 4.分享 -->
										<view @click="share" style="opacity: 0.9; margin-top: 17px;display: flex;justify-content: center;">
											<image src="@/static/img/index/share-fill.png"
												style="width: 40px; height: 40px; position: absolute; right: 5px;">
											</image>
											<text
												style="color: #FFFFFF; margin-top: 5px; font-size: 14px; text-align: center; font-weight: bold; margin-top: 40px;">分享</text>
										</view>
										<view @click="dealVoice" style="margin-top: 17px;">
											<view style="width: 48px; height: 48px; border-radius: 50px; position: absolute; right: 2.5px;">
												<image
													:style="'width: 48px; height: 48px; border-radius: 50px; transform: rotate('+ rotates +'deg);'"
													src="@/static/img/index/bfq.png" mode="aspectFill"></image>
												<image v-if="showPlay"
													:style="'width: 30px; height: 30px; margin-top: 9px; margin-left: 9px; position: absolute; border-radius: 50px; transform: rotate('+ rotates +'deg);'"
													:src="list.href" mode="aspectFill"></image>
											</view>
										</view>
									</view>
									<!-- 最底下的文字部分 -->
									<view class="content">
										<text class="userName"
											:style="'width: '+ (windowWidth - 90) +'px;'">{{list.title}}</text><!-- i={{i}} -->
										<text class="words"
											:style="'width: '+ (windowWidth - 90) +'px;'">{{list.msg}}-{{k+1}}</text><!-- k={{k}} -->
									</view>
									<!-- 进度条 -->
									<view v-if="k === index" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"
										:style="'width: '+ (windowWidth - (windowWidth*0.10)) +'px; margin-left: '+ (windowWidth * 0.05) +'px; height: 40px; position: absolute; bottom: 10px;'">
										<!-- 不拖动情况下 -->
										<view>
											<!-- 1.底部背景进度条 -->
											<view
												:style="'width: '+ (windowWidth - (windowWidth*0.10)) +'px; margin-top: 18px; height: 5px; border-radius: 10px; background-color: #999999; opacity: 0.6;'">
											</view>
											<!-- 2.播放的进度条 -->
											<view v-if="!isTouch"
												:style="'width: '+ ((windowWidth - (windowWidth*0.10)) * progressBarPercent) +'px; position: absolute; margin-top: 18px; height: 5px; border-radius: 10px; background-color: #e6e4e7; '">
											</view>
											<!--  -->
											<view v-if="isTouch"
												:style="'width: '+ (videoStartPositon + addPositon) +'px; position: absolute; margin-top: 18px; height: 5px; border-radius: 10px; background-color: #e6e4e7; '">
											</view>
										</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
						<!-- #endif -->
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>

</template>

<script>
	import {
		_formatNumber,
		cloneDeep
	} from '@/utils'
	const {
		RECORDS
	} = require('@/static/f_movie_collect_parts.json')
	let audo = uni.createInnerAudioContext()
	audo.loop = true
	export default {
		data() {
			return {
				tabList: [{
						title: "关注",
						index: 0
					},
					{
						title: "热点",
						index: 1
					}, {
						title: "同城",
						index: 2
					},
					{
						title: "推荐",
						index: 3
					}
				],
				contentList: [{
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
				// PayVideo: [],
				// videoData: {},
				// videoList: [],
				// description: '',
				// current: 0,
				// index_: 0,
				// videoContext: '',
				// duration: '', //总视频时长
				windowWidth: 0,
				windowHeight: 0,
				platform: "",
				model: "",
				deleteHeight: 0,
				dataList: [],
				k: 0,
				oldVideo: "",
				voice: "",
				timeout: "",
				current: 0,
				boxStyle: { //视频，图片封面样式🌟💗
					'height': 0,
					'width': 0,
				},
				videoID: "",
				isShow: false,
				showPlay: false, //转轮显示控制
				rotates: 0, //转轮旋转角度
				rotateTime: "", //转轮递归事件控制
				xrotats: "",

				mpcleartime: "",
				isClick: false,
				changeTimeout: "",
				mptime: 0,
				mpstartTime: 0,
				duration: 500,
				// -- 进度条相关 -- start
				videoStartPositon: 0,
				progressBarPercent: 0,
				touchStartPosition: 0,
				addPositon: 0,
				timeduration: 0,
				isTouch: false,
				// -- 进度条相关 -- end
			}
		},
		watch: {
			async k(k, old_k) {
				console.log(k, old_k)
				this.progressBarPercent = 0;
				// #ifndef MP
				this.clearToTime();
				// #endif
				this.isShow = false
				this.dataList[old_k].playIng = false //如果视频暂停，就加载封面
				this.dataList[old_k].isplay = true
				this.dataList[old_k].state = 'pause'
				console.log('预留第' + (old_k + 1) + '个视频：' + this.dataList[old_k]._id + '' + old_k)
				// 2.0版本已经去掉了下面这一句，视频不用暂停，只需要把声音禁止就行
				uni.createVideoContext(this.dataList[old_k]._id + '' + old_k, this)
					.stop() //如果视频暂停，那么旧视频停止，这里的this.dataList[old_k]._id + '' + old_k，后面加 old_k 是为了每一个视频的 id 值不同，这样就可以大程度的避免串音问题
				console.log('已经暂停 --> 第' + (old_k + 1) + '个视频～') //提示
				this.dataList[k].state = 'play'
				this.isShow = true
				this.xrotats = setTimeout(() => {
					this.showPlay = true;
					// #ifndef MP
					this.rotateX();
					// #endif
				}, 200)
				// #ifdef MP
				// 如果是小程序端
				clearTimeout(this.changeTimeout);
				this.dataList[k].isplay = false
				setTimeout(() => {
					this.dataList[k].playIng = true
				}, 250)
				if (this.mptime < 0.2) {
					this.changeTimeout = setTimeout(() => {
						uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this).play()
					}, 1400)
				} else {
					uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this).play()
				}
				// #endif
				// #ifdef H5
				this.dataList[k].isplay = true
				audo.src = this.dataList[k].src
				if (this.isClick) {
					setTimeout(() => {
						if (typeof WeixinJSBridge == "undefined") {
							setTimeout(() => {
								audo.play()
								uni.createVideoContext(this.dataList[k]._id + '' + k, this).seek(0)
								uni.createVideoContext(this.dataList[k]._id + '' + k, this).play()
								setTimeout(() => {
									this.dataList[k].playIng = true
								}, 650)
							}, 500)
						} else {
							WeixinJSBridge.invoke('getNetworkType', {}, e => {
								setTimeout(() => {
									audo.play()
									uni.createVideoContext(this.dataList[k]._id + '' + k, this)
										.seek(0)
									uni.createVideoContext(this.dataList[k]._id + '' + k, this)
										.play()
									setTimeout(() => {
										this.dataList[k].playIng = true
									}, 850)
								}, 200)
							})
						}
					}, 200)
				} else {
					audo.pause()
					this.dataList[k].state = 'pause'
					uni.createVideoContext(this.dataList[k]._id + '' + k, this).seek(0)
					uni.createVideoContext(this.dataList[k]._id + '' + k, this).pause()
				}
				// #endif
				var p = k + 1;
				console.log('预加载第' + (p + 1) + '个视频：' + this.dataList[p]._id + '' + p)
			}
		},
		mounted() {
			this.platform = uni.getSystemInfoSync().platform
			this.model = uni.getSystemInfoSync().model
			var model = this.model
			if (this.platform == 'ios' && (model !== 'iPhone6' || model !== 'iPhone6s' || model !== 'iPhone7' || model !==
					'iPhone8')) {
				this.deleteHeight = 0 //有 tabbar的 修改这里可以改变视频高度
			}
			this.windowWidth = uni.getSystemInfoSync().windowWidth
			this.windowHeight = uni.getSystemInfoSync().windowHeight
			this.boxStyle.width = this.windowWidth + 'px' //给宽度加px
			this.boxStyle.height = this.windowHeight - this.deleteHeight; //有 tabbar的 修改这里可以改变视频高度
			this.get() //刚进入页面加载数据
			// #ifndef MP
			this.rotateX();
			// #endif
		},
		onShow() {
			console.log('回到前台');
			if (this.dataList.length !== 0) {
				// #ifdef MP
				this.dataList[this.k].state = 'play';
				uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this).play()
				// #endif
				// #ifdef H5
				if (this.isClick) {
					this.dataList[this.k].state = 'play';
					uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this).play()
					audo.play()
				}
				// #endif
			}
		},
		onHide() {
			// #ifdef MP
			this.dataList[this.k].state = 'pause';
			uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this).pause()
			// #endif
			// #ifdef H5
			if (this.isClick) {
				this.dataList[this.k].state = 'pause';
				uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this).pause()
				audo.pause()
			}
			// #endif
			console.log('到后台');
		},
		methods: {
			formatNumbers(val) {
				return _formatNumber(val)
			},
			slideOn(e) {
				this.tabsId = e.detail.current;
				// let videoContext = uni.createVideoContext('id' + this.current)
				// videoContext.pause() //停止播放
				if (this.tabsId === 3) {
					console.log('this.k:::::', this.k)
					this.dataList[this.k].state = 'play';
					this.dataList[this.k].isplay = false
					this.dataList[this.k].playIng = true
					setTimeout(() => {
						uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this).play()
					}, 500)
					// #ifdef H5
					audo.play()
					// #endif
				} else {
					// #ifdef MP
					this.dataList[this.k].state = 'pause';
					this.dataList[this.k].isplay = false
					uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this).pause()
					this.dataList[this.k].playIng = false
					// #endif
					// #ifdef H5
					audo.pause()
					// #endif
				}
			},
			tabsOn(index) {
				this.tabsId = index;
			},
			fullscreenchange(e, v) {
				console.log("e::::::::::", e)
			},
			mpTouchend(e) {
				this.mptime = (new Date() / 1000) - this.mpstartTime;
			},
			mpTouchstart(e) {
				this.mpstartTime = (new Date() / 1000);
			},
			dealVoice() {
				uni.showToast({
					title: '处理声音',
					icon: 'none'
				})
			},
			clearToTime() {
				//清理定时器
				for (let i = 0; i < 20; i++) {
					clearTimeout(this.rotateTime);
					clearTimeout(this.xrotats);
					this.showPlay = false;
					this.rotates = 0;
				}
			},
			clearTime() {
				//清理定时器
				for (let i = 0; i < 20; i++) {
					clearTimeout(this.rotateTime);
					clearTimeout(this.xrotats);
				}
			},
			rotateX() {
				// clearTimeout(this.rotateTime);
				this.rotateTime = setTimeout(() => {
					this.rotateX();
					this.showPlay = true;
					this.rotates += 1;
				}, 30)
			},
			closeScrollview() {
				// 点击评论里面的叉叉，就会关闭评论
				this.$refs.pinglun.close();
			},
			ended() {
				// 1.播放当前视频结束时触发，自动切换下一个视频
				// this.current = this.k+1
			},
			handleVideoTouchStart(event) {
				// 阻止事件冒泡，防止触发外层 swiper 的滑动事件
				event.stopPropagation();
			},
			handleVideoTouchMove(event) {
				// 阻止事件冒泡，防止触发外层 swiper 的滑动事件
				event.stopPropagation();
			},
			// ---- 进度条相关 --- start
			touchstart(e) {
				console.log(e);
				// 阻止事件冒泡，防止触发 swiper 的滑动事件
				e.stopPropagation();
				this.isTouch = true;
				// #ifdef H5
				if (this.isClick) {
					this.addPositon = 0;
					this.videoStartPositon = (this.windowWidth - (this.windowWidth * 0.10)) * this.progressBarPercent;
					this.touchStartPosition = e.changedTouches[0].clientX;
				}
				// #endif
				// #ifdef MP
				this.addPositon = 0;
				this.videoStartPositon = (this.windowWidth - (this.windowWidth * 0.10)) * this.progressBarPercent;
				this.touchStartPosition = e.changedTouches[0].clientX;
				// #endif
			},
			touchmove(e) {
				// console.log(e);
				// 阻止事件冒泡，防止触发 swiper 的滑动事件
				e.stopPropagation();
				// #ifdef H5
				if (this.isClick) {
					let num = e.changedTouches[0].clientX - this.touchStartPosition;
					if ((this.videoStartPositon + num) <= (this.windowWidth - (this.windowWidth * 0.10))) {
						this.addPositon = e.changedTouches[0].clientX - this.touchStartPosition;
					} else {
						this.addPositon = 0;
						this.videoStartPositon = (this.windowWidth - (this.windowWidth * 0.10));
					}
				}
				// #endif
				// #ifdef MP
				let num = e.changedTouches[0].clientX - this.touchStartPosition;
				if ((this.videoStartPositon + num) <= (this.windowWidth - (this.windowWidth * 0.10))) {
					this.addPositon = e.changedTouches[0].clientX - this.touchStartPosition;
				} else {
					this.addPositon = 0;
					this.videoStartPositon = (this.windowWidth - (this.windowWidth * 0.10));
				}
				// #endif
			},
			touchend(e) {
				// 阻止事件冒泡，防止触发 swiper 的滑动事件
				e.stopPropagation();
				// #ifdef H5
				if (this.isClick) {
					let per = Number((this.videoStartPositon + this.addPositon) / (this.windowWidth - (this.windowWidth *
						0.10)));
					let timeSubmit = parseInt(this.timeduration * per)
					audo.seek(timeSubmit)
					audo.play()
					uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this).seek(timeSubmit)
					uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this).play()
					this.dataList[this.k].state = 'play'
					setTimeout(() => {
						this.isTouch = false;
					}, 500)
				}
				// #endif
				// #ifdef MP
				let per = Number((this.videoStartPositon + this.addPositon) / (this.windowWidth - (this.windowWidth *
					0.10)));
				let timeSubmit = parseInt(this.timeduration * per)
				audo.seek(timeSubmit)
				audo.play()
				uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this).seek(timeSubmit)
				uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this).play()
				this.dataList[this.k].state = 'play'
				setTimeout(() => {
					this.isTouch = false;
				}, 500)
				// #endif
			},
			timeupdate(event, index) {
				// 触发进度条更新
				// console.log(event,index);
				if (index === this.k) {
					this.timeduration = event.detail.duration;
					this.progressBarPercent = parseFloat(Number(event.detail.currentTime / event.detail.duration));
				}
			},
			// ---- 进度条相关 --- ending
			//点击播放&&暂停
			tapVideoHover(state, event) {
				console.log('state--', state);
				if (state == 'play' || state == 'continue') {
					this.dataList[this.k].state = 'pause';
				} else {
					this.dataList[this.k].state = 'continue';
				}
				if (this.dataList[this.k].state == 'continue') {
					this.isClick = true;
					this.dataList[this.k].playIng = true
					uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this).play(); //暂停以后继续播放
					// #ifdef MP
					this.dataList[this.k].isplay = false
					// #endif
					// #ifdef H5
					audo.play()
					// #endif
				}
				if (this.dataList[this.k].state == 'pause') {
					uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this).pause(); //暂停以后继续播放
					// #ifdef MP
					this.dataList[this.k].isplay = true
					// #endif
					// #ifdef H5
					audo.pause()
					// #endif
				}
			},
			change(event) {
				this.k = event.detail.current
			},
			animationfinish(event) {
				// 1.这里进行判断，如果是最后一个视频就进入 get() 方法加载视频进入列表
				if (this.k == this.dataList.length - 1) {
					this.GET()
				}
			},
			//每一组结束时新的请求
			GET() {
				uni.request({
					url: 'https://bdb24c6d-8c19-4f80-8e7e-c9c9f037f131.bspapp.com/video',
					method: 'POST',
					data: {
						info: 'get_video'
					},
					success: (res) => {
						var msg = res.data.data
						// 2.这里把视频添加到视频列表
						for (let i = 0; i < msg.length; i++) {
							this.dataList.push(msg[i])
						}
					}
				})
			},
			get() {
				// 1.这里引入后端请求数据
				// var msg = userList
				console.log(111111111)
				uni.request({
					url: 'https://bdb24c6d-8c19-4f80-8e7e-c9c9f037f131.bspapp.com/video',
					method: 'POST',
					data: {
						info: 'get_video'
					},
					success: (res) => {
						console.log(2222222222, res)
						this.isShow = false;
						var msg = res.data.data
						// 2.这里把视频添加到视频列表
						for (let i = 0; i < msg.length; i++) {
							this.dataList.push(msg[i])
						}
						this.dataList[0].src =
							"https://vip.ffzy-play8.com/20241210/265221_d3896b6e/index.m3u8"
						this.dataList[1].src = "https://play.modujx11.com/20250107/FVHsvWf7/index.m3u8"
						this.dataList[2].src =
							"https://svip.high20-playback.com/20240114/12950_27f71026/index.m3u8"
						this.dataList[3].src =
							"https://m3u.nikanba.live/share/7194cd6a0d2943f88fff96545b7ecdc1.m3u8"
						this.dataList[4].src =
							"https://svip.high23-playback.com/20250106/113356_258300ff/index.m3u8"
						this.dataList[5].src =
							"https://vip.ffzy-video.com/20250108/9961_f2876df2/index.m3u8"
						this.dataList[6].src =
							"https://svip.high23-playback.com/20250106/113356_258300ff/index.m3u8"
						this.dataList[7].src =
							"https://play.modujx11.com/20250107/FVHsvWf7/index.m3u8"
						// 3.播放当前视频
						setTimeout(() => {
							this.isShow = true;
							// #ifdef H5
							this.dataList[this.k].isplay = true
							// #endif
							// #ifdef MP
							// 如果是小程序端
							this.dataList[this.k].isplay = false
							this.dataList[this.k].state = 'play'
							// #endif
							this.dataList[this.k].playIng = true
							setTimeout(() => {
								// #ifdef H5
								uni.createVideoContext(this.dataList[this.k]._id + '' +
									this.k, this).seek(0)
								uni.createVideoContext(this.dataList[this.k]._id + '' +
									this.k, this).pause()
								this.dataList[this.k].state = 'pause';
								audo.src = this.dataList[this.k].src;
								// #endif
								// #ifdef MP
								uni.createVideoContext(this.dataList[this.k]._id + '' +
									this.k, this).play()
								// #endif
							}, 500)
						}, 200)
						this.videoID = this.dataList[this.k]._id
					},
					fail(err) {
						console.log(3333333333, err)
					}
				})
			},
			share() {
				uni.showToast({
					title: '分享',
					icon: 'none'
				})
			},
			toComment(index) {
				// 注意点击评论之后会执行这里
				/*
				（1）先加载缓冲
				（2）获取当前视频 ID 信息
				（3）🌟🌟🌟🌟重要🌟🌟🌟🌟
					- 一定要记得看 index.vue 里面
					 uni.setStorageSync("user",this.peopleList[i]);
					 这个东西，用于存储当前用户信息。在 插件里面会使用到这个东西，
					 记得写一下。
					 
				（4）打开评论
				*/
				uni.showToast({
					title: '加载中...',
					icon: 'none',
					position: 'bottom',
					duration: 300
				})
				uni.setStorageSync("videoID", this.dataList[index]._id);
				this.videoID = this.dataList[index]._id;
				this.$refs.pinglun.open('bottom')
			},
			cLike(sss) {
				this.dataList[this.k].like = !this.dataList[this.k].like
				const video = this.dataList[this.k];
				sss ? video.like_n -= 1 : video.like_n += 1;
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

	.container {
		background-color: #000000;
	}

	.slider_squre {
		width: 12rpx;
		height: 12rpx;
		background: #ccc;
		position: relative;
		border-radius: 50%;
		top: -6rpx;
	}

	.slider_squre2 {
		width: 20rpx;
		height: 20rpx;
		background: #ccc;
		position: relative;
		border-radius: 50%;
		top: -6rpx;
	}

	.item {
		/* width : 750rpx; */
		background-color: #000000;
		position: relative;
	}

	.videoHover {
		position: absolute;
		top: 50%;
		left: 50%;
		display: flex;
		transform: translate(-50%, -50%);
		// background-color: rgba(0, 0, 0, 0.1);
		justify-content: center;
		align-items: center;
		width: 160rpx;
		height: 160rpx;
		/* border-style: dashed;
		border-color: #DD524D;
		border-width: 1px; */
	}

	.playState {
		width: 160rpx;
		height: 160rpx;
		opacity: 0.3;
	}

	.userInfo {
		position: absolute;
		bottom: 110px;
		right: 10px;
		flex-direction: column;

	}

	.userAvatar {
		border-radius: 500%;
		margin-bottom: 15px;
		border-style: solid;
		border-width: 2px;
		border-color: #ffffff;
	}

	.userAvatar {
		width: 100rpx;
		height: 100rpx;
	}

	.likeIco,
	.shareIco,
	.commentIco {
		width: 60rpx;
		height: 60rpx;
		margin-top: 15px;
	}

	.likeNum,
	.commentNum,
	.shareTex {
		color: #ffffff;
		font-size: 30rpx;
		text-align: center;
		margin: 5px;
	}

	.likeNumActive {
		color: red;
	}

	.content {
		width: 620rpx;
		z-index: 99;
		position: absolute;
		bottom: 60px;
		/* justify-content: center; */
		padding: 15rpx;
		flex-direction: column;
		justify-content: flex-start;
		color: #ffffff;
		/* background-color: aqua; */
	}

	.userName {
		font-size: 30rpx;
		color: #ffffff;
		margin-top: 80upx;
	}

	.words {
		margin-top: 10rpx;
		font-size: 30rpx;
		color: #ffffff;
	}

	.root {
		background-color: #000000;
	}
</style>
<style scoped>

</style>