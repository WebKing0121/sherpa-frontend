import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/styles/css/main.css';
import { Provider } from 'react-redux';
import ReduxStore from './store/store';
import { setAuthTokenHeader } from './store/Auth/utils';

setAuthTokenHeader();

ReactDOM.render(
  <Provider store={ReduxStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (window.Cypress) {
  window.store = ReduxStore;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
