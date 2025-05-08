const sm4 = require('./index')
const key = 'c352986b0a97f55ae4f9ad23766ae100'
/**
 * SM4
 * SM4().encrypt() 加密
 */
export function encrypt(encryptData) {
	return sm4.encrypt(encryptData, key)
}
/**
 * SM4().decrypt() 解密
 * @param {*} decryptData // 可以为 16 进制串或字节数组
 * @returns
 */
export function decrypt(decryptData) {
	return sm4.decrypt(decryptData, key)
}