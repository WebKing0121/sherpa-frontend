import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon.jsx';

const Action = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  flex-basis: ${props => props.size + "vw"};
  flex-grow: 0;
  flex-shrink: 0;

  background-color: ${props => "var(--" + props.bg + ")"};
  color: ${props => props.bg === "white" ? "var(--gray)" : "var(--white)"};

  img {
    max-width: 40%;
  }

  @media (max-width: 500px) {
    flex-basis: ${props => props.wrapList ? "calc(" + (100 - props.size) + "vw / 3)" : ""};
  }

`;

const ActionLink = styled.a`
  &:hover,
  &:active {
    &:after{
      background: var(--darkNavy);
      opacity: .3;
    }
  }
`;

function SwipeMenuAction(props) {

  return (
    <Action size={props.size} wrapList={props.wrapList} className="textS fw-black action" bg={props.background} onClick={props.onClick}>
      <Icon margin="mb-2" height="26px" width="auto" name={"action-" + props.icon}/>
      <ActionLink className="stretched-link">{props.name}</ActionLink>
    </Action>
  );
}

export default SwipeMenuAction;