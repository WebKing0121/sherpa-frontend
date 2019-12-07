import React from 'react';
import Messages from './Messages';
import { Input, InputGroupAddon, Button } from 'reactstrap';
import InputGroupBorder from '../../../components/InputGroupBorder';
import IconBg from '../../../components/IconBg';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SendMessage = styled.div`
  padding: var(--pad2) var(--pad3);
`;

function MessagesTab(props) {

  return (
    <>
      <Messages/>

      <SendMessage>
        <InputGroupBorder className="mb-2">
          <InputGroupAddon addonType="prepend">
            <Button className="p-0" color="link" onClick={props.onclick}><FontAwesomeIcon icon="layer-group" color="gray" size="2x" className="mr-3"/></Button>
          </InputGroupAddon>
          <Input type="text" name="sendMessage" id="sendMessage" placeholder="Your Message"/>
          <InputGroupAddon addonType="append">
            <Button className="p-0" color="link" onClick={props.onclick}><IconBg icon="paper-plane" color="sherpaBlue" textcol="white" nudge="0 0 0 -4px"/></Button>
          </InputGroupAddon>
        </InputGroupBorder>
      </SendMessage>
    </>
  );
}

export default MessagesTab;
