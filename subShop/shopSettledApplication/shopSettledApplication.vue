<template>
	<view class="shop-setted-application">
		<uni-nav-bar title="商家入驻" left-icon="left" @clickLeft="leftClick" :statusBar="true" :fixed="true" :border="false"></uni-nav-bar>
		<uni-forms ref="myForm" :modelValue="formData" :rules="rules" label-position="top" :border="true" labelWidth="110">
			<uni-group class="myform-group">
				<uni-forms-item label="店铺名称" name="shopName" required labelClass="common-label">
					<uni-easyinput type="text" v-model="formData.shopName" placeholder="请输入店铺名称"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="店铺分类" name="shopType" required labelClass="common-label">
					<uni-data-select
						v-model="formData.shopType"
						placeholder="请选择店铺分类"
						:localdata="selectList"
						@change="change"
					></uni-data-select>
				</uni-forms-item>
			</uni-group>
			<uni-group top="14" class="myform-group">
				<uni-forms-item label="店铺位置" required labelClass="common-label">
					<view class="map-text">位置有误将会影响顾客到店，请仔细确认</view>
					<view class="map-text2">
						<uni-icons type="location" size="18" class="top_box_unicon"></uni-icons>
						需使用您的定位信息
					</view>
					<map
						id="map"
						style="width: 100%; height: 260rpx"
						:latitude="latitude"
						:longitude="longitude"
						:markers="covers"
						@tap="mapClick"
					></map>
				</uni-forms-item>
				<uni-forms-item label="详细地址" required labelClass="common-label">
					<picker
						mode="multiSelector"
						:value="addressSelectListData"
						@columnchange="addressColumnchange"
						@change="addressChange"
						:range="addressListData"
						range-key="value"
					>
						<uni-list>
							<uni-list-item showArrow :title="addressListStr ? addressListStr : '请选择'" />
						</uni-list>
					</picker>
					<input type="tel" class="shop-address" v-model="formData.addressDetail" placeholder="请输入详细地址" />
				</uni-forms-item>
			</uni-group>
			<uni-group top="14" class="myform-group" title="联系信息填写">
				<uni-forms-item name="name" required class="differ-lable" label-position="left">
					<template #label>
						<view class="custom-label">
							<text class="is-required">*</text>
							姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：
						</view>
					</template>
					<input type="text" class="common-input" v-model="formData.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="联系电话：" name="phone" required label-position="left" labelWidth="90" labelClass="custom-label">
					<input type="tel" class="common-input" v-model="formData.phone" placeholder="请输入联系电话" />
				</uni-forms-item>
			</uni-group>
			<uni-group top="14" class="myform-group" title="基础信息填写">
				<uni-forms-item label="营业时间：" name="time" required label-position="left" labelWidth="90" labelClass="custom-label">
					<input
						type="text"
						disabled=""
						class="common-input"
						v-model="formData.time"
						placeholder="请选择营业时间"
						@click="show('time')"
					/>
				</uni-forms-item>
				<uni-forms-item label="人均消费：" name="cash" required label-position="left" labelWidth="90" labelClass="custom-label">
					<input type="tel" class="common-input" v-model="formData.cash" placeholder="请输入人均消费" />
				</uni-forms-item>
			</uni-group>
			<uni-group top="14" class="myform-group">
				<uni-forms-item label="店铺logo" name="shopLogo" required labelClass="common-label">
					<uni-file-picker
						v-model="formData.shopLogo"
						fileMediatype="image"
						mode="grid"
						limit="1"
						@select="select"
						@progress="progress"
						@success="success"
						@fail="fail"
					>
						<view class="upload-pic">
							<uni-icons type="camera" size="30"></uni-icons>
							上传照片
						</view>
					</uni-file-picker>
				</uni-forms-item>
				<uni-forms-item label="店铺门脸照片" name="shopFront" required labelClass="common-label">
					<view class="differ-text">建议上传带有招牌信息的门脸照片，方便用户找店</view>
					<uni-file-picker
						customClass="differ-upload"
						v-model="formData.shopFront"
						fileMediatype="image"
						limit="1"
						@select="select"
						@progress="progress"
						@success="success"
						@fail="fail"
					>
						<view class="upload-pic">
							<image class="img" src="https://oss.ruikedz.com/51life/static/images/shop/img_shilitu@2x.png"></image>
						</view>
					</uni-file-picker>
				</uni-forms-item>
				<uni-forms-item label="营业执照" name="shopPic" required labelClass="common-label">
					<uni-file-picker
						customClass="differ-upload"
						v-model="formData.shopPic"
						fileMediatype="image"
						mode="grid"
						limit="1"
						@select="select"
						@progress="progress"
						@success="success"
						@fail="fail"
					>
						<view class="upload-pic has-border">
							<uni-icons type="camera" size="30"></uni-icons>
							上传照片
						</view>
					</uni-file-picker>
				</uni-forms-item>
				<uni-forms-item label="店铺相册" name="shopPic2" labelClass="common-label">
					<uni-file-picker
						v-model="formData.shopPic2"
						fileMediatype="image"
						mode="grid"
						limit="9"
						@select="select"
						@progress="progress"
						@success="success"
						@fail="fail"
					>
						<view class="upload-pic">
							<uni-icons type="camera" size="30"></uni-icons>
							上传照片
						</view>
					</uni-file-picker>
				</uni-forms-item>
				<uni-forms-item label="店铺视频" name="shopPic3" labelClass="common-label">
					<uni-file-picker
						v-model="formData.shopPic3"
						fileMediatype="video"
						mode="grid"
						limit="1"
						@select="select"
						@progress="progress"
						@success="success"
						@fail="fail"
					>
						<view class="upload-pic has-border">
							<uni-icons type="camera" size="30"></uni-icons>
							上传视频
						</view>
					</uni-file-picker>
				</uni-forms-item>
				<uni-forms-item label="店铺描述" name="text" labelClass="common-label">
					<uni-easyinput type="textarea" autoHeight v-model="formData.text" placeholder="请输入内容"></uni-easyinput>
				</uni-forms-item>
			</uni-group>
		</uni-forms>
		<!-- <time-picker-popup ref="TimePickerPopupRef" :value="value" @confirm="confirm"></time-picker-popup> -->
		<time-range
			ref="time"
			:startTime="startTime"
			:startDefaultTime="startDefaultTime"
			:endTime="endTime"
			:endDefaultTime="endDefaultTime"
			@timeRange="timeRange"
		></time-range>
		<view class="box-bottom">
			<button @click="submit('myForm')" class="submit-btn">提交信息</button>
		</view>
	</view>
