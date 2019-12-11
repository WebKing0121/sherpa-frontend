import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

function NoteModal(props) {
  const { children, title, isOpen, toggle } = props;
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered={true}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
}

export default NoteModal;
