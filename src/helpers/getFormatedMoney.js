export const getFormatedPrice = (price = "") => {
  if (!price) {
    return "0.00";
  }

  return price.toLocalString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
};
