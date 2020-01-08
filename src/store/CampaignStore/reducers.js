import {
  FETCH_CAMPAIGN,
  SET_FETCH_CAMPAIGN,
  SET_FETCH_CAMPAIGN_ERROR,
} from './actionTypes';
import { Fetching, Success, FetchError } from '../../variables';

export const initialState = {
  campaign: {},
  status: Fetching
};

export default function reducer(state = initialState, action) {
  const { data } = action;

  switch (action.type) {
    case FETCH_CAMPAIGN:
      return {
	...state,
	status: Fetching
      };
    case SET_FETCH_CAMPAIGN:
      return {
	...state,
	campaign: data,
	status: Success
      };
    case SET_FETCH_CAMPAIGN_ERROR:
      return {
	...state,
	error: action.error,
	status: FetchError
      };
    default:
      return state;
  }
}
