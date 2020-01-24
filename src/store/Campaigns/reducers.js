import {
  FETCH_CAMPAIGNS,
  SET_FETCH_CAMPAIGNS,
  SET_FETCH_CAMPAIGNS_ERROR,
  RESET_CAMPAIGNS_DATA,
  ARCHIVE_CAMPAIGN,
  UPDATE_SMS_TEMPLATE
} from './actionTypes';
import { Fetching, Success, FetchError } from '../../helpers/variables';

// campaigns reducer
export const initialState = {
  activeMarket: null,
  sortOrder: [],
  campaigns: {},
  sortBy: '-created_date',
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
        sortBy: data.sortBy,
        sortOrder: data.sortOrder,
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
      let oldOrder = state.sortOrder;

      let updatedCampaigns = oldOrder.filter(x => x !== data.id);

      return {
        ...state,
        sortOrder: updatedCampaigns,
        status: Success
      };
    case UPDATE_SMS_TEMPLATE:
      let campaignsToUpdate = { ...state.campaigns, [data.id]: data };

      return {
        ...state,
        campaigns: campaignsToUpdate,
        status: Success
      }
    case RESET_CAMPAIGNS_DATA:
      return initialState;
    default:
      return state;
  }
}

// campaigns folder reducer
