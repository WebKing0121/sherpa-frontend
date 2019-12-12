import React, { useState } from 'react';
import {
  Button,
  Collapse,
  CustomInput,
  FormGroup,
  Label
} from 'reactstrap';
import Modal from './Modal';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Pane = styled.div`
  overflow: hidden;
  &:first-child {
    padding-bottom: var(--pad3);
    border-bottom: 1px solid var(--mediumGray);
  }
  &:last-child {
    padding-top: var(--pad3);
  }

  .content {
    padding-top: var(--pad2);
  }
`;

const Checkbox = styled(CustomInput)`
  font-size: 1.25rem;
  line-height: 1.2;
  margin-bottom: .6em;
  font-weight: bold;

  &[disabled] {
    color: var(--mediumGray);
  }
`;

const ToggleHeader = styled.h3`
  padding: 0;
  color: var(--darkNavy);
  margin: 0;
  display: flex;
  justify-content: space-between;
`;

const Arrow = styled.div`
  color: var(--sherpaBlue);
  svg {
    transition: transform .3s;
  }
`;

function SearchModule(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const toggle1 = () => setIsOpen1(!isOpen1);
  const toggle2 = () => setIsOpen2(!isOpen2);

  return (
    <>
    <Button className="p-0" color="link" onClick={toggle}>
      <FontAwesomeIcon icon="filter" size="lg"/>
    </Button>

    <Modal
      isOpen={modal}
      toggle={toggle}
      title="Filters"
      btnText="Apply Filters">
      <Pane>
        <ToggleHeader className="fw-black textL" onClick={toggle1}>
          <Label for="ownedBy">Owned By</Label>
          <Arrow isOpen={isOpen1}>
            <FontAwesomeIcon icon="chevron-up" rotation={isOpen1 ? null : 180}
          />
          </Arrow>
        </ToggleHeader>
        <Collapse isOpen={isOpen1}>
          <div className="content">
            <FormGroup>
              <Checkbox type="checkbox" label="Zack Russel" id="ownedBy1"/>
              <Checkbox type="checkbox" label="Adam Smith" id="ownedBy2"/>
              <Checkbox type="checkbox" label="Jason Nickle" id="ownedBy3"/>
            </FormGroup>
          </div>
        </Collapse>
      </Pane>

      <Pane>
        <ToggleHeader className="fw-black textL" onClick={toggle2}>
          <Label for="tags">Review & Send</Label>
          <Arrow isOpen={isOpen2}>
            <FontAwesomeIcon icon="chevron-up" rotation={isOpen2 ? null : 180}
          />
          </Arrow>
        </ToggleHeader>
        <Collapse isOpen={isOpen2}>
          <div className="content">
          <FormGroup>
            <Checkbox type="checkbox" label="Follow-Up" id="tags1"/>
            <Checkbox type="checkbox" label="Initial Send" id="tags2"/>
            <Checkbox type="checkbox" label="Probate" id="tags3"/>
          </FormGroup>
          </div>
        </Collapse>
      </Pane>

    </Modal>
    </>
  );
}

export default SearchModule;
