import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { history } from './history';

// pages
import Navbar from './components/Navbar.jsx';
import LoginPage from './containers/LoginPage/LoginPage';
import CampaignsPage from './containers/CampaignsPage/CampaignsPage.jsx';
import CampaignsFolderPage from './containers/CampaignsFolderList/CampaignsFolderList';
import CampaignDetailsPage from './containers/CampaignDetailsPage/CampaignDetailsPage';
import ProspectDetailsPage from './containers/ProspectDetailsPage/ProspectDetailsPage';

// components
import { ProtectedRoute } from './components/ProtectedRoute';
import { isAuthenticated } from './store/Auth/selectors';
import './App.css';
import ProspectsSearch from './containers/ProspectsSearch/ProspectsSearch.jsx';

// Icon Library Init
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBullhorn, faSearch, faChevronUp, faPaperPlane, faQuestionCircle, faCheck, faUser, faBolt, faCommentDots, faStickyNote, faPhoneSlash, faStar, faTimesCircle, faTags, faHeadset, faMobileAlt, faShare, faBell } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faBullhorn, faSearch, faChevronUp, faPaperPlane, faQuestionCircle, faCheck, faUser, faBolt, faCommentDots, faStickyNote, faPhoneSlash, faStar, faTimesCircle, faTags, faHeadset, faMobileAlt, faShare, faBell);

function App() {
  const is_authenticated = useSelector(isAuthenticated);

  return (
    <Router history={history}>
      <div>
        {
          is_authenticated ? <Navbar page={history} /> :
            <Route exact path='/login' component={LoginPage} />
        }
        <Switch>
          <ProtectedRoute is_authenticated={is_authenticated} path='/' component={CampaignsFolderPage} exact />
          <ProtectedRoute is_authenticated={is_authenticated} path='/folder/:id/campaigns' component={CampaignsPage} exact />
          <ProtectedRoute is_authenticated={is_authenticated} path='/campaigns/:id/details' component={CampaignDetailsPage} exact />
          <ProtectedRoute is_authenticated={is_authenticated} path='/prospectDetails' component={ProspectDetailsPage} exact />
          <ProtectedRoute is_authenticated={is_authenticated} path='/prospects' component={ProspectsSearch} />
          <ProtectedRoute is_authenticated={is_authenticated} path='/' component={() => <h2>Page Not Found</h2>} />
        </Switch>
      </div>
    </Router>);
}

export default App;
