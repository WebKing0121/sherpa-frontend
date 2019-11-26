import StylesPage from './containers/StylesPage/StylesPage.jsx';
import ProspectsSearch from './containers/ProspectsSearch/ProspectsSearch.jsx';
import CampaignsPage from './containers/CampaignsPage/CampaignsPage.jsx';

const Routes = [
  {
    path: "/campaigns",
    name: "Campaigns",
    navIcon: "campaignsWhite",
    alt: "",
    exact: true,
    component: CampaignsPage,
    mobile: true,
  },
  {
    path: "/styles",
    name: "Styles",
    navIcon: "notesWhite",
    alt: "styles",
    exact: true,
    component: StylesPage,
    mobile: false,
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
