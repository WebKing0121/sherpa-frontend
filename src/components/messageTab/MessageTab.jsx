import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Message from './Message';
import MessageInput from './MessageInput';
import { fetchMessages, sendMessage } from './utils';
import * as vars from '../../variables';
import { DataLoader } from '../LoadingData';

const StyledList = styled.ul`
  background: var(--coolGray);
  padding: var(--pad3) var(--pad3) 0;
  /* number comes from claculated height of message input */
  padding-bottom: 5.6875rem;
  width: 100%;
  position: relative;
  bottom: 0;
  z-index: -1;
  display: flex;
  flex-direction: column-reverse;
  margin: 0;
`;

const Placeholder = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-top: 50%;
`;

const InputWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

function MessagesTab(props) {
  const [messages, setMessages] = useState([]);
  const [messagesStatus, setMessagesStatus] = useState(vars.Fetching);

  const mappedMessages = () => {
    if (messages.length) return [...messages].reverse().map(msg => <Message key={msg.dt} {...msg} />);
    return <Placeholder>{vars.messagesPlaceholderText}</Placeholder>;
  };

  const messagesRef = useRef();
  const inputRef = useRef();

  const tabContent = document.getElementsByClassName("tab-content");
  tabContent.scrollTop = messagesRef.scrollHeight;

  const fetchMessagesCB = useCallback(() => {
    fetchMessages(props.subjectId).then(res => {
      setMessages(res || []);
      setMessagesStatus(res ? vars.Success : vars.FetchError);
    });
  }, [props.subjectId, setMessages]);

  const scrollToNewMessageCB = useCallback(() => {
    const { current } = messagesRef;
    if (current) {
      tabContent[0].scrollTo({
        top: current.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [messagesRef]);

  const addNewMessage = message => {
    return sendMessage(props.subjectId, { message }).then(fetchMessagesCB);
  };

  // retrieves all messages and sets an interval for periodic retrieval
  useEffect(() => {
    fetchMessagesCB();
    let interval = setInterval(fetchMessagesCB, vars.pollingInterval);
    return () => clearInterval(interval);
  }, [fetchMessagesCB]);

  // scrolls to new message after added
  useEffect(() => {
    scrollToNewMessageCB();
  }, [messages.length, scrollToNewMessageCB]);

  // scrolls bot on tab active
  useEffect(() => {
    const { current } = messagesRef;
    if (current) {
      tabContent[0].scrollTop = current.scrollHeight;
    }
  }, [props.scrollToBot, tabContent]);

  return (
    <div data-test='messages-tab'>
      <DataLoader
        status={messagesStatus}
        data={(messages.length && messages) || [vars.messagesPlaceholderText]}
        emptyResultsMessage=''
        renderData={() => (
          <StyledList ref={messagesRef}>
            {mappedMessages()}
          </StyledList>
        )}
      />
      <InputWrapper ref={inputRef}>
        <MessageInput messagesStatus={props.messagesStatus} addNewMessage={addNewMessage} />
      </InputWrapper>
    </div>
  );
}

export default MessagesTab;
