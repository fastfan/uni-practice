<template>
	<uni-popup ref="popup" class="diff-popup" type="bottom" :safe-area="false">
		<view class="my_invite_container">
			<view class="container_bg">
				<image src="/static/share/img_fxz.min.png" class="bg" mode="widthFix"></image>
				<view class="icon_view" @click="close">
					<image src="/static/share/ic_guanbi.png" class="icon" mode=""></image>
				</view>
				<view class="mid_box">
					<view class="container_img">
						<image src="/static/share/taxt_fenx.png" class="img" mode=""></image>
					</view>
					<view class="container_scroll">
						<view class="scroll_box">
							<image :src="avater" class="img" mode=""></image>
							<view class="text">{{ phone }}累计获得{{ points }}积分</view>
						</view>
					</view>
					<view class="container_mid">
						<image src="/static/share/icon.png" class="img" mode=""></image>
						<view class="text">你的好友{{ inviter }}邀请您加入51积分</view>
					</view>
					<view class="container_list">
						<my-textlist :text-list="itemList"></my-textlist>
					</view>
					<view class="container_bottom">
						<image class="img" src="/static/share/banner_fenxiao.min.png" mode="widthFix"></image>
					</view>
					<view class="container_btn" @click="clickEvent('ensure')">查看玩法</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props: {
		isVisible: {
			type: Boolean,
			default: false
		},
		mode: {
			type: String,
			default: 'bottom'
		}
	},
	data() {
		return {
			phone: '189****1312',
			points: '700',
			inviter: '姚遥遥',
			avater: '/static/share/icon.png',
			itemList: [
				{
					icon: '/static/share/ic_jifen.png',
					text: '消费赚积分',
					text2: '积分当钱花'
				},
				{
					icon: '/static/share/ic_jiangli.png',
					text: '粉丝消费',
					text2: '您得奖励'
				},
				{
					icon: '/static/share/ic_shouyi.png',
					text: '粉丝邀请好友',
					text2: '您享收益'
				}
			]
		}
	},
	methods: {
		clickEvent(type) {
			if (type === 'close') {
				this.$emit('close', {
					text: '点击了关闭按钮'
				})
			} else if (type === 'ensure') {
				this.$emit('ensure', {
					text: '点击了查看玩法按钮'
				})
			}
		},
		open() {
			this.$refs.popup.open()
		},
		close() {
			this.$refs.popup.close()
		}
	}
}
</script>

<style lang="scss" scoped>
.my_invite {
	// position: fixed;
	// top: 0;
	// left: 0;
	// width: 100%;
	// height: 100%;
	// background-color: rgba(0, 0, 0, 0.5);
	// z-index: 999;

	&_container {
		// position: absolute;
		// bottom: 0;
		width: 100%;
		height: 1222rpx;

		// height: 100%;
		.mid_box {
			position: absolute;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			height: 100%;
		}

		.container_bg {
			position: relative;
			// background-size: cover;
			// height: 1222rpx;
			// padding: 72rpx 0 0 0;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.bg {
				width: 100%;
				// height: 1294rpx;
				position: absolute;
				// z-index: -999;
			}

			.icon_view {
				width: 104rpx;
				height: 82rpx;
				position: absolute;
				right: 0;
				top: 0;
				padding: 20rpx 16rpx 0 0;
				text-align: right;
				z-index: 9;
			}

			.icon {
				width: 52rpx;
				height: 52rpx;
			}

			.container_img {
				height: 84rpx;
				text-align: center;
				margin: 72rpx 0 30rpx 0;

				.img {
					height: 84rpx;
				}
			}

			.container_scroll {
				text-align: center;
				display: flex;
				justify-content: center;

				.scroll_box {
					width: 424rpx;
					height: 48rpx;
					background: #ffffff;
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
				background: linear-gradient(41deg, #fff7de 0%, #ffe6e8 100%);
				border-radius: 20rpx;
				border: 4rpx solid #ffffff;
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
					color: #a84c4c;
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
				background: linear-gradient(135deg, #ff6a57 0%, #ff8047 100%);
				box-shadow: 0rpx 2rpx 18rpx 0rpx rgba(255, 255, 255, 0.5);
				border-radius: 62rpx;
				border: 6rpx solid #ffedbd;
				font-weight: 500;
				font-size: 52rpx;
				color: #ffffff;
				margin: 30rpx 0 0 0;
			}
		}
	}
}
</style>
