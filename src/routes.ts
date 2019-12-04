import ProspectsSearch from './containers/ProspectsSearch/ProspectsSearch.jsx';
import CampaignsPage from './containers/CampaignsPage/CampaignsPage.jsx';

const Routes = [
  {
    path: "/",
    name: "Campaigns",
    navIcon: "campaignsWhite",
    alt: "",
    exact: true,
    component: CampaignsPage,
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
]

export default Routes;
