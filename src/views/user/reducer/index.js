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
      break;
    case actions.HANDLE_CHANGE:
      newState.client[action.payload.name] = action.payload.value;
      break;
    case actions.GET_LIST:
      newState.isLoading = true;
      newState.textError = "";
      break;
    case actions.GET_LIST_SUCCESSS:
      newState.isLoading = false;
      newState.list = action.payload;
      break;
    case actions.GET_LIST_ERROR:
      newState.isLoading = false;
      newState.textError = action.payload;
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
      break;
    case actions.SAVE_USER_ERROR:
      newState.isLoadingSave = false;
      newState.textErrorSave = action.payload;
      break;
    default:
      break;
  }

  return newState;
};
