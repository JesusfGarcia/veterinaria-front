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
    default:
      break;
  }

  return newState;
};
