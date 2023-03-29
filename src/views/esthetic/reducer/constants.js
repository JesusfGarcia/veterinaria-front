export const initialState = {
  list: [],
  loadingGetList: true,
  errorTextGetList: "",
  showModal: false,
  body: {
    petId: 0,
    vetId: 0,
    date: "",
    serviceType: "tipo de servicio",
    price: 0,
    observations: "",
  },
  loadingSaveList: false,
  errorTextSaveList: "",
  reload: false,
  isEdit: false,
  showDeleteModal: false,
  filterText: "",
  //pagination
  page: 1,
  pageSize: 3,
  count: 0,
};
