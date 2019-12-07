import React from 'react';
import styled from 'styled-components';

const EventInfo = styled.h4`
  position: relative;
  padding: 2px 0;
  background: var(--coolGray);
  margin-bottom: var(--pad4);

  .text {
    text-align: center;
    width: auto;
    position: relative;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
  }

  &:before {
    content: '';
    position: absolute;
    width: 25vw;
    height: 1px;
    top: 50%;
    left: 0;
    background: var(--mediumGray);
    transform: translate(-80%,-50%);
  }

  &:after {
    content: '';
    position: absolute;
    width: 25vw;
    height: 1px;
    top: 50%;
    right: 0;
    background: var(--mediumGray);
    transform: translate(80%,-50%);
  }
`;

const StyledMessage = styled.div`
  background: ${props =>
    props.source === "in" ? "var(--sherpaBlue)" : "white"};
  border-radius: .8rem;
  border-bottom-right-radius: ${props =>
    props.source === "in" ? 0 : ".8rem"};
  border-bottom-left-radius: ${props =>
    props.source === "out" ? 0 : ".8rem"};
  padding: var(--pad2) var(--pad4);
  color: ${props =>
    props.source === "in" ? "white" : "black"};
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: var(--pad1);
`;

const Bg = styled.div`
  background: var(--coolGray);
  padding: var(--pad4) var(--pad3);
  height: 100%;
  overflow: hidden;
`;

const TimeStamp = styled.div`
  display: flex;
  justify-content: ${props =>
    props.source === "in" ? "flex-end" : "flex-start"};
  margin-bottom: var(--pad4);
  color: var(--darkGray);
  font-size: .75rem;
`;

function Message(props) {

  return (
    <>
      <StyledMessage source={props.source}>
        {props.children}
      </StyledMessage>
      <TimeStamp source={props.source}>
        <span>{props.timestamp}</span>
      </TimeStamp>
    </>
  );
}

function Event(props) {

  return (
    <EventInfo className="textM">
      <span className="text">Zack Russle Verified Owner Today at 1:16pm</span>
    </EventInfo>
  );
}

function MessagesTab(props) {

  return (
    <Bg>
      <Message source="in" timestamp="Today | 1:12 pm">
        Absolutely! I am with a real estate investment company called Big House Buyers. I use a service that allows me to match public property records with owners and their contact info.
      </Message>
      <Event/>
      <Message source="out" timestamp="Today | 1:13 pm">
        Great. I checked out your website and you look legit. What’s your offer?
      </Message>
      <Message source="in" timestamp="Today | 1:12 pm">
        Absolutely!
      </Message>
      <Event/>
      <Event/>
      <Message source="out" timestamp="Today | 1:13 pm">
        Great. I checked out your website and you look legit. What’s your offer?
        Buyers. I use a service that allows me to match public property records with owners and their contact info.
        Buyers. I use a service that allows me to match public property records with owners and their contact info.
      </Message>
    </Bg>
  );
}

export default MessagesTab;
