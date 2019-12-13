import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import moment from 'moment-timezone';

import { getUserData } from '../../store/Auth/selectors';

import Modal from '../Modal';
import Note from './Note';
import NoteForm from './NoteForm';
import { addNewToast } from '../../store/Toasts/actions';
import { DataLoader } from '../LoadingData';
import { setProspectNotesStatus } from '../../store/ProspectNotes/actions';
import { Fetching } from '../../variables';

const Heading = styled.div`
  padding: var(--pad5) var(--pad3) var(--pad3);
  display: flex;
  justify-content: space-between;
`;

const List = styled.ul`
  padding: 0 var(--pad3) 0;
`;

//update date format used in each note
moment.updateLocale('en', {
  longDateFormat: { LT: 'h:mma' }
});

function NotesTab(props) {
  const { updateNotes, fetchNotes, subject, subjectId, notesList, notesStatus } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(state => !state);
  const [newNoteText, setNewNoteText] = useState('');

  const userData = useSelector(getUserData);
  const isFetching = useSelector(notesStatus);
  const dispatch = useDispatch();

  const handleNewNote = () => {
    const note = {
      text: newNoteText,
      [subject]: subjectId,
      createdBy: userData.id
    };
    const fetchConfig = {
      method: 'post',
      url: '/',
      data: note
    };
    dispatch(updateNotes(fetchConfig, subjectId));
    setModal(false);
    setNewNoteText('');
    dispatch(addNewToast({ title: '', message: 'New note added!' }));
  };

  const handleupdateNote = (note, text) => {
    if (note.text === text) return;
    const { createdBy, ...rest } = note;
    const updatedNote = { ...rest, text };
    const fetchConfig = {
      method: 'patch',
      url: `/${note.id}/`,
      data: updatedNote
    };
    dispatch(updateNotes(fetchConfig, subjectId));
  };

  const handledeleteNote = id => {
    const fetchConfig = {
      method: 'delete',
      url: `/${id}/`
    };
    dispatch(updateNotes(fetchConfig, subjectId));
  };

  useEffect(() => {
    // populate notes list
    dispatch(fetchNotes(subjectId));
  }, [dispatch, subjectId, fetchNotes, subject]);

  const mapNotes = () =>
    notesList.map(note => (
      <Note
        key={note.id}
        note={note}
        deleteNote={() => handledeleteNote(note.id)}
        updateNote={handleupdateNote}
      />
    ));

  // notes are memoized to prevent rerenders when modal states change
  const memoizedNotes = useMemo(mapNotes, [notesList]);

  return (
    <>
      <Heading>
        <h3>Notes</h3>
        <Button color='primary' onClick={toggle}>
          Add Note
        </Button>
      </Heading>
      <Modal isOpen={modal} toggle={toggle} title='Add a Note'>
        <NoteForm
          submitNote={handleNewNote}
          text={newNoteText}
          setText={setNewNoteText}
          btnText='Submit Note'
        />
      </Modal>
      <DataLoader
        status={isFetching}
        data={notesList}
        emptyResultsMessage='Currently there are no notes to display.'
        unload={() => dispatch(setProspectNotesStatus(Fetching))}
        renderData={() => <List>{memoizedNotes}</List>}
      />
    </>
  );
}

export default NotesTab;
