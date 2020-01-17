import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { history } from './history';

// pages
import Navbar from './components/Navbar.jsx';
import NavbarDesktop from './components/NavbarDesktop.jsx';
import LoginPage from './containers/LoginPage/LoginPage';
import CampaignsPage from './containers/CampaignsPage/CampaignsPage';
import CampaignFoldersPage from './containers/CampaignFoldersPage/CampaignFoldersPage';
import CampaignDetailsPage from './containers/CampaignDetailsPage/CampaignDetailsPage';
import ProspectDetailsPage from './containers/ProspectDetailsPage/ProspectDetailsPage';
import SupportPage from './containers/SupportPage/SupportPage';
import DesktopCampaignsPage from './containers/DesktopCampaignsPage/DesktopCampaignsPage';

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
import { maxMobileWidth, debounceTime } from './helpers/variables';
import { debounce } from './helpers/utils';

function App() {
  const is_auth = useSelector(isAuthenticated);
  const [isMobile, setIsMobile] = useState(window.innerWidth < maxMobileWidth);

  const updateViewport = () => {
    const viewWidth = window.innerWidth;
    setIsMobile(viewWidth < maxMobileWidth);
  };

  useEffect(() => {
    // debounce used to slow down resize to avoid making the display laggy when resizing
    const debounced = debounce(updateViewport, debounceTime);
    window.addEventListener('resize', debounced);
    return () => window.removeEventListener('resize', debounced);
  }, []);

  const determineNav = () => {
    const login = <Route exacts path='/login' component={LoginPage} />;
    const desktopNav = <NavbarDesktop page={history} />;
    const mobileNav = <Navbar page={history} />;
    return !is_auth ? login : isMobile ? mobileNav : desktopNav;
  };

  return (
    <Router history={history}>
      {determineNav()}
      <Switch>
        <ProtectedRoute is_auth={is_auth} path='/' component={CampaignFoldersPage} exact />
        <ProtectedRoute
          is_auth={is_auth}
          path='/markets/:marketId/campaigns'
          component={CampaignsPage}
          exact
        />
        <ProtectedRoute
          is_auth={is_auth}
          path='/markets/:marketId/campaigns/:campaignId/details'
          component={CampaignDetailsPage}
          exact
        />
        <ProtectedRoute is_auth={is_auth} path='/campaigns' component={DesktopCampaignsPage} exact />
        <ProtectedRoute
          is_auth={is_auth}
          path='/prospect/:prospectId/details'
          component={ProspectDetailsPage}
          exact
        />
        <ProtectedRoute is_auth={is_auth} path='/prospects' component={ProspectsSearch} />
        <ProtectedRoute is_auth={is_auth} path='/support' component={SupportPage} />
      </Switch>
      {is_auth && <ToastContainer />}
      <NoDesktop />
    </Router>
  );
}

export default App;
