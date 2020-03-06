import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover, PopoverBody } from 'reactstrap';

const KebabWrap = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--pad1);
  transition: background-color .2s, color .2s;
  z-index: 2;
  margin-left: var(--pad1);

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

  const popover = (
    <Popover
      placement="bottom"
      isOpen={isOpen}
      offset={-35}
      target={"kebab" + props.idx}
      toggle={toggle}>
      <Body>
        {props.children}
      </Body>
    </Popover>
  );

  return (
    <KebabWrap
      data-test={`kebab-${props.idx}`}
      id={"kebab" + props.idx}
      onClick={toggle}
      tabindex="0"
      role="button">
      <FontAwesomeIcon icon="ellipsis-v" size={props.size || "2x"} />
      {popover}
    </KebabWrap>
  );
};

export default DesktopKebab;
