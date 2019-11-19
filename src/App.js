import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StylesPage from './containers/StylesPage/StylesPage.jsx';
import { Provider } from 'react-redux';
import ReduxStore from './store/store';

function App() {
  return (
    <Provider store={ReduxStore}>
      <Router>
        <div>
          <Route exact path='/' component={StylesPage} />
          <Switch>
            <Route path='/Styles' component={StylesPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
