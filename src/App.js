import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxStore from './store/store';

// pages
import StylesPage from './containers/StylesPage/StylesPage.jsx';
import LoginPage from './containers/LoginPage/LoginPage';


function App() {
  return (
    <Provider store={ReduxStore}>
      <Router>
        <div>
          <Route exact path='/' component={StylesPage} />
          <Switch>
            <Route path='/Styles' component={StylesPage} />
            <Route path='/Login' component={LoginPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
