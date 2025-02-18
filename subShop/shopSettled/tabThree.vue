<template>
	<view class="tab-three">
		<view class="process flex_box" v-for="(item, index) in processList" :key="index">
			<view class="top-text">
				<view class="title">{{ item.title }}</view>
				<view class="title-bg"></view>
			</view>
			<view class="bottom-cont flex_box flex_row_between">
				<image class="process-img" :src="item.src"></image>
				<view class="bottom-text">
					<view>{{ item.content }}</view>
					<view>{{ item.content2 }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			processList: [
				{
					title: '01 入驻要求',
					content: '1、拥有线下实体门店。',
					content2: '2、经营品类在以下范围：食品餐饮、超市便利、水果果切、水产生鲜、鲜花绿植、医药健康、数码产品等。',
					src: '/static/images/shop/img_yaoqiu@2x.png'
				},
				{
					title: '02 入驻申请',
					content: '1、入驻申请会用到企业营业执照、法人身份证以及其他材料。',
					content2: '2、根据页面提示，正确填写您的入驻信息，上传相关资质资料。',
					src: '/static/images/shop/img_shenqing@2x.png'
				},
				{
					title: '03 提交审核',
					content: '1、审核时效：审核预计需要1～3个工作日。',
					content2: '2、结果通知：无论是否审核通过，我们将通知您审核结果。',
					src: '/static/images/shop/img_shenghe@2x.png'
				},
				{
					title: '04 入驻成功',
					content: '入驻成功后，可前往商家管理页管理您的店铺',
					content2: '',
					src: '/static/images/shop/img_chenggong@2x.png'
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped>
.tab-three {
	padding: 0 28rpx;
	.process {
		flex-direction: column;
		align-items: self-start;
		.top-text {
			.title {
				font-weight: 400;
				font-size: 40rpx;
				color: #333333;
				text-align: center;
				margin: 28rpx 0 16rpx;
				position: relative;
				z-index: 10;
			}
			.title-bg {
				width: 110rpx;
				height: 16rpx;
				background: #f9dd7a;
				position: relative;
				left: 50%;
				transform: translateX(-50%);
				top: -28rpx;
			}
		}
		.bottom-text {
			font-weight: 400;
			font-size: 28rpx;
			color: #535353;
			flex: 1;
		}
		.process-img {
			width: 138rpx;
			height: 138rpx;
			vertical-align: baseline;
			margin-right: 42rpx;
		}
	}
}
</style>
