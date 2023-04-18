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

export const getTodayDate = () => {
  //yyyy-mm-dd
  const today = new Date().toISOString();
  return today.split("T")[0];
};

export const IntToDate = (number) => {
  //transformar un numero a una fecha
  const today = new Date();
  let dateString = today.toISOString().split("T")[0];
  const todayYear = today.getFullYear();
  const birthyear = todayYear - number;
  let newDate = dateString.split("-");
  const formatedString = `${birthyear}-${newDate[1]}-${newDate[2]}`;

  return formatedString;
};

export const DateToInt = (date) => {
  //calcular cuantos años han pasado desde la fecha input y devolver el numero
  const today = new Date();
  const birthday = new Date(date);
  const age = today.getFullYear() - birthday.getFullYear();
  return age;
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
