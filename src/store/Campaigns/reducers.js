import {
  FETCH_CAMPAIGNS,
  SET_FETCH_CAMPAIGNS,
  SET_FETCH_CAMPAIGNS_ERROR,
  RESET_CAMPAIGNS_DATA,
  ARCHIVE_CAMPAIGN,
  UPDATE_SMS_TEMPLATE,
  SET_FETCH_CAMPAIGNS_NEXT_PAGE,
  SET_FETCH_CAMPAIGNS_NEXT_PAGE_SUCCESS
} from './actionTypes';
import { Fetching, Success, FetchError } from '../../helpers/variables';
import { FETCH_CAMPAIGN_NEXT_PAGE } from '../campaignProspectStore/actionTypes';

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
  status: Fetching,
  isLoadingMore: false
};

export const path = ['campaigns'];

export default function reducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case FETCH_CAMPAIGNS:
      return {
        ...state,
        status: Fetching
      };
    case FETCH_CAMPAIGN_NEXT_PAGE:
      return {
        ...state,
        isLoadingMore: action.payload
      };
    case SET_FETCH_CAMPAIGNS:
      let newState = {
        ...state,
        ...payload,
        campaigns: { ...state.campaigns, ...payload.campaigns },
        sortOrder: [...state.sortOrder, ...payload.sortOrder],
        status: Success,
      };

      // override campaigns or concatenate
      if (action.overrideData) {
        newState.campaigns = payload.campaigns;
      } else {
        newState.campaigns = {
          ...newState.campaigns,
          ...payload.campaigns
        };
      }

      // set active market if there's not one already set
      if (!newState.activeMarket) {
        newState.activeMarket = payload.marketId;
      }

      return newState;
    case SET_FETCH_CAMPAIGNS_ERROR:
      return {
        ...state,
        error: action.error,
        status: FetchError
      };
    case ARCHIVE_CAMPAIGN:
      let oldOrder = state.sortOrder;

      let updatedCampaigns = oldOrder.filter(x => x !== payload.id);

      return {
        ...state,
        sortOrder: updatedCampaigns,
        status: Success
      };
    case UPDATE_SMS_TEMPLATE:
      let campaignsToUpdate = { ...state.campaigns, [payload.id]: payload };

      return {
        ...state,
        campaigns: campaignsToUpdate,
        status: Success
      }
    case RESET_CAMPAIGNS_DATA:
      return initialState;
    case SET_FETCH_CAMPAIGNS_NEXT_PAGE:
      return {
        ...state,
        isLoadingMore: action.payload
      };
    case SET_FETCH_CAMPAIGNS_NEXT_PAGE_SUCCESS: {
      let newState = {
        ...state,
        campaigns: { ...state.campaigns, ...payload.campaigns },
        isLoadingMore: false
      };
      return newState;
    }
    default:
      return state;
  }
}

// campaigns folder reducer
