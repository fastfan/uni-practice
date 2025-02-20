<template>
	<uni-popup ref="popup" type="bottom" :safe-area="false">
		<view class="tpf-time-range-section" v-if="shows">
			<view class="tpf-time-range-title-section flex flex-align-center flex-pack-justify">
				<text class="tpf-time-range-title-txt tpf-time-range-cancel" @tap="closePopup('cancel')">取消</text>
				<text class="tpf-time-range-title-txt tpf-time-range-title">时间范围选择</text>
				<text class="tpf-time-range-title-txt tpf-time-range-sure" @tap="closePopup('sure')">确定</text>
			</view>
			<view class="tpf-time-range-main flex flex-l flex-align-center flex-pack-justify">
				<view class="tpf-time-range-item flex flex-v flex-align-center">
					<!-- <text class="tpf-start-time">开始时间</text> -->
					<picker-view
						class="flex-1 tpf-picker-view"
						:value="startDefaultTimeArr"
						indicator-style="height: 50px;"
						@change="startTimeChange"
					>
						<picker-view-column>
							<view
								class="tpf-time-range-picker-item flex flex-align-center flex-pack-center"
								v-for="(item, index) in createTimeRange.hours"
								:key="index"
							>
								{{ item }}
							</view>
						</picker-view-column>
						<picker-view-column>
							<view
								class="tpf-time-range-picker-item flex flex-align-center flex-pack-center"
								v-for="(item, index) in createTimeRange.startMinutes"
								:key="index"
							>
								{{ item }}
							</view>
						</picker-view-column>
					</picker-view>
				</view>
				<text class="tpf-time-divide">-</text>
				<view class="tpf-time-range-item flex flex-v flex-align-center">
					<!-- <text class="tpf-start-time">结束时间</text> -->
					<picker-view class="flex-1 tpf-picker-view" :value="endDefaultTimeArr" indicator-style="height: 50px;" @change="endTimeChange">
						<picker-view-column>
							<view
								class="tpf-time-range-picker-item flex flex-align-center flex-pack-center"
								v-for="(item, index) in createTimeRange.hours"
								:key="index"
							>
								{{ item }}
							</view>
						</picker-view-column>
						<picker-view-column>
							<view
								class="tpf-time-range-picker-item flex flex-align-center flex-pack-center"
								v-for="(item, index) in createTimeRange.endMinutes"
								:key="index"
							>
								{{ item }}
							</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
/**
 * TimeRange 时间范围选择
 * @description 对时间（时、分）区间进行选择，限制选择范围
 * @property {string} startTime 定义开始时间
 * @property {string} startDefaultTime 定义开始默认时间
 * @property {string} endTime 定义结束时间
 * @property {string} endDefaultTime 定义结束默认时间
 * @event {Function()} name
 */
