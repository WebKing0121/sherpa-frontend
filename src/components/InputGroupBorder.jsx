import React from 'react';
import styled from 'styled-components';
import { InputGroup } from 'reactstrap';

const StyledInputGroup = styled(InputGroup)`
  border-bottom: 1px solid var(--mediumGray) !important;
`;

function InputGroupBorder(props) {
  return (
    <StyledInputGroup className="inputGroup">
      {props.children}
    </StyledInputGroup>
  );
}

export default InputGroupBorder;
