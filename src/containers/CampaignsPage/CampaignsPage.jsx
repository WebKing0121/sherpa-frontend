import React, { useEffect } from 'react';
import SearchModule from '../../components/SearchModule';
import List from '../../components/List/List';
import { useDispatch, useSelector } from 'react-redux';

import { campaignsList, campaignsStatus } from '../../store/Campaigns/selectors';
import { campaignFoldersList } from '../../store/CampaignFolders/selectors';
import { campaignsToItemList } from './utils';
import { fetchCampaigns, resetCampaignsData } from '../../store/Campaigns/actions';
import { DataLoader } from '../../components/LoadingData';

import TabbedHeader from '../../components/TabbedHeader';

const CampaignsPage = (props) => {
  const campaigns = useSelector(campaignsList);
  const campaignFolders = useSelector(campaignFoldersList);
  const isFetching = useSelector(campaignsStatus);
  const dispatch = useDispatch();

  const { match: { params: { id: marketId } } } = props;

  // check there are campaign folders to navigate back too
  const hasCampaignFolders = campaignFolders.length > 0;

  // dispatch fetchCampaigns
  useEffect(() => dispatch(fetchCampaigns(marketId)), []);

  // transform campaigns to proper list item views
  const listItems = campaignsToItemList(campaigns);

  const headerInfo = {
    fromText: "Show Markets",
    hasBackButton: hasCampaignFolders,
    backAction: () => dispatch(resetCampaignsData()),
  }

  return (
    <div>
      <TabbedHeader data={headerInfo}>Campaigns</TabbedHeader>
      <SearchModule showFilter={true} showSearch={false} />
      <DataLoader
        status={isFetching}
        data={listItems}
        renderData={() => (
          <List
            virtualize
            items={listItems} />
        )}
      />
    </div >
  );
};

export default CampaignsPage;
