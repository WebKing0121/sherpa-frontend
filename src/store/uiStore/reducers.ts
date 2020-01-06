import { combineReducers } from 'redux';
import prospectSearchView from './prospectSearchView/reducer';
import prospectDetailsView from './prospectDetailsView/reducer';

const reducers = combineReducers({
  prospectSearchView,
  prospectDetailsView
});

export default reducers;
