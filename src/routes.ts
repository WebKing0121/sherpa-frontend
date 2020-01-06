import ProspectsSearch from './containers/ProspectsSearch/ProspectsSearch.jsx';
import CampaignsFolders from './containers/CampaignFoldersPage/CampaignFoldersPage';
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
  },
  {
    path: '/unreadMessages',
    name: 'New Messages',
    navIcon: 'messagesWhite',
    alt: 'Unread Messages',
    exact: true,
    component: SupportPage,
    mobile: false
  }
];

export default Routes;
