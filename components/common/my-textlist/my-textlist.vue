<template>
	<view class="my-text-list">
		<view v-for="(item,index) in textList" :key="index" class="top_list">
			<image :src="item.icon" mode="widthFix">
			</image>
			<view class="top_list_text">{{item.text}}</view>
			<view class="top_list_text">{{item.text2}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			textList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-text-list {
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
</style>