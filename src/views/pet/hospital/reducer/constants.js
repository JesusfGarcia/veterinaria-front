export const initialState = {
  showModal: false,
  body: {
    petId: 0,
    vetId: 0,
    admissionDate: "",
    departureDate: "",
    treatment: "",
    observations: "",
    price: "",
  },
  loadingSaveList: false,
  errorTextSaveList: "",
  reload: false,
  isEdit: false,
  showDeleteModal: false,
};
