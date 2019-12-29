const Waktu = require("../index").Waktu;
const waktu = new Waktu(Date.now(), "WITA");
console.log(waktu.namaBulan());
console.log(waktu.namaBulanPendek());
console.log(waktu.bulan());
console.log(waktu.jam());
console.log(waktu.waktu());
console.log(waktu.format("{tanggal}-{bulan}-{tahun} {waktu}"));
