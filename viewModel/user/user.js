import tui from '@/common/httpRequest.js'
import util from '@/utils/util.js'
const user = '/api/mem/user'

class UserServer {
	/**
	 * @param {Object} params
	 * 参数说明：
	 * appKey	必填	string	app端的key
	 * timestamp	必填	long	公共参数,时间戳
	 * code	必填	string	获取微信openId的授权码
	 * phoneCode	必填	string	获取微信账号手机号的授权码
	 */
	wxLogin(params) {
		return tui.request({
			url: '/api/wxLspAuth/login',
			data: params
		});
	}

	/**
	 更新令牌
	 */
	refreshToken(params) {
		return tui.request({
			url: '/api/mem/userToken/refreshToken', ///api/wxAuth/refreshToken
			data: params
		})
	}
	/**
	 退出登录
	 */
	logout(params) {
		return tui.request({
			url: '/api/mem/userAuth/logout', ///api/wxAuth/refreshToken
			data: params
		})
	}
	/* 微信公众号绑定手机号 */
	wxBindPhoneNumber(params) {
		return tui.request({
			url: '/api/wxAuth/register',
			data: params
		});
	}
	/* 云闪付绑定手机号码 */
	unpBindPhoneNumber(params) {
		return tui.request({
			url: '/api/upAuth/bindPhone',
			data: params
		});
	}
	/**
	 * 获取用户信息
	 */
	userInfo() {
		return tui.request({
			url: '/api/mem/user/getUserInfo',
			data: {}
		})
	}

	/**
	 * 更改手机号
	 */
	updatePhoneNumber(params) {
		return tui.request({
			url: '/api/mem/user/bindPhone',
			data: params
		});
	}

	/**
	 * 授权车机端登录
	 */
	authLogin(data) {
		return tui.request({
			url: '/api/mem/driver/authLogin',
			data: data
		})
	}
	/**
	 * 用户完善信息
	 */
	updateUserInfo(identity, params) {
		if (identity === 1) {
			if (util.isEmpty(params['driverName'])) {
				tui.toast('请输入真实姓名');
				return;
			}
			if (util.isEmpty(params['sex'])) {
				tui.toast('请选择性别');
				return;
			}
			if (util.isEmpty(params['plateNo'])) {
				tui.toast('请输入车牌号');
				return;
			}
			if (!util.isPlate(params['plateNo']) || params['plateNo'].length !== 7) {
				tui.toast('车牌号不正确');
				return;
			}
			if (util.isEmpty(params['carType'])) {
				tui.toast('请选择车型');
				return;
			}
			if (util.isEmpty(params['carImgId'])) {
				tui.toast('请上传车身照片');
				return;
			}
			if (util.isEmpty(params['transportImgId'])) {
				tui.toast('请上传道路运输证照片');
				return;
			}
			if (util.isEmpty(params['headImgId'])) {
				tui.toast('请上传用户真实头像照片');
				return;
			}
			if (util.isEmpty(params['idCardNo'])) {
				tui.toast('请输入身份证号码');
				return;
			}
			if (!util.isIdCard(params['idCardNo'])) {
				tui.toast('请输入正确的身份证号码');
				return;
			}
			if (util.isEmpty(params['frontImgId']) || util.isEmpty(params['backImgId'])) {
				tui.toast('请上传手持身份证照片');
				return;
			}
			if (util.isEmpty(params['cardStartDate']) || util.isEmpty(params['cardEndDate'])) {
				tui.toast('请选择身份证有效日期');
				return;
			}
			if (util.isEmpty(params['certNo'])) {
				tui.toast('请输入资格证号码');
				return;
			}
			if (util.isEmpty(params['certImgId'])) {
				tui.toast('请选择从业资格证照片');
				return;
			}
			if (util.isEmpty(params['dirLicenseNo'])) {
				tui.toast('请输入驾驶证号码');
				return;
			}
			if (util.isEmpty(params['dirLicenseFront']) || util.isEmpty(params['dirLicenseBack'])) {
				tui.toast('请上传驾驶证');
				return;
			}
		} else {
			if (util.isEmpty(params['userName'])) {
				tui.toast('请输入真实姓名');
				return;
			}
			if (util.isEmpty(params['idCardNo'])) {
				tui.toast('请输入身份证号码');
				return;
			}
			if (!util.isIdCard(params['idCardNo'])) {
				tui.toast('请输入正确的身份证号码');
				return;
			}
			if (util.isEmpty(params['dirLicenseNo'])) {
				tui.toast('请输入驾驶证号码');
				return;
			}
			if (util.isEmpty(params['certNo'])) {
				tui.toast('请输入资格证号码');
				return;
			}
			if (util.isEmpty(params['plateNo'])) {
				tui.toast('请输入车牌号');
				return;
			}
			if (!util.isPlate(params['plateNo'])) {
				tui.toast('车牌号不正确');
				return;
			}
			if (util.isEmpty(params['frontImgUrl']) || util.isEmpty(params['backImgUrl'])) {
				tui.toast('请上传手持身份证照片');
				return;
			}
		}

		return tui.request({
			url: identity === 1 ? '/api/tms/certRecord/ownerAuth' : '/api/tms/certRecord/driverAuth',
			data: params
		});
	}

	/**
	 * 获取用户未读消息列表
	 */
	getUserMessage(params) {
		return tui.request({
			url: '/api/mem/message/pageList',
			data: params
		});
	}