export default {
	name: 'TpfTimeRange',
	props: {
		// 开始时间
		startTime: {
			type: String,
			default: '00:00',
			validator: (value) => {
				return /(((2[0-3])|([0-1][0-9])):[0-5][0-9])|24:00/.test(value)
			}
		},
		// 开始默认时间
		startDefaultTime: {
			type: String,
			// #ifdef MP-WEIXIN
			default: '00:00',
			// #endif
			// #ifndef MP-WEIXIN
			default() {
				return this.startTime
			},
			// #endif

			validator: (value) => {
				return /(((2[0-3])|([0-1][0-9])):[0-5][0-9])|24:00/.test(value)
			}
		},
		// 结束时间
		endTime: {
			type: String,
			default: '23:59',
			validator: (value) => {
				return /(((2[0-3])|([0-1][0-9])):[0-5][0-9])|24:00/.test(value)
			}
		},
		// 结束默认时间
		endDefaultTime: {
			type: String,
			// #ifdef MP-WEIXIN
			default: '23:59',
			// #endif
			// #ifndef MP-WEIXIN
			default() {
				return this.endTime
			},
			// #endif
			validator: (value) => {
				return /(((2[0-3])|([0-1][0-9])):[0-5][0-9])|24:00/.test(value)
			}
		}
	},
	data() {
		return {
			startDefaultTimeArr: [0, 0],
			endDefaultTimeArr: [23, 59],
			type: '',
			shows: false // 重点，处理默认值不回显的问题
		}
	},
	methods: {
		startTimeChange(e) {
			this.startDefaultTimeArr = e.detail.value
			if (this.compareTwoTimeRange(e.detail.value, this.endDefaultTimeArr)) this.endDefaultTimeArr = e.detail.value
		},
		endTimeChange(e) {
			this.endDefaultTimeArr = e.detail.value
			if (this.compareTwoTimeRange(this.startDefaultTimeArr, e.detail.value)) this.startDefaultTimeArr = e.detail.value
		},
		open(type) {
			this.shows = true
			this.type = type
			this.$refs.popup.open()
		},
		closePopup(action) {
			if (action === 'sure') {
				if (this.compareTwoTimeRange(this.startDefaultTimeArr, this.endDefaultTimeArr)) {
					uni.showToast({
						title: '开始时间不能大于结束时间',
						icon: 'none'
					})
					return false
				}
				let startTime =
					this.createTimeRange.hours[this.startDefaultTimeArr[0]] + ':' + this.createTimeRange.startMinutes[this.startDefaultTimeArr[1]]
				let endTime =
					this.createTimeRange.hours[this.endDefaultTimeArr[0]] + ':' + this.createTimeRange.endMinutes[this.endDefaultTimeArr[1]]
				this.$root.$emit('timeRange', this.type, [startTime, endTime])
			}
			this.shows = false
			this.$refs.popup.close()
		},
		compareTwoTimeRange(arr1 = [], arr2 = []) {
			if (arr1[0] > arr2[0] || (arr1[0] == arr2[0] && arr1[1] > arr2[1])) return true
			return false
		}
	},
	beforeCreate() {
		// 初始化小时
		let hour = [],
			minute = []
		for (let h = 0; h <= 24; h++) {
			hour.push(h < 10 ? '0' + h : h + '')
		}
		for (let m = 0; m < 60; m++) {
			minute.push(m < 10 ? '0' + m : m + '')
		}
		this.timeRange = { hour, minute }
	},
	created() {},
	computed: {
		createTimeRange() {
			let { startTime, startDefaultTime, endTime, endDefaultTime } = this.timeRangeDateChange
			let startTimeArr = startTime.split(':'),
				endTimeArr = endTime.split(':')
			let hours = this.timeRange.hour.slice(
				this.timeRange.hour.findIndex((item) => item == startTimeArr[0]),
				this.timeRange.hour.findIndex((item) => item == endTimeArr[0]) + 1
			)
			let endhours = this.timeRange.hour.slice(
				this.timeRange.hour.findIndex((item) => item == endTimeArr[0]),
				this.timeRange.hour.findIndex((item) => item == endTimeArr[1])
			)
			let startMinutes = null
			if (startTimeArr[0] == endTimeArr[0]) {
				startMinutes = this.timeRange.minute.slice(
					this.timeRange.minute.findIndex((item) => item == startTimeArr[1]),
					this.timeRange.minute.findIndex((item) => item == endTimeArr[1]) + 1
				)
			} else {
				if (this.startDefaultTimeArr[0] == 0) {
					startMinutes = this.timeRange.minute.slice(this.timeRange.minute.findIndex((item) => item == startTimeArr[1]))
				} else if (this.startDefaultTimeArr[0] == hours.length - 1) {
					startMinutes = this.timeRange.minute.slice(0, this.timeRange.minute.findIndex((item) => item == endTimeArr[1]) + 1)
				} else {
					startMinutes = this.timeRange.minute // 完整数据
				}
			}
			let endMinutes = null
			if (startTimeArr[0] == endTimeArr[0]) {
				endMinutes = this.timeRange.minute.slice(
					this.timeRange.minute.findIndex((item) => item == startTimeArr[1]),
					this.timeRange.minute.findIndex((item) => item == endTimeArr[1]) + 1
				)
			} else {
				if (this.endDefaultTimeArr[0] == 0) {
					endMinutes = this.timeRange.minute.slice(this.timeRange.minute.findIndex((item) => item == startTimeArr[1]))
				} else if (this.endDefaultTimeArr[0] == hours.length - 1) {
					endMinutes = this.timeRange.minute.slice(0, this.timeRange.minute.findIndex((item) => item == endTimeArr[1]) + 1)
				} else {
					endMinutes = this.timeRange.minute // 完整数据
				}
			}
			// console.log('this.endDefaultTime:::::::::::', this.endDefaultTimeArr)
			return {
				hours,
				endhours,
				startMinutes,
				endMinutes
			}
		},
		// 用于监听属性的变化
		timeRangeDateChange() {
			let { startTime, startDefaultTime, endTime, endDefaultTime } = this
			startTime = startTime < endTime ? startTime : endTime
			startDefaultTime = startDefaultTime >= startTime && startDefaultTime <= endTime ? startDefaultTime : startTime
			endDefaultTime =
				endDefaultTime >= startTime && endDefaultTime <= endTime && endDefaultTime >= startDefaultTime ? endDefaultTime : startDefaultTime
			return {
				startTime,
				startDefaultTime,
				endTime,
				endDefaultTime
			}
		}
	},
	watch: {
		timeRangeDateChange: {
			handler(newVal, oldVal) {
				let { startTime, startDefaultTime, endTime, endDefaultTime } = newVal
				let startTimeArr = startTime.split(':'),
					endTimeArr = endTime.split(':')
				let startDefaultTimeArr = startDefaultTime.split(':'),
					endDefaultTimeArr = endDefaultTime.split(':')
				let hours = this.timeRange.hour.slice(
					this.timeRange.hour.findIndex((item) => item == startTimeArr[0]),
					this.timeRange.hour.findIndex((item) => item == endTimeArr[0]) + 1
				)
				this.$set(
					this.startDefaultTimeArr,
					0,
					hours.includes(startDefaultTimeArr[0]) ? hours.findIndex((item) => item == startDefaultTimeArr[0]) : 0
				)
				// console.log('this.startDefaultTimeArr:::::::::::', this.startDefaultTimeArr)
				this.$set(
					this.endDefaultTimeArr,
					0,
					hours.includes(endDefaultTimeArr[0]) ? hours.findIndex((item) => item == endDefaultTimeArr[0]) : this.startDefaultTimeArr[0]
				)
				// console.log('this.endDefaultTimeArr:::::::::::', this.endDefaultTimeArr)
				let startMinute = null,
					endMinute = null
				if (startTimeArr[0] == endTimeArr[0]) {
					startMinute = endMinute = this.timeRange.minute.slice(
						this.timeRange.minute.findIndex((item) => item == startTimeArr[1]),
						this.timeRange.minute.findIndex((item) => item == endTimeArr[1]) + 1
					)
				} else {
					if (startDefaultTime.split(':')[0] == startTimeArr[0]) {
						startMinute = this.timeRange.minute.slice(this.timeRange.minute.findIndex((item) => item == startTimeArr[1]))
					} else if (startDefaultTime.split(':')[0] == endTimeArr[0]) {
						startMinute = this.timeRange.minute.slice(0, this.timeRange.minute.findIndex((item) => item == endTimeArr[1]) + 1)
					} else {
						startMinute = this.timeRange.minute
					}
					if (endDefaultTime.split(':')[0] == startTimeArr[0]) {
						endMinute = this.timeRange.minute.slice(this.timeRange.minute.findIndex((item) => item == startTimeArr[1]))
					} else if (endDefaultTime.split(':')[0] == endTimeArr[0]) {
						endMinute = this.timeRange.minute.slice(0, this.timeRange.minute.findIndex((item) => item == endTimeArr[1]) + 1)
					} else {
						endMinute = this.timeRange.minute
					}
				}
				this.$set(
					this.startDefaultTimeArr,
					1,
					startMinute.includes(startDefaultTimeArr[1]) ? startMinute.findIndex((item) => item == startDefaultTimeArr[1]) : 0
				)
				// console.log('this.startDefaultTimeArr2:::::::::::', this.startDefaultTimeArr)
				this.$set(
					this.endDefaultTimeArr,
					1,
					endMinute.includes(endDefaultTimeArr[1])
						? endMinute.findIndex((item) => item == endDefaultTimeArr[1])
						: this.startDefaultTimeArr[1]
				)
				// console.log('this.endDefaultTimeArr2:::::::::::', this.endDefaultTimeArr)
			},
			deep: true, // 深度监听
			immediate: true // 初始化立即执行
		}
	}
}
</script>

<style lang="scss" scoped>
.flex {
	display: flex;
}
.flex-v {
	flex-direction: column;
}
.flex-wrap {
	flex-wrap: wrap;
}
.flex-row-wrap {
	flex-flow: row wrap;
}
.flex-1 {
	flex: 1;
}
.flex-align-center {
	align-items: center;
}
.flex-pack-center {
	justify-content: center;
}
.flex-pack-justify {
	justify-content: space-between;
}
.flex-pack-around {
	justify-content: space-around;
}
.tpf-time-range-section {
	background-color: #fff;
}
.tpf-time-range-title-section {
	padding: 20rpx;
	border-bottom: 1px #f2f2f2 solid;
}
.tpf-time-range-title-txt {
	font-size: 28rpx;
}
.tpf-time-range-title {
	font-size: 32rpx;
}
.tpf-time-range-main {
	padding: 0 20rpx 20rpx;
}
.tpf-time-range-item {
	height: 400rpx;
	width: 300rpx;
}
.tpf-start-time {
	padding: 20rpx 0;
}
.tpf-picker-view {
	width: 280rpx;
}
.tpf-time-range-sure {
	color: #ff7f2b;
}
</style>
