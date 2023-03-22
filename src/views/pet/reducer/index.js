import { initialState } from "./contants";
import { actions } from "./actions";

export const reducer = (
  state = initialState,
  action = { type: "", payload: null }
) => {
  const newState = structuredClone(state);

  switch (action.type) {
    case actions.GET_USER_INFO:
      newState.isLoadingUserInfo = true;
      newState.errorTextUserInfo = "";
      break;
    case actions.GET_USER_INFO_SUCCESS:
      if (action.payload.pets.length !== 0) {
        newState.petSelected = 0;
      }
      newState.isLoadingUserInfo = false;
      newState.user = action.payload;
      break;
    case actions.GET_USER_INFO_ERROR:
      newState.isLoadingUserInfo = false;
      newState.errorTextUserInfo = action.payload;
      break;
    case actions.OPEN_MODAL:
      newState.showModal = true;
      break;
    case actions.CLOSE_MODAL:
      newState.showModal = false;
      newState.pet = { ...initialState.pet };
      newState.errorTextSavePet = false;
      newState.isLoadingSavePet = false;
      break;
    case actions.HANDLE_INPUT_CHANGE:
      newState.pet[action.payload.name] = action.payload.value;
      break;
    case actions.SAVE_PET_INFO:
      newState.isLoadingSavePet = true;
      newState.errorTextSavePet = "";
      break;
    case actions.SAVE_PET_INFO_SUCCESS:
      newState.isLoadingSavePet = false;
      newState.showModal = false;
      newState.reload = !state.reload;
      break;
    case actions.SAVE_PET_INFO_ERROR:
      newState.isLoadingSavePet = false;
      newState.errorTextSavePet = action.payload;
      break;
    case actions.CHANGE_SCREEN_POSITION:
      newState.screenPosition = action.payload;
      break;
    case actions.SELECT_PET:
      newState.petSelected = action.payload;
      break;
    default:
      break;
  }

  return newState;
};
