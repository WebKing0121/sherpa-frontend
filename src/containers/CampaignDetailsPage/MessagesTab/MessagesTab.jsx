import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchModule from '../../../components/SearchModule';
import List from '../../../components/List/List';
import { prospectsToItemList } from '../utils';
import { campaignProspectSearch } from '../../../store/campaignProspectStore/thunks';
import { getCampaignProspects, nextPageUrl } from '../../../store/campaignProspectStore/selectors';
import { activeCampaignSelector } from '../../../store/uiStore/prospectDetailsView/selectors';
import { getLeadStages } from '../../../store/leadstages/selectors';

function MessagesTab(props) {
  const [isFetching, setIsSearching] = useState(false);
  const activeCampaignId = useSelector(activeCampaignSelector);
  const prospectResults = useSelector(getCampaignProspects(activeCampaignId));
  const prospectList = prospectsToItemList(prospectResults || []);
  const dispatch = useDispatch();
  const leadStages = useSelector(getLeadStages);
  const lead_stage_filters = leadStages.map((stage) => ({
    name: stage.leadStageTitle,
    value: { name: 'lead_stage', value: stage.id }
  }));
  const filters = [
    { name: 'Unread / Is Priority', value: { name: 'is_priority_unread', value: true } },
    ...lead_stage_filters,
    { name: 'Qualified Leads', value: { name: 'is_qualified_lead', value: true } }
  ];


  // load more data
  const fetchMoreData = (url, isFetching) => {
    if (!isFetching) {
      // setIsSearching(true);

      // get the next batch of data
      // searchProspectNextPage(url).then(data => {
      //   const { results = [], next = '' } = data || {};
      //   setIsSearching(false);
      //   setProspects([...prospectResults, ...results]);
      //   setNextPageUrl(next);
      // });
    }
  };

  // search function
  // const search = term => {
  //   setIsSearching(true);

  //   // perform the search
  //   dispatch(searchProspects(term)).then(data => {
  //     const { results = [], next = '' } = data || {};
  //     setIsSearching(false);
  //     setProspects(results);
  //     setNextPageUrl(next);
  //   });
  // };
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
      {prospectList.length > 0 ? (<List
        items={prospectList}
        nextPageUrl={nextPageUrl}
        fetchMoreData={fetchMoreData}
        isFetching={isFetching}
      />) : <p>No Messages</p>}
    </>
  );
}

export default MessagesTab;
