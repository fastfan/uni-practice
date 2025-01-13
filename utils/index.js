export function _storageSet(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

export function _storageGet(key, defaultValue = '') {
	const res = localStorage.getItem(key)
	if (res) {
		return JSON.parse(res)
	}
	return defaultValue
}

export function _stopPropagation(e) {
	e.stopImmediatePropagation()
	e.stopPropagation()
	e.preventDefault()
}

export function _stop(e) {
	e.stopPropagation()
}


export function _formatNumber(num) {
	if (!num) return
	if (num > 100000000) {
		return (num / 100000000).toFixed(1) + '亿'
	} else if (num > 10000) {
		return (num / 10000).toFixed(1) + '万'
	} else {
		return num
	}
}

export function _dateFormat(val, type) {
	if (!val) return
	if (String(val).length === 10) {
		val = val * 1000
	}
	const d = new Date(Number(val))
	const year = d.getFullYear()
	const m = d.getMonth() + 1
	const mStr = m < 10 ? '0' + m : m
	const day = d.getDate()
	const dayStr = day < 10 ? '0' + day : day
	const h = d.getHours()
	const hStr = h < 10 ? '0' + h : h
	const min = d.getMinutes()
	const minStr = min < 10 ? '0' + min : min
	const sec = d.getSeconds()
	const secStr = sec < 10 ? '0' + sec : sec
	switch (type) {
		case 'Y':
			return year + ''
		case 'M':
			return `${year}-${mStr}`
		case 'M_D':
			return `${mStr}-${dayStr}`
		case 'M_CN':
			return `${year}年${mStr}月`
		case 'D':
			return `${year}-${mStr}-${dayStr}`
		case 'm':
			return `${year}-${mStr}-${dayStr} ${hStr}:${minStr}`
		default:
			return `${year}-${mStr}-${dayStr} ${hStr}:${minStr}:${secStr}`
	}
}

export function _time(time) {
	if (String(time).length === 10) {
		time = time * 1000
	}
	const date = new Date(Number(time))
	const now = new Date()
	const d = now.valueOf() - date.valueOf()
	let str = ''
	if (d < 1000 * 60) {
		str = '刚刚'
	} else if (d < 1000 * 60 * 60) {
		str = `${(d / (1000 * 60)).toFixed()}分钟前`
	} else if (d < 1000 * 60 * 60 * 24) {
		str = `${(d / (1000 * 60 * 60)).toFixed()}小时前`
	} else if (d < 1000 * 60 * 60 * 24 * 2) {
		str = '1天前'
	} else if (d < 1000 * 60 * 60 * 24 * 3) {
		str = '2天前'
	} else if (d < 1000 * 60 * 60 * 24 * 4) {
		str = '3天前'
	} else if (date.getFullYear() === now.getFullYear()) {
		str = _dateFormat(time, 'M_D')
	} else {
		str = _dateFormat(time, 'D')
	}
	return str
}


export function _duration(v) {
	if (!v) return '00:00'
	const m = Math.floor(v / 60)
	// let s = v % 60
	const s = Math.round(v % 60)
	let str = ''
	if (m === 0) {
		str = '00'
	} else if (m > 0 && m < 10) {
		str = '0' + m
	} else {
		str = m + ''
	}
	str += ':'
	if (s === 0) {
		str += '00'
	} else if (s > 0 && s < 10) {
		str += '0' + s
	} else {
		str += s
	}
	return str
}


/**
 * @param {number} duration
 */
export function _sleep(duration) {
	return new Promise((resolve) => {
		setTimeout(resolve, duration)
	})
}

export function cloneDeep(val) {
	return JSON.parse(JSON.stringify(val))
}

export function random(min, max) {
	const minCeiled = Math.ceil(min)
	const maxFloored = Math.floor(max)
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // 包含最小值和最大值
}

export function sampleSize(arr, num) {
	const list = []
	const indexs = []
	while (list.length !== num) {
		const j = random(0, arr.length - 1)
		if (!indexs.includes(j)) {
			list.push(arr[j])
			indexs.push(j)
		}
	}
	return list
}