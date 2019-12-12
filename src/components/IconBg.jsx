import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Circle = styled.div`
  background: ${props => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width || "44px"};;
  height: ${props => props.height || "44px"};;
  color: ${props => props.textcol};

  svg {
    margin: ${props => props.nudge || 0};
  }
`;

const IconBg = (props) => {
  let color;
  let textcol;

  if (props.format !== "hex" || !props.format){
    if (props.color) {
      color = "var(--" + props.color + ")";
      textcol = "var(--" + props.textcol + ")";
    } else {
      color = "var(--blueHighlight)";
      textcol = "";
    }
  } else if (props.format === "hex") {
    // add opacity to bg col
    color = props.textcol + "30";
    textcol = props.textcol;
  }

  return (
    <Circle {...props} color={color} textcol={textcol} >
      <FontAwesomeIcon {...props}/>
    </Circle>
  );
}

export default IconBg;
