import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { history } from './history';

// pages
import Header from './containers/Header/Header.jsx';
import StylesPage from './containers/StylesPage/StylesPage.jsx';
import LoginPage from './containers/LoginPage/LoginPage';
import CampaignsPage from './containers/CampaignsPage/CampaignsPage.jsx';

// components
import { ProtectedRoute } from './components/ProtectedRoute';
import { isAuthenticated } from './store/Auth/selectors';

function App() {
  const is_authenticated = useSelector(isAuthenticated);
  return (
    <Router history={history}>
      <div>
        {
          is_authenticated ? <Header /> :
            <Route exact path='/login' component={LoginPage} />
        }
        <Switch>
          <ProtectedRoute is_authenticated={is_authenticated} path='/' component={CampaignsPage} exact />
          <ProtectedRoute is_authenticated={is_authenticated} path='/styles' component={StylesPage} exact />
          <ProtectedRoute is_authenticated={is_authenticated} path='/' component={() => <h2>Page Not Found</h2>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
