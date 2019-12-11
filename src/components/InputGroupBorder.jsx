import React from 'react';
import styled from 'styled-components';
import { InputGroup } from 'reactstrap';

const StyledInputGroup = styled(InputGroup)`
  --border: 1px solid var(--mediumGray) !important;

  border-top: ${props => props.full ? "var(--border)" : "0"};
  border-right: ${props => props.full ? "var(--border)" : "0"};
  border-bottom: var(--border);
  border-left: ${props => props.full ? "var(--border)" : "0"};

  textarea {
    padding-left: var(--pad2);
    padding-right: var(--pad2);
  }
`;

function InputGroupBorder(props) {
  return (
    <StyledInputGroup full={props.full} className="inputGroup">
      {props.children}
    </StyledInputGroup>
  );
}

export default InputGroupBorder;
