import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import InputGroupBorder from '../../../components/InputGroupBorder';
import styled from 'styled-components';
import Modal from '../../../components/Modal';
import NotesList from './NotesList';

const Heading = styled.div`
  padding: var(--pad5) var(--pad3) var(--pad3);
  display: flex;
  justify-content: space-between;
`;

function NotesTab(props) {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const value = "Just start stanford well the bar for deviations would be higher than ever like if a marker adds $100K revenue then deviate if not no deviate my new goal for Jim is to maximize revenue per marker :slightly_smiling_face: ok scott is there a new card(s) for dialog marker stuff? for just stanford for now git is evil (web application firewall) yes anything that goes through cloudfront WAF sits in front of it blocks bot attacks just start stanford well the bar for deviations would be higher than ever like if a marker adds $100K revenue then deviate if not no deviate my new goal for Jim is to maximize revenue per marker :slightly_smiling_face: ok scott is there a new card(s) for dialog marker stuff? for just stanford for now git is evil (web application firewall) yes anything that goes through cloudfront WAF sits in front of it blocks bot attacks";

  return (
    <>
      <Heading>
        <h3>Notes</h3>
        <Button color="primary" onClick={toggle}>Add Note</Button>
      </Heading>

      <Modal
        isOpen={modal}
        toggle={toggle}
        heading="Add A Note"
        btnText="Submit Note">
        <InputGroupBorder border="full">
          <Input style={{maxHeight: "50vh"}} type="textarea" placeholder="Enter Your Note..." value={value} rows="12"/>
        </InputGroupBorder>
      </Modal>

      <NotesList/>
    </>
  );
}

export default NotesTab;
