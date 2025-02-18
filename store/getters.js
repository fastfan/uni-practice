const getters = {
	userInfo: state => state.user.userInfo,
	code: state => state.user.userInfo.code,
	accessToken: state => state.user.userInfo.accessToken,
	refreshToken: state => state.user.userInfo.refreshToken,
	userType: state => state.user.userInfo.userType,
	loginName: state => state.user.userInfo.loginName,
	phoneNumber: state => state.user.userInfo.phoneNumber,
	tokenExpireTime: state => state.user.userInfo.tokenExpireTime,
	bodyHeight: state => state.base.bodyHeight,
	bodyWidth: state => state.base.bodyWidth,
	judgeValue: state => state.base.judgeValue,
	homeRefresh: state => state.base.homeRefresh,
	loading: state => state.base.loading,
	shareImgUrl: state => state.share.shareImgUrl,
	shopCarList: state => state.shopDetail.shopCarList,
	shopType: state => state.shopDetail.shopType
}

export default getters