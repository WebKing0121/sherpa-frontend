import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SearchModule from '../../components/SearchModule';
import { searchProspects, searchProspectNextPage } from '../../store/Prospects/actions';
import { prospectsToItemList } from './utils';
import { prospectsResults, prospectSearchState, prospectFetchMoreStatus } from '../../store/Prospects/selectors';
import { DataLoader } from '../../components/LoadingData';
import { Fetching } from '../../variables';
import VirtualizedList from '../../components/VirtualizedList';
import SwipeListItem from '../../components/SwipeableList/SwipeableListItem';
import ListItem from '../../components/List/ListItem';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

const SpinWrap = styled.div`
  padding: var(--pad5);
  text-align: center;
`;

function ProspectsSearch(props) {
  const prospectResults = useSelector(prospectsResults);
  const isFetching = useSelector(prospectSearchState);
  const isFetchingMore = useSelector(prospectFetchMoreStatus);
  const dispatch = useDispatch();
  const [itemHeight, setItemHeight] = useState(150);

  // transform prospect data into the appropriate data-interface for
  // ItemList
  const prospectList = prospectsToItemList(prospectResults);

  // search function
  const search = term => dispatch(searchProspects(term));

  // fetch next-page function
  const fetchMoreData = () => dispatch(searchProspectNextPage());

  // calculate item height
  useEffect(() => {
    if (prospectList.length > 0) {
      let sampleItem = prospectList[0];
      let itemId = `${sampleItem.id}-${sampleItem.firstName}`;
      let item = document.getElementById(itemId);

      if (item) {
        setItemHeight(item.offsetHeight);
      }
    }
  }, []);

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

  return (
    <>
      <Header>Prospects Search</Header>
      <SearchModule searchTerm={search} showFilter={false} showSearch={true} />
      <DataLoader
        status={isFetching}
        data={prospectResults}
        emptyResultsMessage='No prospects were found that matches your search.'
        renderData={() => (
          <>
            <VirtualizedList
              height={600}
              itemHeight={itemHeight}
              onScroll={onScroll}
              items={prospectList}
              renderItem={renderItem}
            />
            {isFetchingMore === Fetching ? <SpinWrap><Spinner color="primary" size="lg" /></SpinWrap> : null}
          </>
        )}
      />
    </>
  );
}

export default ProspectsSearch;
