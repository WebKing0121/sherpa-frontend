import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';
import auth from './Auth/reducers';
import campaigns from './Campaigns/reducers';
import campaignFolders from './CampaignFolders/reducers';
import prospects from './Prospects/reducers';
import { loadTokens } from './Auth/utils';

declare global {
    interface Window {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const reducers = combineReducers({
  auth,
  campaigns,
  campaignFolders,
  prospects
});

// for local stuff
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// load local-storage tokens
const authInfo = loadTokens();
const Store = createStore(
  reducers,
  authInfo,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default Store;
