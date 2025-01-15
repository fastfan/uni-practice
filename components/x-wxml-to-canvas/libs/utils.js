const hex = (color) => {
	let result = null

	if (/^#/.test(color) && (color.length === 7 || color.length === 9)) {
		return color
		// eslint-disable-next-line no-cond-assign
	} else if ((result = /^(rgb|rgba)\((.+)\)/.exec(color)) !== null) {
		return '#' + result[2].split(',').map((part, index) => {
			part = part.trim()
			part = index === 3 ? Math.floor(parseFloat(part) * 255) : parseInt(part, 10)
			part = part.toString(16)
			if (part.length === 1) {
				part = '0' + part
			}
			return part
		}).join('')
	} else {
		return '#00000000'
	}
}

const splitLineToCamelCase = (str) => str.split('-').map((part, index) => {
	if (index === 0) {
		return part
	}
	return part[0].toUpperCase() + part.slice(1)
}).join('')


const getImageInfo = function(path, mode) {
	return new Promise((resolve, reject) => {
		const dpr = uni.getSystemInfoSync().pixelRatio;
		uni.getImageInfo({
			src: path,
			success: function(image) {
				const w = Number(image.width),
					h = Number(image.height);
				resolve({
					w,
					h
				});
			},
			fail(err1) {
				console.log('err', err1)
				reject(err1);
			}
		});
	})
}

const imageModeInfo = (mode) => {
	let position = [0, 0];
	switch (mode) {
		case "scaleToFill":
		case "aspectFit":
		case "aspectFill":
		case "widthFix":
		case "heightFix":
		case "top":
		case "top left":
			position = [0, 0];
			break;
		case "top right":
			position = [1, 0];
			break;
		case "bottom":
			position = [0.5, 1];
			break;
		case "bottom left":
			position = [0, 1];
			break;
		case "bottom right":
			position = [1, 1];
			break;
		case "center":
			position = [0.5, 0.5];
			break;
		case "left":
			position = [0, 0.5];
			break;
		case "right":
			position = [1, 0.5];
			break;
		default:
			position = [0, 0];
			break;
	}
	return {
		position
	};
}

const drawImageByMode = async (src, mode, width, height, top, left) => {
	const {
		position
	} = imageModeInfo(mode);
	const {
		w,
		h
	} = await getImageInfo(src, mode);
	let sx = Math.abs((width - w)) * position[0],
		sy = Math.abs((height - h)) * position[1],
		sw = w,
		sh = h;
	const ratio = width / height,
		ratio1 = w / h;
	let layoutBox = {
		width,
		height,
		left,
		top
	};
	if (['aspectFit', 'widthFix', 'heightFix'].indexOf(mode) > -1) {
		let newWidth = height * ratio1,
			newHeight = width / ratio1,
			newLeft = left,
			newTop = top;
		if (mode === 'aspectFit') {
			if (w > h) {
				newWidth = width;
				newHeight = newHeight > height ? height : newHeight;
				newTop = top + (height - newHeight) / 2;
			} else {
				newHeight = height;
				newWidth = newWidth > width ? h * ratio : newWidth;
				newLeft = left + (width - newWidth) / 2;
			}
			layoutBox = {
				width: newWidth,
				height: newHeight,
				left: newLeft,
				top: newTop
			};
		} else if (mode === 'widthFix') {
			newWidth = width;
			newTop = top + (height - newHeight) / 2;
			if (w > h) {
				newHeight = newHeight > height ? height : newHeight;
				layoutBox.height = newHeight;
			} else {
				newHeight = newHeight > height ? w / ratio : newHeight;
				sh = newHeight;
			}
		} else if (mode === 'heightFix') {
			newHeight = height;
			newWidth = newWidth > width ? h * ratio : newWidth;
			newLeft = left + (width - newWidth) / 2;
			if (w > h) {
				sw = newWidth;
			} else {
				layoutBox.width = newWidth;
			}
		}
	} else if (mode === 'aspectFill') {
		if (w > h) {
			sx = Math.abs((h * ratio - w)) * 0.5;
			sw = h * ratio;
		} else {
			sy = Math.abs((h - w / ratio)) * 0.5;
			sh = w / ratio
		}
	} else {
		sw = width;
		sh = height;
	}
	return Object.assign(layoutBox, {
		isMode: true,
		sx,
		sy,
		sw,
		sh
	})
}


module.exports = {
	hex,
	splitLineToCamelCase,
	getImageInfo,
	drawImageByMode
}
