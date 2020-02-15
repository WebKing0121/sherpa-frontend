import React from 'react';
import IconBg from '../../../components/IconBg';
import styled from 'styled-components';
import { Button } from 'reactstrap';

const ButtonsHolster = styled.div`
  display: flex;
  margin: 0 14px 0 6px;
`;

const Action = styled(IconBg)`
  background-color: ${props =>
    props.active ? "var(--" + props.color + ")" : "white"};
  color: ${props =>
    props.active ? "white" : "var(--gray)"};
  border: 1px solid;
  border-color: ${props =>
    props.active ? "var(--" + props.color + ")" : "var(--gray)"};
  margin-left: 8px;
  svg {
    border: none;
  }
`;

const ActionBtn = (props) => {
  let btnSize = "1.5rem";
  let fasize = "xs";

  return (
    <Action
      width={btnSize}
      size={fasize}
      height={btnSize}
      icon={props.icon}
      color={props.color}
      active={props.active}/>
  )
}

const StatusWrapper = (props) => {

  const leadClass = props.leadStage === "Dead" ? "gray" : null;

  return (
    <>
      <span className={leadClass}>{ props.leadStage }</span>
      <ButtonsHolster>
        <ActionBtn icon="check" color="green" active={true}/>
        <ActionBtn icon="phone-slash" color="red"/>
        <ActionBtn icon="bolt" color="orange" active={true}/>
        <ActionBtn icon="star" color="purple"/>
      </ButtonsHolster>
      <span className="gray">{ props.time }</span>
    </>
  );
}
export default StatusWrapper;
