import React from 'react';
import styled from 'styled-components';
import { Input } from 'reactstrap';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center !important;
  justify-content: space-between;

  border-bottom: 1px solid var(--mediumGray) !important;
  color: var(--sherpaBlue);

  select {
    color: inherit !important;
    -webkit-appearance:     none;
    -moz-appearance:        none;
    -ms-appearance:         none;
    -o-appearance:          none;
    appearance:             none;
    }
  }
`;

function InputSelect(props) {
  return (
    <Wrapper>
      <Input type='select' {...props}>
        {props.children}
      </Input>
      {props.icon}
    </Wrapper>
  );
}

export default InputSelect;
