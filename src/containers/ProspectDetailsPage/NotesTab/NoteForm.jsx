import React from "react";
import { Form, Input, Button } from "reactstrap";
import InputGroupBorder from "../../../components/InputGroupBorder";

function NoteForm(props) {
  const { text, setText, submitNote, note, btnText } = props;

  const onSubmit = e => {
    e.preventDefault();
    if (!text) return;
    submitNote(note);
  };
  return (
    <Form onSubmit={onSubmit}>
      <InputGroupBorder full>
        <Input
          style={{ maxHeight: "50vh" }}
          type="textarea"
          placeholder="Enter Your Note..."
          value={text}
          rows="12"
          onChange={e => setText(e.target.value)}
        />
      </InputGroupBorder>
      <Button style={{ marginTop: "15px" }} color="primary" block size="lg">
        {btnText}
      </Button>
    </Form>
  );
}

export default NoteForm;
