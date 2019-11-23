import React from 'react';
import { ListGroup } from 'reactstrap';
import ListItem from './ListItem';

function List(props) {

  return (
    <ListGroup className="text-left">
      {props.items.map((item, idx) => <ListItem key={idx} item={item} />)}
    </ListGroup>
  );
}

export default List;
