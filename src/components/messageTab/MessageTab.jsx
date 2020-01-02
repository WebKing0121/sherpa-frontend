import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Message from './Message';
import MessageInput from './MessageInput';
import { fetchMessages, sendMessage } from './utils';
import { pollingInterval, Success, FetchError, Fetching, emptyMessagesMessage } from '../../variables';
import { DataLoader } from '../LoadingData';

const Bg = styled.div`
  background: var(--coolGray);
  padding: 0 var(--pad3);
  padding-bottom: ${props => props.marginBottom}px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: absolute;
  bottom: 0;
  z-index: -1;
  display: flex;
  flex-direction: column-reverse;
  .message:last-child {
    padding-top: ${props => `calc(60px + 5vw + 1rem + ${props.marginTop || 0}px)`};
  }
`;

const InputWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const initialMargins = {
  marginTop: 0,
  marginBottom: 0
};

function MessagesTab(props) {
  const [messages, setMessages] = useState([]);
  const [messagesStatus, setMessagesStatus] = useState(Fetching);
  const [margins, setMargins] = useState(initialMargins);

  const mappedMessages = [...messages].reverse().map(msg => <Message key={msg.dt} {...msg} />);

  const messagesRef = useRef();
  const inputRef = useRef();

  const fetchMessagesCB = useCallback(() => {
    fetchMessages(props.subjectId).then(res => {
      setMessages(res || []);
      setMessagesStatus(res ? Success : FetchError);
    });
  }, [props.subjectId, setMessages]);

  const scrollToNewMessageCB = useCallback(() => {
    const { current } = messagesRef;
    current &&
      current.scrollTo({
        top: current.scrollHeight - current.clientHeight - 10 || 0,
        left: 0,
        behavior: 'smooth'
      });
  }, [messagesRef]);

  const addNewMessage = message => {
    sendMessage(props.subjectId, { message }).then(fetchMessagesCB);
  };

  // retrieves all messages and sets an interval for periodic retrieval
  useEffect(() => {
    fetchMessagesCB();
    let interval = setInterval(fetchMessagesCB, pollingInterval);
    return () => clearInterval(interval);
  }, [fetchMessagesCB, scrollToNewMessageCB]);

  // scrolls to new message after added
  useEffect(() => {
    scrollToNewMessageCB();
  }, [messages.length, scrollToNewMessageCB]);

  // updates state with correct element sizes for message margins
  useEffect(() => {
    const marginBottom = inputRef.current.clientHeight || 0;
    setMargins({ marginTop: props.marginTop || 0, marginBottom });
  }, [props.marginTop]);

  return (
    <>
      <DataLoader
        status={messagesStatus}
        data={messages}
        emptyResultsMessage={emptyMessagesMessage}
        renderData={() => (
          <Bg {...margins} ref={messagesRef}>
            {mappedMessages}
          </Bg>
        )}
      />
      <InputWrapper ref={inputRef}>
        <MessageInput addNewMessage={addNewMessage} />
      </InputWrapper>
    </>
  );
}

export default MessagesTab;
