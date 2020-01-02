import React from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

const StyledListItem = styled.li`
  list-style: none;
  margin: 0;
`;

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
  white-space: pre;
`;

function Message(props) {
  const { message, dt, fromProspect } = props;

  const getFormattedDateTime = dt => {
    const zone = moment.tz.guess();
    const date = moment.tz(dt, zone).format('L');
    const time = moment.tz(dt, zone).format('LT');
    return [date, time];
  };

  const dateTime = getFormattedDateTime(dt);

  const checkWhenDate = date => {
    const today = getFormattedDateTime(moment().d)[0];
    const yesterday = getFormattedDateTime(moment().subtract(1, 'day'))[0];
    return date === today ? 'Today' : date === yesterday ? 'Yesterday' : date;
  };

  return (
    <StyledListItem className='message'>
      <StyledMessage fromProspect={fromProspect}>{message}</StyledMessage>
      <TimeStamp fromProspect={fromProspect}>
        <span>{`${checkWhenDate(dateTime[0])}  |  ${dateTime[1]}`}</span>
      </TimeStamp>
    </StyledListItem>
  );
}

export default Message;
