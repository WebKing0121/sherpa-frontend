import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';
import auth from './Auth/reducers';

const reducers = combineReducers({
  auth
});

const Store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
)

export default Store;
