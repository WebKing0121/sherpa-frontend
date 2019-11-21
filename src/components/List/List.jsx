import React from 'react';
import { ListGroup } from 'reactstrap';
import Item from './ListItem';

function List() {
  return (
    <ListGroup className="text-left">
      <Item status="Dead"/>
      <Item/>
      <Item status="Refer to Agent"/>
      <Item/>
    </ListGroup>
  );
}

export default List;
