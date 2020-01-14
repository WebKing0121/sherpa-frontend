import ProspectsSearch from './containers/ProspectsSearch/ProspectsSearch.jsx';
import CampaignsFolders from './containers/CampaignFoldersPage/CampaignFoldersPage';
import SupportPage from './containers/SupportPage/SupportPage.jsx';
import DesktopCampaigns from './containers/DesktopCampaignsPage/DesktopCampaignsPage';

const Routes = [
  {
    path: '/unreadMessages',
    name: 'New Messages',
    navIcon: 'messagesWhite',
    alt: 'Unread Messages',
    exact: true,
    component: SupportPage,
    mobile: false
  },
  {
    path: '/campaigns',
    name: 'Campaigns',
    navIcon: 'campaignsWhite',
    alt: '',
    exact: true,
    component: DesktopCampaigns,
    mobile: true
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
