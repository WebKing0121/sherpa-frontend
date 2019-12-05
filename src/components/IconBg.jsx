import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Circle = styled.div`
  background: ${props => props.color ? "var(--" + props.color + ")" : "var(--blueHighlight)"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
`;

const IconBg = (props) => {

  return (
    <Circle>
      <FontAwesomeIcon {...props}/>
    </Circle>
  );
}

export default IconBg;
