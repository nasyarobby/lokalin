"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tambahNol;

function tambahNol(angka) {
  if (Number(angka) < 10) {
    return "0" + angka;
  } else return angka;
}