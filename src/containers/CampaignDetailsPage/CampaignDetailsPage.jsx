import React, { useState } from 'react';
import TabbedHeader from '../../components/TabbedHeader';
import MessagesTab from './MessagesTab/MessagesTab';
import SendTab from './SendTab/SendTab';
import NotesTab from './NotesTab/NotesTab';
import { TabContent, TabPane } from 'reactstrap';
import styled from 'styled-components';

const StyledTabContent = styled(TabContent)`
  /* padding: 0 var(--pad3); */
`;

function CampaignDetailsPage() {
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const headerInfo = {
    fromText: "Campaign List",
    hasBackButton: true,
    tabs: [
      {
        idx: "1",
        name: "Send",
        icon: "paper-plane"
      },
      {
        idx: "2",
        name: "Messages",
        icon: "comment-dots"
      },
      {
        idx: "3",
        name: "Notes",
        icon: "sticky-note"
      }
    ]
  }

  return (
    <div>
      <TabbedHeader data={headerInfo} toggleTab={toggleTab} activeTab={activeTab}>Greeley/Fort Collins - 2019-05-08</TabbedHeader>
      <StyledTabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <SendTab />
        </TabPane>
        <TabPane tabId="2">
          <MessagesTab />
        </TabPane>
        <TabPane tabId="3">
          <NotesTab />
        </TabPane>
      </StyledTabContent>
    </div>
  );
};

export default CampaignDetailsPage;
