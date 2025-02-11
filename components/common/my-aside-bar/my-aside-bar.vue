<template>
	<view class="my-aside-bar">
		<view
			class="menu_name"
			:id="'menu_name' + index"
			:class="{ menu_name_active: current == index }"
			v-for="(item, index) in list"
			@click="onChangeItem(item, index)"
			:key="index"
		>
			{{ item.name }}
			<view class="line" v-if="current == index"></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => {
				return []
			}
		},
		currentIndex: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			current: 0
		}
	},
	watch: {
		currentIndex(index) {
			this.current = index
		}
	},
	methods: {
		onChangeItem(item, index) {
			if (this.current == index) {
				return
			}
			this.current = index
			this.$emit('change', { item, index })
		}
	}
}
</script>

<style lang="scss">
.my-aside-bar {
	.menu_name {
		height: 116rpx;
		line-height: 116rpx;
		text-align: center;
		color: #333;
		position: relative;
	}

	.menu_name_active {
		background: #fff;
		color: #ff2800;
		border-radius: 16rpx 0rpx 0rpx 16rpx;
	}
	.line {
		width: 6rpx;
		height: 44rpx;
		background: linear-gradient(180deg, #ff7c4c 0%, #f83c12 100%);
		border-radius: 0rpx 4rpx 4rpx 0rpx;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}
}
</style>
