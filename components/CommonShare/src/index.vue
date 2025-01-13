<template>
	<view class="common_share_box">
		<view class="common_share_box_top">
			<view v-for="(item,index) in itemList" :key="index" class="top_list">
				<image :src="item.icon" mode="widthFix">
				</image>
				<view class="top_list_text">{{item.text}}</view>
				<view class="top_list_text">{{item.text2}}</view>
			</view>
		</view>
		<view class="common_share_box_mid">
			<image class="mid_img" src="/static/share/banner_fenxiao@2x.png" mode="widthFix">
			</image>
		</view>
		<view class="common_share_box_btm">
			<button class="btm_btn btn" @click="shareToWX">分享给好友</button>
			<button class="btm_btn btn2" @click="creatPoster">生成专属海报</button>
		</view>
		<PosterVue ref="PosterVue" :isVisible="isVisible" @modelClose="closePoster" />
	</view>
</template>

<script>
	import PosterVue from './poster.vue';
	export default {
		components: {
			PosterVue
		},
		data() {
			return {
				isVisible: false,
				itemList: [{
					icon: "/static/share/ic_jifen@2x.png",
					text: "消费赚积分",
					text2: "积分当钱花"
				}, {
					icon: "/static/share/ic_jiangli@2x.png",
					text: "粉丝消费",
					text2: "您得奖励"
				}, {
					icon: "/static/share/ic_shouyi@2x.png",
					text: "粉丝邀请好友",
					text2: "您享收益"
				}]
			};
		},
		methods: {
			shareToWX() {
				uni.showToast({
					title: '分享到微信好友，功能开发中',
					duration: 2000,
					icon: 'none'
				});
			},
			creatPoster() {
				this.isVisible = true
			},
			closePoster() {
				this.isVisible = false
			}
		},
	}
</script>

<style lang="scss" scoped>
	.common_share_box {
		width: 100%;
		height: 690rpx;
		background: linear-gradient(180deg, #FFEEEF 0%, #FEFAF6 100%), #FFFFFF;
		padding: 32rpx 24rpx 24rpx;

		&_top {
			display: flex;
			justify-content: center;
			align-self: center;

			.top_list {
				flex: 1;
				text-align: center;

				image {
					width: 72rpx;
					height: 72rpx;
				}

				&_text {
					font-weight: 400;
					font-size: 22rpx;
					color: #4B332D;
					margin-top: 10rpx;
				}
			}
		}

		&_mid {
			.mid_img {
				width: 100%;
				margin: 22rpx 0 0 0;
			}
		}

		&_btm {
			display: flex;
			// justify-content: center;
			// align-self: center;
			margin: 26rpx 0 0 0;

			.btm_btn {
				height: 100rpx;
				border-radius: 50rpx;
				font-weight: 600;
				font-size: 36rpx;
				line-height: 100rpx;
			}

			.btn {
				color: #333333;
				background: #FCD42C;
				box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(255, 166, 110, 0.2);
				flex-basis: 45%;
				margin-right: 20rpx;
			}

			.btn2 {
				color: #FFFFFF;
				background: #FF612E;
				box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(255, 166, 110, 0.2);
				flex-basis: 55%;
			}
		}
	}
</style>