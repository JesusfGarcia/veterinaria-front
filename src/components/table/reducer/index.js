import { initialState } from "./constants";
import { actions } from "./actions";
import { getFormatedDate } from "../../../helpers/getFormatedDate";

export const reducer = (
  state = initialState,
  action = { type: "", payload: null }
) => {
  const newState = structuredClone(state);
  switch (action.type) {
    case actions.GET_LIST:
      newState.loadingGetList = true;
      newState.errorTextGetList = "";
      break;
    case actions.GET_LIST_SUCCESS:
      //pagination
      const totalPages = Math.ceil(action.payload.count / state.pageSize);
      newState.count = totalPages;
      //......
      newState.loadingGetList = false;
      newState.list = action.payload.rows.map((item) => {
        return {
          ...item,
          date: getFormatedDate(item.date),
        };
      });
      break;
    case actions.GET_LIST_ERROR:
      newState.loadingGetList = false;
      newState.errorTextGetList = action.payload;
      break;
    case actions.HANDLE_FILTER_TEXT:
      newState.filterText = action.payload;
      break;
    case actions.CHANGE_PAGE:
      newState.page = action.payload;
      break;
    case actions.CHANGE_MONTH:
      if (!action.payload.month && !action.payload.year) {
        newState.day = "";
      }
      newState.month = action.payload.month;
      newState.year = action.payload.year;
      break;
    case actions.CHANGE_DAY:
      newState.day = action.payload;
      break;
    case actions.CHANGE_TYPE:
      newState.type = action.payload;
      break;
    default:
      break;
  }
  return newState;
};
