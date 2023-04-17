import {getTodayDate} from "../../../../helpers/getFormatedDate";
export const initialState = {
  showModal: false,
  body: {
    petId: 0,
    vetId: 0,
    name: "",
    price: 0,
    date: getTodayDate(),
    laboratory: "",
    nextVaccine: "",
    nextVaccineDate: "",
  },
  loadingSaveList: false,
  errorTextSaveList: "",
  reload: false,
  isEdit: false,
  showDeleteModal: false,
};
