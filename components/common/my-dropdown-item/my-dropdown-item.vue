<template>
	<view
		:class="['my-dropdown-item', 'my_dropdown-item']"
		@touchmove.stop.prevent="() => {}"
		:style="{ height: activeItemHeight + 'rpx' }"
		v-if="active"
	>
		<template v-if="!custom">
			<template v-if="type === 'radioBlock'">
				<view class="my-dropdown-floor">
					<scroll-view :scroll-y="true" style="height: auto; max-height: 440rpx">
						<view class="my-dropdown-floor_item" v-for="(item, index) in options" :key="index">
							<text class="my-dropdown-floor_title" v-if="item.title">{{ item.title }}</text>
							<view class="my-dropdown-floor_ul">
								<text
									:class="['my-dropdown-floor_li', selected['firstKey']['value'] == cell.value ? 'my-dropdown-floor_li__active' : '']"
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
								<text class="my-dropdown-button-text" :style="{ color: inactiveBtnColor, backgroundColor: inactiveBtnBgColor }">重置</text>
							</button>
							<!-- <text class="my-dropdown-button-border-left"></text> -->
							<button class="my-dropdown-button-item" @click.stop.prevent="handlerConfirm">
								<text class="my-dropdown-button-text" :style="{ color: activeBtnColor, backgroundColor: activeBtnBgColor }">确定</text>
							</button>
						</view>
					</view>
				</view>
			</template>
			<template v-if="type === 'radioList'">
				<scroll-view :scroll-y="true" class="my_dropdown-item_scroll" :style="getScrollStyle">
					<view
						v-for="(item, index) in options[0].children"
						:key="index"
						@click.stop.prevent="cellClick(item)"
						class="my_dropdown-item_scroll_cell"
						:style="{ height: `${itemHeight}rpx`, 'line-height': `${itemHeight}rpx` }"
					>
						<text class="my_cell_title" v-if="item.label" :style="{ color: value == item.value ? activeColor : inactiveColor }">
							{{ item.label }}
						</text>
						<uni-icons v-if="value == item.value" type="checkmarkempty" size="22" :color="activeColor" />
					</view>
				</scroll-view>
			</template>
		</template>
		<slot v-else></slot>
	</view>
</template>

<script>
/**
 * dropdown-item 下拉菜单
 * @description 该组件一般用于向下展开菜单，同时可切换多个选项卡的场景
 * @property {String | Number} v-model 双向绑定选项卡选择值
 * @property {Array[Object]} options 选项数据，如果传入了默认slot，此参数无效
 * @property {Boolean} disabled 是否禁用此选项卡（默认false）
 * @property {String | Number} duration 选项卡展开和收起的过渡时间，单位ms（默认300）
 * @property {String | Number} height 弹窗下拉内容的高度(内容超出将会滚动)（默认auto）
 * @property {String } activeColor 激活时的颜色
 * @property {String } inactiveColor 未激活时的颜色
 * @property {String } activeBgColor 确定按钮的背景颜色
 * @property {String } inactiveBgColor 取消确定按钮的背景色
 * @example <my-dropdown-item></my-dropdown-item>
 */
