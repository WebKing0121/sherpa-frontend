import React from 'react';
import { ListGroup } from 'reactstrap';
import ListItem from './ListItem';

function List(props) {
  const campaign = {};

  return (
    <ListGroup className="text-left">
      <ListItem item={campaign}/>
      <ListItem/>
      <ListItem status="Refer to Agent"/>
      <ListItem/>
    </ListGroup>
  );
}

export default List;
