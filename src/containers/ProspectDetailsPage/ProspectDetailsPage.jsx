import React, { useState } from 'react';
import TabbedHeader from '../../components/TabbedHeader';
import MessagesTab from './MessagesTab/MessagesTab';
import DetailsTab from './DetailsTab/DetailsTab';
import NotesTab from './NotesTab/NotesTab';
import { TabContent, TabPane } from 'reactstrap';
import styled from 'styled-components';

const StyledTabContent = styled(TabContent)`
`;

function ProspectDetailsPage() {
  const [activeTab, setActiveTab] = useState('1');

  const headerInfo = {
    fromText: "Prospect List",
    hasBackButton: true,
    tabs: [
      {
        idx: "1",
        name: "Details",
        icon: "user"
      },
      {
        idx: "2",
        name: "Messages",
        icon: "comment-dots"
      } ,
      {
        idx: "3",
        name: "Notes",
        icon: "sticky-note"
      }
    ]
  }

  const toggleTab = (tab) => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  return (
    <div>
      <TabbedHeader toggleTab={toggleTab} activeTab={activeTab} data={headerInfo}>Sean Vaughn</TabbedHeader>
      <StyledTabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <DetailsTab/>
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

export default ProspectDetailsPage;
