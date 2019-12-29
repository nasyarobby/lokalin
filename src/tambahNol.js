export default function tambahNol(angka) {
  if (Number(angka) < 10) {
    return "0" + angka;
  } else return angka;
}
