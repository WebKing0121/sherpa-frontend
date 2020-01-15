import {
  FETCH_CAMPAIGNS,
  SET_FETCH_CAMPAIGNS,
  SET_FETCH_CAMPAIGNS_ERROR,
  RESET_CAMPAIGNS_DATA,
  ARCHIVE_CAMPAIGN
} from './actionTypes';
import { Fetching, Success, FetchError } from '../../variables';
import { arrayToMapIndex, mapIndexToArray } from '../utils';

// campaigns reducer
export const initialState = {
  activeMarket: null,
  campaigns: {},
  error: '',
  next: '',
  previous: '',
  count: 0,
  status: Fetching
};

export default function reducer(state = initialState, action) {
  const { data } = action;

  switch (action.type) {
    case FETCH_CAMPAIGNS:
      return {
        ...state,
        status: Fetching
      };
    case SET_FETCH_CAMPAIGNS:
      return {
        ...state,
        campaigns: data.campaigns,
        activeMarket: data.marketId,
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
      const campaignsArr = mapIndexToArray(campaigns);
      let newCampaignsList = campaignsArr.filter((x) => x.id !== data.id);
      const campaignMap = arrayToMapIndex('id', newCampaignsList);
      return {
        ...state,
        campaigns: campaignMap,
        status: Success
      };
    case RESET_CAMPAIGNS_DATA:
      return initialState;
    default:
      return state;
  }
}

// campaigns folder reducer
