import React, { useEffect } from 'react';
import Header from '../../components/Header';
import List from '../../components/List/List';
import { useDispatch, useSelector } from 'react-redux';

import { marketsList, marketsStatus } from '../../store/Markets/selectors';
import { campaignFoldersToItemList } from './utils';
import { fetchMarkets } from '../../store/Markets/actions';
import { DataLoader } from '../../components/LoadingData';

const CampaignFoldersPage = () => {
  const campaignFolders = useSelector(marketsList);
  const isFetching = useSelector(marketsStatus);
  const dispatch = useDispatch();

  // dispatch fetchCampaigns
  useEffect(() => {
    if (campaignFolders.length === 0) {
      console.log('Fetching markets...');
      dispatch(fetchMarkets())
    }
  }, [dispatch, campaignFolders.length]);

  // transform campaigns to proper list item views
  const listItems = campaignFoldersToItemList(campaignFolders);

  return (
    <>
      <Header>Campaigns</Header>
      <DataLoader
        status={isFetching}
        data={listItems}
        emptyResultsMessage='Currently You Have No Campaigns to Display.'
        renderData={() => <List items={listItems} />}
      />
    </>
  );
};

export default CampaignFoldersPage;
