import React from 'react';
import styled from 'styled-components';
import { InputGroup } from 'reactstrap';

const StyledInputGroup = styled(InputGroup)`
  --border: 1px solid var(--mediumGray) !important;

  border-top: ${props => props.border === "full" ? "var(--border)" : "0"};
  border-right: ${props => props.border === "full" ? "var(--border)" : "0"};
  border-bottom: var(--border);
  border-left: ${props => props.border === "full" ? "var(--border)" : "0"};

  textarea {
    padding-left: var(--pad2);
    padding-right: var(--pad2);
  }

  @media (min-width: 768px) {
    --border: 2px solid var(--mediumGray) !important;
  }
`;

function InputGroupBorder(props) {
  return (
    <StyledInputGroup border={props.border} className="inputGroup">
      {props.children}
    </StyledInputGroup>
  );
}

export default InputGroupBorder;
