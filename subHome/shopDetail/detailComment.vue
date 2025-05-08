<template>
	<view class="detail-comment" style="height: 100vh">
		<mescroll-uni :fixed="false" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback">
			<view class="comment-content" v-for="(item, index) in commentList" :key="index">
				<view class="detail-comment-top flex_box">
					<image :src="item.headImgUrl" class="img"></image>
					<view class="content">
						<view class="text">{{ item.nickname }}</view>
						<view class="text2">{{ item.createTime }}</view>
					</view>
				</view>
				<view class="detail-comment-mid">
					<image class="img" :src="getImg(item.score)"></image>
					{{ getAttitude(item.score) }}
				</view>
				<view class="detail-comment-title">{{ item.description }}</view>
				<view class="detail-comment-bottom">
					<view v-for="(src, srcIndex) in item.attachFileList" :key="src.fileUrl" class="item">
						<image class="img" :src="src.fileUrl" v-if="src.fileType == 1" mode="aspectFill" @click="scanImg(item, srcIndex)"></image>
						<video class="img" :src="src.fileUrl" http-cache v-else></video>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
import { orderServer } from '@/viewModel/order/order.js'
const ImgMap = new Map([
	[5, 'https://oss.ruikedz.com/51life/static/images/shop/manyi@2x.png'],
	[4, 'https://oss.ruikedz.com/51life/static/images/shop/manyi@2x.png'],
	[3, 'https://oss.ruikedz.com/51life/static/images/shop/yiban@2x.png'],
	[2, 'https://oss.ruikedz.com/51life/static/images/shop/bumanyi@2x.png'],
	[1, 'https://oss.ruikedz.com/51life/static/images/shop/bumanyi@2x.png']
])
const attitudeMap = new Map([
	[5, '非常满意'],
	[4, '满意'],
	[3, '一般'],
	[2, '不满意'],
	[1, '很差']
])
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue'
export default {
	props: {
		storeId: {
			type: String,
			default() {
				return ''
			}
		}
	},
	mixins: [MescrollMixin],
	components: {
		MescrollUni
	},
	data() {
		return {
			ImgMap,
			commentList: [],
			downOption: {
				isLock: true
			},
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 3, // 配置列表的总数量要大于等于999条才显示'-- END --'的提示
				textNoMore: '已经到底了~',
				toTop: {
					src: null,
					html: null
				},
				empty: {
					tip: '暂无相关数据'
				}
			}
		}
	},
	mounted() {
		console.log('commentList::::::', commentList)
	},
	methods: {
		getImg(score) {
			// 综合评分<=1 很差,>1且小于等于2不满意，>2且小于等于3一般,大于3且小于等于4满意,大于4且小于等于5非常满意
			const type =
				score <= 1
					? 1
					: score > 1 && score <= 2
					? 2
					: score > 2 && score <= 3
					? 3
					: score > 3 && score <= 4
					? 4
					: score > 4 && score <= 5
					? 5
					: 1
			return ImgMap.get(type)
		},
		getAttitude(score) {
			// 综合评分<=1 很差,>1且小于等于2不满意，>2且小于等于3一般,大于3且小于等于4满意,大于4且小于等于5非常满意
			const type =
				score <= 1
					? 1
					: score > 1 && score <= 2
					? 2
					: score > 2 && score <= 3
					? 3
					: score > 3 && score <= 4
					? 4
					: score > 4 && score <= 5
					? 5
					: 1
			return attitudeMap.get(type)
		},
		scanImg(item, current) {
			// 预览图片
			const files = item.attachFileList.filter((_tt) => _tt.fileType == 1)
			const attachFileList = files.map((_tt) => {
				return _tt.fileUrl
			})
			uni.previewImage({
				current,
				urls: attachFileList,
				longPressActions: {
					itemList: [],
					success: function (data) {
						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片')
					},
					fail: function (err) {
						console.log(err.errMsg)
					}
				}
			})
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		async upCallback(page) {
			try {
				const params = {
					pageNum: page.num,
					pageSize: page.size,
					storeId: this.storeId
				}
				const { code, data, msg } = await orderServer.orderEvaluationListByStoreId({ ...params })
				if (code === 200) {
					// 设置列表数据
					if (page.num == 1) {
						this.commentList = [] //如果是第一页需手动制空列表
					}

					data.records.forEach((_tt) => {
						const imageFile = _tt.attachFileList.filter((_mm) => _mm.fileType == 1)
						const videoFile = _tt.attachFileList.filter((_mm) => _mm.fileType == 4)
						_tt.attachFileList = [...imageFile, ...videoFile]
					})
					this.commentList = this.commentList.concat(data.records) //追加新数据
					this.$nextTick(() => {
						this.mescroll.endByPage(data.records.length, data.pages) //必传参数(当前页的数据个数, 总页数)
					})
				} else {
					console.log(msg)
				}
			} catch (error) {
				// this.$tui.toast(error)
				console.log(error)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.detail-comment {
	padding: 24rpx;
	background: #ffffff;
	.comment-content {
		border-bottom: 1px solid #e3e3e3;
		&:last-child {
			border-bottom: none;
		}
	}
	&-top {
		margin-bottom: 18rpx;
		padding-top: 24rpx;
		.img {
			width: 84rpx;
			height: 84rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		.content {
			align-items: flex-start;
			.text {
				font-weight: 400;
				font-size: 32rpx;
				line-height: 44rpx;
				color: #000000;
				margin-bottom: 6rpx;
			}
			.text2 {
				font-weight: 400;
				font-size: 24rpx;
				line-height: 34rpx;
				color: #808080;
			}
		}
	}
	&-mid {
		font-weight: 400;
		font-size: 24rpx;
		color: #808080;
		margin-bottom: 10rpx;
		margin-left: 12rpx;
		.img {
			width: 40rpx;
			height: 40rpx;
			margin-right: 16rpx;
			vertical-align: bottom;
		}
	}
	&-title {
		font-weight: 400;
		font-size: 24rpx;
		color: #333333;
		margin-bottom: 24rpx;
		margin-left: 12rpx;
	}
	&-bottom {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		flex-flow: row wrap;
		width: 100%;
		.item {
			border-radius: 8rpx;
			flex: 1;
			height: 176rpx;
			margin: 0 18px 18px 0; // 间隙为5px
			width: calc((100% - 36px) / 3); // 这里的10px = (分布个数3-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
			min-width: calc((100% - 36px) / 3); // 加入这两个后每个item的宽度就生效了
			max-width: calc((100% - 36px) / 3); // 加入这两个后每个item的宽度就生效了
			&:nth-child(3n) {
				// 去除第3n个的margin-right
				margin-right: 0;
			}
		}

		.img {
			width: 100%;
			height: 100%;
			border-radius: 8rpx;
		}
	}
}
</style>
