<template>
	<!-- <lime-painter /> -->
	<view>1111111111111</view>
	<!-- <PosterModel :painterProps="posterList[currentIndex]" /> -->
</template>

<script>
	import PosterModel from "@/components/common/my-poster/poster.vue"
	export default {
		// components: {
		// 	PosterModel
		// },
		data() {
			return {
				currentIndex: 0,
				posterList: [{
						imageUrl: '/static/share/img_haibao1.min.png',
						class: 'red',
						background: 'linear-gradient(180deg, #F9F5F5 0%, #FFE1CE 100%)',
						textColor: "#A9492A",
						borderStyle: '2rpx solid rgba(255, 157, 100, 1)',
						qrCodePic: '/static/share/img_kung1.png',
						userName: '大门牙胖仔',
						phone: '189****1312'
					},
					{
						imageUrl: '/static/share/img_haibao2.min.png',
						class: 'blue',
						background: 'rgba(255, 255, 255, 0.28)',
						textColor: "#1E81F6",
						borderStyle: '2rpx solid rgba(101, 172, 255, 1)',
						qrCodePic: '/static/share/img_kung2.png',
						userName: '大门牙胖仔',
						phone: '189****1312'
					},
					{
						imageUrl: '/static/share/img_haibao3.min.png',
						class: 'green',
						background: 'rgba(255, 255, 255, 0.47)',
						textColor: "#0BA827",
						borderStyle: '2rpx solid rgba(102, 230, 37, 1)',
						qrCodePic: '/static/share/img_kung3.png',
						userName: '大门牙胖仔',
						phone: '189****1312'
					},
					{
						imageUrl: '/static/share/img_haibao4.min.png',
						class: 'purple',
						background: 'rgba(255, 255, 255, 0.51)',
						textColor: "#E54685",
						borderStyle: '2rpx solid rgba(228, 119, 177, 1)',
						qrCodePic: '/static/share/img_kung4.png',
						userName: '大门牙胖仔',
						phone: '189****1312'
					},
					{
						imageUrl: '/static/share/img_haibao5.min.png',
						class: 'orange',
						background: 'rgba(255, 255, 255, 0.58)',
						textColor: "#CC4502",
						borderStyle: '2rpx solid rgba(255, 157, 100, 1)',
						qrCodePic: '/static/share/img_kung5.png',
						userName: '大门牙胖仔',
						phone: '189****1312'
					},
				],
			};
		},
		onShow() {
			console.log(1111111111111)
		},
		methods: {


		}
	}
</script>

<style lang="scss">

</style>