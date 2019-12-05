import React, { useState } from 'react';
import TabbedHeader from '../../components/TabbedHeader';
import MessagesTab from './MessagesTab/MessagesTab';
import SendTab from './SendTab/SendTab';
import NotesTab from './NotesTab/NotesTab';
import { Button, TabContent, TabPane, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import styled from 'styled-components';

const StyledTabContent = styled(TabContent)`
  /* padding: 0 var(--pad3); */
`;

function CampaignDetailsPage() {
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = (tab) => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  return (
    <div>
      <TabbedHeader toggleTab={toggleTab} activeTab={activeTab}>Greeley/Fort Collins - 2019-05-08</TabbedHeader>
      <StyledTabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <SendTab/>
        </TabPane>
        <TabPane tabId="2">
          <MessagesTab/>
        </TabPane>
        <TabPane tabId="3">
          <NotesTab/>
        </TabPane>
      </StyledTabContent>
    </div>
  );
};

export default CampaignDetailsPage;
