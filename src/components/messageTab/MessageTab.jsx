import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Message from './Message';
import MessageInput from './MessageInput';
import { fetchMessages, sendMessage } from './utils';
import { pollingInterval } from '../../variables';

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
  const [messages, setMessages] = useState([]);
  const { subjectId } = props;

  const mappedMessages = () => messages.map(msg => <Message key={msg.date} {...msg} />);

  const fetchMessagesCallback = useCallback(() => {
    fetchMessages(subjectId).then(setMessages);
  }, [subjectId, setMessages]);

  const addNewMessage = message => {
    sendMessage(subjectId, { message }).then(fetchMessagesCallback);
  };

  useEffect(() => {
    fetchMessagesCallback();
    let interval = setInterval(fetchMessagesCallback, pollingInterval);
    return () => clearInterval(interval);
  }, [fetchMessagesCallback]);

  return (
    <>
      <Bg>{mappedMessages()}</Bg>
      <MessageInput addNewMessage={addNewMessage} />
    </>
  );
}

export default MessagesTab;
