import ProspectsSearch from './containers/ProspectsSearch/ProspectsSearch.jsx';
import CampaignsFolders from './containers/CampaignsFolderList/CampaignsFolderList';
import SupportPage from './containers/SupportPage/SupportPage.jsx';

const Routes = [
  {
    path: '/',
    name: 'Campaigns',
    navIcon: 'campaignsWhite',
    alt: '',
    exact: true,
    component: CampaignsFolders,
    mobile: true
  },
  {
    path: '/prospects',
    name: 'Prospects',
    navIcon: 'prospectSearchWhite',
    alt: 'prospects',
    exact: true,
    component: ProspectsSearch,
    mobile: false
  },
  {
    path: '/support',
    name: 'Support',
    navIcon: 'supportWhite',
    alt: 'support',
    exact: true,
    component: SupportPage,
    mobile: false
  }
];

export default Routes;
