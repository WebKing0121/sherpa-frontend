import {
  SET_ACTIVE_CAMPAIGN,
  SET_ACTION_BTN_STATUS,
  SET_ACTIVE_PROSPECT,
  CLEAR_ACTIVE_CAMPAIGN
} from './actionTypes';

const initialState = {
  isLoading: true,
  activeProspect: null,
  activeCampaign: null,
  actionButtons: {
    ownerVerifiedStatus: false,
    doNotCall: false,
    isPriority: false,
    isQualifiedLead: false
  }
}

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case SET_ACTIVE_CAMPAIGN:
      return {
        ...state,
        activeCampaign: action.payload
      };
    case SET_ACTION_BTN_STATUS: {
      let newState = { ...state };
      newState.actionButtons[action.payload.btn] = action.payload.updating;
      return newState;
    };
    case SET_ACTIVE_PROSPECT:
      return {
        ...state,
        activeProspect: action.payload
      };
    case CLEAR_ACTIVE_CAMPAIGN:
      return {
        ...state,
        activeCampaign: null
      };
    default:
      return state;
  }
}
