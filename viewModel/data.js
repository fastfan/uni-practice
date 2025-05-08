import tui from '@/common/httpRequest.js'

class DataServer {
	/**
	 上传文件
	 */
	uploadFile(params) {
		return tui.uploadFile({
			url: '/api/file/upload',
			file: params.file,
			fileModule: params.fileModule
		});
	}
	/**
	 获取短信验证码
	 */
	getSmsCode(type = 0, params) {
		let url = '';
		let subType = 0;
		if (type == 0) {
			url = '/api/sys/sms/getSmsCode';
			subType = 0;
		} else if (type == 1) { //电召短信验证码
			url = '/api/cts/callTaxi/getSmsCode';
			subType = 0;
		} else if (type == 2) { //切换账户登录
			url = '/api/sys/sms/getSmsCode';
			subType = 2;
		} else if (type == 3) { //用户修改手机号
			url = '/api/mem/user/getSmsCode';
			subType = '';
		}
		params['smsType'] = subType;
		return tui.request({
			url: url,
			data: params
		});
	}
	/**
	 获取车型套餐
	 */
	getTaxiRegProduct(carType) {
		return tui.request({
			url: '/api/tms/taxiRegProduct/list',
			data: {
				carType
			},
		})
	}

	/**
	 获取车型套餐详情
	 */
	getTaxiRegProductDetail(id) {
		return tui.request({
			url: '/api/tms/taxiRegProduct/detail',
			data: {
				id
			},
		})
	}

	/**
	 获取车型
	 */
	getCarType() {
		return tui.request({
			url: '/api/sys/dictData/getDictDataList',
			data: {
				dictType: 'tms_car_type'
			},
		})
	}

	/**
	 获取新车入网车型
	 */
	getRegCarType() {
		return tui.request({
			url: '/api/sys/dictData/getDictDataList',
			data: {
				dictType: 'tms_taxi_reg_car_type'
			},
		})
	}

	/**
	 获取公司列表
	 */
	getCarCompany() {
		return tui.request({
			url: '/api/tms/taxiCompany/getCompanyList',
			data: {},
		})
	}
	/**
	 获取公司列表
	 */
	getTaxiCompany() {
		return tui.request({
			url: '/api/tms/taxiCompany/list',
			data: {},
		})
	}

	/**
	 获取司机类型
	 */
	getRecruitType() {
		return tui.request({
			url: '/api/sys/dictData/getDictDataList',
			data: {
				dictType: 'mem_recruit_type'
			},
		})
	}

	/**
	 获取找人司机类型字典信息
	 */
	getJobType() {
		return tui.request({
			url: '/api/sys/dictData/getDictDataList',
			data: {
				dictType: 'mem_recruit_type'
			},
		})
	}

	/**
	 获取新闻分类
	 */
	getNewsCate() {
		return tui.request({
			url: '/api/sys/dictData/getDictDataList',
			data: {
				dictType: 'cms_news_category'
			},
		})
	}

	/**
	 获取车机类型字典信息
	 */
	getCarSystemList() {
		return tui.request({
			url: '/api/sys/dictData/getDictDataList',
			data: {
				dictType: 'cts_device_type'
			},
		})
	}

	/**
	 获取banner或者推荐视频
	 */
	getIndexBanner(params) {
		return tui.request({
			url: '/api/cms/advert/pageList',
			data: params,
		})
	}

	/**
	 获取banner或者推荐视频详情
	 */
	getIndexBannerDetail(params) {
		return tui.request({
			url: '/api/cms/advert/getDetail',
			data: params,
		})
	}
	
	/**
	 * 按照分类获取富文本详情
	 */
	getRichTextDetail(params) {
		return tui.request({
			url: '/api/cms/advert/getDetailByCategory',
			data: params,
		})
	}

	/**
	 获取系统通知消息
	 */
	getIndexNotice(params) {
		return tui.request({
			url: '/api/sys/notice/pageList',
			data: params,
		})
	}

	/**
	 获取通知消息详情
	 */
	getIndexNoticeDetail(params) {
		return tui.request({
			url: '/api/sys/notice/getDetail',
			data: params,
		})
	}

	/**
	 获取省市区数据
	 */
	getCityList() {
		return tui.request({
			url: '/api/sys/region/list',
			data: {}
		})
	}
	/**
	 根据当前用户的经纬度信息获取所在城市和县区列表
	 */
	getCityByLngLat(data) {
		return tui.request({
			url: '/api/sys/region/getCityByLngLat',
			data: data
		})
	}

	/**
	 查询字典数据
	 */
	getDictCategory(params) {
		return tui.request({
			url: '/api/sys/dictData/getDictDataList',
			data: params
		})
	}
}


export {
	DataServer
}