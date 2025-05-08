import tui from '@/common/httpRequest.js'
import util from '@/utils/util.js'
import store from '../../store/index.js'

// const QQMapWX = require('../../common/qqmap-wx-jssdk.js')

// let qqmapWx = new QQMapWX({
// 	'key': 'D5HBZ-NIMY6-JEHSU-MX2V2-VL7CT-CDB5H'
// })

const AMap = require('@/common/amap-wx.js')

let amap = new AMap.AMapWX({
	'key': "0c7f7a35a3b7eba6f3f45080128af468" //"90c9be1af49f9089d759c6bc2415e99c"
})

let mqtt = require('@/common/mqtt.js')

let mqttClient = null

let subTopic = ''

const zoomLevel = {
	'3': 1000000,
	'4': 500000,
	'5': 200000,
	'6': 100000,
	'7': 50000,
	'8': 25000,
	'9': 20000,
	'10': 10000,
	'11': 5000,
	'12': 2000,
	'13': 1000,
	'14': 500,
	'15': 200,
	'16': 100,
	'17': 50,
	'18': 20,
	'19': 10,
	'20': 5
}

class MapCallCarServer {

	getUserLocation(callback) {
		const systemSetting = uni.getSystemSetting()
		if (systemSetting.locationEnabled) {
			//  判断手机微信App是否拥有定位访问权限
			const appAuthorizeSetting = uni.getAppAuthorizeSetting()
			const locationAuthorized = appAuthorizeSetting.locationAuthorized
			switch (locationAuthorized) {
				case 'authorized':
					//  判断用户手机定位开关是否开启
					// 判断小程序是否拥有定位访问权限
					this.isAuthorized(() => {
						callback(true)
					})
					break
				case 'denied':
					store.dispatch('showCustomModal', {
						title: '微信定位服务未开启',
						cancelText: "稍后设置",
						confirmText: '立即前往',
						data: {
							type: 2
						},
						success: (res) => {
							if (res.confirm) {
								this.openAppAuthorizeSetting()
							} else if (res.cancel) {
								this.rejectGetLocation()
							}
						},
						complete: () => {
							console.log('模态框已关闭');
						}
					});

					break
				case 'not determined':
					store.dispatch('showCustomModal', {
						title: '微信定位服务未开启',
						cancelText: "稍后设置",
						confirmText: '立即前往',
						data: {
							type: 2
						},
						success: (res) => {
							if (res.confirm) {
								this.openAppAuthorizeSetting()
							} else if (res.cancel) {
								this.rejectGetLocation()
							}
						},
						complete: () => {
							console.log('模态框已关闭');
						}
					});

					break
			}
		} else {
			store.dispatch('showCustomModal', {
				title: '系统定位服务未开启',
				showCancel: false,
				showConfirm: true,
				confirmText: '我知道了',
				data: {
					type: 1
				},
				success: (res) => {
					if (res.confirm) {
						console.log('用户点击了确定');
					} else if (res.cancel) {
						console.log('用户点击了取消');
					}
				},
				complete: () => {
					console.log('模态框已关闭');
				}
			});
		}


	}

	// 打开系统微信授权管理页
	openAppAuthorizeSetting() {
		uni.openAppAuthorizeSetting({
			success: (res) => {
				console.log('打开系统微信授权管理页成功', res)
				// this.isAuthorized()
			},
			fail: (err) => {
				console.log('打开系统微信授权管理页失败', err)
			}
		})
	}
	// 小程序是否拥有访问定位信息的权限
	isAuthorized(callback) {
		// 检查当前是否已经授权访问scope属性
		uni.getSetting({
			success: (res) => {
				let userLocation = res.authSetting['scope.userLocation']
				if (!userLocation) {
					// 判断当前是否获得授权，如果没有就去申请授权
					this.getAuthorize(() => {
						callback(true)
					})
				} else {
					callback(true)
				}
			},
			fail: (err) => {
				this.openSetting()
			}
		})
	}
	// 小程序请求获取定位权限
	getAuthorize(callback) {
		// uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
		uni.authorize({
			scope: 'scope.userLocation',
			success: () => {
				callback(true)
			},
			fail: () => {
				this.openSetting(() => {
					callback(true)
				})
			}
		})
	}
	// 调起客户端小程序设置界面，返回用户设置的操作结果
	openSetting(callback) {
		store.dispatch('showCustomModal', {
			title: '小程序定位服务未开启',
			cancelText: "稍后设置",
			confirmText: '立即前往',
			data: {
				type: 3
			},
			success: (res) => {
				if (res.confirm) {
					uni.openSetting({
						success: (res) => {
							if (res.authSetting['scope.userLocation'] ===
								true) {
								callback(true)
							} else {
								this.rejectGetLocation()
							}
						},
						fail: (err) => {
							console.log('小程序授权弹窗打开失败', err)
						}
					})
				} else if (res.cancel) {
					this.rejectGetLocation()
				}
			},
			complete: () => {
				console.log('模态框已关闭');
			}
		});

	}
	/**
	 * 彻底拒绝位置获取
	 */
	rejectGetLocation() {
		uni.showToast({
			title: '您拒绝了位置授权，小程序无法继续提供出行服务~',
			icon: 'none',
			duration: 3000
		})
	}
	getLocation(callback, fail) {
		uni.getLocation({
			type: 'gcj02',
			isHighAccuracy: true,
			success(res) {
				callback(res)
			},
			fail(err) {
				console.log("getLocation error:" + JSON.stringify(err))
				fail(err)
			}
		})
	}

