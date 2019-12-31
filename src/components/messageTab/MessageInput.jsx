import React from 'react';
import { Input, InputGroupAddon, Button } from 'reactstrap';
import InputGroupBorder from '../InputGroupBorder';
import IconBg from '../IconBg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const SendMessage = styled.div`
  padding: var(--pad2) var(--pad3);
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
`;

function MessageInput() {
  return (
    <SendMessage>
      <InputGroupBorder className='mb-2'>
        <InputGroupAddon addonType='prepend'>
          <Button className='p-0' color='link' onClick={e => console.log(e.target)}>
            <FontAwesomeIcon icon='layer-group' color='gray' size='2x' className='mr-3' />
          </Button>
        </InputGroupAddon>
        <Input type='text' name='sendMessage' id='sendMessage' placeholder='Your Message' />
        <InputGroupAddon addonType='append'>
          <Button className='p-0' color='link' onClick={e => console.log(e.target)}>
            <IconBg icon='paper-plane' color='sherpaBlue' textcol='white' nudge='0 0 0 -4px' />
          </Button>
        </InputGroupAddon>
      </InputGroupBorder>
    </SendMessage>
  );
}

export default MessageInput;
