<template>
	<!-- <lime-painter /> -->
	<view>
		<view>
			<uni-nav-bar title="发现" left-icon=" " :statusBar="true" :fixed="true" :border="false" />
			<city-vue></city-vue>
			<map style="width: 100%; height: 300px" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
			<view @click="clickAddress('addressSelect')">选择收货地址</view>
			<view @click="clickAddress('addressManage')">收货地址管理</view>
		</view>
		<!-- <PosterModel :painterProps="posterList[currentIndex]" /> -->
		<view class="container" :style="{ 'min-height': screenHeight + 'px' }">
			<view class="content_view">
				<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image class="avatar" :src="avatarUrl"></image>
				</button>
				<input type="nickname" class="weui-input" placeholder="请输入昵称" maxlength="15" :value="nickName" @change="getNickname" />
			</view>
			<view class="bottom_view">
				<view class="report_view" @click="submit">
					<text class="report_text">确认修改</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import cityVue from './city.vue'

// import PosterModel from "@/components/common/my-poster/poster.vue"
const defaultAvatarUrl =
	'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
export default {
	components: {
		// PosterModel
		cityVue
	},
	data() {
		return {
			userInfo: {},
			avatarUrl: defaultAvatarUrl,
			nickName: '',
			id: 0, // 使用 marker点击事件 需要填写id
			title: 'map',
			latitude: 39.909,
			longitude: 116.39742,
			covers: [
				{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: 'https://oss.ruikedz.com/51life/static/images/shop/diongwei@2x.png'
				}
			],
			show: false,
			currentIndex: 0,
			posterList: [
				{
					imageUrl: '/static/share/img_haibao1.min.png',
					class: 'red',
					background: 'linear-gradient(180deg, #F9F5F5 0%, #FFE1CE 100%)',
					textColor: '#A9492A',
					borderStyle: '2rpx solid rgba(255, 157, 100, 1)',
					qrCodePic: '/static/share/img_kung1.png',
					userName: '大门牙胖仔',
					phone: '189****1312'
				},
				{
					imageUrl: '/static/share/img_haibao2.min.png',
					class: 'blue',
					background: 'rgba(255, 255, 255, 0.28)',
					textColor: '#1E81F6',
					borderStyle: '2rpx solid rgba(101, 172, 255, 1)',
					qrCodePic: '/static/share/img_kung2.png',
					userName: '大门牙胖仔',
					phone: '189****1312'
				},
				{
					imageUrl: '/static/share/img_haibao3.min.png',
					class: 'green',
					background: 'rgba(255, 255, 255, 0.47)',
					textColor: '#0BA827',
					borderStyle: '2rpx solid rgba(102, 230, 37, 1)',
					qrCodePic: '/static/share/img_kung3.png',
					userName: '大门牙胖仔',
					phone: '189****1312'
				},
				{
					imageUrl: '/static/share/img_haibao4.min.png',
					class: 'purple',
					background: 'rgba(255, 255, 255, 0.51)',
					textColor: '#E54685',
					borderStyle: '2rpx solid rgba(228, 119, 177, 1)',
					qrCodePic: '/static/share/img_kung4.png',
					userName: '大门牙胖仔',
					phone: '189****1312'
				},
				{
					imageUrl: '/static/share/img_haibao5.min.png',
					class: 'orange',
					background: 'rgba(255, 255, 255, 0.58)',
					textColor: '#CC4502',
					borderStyle: '2rpx solid rgba(255, 157, 100, 1)',
					qrCodePic: '/static/share/img_kung5.png',
					userName: '大门牙胖仔',
					phone: '189****1312'
				}
			]
		}
	},
	onShow() {
		console.log(1111111111111)
	},
	created() {
		this.userInfo = uni.getStorageSync('memberInfo')
		this.nickName = this.userInfo.nickName
		this.avatarUrl = this.userInfo.headImage
		console.log('userInfo', this.userInfo)
	},
	methods: {
		aaa() {
			console.log(22222)
			this.show = true
		},
		clickAddress(type) {
			uni.navigateTo({
				url: `/subShop/${type}/${type}`
			})
		},
		clickBack() {
			uni.navigateBack()
		},
		getNickname(e) {
			console.log('getNickname', e.detail.value)
			this.nickName = e.detail.value
			this.checkNickName()
		},
		checkNickName() {
			if (!this.nickName) {
				uni.showToast({
					title: '请输入昵称',
					icon: 'none'
				})
				return false
			}
			let str = this.nickName.trim()
			if (str.length == 0) {
				uni.showToast({
					title: '请输入正确的昵称',
					icon: 'none'
				})
				return false
			}
			this.nickName = str
			// if ((/[^/a-zA-Z0-9\u4E00-\u9FA5]/g).test(str)) {
			//  uni.showToast({
			//      title: '请输入中英文和数字',
			//      icon: 'none'
			//  })
			//  return false
			// }
			return true
		},
		onChooseAvatar(e) {
			console.log('onChooseAvatar===', e)
			this.avatarUrl = e.detail.avatarUrl
		},
		submit() {
			console.log('submit提交', this.nickName, this.avatarUrl)
			// return
			if (!this.avatarUrl) {
				uni.showToast({
					title: '请上传头像',
					icon: 'none'
				})
				return
			}
			if (!this.checkNickName()) {
				return
			}
			let params = {
				nickName: this.nickName,
				headImage: this.avatarUrl,
				memberId: this.userInfo.id
			}
			console.log('params====', params)
			// return

			uni.showLoading({
				title: '加载中',
				mask: true
			})
			updateNickNameAndHeadImg(params).then(
				(res) => {
					uni.hideLoading()
					console.log('updateNickNameAndHeadImg==', res)
					if (res.errorCode != 0) {
						return
					}
					uni.showToast({
						title: '修改成功',
						icon: 'none'
					})
					this.userInfo.nickName = this.nickName
					this.userInfo.headImage = this.avatarUrl
					uni.setStorageSync('memberInfo', this.userInfo)
					setTimeout(function () {
						uni.$emit('userInfoRefresh', {
							isRefresh: true
						})
						uni.navigateBack()
					}, 2000)
				},
				(err) => {
					uni.hideLoading()
				}
			)
		}
	}
}
</script>

<style lang="scss">
.container {
	display: flex;
	flex-direction: column;
}

/* 边框样式 */
button::after {
	border: 0;
}

.content_view {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 68px;
	position: relative;
	/* background-color: #F6F6FC; */
}

.avatar-wrapper {
	width: 100px;
	height: 100px;
	padding: 0 !important;
	margin: 0 !important;
	border-radius: 100px;
}

.avatar {
	width: 100px;
	height: 100px;
	border-radius: 100px;
	border-style: solid;
	border-width: 1px;
	border-color: #d6d6d5;
}

.weui-input {
	margin-top: 40px;
	width: 300px;
	height: 40px;
	background: #f4f4f6;
	line-height: 40px;
	text-align: center;
}

.bottom_view {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	background-color: white;
	z-index: 20;
	padding-top: 10px;
}

.report_view {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 706rpx;
	height: 76rpx;
	background-color: #e60012;
	border-radius: 19px;
	margin-bottom: 10px;
}

.report_text {
	color: #fff;
	font-size: 15px;
}
</style>
