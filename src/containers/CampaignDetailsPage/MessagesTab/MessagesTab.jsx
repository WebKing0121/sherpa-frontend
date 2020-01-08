import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchModule from '../../../components/SearchModule';
import List from '../../../components/List/List';
import { prospectsToItemList } from '../utils';
import { searchProspects, searchProspectNextPage } from '../../../store/Prospects/actions';
import { campaignProspectSearch } from '../../../store/campaignProspectStore/thunks';
import { getCampaignProspects, nextPageUrl } from '../../../store/campaignProspectStore/selectors';

function MessagesTab(props) {
  const [isFetching, setIsSearching] = useState(false);
  const [activeCampaignId, setActiveCampaignId] = useState(1);
  const prospectResults = useSelector(getCampaignProspects(activeCampaignId));
  const prospectList = prospectsToItemList(prospectResults || []);
  const dispatch = useDispatch();

  useEffect(() => {
    if (prospectResults.length === 0) {
      dispatch(campaignProspectSearch(activeCampaignId, { name: 'is_priority_unread', value: true }));
    }
  }, []);

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
      {/* <SearchModule searchTerm={search} showSearch={true} /> */}
      <List
        items={prospectList}
        nextPageUrl={nextPageUrl}
        fetchMoreData={fetchMoreData}
        isFetching={isFetching}
      />
    </>
  );
}

export default MessagesTab;
