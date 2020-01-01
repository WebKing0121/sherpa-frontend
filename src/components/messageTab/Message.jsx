import React from 'react';
import styled from 'styled-components';

const StyledMessage = styled.div`
  background: ${props => (props.fromProspect ? 'white' : 'var(--sherpaBlue)')};
  border-radius: 0.8rem;
  border-bottom-right-radius: ${props => (!props.fromProspect ? 0 : '.8rem')};
  border-bottom-left-radius: ${props => (props.fromProspect ? 0 : '.8rem')};
  padding: var(--pad2) var(--pad4);
  color: ${props => (props.fromProspect ? 'black' : 'white')};
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: var(--pad1);
`;

const TimeStamp = styled.div`
  display: flex;
  justify-content: ${props => (props.fromProspect ? 'flex-start' : 'flex-end')};
  margin-bottom: var(--pad4);
  color: var(--darkGray);
  font-size: 0.75rem;
`;

function Message(props) {
  const { message, dt, fromProspect } = props;
  return (
    <>
      <StyledMessage fromProspect={fromProspect}>{message}</StyledMessage>
      <TimeStamp fromProspect={fromProspect}>
        <span>{dt}</span>
      </TimeStamp>
    </>
  );
}

export default Message;
