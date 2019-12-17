import {
  SET_PROSPECT_DATA, SET_PROSPECT_CAMPAIGNS,
  SET_PROSPECT_DETAILS_TAB_LEADSTAGES,
  SET_PROSPECT_DETAILS_TAB_AGENTS,
  SET_PROSPECT_FETCH_STATUS
} from './actionTypes';

interface ProspectDetailsTabData {
  agents: Array<any> | undefined;
  leadStages: Array<any> | undefined;
}

interface IState {
  count: number;
  next: string | null;
  prev: string | null;
  prospect: any;
  prospectCampaigns: Array<any>;
  status: string | null;
  prospectDetailsTab: ProspectDetailsTabData;
}

const initial_state: IState = {
  count: 0,
  next: null,
  prev: null,
  prospect: {},
  prospectCampaigns: [],
  status: "Fetching",
  prospectDetailsTab: <ProspectDetailsTabData>{
    agents: [],
    leadStages: []
  }
}

export default function reducer(state: IState = initial_state, action: any) {
  switch (action.type) {
    case SET_PROSPECT_FETCH_STATUS:
      return {
        ...state,
        status: action.status
      };
    case SET_PROSPECT_DATA:
      return {
        ...state,
        prospect: action.prospect,
        status: "Success"
      };
    case SET_PROSPECT_CAMPAIGNS:
      return {
        ...state,
        prospectCampaigns: action.prospectCampaigns
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
