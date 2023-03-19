import { initialState } from "./constants";

import { actions } from "./actions";

export const reducer = (
  state = initialState,
  action = { type: "", payload: null }
) => {
  const newState = structuredClone(state);
  switch (action.type) {
    case actions.HANDLE_USER_CHANGES:
      newState.user[action.payload.name] = action.payload.value;
      break;
    case actions.LOGIN:
      newState.isLoading = true;
      newState.errorText = "";
      break;
    case actions.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload);
      newState.isLoading = false;
      newState.isSuccess = true;
      break;
    case actions.LOGIN_ERROR:
      newState.isLoading = false;
      newState.errorText = action.payload;
      break;
    case actions.OPEN_MODAL:
      newState.showModal = true;
      break;
    case actions.CLOSE_MODAL:
      newState.showModal = false;
      newState.forgot.email = "";
      newState.isSuccessForgot = false;
      newState.errorTextForgot = "";
      break;
    case actions.HANDLE_FORGOT_EMAIL:
      newState.forgot.email = action.payload;
      break;
    case actions.FORGOT_PASSWORD:
      newState.isLoadingForgot = true;
      newState.errorTextForgot = "";
      break;
    case actions.FORGOT_PASSWORD_SUCCESS:
      newState.isLoadingForgot = false;
      newState.isSuccessForgot = true;
      break;
    case actions.FORGOT_PASSWORD_ERROR:
      newState.isLoadingForgot = false;
      newState.errorTextForgot = action.payload;
      break;
    default:
      break;
  }

  return newState;
};
