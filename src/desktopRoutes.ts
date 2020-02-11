import ProspectsSearch from './containers/ProspectsSearch/ProspectsSearch.jsx';
import CampaignsFolders from './containers/CampaignFoldersPage/CampaignFoldersPage';
import SupportPage from './containers/SupportPage/SupportPage.jsx';
import DesktopCampaigns from './containers/DesktopCampaignsPage/DesktopCampaignsPage';
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
    path: '/campaignDetails',
    name: 'Campaign Details',
    navIcon: 'exclamation-triangle',
    alt: '',
    exact: true,
    component: DesktopCampaignDetails,
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
  }
];

export default Routes;
