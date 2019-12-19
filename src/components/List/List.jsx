import React, { useEffect, useState } from 'react';
import ListItem from './ListItem';
import VirtualList from 'react-tiny-virtual-list';
import SwipeListItem from '../SwipeableList/SwipeableListItem';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

const SpinWrap = styled.div`
  padding: var(--pad5);
  text-align: center;
`;

// NOTE: Break down this List component into a two different ones
// VirtualList and List components to make it easier to test
// and easier to read.
function List(props) {
  const [itemHeight, setItemHeight] = useState(props.itemSize);

  useEffect(() => {
    let item = document.getElementById("1");

    if (item) {
      let itemSize = item.offsetHeight;
      setItemHeight(itemSize);
    }
  }, []
  );


  const renderVirtualList = () => {
    return (
      <>
        <VirtualList
          id="my-list"
          width='100%'
          height={600}
          itemCount={props.items.length}
          itemSize={itemHeight}
          onScroll={(top, event) => {
            let pageOffset = event.srcElement.scrollHeight;
            let offset = event.srcElement.offsetHeight + top;

            // only fire if we're at the bottom of the page
            if (offset >= pageOffset) {
              props.fetchMoreData();
            }
          }}
          renderItem={({ index, style }) => {
            let item = props.items[index];
            return (
              <React.Fragment key={index}>
                <SwipeListItem
                  style={style}
                  threshold=".25"
                  actions={item.actions}
                  key={index}>
                  <ListItem id={index} item={item} />
                </SwipeListItem>
              </React.Fragment>
            );
          }} />
        {props.isFetching ? <SpinWrap><Spinner color="primary" size="lg" /></SpinWrap> : null}
      </>
    );
  };

  return (
    <>
      {
        props.virtualize ?
          renderVirtualList() :
          <div id="my-list" className="text-left">
            {props.items.map((item, idx) => {
              return item.actions.length > 0 ?
                (<SwipeListItem
                  threshold=".25"
                  actions={item.actions}
                  key={item.id}>
                  <ListItem item={item} />
                </SwipeListItem>) :
                (<ListItem key={idx} item={item} />);
            })}
          </div>
      }
    </>
  );
}

export default List;
