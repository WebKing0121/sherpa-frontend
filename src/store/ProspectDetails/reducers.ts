import {
  SET_PROSPECT_DATA,
  SET_PROSPECT_CAMPAIGNS,
  SET_PROSPECT_DETAILS_TAB_LEADSTAGES,
  SET_PROSPECT_DETAILS_TAB_AGENTS,
  SET_PROSPECT_FETCH_STATUS,
  SET_PROSPECT_SMS_RELAY_MAP,
  SET_PROSPECT_CAMPAIGN_ID,
  SET_PROSPECT_UPDATE_ACTION_STATUS,
  CLEAR_PROSPECT_CAMPAIGN_ID
} from './actionTypes';
import { Success, Fetching, Initial } from '../../variables';

interface ProspectDetailsStatus {
  verifiedBtnStatus: string;
  dncBtnStatus: string;
  priorityBtnStatus: string;
  qualifiedBtnStatus: string;
}

interface ProspectDetailsTabData {
  agents: Array<any> | undefined;
  leadStages: Array<any> | undefined;
  prospectStatus: ProspectDetailsStatus;
}

interface IState {
  count: number;
  next: string | null;
  prev: string | null;
  prospect: any;
  prospectCampaigns: Array<any>;
  smsRelayMap: any;
  status: string | null;
  prospectDetailsTab: ProspectDetailsTabData;
  activeCampaign: number | null;
}

const initial_state: IState = {
  count: 0,
  next: null,
  prev: null,
  prospect: {},
  prospectCampaigns: [],
  status: Fetching,
  smsRelayMap: { rep: { id: null } },
  activeCampaign: null,
  prospectDetailsTab: <ProspectDetailsTabData>{
    agents: [],
    leadStages: [],
    prospectStatus: {
      verifiedBtnStatus: "",
      dncBtnStatus: "",
      priorityBtnStatus: "",
      qualifiedBtnStatus: ""
    }
  }
};

export default function reducer(state: IState = initial_state, action: any) {
  switch (action.type) {
    case SET_PROSPECT_FETCH_STATUS:
      return {
        ...state,
        status: action.status
      };
    case SET_PROSPECT_UPDATE_ACTION_STATUS:
      return {
        ...state,
        prospectDetailsTab: {
          ...state.prospectDetailsTab,
          prospectStatus: {
            ...state.prospectDetailsTab.prospectStatus,
            [action.prospectStatus]: action.status
          }
        }
      }
    case SET_PROSPECT_DATA:
      return {
        ...state,
        prospect: action.prospect,
        status: Success
      };
    case SET_PROSPECT_CAMPAIGNS:
      return {
        ...state,
        prospectCampaigns: action.prospectCampaigns
      };
    case SET_PROSPECT_CAMPAIGN_ID:
      return {
        ...state,
        activeCampaign: action.prospectCampaignId
      };
    case CLEAR_PROSPECT_CAMPAIGN_ID:
      return {
        ...state,
        activeCampaign: null
      }
    case SET_PROSPECT_SMS_RELAY_MAP:
      return {
        ...state,
        smsRelayMap: action.smsRelayMap
      };
    case SET_PROSPECT_DETAILS_TAB_LEADSTAGES:
      return {
        ...state,
        prospectDetailsTab: {
          ...state.prospectDetailsTab,
          leadStages: action.leadStages
        }
      };
    case SET_PROSPECT_DETAILS_TAB_AGENTS:
      return {
        ...state,
        prospectDetailsTab: {
          ...state.prospectDetailsTab,
          agents: action.agents
        }
      };
    default:
      return state;
  }
}
