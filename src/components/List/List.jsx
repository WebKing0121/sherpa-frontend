import React from 'react';
import ListItem from './ListItem';
import SwipeListItem from '../SwipeableList/SwipeableListItem';

function List(props) {

  return (
    <>
      <div id="my-list" className="text-left">
        {props.items.map((item, idx) => {
          return item.actions.length > 0 ?
            (<SwipeListItem
              threshold=".25"
              actions={item.actions}
              key={idx}>
              <ListItem item={item} />
            </SwipeListItem>) :
            (<ListItem key={idx} item={item} />);
        })}
      </div>
    </>
  );
}

export default List;
