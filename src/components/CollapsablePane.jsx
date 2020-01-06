import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import { Collapse } from 'reactstrap';

const Pane = styled.div`
  overflow: hidden;
`;

const ToggleHeader = styled.h3`
  padding: var(--pad4) var(--pad3);
  background: var(--ghostBlue);
  color: var(--darkNavy);
  margin: 0;
  display: flex;
  justify-content: space-between;
`;

const Arrow = styled.div`
  img {
    transition: transform 0.3s;
    transform: ${props => (props.isOpen ? 'rotate(-90deg)' : 'rotate(90deg)')};
  }
`;

function CollapsablePane(props) {
  const { toggle, isOpen, header, children } = props;
  return (
    <Pane>
      <ToggleHeader className='fw-bold' onClick={toggle}>
        {header}
        <Arrow isOpen={isOpen}>
          <Icon name='arrow' width='10px' />
        </Arrow>
      </ToggleHeader>
      <Collapse isOpen={isOpen}>{children}</Collapse>
    </Pane>
  );
}

export default CollapsablePane;
