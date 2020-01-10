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
import { maxMobileWidth } from './variables';

function App() {
  const is_auth = useSelector(isAuthenticated);
  const [isMobile, setIsMobile] = useState(window.innerWidth < maxMobileWidth);

  const updateViewport = () => {
    const viewWidth = window.innerWidth;
    setIsMobile(viewWidth < maxMobileWidth);
  };

  // debounce used to slow down resize to avoid making the display laggy when resizing
  const debounce = (callback: Function, delay: number) => {
    let debounceTimer: ReturnType<typeof setTimeout>;
    return function(this: Function) {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => callback.apply(context, args), delay);
    };
  };

  useEffect(() => {
    const time = 30;
    const debounced = debounce(updateViewport, time);
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
          path='/markets/:id/campaigns'
          component={CampaignsPage}
          exact
        />
        <ProtectedRoute
          is_auth={is_auth}
          path='/markets/:id/campaigns/:id/details'
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