	/**
	 * 获取用户未读消息数
	 */
	getUserMessageCount(params) {
		return tui.request({
			url: '/api/mem/message/selectCount',
			data: params
		});
	}

	/**
	 * 切换用户登录
	 */
	userSwitchAccount(params) {
		return tui.request({
			url: '/api/mem/user/switchAccount',
			data: params
		});
	}

	/**
	 * 获取用户下车辆
	 */
	getUserWithCar(params) {
		return tui.request({
			url: '/api/tms/taxi/selectMyTaxi',
			data: params
		});
	}

	/**
	 * 获取司机收款信息
	 */
	getDriverCollectionPay(params) {
		return tui.request({
			url: '/api/tms/driver/getDriverInfo',
			data: params
		})
	}

	/**
	 * 车主司机身份认证
	 */
	userOwnerAuth(params, isDriver) {
		return tui.request({
			url: isDriver ? '/api/tms/certRecord/ownerAuth' : '/api/tms/certRecord/driverAuth',
			data: params
		})
	}

	/**
	 * 车主司机获取上一次认证记录
	 */
	userOwnerAuthDetail(params) {
		return tui.request({
			url: '/api/tms/certRecord/getLastCertRecord',
			data: params
		})
	}
	/* 获取用户账户余额 */
	getUserBalance(params) {
		return tui.request({
			url: '/api/mem/user/getUserBalance',
			data: params
		})
	}
	/**
	 * 获取审核成功后的用户认证详情
	 */
	userDriverAuthSuccessDetail(params) {
		return tui.request({
			url: '/api/tms/driver/getDetail',
			data: params
		})
	}

	/**
	 * 车主下的所有司机列表
	 */
	dvirerList(params) {
		return tui.request({
			url: '/api/tms/driver/getMyDriverList',
			data: params
		})
	}

	/**
	 * 车主下所有待审核的司机列表
	 */
	waitAuthDriverList(params) {
		return tui.request({
			url: '/api/tms/certRecord/pageList',
			data: params
		})
	}

	/**
	 * 车主审核司机
	 */
	verifyDriver(params, reject) {
		return tui.request({
			url: reject ? '/api/tms/certRecord/auditFail' : '/api/tms/certRecord/auditSuccess',
			data: params
		})
	}


	/**
	 * 意见反馈
	 */
	feedbackInsert(params) {
		return tui.request({
			url: '/api/mem/feedback/insert',
			data: params
		})
	}


	/**
	 * 	 奖品定时获取扫码状态
	 */
	getScanResult(params) {
		return tui.request({
			url: '/api/mem/prizeRecord/getScanResult',
			data: params
		});
	}

	/**
	 * 	 奖品获取二维码数据
	 */
	getSiteQrScran(params) {
		return tui.request({
			url: '/api/mem/prizeRecord/generateQrCode',
			data: params
		});
	}

	/**
	 * 获取用户积分数量
	 */
	getUserPoints() {
		return tui.request({
			url: '/api/mem/user/getUserPoints',
		})
	}

	/**
	 * 查询登录用户的车辆信息
	 */
	getUserTaxiInfo() {
		return tui.request({
			url: '/api/tms/taxi/selectMyTaxi',
		})
	}
	/**
	 * 司机切换运营状态
	 */
	setOperateStatus(data) {
		return tui.request({
			url: '/api/tms/taxi/setOperateStatus',
			data: data
		})
	}

	/**
	 * 抽奖配置
	 */
	getPrizeConfig(data) {
		return tui.request({
			url: '/api/pms/prize/getPrizeConfig',
			data: data
		})
	}

	/**
	 * 	 获取司机二维码
	 */
	getDriverQrcode(data) {
		return tui.request({
			url: '/api/tms/driver/generateQrCode',
			data: data
		})
	}

	/**
	 * 	 用户积分充值接口
	 */
	integralGenerateOrder(data) {
		return tui.request({
			url: '/api/mem/pointsOrder/generateOrder',
			data: data
		})
	}
	/**
	 * 	 查看我的资产
	 */
	getUserAssets(data) {
		return tui.request({
			url: '/api/mem/user/getUserAssets',
			data: data
		})
	}

	/**
	 * 申请提现
	 */
	transferRecordApply(params) {
		return tui.request({
			url: '/api/mem/transferRecord/apply',
			data: params
		});
	}

	/**
	 * 获取邀请人信息
	 */
	getInviteUser(params) {
		return tui.request({
			url: `${user}/getInviteUser`,
			data: params
		});
	}

	/**
	 * 查询粉丝列表
	 */
	getFansPageList(params) {
		return tui.request({
			url: `${user}/getFansPageList`,
			data: params
		});
	}

	/**
	 * 获取我的推荐人
	 */
	getReferInfo(params) {
		return tui.request({
			url: `${user}/getReferInfo`,
			data: params
		});
	}
	/**
	 * 修改用户信息
	 */
	updateUserInfos(params) {
		return tui.request({
			url: `${user}/updateUserInfo`,
			data: params
		});
	}
	/**
	 * 修改用户手机号
	 */
	updatePhoneNumbers(params) {
		return tui.request({
			url: `${user}/updatePhoneNumber`,
			data: params
		});
	}
	
	/* 获取支付方式配置 */
	getorderPayConfig(params) {
		return tui.request({
			url: '/api/mch/order/getOrderPayConfig',
			data: params
		})
	}
}



export {
	UserServer
}