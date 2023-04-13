export const getFormatedDate = (date = "") => {
  if (!date) return "";
  return date.split("T")[0];
  //texto.replace(/-/g, "/");
};

export const getFormatedDateTable = (date = "") => {
  if (!date) {
    return "sin fecha";
  }

  const getDateArray = date.split("-");
  const getMonth = month[parseInt(getDateArray[1]) - 1];

  return `${getDateArray[2]}-${getMonth}-${getDateArray[0]}`;
};

const month = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
