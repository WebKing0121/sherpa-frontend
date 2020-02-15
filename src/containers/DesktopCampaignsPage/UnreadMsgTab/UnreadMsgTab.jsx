import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import MessagesList from './MessagesList';
import MessageDetail from './MessageDetail';

const Wrapper = styled.div`
  display: flex;
  height: 100%;

  & > div {
    flex-basis: 50%;
  }
`;

const UnreadMsgTab = props => {
  return (
    <Wrapper>
      <MessagesList />
      <MessageDetail />
    </Wrapper>
  );
};

export default UnreadMsgTab;
