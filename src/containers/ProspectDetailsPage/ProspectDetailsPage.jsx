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
import { setActiveProspect, clearProspectCyclePath } from '../../store/uiStore/prospectDetailsView/actions';
import { useParams } from 'react-router-dom';
import * as selectors from '../../store/uiStore/prospectDetailsPageView/selectors';
import * as actions from '../../store/uiStore/prospectDetailsPageView/actions';
import { getProspectsToCycle } from '../../store/uiStore/prospectDetailsView/selectors';
import { Link } from 'react-router-dom';
import { prospectMessagesList } from '../../store/ProspectDetails/messages/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getQuickReplies } from '../../store/SmsTemplateStore/selectors';
import { fetchQuickReplies } from '../../store/SmsTemplateStore/actions';
import Modal from '../../components/Modal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const CycleBtnHoltser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    font-weight: 900;
    font-size: 1.1rem;
    margin-bottom: .6rem;
    display: inline-block;
  }
`;

const StyledTabContent = styled(TabContent)`
  overflow-y: scroll;
  flex-basis: 100%;
  background: ${props =>
    props.activeTab === '2' ? 'var(--ghostBlue)' : 'white'};
`;

const renderTabbedHeaderContent = (prospects, id, content) => {
  const prevIcon = <FontAwesomeIcon className="mr-1" icon="chevron-circle-left" size="sm" />;
  const nextIcon = <FontAwesomeIcon className="ml-1" icon="chevron-circle-right" size="sm" />;

  return (
    <>
      <CycleBtnHoltser>
        <span>
          {
            id > 0 ? (
              <Link
                data-test="prospect-cycle-left"
                style={{ color: "white", frontSize: "40px" }}
                to={`/prospect/${prospects[id - 1]}/details`}
              >
                {prevIcon} Prev
              </Link>
            ) : null
          }
        </span>
        <span>
          {
            id + 1 < prospects.length ? (

              <Link
                data-test="prospect-cycle-right"
                style={{ color: "white", frontSize: "40px" }}
                to={`/prospect/${prospects[id + 1]}/details`}
              >
                Next {nextIcon}
              </Link>
            ) : null
          }
        </span>
      </CycleBtnHoltser>

      <h1 className='text-white text-left m-0'>{content}</h1>
    </>
  );
};

function ProspectDetailsPage() {
  // hooks
  const { prospectId } = useParams();
  const dispatch = useDispatch();

  // selectors
  const activeTab = useSelector(selectors.activeTab);
  const prospect = useSelector(getProspect(prospectId));
  const isFetching = useSelector(prospectIsLoading);
  const prospectsToCycle = useSelector(getProspectsToCycle);
  const messages = useSelector(prospectMessagesList(prospectId));
  const [curIdx, setCurIdx] = useState(0);

  console.log("MESSAGES 2",messages);

  useEffect(() => {
    if (prospectsToCycle.length > 0 && prospect.id) {
      const idx = prospectsToCycle.findIndex(p => p === prospect.id);
      setCurIdx(idx);
    }
  }, [prospectsToCycle, prospect]);

  // fetch the prospect
  useEffect(() => {
    dispatch(setActiveProspect(parseInt(prospectId)));
    // if prospect not found in the store then lets fetch it
    if (!prospect.id) {
      dispatch(prospectFetchSingle(prospectId));
    }
  }, [prospect.id, dispatch, prospectId]);

  useEffect(() => () => {
    dispatch(clearProspectCyclePath());
    dispatch(actions.resetProspectActiveTab());
  }, [dispatch]);

  const toggleTab = tab => {
    if (activeTab !== tab) dispatch(actions.setProspectActiveTab(tab));
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
                {renderTabbedHeaderContent(prospectsToCycle, curIdx, prospect.name)}
              </TabbedHeader>
            </div>
            <StyledTabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <DetailsTab />
              </TabPane>
              <TabPane tabId='2'>
                <MessagesTab
                  marginTop={headerRef.current && headerRef.current.clientHeight}
                  subjectId={parseInt(prospectId)}
                  scrollToBot={activeTab === '2'}
                  messages={messages}
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