export default {
	name: 'my-dropdown-item',
	components: {},
	props: {
		// 当前选中项的key值
		dropdownKey: {
			type: String,
			default: ''
		},
		// 当前选中项的value值
		value: {
			type: [Number, String, Array, Object],
			default: ''
		},
		// 选项数据，如果传入了默认slot，此参数无效
		options: {
			type: Array,
			default() {
				return []
			}
		},
		// 是否禁用此菜单项
		disabled: {
			type: Boolean,
			default: false
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
		},
		maxHeight: {
			type: Number,
			default: 800
		},
		itemHeight: {
			type: Number,
			default: 90
		},
		type: {
			type: String,
			default: ''
		},
		custom: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			initComponent: false,
			activeItemHeight: 300,
			active: false, // 当前项是否处于展开状态
			// #ifndef MP
			parent: null,
			// #endif
			selected: { firstKey: '' }, // 存储选中的值
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
				const $parent = this.$parent.$parent.menuList ? this.$parent.$parent : this.$parent.$parent.$parent
				if (val) {
					const arr = this.funRecursion(this.options, val)
					// console.log('arr:::::::', arr)
					if (arr) {
						arr.pop()
						$parent.menuList.forEach((item) => {
							if (item.dropdownKey === this.dropdownKey) item.title = arr[0].label
						})
						if (this.type === 'radioBlock') {
							if (arr.length === 1) {
								this.$set(this.selected, 'firstKey', arr[0])
							} else if (arr.length === 2) {
								this.secondList = arr[1].children
								this.$set(this.selected, 'firstKey', arr[1])
								this.$set(this.secondSelected, 'secondKey', arr[0])
							}
						}
					}
				}
			}
		}
	},
	computed: {
		getScrollHeight() {
			let height = this.options.length === 1 ? this.options[0].children.length * this.itemHeight : 0
			if (height === 0) {
				return 300
			} else if (height > this.maxHeight) {
				return this.maxHeight
			} else {
				return height
			}
		},
		getScrollStyle() {
			return {
				height: `${this.getScrollHeight}rpx`
			}
		}
	},
	created() {
		this.activeItemHeight = 300
		// #ifdef MP
		this.parent = null
		// #endif
	},
	mounted() {
		this.init()
	},
	methods: {
		funRecursion(list, value) {
			let values = value
			if (!value) {
				// console.log(this.selected)
				values = this.selected.firstKey.value
			}
			for (let i in list) {
				if (list[i].value == values) return [{ ...list[i] }]
				if (list[i].children && list[i].children.length > 0) {
					let node = this.funRecursion(list[i].children, values)
					if (node !== undefined) return node.concat({ ...list[i] })
				}
			}
		},
		// 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
		// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
		// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
		// 值(默认为undefined)，就是查找最顶层的$parent
		getParent(name = undefined) {
			try {
				let parent = this.$parent
				// 通过while历遍，这里主要是为了H5需要多层解析的问题
				while (parent) {
					// 父组件
					if (parent.$options && parent.$options.name !== name) {
						// 如果组件的name不相等，继续上一级寻找
						parent = parent.$parent
					} else {
						return parent
					}
				}
				return false
			} catch (err) {
				console.log(err)
				return false
			}
		},
		// 将当前px转换为rpx
		getScaleToRpx(px) {
			try {
				const screenWidth = uni.getSystemInfoSync().screenWidth
				const unit = 750 / screenWidth
				return px * unit
			} catch (err) {
				return px
			}
		},
		init() {
			try {
				let parent = this.getParent.call(this, 'my-dropdown')
				if (!parent) return
				this.parent = parent
				this.active = parent.currentKey == this.dropdownKey
				if (this.initComponent === false) {
					parent.childList.push(this) // 供父组件依次更新子组件显示内容
				}
				if (this.active === false) {
					this.initComponent = true
					return
				}
				if (this.type === 'cate' || this.type === 'address') {
					this.activeItemHeight = this.getScaleToRpx(320) + 100
				} else if (this.type === 'column') {
					this.activeItemHeight = this.getScaleToRpx(220) + 100
				} else {
					this.activeItemHeight = this.getScrollHeight
				}
				this.initComponent = true
			} catch (err) {
				console.log(err)
			}
		},
		// cell被点击
		cellClick(item) {
			// 修改通过v-model绑定的值
			this.$emit('input', item.value)
			// 通知父组件(my-dropdown)收起菜单
			this.parent.close()
			// 发出事件，抛出当前勾选项的value
			this.parent.$emit('change', { dropdownKey: this.dropdownKey, ...item })
		},
		handlerCellClick(key, data, item) {
			console.log(item)
			if (item.hasOwnProperty('children')) {
				if (item.children.length > 0) this.secondList = item.children
			}
			if (item.level === '1') {
				this.$set(this.selected, 'firstKey', { label: item.label, value: data })
				this.$set(this.secondSelected, 'secondKey', '')
			} else if (item.level === '2') {
				this.$set(this.secondSelected, 'secondKey', { label: item.label, value: data })
			}
		},
		handlerCancel() {
			this.parent.close()
			console.log(this.value)
			const arr = this.funRecursion(this.options, this.value)
			console.log(arr)
			if (arr) {
				arr.pop()
				if (this.type === 'radioBlock') {
					if (arr.length === 1) {
						this.$set(this.selected, 'firstKey', '')
					} else if (arr.length === 2) {
						this.secondList = []
						this.$set(this.selected, 'firstKey', '')
						this.$set(this.secondSelected, 'secondKey', '')
					}
					this.parent.$emit('cancel', { dropdownKey: this.dropdownKey })
				}
			}
		},
		handlerConfirm() {
			this.parent.close()
			this.$emit('input', this.secondSelected['secondKey'].value ? this.secondSelected['secondKey'].value : this.selected['firstKey'].value)
			this.parent.$emit('change', { dropdownKey: this.dropdownKey, ...this.selected, ...this.secondSelected })
		}
	}
}
</script>

<style lang="scss">
@mixin vue-flex($direction: row) {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: $direction;
}

.my_dropdown-item_scroll {
	@include vue-flex(column);
	border-top: 1px solid #ffffff;
}

.my_dropdown-item_scroll_cell {
	@include vue-flex(row);
	padding: 0 30rpx;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #ffffff;
	background-color: #ffffff;
}

.my_cell_title {
	font-size: 30rpx;
	text-align: left;
	color: #909399;
}

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
