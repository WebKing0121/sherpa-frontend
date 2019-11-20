import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';
import auth from './Auth/reducers';
import { loadTokens } from './Auth/utils';

const reducers = combineReducers({
  auth
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
