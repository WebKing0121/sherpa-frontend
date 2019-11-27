import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon.jsx';
import { Link } from 'react-router-dom';

const Action = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  flex-basis: 20vw;
  flex-shrink: 0;

  background-color: ${props => "var(--" + props.bg + ")"};
  color: ${props => props.bg === "white" ? "var(--gray)" : "var(--white)"};
`;

function SwipeMenuAction(props) {

  return (
    <Action className="textS fw-black" bg={props.background}>
      <Icon margin="mb-2" height="26px" width="auto" name={"action-" + props.icon}/>
      {props.name}
    </Action>
  );
}

export default SwipeMenuAction;