	//根据距离计算缩放比例
	zoomByDistance(distance) {
		let keys = Object.keys(zoomLevel)
		for (var i = 0; i < keys.length; i++) {
			let key = parseInt(keys[i])
			if (parseInt(distance) >= zoomLevel[key]) {
				return key + 3
			}
		}
		return 15
	}

	//逆地理位置
	reverseGeocode(lat, lng, callback) {
		amap.getRegeo({
			location: lng + "," + lat,
			success(res) {
				if (res.length == 1) {
					callback(res[0])
				} else if (res.length > 1) {
					callback(res[1])
				}
			},
			fail(e) {
				console.log('Callcar Server reverseGeocoder:' + JSON.stringify(e))
			}
		})
	}

	//关键字搜索
	search(keyword, callback) {
		amap.getPoiAround({
			querykeywords: keyword,
			success(res) {
				callback(res.poisData)
			},
			fail(e) {
				console.log('Callcar Server search:' + JSON.stringify(e))
			}
		})
	}

	//路线规划
	direction(startLat, startLng, endLat, endLng, waypoints, callback) {
		amap.getDrivingRoute({
			origin: startLng + "," + startLat,
			destination: endLng + "," + endLat,
			strategy: '10',
			waypoints: waypoints,
			success(res) {
				if (res.paths == 0) {
					callback([])
					return
				}

				let route = res.paths[0]
				let points = []
				if (res.paths && route && route.steps) {
					let steps = route.steps;
					for (let i = 0; i < steps.length; i++) {
						let poLen = steps[i].polyline.split(';');
						for (let j = 0; j < poLen.length; j++) {
							points.push({
								longitude: parseFloat(poLen[j].split(',')[0]),
								latitude: parseFloat(poLen[j].split(',')[1])
							})
						}
					}
				}

				points.unshift({
					'latitude': startLat,
					'longitude': startLng
				})
				points.push({
					'latitude': endLat,
					'longitude': endLng
				})

				callback({
					polyline: [{
						points: points,
						color: '#1caa15dd',
						width: 10,
						arrowLine: true
					}],
					distance: route.distance,
					duration: route.duration
				})
			},
			fail(e) {
				console.log('Callcar Server direction:' + JSON.stringify(e))
			}
		})
	}

	//初始化mqtt
	initMqtt(url, userName, password, successCallback, failCallback) {
		let uuid = util.getUuid()

		// 创建客户端实例
		const options = {
			protocol: 'wxs',
			clean: true,
			clientId: uuid,
			username: userName, //'admin'
			password: password, //'123456'
			keepalive: 10,
			connectTimeout: 4000
		}

		mqttClient = mqtt.connect(url, options) //wss://da079973.ala.cn-hangzhou.emqxsl.cn:8084/mqtt

		mqttClient.on('connect', function() {
			successCallback()

			subTopic = 'user/sub/' + userName + '/#'

			mqttClient.subscribe(subTopic, function(err) { //user/sub/${' + userName + '}/
				if (!err) {
					console.log('Callcar Server mqtt orderChanged success')
				} else {
					console.log('Callcar Server mqtt subscribe error:' + JSON.stringify(
						err))
				}
			})
		})

		mqttClient.on('reconnect', function() {
			successCallback()

			subTopic = 'user/sub/' + userName + '/#'

			mqttClient.subscribe(subTopic, function(err) { //user/sub/${' + userName + '}/
				if (!err) {
					console.log('Callcar Server mqtt Re orderChanged success')
				} else {
					console.log('Callcar Server mqtt Re subscribe error:' + JSON
						.stringify(err))
				}
			})
		})

		mqttClient.on('offline', (err) => {
			console.log('Callcar Server mqtt connect offline:' + JSON.stringify(err))
		})

		mqttClient.on('error', (err) => {
			failCallback(err)

			console.log('Callcar Server mqtt connect Fail:' + JSON.stringify(err))

			mqttClient.end()
		})
	}

