import StylesPage from './containers/StylesPage/StylesPage.jsx';
import ProspectsSearch from './containers/ProspectsSearch/ProspectsSearch.jsx';
import CampaignsPage from './containers/CampaignsPage/CampaignsPage.jsx';
import brain from "./assets/images/icons/brain.svg";
import prospectSearch from "./assets/images/icons/prospectSearch.svg";

const Routes = [
  {
    path: "/",
    name: "Camapaigns",
    navIcon: "",
    alt: "",
    exact: true,
    component: CampaignsPage,
    mobile: true,
  },
  {
    path: "/styles",
    name: "Styles",
    navIcon: brain,
    alt: "styles",
    exact: true,
    component: StylesPage,
    mobile: false,
  },
  {
    path: "/prospects",
    name: "Prospects",
    navIcon: prospectSearch,
    alt: "prospects",
    exact: true,
    component: ProspectsSearch,
    mobile: false,
  },
]

export default Routes;
