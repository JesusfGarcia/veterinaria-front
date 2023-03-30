import { initialState } from "./contants";

import { actions } from "./actions";

export const reducer = (state = initialState, action) => {
  const newState = structuredClone(state);

  switch (action.type) {
    case actions.OPEN_MODAL:
      newState.showModal = true;
      break;
    case actions.CLOSE_MODAL:
      newState.showModal = false;
      newState.isEdit = false;
      break;
    case actions.HANDLE_CHANGE:
      newState.body[action.payload.name] = action.payload.value;
      break;
    case actions.SAVE_USER:
      newState.isSaveLoading = true;
      newState.saveErrorText = "";
      break;
    case actions.SAVE_USER_SUCCESS:
      newState.isSaveLoading = false;
      newState.body = { ...initialState.body };
      newState.reload = !newState.reload;
      newState.isEdit = false;
      newState.showModal = false;
      newState.showDeleteModal = false;
      break;
    case actions.SAVE_USER_ERROR:
      newState.isSaveLoading = false;
      newState.saveErrorText = action.payload;
      break;
    case actions.ON_EDIT:
      newState.isEdit = true;
      newState.showModal = true;
      newState.body = action.payload;
      break;
    case actions.OPEN_DELETE_MODAL:
      newState.showDeleteModal = true;
      newState.body = action.payload;
      break;
    case actions.CLOSE_DELETE_MODAL:
      newState.showDeleteModal = false;
      break;

    default:
      break;
  }

  return newState;
};
