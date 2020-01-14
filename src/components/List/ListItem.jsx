import React from 'react';
import styled from 'styled-components';
import IconHolster from './IconHolster.jsx';

import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

const StyledItem = styled(ListGroupItem)`
  padding: 0 !important;
  width: 100%;
  height: 100%;
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);

  @media (min-width: 768px) {
    border-radius: 8px !important;
    border: none;
    margin-bottom: var(--pad1);
  }
`;

const SubInfo = styled.div`
  color: var(--gray);
`;

const MainInfo = styled(ListGroupItemText)`
  line-height: 1.4 !important;
  margin: 0;
  margin-top: var(--pad1) !important;
`;

const ItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: var(--pad1);

  @media (min-width: 768px) {
    margin-bottom: var(--pad2);
  }
`;
const ItemName = styled(ListGroupItemHeading)`
  font-weight: ${props => (props.isBold ? '900' : '400')};
`;
const StatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
`;

const ItemBody = styled.div``;

const ItemContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: var(--pad2) var(--pad3);

  .itemBody {
    flex-basis: 100%;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    padding: calc(1.5 * var(--pad1)) var(--pad2);

    .itemBody {
      flex-basis: 40%;
    }
  }
`;

function ListItem(props) {
  return (
    <StyledItem style={props.style} data-test='list-item'>
      <ItemContent id={props.id}>
        <IconHolster icon={props.item.icon} readable={props.item.readable} isRead={props.item.isRead} />
        <ItemBody className='itemBody'>
          <ItemHeader>
            <ItemName className='itemName m-0'>{props.item.name}</ItemName>
            <StatusWrapper className='d-flex'>{props.item.statusWrapper}</StatusWrapper>
          </ItemHeader>

          {props.item.subInfo && <SubInfo className='textM m-0'>{props.item.subInfo}</SubInfo>}
          {props.item.mainInfo && <MainInfo className='textL'>{props.item.mainInfo}</MainInfo>}
        </ItemBody>
        {props.item.desktopCallouts ? props.item.desktopCallouts : null}
        {props.item.desktopKebab ? props.item.desktopKebab : null}
      </ItemContent>
    </StyledItem>
  );
}

export default ListItem;
