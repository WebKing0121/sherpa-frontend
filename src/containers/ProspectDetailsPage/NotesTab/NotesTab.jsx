import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button } from "reactstrap";
import moment from "moment-timezone";

import { noteList } from "../../../store/ProspectNotes/selectors";
import { getUserData } from "../../../store/Auth/selectors";
import {
  populateNotes,
  notesRequest,
  deleteNote,
  addNote,
  updateNote,
  fetchNotes
} from "../../../store/ProspectNotes/actions";

import Note from "./Note";
import NoteModal from "./NoteModal";
import NoteForm from "./NoteForm";

const Heading = styled.div`
  padding: var(--pad5) var(--pad3) var(--pad3);
  display: flex;
  justify-content: space-between;
`;

const List = styled.ul`
  padding: 0 var(--pad3) 0;
  & li:nth-last-child(1) {
    .grayBar:before {
      height: unset;
    }
  }
`;

//update date format used in each note
moment.updateLocale("en", {
  longDateFormat: { LT: "h:mma" }
});

function NotesTab() {
  // state for the new note modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");

  const userData = useSelector(getUserData);
  const dispatch = useDispatch();

  const handleNewNote = () => {
    const note = {
      createdDateLocal: new Date().toISOString(),
      text: newNoteText,
      createdByName: userData.username,
      prospect: 3,
      createdBy: userData.id
    };
    const fetchConfig = {
      method: "post",
      url: `/prospect-notes/`,
      data: note
    };
    dispatch(notesRequest(fetchConfig, addNote));
    setIsAddModalOpen(false);
    setNewNoteText("");
  };

  const handleUpdateNote = (note, text) => {
    if (note.text === text) return;
    const updatedNote = { ...note, text };
    const fetchConfig = {
      method: "patch",
      url: `/prospect-notes/${note.id}/`,
      data: updatedNote
    };
    dispatch(notesRequest(fetchConfig, updateNote));
  };

  const handleDeleteNote = id => {
    const fetchConfig = {
      method: "delete",
      url: `/prospect-notes/${id}/`
    };
    dispatch(notesRequest(fetchConfig, deleteNote, id));
  };

  useEffect(() => {
    // populate notes list
    const fetchConfig = {
      method: "get",
      url: "/prospect-notes?prospect=3"
    };
    dispatch(notesRequest(fetchConfig, populateNotes));
  }, [dispatch]);

  const notes = useSelector(noteList);

  const mapNotes = () =>
    notes.map(note => (
      <Note
        key={note.id}
        note={note}
        deleteNote={() => handleDeleteNote(note.id)}
        updateNote={handleUpdateNote}
      />
    ));

  // notes are memoized to prevent rerenders when modal states change
  const memoizedNotes = useMemo(mapNotes, [notes]);

  return (
    <>
      <Heading>
        <h3>Notes</h3>
        <Button color="primary" onClick={() => setIsAddModalOpen(true)}>
          Add Note
        </Button>
      </Heading>
      <NoteModal toggle={() => setIsAddModalOpen(false)} isOpen={isAddModalOpen} title="Add new note">
        <NoteForm submitNote={handleNewNote} text={newNoteText} setText={setNewNoteText} />
      </NoteModal>
      <List>{memoizedNotes}</List>
    </>
  );
}

export default NotesTab;
