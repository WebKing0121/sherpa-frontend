import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';
import { loadTokens } from './Auth/utils';

import auth from './Auth/reducers';
import campaigns from './Campaigns/reducers';
import campaignFolders from './CampaignFolders/reducers';
import campaignNotes from './CampaignNotes/reducers';
import filters from './Filters/reducers.js';
import prospects from './Prospects/reducers';
import prospectDetails from './ProspectDetails/reducers';
import prospectNotes from './ProspectNotes/reducers';
import supportItems from './Support/reducers';
import toastsReducer from './Toasts/reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const reducers = combineReducers({
  auth,
  campaigns,
  campaignFolders,
  campaignNotes,
  filters,
  prospects,
  prospectDetails,
  prospectNotes,
  supportItems,
  toastsReducer
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
const Store = createStore(rootReducer, authInfo, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default Store;
