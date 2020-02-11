import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TabContent, TabPane } from 'reactstrap';
import { desktopCampaignDetailHeaderInfo } from '../../helpers/variables';
import SendTab from './CampaignSendTab/CampaignSendTab';
import TabbedHeader from '../../components/TabbedHeader';
import NotesTab from '../../components/NotesTab/NotesTab';
import * as noteActions from '../../store/CampaignDetails/notes/actions';
import { campaignNotesList, campaignNotesStatus } from '../../store/CampaignDetails/notes/selectors';

const DesktopCampaignDetailPage = props => {
  const [activeTab, setActiveTab] = useState('2');
  const campaignId = 1;

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
    <div className="pageContent d-flex flex-column">
      <TabbedHeader data={desktopCampaignDetailHeaderInfo} toggleTab={toggleTab} activeTab={activeTab}><h1 className='text-white text-left m-0'>Greeley/Fort Collins - 2019-05-08</h1></TabbedHeader>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
        </TabPane>
        <TabPane tabId='2'>
          <SendTab />
        </TabPane>
        <TabPane tabId='3'>
        </TabPane>
        <TabPane tabId='4'>
          <NotesTab {...notesProps} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default DesktopCampaignDetailPage;
