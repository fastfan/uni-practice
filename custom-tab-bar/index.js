const app = getApp()
Component({
	data: {
		selected: 0,
		color: "#666666",
		selectedColor: "#FF7E7B",
		backgroundColor: "#FFFFFF",
		list: [{
				pagePath: "/pages/home/index/index",
				text: "首页",
				iconPath: "/static/images/tabbar/home.png",
				selectedIconPath: "/static/images/tabbar/home_s.png"
			},
			{
				pagePath: "/pages/benefit/index/index",
				text: "51充电",
				iconPath: "/static/images/tabbar/mall.png",
				selectedIconPath: "/static/images/tabbar/mall_s.png"
			},
			//#ifdef MP-WEIXIN
			{
				pagePath: "",
				iconPath: "/static/images/tabbar/tap_sys@2x.png",
				selectedIconPath: "/static/images/tabbar/tap_sys@2x.png",
				text: "",
				bulge: true
			},
			//#endif
			{
				pagePath: "/pages/shop/index/index",
				text: "商城",
				iconPath: "/static/images/tabbar/mall.png",
				selectedIconPath: "/static/images/tabbar/mall_s.png"
			},
			{
				pagePath: "/pages/mine/index/index",
				text: "我的",
				iconPath: "/static/images/tabbar/myzone.png",
				selectedIconPath: "/static/images/tabbar/myzone_s.png"
			}
		]
	},

	ready: function() {
		this.setData({
			selected: app.globalData.tabIndex
		})
	},

	methods: {
		switchTab(e) {
			const data = e.currentTarget.dataset
			const {
				index,
				path
			} = e.currentTarget.dataset
			// console.log(e)
			app.globalData = {
				tabIndex: index
			}
			if (index == 2) return
			wx.switchTab({
				url: path
			})
		},
	}
})