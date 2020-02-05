import React, { useState, useEffect } from 'react';
import { Input, InputGroupAddon, Button } from 'reactstrap';
import InputGroupBorder from '../InputGroupBorder';
import IconBg from '../IconBg';
import Modal from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getQuickReplies } from '../../store/SmsTemplateStore/selectors';
import { fetchQuickReplies } from '../../store/SmsTemplateStore/actions';
import { quickRepliesPlaceholderText, Success, Fetching } from '../../helpers/variables';
import { DataLoader } from '../LoadingData';

const SendMessage = styled.form`
  padding: var(--pad2) var(--pad3);
  width: 100%;
  background: white;
`;

function MessageInput(props) {
  const { addNewMessage } = props;
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState('');
  const [isFetchingMessages, setIsFetchingMessages] = useState(false);
  // quick replies use the data loader component, which using a string instead of a boolean
  const [isFetchingQuickReplies, setIsFetchingQuickReplies] = useState(Success);

  const dispatch = useDispatch();
  const quickReplies = useSelector(getQuickReplies);

  const toggle = () => setModal(state => !state);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (input === '') return;
    setIsFetchingMessages(true);
    addNewMessage(input).then(() => setIsFetchingMessages(false));
    setInput('');
  };

  const handleClickQuickReply = (reply) => {
    setInput(reply.message);
    setModal(false);
  };

  // two-part use effect:
  // 1) set fetching status to start spinner and dispatch thunk to fetch quick replies
  // 2) set fetching status to stop spinner after new quick replies are returned;
  useEffect(() => {
    if (!quickReplies.length) {
      setIsFetchingQuickReplies(Fetching);
      dispatch(fetchQuickReplies());
    }
  }, []);

  useEffect(() => {
    setIsFetchingQuickReplies(Success);
  }, [quickReplies]);

  const mapQuickReplies = () => {
    return <DataLoader
      status={isFetchingQuickReplies}
      data={(quickReplies.length && quickReplies)}
      emptyResultsMessage={quickRepliesPlaceholderText}
      renderData={() => (
        <ul style={style.ul} data-test='quick-replies'>{
          quickReplies.map(reply => (
            <li
              style={style.li}
              key={reply.id}
              onClick={() => handleClickQuickReply(reply)}
            >
              {reply.question}
            </li>
          ))
        }</ul>
      )}
    />;
  };

  return (
    <SendMessage onSubmit={handleSubmit}>
      <InputGroupBorder className='mb-2'>
        <InputGroupAddon addonType='prepend'>
          <Button
            data-test='quick-reply-btn'
            className='p-0'
            type='button'
            color='link'
            onClick={() => setModal(true)}
          >
            <FontAwesomeIcon icon='layer-group' color='gray' size='2x' className='mr-3' />
          </Button>
        </InputGroupAddon>
        <Input
          type='text'
          name='sendMessage'
          id='sendMessage'
          placeholder='Your Message'
          data-test='message-input'
          value={input}
          onChange={handleChange}
        />
        <InputGroupAddon addonType='append'>
          <Button type='submit' name='submit' className='p-0' color='link' disabled={!input}>
            <IconBg
              icon='paper-plane'
              color='sherpaBlue'
              textcol='white'
              nudge='0 0 0 -4px'
              loader={{
                isLoading: isFetchingMessages,
                color: 'white'
              }}
            />
          </Button>
        </InputGroupAddon>
      </InputGroupBorder>
      <Modal
        isOpen={modal}
        toggle={toggle}
        title='Select Quick Reply'
      >
        {mapQuickReplies()}
      </Modal>

    </SendMessage>
  );
}

export default MessageInput;


const style = {
  ul: {
    padding: '0'
  },
  li: {
    listStyle: 'none',
    fontWeight: 'bold',
    margin: '10px'
  },
  p: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '20px'
  }
};
