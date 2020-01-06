import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TabbedHeader from '../../components/TabbedHeader';
import SendTab from './SendTab/SendTab';
import { TabContent, TabPane } from 'reactstrap';
import styled from 'styled-components';
import NotesTab from '../../components/NotesTab/NotesTab';
import * as noteActions from '../../store/CampaignDetails/notes/actions';
import { campaignNotesList, campaignNotesStatus } from '../../store/CampaignDetails/notes/selectors';
import { campaignHeaderInfo } from '../../variables';
import MessagesTab from './MessagesTab/MessagesTab';

const StyledTabContent = styled(TabContent)`
  /* padding: 0 var(--pad3); */
`;

function CampaignDetailsPage(props) {
  const [activeTab, setActiveTab] = useState('1');
  const campaignId = props.match.params.id;
  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const notesList = useSelector(campaignNotesList);

  const notesProps = {
    fetchNotes: noteActions.fetchCampaignNotes,
    updateNotes: noteActions.updateCampaignNotes,
    subject: 'campaign',
    subjectId: campaignId,
    notesList,
    notesStatus: campaignNotesStatus,
    addNote: noteActions.addCampaignNote,
    editNote: noteActions.editCampaignNote,
    deleteNote: noteActions.deleteCampaignNote,
    restoreNote: noteActions.restoreCampaignNote
  };

  return (
    <>
      <TabbedHeader data={campaignHeaderInfo} toggleTab={toggleTab} activeTab={activeTab}>
        Greeley/Fort Collins - 2019-05-08
      </TabbedHeader>
      <StyledTabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <SendTab />
        </TabPane>
        <TabPane tabId='2'>
          <MessagesTab />
        </TabPane>
        <TabPane tabId='3'>
          <NotesTab {...notesProps} />
        </TabPane>
      </StyledTabContent>
    </>
  );
}

export default CampaignDetailsPage;
