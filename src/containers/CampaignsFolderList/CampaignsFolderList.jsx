import React, { useEffect } from 'react';
import Header from '../../components/Header';
import SearchModule from '../../components/SearchModule';
import List from '../../components/List/List';
import { useDispatch, useSelector } from 'react-redux';

import { campaignFoldersList } from '../../store/CampaignFolders/selectors';
import { campaignFoldersToItemList } from './utils';
import { fetchCampaignFolders } from '../../store/CampaignFolders/actions';


const CampaignsFolderListPage = () => {
  const campaignFolders = useSelector(campaignFoldersList);
  const dispatch = useDispatch();

  // dispatch fetchCampaigns
  useEffect(() => dispatch(fetchCampaignFolders()), []);

  // transform campaigns to proper list item views
  const listItems = campaignFoldersToItemList(campaignFolders);

  return (
    <div>
      <Header>Campaigns</Header>
      <SearchModule />
      <List items={listItems} />
    </div>
  );
};

export default CampaignsFolderListPage;
