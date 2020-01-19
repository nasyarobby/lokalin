import tambahNol from "./tambahNol";

export const DAY = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu"
];

export const MONTH = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember"
];

export const ZONES = {
  WIB: "WIB",
  WITA: "WITA",
  WIT: "WIT"
};

export const TIMEZONE_OFFSETS = {
  WIB: -7 * 60,
  WITA: -8 * 60,
  WIT: -9 * 60
};

export const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agt",
  "Sep",
  "Okt",
  "Nov",
  "Des"
];

export default class Waktu {
  constructor(input, zone = ZONES.WIB) {
    let dateObject;

    if (typeof input === "object" && input instanceof Date) {
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
      this.offset =
        (this.dateObject.getTimezoneOffset() - TIMEZONE_OFFSETS.WIB) *
        60 *
        1000;
    }
    if (zone === ZONES.WITA) {
      this.offset =
        (this.dateObject.getTimezoneOffset() - TIMEZONE_OFFSETS.WITA) *
        60 *
        1000;
    }
    if (zone === ZONES.WIT) {
      this.offset =
        (this.dateObject.getTimezoneOffset() - TIMEZONE_OFFSETS.WIT) *
        60 *
        1000;
    }
    this.zone = zone;
  }

  format(templateString = "") {
    return templateString.match(/\{.+?\}/g).reduce((prev, current) => {
      const fn = current.slice(1, current.length - 1);
      if (this[fn]) return prev.replace(current, this[fn]());
      else return prev;
    }, templateString);
  }

  convertToTargetTimeZone() {
    if (this.offset !== 0) {
      let date = new Date(this.dateObject.getTime() + this.offset);
      return date;
    } else {
      return this.dateObject;
    }
  }

  hari() {
    return DAY[this.dateObject.getDay()];
  }

  tanggal(fillZero = true) {
    let tanggal = this.convertToTargetTimeZone().getDate();
    return fillZero ? tambahNol(tanggal) : tanggal;
  }

  bulan(fillZero = true) {
    let bulan = this.convertToTargetTimeZone().getMonth() + 1;
    return fillZero ? tambahNol(bulan) : bulan;
  }

  namaBulan() {
    return MONTH[this.convertToTargetTimeZone().getMonth()];
  }

  namaBulanPendek() {
    return MONTH_SHORT[this.convertToTargetTimeZone().getMonth()];
  }

  tahun() {
    return this.convertToTargetTimeZone().getFullYear();
  }

  jam() {
    return tambahNol(this.convertToTargetTimeZone().getHours());
  }

  menit() {
    return tambahNol(this.convertToTargetTimeZone().getMinutes());
  }

  detik() {
    return tambahNol(this.convertToTargetTimeZone().getSeconds());
  }

  ms() {
    return tambahNol(this.convertToTargetTimeZone().getMilliseconds());
  }

  waktu() {
    return `${this.jam()}:${this.menit()}:${this.detik()} ${this.zona()}`;
  }

  zona() {
    return this.zone;
  }
}
