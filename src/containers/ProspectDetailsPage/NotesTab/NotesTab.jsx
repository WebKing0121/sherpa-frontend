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

<<<<<<< HEAD
import Note from "./Note";
import NoteModal from "./NoteModal";
=======
import Modal from "../../../components/Modal";
import Note from "./Note";
>>>>>>> 4fdd91569f154bd7eac60e6c806ea4be2def502b
import NoteForm from "./NoteForm";

const Heading = styled.div`
  padding: var(--pad5) var(--pad3) var(--pad3);
  display: flex;
  justify-content: space-between;
`;

<<<<<<< HEAD
const List = styled.ul`
  padding: 0 var(--pad3) 0;
  & li:nth-last-child(1) {
    .grayBar:before {
      height: unset;
    }
  }
=======
// function NotesTab(props) {

//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);

//   const value = "Just start stanford well the bar for deviations would be higher than ever like if a marker adds $100K revenue then deviate if not no deviate my new goal for Jim is to maximize revenue per marker :slightly_smiling_face: ok scott is there a new card(s) for dialog marker stuff? for just stanford for now git is evil (web application firewall) yes anything that goes through cloudfront WAF sits in front of it blocks bot attacks just start stanford well the bar for deviations would be higher than ever like if a marker adds $100K revenue then deviate if not no deviate my new goal for Jim is to maximize revenue per marker :slightly_smiling_face: ok scott is there a new card(s) for dialog marker stuff? for just stanford for now git is evil (web application firewall) yes anything that goes through cloudfront WAF sits in front of it blocks bot attacks";
const List = styled.ul`
  padding: 0 var(--pad3) 0;
>>>>>>> 4fdd91569f154bd7eac60e6c806ea4be2def502b
`;

//update date format used in each note
moment.updateLocale("en", {
  longDateFormat: { LT: "h:mma" }
});

function NotesTab() {
<<<<<<< HEAD
  // state for the new note modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
=======
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(state => !state);
>>>>>>> 4fdd91569f154bd7eac60e6c806ea4be2def502b
  const [newNoteText, setNewNoteText] = useState("");

  const userData = useSelector(getUserData);
  const dispatch = useDispatch();

  const handleNewNote = () => {
    const note = {
      createdDateLocal: new Date().toISOString(),
      text: newNoteText,
<<<<<<< HEAD
      createdByName: userData.username,
=======
>>>>>>> 4fdd91569f154bd7eac60e6c806ea4be2def502b
      prospect: 3,
      createdBy: userData.id
    };
    const fetchConfig = {
      method: "post",
      url: `/prospect-notes/`,
      data: note
    };
    dispatch(notesRequest(fetchConfig, addNote));
<<<<<<< HEAD
    setIsAddModalOpen(false);
=======
    setModal(false);
>>>>>>> 4fdd91569f154bd7eac60e6c806ea4be2def502b
    setNewNoteText("");
  };

  const handleUpdateNote = (note, text) => {
<<<<<<< HEAD
=======
    console.log(note);
>>>>>>> 4fdd91569f154bd7eac60e6c806ea4be2def502b
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
<<<<<<< HEAD

=======
>>>>>>> 4fdd91569f154bd7eac60e6c806ea4be2def502b
  return (
    <>
      <Heading>
        <h3>Notes</h3>
<<<<<<< HEAD
        <Button color="primary" onClick={() => setIsAddModalOpen(true)}>
          Add Note
        </Button>
      </Heading>
      <NoteModal toggle={() => setIsAddModalOpen(false)} isOpen={isAddModalOpen} title="Add new note">
        <NoteForm submitNote={handleNewNote} text={newNoteText} setText={setNewNoteText} />
      </NoteModal>
=======
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
>>>>>>> 4fdd91569f154bd7eac60e6c806ea4be2def502b
      <List>{memoizedNotes}</List>
    </>
  );
}

export default NotesTab;
