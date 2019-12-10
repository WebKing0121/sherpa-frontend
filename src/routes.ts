import ProspectsSearch from './containers/ProspectsSearch/ProspectsSearch.jsx';
import ProspectDetailsPage from './containers/ProspectDetailsPage/ProspectDetailsPage.jsx';
import CampaignsFolders from './containers/CampaignsFolderList/CampaignsFolderList';

const Routes = [
  {
    path: "/",
    name: "Campaigns",
    navIcon: "campaignsWhite",
    alt: "",
    exact: true,
    component: CampaignsFolders,
    mobile: true,
  },
  {
    path: "/prospects",
    name: "Prospects",
    navIcon: "prospectSearchWhite",
    alt: "prospects",
    exact: true,
    component: ProspectsSearch,
    mobile: false,
  },
  {
    path: "/prospectDetails",
    name: "Prospect Details",
    navIcon: "prospectSearchWhite",
    alt: "prospects",
    exact: true,
    component: ProspectDetailsPage,
    mobile: false,
  },
]

export default Routes;