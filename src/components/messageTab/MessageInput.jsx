import React, { useState, useEffect } from 'react';
import { Input, InputGroupAddon, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
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
import { useParams } from 'react-router-dom';
import * as vars from '../../helpers/variables';

const QuickReplies = styled.ul`
  padding: 0;

  li {
    list-style: none;
    font-weight: bold;
    padding: var(--pad1) var(--pad3);

    &:active {
      background: var(--lightGray);
    }
  }
`;

const SendMessage = styled.form`
  padding: var(--pad2) var(--pad3);
  width: 100%;
  background: white;
`;

const PopBody = styled(PopoverBody)`
  padding: var(--pad1) var(--pad1) !important;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;

  button {
    color: var(--darkNavy);
  }
`;

const QuickReplyDesktop = styled(Popover)`
  --xpad: var(--pad3);
  --ypad: var(--pad2);
  --xypad: var(--ypad) var(--xpad);

  .popover {
    max-width: 400px;
  }

  .popover-header {
    background-image: var(--tealBlueGradient);
    color: var(--white);
    display: flex;
    justify-content: space-between;
    padding: var(--xypad);
  }
  .popover-inner {
    max-height: 400px;
    overflow-y: scroll;
  }
  .popover-body {
    padding: 0 !important;
  }

  .arrow {
    left: 2rem !important;
  }
`;

function MessageInput(props) {
  const { addNewMessage } = props;
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < vars.maxMobileWidth);
  const [isFetchingMessages, setIsFetchingMessages] = useState(false);
  // quick replies use the data loader component, which using a string instead of a boolean
  const [isFetchingQuickReplies, setIsFetchingQuickReplies] = useState(Success);

  const { prospectId } = useParams();
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
    addNewMessage(input)
      .then(() => setIsFetchingMessages(false))
      .catch(() => setIsFetchingMessages(false));

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
      dispatch(fetchQuickReplies(prospectId));
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
        <QuickReplies data-test='quick-replies'>{
          quickReplies.map(reply => (
            <li
              className="textM"
              key={reply.id}
              onClick={() => handleClickQuickReply(reply)}
            >
              {reply.question}
            </li>
          ))
        }</QuickReplies>
      )}
    />;
  };

  const quickReplyDesktop =(
    <QuickReplyDesktop placement="bottom" isOpen={modal} toggle={toggle} target="quick-reply">
      <PopoverHeader className="textXL">
        Select Quick Reply
        <FontAwesomeIcon icon="times" onClick={toggle}/>
      </PopoverHeader>
      <PopBody>
        {mapQuickReplies()}
      </PopBody>
    </QuickReplyDesktop>
  );

  const quickReplyMobile =(
    <Modal
      isOpen={modal}
      toggle={toggle}
      title='Select Quick Reply'
    >
      {mapQuickReplies()}
    </Modal>
  );

  return (
    <SendMessage onSubmit={handleSubmit}>
      <InputGroupBorder className='mb-2'>
        <InputGroupAddon addonType='prepend'>
          <Button
            data-test='quick-reply-btn'
            className='p-0'
            type='button'
            color='link'
            id="quick-reply"
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
          spellCheck={true}
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
      { isMobile ? quickReplyMobile : quickReplyDesktop }

    </SendMessage>
  );
}

export default MessageInput;
