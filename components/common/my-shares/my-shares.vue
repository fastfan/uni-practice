<template>
	<view class="my-share_box">
		<my-textlist :text-list="itemList"></my-textlist>
		<view class="my-share_box_mid">
			<image class="mid_img" src="/static/share/banner_fenxiao.min.png" mode="widthFix">
			</image>
		</view>
		<view class="my-share_box_btm">
			<button open-type="share" :data-share="{
				  title: '分享的标题',
				  path: `/pages/mine/index/index`,
					imageUrl:`${$store.getters.imageUrl}`
				}" class="btm_btn btn">分享给好友</button>
			<button class="btm_btn btn2" @click="creatPoster">生成专属海报</button>
		</view>
		<my-poster ref="myPoster" :isVisible="isVisible" @modelClose="closePoster"></my-poster>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isVisible: false,
				itemList: [{
					icon: "/static/share/ic_jifen.png",
					text: "消费赚积分",
					text2: "积分当钱花"
				}, {
					icon: "/static/share/ic_jiangli.png",
					text: "粉丝消费",
					text2: "您得奖励"
				}, {
					icon: "/static/share/ic_shouyi.png",
					text: "粉丝邀请好友",
					text2: "您享收益"
				}]
			};
		},
		methods: {
			creatPoster() {
				this.isVisible = true
				this.$refs.myPoster.make()
			},
			closePoster() {
				this.isVisible = false
			}
		},
	}
</script>

<style lang="scss" scoped>
	.my-share_box {
		width: 100%;
		height: 690rpx;
		background: linear-gradient(180deg, #FFEEEF 0%, #FEFAF6 100%), #FFFFFF;
		padding: 32rpx 24rpx 24rpx;

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