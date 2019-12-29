"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var formatAngka = function formatAngka(number) {
  var parts = number.toString().split(".", 2);
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
};

var _default = {
  formatAngka: formatAngka
};
exports.default = _default;