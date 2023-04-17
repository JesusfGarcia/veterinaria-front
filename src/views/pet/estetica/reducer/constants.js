import {getTodayDate} from "../../../../helpers/getFormatedDate";

export const initialState = {
  showModal: false,
  body: {
    petId: 0,
    vetId: 0,
    date: getTodayDate(),
    serviceType: "tipo de servicio",
    price: 0,
    observations: "",
  },
  loadingSaveList: false,
  errorTextSaveList: "",
  reload: false,
  isEdit: false,
  showDeleteModal: false,
};
