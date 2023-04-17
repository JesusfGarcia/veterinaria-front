import {getTodayDate} from "../../../../helpers/getFormatedDate";

export const initialState = {
    showModal: false,
    body: {
      petId: 0,
      vetId: 0,
      type: "INTERNAL",
      price: 0,
      product: "",
      dateApplication: getTodayDate(),
      nextApplication: "",
      weight: 0,
    },
    loadingSaveList: false,
    errorTextSaveList: "",
    reload: false,
    isEdit: false,
    showDeleteModal: false,
  };
  