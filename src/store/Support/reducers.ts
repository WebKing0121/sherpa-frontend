import {
  FETCH_SUPPORT_ITEMS,
  SET_FETCH_SUPPORT_ITEMS,
  SET_FETCH_SUPPORT_ITEMS_ERROR
} from './actionTypes';
import { ISupportItems } from './actions';
import { Fetching, Success, FetchError } from '../../variables';

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
  error: ''
};

export default function reducer(state = initialState, action: ISupportAction) {
  switch (action.type) {
    case FETCH_SUPPORT_ITEMS:
      return {
        ...state,
        status: Fetching
      };
    case SET_FETCH_SUPPORT_ITEMS:
      return {
        ...state,
        items: action.items,
        status: Success
      };
    case SET_FETCH_SUPPORT_ITEMS_ERROR:
      return {
        ...state,
        error: action.error,
        status: FetchError
      };
    default:
      return state;
  }
}
