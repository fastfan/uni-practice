<template>
	<!-- <view class="selectAddress"> -->
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
	<!-- </view> -->
</template>
<script>
import chinaAddress from '@/api/mock/citydata'
export default {
	name: 'selectAddress',
	data() {
		return {
			chinaAddress: [], // 全国省市区
			addressListData: [], // 全国省市区
			addressSelectListData: [0, 0, 0], // 当前选择的省市区 index
			addressListStr: '', // 当前选择的省市区
			addressCodeListStr: ''
		}
	},
	mounted() {
		this.chinaAddress = chinaAddress
		// 获取全国省份
		this.getProvince()
	},

	methods: {
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
			console.log('province::::', province)
			console.log('chinaAddress::::', chinaAddress)
			const chinaAddress_Item = chinaAddress.find((item) => {
				return item.code === province
			})
			console.log('chinaAddress_Item::::', chinaAddress_Item)
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
			console.log('e:::::::', e)
			console.log('this.addressSelectListData:::::::', this.addressSelectListData)
			console.log('this.addressListData:::::::', this.addressListData)
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
	}
}
</script>
<style lang="scss">
.selectAddress {
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid gold;
	padding: 10rpx 0;

	.noneAddress {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #cdcdcd;
	}
	.haveAddress {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
}
</style>