</template>

<script>
import { chinaAddress } from '@/static/city.json'
export default {
	data() {
		return {
			_mapContext: null,
			position: '',
			latitude: 39.909,
			longitude: 116.39742,
			covers: [],
			chinaAddress: [], // 全国省市区
			addressListData: [], // 全国省市区
			addressSelectListData: [0, 0, 0], // 当前选择的省市区 index
			addressListStr: '', // 当前选择的省市区value
			addressCodeListStr: '', // 当前选择的省市区code
			startTime: '00:00',
			startDefaultTime: '06:00',
			endTime: '23:59',
			endDefaultTime: '23:59',
			formData: {
				shopName: '',
				shopType: '',
				addressListStr: '',
				addressCodeListStr: '',
				addressDetail: '永泰路燕翔家园44号楼2号营业房',
				name: '',
				phone: '',
				cash: '',
				time: [],
				shopLogo: [],
				shopFront: [],
				shopPic: [],
				shopPic2: [],
				shopPic3: [],
				text: ''
			},
			rules: {
				shopName: {
					rules: [
						{
							required: true,
							errorMessage: '请填写店铺名称'
						}
					],
					label: '店铺名称',
					validateTrigger: 'submit'
				},
				shopType: {
					rules: [
						{
							required: true,
							errorMessage: '请选择店铺分类'
						}
					],
					label: '店铺分类',
					validateTrigger: 'submit'
				},
				name: {
					rules: [
						{
							required: true,
							errorMessage: '请填写姓名'
						}
					],
					label: '姓名',
					validateTrigger: 'submit'
				},
				phone: {
					rules: [
						{
							required: true,
							errorMessage: '请填写联系方式'
						}
					],
					label: '联系方式',
					validateTrigger: 'submit'
				},
				time: {
					rules: [
						{
							required: true,
							errorMessage: '请选择营业时间'
						}
					],
					label: '营业时间',
					validateTrigger: 'submit'
				},
				cash: {
					rules: [
						{
							required: true,
							errorMessage: '请输入人均消费'
						}
					],
					label: '人均消费',
					validateTrigger: 'submit'
				},
				shopLogo: {
					rules: [
						{
							required: true,
							errorMessage: '请上传店铺logo'
						}
					],
					label: '店铺logo',
					validateTrigger: 'submit'
				},
				shopFront: {
					rules: [
						{
							required: true,
							errorMessage: '请上传店前照片'
						}
					],
					validateTrigger: 'submit'
				},
				shopPic: {
					rules: [
						{
							required: true,
							errorMessage: '请上传营业执照'
						}
					],
					validateTrigger: 'submit'
				}
			},
			selectList: [
				{ value: 0, text: '商超购物' },
				{ value: 1, text: '美食餐饮' },
				{ value: 2, text: '家政服务' },
				{ value: 3, text: '汽车维修' }
			]
		}
	},
	methods: {
		getLocation() {
			let that = this
			// 获取用户是否开启 授权获取当前的地理位置、速度的权限。
			uni.getSetting({
				success(res) {
					console.log(res)

					// 如果没有授权
					if (!res.authSetting['scope.userLocation']) {
						// 则拉起授权窗口
						uni.authorize({
							scope: 'scope.userLocation',
							success() {
								//点击允许后--就一直会进入成功授权的回调 就可以使用获取的方法了
								uni.getLocation({
									type: 'gcj02',
									// isHighAccuracy: true,
									// accuracy: 'best',
									// highAccuracyExpireTime: 5000,
									success: function (res) {
										that.longitude = res.longitude
										that.latitude = res.latitude
										console.log(res)
										// console.log('当前位置的经度：' + res.longitude)
										// console.log('当前位置的纬度：' + res.latitude)
										that.covers.push({
											latitude: res.latitude,
											longitude: res.longitude,
											iconPath: 'https://oss.ruikedz.com/51life/static/images/shop/diongwei@2x.png'
										})
										// uni.showToast({
										// 	title: '当前位置的经纬度：' + res.longitude + ',' + res.latitude,
										// 	icon: 'success',
										// 	mask: true
										// })
									},
									fail(error) {
										console.log('失败', error)
									}
								})
							},
							fail(error) {
								//点击了拒绝授权后--就一直会进入失败回调函数--此时就可以在这里重新拉起授权窗口
								console.log('拒绝授权', error)

								uni.showModal({
									title: '提示',
									content: '若点击不授权，将无法使用位置功能',
									cancelText: '不授权',
									cancelColor: '#999',
									confirmText: '授权',
									confirmColor: '#f94218',
									success(res) {
										console.log(res)
										if (res.confirm) {
											// 选择弹框内授权
											uni.openSetting({
												success(res) {
													console.log(res.authSetting)
												}
											})
										} else if (res.cancel) {
											// 选择弹框内 不授权
											console.log('用户点击不授权')
										}
									}
								})
							}
						})
					} else {
						// 有权限则直接获取
						uni.getLocation({
							type: 'gcj02',
							success: function (res) {
								that.longitude = res.longitude
								that.latitude = res.latitude
								// that.longitude = 106.328161
								// that.latitude = 38.452733
								console.log(res)
								// console.log('当前位置的经度：' + res.longitude)
								// console.log('当前位置的纬度：' + res.latitude)
								that.covers.push({
									latitude: that.latitude,
									longitude: that.longitude,
									iconPath: 'https://oss.ruikedz.com/51life/static/images/shop/diongwei@2x.png'
								})
								// uni.showToast({
								// 	title: '当前位置的经纬度：' + res.longitude + ',' + res.latitude,
								// 	icon: 'success',
								// 	mask: true
								// })
							},
							fail(error) {
								uni.showToast({
									title: '请勿频繁调用！',
									icon: 'none'
								})
								console.log('失败', error)
							}
						})
					}
				}
			})
		},
		mapClick(info) {
			console.log('点击地图时候触发', info),
				uni.chooseLocation({
					success: (res) => {
						console.log(res)
						this.position = '位置名称:' + res.name + '  详细地址:' + res.address
						this.longitude = res.longitude
						this.latitude = res.latitude
						//为标记点经纬度重新赋值【在data中赋坐标的方式无效】
						this.covers[0].longitude = res.longitude
						this.covers[0].latitude = res.latitude
						this.formData.addressDetail = res.address
						// console.log('位置名称：' + res.name);
						// console.log('详细地址：' + res.address);
						// console.log('纬度：' + res.latitude);
						// console.log('经度：' + res.longitude);
					},
					fail: (err) => {
						console.log(err)
						uni.showToast({
							title: '获取位置失败'
						})
					}
				})
		},
		// 获取上传状态
		select(e) {
			console.log('选择文件：', e)
		},
		// 获取上传进度
		progress(e) {
			console.log('上传进度：', e)
		},

		// 上传成功
		success(e) {
			console.log('上传成功')
		},

		// 上传失败
		fail(e) {
			console.log('上传失败：', e)
		},
		show(type) {
			this.$nextTick(() => {
				this.$refs['time'].open(type)
			})
		},
		leftClick() {
			uni.navigateBack()
		},
		change(e) {
			console.log('e::::::', e)
		},
		onClickShopLogo(type) {
			let _that = this
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
					console.log('res:::::::::', res)
					let file = res.tempFilePaths[0]
					_that.formData[type] = file
					// dataServer.uploadFile({
					// 	file,
					// 	fileModule: 42
					// }).then(res => {
					// 	uni.hideLoading();
					// 	_that.localSaveData('carImgId', res.id);
					// 	_that.localSaveData('carImgUrl', res.fileUrl)
					// }).catch(err => {
					// 	uni.hideLoading();
					// });
				}
			})
		},
		submit(type) {
			console.log(this.formData)
			this.$refs[type]
				.validate()
				.then((res) => {
					console.log('表单数据信息：', res)
				})
				.catch((err) => {
					console.log('表单错误信息：', err)
				})
		},
		getProvince() {
			const chinaAddress = this.chinaAddress
			const provinceListData = []
			for (const province_key in chinaAddress) {
				provinceListData.push({ code: chinaAddress[province_key].code, value: chinaAddress[province_key].value })
			}
			this.addressListData[0] = provinceListData
			// 默认加载第一个省份的城市
			this.getCity(provinceListData[0].code)
		},
		// 根据省份获取城市
		getCity(province) {
			// 获取省份对象
			const chinaAddress = this.chinaAddress
			// console.log('province::::', province)
			// console.log('chinaAddress::::', chinaAddress)
			const chinaAddress_Item = chinaAddress.find((item) => {
				return item.code === province
			})
			// console.log('chinaAddress_Item::::', chinaAddress_Item)
			// 获取城市list
			const cityChildren = chinaAddress_Item.children
			if (!cityChildren) {
				// 如果省份没有市区 清空上次的市区和区域数据
				this.addressListData[1] = ''
				this.addressListData[2] = ''
				return
			}
			// 解析城市list
			const cityListData = []
			for (const city_key in cityChildren) {
				cityListData.push({ code: cityChildren[city_key].code, value: cityChildren[city_key].value })
			}
			this.addressListData[1] = cityListData
			// 默认加载第一个省份的第一个城市的区域
			this.getCounty(province, cityListData[0].code)
		},
		// 根据省份和城市 获取区域
		getCounty(province, city) {
			// 获取省份对象
			const chinaAddress = this.chinaAddress
			const chinaAddress_Item = chinaAddress.find((item) => {
				return item.code === province
			})
			// 获取城市list
			const cityChildren = chinaAddress_Item.children

			// 根据城市获取区域
			const cityChildren_item = cityChildren.find((item) => {
				return item.code === city
			})

			// 解析区域list
			const countyListData = []
			if (cityChildren_item.children) {
				for (const county_key in cityChildren_item.children) {
					countyListData.push({
						code: cityChildren_item.children[county_key].code,
						value: cityChildren_item.children[county_key].value
					})
				}
			} else {
				countyListData.push({ code: cityChildren_item.code, value: cityChildren_item.value })
			}
			this.addressListData[2] = countyListData
		},
		// 区域更新
		addressColumnchange(e) {
			const { column, value } = e.detail
			// console.log('e:::::::', e)
			// console.log('this.addressSelectListData:::::::', this.addressSelectListData)
			// console.log('this.addressListData:::::::', this.addressListData)
			this.addressSelectListData[column] = value
			// 当前选择的节点地址
			const selectItem = this.addressListData[column][value]['code']
			if (column === 0) {
				// 根据省份获取城市
				this.getCity(selectItem)
			} else if (column === 1) {
				// 获取当前城市的省份
				const province = this.addressListData[0][this.addressSelectListData[0]]['code']
				// 根据省份和城市获取区域
				if (selectItem) {
					this.getCounty(province, selectItem)
				}
			}
			this.$forceUpdate()
		},
		// 区域确定
		addressChange(e) {
			const { value } = e.detail
			// console.log('e:::::::', e)
			// console.log('this.addressListData::::', this.addressListData)
			// 获取省、市、区
			let province = this.addressListData[0][value[0]] || ''
			let city = this.addressListData[1][value[1]] || ''
			let county = this.addressListData[2][value[2]] || ''

			// 拼接页面显示的地址链接
			const addressListStr = []
			const addressCodeListStr = []
			if (province) {
				addressListStr.push(province.value)
				addressCodeListStr.push(province.code)
			}
			if (city) {
				addressListStr.push(city.value)
				addressCodeListStr.push(city.code)
			}
			if (county) {
				addressListStr.push(county.value)
				addressCodeListStr.push(county.code)
			}
			this.addressListStr = addressListStr.join(',')
			this.addressCodeListStr = addressCodeListStr.join(',')
			// 当前选择的地址
			// console.log('省份', province)
			// console.log('城市', city)
			// console.log('区域', county)
			console.log('this.addressListStr::::', this.addressListStr)
			console.log('this.addressCodeListStr::::', this.addressCodeListStr)
		}
	},
	mounted() {
		this.$root.$on('timeRange', (type, val) => {
			console.log(type, val)
			this.formData[type] = val[0] + '-' + val[1]
		})
		this.chinaAddress = chinaAddress
		// 获取全国省份
		this.getProvince()
	},
	onReady() {
		this._mapContext = uni.createMapContext('map', this)
	},
	onLoad() {
		this.getLocation()
	}
}
</script>

