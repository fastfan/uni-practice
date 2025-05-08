<template>
	<view class="container">
		<view class="p1">51积分本地生活权限明细表</view>
		<view class="p2">51积分本地生活使用权限申请与使用情况说明</view>
		<view class="content">
			为保障51积分本地生活相关业务或服务能实现与安全稳定运行之目的，我们可能会申请或使用操作系统的相关权限；为保障您的知情权，我们通过下列列表将产品或服务可能申请、使用的相关操作系统权限进行展示，您可以根据实际需要对相关权限进行管理；根据产品或服务的升级，申请、使用权限的类型与目的可能会有变动，我们将及时根据这些变动对列表进行调整，以确保您及时获悉权限的申请与使用情况
		</view>
		<view class="heigh-content">51积分本地生活微信小程序权限内容：手机号码授权、位置、文件存储及访问</view>
		<view class="heigh-content">1、手机号码授权</view>
		<view class="content">
			权限名称：手机号码授权调用权限
			<br />
			权限功能说明：当用户需要授权登录时，需要调用手机号码授权
			<br />
			功能/目的：为了给用户提供更优质的服务，并且作为用户唯一性判断的条件，平台不会主动获取用户手机号码，需经过授权同意后才可调用
			<br />
			使用场景：授权登录
		</view>
		<view class="heigh-content">2、位置</view>
		<view class="content">
			权限名称：位置调用权限
			<br />
			权限功能说明：获取您当时所处的地理位置
			<br />
			功能/目的：为平台提供最新的用户位置，以达到车找人的目的
			<br />
			使用场景：用户位置
		</view>
		<view class="heigh-content">3、文件存储及访问</view>
		<view class="content">
			权限名称：文件存储及访问
			<br />
			权限功能说明：读取或向其中写入图片信息
			<br />
			功能/目的：读取或者写入图片信息
			<br />
			使用场景：用于个人信息页的图片上传服务，通过访问您的存储写入权限使您可以直接保存任务详情图片
			<br />
			我们会采用符合业界标准的安全防护措施来防止您的个人信息遭到未经授权的访问、公开披露、使用、修改、损坏或丢失。我们努力使用各种合理的制度、技术、程序以及物理层面的措施来保护您的个人信息不被未经授权的访问、篡改、披露或破坏，包括但不限于SSL传输加密技术、信息存储加密技术、数据中心的访问权限控制的技术或措施。
			您可以通过51积分本地生活微信小程序右上方“···”-点击“设置”逐项查看您上述个人信息的访问权限开启状态，并可以决定开启或关闭这些权限。
			您开启这些权限即代表您授权我们可以收集和使用这些个人信息来实现上述的功能，您关闭权限即代表您取消了这些授权，则我们将不再继续收集和使用您的这些个人信息，也无法为您提供上述与这些授权所对应的功能。您关闭权限的决定不会影响此前基于您的授权所进行的个人信息的处理。
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {}
}
</script>

<style lang="scss">
.container {
	padding: 30rpx;

	.p1 {
		font-size: 32rpx;
		font-weight: bolder;
		text-align: center;
	}

	.p2 {
		margin-top: 30rpx;
		font-weight: bolder;
	}

	.content {
		margin-top: 30rpx;
		font-size: 28rpx;
	}

	.heigh-content {
		margin-top: 30rpx;
		font-size: 30rpx;
		font-weight: bolder;
	}
}
</style>
