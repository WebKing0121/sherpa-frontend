import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { history } from './history';

// pages
import Navbar from './components/Navbar.jsx';
import LoginPage from './containers/LoginPage/LoginPage';
import CampaignsPage from './containers/CampaignsPage/CampaignsPage';
import CampaignFoldersPage from './containers/CampaignFoldersPage/CampaignFoldersPage';
import CampaignDetailsPage from './containers/CampaignDetailsPage/CampaignDetailsPage';
import ProspectDetailsPage from './containers/ProspectDetailsPage/ProspectDetailsPage';
import SupportPage from './containers/SupportPage/SupportPage';

// store
import { isAuthenticated } from './store/Auth/selectors';

// components
import { ProtectedRoute } from './components/ProtectedRoute';
import ProspectsSearch from './containers/ProspectsSearch/ProspectsSearch.jsx';
import ToastContainer from './components/Toasts/ToastContainer';
import NoDesktop from './components/NoDesktop';

//font awesome
import './assets/fontAwesome/index.ts';
import './App.css';

function App() {
  const is_auth = useSelector(isAuthenticated);

  return (
    <Router history={history}>
      {is_auth ? <Navbar page={history} /> : <Route exacts path='/login' component={LoginPage} />}
      <Switch>
        <ProtectedRoute is_auth={is_auth} path='/' component={CampaignFoldersPage} exact />
        <ProtectedRoute is_auth={is_auth} path='/folder/:id/campaigns' component={CampaignsPage} exact />
        <ProtectedRoute
          is_auth={is_auth}
          path='/campaigns/:id/details'
          component={CampaignDetailsPage}
          exact
        />
        <ProtectedRoute
          is_auth={is_auth}
          path='/prospect/:id/details'
          component={ProspectDetailsPage}
          exact
        />
        <ProtectedRoute is_auth={is_auth} path='/prospects' component={ProspectsSearch} />
        <ProtectedRoute is_auth={is_auth} path='/support' component={SupportPage} />
        <ProtectedRoute is_auth={is_auth} path='/' component={CampaignFoldersPage} />
      </Switch>
      {is_auth && <ToastContainer />}
      <NoDesktop />
    </Router>
  );
}

export default App;
