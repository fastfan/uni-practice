<template>
	<view v-if="isVisible" class="poster_slider" @click="handleClickOutside">
		<view class="poster_slider_container">
			<swiper class="swiper" :indicator-dots="false" :autoplay="false" :circular="true" :duration="300"
				:vertical="false" :current="currentIndex" @change="handleSwiperChange" :display-multiple-items="1"
				previous-margin="60rpx" next-margin="60rpx">
				<swiper-item v-for="(item, index) in posterList" :key="index" class="swiper_item_custom">
					<view class="poster_item">
						<image :src="item.imageUrl" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="poster_slider_btn">
			<view class="btn_img">
				<image src="/static/share/ic_pengyousuan@2x.png" mode="widthFix"></image>
			</view>
			<view class="btn_text" @click.native.stop="clickShareBtn({type:'wechatMoment'})">
				分享至朋友圈
			</view>
		</view>
		<view class="poster_slider_share">
			<view v-for="(item,index) in shareList" :key="index" class="share_list" @click.native.stop="clickShareBtn(item)">
				<image :src="item.icon" mode="widthFix">
				</image>
				<view class="share_list_text">{{item.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isVisible: {
				type: Boolean,
				required: true,
				default: false
			}
		},
		data() {
			return {
				currentIndex: 0,
				posterList: [{
						imageUrl: '/static/share/img_haibao1@2x.png'
					},
					{
						imageUrl: '/static/share/img_haibao2@2x.png'
					},
					{
						imageUrl: '/static/share/img_haibao3@2x.png'
					},
					{
						imageUrl: '/static/share/img_haibao4@2x.png'
					},
					{
						imageUrl: '/static/share/img_haibao5@2x.png'
					},
				],
				shareList: [{
						icon: '/static/share/icon_weixin@2x.png',
						text: '微信好友',
						type: 'wechat'
					},
					// {
					// 	icon: '/static/share/icon_qq@2x.png',
					// 	text: 'QQ好友',
					// 	type:'QQFriend'
					// },
					// {
					// 	icon: '/static/share/icon_qqkongjian@2x.png',
					// 	text: 'QQ空间',
					// 	type:'QQZone'
					// },
					// {
					// 	icon: '/static/share/icon_weibo@2x.png',
					// 	text: '微博',
					// 	type:'weibo'
					// },
					{
						icon: '/static/share/icon_xiazai@2x.png',
						text: '保存图片',
						type: 'savePic'
					},
				]
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
			clickShareBtn(e) {
				console.log("e:::::::", e)
				console.log('子元素被点击');
			}
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
			justify-content: center;
			align-items: center;
			text-align: center;
			font-weight: 400;
			font-size: 24rpx;
			color: #FFFFFF;
			margin-top: 52rpx;

			.share_list {
				flex: 1;

				image {
					width: 92rpx;
					height: 92rpx;
					margin-bottom: 8rpx;
				}
			}
		}
	}
</style>