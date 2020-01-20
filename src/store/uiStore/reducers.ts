import { combineReducers } from 'redux';
import prospectSearchView from './prospectSearchView/reducer';
import prospectDetailsView from './prospectDetailsView/reducer';
import campaignMessagesView from './campaignMessagesTabView/reducer';
import prospectDetailsPageView from './prospectDetailsPageView/reducer';

const reducers = combineReducers({
  prospectSearchView,
  prospectDetailsView,
  campaignMessagesView,
  prospectDetailsPageView
});

export default reducers;
