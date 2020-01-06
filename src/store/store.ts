import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';
import { loadTokens } from './Auth/utils';
import { loadLeadStages } from './leadstages/utils';

import auth from './Auth/reducers';
import campaigns from './Campaigns/reducers';
import campaignNotes from './CampaignDetails/notes/reducers';
import companyOwners from './CompanyOwners/reducers.js';
import markets from './Markets/reducers';
import prospects from './Prospects/reducers';
import prospectDetails from './ProspectDetails/details/reducers';
import prospectNotes from './ProspectDetails/notes/reducers';
import prospectMessages from './ProspectDetails/messages/reducers';
import supportItems from './Support/reducers';
import toastsReducer from './Toasts/reducers';
import leadStages from './leadstages/reducer';
import smsTemplates from './CampaignDetails/sent/reducers';
import uiStore from './uiStore/reducers';
import prospectStore from './prospectStore/reducer';
import nav from './Nav/reducer';


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const prospectDetailsReducer = combineReducers({ prospectDetails, prospectNotes, prospectMessages });

const reducers = combineReducers({
  auth,
  campaigns,
  campaignNotes,
  companyOwners,
  markets,
  prospects,
  prospectDetailsReducer,
  supportItems,
  toastsReducer,
  leadStages,
  smsTemplates,
  prospectStore,
  uiStore,
  nav
});

const rootReducer = (state: any, action: any) => {
  // logout case where we want to reset all state from redux
  if (action.type === 'RESET') state = undefined;

  return reducers(state, action);
};

// for local stuff
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// load local-storage tokens
const authInfo = loadTokens();
const leadStagesData = loadLeadStages();
const initialState = { ...authInfo, ...leadStagesData };
const Store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default Store;
