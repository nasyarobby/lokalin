const formatAngka = number => {
  const parts = number.toString().split(".", 2);
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
};

export default { formatAngka };
