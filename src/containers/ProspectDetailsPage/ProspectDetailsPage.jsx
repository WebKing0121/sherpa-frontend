import React, { useState, useEffect } from 'react';
import TabbedHeader from '../../components/TabbedHeader';
import MessagesTab from './MessagesTab/MessagesTab';
import DetailsTab from './DetailsTab/DetailsTab';
import NotesTab from '../../components/NotesTab/NotesTab';
import { TabContent, TabPane } from 'reactstrap';
import styled from 'styled-components';
import { fetchProspect } from '../../store/ProspectDetails/actions';
import { useDispatch, useSelector } from 'react-redux';
import { prospectDetailsData, prospectDetailsStatus } from '../../store/ProspectDetails/selectors';
import { DataLoader } from '../../components/LoadingData';
import {
  fetchProspectNotes,
  updateProspectNotes,
  editProspectNote,
  deleteProspectNote,
  addProspectNote,
  restoreProspectNote
} from '../../store/ProspectNotes/actions';
import { prospectNotesStatus, prospectNotesList } from '../../store/ProspectNotes/selectors';
import { prospectHeaderInfo } from '../../variables';

const StyledTabContent = styled(TabContent)``;

function ProspectDetailsPage(props) {
  const [activeTab, setActiveTab] = useState('1');
  const prospect = useSelector(prospectDetailsData);
  const isFetching = useSelector(prospectDetailsStatus);
  const dispatch = useDispatch();
  const prospectId = props.match.params.id;

  // fetch the prospect
  useEffect(() => {
    dispatch(fetchProspect(prospectId));
  }, [dispatch, prospectId]);

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const notesList = useSelector(prospectNotesList);

  const notesProps = {
    fetchNotes: fetchProspectNotes,
    updateNotes: updateProspectNotes,
    subject: 'prospect',
    subjectId: prospectId,
    notesList,
    notesStatus: prospectNotesStatus,
    addNote: addProspectNote,
    editNote: editProspectNote,
    deleteNote: deleteProspectNote,
    restoreNote: restoreProspectNote
  };

  return (
    <DataLoader
      data={prospect.id ? [prospect] : []}
      status={isFetching}
      fullPage={true}
      emptyResultsMessage={'Could not find the prospect'}
      renderData={() => (
        <>
          <TabbedHeader toggleTab={toggleTab} activeTab={activeTab} data={prospectHeaderInfo}>
            {prospect.name}
          </TabbedHeader>
          <StyledTabContent activeTab={activeTab}>
            <TabPane tabId='1'>
              <DetailsTab />
            </TabPane>
            <TabPane tabId='2'>
              <MessagesTab />
            </TabPane>
            <TabPane tabId='3'>
              <NotesTab {...notesProps} />
            </TabPane>
          </StyledTabContent>
        </>
      )}
    />
  );
}

export default ProspectDetailsPage;
