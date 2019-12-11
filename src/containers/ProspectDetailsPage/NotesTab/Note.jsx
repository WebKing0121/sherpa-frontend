import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "reactstrap";
import moment from "moment-timezone";
import NoteModal from "./NoteModal";
import NoteForm from "./NoteForm";

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
  const { createdDate, text, createdByName } = note;

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleUpdateNote = () => {
    updateNote(note, editText);
    setIsEditing(false);
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
        <h4 className="textL fw-bold">{createdByName}</h4>
        <p className="textL">{text}</p>
        <ButtonBlock>
          <Button size="lg" color="link" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button size="lg" color="link" onClick={deleteNote}>
            Delete
          </Button>
        </ButtonBlock>
      </div>
      <NoteModal toggle={() => setIsEditing(false)} isOpen={isEditing} title="Edit Note">
        <NoteForm submitNote={handleUpdateNote} text={editText} setText={setEditText} note={note} />
      </NoteModal>
    </NoteCard>
  );
}

export default Note;
