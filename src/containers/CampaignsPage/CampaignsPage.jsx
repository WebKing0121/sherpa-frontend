import React, { useEffect } from 'react';
// import SearchModule from '../../components/SearchModule';
import List from '../../components/List/List';
import { useDispatch, useSelector } from 'react-redux';

import { campaignsList } from '../../store/Campaigns/selectors';
import { campaignFoldersList } from '../../store/CampaignFolders/selectors';
import { campaignsToItemList } from './utils';
import { fetchCampaigns } from '../../store/Campaigns/actions';

import TabbedHeader from '../../components/TabbedHeader';

const CampaignsPage = (props) => {
  const campaigns = useSelector(campaignsList);
  const campaignFolders = useSelector(campaignFoldersList);
  const dispatch = useDispatch();

  const { match: { params: { id: marketId } } } = props;

  // check there are campaign folders to navigate back too
  const hasCampaignFolders = campaignFolders.length > 0;

  // dispatch fetchCampaigns
  useEffect(() => dispatch(fetchCampaigns(marketId)), []);

  // transform campaigns to proper list item views
  const listItems = campaignsToItemList(campaigns);

  return (
    <div>
      <TabbedHeader hasBackButton={hasCampaignFolders} prevRoute={'/'} fromText={'Show Markets'}>Campaigns</TabbedHeader>
      <List items={listItems} />
    </div >
  );
};

export default CampaignsPage;
