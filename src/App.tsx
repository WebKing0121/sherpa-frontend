import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import NewMessagesPage from './containers/NewMessages/NewMessages.jsx';
import { campaignProspectUnread } from './store/campaignProspectStore/api';
import { MESSAGES_POLLING_INTERVAL } from './helpers/variables';
import { fetchCampaignProspectsUnread } from './store/campaignProspectStore/actions';

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
import { fetchUserInfo } from './store/Auth/actions';

function App() {
  const dispatch = useDispatch();
  const is_auth = useSelector(isAuthenticated);
  const [isMobile, setIsMobile] = useState(window.innerWidth < maxMobileWidth);
  const showDesktop =
    process.env.REACT_APP_SHOW_DESKTOP === undefined ||
    process.env.REACT_APP_SHOW_DESKTOP === "true";

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

  const fetchMessages = () => {
    campaignProspectUnread()
      .then(({ data }) => {
        dispatch(fetchCampaignProspectsUnread(data));
      });
  };

  useEffect(() => {
    if (is_auth) {
      // fetch messages
      fetchMessages();
      const interval = setInterval(fetchMessages, MESSAGES_POLLING_INTERVAL);

      // fetch auth-data on reload
      fetchUserInfo(dispatch);

      return () => clearInterval(interval);
    }
  }, [is_auth]);

  const determineNav = () => {
    const login = <Route exacts path='/login' component={LoginPage} />;
    const desktopNav = <NavbarDesktop page={history} />;
    const mobileNav = <Navbar page={history} />;
    return !is_auth ? login : isMobile ? mobileNav : desktopNav;
  };

  const showRoutes = (isMobile: boolean, showDesktop: boolean) => {
    return isMobile || (!isMobile && showDesktop);
  };

  return showRoutes(isMobile, showDesktop) ? (
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
        <ProtectedRoute is_auth={is_auth} path='/new-messages' component={NewMessagesPage} exact />
        <ProtectedRoute is_auth={is_auth} path='/prospects' component={ProspectsSearch} />
        <ProtectedRoute is_auth={is_auth} path='/support' component={SupportPage} />
      </Switch>
      {is_auth && <ToastContainer />}
    </Router>
  ) : <NoDesktop />;
}

export default App;
