export const getServerError = (error) => {
  return error.response?.data?.errors || "Error en el servidor";
};