<style lang="scss" scoped>
$bg-color: #f3f3f3 !important;
.shop-setted-application {
	background: #f2f2f2;
	height: calc(100vh - 174rpx);
	padding: 0 24rpx 24rpx;
	overflow-y: scroll;
	.myform-group {
		::v-deep .uni-group {
			box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(255, 116, 110, 0.1);
			border-radius: 16rpx;
		}
		::v-deep .uni-group__title {
			background: #fff;
			padding-left: 30rpx !important;
			border-radius: 16rpx;
		}
		::v-deep .uni-group__content {
			&:first-child .uni-forms-item {
				border: none !important;
			}
		}
		::v-deep .uni-forms-item {
			&:first-child {
				border: none !important;
			}
		}
		::v-deep .uni-group__title-text {
			font-weight: 500;
			font-size: 36rpx !important;
			color: #000 !important;
		}
		::v-deep .uni-easyinput__content {
			background: $bg-color;
		}
		::v-deep .uni-stat__select {
			background: $bg-color;
		}
		::v-deep .common-label {
			font-weight: 500;
			font-size: 36rpx;
			color: #333333;
		}
		::v-deep .differ-upload .file-picker__box {
			width: 100% !important;
			height: 338rpx !important;
			padding-top: 0 !important;
			.upload-pic {
				height: 308rpx;
				width: 100%;
			}
		}
		.common-input {
			height: 74rpx;
			line-height: 74rpx;
		}
		::v-deep .custom-label {
			font-size: 28rpx;
			color: #333;
			font-weight: 400;
			height: 72rpx;
			line-height: 72rpx;
			padding-right: 20rpx;
		}
		::v-deep .uni-list-item__container {
			padding-left: 0;
		}
		::v-deep .uni-icon-wrapper {
			padding: 0 !important;
		}
		.is-required {
			color: #dd524d;
			font-weight: bold;
		}
		.shop-address {
			margin: 24rpx 0 6rpx 0;
			font-weight: 400;
			font-size: 28rpx;
			color: #333333;
		}
		.map-text {
			font-weight: 400;
			font-size: 28rpx;
			color: #979798;
			margin-bottom: 14rpx;
		}
		.map-text2 {
			font-weight: 400;
			font-size: 24rpx;
			color: #979798;
			height: 56rpx;
			line-height: 56rpx;
			background: #f4f5f6;
			border-radius: 8rpx 8rpx 0rpx 0rpx;
		}
		.top_box_unicon {
			vertical-align: middle;
			margin: 0 6rpx 0 12rpx;
		}
		.upload-pic {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			// width: 160rpx;
			// height: 160rpx;
			// border-radius: 4rpx;
			// border: 2rpx dashed #999999;
			.img {
				width: 100%;
				height: 308rpx;
			}
		}
		.has-border {
			width: 99%;
			height: 308rpx;
			border-radius: 8rpx;
			border: 2rpx dashed #999999;
		}
		.differ-text {
			font-weight: 400;
			font-size: 28rpx;
			color: #333333;
			margin-bottom: 18rpx;
		}
	}
	.box-bottom {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #f2f2f2;
		text-align: center;
		height: 174rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9;
	}
	.submit-btn {
		width: 608rpx;
		height: 108rpx;
		background: linear-gradient(135deg, #ff7f2b 0%, #fa4f0b 100%);
		font-weight: 500;
		font-size: 48rpx;
		color: #ffffff;
		line-height: 108rpx;
		text-align: center;
		border-radius: 60rpx;
	}
}
</style>
