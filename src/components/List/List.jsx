import React from 'react';
import ListItem from './ListItem';
import SwipeListItem from '../SwipeableList/SwipeableListItem';
import { maxMobileWidth } from '../../helpers/variables';

function List(props) {
  const isMobile = window.innerWidth < maxMobileWidth;

  const getItem = (item, idx) => {
    let itm = <ListItem key={idx} item={item} actions={item.actions} />;
    if (isMobile && item.actions.length > 0) {
      itm = (
        <SwipeListItem threshold='.25' actions={item.actions} key={idx}>
          <ListItem item={item} />
        </SwipeListItem>
      );
    }
    return itm;
  };

  return (
    <>
      <div id='my-list' className='text-left'>
        {props.items.map((item, idx) => getItem(item, idx))}
      </div>
    </>
  );
}

export default List;
