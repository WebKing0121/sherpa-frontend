import React, { useState } from 'react';
import { Input, InputGroupAddon, Button } from 'reactstrap';
import InputGroupBorder from '../InputGroupBorder';
import IconBg from '../IconBg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { LoadingSpinner } from '../LoadingSpinner';

const SendMessage = styled.form`
  padding: var(--pad2) var(--pad3);
  width: 100%;
  background: white;
`;

function MessageInput(props) {
  const { addNewMessage } = props;
  const [input, setInput] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (input === '') return;
    setIsFetching(true);
    addNewMessage(input).then(() => setIsFetching(false));
    setInput('');
  };

  return (
    <SendMessage onSubmit={handleSubmit}>
      <InputGroupBorder className='mb-2'>
        <InputGroupAddon addonType='prepend'>
          <Button className='p-0' type='button' color='link'>
            <FontAwesomeIcon icon='layer-group' color='gray' size='2x' className='mr-3' />
          </Button>
        </InputGroupAddon>
        <Input
          type='text'
          name='sendMessage'
          id='sendMessage'
          placeholder='Your Message'
          value={input}
          onChange={handleChange}
        />
        <InputGroupAddon addonType='append'>
          <Button type='submit' name='submit' className='p-0' color='link' disabled={!input}>
            <LoadingSpinner
              isLoading={isFetching}
              color=''
              renderContent={() => (
                <IconBg icon='paper-plane' color='sherpaBlue' textcol='white' nudge='0 0 0 -4px' />
              )}
            />
          </Button>
        </InputGroupAddon>
      </InputGroupBorder>
    </SendMessage>
  );
}

export default MessageInput;
