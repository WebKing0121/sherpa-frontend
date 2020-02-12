import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--pad2);

  svg {
    margin-right: var(--pad1);
  }
`;

function SectionHeader(props) {
  return (
    <Wrapper>
      <h3 className="m-0">{props.title}</h3>
      {props.btn && props.btn}
    </Wrapper>
  );
}

export default SectionHeader;
