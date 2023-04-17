export const getFormatedPrice = (price = 0) => {
  if (!price) {
    return "0.00";
  }

  return price.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
};
