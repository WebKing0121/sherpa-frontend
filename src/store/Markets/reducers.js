import {
  FETCH_MARKETS,
  SET_FETCH_MARKETS,
  SET_FETCH_MARKETS_ERROR,
  DECREMENT_MARKET_CAMPAIGN_COUNT
} from './actionTypes';
import { Fetching, Success, FetchError } from '../../helpers/variables';

// campaigns reducer
export const initialState = {
  folders: [],
  error: '',
  next: '',
  previous: '',
  count: 0,
  status: Fetching
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MARKETS:
      return {
        ...state,
        status: Fetching
      };
    case SET_FETCH_MARKETS:
      return {
        ...state,
        folders: action.campaignFolders,
        status: Success
      };
    case SET_FETCH_MARKETS_ERROR:
      return {
        ...state,
        error: action.error,
        status: FetchError
      };
    case DECREMENT_MARKET_CAMPAIGN_COUNT:
      const { folders } = state;

      // decrement the campaign count for the market the campaign was archived from
      const toDecrement = folders.reduce((acc, curr) => {
        if (curr.id === action.market) {
          curr.campaignCount--;
        }
        acc.push(curr);
        return acc;
      }, [])

      return {
        ...state,
        folders: [...toDecrement]
      }
    default:
      return state;
  }
}
