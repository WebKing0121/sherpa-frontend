import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

// utils and thunks
import { prospectsToItemList } from '../utils';
import {
  campaignProspectSearch,
  campaignProspectsNextPage
} from '../../../store/campaignProspectStore/thunks';

// actions
import { setCampaignProspectFilter } from '../../../store/uiStore/campaignMessagesTabView/actions';

// selectors
import {
  getCampaignProspects,
  isLoadingMore,
  isLoading
} from '../../../store/campaignProspectStore/selectors';
import { campaignMessagesFilter } from '../../../store/uiStore/campaignMessagesTabView/selectors';
import { activeCampaignSelector } from '../../../store/uiStore/prospectDetailsView/selectors';
import { getLeadStages } from '../../../store/leadstages/selectors';

// custom-components
import SearchModule from '../../../components/SearchModule';
import ListItem from '../../../components/List/ListItem';
import VirtualizedList from '../../../components/VirtualizedList';
import SwipeListItem from '../../../components/SwipeableList/SwipeableListItem';
import { Fetching, Success } from '../../../helpers/variables';
import { DataLoader } from '../../../components/LoadingData';
import { updateCampaignProspectSuccess } from '../../../store/campaignProspectStore/actions';

const SpinWrap = styled.div`
  padding: var(--pad5);
  text-align: center;
`;

function MessagesTab(props) {
  const leadStages = useSelector(getLeadStages);
  const activeCampaignId = useSelector(activeCampaignSelector);
  const prospectResults = useSelector(getCampaignProspects(activeCampaignId, leadStages));
  const isFetchingMore = useSelector(isLoadingMore);
  const isFetching = useSelector(isLoading);
  const prospectList = prospectsToItemList({
    updateCampaignProspectFn: updateCampaignProspectSuccess
  })(prospectResults || []);
  const filterId = useSelector(campaignMessagesFilter);
  const dispatch = useDispatch();
  const [itemHeight, setItemHeight] = useState(150);
  const lead_stage_filters = leadStages.map((stage, idx) => ({
    name: stage.leadStageTitle,
    value: { name: 'lead_stage', value: stage.id, id: idx + 1 }
  }));
  const filters = [
    {
      name: 'Unread / Is Priority',
      value: { name: 'is_priority_unread', value: true, id: 0 }
    },
    ...lead_stage_filters,
    {
      name: 'Qualified Leads',
      value: { name: 'is_qualified_lead', value: true, id: lead_stage_filters.length + 1 }
    }
  ];

  // calculate item height for virtualized-list
  useEffect(() => {
    if (prospectList.length > 0) {
      let sampleItem = prospectList[0];
      let itemId = `${sampleItem.id}-${sampleItem.firstName}`;
      let item = document.getElementById(itemId);

      if (item && item.offsetHeight !== 0) {
        setItemHeight(item.offsetHeight);
      }
    }
  }, [prospectList]);

  // load more data
  const fetchMoreData = () => dispatch(campaignProspectsNextPage(activeCampaignId));

  // onScroll event to fetch more data
  const onScroll = (top, event) => {
    let pageOffset = event.srcElement.scrollHeight;
    let offset = event.srcElement.offsetHeight + top;

    // only fire if we're at the bottom of the page
    if (offset + (25 * itemHeight) >= pageOffset) {
      fetchMoreData();
    }
  };

  const renderItem = ({ index, style }) => {
    let item = prospectList[index];

    return (
      <React.Fragment key={index}>
        <SwipeListItem style={style} threshold='.25' actions={item.actions} key={index}>
          <ListItem id={`${item.id}-${item.firstName}`} item={item} />
        </SwipeListItem>
      </React.Fragment>
    );
  };

  return (
    <>
      <SearchModule
        showFilter={false}
        showSort={true}
        showSearch={false}
        sortingOptions={filters}
        sortChange={filter => {
          dispatch(setCampaignProspectFilter(filter.id));
          dispatch(campaignProspectSearch(activeCampaignId, { filter, force: true }));
        }}
        marketId={activeCampaignId}
        defaultValue={filterId}
        dataTest='campaign-messages-filter'
      />
      <DataLoader
        status={isFetching ? Fetching : Success}
        data={prospectResults}
        emptyResultsMessage='No messages were found'
        renderData={() => (
          <>
            <VirtualizedList
              height={600}
              items={prospectList}
              itemHeight={itemHeight}
              onScroll={onScroll}
              fetchMoreData={fetchMoreData}
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
    </>
  );
}

export default MessagesTab;
