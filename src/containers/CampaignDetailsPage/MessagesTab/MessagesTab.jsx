import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchModule from '../../../components/SearchModule';
import List from '../../../components/List/List';
import { prospectsToItemList } from '../utils';
import { searchProspects, searchProspectNextPage } from '../../../store/Prospects/actions';

function MessagesTab(props) {
  const [prospectResults, setProspects] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [isFetching, setIsSearching] = useState(false);
  const prospectList = prospectsToItemList(prospectResults);
  const dispatch = useDispatch();

  // load more data
  const fetchMoreData = (url, isFetching) => {
    if (!isFetching) {
      setIsSearching(true);

      // get the next batch of data
      searchProspectNextPage(url).then(data => {
        const { results = [], next = '' } = data || {};
        setIsSearching(false);
        setProspects([...prospectResults, ...results]);
        setNextPageUrl(next);
      });
    }
  };

  // search function
  const search = term => {
    setIsSearching(true);

    // perform the search
    dispatch(searchProspects(term)).then(data => {
      const { results = [], next = '' } = data || {};
      setIsSearching(false);
      setProspects(results);
      setNextPageUrl(next);
    });
  };
  // I just copied over the same code that is used for
  // the prospectSearch component
  return (
    <>
      <SearchModule searchTerm={search} showSearch={true} />
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
