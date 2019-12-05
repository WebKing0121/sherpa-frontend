import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import styled from 'styled-components';
import Icon from '../../../components/Icon';
import SelectTemplate from './SelectTemplate';
import ReviewSend from './ReviewSend';

const Pane = styled.div`
  overflow: hidden;
`;

const ToggleHeader = styled.h3`
  padding: var(--pad4) var(--pad3);
  background: var(--ghostBlue);
  color: var(--darkNavy);
  margin: 0;
  display: flex;
  justify-content: space-between;
`;

const Arrow = styled.div`
  img {
    transition: transform .3s;
    transform: ${props => props.isOpen ? "rotate(-90deg)" : "rotate(90deg)"};;
  }
`;

const SendTab = (props) => {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const toggle1 = () => setIsOpen1(!isOpen1);
  const toggle2 = () => setIsOpen2(!isOpen2);

  return (
    <>
      <Pane>
        <ToggleHeader className="fw-bold" onClick={toggle1}>
          Select SMS Template
          <Arrow isOpen={isOpen1}><Icon name="arrow" width="10px"/></Arrow>
        </ToggleHeader>
        <Collapse isOpen={isOpen1}>
          <SelectTemplate/>
        </Collapse>
      </Pane>

      <Pane>
        <ToggleHeader className="fw-bold" onClick={toggle2}>
          Review & Send
          <Arrow isOpen={isOpen2}><Icon name="arrow" width="10px"/></Arrow>
        </ToggleHeader>
        <Collapse isOpen={isOpen2}>
          <ReviewSend/>
        </Collapse>
      </Pane>
    </>
  );
}

export default SendTab;
