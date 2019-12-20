import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SearchModule from '../../components/SearchModule';
import List from '../../components/List/List';
import { searchProspects, searchProspectNextPage } from '../../store/Prospects/actions';
import { prospectsToItemList } from './utils';
import { prospectsResults, prospectSearchState, prospectFetchMoreStatus } from '../../store/Prospects/selectors';
import { DataLoader } from '../../components/LoadingData';
import { Fetching } from '../../variables';

function ProspectsSearch(props) {
  const prospectResults = useSelector(prospectsResults);
  const isFetching = useSelector(prospectSearchState);
  const isFetchingMore = useSelector(prospectFetchMoreStatus);
  const dispatch = useDispatch();

  // search function
  const search = term => dispatch(searchProspects(term));

  // fetch next-page function
  const fetchMoreData = () => dispatch(searchProspectNextPage());

  // transform prospect data into the appropriate data-interface for
  // ItemList
  const prospectList = prospectsToItemList(prospectResults);

  return (
    <>
      <Header>Prospects Search</Header>
      <SearchModule searchTerm={search} showFilter={false} showSearch={true} />
      <DataLoader
        status={isFetching}
        data={prospectResults}
        emptyResultsMessage='No prospects were found that matches your search.'
        renderData={() => (
          <List
            virtualize
            itemSize={150}
            items={prospectList}
            fetchMoreData={fetchMoreData}
            isFetching={isFetchingMore === Fetching}
          />
        )}
      />
    </>
  );
}

export default ProspectsSearch;
