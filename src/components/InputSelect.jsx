import React from 'react';
import styled from 'styled-components';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center !important;
  justify-content: space-between;

  border-bottom: 1px solid var(--mediumGray) !important;
  color: var(--sherpaBlue);


  select {
    color: inherit !important;
  }
`;

function InputSelect(props) {
  return (
    <Wrapper>
      <Input type="select" {...props}>
        {props.children}
      </Input>
      <FontAwesomeIcon icon="chevron-up" rotation={180}/>
    </Wrapper>
  );
}

export default InputSelect;
