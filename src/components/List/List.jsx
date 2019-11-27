import React from 'react';
import ListItem from './ListItem';
import SwipeListItem from '../SwipeableList/SwipeableListItem';

function List(props) {

  const actions = [
    {
      icon: "verified",
      name: "Verified",
      link: "#",
      background: "green"
    },
    {
      icon: "dnc",
      name: "DNC",
      link: "#",
      background: "white"
    },
    {
      icon: "priority",
      name: "Priority",
      link: "#",
      background: "orange"
    },
    {
      icon: "qualified",
      name: "Qualified",
      link: "#",
      background: "purple"
    }
  ]

  return (
    <div className="text-left">
      {props.items.map((item, idx) => <SwipeListItem threshold=".25" actions={actions} key={idx}><ListItem item={item} /></SwipeListItem>)}
    </div>
  );
}

export default List;
