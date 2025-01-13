import {
	createAPI
} from '../util'
import config from '../config'

const baseUrl = {
	dev: 'https://testplat.ruikedz.com',
	pre: '',
	prod: 'https://51plat.ruikedz.com'
} [config.env || 'dev']

export default createAPI(baseUrl)