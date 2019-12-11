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

import Modal from "../../../components/Modal";
import Note from "./Note";
import NoteForm from "./NoteForm";

const Heading = styled.div`
  padding: var(--pad5) var(--pad3) var(--pad3);
  display: flex;
  justify-content: space-between;
`;

// function NotesTab(props) {

//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);

//   const value = "Just start stanford well the bar for deviations would be higher than ever like if a marker adds $100K revenue then deviate if not no deviate my new goal for Jim is to maximize revenue per marker :slightly_smiling_face: ok scott is there a new card(s) for dialog marker stuff? for just stanford for now git is evil (web application firewall) yes anything that goes through cloudfront WAF sits in front of it blocks bot attacks just start stanford well the bar for deviations would be higher than ever like if a marker adds $100K revenue then deviate if not no deviate my new goal for Jim is to maximize revenue per marker :slightly_smiling_face: ok scott is there a new card(s) for dialog marker stuff? for just stanford for now git is evil (web application firewall) yes anything that goes through cloudfront WAF sits in front of it blocks bot attacks";
const List = styled.ul`
  padding: 0 var(--pad3) 0;
`;

//update date format used in each note
moment.updateLocale("en", {
  longDateFormat: { LT: "h:mma" }
});

function NotesTab() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(state => !state);
  const [newNoteText, setNewNoteText] = useState("");

  const userData = useSelector(getUserData);
  const dispatch = useDispatch();

  const handleNewNote = () => {
    const note = {
      createdDateLocal: new Date().toISOString(),
      text: newNoteText,
      prospect: 3,
      createdBy: userData.id
    };
    const fetchConfig = {
      method: "post",
      url: `/prospect-notes/`,
      data: note
    };
    dispatch(notesRequest(fetchConfig, addNote));
    setModal(false);
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
        <Button color="primary" onClick={toggle}>
          Add Note
        </Button>
      </Heading>
      <Modal isOpen={modal} toggle={toggle} heading="Add A Note">
        <NoteForm
          submitNote={handleNewNote}
          text={newNoteText}
          setText={setNewNoteText}
          btnText="Submit Note"
        />
      </Modal>
      <List>{memoizedNotes}</List>
    </>
  );
}

export default NotesTab;
