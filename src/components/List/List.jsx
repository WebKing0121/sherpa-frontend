import React from 'react';
import { ListGroup } from 'reactstrap';
import ListItem from './ListItem';

function List(props) {

  return (
    <ListGroup className="text-left">
      <ListItem item={props.item}/>
      <ListItem item={props.item}/>
      <ListItem item={props.item}/>
      <ListItem item={props.item}/>
    </ListGroup>
  );
}

export default List;
