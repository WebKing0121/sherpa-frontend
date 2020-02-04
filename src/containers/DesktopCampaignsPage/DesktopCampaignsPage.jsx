import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TabContent, TabPane } from 'reactstrap';
import styled from 'styled-components';
import CampaignsListTab from './CampaignsListTab/CampaignsListTab';
import { desktopCampaignHeaderInfo } from '../../helpers/variables';

import TabbedHeader from '../../components/TabbedHeader';

const DesktopCampaignsPage = props => {
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="pageContent d-flex flex-column">
      <TabbedHeader data={desktopCampaignHeaderInfo} toggleTab={toggleTab} activeTab={activeTab}>Campaigns</TabbedHeader>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <CampaignsListTab />
        </TabPane>
        <TabPane tabId='2'>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default DesktopCampaignsPage;
