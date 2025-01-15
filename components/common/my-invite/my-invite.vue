<template>
	<view v-if="isVisible" class="my_invite">
		<view class="my_invite_container">
			<view class="container_bg" style="background: url('/static/share/img_yaoqbg.png')">
				<image src="/static/share/ic_guanbi.png" class="icon" mode="" @click="clickEvent('close')"></image>
				<view class="container_img">
					<image src="/static/share/taxt_fenx.png" class="img" mode=""></image>
				</view>
				<view class="container_scroll">
					<view class="scroll_box">
						<image :src="avater" class="img" mode=""></image>
						<view class="text"> {{phone}}累计获得{{points}}积分</view>
					</view>
				</view>
				<view class="container_mid">
					<image src="/static/share/28.png" class="img" mode=""></image>
					<view class="text">你的好友{{inviter}}邀请您加入51积分</view>
				</view>
				<view class="container_list">
					<my-textlist :text-list="itemList"></my-textlist>
				</view>
				<view class="container_bottom">
					<image class="img" src="/static/share/banner_fenxiao.png" mode="widthFix">
					</image>
				</view>
				<view class="container_btn" @click="clickEvent('ensure')">查看玩法</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		props: {
			isVisible: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				phone: "189****1312",
				points: "700",
				inviter: "姚遥遥",
				avater: "/static/share/28.png",
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
			clickEvent(type) {
				if (type === "close") {
					this.$emit('close', {
						text: "点击了关闭按钮"
					})
				} else if (type === "ensure") {
					this.$emit('ensure', {
						text: "点击了查看玩法按钮"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my_invite {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;

		&_container {
			position: absolute;
			bottom: 0;
			width: 100%;

			// height: 100%;
			.container_bg {
				position: relative;
				background-size: cover;
				height: 1222rpx;
				padding: 72rpx 0 0 0;
				display: flex;
				flex-direction: column;
				align-items: center;

				.icon {
					width: 52rpx;
					height: 52rpx;
					position: absolute;
					right: 16rpx;
					top: 20rpx;
				}

				.container_img {
					height: 84rpx;
					text-align: center;
					margin: 0 0 30rpx 0;

					.img {
						height: 84rpx;
					}
				}

				.container_scroll {
					text-align: center;

					.scroll_box {
						width: 424rpx;
						height: 48rpx;
						background: #FFFFFF;
						border-radius: 24rpx;
						display: flex;
						justify-content: center;
						align-items: center;

						.img {
							width: 36rpx;
							height: 36rpx;
							border-radius: 50%;
							margin-right: 14rpx;
						}

						.text {
							font-weight: 400;
							font-size: 24rpx;
							color: #333333;
						}
					}
				}

				.container_mid {
					width: 664rpx;
					height: 224rpx;
					background: linear-gradient(41deg, #FFF7DE 0%, #FFE6E8 100%);
					border-radius: 20rpx;
					border: 4rpx solid #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					text-align: center;
					margin: 66rpx 0 24rpx 0;

					.img {
						width: 100rpx;
						height: 100rpx;
						box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.16);
						border: 4rpx solid rgba(255, 255, 255, 0.69);
						border-radius: 50%;
					}

					.text {
						font-weight: 500;
						font-size: 36rpx;
						color: #A84C4C;
						text-align: center;
						margin-top: 24rpx;
					}
				}

				.container_list {
					width: 100%;
				}

				.container_bottom {
					margin: 28rpx 0 0 0;
					width: 664rpx;

					.img {
						width: 100%;
					}
				}

				.container_btn {
					width: 660rpx;
					height: 124rpx;
					line-height: 112rpx;
					text-align: center;
					background: linear-gradient(135deg, #FF6A57 0%, #FF8047 100%);
					box-shadow: 0rpx 2rpx 18rpx 0rpx rgba(255, 255, 255, 0.5);
					border-radius: 62rpx;
					border: 6rpx solid #FFEDBD;
					font-weight: 500;
					font-size: 52rpx;
					color: #FFFFFF;
					margin: 30rpx 0 0 0;
				}
			}
		}
	}
</style>