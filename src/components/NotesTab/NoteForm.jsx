import React, { useEffect } from 'react';
import { Form, Input, Button } from 'reactstrap';
import InputGroupBorder from '../InputGroupBorder';
import { LoadingSpinner } from '../LoadingSpinner';
import { Fetching } from '../../variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NoteForm(props) {
  const { text, setText, submitNote, note, btnText, notesStatus } = props;
  const onSubmit = e => {
    e.preventDefault();
    if (!text) return;
    submitNote(note);
  };
  return (
    <Form onSubmit={onSubmit}>
      <InputGroupBorder border='full'>
        <Input
          style={{ maxHeight: '50vh' }}
          type='textarea'
          placeholder='Enter Your Note...'
          value={text}
          rows='12'
          onChange={e => setText(e.target.value)}
        />
      </InputGroupBorder>
      <Button style={{ marginTop: '15px' }} color='primary' block size='lg' data-test='note-form-btn'>
        <LoadingSpinner
          isLoading={notesStatus === Fetching ? true : false}
          color='light'
          renderContent={() => <>{btnText}</>}
        />
      </Button>
    </Form>
  );
}

export default NoteForm;
