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
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    background-color: var(--red);
  }
`;

const Holster = styled.div`
  flex-basis: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 3px;
  margin-right: var(--pad2);
`;

export const StyledIcon = styled(Icon)`
  flex-basis: 50%;
`;

function IconHolster(props) {
  const { icon, readable, isRead } = props;
  if (!icon && !readable) {
    return (<></>);
  }

  return (
    <Holster className="iconHolster">
      {icon && icon}
      {readable && !isRead && <UnreadIndicator />}
    </Holster>
  );
}

export default IconHolster;
