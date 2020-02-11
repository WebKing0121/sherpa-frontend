import React, { useEffect, useState, useRef } from 'react';
import SearchModule from '../../components/SearchModule';
import List from '../../components/List/List';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Spinner } from 'reactstrap';
import { campaignsList, campaignsStatus, activeMarket, sortByOrder, campaignIsLoadingMore } from '../../store/Campaigns/selectors';
import { marketsList } from '../../store/Markets/selectors';
import { campaignsToItemList } from './utils';
import { fetchSortedCampaigns, campaignsNextPage } from '../../store/Campaigns/thunks';

import { resetCampaignsData } from '../../store/Campaigns/actions';
import { DataLoader } from '../../components/LoadingData';
import SwipeListItem from '../../components/SwipeableList/SwipeableListItem';

import VirtualizedList from '../../components/VirtualizedList';
import ListItem from '../../components/List/ListItem';
import TabbedHeader from '../../components/TabbedHeader';
import { getFromLocalStorage } from '../../store/Markets/utils';
import { useParams } from 'react-router-dom';
import FilterButton from '../../components/FilterButton';

import { getActiveFilter } from '../../store/uiStore/campaignsPageView/selectors';
import { resetCampaignFilter } from '../../store/uiStore/campaignsPageView/actions';
import { vListItems, vListHeight, campaignSortingOptions, Fetching } from '../../helpers/variables';
import usePrevious from '../../hooks/usePrevious';

const SpinWrap = styled.div`
  padding: var(--pad5);
  text-align: center;
`;

const CampaignsPage = () => {
  // selectors
  const activeMarketId = useSelector(activeMarket);
  const campaigns = useSelector(campaignsList);
  const campaignFolders = useSelector(marketsList);
  const isFetching = useSelector(campaignsStatus);
  const isFetchingMore = useSelector(campaignIsLoadingMore);
  const sortBy = useSelector(sortByOrder);
  const activeFilter = useSelector(getActiveFilter);

  // helpers
  const dispatch = useDispatch();
  const folders = getFromLocalStorage('folderView');
  const { marketId } = useParams();

  // state
  const [activeSort, setActiveSort] = useState(0);
  const [itemHeight, setItemHeight] = useState(vListItems);
  const [listHeight, setListHeight] = useState(vListHeight);

  // fetch next-page function
  const fetchMoreData = () => dispatch(campaignsNextPage());
  const defaultCampaignQuery = { ordering: '-created_date', market: marketId, is_archived: false, page_size: 20 };

  // check there are campaign folders to navigate back too
  const hasCampaignFolders = campaignFolders.length > 0 || folders;

  // dispatch fetchCampaigns
  useEffect(() => {
    // Preserve sort order menu selection on refresh
    const sorted = campaignSortingOptions.filter(x => x.value.value === sortBy);
    setActiveSort(sorted[0].value.id);

    // refetch campaigns list if markets navigation has changed or the campaigns list has changed
    if (activeMarketId !== marketId && isFetching !== Fetching) {
      dispatch(resetCampaignFilter());
      dispatch(fetchSortedCampaigns(defaultCampaignQuery));
    }
  }, [dispatch, marketId, activeMarketId]);

  // Refetch campaigns if the filter gets reset
  useEffect(() => {
    if (activeFilter.length === 0) {
      dispatch(fetchSortedCampaigns(defaultCampaignQuery));
    }
  }, [dispatch, activeFilter.length]);

  // transform campaigns to proper list item views
  const listItems = campaignsToItemList(campaigns);

  const headerInfo = {
    fromText: 'Show Markets',
    hasBackButton: hasCampaignFolders,
    backAction: () => dispatch(resetCampaignsData())
  };

  const renderItem = ({ index, style }) => {
    let item = listItems[index];
    return (
      <React.Fragment key={index}>
        <SwipeListItem style={style} threshold='.25' actions={item.actions} key={index}>
          <ListItem id={`${item.id}-${item.name}`} item={item} />
        </SwipeListItem>
      </React.Fragment>
    );
  };

  // onScroll event to fetch more data
  const onScroll = (top, event) => {
    let pageOffset = event.srcElement.scrollHeight;
    let offset = event.srcElement.offsetHeight + top;

    // only fire if we're at the bottom of the page
    if ((offset + (25 * itemHeight)) >= pageOffset) {
      fetchMoreData();
    }
  };

  useEffect(() => {
    if (campaigns.length > 0) {
      let sampleItem = campaigns[0];
      let itemId = `${sampleItem.id}-${sampleItem.name}`;
      let item = document.getElementById(itemId);

      if (item && item.setHeight !== 0) {
        setItemHeight(item.offsetHeight);
      }
    }
  }, [campaigns]);

  const prevListHeight = usePrevious(listHeight);

  useEffect(() => {
    const virtualizeList = document.getElementById("campaignVirtualizedList");
    const windowHeight = window.innerHeight;
    const listHeight = (virtualizeList && virtualizeList.offsetTop) || 0;
    // if (prevListHeight !== listHeight) {
    setListHeight(windowHeight - listHeight);
    // }
  });

  return (
    <div className='pageContent'>
      <TabbedHeader data={headerInfo}><h1 className='text-white text-left m-0'>Campaigns</h1></TabbedHeader>
      <SearchModule
        showFilter={true}
        showSort={true}
        showSearch={false}
        sortingOptions={campaignSortingOptions}
        sortChange={(value) => {
          setActiveSort(value.id);
          dispatch(fetchSortedCampaigns(defaultCampaignQuery));
        }}
        marketId={marketId}
        defaultValue={activeSort}
        dataTest='campaign-filters'
      >
        <FilterButton />
      </SearchModule>
      <DataLoader
        status={isFetching}
        data={listItems}
        emptyResultsMessage='No campaigns matching that criteria were found'
        renderData={() => (
          <>
            <VirtualizedList
              id={'campaignVirtualizedList'}
              height={listHeight}
              itemHeight={itemHeight}
              onScroll={onScroll}
              items={listItems}
              renderItem={renderItem}
            />
            {isFetchingMore ? (
              <SpinWrap>
                <Spinner color='primary' size='lg' />
              </SpinWrap>
            ) : null}
          </>
        )}
      />

    </div>
  );
};

export default CampaignsPage;
