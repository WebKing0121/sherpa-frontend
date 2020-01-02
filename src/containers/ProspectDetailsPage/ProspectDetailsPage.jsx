import React, { useState, useEffect, useRef } from 'react';
import TabbedHeader from '../../components/TabbedHeader';
import DetailsTab from './DetailsTab/DetailsTab';
import NotesTab from '../../components/NotesTab/NotesTab';
import { TabContent, TabPane } from 'reactstrap';
import styled from 'styled-components';
import { fetchProspect } from '../../store/ProspectDetails/details/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  prospectDetailsData,
  prospectDetailsStatus
} from '../../store/ProspectDetails/details/selectors';
import { DataLoader } from '../../components/LoadingData';
import * as noteActions from '../../store/ProspectDetails/notes/actions';
import { prospectNotesStatus, prospectNotesList } from '../../store/ProspectDetails/notes/selectors';
import { prospectHeaderInfo } from '../../variables';
import MessagesTab from '../../components/messageTab/MessageTab';

const StyledTabContent = styled(TabContent)``;

function ProspectDetailsPage(props) {
  const [activeTab, setActiveTab] = useState('2');
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
    fetchNotes: noteActions.fetchProspectNotes,
    updateNotes: noteActions.updateProspectNotes,
    subject: 'prospect',
    subjectId: prospectId,
    notesList,
    notesStatus: prospectNotesStatus,
    addNote: noteActions.addProspectNote,
    editNote: noteActions.editProspectNote,
    deleteNote: noteActions.deleteProspectNote,
    restoreNote: noteActions.restoreProspectNote
  };

  const headerRef = useRef();

  return (
    <DataLoader
      data={prospect.id ? [prospect] : []}
      status={isFetching}
      fullPage={true}
      emptyResultsMessage={'Could not find the prospect'}
      renderData={() => (
        <>
          <div ref={headerRef}>
            <TabbedHeader toggleTab={toggleTab} activeTab={activeTab} data={prospectHeaderInfo}>
              {prospect.name}
            </TabbedHeader>
          </div>
          <StyledTabContent activeTab={activeTab}>
            <TabPane tabId='1'>
              <DetailsTab />
            </TabPane>
            <TabPane tabId='2'>
              <MessagesTab
                marginTop={headerRef.current && headerRef.current.clientHeight}
                subjectId={prospectId}
              />
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
