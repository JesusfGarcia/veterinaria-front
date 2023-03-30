import { initialState } from "./constants";
import { actions } from "./actions";
import { getFormatedDate } from "../../../../helpers/getFormatedDate";

export const reducer = (
  state = initialState,
  action = {
    type: "",
    payload: null,
  }
) => {
  const newState = structuredClone(state);

  switch (action.type) {
    case actions.HANDLE_CHANGE:
      newState.body[action.payload.name] = action.payload.value;
      break;
    case actions.OPEN_MODAL:
      newState.showModal = true;
      break;
    case actions.CLOSE_MODAL:
      newState.showModal = false;
      newState.body = { ...initialState.body };
      newState.loadingSaveList = false;
      newState.errorTextSaveList = "";
      newState.isEdit = false;
      break;
    case actions.SAVE_LIST:
      newState.loadingSaveList = true;
      newState.errorTextSaveList = "";
      break;
    case actions.SAVE_LIST_SUCCESS:
      newState.loadingSaveList = false;
      newState.showModal = false;
      newState.body = { ...initialState.body };
      newState.loadingSaveList = false;
      newState.errorTextSaveList = "";
      newState.reload = !state.reload;
      newState.isEdit = false;
      newState.showDeleteModal = false;
      break;
    case actions.SAVE_LIST_ERROR:
      newState.loadingSaveList = false;
      newState.errorTextSaveList = action.payload;
      break;
    case actions.ON_EDIT:
      newState.isEdit = true;
      newState.body = action.payload;
      newState.showModal = true;
      break;
    case actions.OPEN_DELETE_MODAL:
      newState.showDeleteModal = true;
      newState.body = action.payload;
      break;
    case actions.CLOSE_DELETE_MODAL:
      newState.showDeleteModal = false;
      newState.body = { ...initialState.body };
      break;
    default:
      break;
  }

  return newState;
};
