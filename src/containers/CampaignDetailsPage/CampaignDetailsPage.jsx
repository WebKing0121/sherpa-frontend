import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TabbedHeader from '../../components/TabbedHeader';
import MessagesTab from './MessagesTab/MessagesTab';
import SendTab from './SendTab/SendTab';
import { TabContent, TabPane } from 'reactstrap';
import styled from 'styled-components';
import NotesTab from '../../components/NotesTab/NotesTab';
import { fetchCampaignNotes, updateCampaignNotes } from '../../store/CampaignNotes/actions';
import { campaignNotesList, campaignNotesStatus } from '../../store/CampaignNotes/selectors';

const StyledTabContent = styled(TabContent)`
  /* padding: 0 var(--pad3); */
`;

function CampaignDetailsPage(props) {
  const [activeTab, setActiveTab] = useState('1');
  const campaignId = props.match.params.id;
  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const headerInfo = {
    fromText: 'Campaign List',
    hasBackButton: true,
    tabs: [
      {
        idx: '1',
        name: 'Send',
        icon: 'paper-plane'
      },
      {
        idx: '2',
        name: 'Messages',
        icon: 'comment-dots'
      },
      {
        idx: '3',
        name: 'Notes',
        icon: 'sticky-note'
      }
    ]
  };

  const notesList = useSelector(campaignNotesList);

  const notesProps = {
    fetchNotes: fetchCampaignNotes,
    updateNotes: updateCampaignNotes,
    subject: 'campaign',
    subjectId: campaignId,
    notesList,
    notesStatus: campaignNotesStatus
  };

  return (
    <div>
      <TabbedHeader data={headerInfo} toggleTab={toggleTab} activeTab={activeTab}>
        Greeley/Fort Collins - 2019-05-08
      </TabbedHeader>
      <StyledTabContent activeTab={activeTab}>
        <TabPane tabId='1'>{activeTab === '1' && <SendTab />}</TabPane>
        <TabPane tabId='2'>{activeTab === '2' && <MessagesTab />}</TabPane>
        <TabPane tabId='3'>{activeTab === '3' && <NotesTab {...notesProps} />}</TabPane>
      </StyledTabContent>
    </div>
  );
}

export default CampaignDetailsPage;
