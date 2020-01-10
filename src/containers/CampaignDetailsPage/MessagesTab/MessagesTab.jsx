import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// utils and thunks
import { prospectsToItemList } from '../utils';
import {
  campaignProspectSearch,
  campaignProspectsNextPage
} from '../../../store/campaignProspectStore/thunks';

// selectors
import { getCampaignProspects } from '../../../store/campaignProspectStore/selectors';
import { activeCampaignSelector } from '../../../store/uiStore/prospectDetailsView/selectors';
import { getLeadStages } from '../../../store/leadstages/selectors';

// custom-components
import SearchModule from '../../../components/SearchModule';
import ListItem from '../../../components/List/ListItem';
import VirtualizedList from '../../../components/VirtualizedList';
import SwipeListItem from '../../../components/SwipeableList/SwipeableListItem';


function MessagesTab(props) {
  const activeCampaignId = useSelector(activeCampaignSelector);
  const prospectResults = useSelector(getCampaignProspects(activeCampaignId));
  const prospectList = prospectsToItemList(prospectResults || []);
  const dispatch = useDispatch();
  const leadStages = useSelector(getLeadStages);
  const [itemHeight, setItemHeight] = useState(150);
  const lead_stage_filters = leadStages.map((stage) => ({
    name: stage.leadStageTitle,
    value: { name: 'lead_stage', value: stage.id }
  }));
  const filters = [
    { name: 'Unread / Is Priority', value: { name: 'is_priority_unread', value: true } },
    ...lead_stage_filters,
    { name: 'Qualified Leads', value: { name: 'is_qualified_lead', value: true } }
  ];

  // calculate item height for virtualized-list
  useEffect(() => {
    if (prospectList.length > 0) {
      let sampleItem = prospectList[0];
      let itemId = `${sampleItem.id}-${sampleItem.firstName}`;
      let item = document.getElementById(itemId);

      if (item && item.offsetHeight !== 0) {
        console.log("ITEM offsetheight", item.offsetHeight);
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
    if (offset >= pageOffset) {
      fetchMoreData();
    }
  };

  const renderItem = ({ index, style }) => {
    let item = prospectList[index];

    return (
      <React.Fragment key={index}>
        <SwipeListItem
          style={style}
          threshold=".25"
          actions={item.actions}
          key={index}>
          <ListItem id={`${item.id}-${item.firstName}`} item={item} />
        </SwipeListItem>
      </React.Fragment>
    );
  };

  // I just copied over the same code that is used for
  // the prospectSearch component
  return (
    <>
      <SearchModule
        showFilter={false}
        showSort={true}
        showSearch={false}
        sortingOptions={filters}
        sortChange={(filter, id) => {
          dispatch(campaignProspectSearch(
            activeCampaignId,
            { filter, force: true }
          ));
        }}
        marketId={activeCampaignId}
      />
      {prospectList.length > 0 ? (
        <VirtualizedList
          height={600}
          items={prospectList}
          itemHeight={itemHeight}
          onScroll={onScroll}
          fetchMoreData={fetchMoreData}
          renderItem={renderItem}
        />) : <p>No Messages</p>}
    </>
  );
}

export default MessagesTab;
