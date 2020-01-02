import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import moment from 'moment-timezone';
import usePrevious from '../../hooks/usePrevious';
import { getUserData } from '../../store/Auth/selectors';

import Modal from '../Modal';
import Note from './Note';
import NoteForm from './NoteForm';
import { DataLoader } from '../LoadingData';
import {
  messageNewNote,
  messageUpdateNote,
  messageDeleteNote,
  Success,
  Fetching
} from '../../variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Heading = styled.div`
  padding: var(--pad5) var(--pad3) var(--pad3);
  display: flex;
  justify-content: space-between;
`;

const List = styled.ul`
  padding: 0 var(--pad3) 0;
  overflow: hidden;
`;

//update date format used in each note
moment.updateLocale('en', {
  longDateFormat: { LT: 'h:mma' }
});

function NotesTab(props) {
  const {
    updateNotes,
    fetchNotes,
    subject,
    subjectId,
    notesList,
    notesStatus,
    addNote,
    editNote,
    deleteNote,
    restoreNote
  } = props;
  const [modal, setModal] = useState(false);
  // for animation
  const [noteIn, setNoteIn] = useState(false);

  const toggle = () => setModal(state => !state);

  const [newNoteText, setNewNoteText] = useState('');
  const userData = useSelector(getUserData);
  const notes_status = useSelector(notesStatus);
  const dispatch = useDispatch();

  const prevList = usePrevious(notesList) || notesList;

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
    dispatch(updateNotes(fetchConfig, messageNewNote, addNote)).then(() => {
      setModal(false);
      setNewNoteText('');
    });
  };

  const handleEditNote = (note, text) => {
    const updatedNote = { ...note, text };
    const fetchConfig = {
      method: 'patch',
      url: `/${note.id}/`,
      data: updatedNote
    };
    dispatch(editNote(updatedNote));
    dispatch(updateNotes(fetchConfig, messageUpdateNote, null, editNote(note)));
  };

  const handledeleteNote = note => {
    const fetchConfig = {
      method: 'delete',
      url: `/${note.id}/`
    };
    const noteIdx = notesList.findIndex(item => note.id === item.id);
    dispatch(deleteNote(note));
    dispatch(updateNotes(fetchConfig, messageDeleteNote, null, restoreNote(note, noteIdx)));
  };

  useEffect(() => {
    // populate notes list
    dispatch(fetchNotes(subjectId));
  }, [dispatch, subjectId, fetchNotes, subject]);

  useEffect(() => {
    let diff = notesList.length - prevList.length;
    if (diff > 0) {
      setNoteIn(true);
    } else if (diff < 0) {
      setNoteIn(false);
    } else {
    }
  }, [notesList.length]);

  const mapNotes = () =>
    notesList.map((note, idx) => {
      let anim = false;
      if (idx === 0 && noteIn) {
        anim = true;
      }
      return (
        <Note
          id={note.id}
          key={note.id}
          note={note}
          deleteNote={handledeleteNote}
          updateNote={handleEditNote}
          anim={anim}
        />
    )
    });

  // notes are memoized to prevent rerenders when modal states change
  const memoizedNotes = useMemo(mapNotes, [notesList]);

  const getBtnText = () => {
    let icon = notes_status !== Success ? 'exclamation-triangle' : 'check';
    return !modal ? <FontAwesomeIcon icon={icon} /> : 'Submit Note';
  };

  return (
    <>
      <Heading>
        <h3>Notes</h3>
        <Button color='primary' onClick={toggle} data-test='add-note-btn'>
          Add Note
        </Button>
      </Heading>
      <Modal isOpen={modal} toggle={notes_status !== Fetching ? toggle : () => null} title='Add a Note'>
        <NoteForm
          submitNote={handleNewNote}
          text={newNoteText}
          setText={setNewNoteText}
          btnText={getBtnText()}
          notesStatus={notes_status}
        />
      </Modal>
      <DataLoader
        status={notes_status}
        data={notesList}
        emptyResultsMessage='Currently there are no notes to display.'
        renderData={() => <List>{memoizedNotes}</List>}
      />
    </>
  );
}

export default NotesTab;
