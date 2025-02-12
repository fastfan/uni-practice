<template>
	<view class="detail-comment">
		<view class="comment-content" v-for="(item, index) in list" :key="index">
			<view class="detail-comment-top flex_box">
				<image :src="item.avater" class="img"></image>
				<view class="content">
					<view class="text">{{ item.phone }}</view>
					<view class="text2">{{ item.date }}</view>
				</view>
			</view>
			<view class="detail-comment-mid">
				<image class="img" :src="getImg(item.attidudeType)"></image>
				{{ item.attidude }}
			</view>
			<view class="detail-comment-title">{{ item.text }}</view>
			<view class="detail-comment-bottom">
				<image class="img" :src="src.img" v-for="(src, srcIndex) in item.textImgs" :key="src.img"></image>
			</view>
		</view>
	</view>
</template>

<script>
const ImgMap = new Map([
	['perfect', '/static/images/shop/manyi@2x.png'],
	['nothing', '/static/images/shop/yiban@2x.png'],
	['angry', '/static/images/shop/bumanyi@2x.png']
])
export default {
	props: {
		list: {
			type: Array,
			default: () => {
				return []
			}
		}
	},
	data() {
		return {
			ImgMap
		}
	},
	methods: {
		getImg(type) {
			console.log(ImgMap.get(type))
			return ImgMap.get(type)
		}
	}
}
</script>

<style lang="scss" scoped>
.detail-comment {
	padding: 24rpx;
	background: #ffffff;
	.comment-content {
		border-bottom: 1px solid #e3e3e3;
		&:last-child {
			border-bottom: none;
		}
	}
	&-top {
		margin-bottom: 18rpx;
		padding-top: 24rpx;
		.img {
			width: 84rpx;
			height: 84rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		.content {
			align-items: flex-start;
			.text {
				font-weight: 400;
				font-size: 32rpx;
				line-height: 44rpx;
				color: #000000;
				margin-bottom: 6rpx;
			}
			.text2 {
				font-weight: 400;
				font-size: 24rpx;
				line-height: 34rpx;
				color: #808080;
			}
		}
	}
	&-mid {
		font-weight: 400;
		font-size: 24rpx;
		color: #808080;
		margin-bottom: 10rpx;
		margin-left: 12rpx;
		.img {
			width: 40rpx;
			height: 40rpx;
			margin-right: 16rpx;
			vertical-align: bottom;
		}
	}
	&-title {
		font-weight: 400;
		font-size: 24rpx;
		color: #333333;
		margin-bottom: 24rpx;
		margin-left: 12rpx;
	}
	&-bottom {
		.img {
			width: 176rpx;
			height: 176rpx;
			border-radius: 8rpx;
			margin-right: 18rpx;
			margin-left: 12rpx;
			margin-bottom: 30rpx;
		}
	}
}
</style>
