import { FETCH_SUPPORT_ITEMS, SET_FETCH_SUPPORT_ITEMS, SET_FETCH_SUPPORT_ITEMS_ERROR } from "./actionTypes";
import { ISupportItems } from "./actions";

interface ISupportAction {
  type?: string;
  items?: ISupportItems[];
  error?: string;
}

export interface ISupportState {
  items: ISupportItems[] | undefined;
  error: string | undefined;
  status?: string;
}

// support reducer
export const initialState: ISupportState = {
  items: [],
  error: ""
};

export default function reducer(state = initialState, action: ISupportAction) {
  switch (action.type) {
    case FETCH_SUPPORT_ITEMS:
      return {
        ...state,
        status: "FETCHING"
      };
    case SET_FETCH_SUPPORT_ITEMS:
      return {
        ...state,
        items: action.items,
        status: "success"
      };
    case SET_FETCH_SUPPORT_ITEMS_ERROR:
      return {
        ...state,
        error: action.error,
        status: "error"
      };
    default:
      return state;
  }
}
