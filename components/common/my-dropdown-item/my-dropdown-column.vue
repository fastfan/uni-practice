<template>
	<view class="my-dropdown-floor">
		<scroll-view :scroll-y="true" style="height: auto;max-height: 440rpx;">
			<view class="my-dropdown-floor_item" v-for="(item, index) in options" :key="index">
				<text class="my-dropdown-floor_title" v-if="item.title">{{ item.title }}</text>
				<view class="my-dropdown-floor_ul">
					<text
						:class="['my-dropdown-floor_li', selected[item.key] == cell.value ? 'my-dropdown-floor_li__active' : '']"
						v-for="(cell, cellIndex) in item.list" :key="cellIndex"
						@click.stop.prevent="handlerCellClick(item.key, cell.value)">{{ cell.text }}</text>
				</view>
			</view>
		</scroll-view>
		<view class="my-dropdown-button-list">
			<view class="my-dropdown-button-view" style="margin-top: 38rpx; border-top: 1px solid #ccc;">
				<button class="my-dropdown-button-item" @click.stop.prevent="handlerCancel"><text
						class="my-dropdown-button-text"
						:style="{color: cancelColor,backgroundColor:cancelBgColor}">取消</text></button>
				<!-- <text class="my-dropdown-button-border-left"></text> -->
				<button class="my-dropdown-button-item" @click.stop.prevent="handlerConfirm"><text
						class="my-dropdown-button-text"
						:style="{color: confirmColor,backgroundColor:confirmBgColor}">确定</text></button>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 选项数据，如果传入了默认slot，此参数无效
			options: {
				type: Array,
				default () {
					return []
				}
			},
			cancelColor: {
				type: String,
				default: '#FD5100'
			},
			confirmColor: {
				type: String,
				default: '#ffffff'
			},
			cancelBgColor: {
				type: String,
				default: '#FFDECE'
			},
			confirmBgColor: {
				type: String,
				default: '#FD5100'
			},
		},
		data() {
			return {
				selected: {}, // 存储选中的值
			}
		},
		watch: {
			options: {
				immediate: true,
				deep: true,
				handler: function(list) {
					for (var i = 0, len = list.length; i < len; i++) {
						if (list[i]['key']) {
							this.$set(this.selected, list[i]['key'], list[i]['default']);
						}
					}
				}
			}
		},
		methods: {
			handlerCellClick(key, data) {
				this.$set(this.selected, key, data);
			},
			handlerCancel() {
				this.$emit('success', {
					cancel: true,
					type: 'column',
				})
			},
			handlerConfirm() {
				try {
					this.$emit('success', {
						confirm: true,
						type: 'column',
						data: JSON.parse(JSON.stringify(this.selected))
					})
				} catch (err) {
					this.$emit('success', {
						confirm: true,
						type: 'column',
						data: JSON.parse(JSON.stringify(this.selected))
					})
				}
			}
		},
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
		background-color: #F4F5F6;
		color: #909090;
		font-size: 28rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
	}

	.my-dropdown-floor_li__active {
		// border-color: #00BCD4;
		color: #FD5100;
		background-color: #FFDECE;
	}


	.my-dropdown-button-list {
		padding: 0 28rpx;
	}

	.my-dropdown-button-view {
		@include vue-flex;
		align-items: center;
		padding: 36rpx 0
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