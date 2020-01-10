import {
  FETCH_CAMPAIGN_PROSPECTS,
  FETCH_CAMPAIGN_PROSPECTS_SUCCESS,
  FETCH_CAMPAIGN_PROSPECTS_FAILURE,
  UPDATE_CAMPAIGN_PROSPECT_LIST,
  UPDATE_CAMPAIGN_PROSPECT_SUCCESS,
  FETCH_MORE_CAMPAIGN_PROSPECTS
} from './actionTypes';

const initialState = {
  next: null,
  previous: null,
  campaignProspects: {},
  isLoading: false,
  isLoadingMore: false,
  error: false
}

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case FETCH_CAMPAIGN_PROSPECTS:
      return { ...state, isLoading: action.payload };
    case FETCH_MORE_CAMPAIGN_PROSPECTS:
      return { ...state, isLoadmingMore: action.payload };
    case FETCH_CAMPAIGN_PROSPECTS_SUCCESS: {
      let newState = { ...state };

      if (action.concatResults) {
        newState.campaignProspects = { ...newState.campaignProspects, ...action.payload.results };
      } else {
        newState.campaignProspects = action.payload.results;
      }

      newState.next = action.payload.next;
      newState.previous = action.payload.previous;
      newState.isLoading = false;
      newState.isLoadingMore = false;

      return newState
    }
    case FETCH_CAMPAIGN_PROSPECTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case UPDATE_CAMPAIGN_PROSPECT_SUCCESS: {
      const campaignId = action.payload.campaign;
      const prospectId = action.payload.prospect.id;
      let campaignProspects = { ...state.campaignProspects };
      const prospectIndex = campaignProspects[campaignId].findIndex(
        (cp: any) => cp.prospect.id === prospectId
      );
      campaignProspects[campaignId] = [...campaignProspects[campaignId]];
      campaignProspects[campaignId][prospectIndex] = action.payload;

      return {
        ...state,
        campaignProspects
      };
    }
    default:
      return state;
  }
}
