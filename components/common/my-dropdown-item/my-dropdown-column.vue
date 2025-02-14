<template>
	<view class="my-dropdown-floor">
		<scroll-view :scroll-y="true" style="height: auto; max-height: 440rpx">
			<view class="my-dropdown-floor_item" v-for="(item, index) in options" :key="index">
				<text class="my-dropdown-floor_title" v-if="item.title">{{ item.title }}</text>
				<view class="my-dropdown-floor_ul">
					<text
						:class="['my-dropdown-floor_li', selected[item.key]['value'] == cell.value ? 'my-dropdown-floor_li__active' : '']"
						v-for="(cell, cellIndex) in item.children"
						:key="cellIndex"
						@click.stop.prevent="handlerCellClick(item.key, cell.value, cell)"
					>
						{{ cell.label }}
					</text>
				</view>
				<view v-if="secondList.length > 0" style="height: 2rpx; background: #ccc; width: 92%; margin: 24rpx"></view>
				<view class="my-dropdown-floor_ul" v-if="secondList.length > 0">
					<text
						:class="[
							'my-dropdown-floor_li',
							secondSelected['secondKey']['value'] == cell.value ? 'my-dropdown-floor_li__active' : ''
						]"
						v-for="(cell, cellIndex) in secondList"
						:key="cellIndex"
						@click.stop.prevent="handlerCellClick(item.key, cell.value, cell)"
					>
						{{ cell.label }}
					</text>
				</view>
			</view>
		</scroll-view>
		<view class="my-dropdown-button-list">
			<view class="my-dropdown-button-view" style="margin-top: 38rpx; border-top: 1px solid #ccc">
				<button class="my-dropdown-button-item" @click.stop.prevent="handlerCancel">
					<text class="my-dropdown-button-text" :style="{ color: inactiveBtnColor, backgroundColor: inactiveBtnBgColor }">
						取消
					</text>
				</button>
				<!-- <text class="my-dropdown-button-border-left"></text> -->
				<button class="my-dropdown-button-item" @click.stop.prevent="handlerConfirm">
					<text class="my-dropdown-button-text" :style="{ color: activeBtnColor, backgroundColor: activeBtnBgColor }">确定</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 当前选中项的key值
		dropdownKey: {
			type: String,
			default: ''
		},
		// 选项数据，如果传入了默认slot，此参数无效
		options: {
			type: Array,
			default() {
				return []
			}
		},
		// 当前选中项的value值
		value: {
			type: [Number, String, Array, Object],
			default: ''
		},
		// 激活时的颜色
		activeColor: {
			type: String,
			default: '#FA520D'
		},
		// 未激活时的颜色
		inactiveColor: {
			type: String,
			default: '#666666'
		},
		// 激活的背景颜色
		activeBgColor: {
			type: String,
			default: '#FD5100'
		},
		// 未激活的背景颜色
		inactiveBgColor: {
			type: String,
			default: '#ffffff'
		},
		// 按钮激活时的颜色
		activeBtnColor: {
			type: String,
			default: '#ffffff'
		},
		// 按钮未激活时的颜色
		inactiveBtnColor: {
			type: String,
			default: '#FD5100'
		},
		// 按钮未激活时背景颜色
		inactiveBtnBgColor: {
			type: String,
			default: '#FFDECE'
		},
		// 按钮未激活时背景颜色
		activeBtnBgColor: {
			type: String,
			default: '#FD5100'
		}
	},
	data() {
		return {
			selected: {}, // 存储选中的值
			secondList: [],
			secondSelected: {
				secondKey: ''
			}
		}
	},
	watch: {
		value: {
			immediate: true,
			deep: true,
			handler: function (val) {
				// console.log(val)
				console.log(this.$parent)
				const $parent = this.$parent.$parent.$parent
				const arr = this.funRecursion(this.options, val)
				// console.log(arr)
				if (arr) {
					arr.pop()
					// console.log(arr)
					if (arr.length === 1) {
						this.$set(this.selected, 'firstKey', arr[0])
					} else if (arr.length === 2) {
						this.secondList = arr[1].children
						this.$set(this.selected, 'firstKey', arr[1])
						this.$set(this.secondSelected, 'secondKey', arr[0])
					}
					$parent.menuList.forEach((item) => {
						if (item.dropdownKey === this.dropdownKey) item.title = arr[0].label
					})
				}
			}
		}
	},
	methods: {
		funRecursion(list, value) {
			for (let i in list) {
				if (list[i].value == value) return [{ ...list[i] }]
				if (list[i].children && list[i].children.length > 0) {
					let node = this.funRecursion(list[i].children, value)
					if (node !== undefined) return node.concat({ ...list[i] })
				}
			}
		},
		handlerCellClick(key, data, item) {
			console.log(item)
			if (item.hasOwnProperty('children')) {
				this.secondList = item.children
			}
			if (item.level === 1) {
				this.$set(this.selected, key, { label: item.label, value: data })
				this.$set(this.secondSelected, 'secondKey', '')
			} else if (item.level === 2) {
				this.$set(this.secondSelected, 'secondKey', { label: item.label, value: data })
			}
			// console.log(key, data)
			// console.log(this.selected)
			// console.log(this.secondSelected)
		},
		handlerCancel() {
			this.$emit('success', {
				cancel: true,
				type: 'column'
			})
		},
		handlerConfirm() {
			try {
				this.$emit('success', {
					confirm: true,
					type: 'column',
					data: JSON.parse(JSON.stringify({ ...this.selected, ...this.secondSelected }))
				})
				this.$emit(
					'input',
					this.secondSelected['secondKey'].value ? this.secondSelected['secondKey'].value : this.selected['firstKey'].value
				)
			} catch (err) {
				this.$emit('success', {
					confirm: true,
					type: 'column',
					data: JSON.parse(JSON.stringify({ ...this.selected, ...this.secondSelected }))
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
// 定义混入指令，用于在非nvue环境下的flex定义，因为nvue没有display属性，会报错
@mixin vue-flex($direction: row) {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: $direction;
}

// @include vue-flex;

.my-dropdown-floor {
	background-color: #ffffff;
	border-top: 1px solid #f2f2f2;
}

.my-dropdown-floor_item {
	// margin-top: 42rpx;
}

.my-dropdown-floor_title {
	font-size: 30rpx;
	color: #333333;
	padding-bottom: 6rpx;
	margin-left: 40rpx;
	font-weight: bold;
}

.my-dropdown-floor_ul {
	@include vue-flex;
	align-items: center;
	flex-wrap: wrap;
	padding: 0 40rpx 0 20rpx;
}

.my-dropdown-floor_li {
	// border: 1px solid #EFEFEF;
	height: 68rpx;
	line-height: 68rpx;
	text-align: center;
	padding: 0 28rpx;
	border-radius: 16rpx;
	background-color: #f4f5f6;
	color: #909090;
	font-size: 28rpx;
	margin-left: 20rpx;
	margin-top: 20rpx;
}

.my-dropdown-floor_li__active {
	// border-color: #00BCD4;
	color: #fd5100;
	background-color: #ffdece;
}

.my-dropdown-button-list {
	padding: 0 28rpx;
}

.my-dropdown-button-view {
	@include vue-flex;
	align-items: center;
	padding: 36rpx 0;
}

.my-dropdown-button-item {
	@include vue-flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	height: 100rpx;
	background-color: #ffffff;
	border-radius: 0;
	border-width: 0rpx;

	/* #ifndef APP-NVUE */
	&::after {
		border: none;
	}

	/* #endif */
}

.my-dropdown-button-text {
	font-size: 30rpx;
	padding: 0 82rpx;
	border-radius: 38rpx;
}

.my-dropdown-button-border-left {
	width: 1px;
	height: 100rpx;
	background-color: #f2f2f2;
	transform: scaleX(0.7);
}
</style>
