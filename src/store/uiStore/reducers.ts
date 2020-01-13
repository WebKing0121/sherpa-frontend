import { combineReducers } from 'redux';
import prospectSearchView from './prospectSearchView/reducer';
import prospectDetailsView from './prospectDetailsView/reducer';
import campaignMessagesView from './campaignMessagesTabView/reducer';

const reducers = combineReducers({
  prospectSearchView,
  prospectDetailsView,
  campaignMessagesView
});

export default reducers;
