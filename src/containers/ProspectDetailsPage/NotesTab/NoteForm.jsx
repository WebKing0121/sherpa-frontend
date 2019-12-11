import React from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";

function NoteForm(props) {
  const { text, setText, submitNote, note } = props;

  const onSubmit = e => {
    e.preventDefault();
    if (!text) return;
    submitNote(note);
  };
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Input type="textarea" name="text" id="exampleText" placeholder="Enter your note" value={text} onChange={e => setText(e.target.value)} />
        <Button>submit</Button>
      </FormGroup>
    </Form>
  );
}

export default NoteForm;