	publishUserLocation(message) {
		if (mqttClient == null) {
			return
		}

		if (!mqttClient.connected) {
			console.log('Callcar Server publishUserLocation：mqtt未连接成功')
			return
		}

		mqttClient.publish('user/pub/location', message)

		console.log('Callcar Server 用户位置上传成功')
	}

	reveicedMessage(callback) {
		if (mqttClient == null) {
			return
		}

		if (!mqttClient.connected) {
			console.log('Callcar Server reveicedMessage：mqtt未连接成功')
			return
		}

		if (!getApp().globalData.mqttConnected) {
			console.log('Callcar Server reveicedMessage1：mqtt未连接成功')
			return
		}

		mqttClient.on('message', function(topic, message) {
			//console.log('Callcar Server topic: ' + topic + 'message: ' + message)
			callback(topic, message.toString())
		})
	}

	unSubscribe(callback) {
		if (mqttClient == null) {
			return
		}

		if (!mqttClient.connected) {
			return
		}

		if (util.isEmpty(subTopic)) {
			return
		}

		mqttClient.unsubscribe(subTopic, function(error) {
			if (error) {
				console.log('Callcar Server' + error)
			} else {
				callback()
				console.log('Callcar Server Unsubscribed')
			}
		})
	}

	reconnect() {
		if (mqttClient == null) {
			return
		}
		mqttClient.reconnect()
		console.log('Callcar Server MqttClient reconnect')
	}

	disconnect() {
		if (mqttClient == null) {
			return
		}
		mqttClient.end(true)
		console.log('Callcar Server MqttClient end')
	}

	isConnect() {
		if (mqttClient == null) {
			return false
		}
		console.log('Callcar Server MqttClient connect status: ' + mqttClient.connected)
		return mqttClient.connected
	}


	//获取mqtt初始化数据
	iotData() {
		return tui.request({
			url: '/api/cts/iotUser/getIotUser',
			data: {
				clientType: 3
			}
		})
	}

	// 获取周围车辆
	getUpCupGps(params) {
		return tui.request({
			url: '/api/cts/car/nearbyCarList',
			data: params
		});
	}

	// 叫车
	callTaxi(params, reCall = false) {
		return tui.request({
			url: reCall ? '/api/cts/order/reDistOrder' : '/api/cts/order/callCar',
			data: params
		});
	}

	// 取消叫车
	cancelTaxi(params) {
		return tui.request({
			url: '/api/cts/order/cancel',
			data: params
		})
	}

	// 获取当前执行订单
	getCurrentOrder(params) {
		return tui.request({
			url: '/api/cts/order/getCurrentOrder',
			data: params
		});
	}

	// 通过id, createTime获取当前执行订单
	getOrderDetailById(params) {
		return tui.request({
			url: '/api/cts/order/detail',
			data: params
		});
	}

	// 获取订单信息
	getOrderInfo(params) {
		return tui.request({
			url: '/api/cts/callTaxi/getOrderInfo',
			data: params
		});
	}

	// 修改计费规则
	setBillRule(params) {
		return tui.request({
			url: '/api/cts/order/setBillRule',
			data: params
		})
	}

	// 获取取消订单原因
	getCancelOrderReason() {
		return tui.request({
			url: '/api/sys/dictData/getDictDataList',
			data: {
				dictType: 'cts_cancel_order_reason_passenger'
			},
		})
	}

	// 获取我未上车取消原因
	getMissedCarReason() {
		return tui.request({
			url: '/api/sys/dictData/getDictDataList',
			data: {
				dictType: 'cts_missed_car_reason'
			},
		})
	}

	// 乘客设置取消订单原因
	setCancelReason(params) {
		return tui.request({
			url: '/api/cts/order/setCancelReason',
			data: params
		})
	}

