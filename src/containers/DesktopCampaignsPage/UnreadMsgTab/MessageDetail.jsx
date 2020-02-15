import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import List from '../../../components/List/List';
import Select from '../../../components/InputSelect';
import MessagesTab from '../../../components/messageTab/MessageTab';
import ProspectCard from './ProspectCard';

import { campaignsList, campaignsStatus, activeMarket } from '../../../store/Campaigns/selectors';
import { marketsList } from '../../../store/Markets/selectors';
import { campaignsToItemList } from './utils';
import { fetchSortedCampaigns } from '../../../store/Campaigns/thunks';
import { DataLoader } from '../../../components/LoadingData';

const Wrapper = styled.div`
  padding: 0;
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const MessageDetail = props => {
  const activeMarketId = useSelector(activeMarket);
  const campaigns = useSelector(campaignsList);
  const campaignFolders = useSelector(marketsList);
  const isFetching = useSelector(campaignsStatus);
  const dispatch = useDispatch();

  // dispatch fetchCampaigns
  useEffect(() => {
    // refetch campaigns list if markets navigation has changed or the campaigns list has changed
    dispatch(fetchSortedCampaigns());
  }, [dispatch]);

  return (
    <Wrapper>
      <ProspectCard />
      <MessagesTab
        messages={[]}
        subjectId={2}
        scrollToBot={true}
        showInitials={true}
        isDesktop={true}
      />
    </Wrapper>
  );
};

export default MessageDetail;
