import React, { useEffect } from 'react';
import SearchModule from '../../components/SearchModule';
import List from '../../components/List/List';
import { useDispatch, useSelector } from 'react-redux';

import { campaignsList, campaignsStatus, activeMarket } from '../../store/Campaigns/selectors';
import { marketsList } from '../../store/Markets/selectors';
import { campaignsToItemList } from './utils';
import { fetchCampaigns, resetCampaignsData, fetchSortedCampaigns } from '../../store/Campaigns/actions';
import { DataLoader } from '../../components/LoadingData';

import TabbedHeader from '../../components/TabbedHeader';
import { getFromLocalStorage } from '../../store/Markets/utils';

const CampaignsPage = props => {
  const activeMarketId = useSelector(activeMarket);
  const campaigns = useSelector(campaignsList);
  const campaignFolders = useSelector(marketsList);
  const isFetching = useSelector(campaignsStatus);
  const dispatch = useDispatch();
  const folders = getFromLocalStorage('folderView');

  const {
    match: {
      params: { id: marketId }
    }
  } = props;

  const sortingOptions = [
    {
      name: 'Alphabetical',
      value: 'name'
    },
    {
      name: 'Created Date',
      value: 'created_date'
    },
    {
      name: 'Status %',
      value: 'status'
    }
  ];

  // check there are campaign folders to navigate back too
  const hasCampaignFolders = campaignFolders.length > 0 || folders;

  // dispatch fetchCampaigns
  useEffect(() => {
    // check that campaigns list hasn't changed because of a details view refresh
    const marketCount = folders.filter(x => x.id === parseInt(marketId))[0].campaignCount;

    // refetch campaigns list if markets navigation has changed or the campaigns list has changed
    if (campaigns.length !== marketCount || activeMarketId !== parseInt(marketId)) {
      dispatch(fetchCampaigns(marketId));
    }
  }, [dispatch, marketId]);

  // transform campaigns to proper list item views
  const listItems = campaignsToItemList(campaigns);

  const headerInfo = {
    fromText: 'Show Markets',
    hasBackButton: hasCampaignFolders,
    backAction: () => dispatch(resetCampaignsData())
  };

  return (
    <div className="pageContent">
      <TabbedHeader data={headerInfo}>Campaigns</TabbedHeader>
      <SearchModule
        showFilter={true}
        showSort={true}
        showSearch={false}
        sortingOptions={sortingOptions}
        sortChange={fetchSortedCampaigns}
        marketId={marketId}
      />
      <DataLoader status={isFetching} data={listItems} renderData={() => <List items={listItems} />} />
    </div>
  );
};

export default CampaignsPage;
