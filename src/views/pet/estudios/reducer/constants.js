export const initialState = {
  list: [],
  loadingGetList: false,
  errorTextGetList: "",
  showModal: false,
  body: {
    petId: 0,
    vetId: 0,
    date: "",
    studyType: "",
    price: 0,
    observations: "",
  },
  loadingSaveList: false,
  errorTextSaveList: "",
  reload: false,
  isEdit: false,
  showDeleteModal: false,
};
