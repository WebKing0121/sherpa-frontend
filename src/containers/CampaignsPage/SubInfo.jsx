import React from 'react';
import Icon from '../../components/Icon';
import styled from 'styled-components';

const Holster = styled.div`
  display: flex;
  margin-top: var(--pad3);
`;
const Item = styled.div`
  display: flex;
  align-items: baseline;
  font-size: 1rem;
  line-height: 1.25;
  font-weight: bold;

  color: ${props => props.color === "priority" ? "var(--orange)" : "currentColor"};

  &[disabled] {
    color: var(--mediumGray);
    img {
      opacity: .2;
    }
  }

  &:first-child {
    margin-right: var(--pad6);
  }

  img {
    margin-right: 4px;
  }
`;

export default function SubInfo(props) {
  const lDisabled = props.data.totalLeads === 0;
  const pDisabled = props.data.priorityCount === 0;

  return (
    <Holster>
      <Item disabled={lDisabled}><Icon name="person" width="12px" />{props.data.totalLeads} Leads</Item>
      <Item color="priority" disabled={pDisabled}><Icon name="priority" width="11px" />{props.data.priorityCount} Priority</Item>
    </Holster>
  );
}
