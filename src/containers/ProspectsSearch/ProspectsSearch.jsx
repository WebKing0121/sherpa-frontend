// core libs
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

// components
import Header from '../../components/Header';
import SearchModule from '../../components/SearchModule';
import { DataLoader } from '../../components/LoadingData';
import VirtualizedList from '../../components/VirtualizedList';
import SwipeListItem from '../../components/SwipeableList/SwipeableListItem';
import ListItem from '../../components/List/ListItem';

import {
  selectProspects,
  selectIsLoadingMoreProspects,
  selectIsLoadingProspect
} from '../../store/uiStore/prospectSearchView/selectors';

// thunks
import { prospectSearch, prospectSearchNextPage } from '../../store/prospectStore/thunks';

// utils
import { prospectsToItemList } from './utils';
import { Fetching } from '../../variables';

const SpinWrap = styled.div`
  padding: var(--pad5);
  text-align: center;
`;

function ProspectsSearch(props) {
  const prospectResults = useSelector(selectProspects);
  const isFetching = useSelector(selectIsLoadingProspect);
  const isFetchingMore = useSelector(selectIsLoadingMoreProspects);
  const dispatch = useDispatch();
  const [itemHeight, setItemHeight] = useState(150);

  // transform prospect data into the appropriate data-interface for
  // ItemList
  const prospectList = prospectsToItemList(prospectResults);

  // search function
  const search = term => dispatch(prospectSearch(term));

  // fetch next-page function
  const fetchMoreData = () => dispatch(prospectSearchNextPage());

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
        <SwipeListItem style={style} threshold='.25' actions={item.actions} key={index}>
          <ListItem id={`${item.id}-${item.firstName}`} item={item} />
        </SwipeListItem>
      </React.Fragment>
    );
  };

  return (
    <div className='pageContent'>
      <Header>Prospects Search</Header>
      <SearchModule searchTerm={search} showFilter={false} showSearch={true} />
      <DataLoader
        status={isFetching ? Fetching : ''}
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
}

export default ProspectsSearch;
