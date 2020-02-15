import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import List from '../../../components/List/List';
import Select from '../../../components/InputSelect';
import IconBg from '../../../components/IconBg';
import NewMessagesList from '../../../components/NewMessagesList';

import { prospectsToItemList } from './utils';
import { campaignsList, campaignsStatus, activeMarket } from '../../../store/Campaigns/selectors';
import { marketsList } from '../../../store/Markets/selectors';
import { fetchSortedCampaigns } from '../../../store/Campaigns/thunks';
import { DataLoader } from '../../../components/LoadingData';

const Wrapper = styled.div`
  padding: var(--pad2) var(--pad3);
`;

const MessagesList = props => {
  return (
    <Wrapper>
      <div className="pb-1 bb-1 mb-1 d-flex justify-content-between align-items-center">
        <h2 className="m-0">All Unread</h2>
      </div>
      <NewMessagesList listData={prospectsToItemList} />
    </Wrapper>
  );
};

export default MessagesList;
