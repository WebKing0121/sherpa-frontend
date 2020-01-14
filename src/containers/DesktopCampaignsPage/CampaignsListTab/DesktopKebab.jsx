import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Popover, PopoverBody } from 'reactstrap';

const KebabWrap = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 calc(.5 * var(--pad1));
  transition: background-color .2s, color .2s;

  &:hover,
  &:focus {
    background: var(--ghostBlue);
    cursor: pointer;
  }
  &:active {
    color: var(--sherpaBlue) !important;
  }
`;

const Body = styled(PopoverBody)`
  padding: var(--pad1) var(--pad1) !important;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;

  button {
    color: var(--darkNavy);
  }
`;

const DesktopKebab = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const modal =(
    <Popover placement="bottom" isOpen={isOpen} offset={-35} target={"kebab" + props.idx} toggle={toggle}>
      <Body>
        <Button color="link">Export</Button>
        <Button color="link">Rename</Button>
        <Button color="link">Archive</Button>
      </Body>
    </Popover>
  );

  return (
    <KebabWrap id={"kebab" + props.idx} onClick={toggle}>
      <FontAwesomeIcon icon="ellipsis-v" size="2x"/>
      {modal}
    </KebabWrap>
  );
};

export default DesktopKebab;
