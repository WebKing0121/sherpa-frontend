import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SearchModule from '../../components/SearchModule';
import List from '../../components/List/List';
import { searchProspects, searchProspectNextPage } from '../../store/Prospects/actions';
import { prospectsToItemList } from './utils';


function ProspectsSearch(props) {
  const [prospectResults, setProspects] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [isFetching, setIsSearching] = useState(false);
  const dispatch = useDispatch();

  // search function
  const search = (term) => {
    setIsSearching(true);

    // perform the search
    dispatch(searchProspects(term)).then(data => {
      const { results = [], next = "" } = data || {};
      setIsSearching(false);
      setProspects(results);
      setNextPageUrl(next);
    });
  };

  // load more data
  const fetchMoreData = (url, isFetching) => {
    if (!isFetching) {
      setIsSearching(true);

      // get the next batch of data
      searchProspectNextPage(url).then(data => {
        const { results = [], next = "" } = data || {};
        setIsSearching(false);
        setProspects([...prospectResults, ...results]);
        setNextPageUrl(next);
      });
    }
  };

  // transform prospect data into the appropriate data-interface for ItemList
  const prospectList = prospectsToItemList(prospectResults);
  return (
    <div>
      <Header>Prospects Search</Header>
      <SearchModule searchTerm={search} />
      <List
        virtualize
        items={prospectList}
        nextPageUrl={nextPageUrl}
        fetchMoreData={fetchMoreData}
        isFetching={isFetching} />
    </div>
  );
}

export default ProspectsSearch;
