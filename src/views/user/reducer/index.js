import { initialState } from "./constants";
import { actions } from "./actions";

export const reducer = (
  state = initialState,
  action = { type: "", payload: null }
) => {
  const newState = structuredClone(state);

  switch (action.type) {
    case actions.OPEN_MODAL:
      newState.showModal = true;
      break;
    case actions.CLOSE_MODAL:
      newState.showModal = false;
      newState.textErrorSave = "";
      newState.client = { ...initialState.client };
      newState.isEdit = false;
      break;
    case actions.HANDLE_CHANGE:
      newState.client[action.payload.name] = action.payload.value;
      break;
    case actions.SAVE_USER:
      newState.isLoadingSave = true;
      newState.textErrorSave = "";
      break;
    case actions.SAVE_USER_SUCCESS:
      newState.isLoadingSave = false;
      newState.showModal = false;
      newState.textErrorSave = "";
      newState.client = { ...initialState.client };
      newState.reload = !newState.reload;
      newState.isEdit = false;
      break;
    case actions.SAVE_USER_ERROR:
      newState.isLoadingSave = false;
      newState.textErrorSave = action.payload;
      break;
    case actions.EDIT_USER:
      newState.client = action.payload;
      newState.showModal = true;
      newState.isEdit = true;
      break;
    default:
      break;
  }

  return newState;
};
