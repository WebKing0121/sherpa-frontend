import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components';

const Heading = styled(ModalHeader)`
  background: var(--tealBlueGradient);
  color: white;
  padding-left: var(--pad3) !important;
  padding-right: var(--pad3) !important;
  font-weight: 700 !important;

  .close {
    color: white;
    opacity: 1;
    font-weight: 900;
    font-size: 2rem;
  }
`;

const Body = styled(ModalBody)`
  padding: var(--pad3) var(--pad3) !important;
`;

const ModalWrap = styled.div`

`;

function Shmodal(props) {

  return (
    <ModalWrap>
      <Modal isOpen={props.isOpen}>
        <Heading tag="h3" toggle={props.toggle}>{props.heading}</Heading>
        <Body>
          {props.children}
        </Body>
        <ModalFooter>
          <Button color="primary" block size="lg" onClick={props.toggle}>{props.btnText}</Button>
        </ModalFooter>
      </Modal>
    </ModalWrap>
  );
}

export default Shmodal;
