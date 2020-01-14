import React, { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import FilterButton from '../../components/FilterButton';

const CampaignsPage = props => {
  const activeMarketId = useSelector(activeMarket);
  const campaigns = useSelector(campaignsList);
  const campaignFolders = useSelector(marketsList);
  const isFetching = useSelector(campaignsStatus);
  const dispatch = useDispatch();
  const folders = getFromLocalStorage('folderView');
  const [activeSort, setActiveSort] = useState(0);

  const { marketId } = useParams();

  const sortingOptions = [
    {
      name: 'Alphabetical',
      value: { value: 'name', id: 0 }
    },
    {
      name: 'Created Date',
      value: { value: 'created_date', id: 1 }
    },
    {
      name: 'Status %',
      value: { value: 'status', id: 2 }
    }
  ];

  // check there are campaign folders to navigate back too
  const hasCampaignFolders = campaignFolders.length > 0 || folders;

  // dispatch fetchCampaigns
  useEffect(() => {
    // check that campaigns list hasn't changed because of a details view refresh
    // const marketCount = folders.filter(x => x.id === parseInt(marketId))[0].campaignCount;

    // refetch campaigns list if markets navigation has changed or the campaigns list has changed
    if (campaigns.length === 0 || activeMarketId !== parseInt(marketId)) {
      dispatch(fetchCampaigns(marketId));
    }
  }, [dispatch, marketId, activeMarketId, campaigns.length]);

  // transform campaigns to proper list item views
  const listItems = campaignsToItemList(campaigns);

  const headerInfo = {
    fromText: 'Show Markets',
    hasBackButton: hasCampaignFolders,
    backAction: () => dispatch(resetCampaignsData())
  };

  return (
    <div className='pageContent'>
      <TabbedHeader data={headerInfo}>Campaigns</TabbedHeader>
      <SearchModule
        showFilter={true}
        showSort={true}
        showSearch={false}
        sortingOptions={sortingOptions}
        sortChange={(value, id) => {
          setActiveSort(value.id);
          dispatch(fetchSortedCampaigns(value.value, id));
        }}
        marketId={marketId}
        defaultValue={activeSort}
      >
        <FilterButton />
      </SearchModule>
      <DataLoader status={isFetching} data={listItems} renderData={() => <List items={listItems} />} />
    </div>
  );
};

export default CampaignsPage;
