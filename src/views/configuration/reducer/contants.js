export const initialState = {
  body: { name: "", lastName: "", email: "", isAdmin: false },
  list: [],
  showModal: false,
  isLoading: true,
  errorText: "",
  isSaveLoading: false,
  saveErrorText: "",
  reload: false,
  isEdit: false,
  showDeleteModal: false,
  filterText: "",
  //pagination
  page: 1,
  pageSize: 3,
  count: 0,
};
