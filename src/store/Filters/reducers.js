import {
  FETCH_OWNERS,
  SET_FETCH_OWNERS,
  SET_FETCH_OWNERS_ERROR
} from './actionTypes';
import { Fetching, Success, FetchError } from '../../variables';

// filters reducer
export const initialState = {
  owners: [],
  error: '',
  next: '',
  previous: '',
  count: 0,
  status: Fetching
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_OWNERS:
      return {
        ...state,
        status: Fetching
      };
    case SET_FETCH_OWNERS:
      return {
        ...state,
        owners: action.owners,
        status: Success
      };
    case SET_FETCH_OWNERS_ERROR:
      return {
        ...state,
        error: action.error,
        status: FetchError
      };
    default:
      return state;
  }
}
