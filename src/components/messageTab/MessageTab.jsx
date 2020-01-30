import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Message from './Message';
import MessageInput from './MessageInput';
import { fetchMessages, sendMessage, patchMessage, markAllMessagesAsRead } from './utils';
import * as vars from '../../helpers/variables';
import { DataLoader } from '../LoadingData';
import { addNewToast } from '../../store/Toasts/actions';
import { useDispatch } from 'react-redux';

const StyledList = styled.ul`
  padding: var(--pad3) var(--pad3) 0;
  /* number comes from claculated height of message input */
  padding-bottom: 5.6875rem;
  width: 100%;
  position: relative;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: column-reverse;
  margin: 0;
`;

const Placeholder = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--darkGray);
  padding: var(--pad3);
  line-height: 1.3 !important;
`;

const InputWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 2;
`;

function MessagesTab(props) {
  const [messages, setMessages] = useState([]);
  const [messagesStatus, setMessagesStatus] = useState(vars.Fetching);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setHasUnreadMessages(messages.some(message => message.unreadByRecipient));
  }, [messages]);

  const updateMessages = (idx, value) => {
    const updatedMessages = [...messages];
    updatedMessages[idx].unreadByRecipient = value;
    setMessages(updatedMessages);
  };

  const updateMessage = (id) => () => {
    const messageIdx = messages.findIndex(m => m.id === id);

    if (messageIdx) {
      // optimistic update
      updateMessages(messageIdx, false);
      patchMessage(id)
        .catch(error => {
          updateMessages(messageIdx, true);
          dispatch(addNewToast({ message: vars.generalNetworkError, color: 'danger' }));
        });
    }
  };

  const mappedMessages = () => {
    if (messages.length) return [...messages].reverse().map(msg => <Message key={msg.dt} {...msg} onClick={msg.unreadByRecipient ? updateMessage(msg.id) : null} />);
    return <Placeholder className="textXL">{vars.messagesPlaceholderText}</Placeholder>;
  };

  const messagesRef = useRef();
  const inputRef = useRef();

  const tabContent = document.getElementsByClassName("tab-content");
  tabContent.scrollTop = messagesRef.scrollHeight;

  const fetchMessagesCB = useCallback(() => {
    fetchMessages(props.subjectId)
      .then(res => {
        setMessages(res || []);
        setMessagesStatus(res ? vars.Success : vars.FetchError);
      })
      .catch(error => {
        console.log('some errors');
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
    return sendMessage(props.subjectId, { message })
      .then(args => {
        if (hasUnreadMessages) {
          markAllMessagesAsRead(props.subjectId)
            .then(() => fetchMessagesCB(args));
        } else {
          fetchMessagesCB(args);
        }
      });
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
          <StyledList noMsg={messages.length === "0"} ref={messagesRef}>
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
