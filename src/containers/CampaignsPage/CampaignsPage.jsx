import React, { useEffect, useState } from 'react';
import SearchModule from '../../components/SearchModule';
import List from '../../components/List/List';
import { useDispatch, useSelector } from 'react-redux';

import { campaignsList, campaignsStatus, activeMarket, sortByOrder } from '../../store/Campaigns/selectors';
import { marketsList } from '../../store/Markets/selectors';
import { campaignsToItemList } from './utils';
import { resetCampaignsData, fetchSortedCampaigns } from '../../store/Campaigns/actions';
import { DataLoader } from '../../components/LoadingData';

import TabbedHeader from '../../components/TabbedHeader';
import { getFromLocalStorage } from '../../store/Markets/utils';
import { useParams } from 'react-router-dom';
import FilterButton from '../../components/FilterButton';

const CampaignsPage = () => {
  const activeMarketId = useSelector(activeMarket);
  const campaigns = useSelector(campaignsList);
  const campaignFolders = useSelector(marketsList);
  const isFetching = useSelector(campaignsStatus);
  const sortBy = useSelector(sortByOrder);

  const dispatch = useDispatch();
  const folders = getFromLocalStorage('folderView');
  const [activeSort, setActiveSort] = useState(0);

  const { marketId } = useParams();

  const sortingOptions = [
    {
      name: 'Newest',
      value: { value: '-created_date', id: 0 }
    },
    {
      name: 'Oldest',
      value: { value: 'created_date', id: 1 }
    },
    {
      name: 'Alpha (A-Z)',
      value: { value: 'name', id: 2 }
    },
    {
      name: 'Alpha (Z-A)',
      value: { value: '-name', id: 3 }
    },
    {
      name: 'Most complete',
      value: { value: '-percent_complete', id: 4 }
    },
    {
      name: 'Least complete',
      value: { value: 'percent_complete', id: 5 }
    }
  ];

  // check there are campaign folders to navigate back too
  const hasCampaignFolders = campaignFolders.length > 0 || folders;

  // dispatch fetchCampaigns
  useEffect(() => {
    // Preserve sort order menu selection on refresh
    const sorted = sortingOptions.filter(x => x.value.value === sortBy);
    setActiveSort(sorted[0].value.id);

    // refetch campaigns list if markets navigation has changed or the campaigns list has changed
    if (campaigns.length === 0 || activeMarketId !== marketId) {
      // dispatch(fetchCampaigns(marketId));
      dispatch(fetchSortedCampaigns('-created_date', marketId));
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
        sortChange={(value) => {
          setActiveSort(value.id);
          dispatch(fetchSortedCampaigns(value.value, marketId));
        }}
        marketId={marketId}
        defaultValue={activeSort}
        dataTest='campaign-filters'
      >
        <FilterButton />
      </SearchModule>
      <DataLoader status={isFetching} data={listItems} renderData={() => <List items={listItems} />} />
    </div>
  );
};

export default CampaignsPage;
