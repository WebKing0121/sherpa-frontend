import React, { useState } from 'react';
import { TabContent, TabPane } from 'reactstrap';
import CampaignsListTab from './CampaignsListTab/CampaignsListTab';
import NotesTab from '../../components/NotesTab/NotesTab';
import * as noteActions from '../../store/CampaignDetails/notes/actions';
import { campaignNotesList, campaignNotesStatus } from '../../store/CampaignDetails/notes/selectors';
import { desktopCampaignHeaderInfo } from '../../helpers/variables';

import TabbedHeader from '../../components/TabbedHeader';

const DesktopCampaignsPage = props => {
  const [activeTab, setActiveTab] = useState('1');
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
      <TabbedHeader data={desktopCampaignHeaderInfo} toggleTab={toggleTab} activeTab={activeTab}>Campaigns</TabbedHeader>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <CampaignsListTab />
        </TabPane>
        <TabPane tabId='2'>
        </TabPane>
        <TabPane tabId='3'>
          <NotesTab {...notesProps} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default DesktopCampaignsPage;
