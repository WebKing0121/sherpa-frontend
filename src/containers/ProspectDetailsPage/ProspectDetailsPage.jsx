import React, { useState, useEffect, useRef } from 'react';
import TabbedHeader from '../../components/TabbedHeader';
import DetailsTab from './DetailsTab/DetailsTab';
import NotesTab from '../../components/NotesTab/NotesTab';
import { TabContent, TabPane } from 'reactstrap';
import styled from 'styled-components';
import { prospectFetchSingle } from '../../store/prospectStore/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { DataLoader } from '../../components/LoadingData';
import * as noteActions from '../../store/ProspectDetails/notes/actions';
import { prospectNotesStatus, prospectNotesList } from '../../store/ProspectDetails/notes/selectors';
import { prospectHeaderInfo } from '../../helpers/variables';
import MessagesTab from '../../components/messageTab/MessageTab';
import { prospectIsLoading, getProspect } from '../../store/prospectStore/selectors';
import { setActiveProspect, setActiveCampaign } from '../../store/uiStore/prospectDetailsView/actions';
import { useParams } from 'react-router-dom';
import * as selectors from '../../store/uiStore/prospectDetailsPageView/selectors';
import * as actions from '../../store/uiStore/prospectDetailsPageView/actions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const StyledTabContent = styled(TabContent)`
  overflow-y: scroll;
  flex-basis: 100%;
  background: ${props =>
    props.activeTab === '2' ? 'var(--ghostBlue)' : 'white'};
`;

function ProspectDetailsPage() {
  const activeTab = useSelector(selectors.activeTab);
  const { prospectId } = useParams();
  const prospect = useSelector(getProspect(prospectId));
  const isFetching = useSelector(prospectIsLoading);
  const dispatch = useDispatch();

  // fetch the prospect
  useEffect(() => {
    dispatch(setActiveProspect(parseInt(prospectId)));
    // if prospect not found in the store then lets fetch it
    if (!prospect.id) {
      dispatch(prospectFetchSingle(prospectId));
    }
  }, [prospect.id, dispatch, prospectId]);

  useEffect(() => () => dispatch(actions.resetActiveTab()), [dispatch]);

  useEffect(() => {
    if (prospect && prospect.campaigns.length === 1)
      dispatch(setActiveCampaign(prospect.campaigns[0].id));
  }, [prospect.campaigns]);

  const toggleTab = tab => {
    if (activeTab !== tab) dispatch(actions.setActiveTab(tab));
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
    <div className='pageContent'>
      <DataLoader
        data={prospect.id ? [prospect] : []}
        status={isFetching ? 'Fetching' : 'Success'}
        fullPage={true}
        emptyResultsMessage={'Could not find the prospect'}
        renderData={() => (
          <Wrapper>
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
                  scrollToBot={activeTab === '2'}
                />
              </TabPane>
              <TabPane tabId='3'>
                <NotesTab {...notesProps} />
              </TabPane>
            </StyledTabContent>
          </Wrapper>
        )}
      />
    </div>
  );
}

export default ProspectDetailsPage;
