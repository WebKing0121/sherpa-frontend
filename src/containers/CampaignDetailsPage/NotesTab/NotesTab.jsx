import React from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import NotesList from './NotesList';

const Heading = styled.div`
  padding: var(--pad5) var(--pad3) var(--pad3);
  display: flex;
  justify-content: space-between;
`;

function NotesTab(props) {
  return (
    <>
      <Heading>
        <h3>Notes</h3>
        <Button color="primary">Add Note</Button>
      </Heading>

      <NotesList/>
    </>
  );
}

export default NotesTab;
