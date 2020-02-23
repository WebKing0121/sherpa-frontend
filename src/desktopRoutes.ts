import ProspectsSearch from './containers/ProspectsSearch/ProspectsSearch.jsx';
import CampaignsFolders from './containers/CampaignFoldersPage/CampaignFoldersPage';
import SupportPage from './containers/SupportPage/SupportPage.jsx';
import DesktopCampaigns from './containers/DesktopCampaignsPage/DesktopCampaignsPage';
import AccountSettingsPage from './containers/AccountSettingsPage/AccountSettingsPage';
import DesktopCampaignDetails from './containers/DesktopCampaignDetailPage/DesktopCampaignDetailPage';

const Routes = [
  {
    path: '/unreadMessages',
    name: 'New Messages',
    navIcon: 'comment-dots',
    alt: 'Unread Messages',
    exact: true,
    component: SupportPage,
    mobile: false
  },
  {
    path: '/campaigns',
    name: 'Campaigns',
    navIcon: 'bullhorn',
    alt: '',
    exact: true,
    component: DesktopCampaigns,
    mobile: true
  },
  {
    path: '/support',
    name: 'Support',
    navIcon: 'question-circle',
    alt: 'support',
    exact: true,
    component: SupportPage,
    mobile: false
  },
  {
    path: '/account-settings',
    name: 'Account Settings',
    navIcon: 'user-cog',
    alt: 'account settings',
    exact: true,
    component: AccountSettingsPage,
    mobile: false
  }
];

export default Routes;
