import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  background: var(--tealBlueGradientFlip);
  padding: var(--pad4) var(--pad3);
`;

function Header(props) {
  return (
    <StyledHeader {...props}>
      <h1 className="text-white text-left m-0">
      {props.children}
      </h1>
    </StyledHeader>
  );
}

export default Header;
