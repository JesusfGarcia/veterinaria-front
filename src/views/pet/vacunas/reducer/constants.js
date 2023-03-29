export const initialState = {
  list: [],
  loadingGetList: true,
  errorTextGetList: "",
  showModal: false,
  body: {
    petId: 0,
    vetId: 0,
    name: "",
    price: 0,
    date: "",
    laboratory: "",
    nextVaccine: "",
    nextVaccineDate: "",
  },
  loadingSaveList: false,
  errorTextSaveList: "",
  reload: false,
  isEdit: false,
  showDeleteModal: false,
  filterText: ""
};
