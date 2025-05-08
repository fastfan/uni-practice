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
			<uni-badge
				class="uni-badge-left-margin"
				:text="item.count"
				absolute="rightTop"
				:offset="[0, 18]"
				size="small"
				:customStyle="{ background: 'linear-gradient(135deg, #ff7f2b 0%, #fa4f0b 100%)' }"
			>
				{{ item.categoryName }}
			</uni-badge>
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
		currentIndex: {
			handler: function (index) {
				// console.log(index)
				this.current = index
			},
			immediate: true,
			deep: true
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
