import {
  FETCH_CAMPAIGNS,
  SET_FETCH_CAMPAIGNS,
  SET_FETCH_CAMPAIGNS_ERROR,
  RESET_CAMPAIGNS_DATA,
  ARCHIVE_CAMPAIGN
} from './actionTypes';
import { Fetching, Success, FetchError } from '../../variables';

// campaigns reducer
export const initialState = {
  campaigns: [],
  error: '',
  next: '',
  previous: '',
  count: 0,
  status: Fetching
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CAMPAIGNS:
      return {
        ...state,
        status: Fetching
      };
    case SET_FETCH_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.campaigns,
        status: Success
      };
    case SET_FETCH_CAMPAIGNS_ERROR:
      return {
        ...state,
        error: action.error,
        status: FetchError
      };
    case ARCHIVE_CAMPAIGN:
      const { campaigns } = state;
      const { data } = action;
      let newCampaignsList = campaigns.filter((x) => x.id !== data.id);
      return {
        ...state,
        campaigns: newCampaignsList,
        status: Success
      }
    case RESET_CAMPAIGNS_DATA:
      return initialState;
    default:
      return state;
  }
}

// campaigns folder reducer
