import React from 'react';
import { Button } from 'reactstrap';

function BaseBtn(props) {
  return (
    <Button {...props}>
      {props.children}
    </Button>
  );
}

export default BaseBtn;
