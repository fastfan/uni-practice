export function saveImageToPhotosAlbum(path, filename, callback) {
	if (!path) return uni.showToast({
		title: '未传递图片路径',
		icon: 'none'
	})
	// #ifdef H5
	var xhr = window.XMLHttpRequest ?
		new XMLHttpRequest() :
		new ActiveXObject("Microsoft.XMLHTTP");
	xhr.open("get", path, true);
	//监听进度事件
	xhr.addEventListener(
		"progress",
		function(evt) {
			console.log(evt)
			if (evt.lengthComputable) {
				var percentComplete = evt.loaded / evt.total;
				if (percentComplete === 1) {
					callback && callback(true)
				}
			}
		},
		true
	);
	xhr.responseType = "blob";
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			const linkHtml = document.createElement("a");
			// linkHtml.href = response.path;
			linkHtml.href = window.URL.createObjectURL(xhr.response);
			linkHtml.download = filename || 'saveImageToPhotosAlbum';
			linkHtml.click();
		}
	};
	xhr.onerror = function() {
		callback && callback(false)
	};
	xhr.send();

	// #endif

	// #ifdef MP || APP-PLUS
	uni.saveImageToPhotosAlbum({
		filePath: path,
		success: function(res) {
			console.log('saveImageToPhotosAlbum success', res)
			callback && callback(true)
		},
		fail(err) {
			console.log('saveImageToPhotosAlbum fail', err)
			callback && callback(false)
		}
	});
	// #endif
}
