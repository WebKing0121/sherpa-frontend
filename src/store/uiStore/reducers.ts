import { combineReducers } from 'redux';
import prospectSearchView from './prospectSearchView/reducer';
import prospectDetailsView from './prospectDetailsView/reducer';
import campaignMessagesView from './campaignMessagesTabView/reducer';
import prospectDetailsPageView from './prospectDetailsPageView/reducer';
import campaignDetailsPageView from './campaignDetailsPageView/reducer';

const reducers = combineReducers({
  prospectSearchView,
  prospectDetailsView,
  campaignMessagesView,
  prospectDetailsPageView,
  campaignDetailsPageView
});

export default reducers;
