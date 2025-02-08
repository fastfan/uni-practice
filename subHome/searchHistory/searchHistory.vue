<template>
	<view class="subhome-search-history">
		<uni-nav-bar
			class="nav"
			left-icon="left"
			@clickLeft="leftClick"
			:statusBar="true"
			:fixed="true"
			:border="false"
			leftWidth="40rpx"
			:rightWidth="menuButtonWidth"
		>
			<view class="search-con">
				<view class="search">
					<text class="search-text" @click="clickSelect">{{ selectVal }}</text>
					<tui-icon name="turningdown" size="26" style="margin-top: 16rpx" @click="clickSelect" />
					<text class="text2">|</text>
					<input type="text" class="search-input" placeholder="请输入搜索内容" v-model="searchKeyValue" />
					<view class="search-btn" @click="onClickSearchValue">搜索</view>
				</view>
			</view>
		</uni-nav-bar>
		<view class="bubble" v-show="show" :style="{ top: topHeight }">
			<view
				class="item"
				:class="item.key === selectKey ? 'active' : ''"
				v-for="(item, index) in list"
				:key="item.key"
				@click="clickItem(item)"
			>
				{{ item.name }}
			</view>
		</view>
		<view class="block">
			<view class="top">
				<view class="text">历史搜索</view>
				<uni-icons type="trash" size="20" @click="onClickDelete"></uni-icons>
			</view>
			<view class="bottom">
				<view class="tag" v-for="(item, index) in tagList" :key="index">
					<uni-tag
						:text="item.name"
						:circle="true"
						custom-style="background-color:#EBEBEB;color:#666666;padding:10rpx 34rpx;font-size:28rpx;"
					/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			searchKeyValue: '',
			menuButtonWidth: '',
			topHeight: 0,
			selectVal: '商品',
			selectKey: 'goods',
			list: [
				{ name: '商品', key: 'goods' },
				{ name: '店铺', key: 'shops' }
			],
			tagList: [
				{ name: '洗衣液' },
				{ name: '纳爱斯' },
				{ name: '好人家火锅底料' },
				{ name: '嘉贝诗雅' },
				{ name: '夏威夷果' },
				{ name: '脱脂牛奶' }
			]
		}
	},
	methods: {
		leftClick() {
			uni.navigateBack()
		},
		onClickSearchValue() {
			console.log('点击了搜索')
		},
		onClickDelete() {
			console.log('点击了删除')
		},
		clickSelect() {
			console.log(1111111111)
			this.show = !this.show
		},
		clickItem(item) {
			this.selectKey = item.key
			this.selectVal = item.name
			this.show = !this.show
		},
		getMenuButtonWidth() {
			// 判断是否在微信小程序环境中
			if (
				uni.getSystemInfoSync().platform === 'devtools' ||
				uni.getSystemInfoSync().platform === 'ios' ||
				uni.getSystemInfoSync().platform === 'android'
			) {
				try {
					const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
					if (menuButtonInfo) {
						this.menuButtonWidth = menuButtonInfo.width
					}
				} catch (error) {
					console.error('获取微信小程序胶囊按钮信息失败:', error)
				}
			}
		}
	},
	onLoad() {
		this.getMenuButtonWidth()
		console.log(getApp())
		const { statusBarHeight, navBarHeight } = getApp().globalData
		this.topHeight = statusBarHeight + navBarHeight + 'px'
	}
}
</script>

<style lang="scss">
.subhome-search-history {
	height: 100vh;
	background: #ffffff;
	.uni-navbar__header-container {
		padding: 0 !important;
	}
	.search-con {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.search {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			background: #ecedee;
			width: 100%;
			border-radius: 35rpx;
			height: 66rpx;
			line-height: 66rpx;

			.img {
				width: 44rpx;
				height: 46rpx;
				margin-left: 30rpx;
			}
			.search-text {
				display: inline-block;
				font-weight: 400;
				font-size: 32rpx;
				color: #666666;
				margin-left: 32rpx;
				margin-bottom: 2rpx;
			}
			.search-input {
				flex: 1;
				margin: 0 20rpx;
				font-size: 28rpx;
			}
			.text2 {
				font-size: 32rpx;
				display: inline-block;
				margin-bottom: 4rpx;
				color: #9b9c9c;
			}
			.search-btn {
				height: 58rpx;
				line-height: 58rpx;
				border-radius: 35rpx;
				color: #fff;
				text-align: center;
				background: #ff7a4a;
				width: 104rpx;
				margin-right: 4rpx;
			}
		}

		.change {
			width: 40rpx;
			height: 40rpx;
			margin-left: 20rpx;
		}
	}
	.bubble {
		box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.15);
		position: fixed;
		left: 72rpx;
		top: 154rpx;
		z-index: 999;
		background: #fff;
		.item {
			font-weight: 400;
			font-size: 32rpx;
			color: #797979;
			margin: 24rpx 24rpx 0 24rpx;
			border-bottom: 1px solid #d8d8d8;
			padding-bottom: 24rpx;
		}
		.active {
			color: #ff4400;
		}
	}
	.bubble:before {
		content: '';
		width: 0;
		height: 0;
		border: 10px solid transparent;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: -36rpx;
	}
	.bubble:after {
		content: '';
		width: 0;
		height: 0;
		border: 10px solid transparent;
		border-bottom-color: #ffffff;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: -36rpx;
	}

	.block {
		margin-top: 46rpx;
		padding: 0 24rpx;
		.top {
			display: flex;
			justify-content: space-between;
			padding: 0 12rpx;
			margin-bottom: 34rpx;
			.text {
				font-weight: 400;
				font-size: 32rpx;
				color: #333333;
			}
		}
		.bottom {
			display: flex;
			flex-flow: row wrap; /* 设置为行排列并允许换行 */
			flex-direction: row;
			padding: 0 12rpx;
			.tag {
				margin: 22rpx 24rpx 0 0;
				height: 60rpx;
			}
		}
	}
}
</style>
