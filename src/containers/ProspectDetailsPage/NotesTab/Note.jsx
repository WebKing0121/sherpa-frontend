import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "reactstrap";
import moment from "moment-timezone";
import NoteForm from "./NoteForm";
import Modal from "../../../components/Modal";

const ButtonBlock = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  position: relative;

  button:first-child {
    margin-right: var(--pad5);

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      right: calc(-1 * var(--pad5) / 2);
      transform: translate(50%, -50%);
      background: var(--mediumGray);
      width: 5px;
      height: 5px;
    }
  }

  button {
    padding: 0;
    position: relative;
  }
`;

const NoteCard = styled.li`
  display: flex;
  text-align: left;
  list-style: none;

  margin-bottom: var(--pad6);

  p {
    line-height: 1.4;
  }
`;

const Timeline = styled.div`
  margin-top: 2px;

  display: flex;
  align-items: center;
  flex-direction: column;

  flex-basis: var(--pad5);
  flex-shrink: 0;

  position: relative;

  .greenCircle {
    width: 18px;
    height: 18px;
    background: var(--green);
    border-radius: 50%;
    z-index: 1;
  }

  .grayBar {
    width: 3px;
    background: var(--mediumGray);
    height: 100%;
    position: absolute;

    &:before {
      content: "";
      width: 100%;
      height: 100%;
      top: var(--pad7);
      left: 0;
      background: inherit;
      position: absolute;
    }
  }
`;

function Note(props) {
  const { note, deleteNote, updateNote } = props;
  const { createdDate, text, createdBy } = note;

  const [modal, setModal] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleUpdateNote = () => {
    console.log(note);
    updateNote(note, editText);
    setModal(false);
  };

  const getFormattedDateTime = () => {
    const zone = moment.tz.guess();
    const date = moment.tz(createdDate, zone).format("L");
    const time = moment.tz(createdDate, zone).format("LT");
    return [date, time];
  };

  const dateTime = getFormattedDateTime();

  return (
    <NoteCard>
      <Timeline>
        <div className="greenCircle"></div>
        <div className="grayBar"></div>
      </Timeline>
      <div>
        <pre className="textL gray">{`${dateTime[0]}  |  ${dateTime[1]}`}</pre>
        <h4 className="textL fw-bold">Created By ID: {createdBy}</h4>
        <p className="textL">{text}</p>
        <ButtonBlock>
          <Button size="lg" color="link" onClick={() => setModal(true)}>
            Edit
          </Button>
          <Button size="lg" color="link" onClick={deleteNote}>
            Delete
          </Button>
        </ButtonBlock>
      </div>
      <Modal toggle={() => setModal(false)} isOpen={modal} title="Edit Note">
        <NoteForm
          submitNote={handleUpdateNote}
          text={editText}
          setText={setEditText}
          note={note}
          btnText="Update Note"
        />
      </Modal>
    </NoteCard>
  );
}

export default Note;