	// 乘客设置我未上车
	setMissedCarReason(params) {
		return tui.request({
			url: '/api/cts/order/missedCar',
			data: params
		})
	}

	// 分页查询订单列表
	orderPageList(params) {
		return tui.request({
			url: '/api/cts/order/pageList',
			data: params
		})
	}

	// 获取订单详情
	orderInfo(params) {
		return tui.request({
			url: '/api/cts/order/detail',
			data: params
		})
	}

	// 行程轨迹
	tripRecordList(params) {
		return tui.request({
			url: '/api/cts/order/getTripRecordList',
			data: params
		})
	}

	// 分享行程订单详情
	shareItineraryOrder(params) {
		return tui.request({
			url: '/api/cts/order/insertShareOrder',
			data: params
		})
	}

	// 匿名评价
	orderEval(params) {
		return tui.request({
			url: '/api/tms/driverEvaluation/evaluate',
			data: params
		})
	}

	// 获取订单评价结果
	getOrderEval(params) {
		return tui.request({
			url: '/api/tms/driverEvaluation/getEvaluation',
			data: params
		})
	}


	// 新增上车地址
	insertTaxiLocation(params) {
		return tui.request({
			url: '/api/mem/taxiLocation/insert',
			data: params
		})
	}

	// 编辑上车地址
	updateTaxiLocation(params) {
		return tui.request({
			url: '/api/mem/taxiLocation/update',
			data: params
		})
	}

	// 删除上车地址
	deleteTaxiLocation(params) {
		return tui.request({
			url: '/api/mem/taxiLocation/delete',
			data: params
		})
	}

	// 上车列表
	taxiLocationList(params) {
		return tui.request({
			url: '/api/mem/taxiLocation/pageList',
			data: params
		})
	}

	// 微信模板消息
	templateMsg(params) {
		return tui.request({
			url: '/api/sys/templateMsg/list',
			data: params
		})
	}

	// 封面
	advertList(params) {
		return tui.request({
			url: '/api/cms/advert/pageList',
			data: params
		})
	}

	/* 获取banner或者推荐视频详情 */
	getIndexBannerDetail(params) {
		return tui.request({
			url: '/api/cms/advert/getDetail',
			data: params,
		})
	}

	/* 获取活动订阅配置信息 */
	getSubsidyConfig(params) {
		return tui.request({
			url: '/api/cts/subsidyRecord/getSubsidyConfig',
			data: params
		})
	}

	/* 上传打车小票申请补贴 */
	subsidyRecordApply(params) {
		return tui.request({
			url: '/api/cts/subsidyRecord/apply',
			data: params
		})
	}

	/* 重新上传打车小票申请补贴 */
	subsidyRecordReApply(params) {
		return tui.request({
			url: '/api/cts/subsidyRecord/reapply',
			data: params
		})
	}

	/* 银联下单 --线上 */
	umsOrderPay(params) {
		return tui.request({
			url: '/api/cts/order/genMpPayInfo',
			data: params
		})
	}

	/* 取消支付 */
	cancelPay(params) {
		return tui.request({
			url: '/api/cts/order/cancelPay',
			data: params
		})
	}

	/* 无订单-取消支付 */
	cancelNoOrderPay(params) {
		return tui.request({
			url: '/api/mem/payRecord/cancelPay',
			data: params
		})
	}

	/**
	 * 获取微信小程序支付信息
	 */
	getMiniPayInfo(params) {
		return tui.request({
			url: '/api/cts/order/getMpPayInfo',
			data: params
		})
	}

	/* 银联下单 --线下 */
	umsNoOrderPay(params) {
		return tui.request({
			url: '/api/mem/payRecord/genMpPayRecord',
			data: params
		})
	}

	// 分页查询订单列表
	payRecordList(params) {
		return tui.request({
			url: '/api/mem/payRecord/pageList',
			data: params
		})
	}

	// 分页查询打赏配置列表
	rewardConfigPageList(params) {
		return tui.request({
			url: '/api/tms/reward/configPageList',
			data: params
		})
	}
	// 打赏支付参数
	genRewardPayRecord(params) {
		return tui.request({
			url: '/api/tms/reward/genRewardPayRecord',
			data: params
		})
	}

	// 查询扫码司机静态码付款详情
	getQuitePayRecordDetail(params) {
		return tui.request({
			url: '/api/mem/payRecord/detail',
			data: params
		})
	}
}

let mapCallCarServer = new MapCallCarServer()

export {
	mapCallCarServer
}