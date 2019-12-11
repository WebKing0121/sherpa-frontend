import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { history } from "./history";

// pages
import Navbar from "./components/Navbar.jsx";
import LoginPage from "./containers/LoginPage/LoginPage";
import CampaignsPage from "./containers/CampaignsPage/CampaignsPage.jsx";
import CampaignsFolderPage from "./containers/CampaignsFolderList/CampaignsFolderList";
import CampaignDetailsPage from "./containers/CampaignDetailsPage/CampaignDetailsPage";
import ProspectDetailsPage from "./containers/ProspectDetailsPage/ProspectDetailsPage";
import SupportPage from "./containers/Support/SupportPage";

// components
import { ProtectedRoute } from "./components/ProtectedRoute";
import { isAuthenticated } from "./store/Auth/selectors";
import "./App.css";
import ProspectsSearch from "./containers/ProspectsSearch/ProspectsSearch.jsx";

//font awesome
import "./assets/fontAwesome/index.ts";

function App() {
  const is_auth = useSelector(isAuthenticated);

  return (
    <Router history={history}>
      <div>
        {is_auth ? <Navbar page={history} /> : <Route exact path="/login" component={LoginPage} />}
        <Switch>
          <ProtectedRoute is_auth={is_auth} path="/" component={CampaignsFolderPage} exact />
          <ProtectedRoute is_auth={is_auth} path="/folder/:id/campaigns" component={CampaignsPage} exact />
          <ProtectedRoute is_auth={is_auth} path="/campaigns/:id/details" component={CampaignDetailsPage} exact />
          <ProtectedRoute is_auth={is_auth} path="/prospect/:id/details" component={ProspectDetailsPage} exact />
          <ProtectedRoute is_auth={is_auth} path="/prospects" component={ProspectsSearch} />
          <ProtectedRoute is_auth={is_auth} path="/support" component={SupportPage} />
          <ProtectedRoute is_auth={is_auth} path="/" component={CampaignsFolderPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
