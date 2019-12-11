import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Circle = styled.div`
  background: ${props =>
    props.color ? "var(--" + props.color + ")" : "var(--blueHighlight)"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width || "44px"};;
  height: ${props => props.height || "44px"};;
  color: ${props =>
    props.textcol ? "var(--" + props.textcol + ")" : ""};

  svg {
    margin: ${props => props.nudge || 0};
  }
`;

const IconBg = (props) => {

  return (
    <Circle {...props}>
      <FontAwesomeIcon {...props}/>
    </Circle>
  );
}

export default IconBg;
