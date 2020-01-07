import {
  FETCH_CAMPAIGN_PROSPECTS,
  FETCH_CAMPAIGN_PROSPECTS_SUCCESS,
  FETCH_CAMPAIGN_PROSPECTS_FAILURE,
  UPDATE_CAMPAIGN_PROSPECT_LIST
} from './actionTypes';

const initialState = {
  next: null,
  previous: null,
  campaignProspects: {},
  isLoading: false,
  error: false
}

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case FETCH_CAMPAIGN_PROSPECTS:
      return { ...state, isLoading: action.payload };
    case FETCH_CAMPAIGN_PROSPECTS_SUCCESS: {
      let newState = { ...state };
      newState.campaignProspects = action.payload.results;
      newState.next = action.payload.next;
      newState.previous = action.payload.previous;
      newState.isLoading = false;

      return newState
    }
    case FETCH_CAMPAIGN_PROSPECTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case FETCH_CAMPAIGN_PROSPECTS_SUCCESS: {
      let newState = { ...state };
      newState.campaignProspects = { ...newState.campaignProspects, ...action.payload.results };
      newState.next = action.payload.next;
      newState.previous = action.payload.previous;
      newState.isLoading = false;

      return newState
    }
    default:
      return state;
  }
}
