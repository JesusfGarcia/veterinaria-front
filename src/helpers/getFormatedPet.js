export const getFormatedPet = (pet) => {
  if (pet) {
    return `${pet.name} ${pet.lastName}`;
  }

  return "no registrada";
};
