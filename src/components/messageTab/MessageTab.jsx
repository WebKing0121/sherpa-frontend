import React, { useEffect } from 'react';
import styled from 'styled-components';
import Message from './Message';
import MessageInput from './MessageInput';
import { useSelector, useDispatch } from 'react-redux';
import { prospectMessagesList } from '../../store/ProspectDetails/messages/selectors';
import { fetchProspectMessages } from '../../store/ProspectDetails/messages/actions';

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
    transform: translate(-80%, -50%);
  }

  &:after {
    content: '';
    position: absolute;
    width: 25vw;
    height: 1px;
    top: 50%;
    right: 0;
    background: var(--mediumGray);
    transform: translate(80%, -50%);
  }
`;

const Bg = styled.div`
  background: var(--coolGray);
  padding: var(--pad4) var(--pad3);
  height: 100%;
  overflow: hidden;
`;

function Event(props) {
  return (
    <EventInfo className='textM'>
      <span className='text'>Zack Russle Verified Owner Today at 1:16pm</span>
    </EventInfo>
  );
}

function MessagesTab(props) {
  const { subjectId } = props;
  const dispatch = useDispatch();

  const prospectMessages = useSelector(prospectMessagesList);
  const mappedMessages = () => prospectMessages.map(msg => <Message key={msg.date} {...msg} />);

  useEffect(() => {
    dispatch(fetchProspectMessages(subjectId));
  }, []);

  useEffect(() => {}, [prospectMessages]);

  return (
    <>
      <Bg>
        {/* <Message source='in' timestamp='Today | 1:12 pm'>
        Absolutely! I am with a real estate investment company called Big House Buyers. I use a service
        that allows me to match public property records with owners and their contact info.
      </Message> */}
        {mappedMessages()}
      </Bg>
      <MessageInput />
    </>
  );
}

export default MessagesTab;
