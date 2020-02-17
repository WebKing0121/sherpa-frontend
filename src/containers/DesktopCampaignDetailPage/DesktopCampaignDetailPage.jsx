import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TabContent, TabPane } from 'reactstrap';
import { desktopCampaignDetailHeaderInfo } from '../../helpers/variables';
import SendTab from './CampaignSendTab/CampaignSendTab';
import TabbedHeader from '../../components/TabbedHeader';
import NotesTab from '../../components/NotesTab/NotesTab';
import * as noteActions from '../../store/CampaignDetails/notes/actions';
import { campaignNotesList, campaignNotesStatus } from '../../store/CampaignDetails/notes/selectors';
import { useParams } from 'react-router-dom';
import { getCampaign } from '../../store/Campaigns/selectors';
import { fetchSingleCampaign } from '../../store/Campaigns/thunks';

const DesktopCampaignDetailPage = props => {
  const [activeTab, setActiveTab] = useState('2');
  const { id } = useParams();
  const campaign = useSelector(getCampaign(id));
  const dispatch = useDispatch();

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    // when there is no campaign
    if (!campaign.id) {
      dispatch(fetchSingleCampaign(id));
    }
  }, [campaign]);

  const notesList = useSelector(campaignNotesList);

  const notesProps = {
    fetchNotes: noteActions.fetchCampaignNotes,
    updateNotes: noteActions.updateCampaignNotes,
    subject: 'campaign',
    subjectId: id,
    notesList,
    notesStatus: campaignNotesStatus,
    addNote: noteActions.addCampaignNote,
    editNote: noteActions.editCampaignNote,
    deleteNote: noteActions.deleteCampaignNote,
    restoreNote: noteActions.restoreCampaignNote
  };

  return (
    <div className="pageContent d-flex flex-column">
      <TabbedHeader
        data={desktopCampaignDetailHeaderInfo}
        toggleTab={toggleTab}
        activeTab={activeTab}
      >
        {campaign.name}
      </TabbedHeader>
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
