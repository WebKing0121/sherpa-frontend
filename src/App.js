import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StylesPage from './containers/StylesPage/StylesPage.jsx';

function App() {
  return (
    <Router>
      <div>
        <Route exact path='/' component={StylesPage} />
        <Switch>
          <Route path='/Styles' component={StylesPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
