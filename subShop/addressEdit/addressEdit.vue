<template>
	<view class="addrress-edit">
		<uni-nav-bar
			title="编辑收货地址"
			left-icon="left"
			@clickLeft="leftClick"
			:statusBar="true"
			:fixed="true"
			:border="false"
		></uni-nav-bar>
		<view class="container">
			<uni-forms ref="myForm" :modelValue="formData" :rules="rules" label-position="left" :border="true" labelWidth="160rpx">
				<uni-group class="myform-group">
					<uni-forms-item label="收货人" name="name" labelClass="common-label">
						<input type="text" class="common-input" v-model="formData.name" placeholder="请输入收货人" />
					</uni-forms-item>
					<uni-forms-item label="手机号码" name="phone" labelClass="common-label">
						<input type="text" class="common-input" v-model="formData.phone" placeholder="请输入手机号码" />
					</uni-forms-item>
					<uni-forms-item label="详细地址" name="address" labelClass="common-label">
						<view style="display: flex">
							<input type="text" class="common-input" v-model="formData.address" placeholder="请输入详细地址" />
							<uni-icons style="margin-left: 14rpx; display: flex; align-items: center" type="right" size="22"></uni-icons>
						</view>
					</uni-forms-item>
					<uni-forms-item label="楼号门牌" name="addressDetail" labelClass="common-label">
						<input type="text" class="common-input" v-model="formData.addressDetail" placeholder="请输入楼号门牌" />
					</uni-forms-item>
				</uni-group>
			</uni-forms>
		</view>
		<view class="btn-cont">
			<view class="save-btn">保存</view>
			<view class="delete-btn">删除</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formData: {
				name: '',
				phone: '',
				address: '',
				addressDetail: '永泰路燕翔家园44号楼2号营业房'
			},
			rules: {
				address: {
					rules: [
						{
							required: true,
							errorMessage: '请填写地址'
						}
					],
					validateTrigger: 'submit'
				},
				name: {
					rules: [
						{
							required: true,
							errorMessage: '请填写姓名'
						}
					],
					validateTrigger: 'submit'
				},
				phone: {
					rules: [
						{
							required: true,
							errorMessage: '请填写联系方式'
						}
					],
					validateTrigger: 'submit'
				},
				addressDetail: {
					rules: [
						{
							required: true,
							errorMessage: '请填写详细地址'
						}
					],
					validateTrigger: 'submit'
				}
			}
		}
	},
	methods: {
		leftClick() {
			uni.navigateBack()
		}
	}
}
</script>

<style lang="scss" scoped>
.addrress-edit {
	.container {
		background: #fff;
		margin-top: 26rpx;
		padding: 28rpx;
		.common-input {
			height: 72rpx;
			flex: 1;
		}
	}
	.btn-cont {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.save-btn {
			width: 608rpx;
			height: 108rpx;
			background: linear-gradient(135deg, #ff7f2b 0%, #fa4f0b 100%);
			font-weight: 500;
			font-size: 48rpx;
			color: #ffffff;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 104rpx 0 52rpx 0;
			border-radius: 60rpx;
		}
		.delete-btn {
			width: 608rpx;
			height: 108rpx;
			background: #fff;
			font-weight: 500;
			font-size: 48rpx;
			color: #fb5710;
			border: 2rpx solid #fa5710;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 60rpx;
		}
	}
}
</style>
