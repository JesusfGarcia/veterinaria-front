import { initialState } from "./contants";

import { actions } from "./actions";

export const reducer = (state = initialState, action) => {
  const newState = structuredClone(state);

  switch (action.type) {
    case actions.GET_DATA:
      newState.isLoading = true;
      newState.errorText = "";
      break;
    case actions.GET_DATA_SUCCESS:
      newState.isLoading = false;
      newState.list = action.payload.map((item) => {
        return {
          ...item,
          type: item.isAdmin ? "Administrador" : "Empleado",
        };
      });
      break;
    case actions.GET_DATA_ERROR:
      newState.isLoading = false;
      newState.errorText = action.payload;
      break;
    case actions.OPEN_MODAL:
      newState.showModal = true;
      break;
    case actions.CLOSE_MODAL:
      newState.showModal = false;
      newState.isEdit = false;
      break;
    case actions.HANDLE_CHANGE:
      newState.form[action.payload.name] = action.payload.value;
      break;
    case actions.SAVE_USER:
      newState.isSaveLoading = true;
      newState.saveErrorText = "";
      break;
    case actions.SAVE_USER_SUCCESS:
      newState.isSaveLoading = false;
      newState.form = { ...initialState.form };
      newState.reload = !newState.reload;
      newState.isEdit = false;
      newState.showModal = false;
      newState.showDeleteModal = false;
      break;
    case actions.SAVE_USER_ERROR:
      newState.isSaveLoading = false;
      newState.saveErrorText = action.payload;
      break;
    default:
    case actions.ON_EDIT:
      newState.isEdit = true;
      newState.showModal = true;
      newState.form = action.payload;
      break;
    case actions.OPEN_DELETE_MODAL:
      newState.showDeleteModal = true;
      newState.form = action.payload;
      break;
    case actions.CLOSE_DELETE_MODAL:
      newState.showDeleteModal = false;
  }

  return newState;
};
