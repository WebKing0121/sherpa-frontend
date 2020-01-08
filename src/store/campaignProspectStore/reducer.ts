import {
  FETCH_CAMPAIGN_PROSPECTS,
  FETCH_CAMPAIGN_PROSPECTS_SUCCESS,
  FETCH_CAMPAIGN_PROSPECTS_FAILURE,
  UPDATE_CAMPAIGN_PROSPECT_LIST,
  UPDATE_CAMPAIGN_PROSPECT_SUCCESS
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
    case UPDATE_CAMPAIGN_PROSPECT_SUCCESS: {
      let newState = { ...state };
      const campaignProspectIdx = newState.campaignProspects[action.payload.campaign].findIndex(
        (cp: any) => cp.prospect.id === action.payload.prospect.id
      );
      newState.campaignProspects[action.payload.campaign][campaignProspectIdx] = action.payload;

      return newState;
    }
    default:
      return state;
  }
}
