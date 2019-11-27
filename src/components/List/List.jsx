import React, { useEffect } from 'react';
import ListItem from './ListItem';
import VirtualList from 'react-tiny-virtual-list';
import SwipeListItem from '../SwipeableList/SwipeableListItem';


function List(props) {
  useEffect(() => {

    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !props.isFetching) {
        // you're at the bottom of the page
        props.fetchMoreData(props.nextPageUrl, props.isFetching);
      }
    };
    return () => window.onscroll = null;
  }, [props.nextPageUrl, props.isSearching]);
  return (
    <>
      {
        props.virtualize ? <VirtualList
          width='100%'
          height={600}
          itemCount={props.items.length}
          itemSize={150}
          renderItem={({ index, style }) => {
            let item = props.items[index];
            return (<SwipeListItem style={style} threshold=".25" actions={item.actions} key={index}><ListItem item={item} /></SwipeListItem>);
          }} /> :
          <div className="text-left">{props.items.map((item, idx) => <SwipeListItem threshold=".25" actions={item.actions} key={idx}><ListItem item={item} /></SwipeListItem>)}</div>
      }
    </>
  );
}

export default List;
