import React from 'react';
import { Button } from 'reactstrap';

function baseBtn(props) {
  return (
    <Button {...props}>
      {props.children}
    </Button>
  );
}

export default baseBtn;
