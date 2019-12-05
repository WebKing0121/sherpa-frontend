import React from 'react';
import styled from 'styled-components';

const StyledIndicator = styled.span`
  color: var(--darkGray);
`;

export default function Indicator(props) {
  const timeSent = new Date(props.time).toLocaleTimeString('en-US', {
    hour12: true,
    hour: "numeric",
    minut: "numeric"
  });

  return (
    <StyledIndicator>
      { timeSent }
    </StyledIndicator>
  );
}
