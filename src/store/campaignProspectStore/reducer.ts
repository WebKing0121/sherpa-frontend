import {
  FETCH_CAMPAIGN_PROSPECTS,
  FETCH_CAMPAIGN_PROSPECTS_SUCCESS,
  FETCH_CAMPAIGN_PROSPECTS_FAILURE,
  UPDATE_CAMPAIGN_PROSPECT_SUCCESS,
  FETCH_MORE_CAMPAIGN_PROSPECTS,
  FETCH_CAMPAIGN_PROSPECTS_UNREAD_SUCCESS,
  UPDATE_CAMPAIGN_PROSPECTS_UNREAD
} from './actionTypes';

const initialState = {
  next: null,
  previous: null,
  campaignProspects: {},
  campaignProspectsUnread: [],
  campaignProspectsUnreadCount: 0,
  isLoading: false,
  isLoadingMore: false,
  error: false
};

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case FETCH_CAMPAIGN_PROSPECTS:
      return { ...state, isLoading: action.payload };
    case FETCH_MORE_CAMPAIGN_PROSPECTS:
      return { ...state, isLoadingMore: action.payload };
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

      return newState;
    }
    case FETCH_CAMPAIGN_PROSPECTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case UPDATE_CAMPAIGN_PROSPECT_SUCCESS: {
      const campaignId = action.payload.campaign.id;
      let campaignProspects = { ...state.campaignProspects };

      // only update if it exists already
      if (campaignProspects[campaignId]) {
        const prospectId = action.payload.prospect.id;
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

      return state;
    }
    case FETCH_CAMPAIGN_PROSPECTS_UNREAD_SUCCESS: {
      const ids = state.campaignProspectsUnread
        .map((campaignProspect: any) => campaignProspect.prospect.id);

      const newCampaignProspects = action.payload
        .map((campaignProspect: any) => {
          if (!ids.includes(campaignProspect.prospect.id)) {
            return { ...campaignProspect, animate: true };
          }
          return campaignProspect;
        })

      return {
        ...state,
        campaignProspectsUnread: newCampaignProspects,
        campaignProspectsUnreadCount: newCampaignProspects.length
      }
    }
    case UPDATE_CAMPAIGN_PROSPECTS_UNREAD: {
      const idx = state.campaignProspectsUnread.findIndex(
        (pru: any) => pru.prospect.id === action.payload.prospect.id
      );
      const newCampaignProspectsUnread = [...state.campaignProspectsUnread];
      newCampaignProspectsUnread[idx] = {
        ...newCampaignProspectsUnread[idx],
        ...action.payload
      }

      return {
        ...state,
        campaignProspectsUnread: newCampaignProspectsUnread
      };
    }
    default:
      return state;
  }
}
