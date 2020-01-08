import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TabbedHeader from '../../components/TabbedHeader';
import SendTab from './SendTab/SendTab';
import { TabContent, TabPane } from 'reactstrap';
import styled from 'styled-components';
import NotesTab from '../../components/NotesTab/NotesTab';
import * as noteActions from '../../store/CampaignDetails/notes/actions';
import { campaignNotesList, campaignNotesStatus } from '../../store/CampaignDetails/notes/selectors';
import { campaignHeaderInfo } from '../../variables';
import MessagesTab from './MessagesTab/MessagesTab';
import { getCampaignDetails } from '../../store/CampaignStore/selectors';
import { fetchSingleCampaign } from '../../store/CampaignStore/actions';

const StyledTabContent = styled(TabContent)`
  /* padding: 0 var(--pad3); */
`;

function CampaignDetailsPage(props) {
  const [activeTab, setActiveTab] = useState('1');
  const campaignId = props.match.params.id;
  const campaign = useSelector(getCampaignDetails);
  const dispatch = useDispatch();

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    if(!campaign || campaign.id !== parseInt(campaignId)) {
      console.log('fetching campaign...');
      dispatch(fetchSingleCampaign(campaignId));
    }
  },[dispatch])

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
    <div className="pageContent">
      <TabbedHeader data={campaignHeaderInfo} toggleTab={toggleTab} activeTab={activeTab}>
        { campaign.name }
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
    </div>
  );
}

export default CampaignDetailsPage;
