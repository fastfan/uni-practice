<template>
	<view class="test-slide-wrapper">
		<!-- <SlideHorizontal name="first" v-model:index="state.baseIndex">
			<SlideItem>
				<SlideHorizontal class="first-horizontal-item" name="second" :change-active-index-use-anim="false"
					v-model:index="state.navIndex">
					<Slide4 :active="active" />
				</SlideHorizontal>
			</SlideItem>
		</SlideHorizontal> -->
		<Slide />
	</view>
</template>

<script>
	import Slide from '../slide/slide.vue'
	export default {
		components: {
			Slide
		},
		data() {
			return {

			};
		}
	}
	// import SlideHorizontal from '@/components/slide/SlideHorizontal.vue'
	// import SlideItem from '@/components/slide/SlideItem.vue'
	// import Slide4 from '../slide/Slide4.vue'
	// import bus, {
	// 	EVENT_KEY
	// } from '@/utils/bus'
	// export default {
	// 	data() {
	// 		return {
	// 			canMove: true,
	// 			active: true,
	// 			baseIndex: 1,
	// 			navIndex: 4,
	// 			itemIndex: 0
	// 		};
	// 	},
	// 	// unmounted(() => {
	// 	// 	bus.offAll()
	// 	// })
	// 	onLoad() {
	// 		bus.on(EVENT_KEY.ENTER_FULLSCREEN, () => {
	// 			if (!state.active) return
	// 			state.fullScreen = true
	// 		})
	// 		bus.on(EVENT_KEY.EXIT_FULLSCREEN, () => {
	// 			if (!state.active) return
	// 			state.fullScreen = false
	// 		})
	// 		bus.on(EVENT_KEY.OPEN_COMMENTS, () => {
	// 			if (!state.active) return
	// 			bus.emit(EVENT_KEY.ENTER_FULLSCREEN)
	// 			state.commentVisible = true
	// 		})
	// 		bus.on(EVENT_KEY.CLOSE_COMMENTS, () => {
	// 			if (!state.active) return
	// 			bus.emit(EVENT_KEY.EXIT_FULLSCREEN)
	// 			state.commentVisible = false
	// 		})
	// 		bus.on(EVENT_KEY.SHOW_SHARE, () => {
	// 			if (!state.active) return
	// 			state.isSharing = true
	// 		})
	// 		bus.on(EVENT_KEY.NAV, ({
	// 			path,
	// 			query
	// 		}) => {
	// 			if (!state.active) return
	// 			nav(path, query)
	// 		})
	// 		bus.on(EVENT_KEY.GO_USERINFO, () => {
	// 			if (!state.active) return
	// 			state.baseIndex = 2
	// 		})
	// 		bus.on(EVENT_KEY.CURRENT_ITEM, setCurrentItem)
	// 	}
	// }
</script>
<style lang="scss" scoped>
	page {
		overflow: hidden;
	}
</style>