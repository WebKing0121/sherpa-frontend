import React from 'react';
import { } from 'reactstrap';
import styled from 'styled-components';
import Icon from '../Icon.jsx';

const UnreadIndicator = styled.div`
  width: 100%;
  flex-basis: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:after {
    content: '';
    width: 10px;
    height: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    background-color: var(--red);
  }
`;

const Holster = styled.div`
  flex-basis: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 3px;
  margin-right: var(--pad2);
`;

const StyledIcon = styled(Icon)`
  flex-basis: 50%;
`;

function IconHolster() {
  return (
    <Holster className="iconHolster">
      <StyledIcon width="25px" name='campaigns'/>
      <UnreadIndicator/>
    </Holster>
  );
}

export default IconHolster;
