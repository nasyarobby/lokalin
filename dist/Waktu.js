"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MONTH_SHORT = exports.TIMEZONE_OFFSETS = exports.ZONES = exports.MONTH = void 0;

var _tambahNol = _interopRequireDefault(require("./tambahNol"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MONTH = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
exports.MONTH = MONTH;
var ZONES = {
  WIB: "WIB",
  WITA: "WITA",
  WIT: "WIT"
};
exports.ZONES = ZONES;
var TIMEZONE_OFFSETS = {
  WIB: -7 * 60,
  WITA: -8 * 60,
  WIT: -9 * 60
};
exports.TIMEZONE_OFFSETS = TIMEZONE_OFFSETS;
var MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
exports.MONTH_SHORT = MONTH_SHORT;

var Waktu =
/*#__PURE__*/
function () {
  function Waktu(input) {
    var zone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ZONES.WIB;

    _classCallCheck(this, Waktu);

    var dateObject;

    if (_typeof(input) === "object" && input instanceof Date) {
      dateObject = input;
    }

    if (typeof input === "number") {
      dateObject = new Date(input);
    }

    if (typeof input === "string") {
      dateObject = new Date(Number(input));

      if (dateObject.toDateString() === "Invalid Date") {
        dateObject = new Date(Date.parse(input));
      }
    }

    this.dateObject = dateObject;

    if (zone === ZONES.WIB) {
      this.offset = (this.dateObject.getTimezoneOffset() - TIMEZONE_OFFSETS.WIB) * 60 * 1000;
    }

    if (zone === ZONES.WITA) {
      this.offset = (this.dateObject.getTimezoneOffset() - TIMEZONE_OFFSETS.WITA) * 60 * 1000;
    }

    if (zone === ZONES.WIT) {
      this.offset = (this.dateObject.getTimezoneOffset() - TIMEZONE_OFFSETS.WIT) * 60 * 1000;
    }

    this.zone = zone;
  }

  _createClass(Waktu, [{
    key: "format",
    value: function format() {
      var _this = this;

      var templateString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return templateString.match(/\{.+?\}/g).reduce(function (prev, current) {
        var fn = current.slice(1, current.length - 1);
        if (_this[fn]) return prev.replace(current, _this[fn]());else return prev;
      }, templateString);
    }
  }, {
    key: "convertToTargetTimeZone",
    value: function convertToTargetTimeZone() {
      if (this.offset !== 0) {
        var date = new Date(this.dateObject.getTime() + this.offset);
        return date;
      } else {
        return this.dateObject;
      }
    }
  }, {
    key: "tanggal",
    value: function tanggal() {
      var fillZero = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var tanggal = this.convertToTargetTimeZone().getDate();
      return fillZero ? (0, _tambahNol.default)(tanggal) : tanggal;
    }
  }, {
    key: "bulan",
    value: function bulan() {
      var fillZero = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var bulan = this.convertToTargetTimeZone().getMonth() + 1;
      return fillZero ? (0, _tambahNol.default)(bulan) : bulan;
    }
  }, {
    key: "namaBulan",
    value: function namaBulan() {
      return MONTH[this.convertToTargetTimeZone().getMonth()];
    }
  }, {
    key: "namaBulanPendek",
    value: function namaBulanPendek() {
      return MONTH_SHORT[this.convertToTargetTimeZone().getMonth()];
    }
  }, {
    key: "tahun",
    value: function tahun() {
      return this.convertToTargetTimeZone().getFullYear();
    }
  }, {
    key: "jam",
    value: function jam() {
      return (0, _tambahNol.default)(this.convertToTargetTimeZone().getHours());
    }
  }, {
    key: "menit",
    value: function menit() {
      return (0, _tambahNol.default)(this.convertToTargetTimeZone().getMinutes());
    }
  }, {
    key: "detik",
    value: function detik() {
      return (0, _tambahNol.default)(this.convertToTargetTimeZone().getSeconds());
    }
  }, {
    key: "ms",
    value: function ms() {
      return (0, _tambahNol.default)(this.convertToTargetTimeZone().getMilliseconds());
    }
  }, {
    key: "waktu",
    value: function waktu() {
      return "".concat(this.jam(), ":").concat(this.menit(), ":").concat(this.detik(), " ").concat(this.zona());
    }
  }, {
    key: "zona",
    value: function zona() {
      return this.zone;
    }
  }]);

  return Waktu;
}();

exports.default = Waktu;