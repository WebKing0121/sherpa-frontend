import React, { useEffect } from 'react';
import Header from '../../components/Header';
import List from '../../components/List/List';
import { useDispatch, useSelector } from 'react-redux';

import { campaignFoldersList, campaignFoldersStatus } from '../../store/CampaignFolders/selectors';
import { campaignFoldersToItemList } from './utils';
import { fetchCampaignFolders } from '../../store/CampaignFolders/actions';
import { DataLoader } from '../../components/LoadingData';

const CampaignFoldersPage = () => {
  const campaignFolders = useSelector(campaignFoldersList);
  const isFetching = useSelector(campaignFoldersStatus);
  const dispatch = useDispatch();

  // dispatch fetchCampaigns
  useEffect(() => dispatch(fetchCampaignFolders()), [dispatch]);

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
