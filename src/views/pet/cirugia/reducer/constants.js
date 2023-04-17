import {getTodayDate} from "../../../../helpers/getFormatedDate" 

export const initialState = {
  showModal: false,
  body: {
    petId: 0,
    vetId: 0,
    date: getTodayDate(),
    category: "",
    price: 0,
    description: "",
  },
  loadingSaveList: false,
  errorTextSaveList: "",
  reload: false,
  isEdit: false,
  showDeleteModal: false,
};
