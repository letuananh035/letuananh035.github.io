var dkhp = {
	gUserId: '',
	userId: 0,
	info: null,
	lopMos: null,
	selected: [],
	tongTC: 0,
	messages: {
		exceedSoTC: "Bạn đã chọn quá giới hạn số tín chỉ cho phép",
		existedMonHoc: ""
	},
	messageBoxId: 'dkhp_result_message',
	handlerPage: 'Modules/SVDangKyHocPhan/HandlerSVDKHP.ashx',

	init: function () {
		//maSV, dkhpInfo, dkhpLopMos generate from control ViewThongTinDangKy.ascx (function LoadInfo)
		this.gUserId = userId;
		this.userId = maSV;
		this.info = dkhpInfo;
		this.lopMos = dkhpLopMos;
		this.tongTC = 0;
		this.selected = new Array();
		this.specialMsg = '';
	},

	specialMsg: '',

	getSoTC: function (maLopMoId) {
		var sotc = 0;
		$.each(this.lopMos, function (idx, item) {
			if (item.MaLopMoID == maLopMoId) {
				sotc = item.SoTC;
			}
		});
		return sotc;
	},

	getMonHocCode: function (maLopMoId) {
		var mh = '';
		$.each(this.lopMos, function (idx, item) {
			if (item.MaLopMoID == maLopMoId) {
				mh = item.MaMonHocCode;
			}
		});
		return mh;
	},

	showMessage: function (posX, posY) {
		var html = '';
		html += '<p>Số tín chỉ tối đa: ' + this.info.SoTCToiDa + '</p>';
		html += '<p>Số tín chỉ đã đăng ký: ' + this.info.SoTCDaDK + '</p>';
		//html += '<p>Số môn đã đăng ký: ' + this.info.SoMonDaDK + '</p>';
		html += '<p>Số tín chỉ đã chọn: ' + this.tongTC + '</p>';
		//html += '<p>Số môn đã chọn: ' + this.selected.length + '</p>';


		$('#' + this.messageBoxId).html(html).show('slow');
		$('#' + this.messageBoxId).css({ 'top': (posY - 10) + 'px', 'left': (posX - $('#' + this.messageBoxId).width() - 50) + 'px' });
	},

	clear: function () {
		this.gUserId = userId;
		this.userId = maSV;
		this.info = dkhpInfo;
		this.lopMos = dkhpLopMos;
		this.tongTC = 0;
		this.selected = new Array();
		this.specialMsg = '';
	},

	getLopMoThucHanh: function (lmid, callback) {
		var param = { method: 'LopThucHanh', lmid: lmid };
		var isFailed = false;
		var xhr = $.ajax({
			type: "GET",
			url: this.handlerPage,
			data: param,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			cache: false,
			async: false,
			success: function (result) {
				if (result != null) {
					callback(result);
				}
			},
			error: function () {
				isFailed = true;
			}
		});
		if (isFailed) {
			xhr.abort();
		}
		return isFailed;
	},

	dangKyLopMoThucHanh: function (lmId, lmTHId, callback) {
		var param = { method: 'DKThucHanh', masv: this.userId, lmthid: lmTHId, lmid: lmId, uid: this.gUserId };
		var isFailed = false;
		var xhr = $.ajax({
			type: "GET",
			url: this.handlerPage,
			data: param,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			cache: false,
			async: false,
			success: function (result) {
				if (result != null) {
					callback(result);
				}
			},
			error: function () {
				isFailed = true;
			}
		});
		if (isFailed) {
			xhr.abort();
		}
		return isFailed;
	},

	getLopMoBaiTap: function (lmid, callback) {
		var param = { method: 'LopBaiTap', lmid: lmid };
		var isFailed = false;
		var xhr = $.ajax({
			type: "GET",
			url: this.handlerPage,
			data: param,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			cache: false,
			async: false,
			success: function (result) {
				if (result != null) {
					callback(result);
				}
			},
			error: function () {
				isFailed = true;
			}
		});
		if (isFailed) {
			xhr.abort();
		}
		return isFailed;
	},

	dangKyLopMoBaiTap: function (lmId, lmBTId, callback) {
		var param = { method: 'DKBaiTap', masv: this.userId, lmbtid: lmBTId, lmid: lmId, uid: this.gUserId };
		var isFailed = false;
		var xhr = $.ajax({
			type: "GET",
			url: this.handlerPage,
			data: param,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			cache: false,
			async: false,
			success: function (result) {
				if (result != null) {
					callback(result);
				}
			},
			error: function () {
				isFailed = true;
			}
		});
		if (isFailed) {
			xhr.abort();
		}
		return isFailed;
	}
};
