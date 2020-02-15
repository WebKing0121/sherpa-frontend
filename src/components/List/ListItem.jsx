import React from 'react';
import styled from 'styled-components';
import IconHolster from './IconHolster.jsx';

import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Link } from 'react-router-dom';

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

  &:hover {
    background-color: ${props => props.islink ? "#ffffffa5" : "white"};
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
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 60vw;
  overflow: hidden;
  @media (min-width: 768px) {
    max-width: 40vw;
    width: 100%;
  }
`;
const StatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: var(--pad2) var(--pad3);

  .itemBody {
    flex: 4 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .desktopCallouts {
    flex-grow: 2;
  }

  @media (min-width: 768px) {
    padding: calc(1.5 * var(--pad1)) var(--pad2);
  }
`;

function ListItem(props) {
  return (
    <StyledItem islink={props.item.link ? 1 : 0} style={props.style} data-test='list-item'>
      <ItemContent id={props.id}>
        <IconHolster icon={props.item.icon} readable={props.item.readable} isRead={props.item.isRead} />
        <div className='itemBody'>
          <ItemHeader data-test='list-item-header'>
            <ItemName className='itemName m-0'>{props.item.name}</ItemName>
            <StatusWrapper className='d-flex'>{props.item.statusWrapper}</StatusWrapper>
          </ItemHeader>

          {props.item.subInfo && (
            <SubInfo data-test='list-item-sub-info' className='textM m-0'>
              {props.item.subInfo}
            </SubInfo>
          )}
          {props.item.mainInfo && (
            <MainInfo data-test='list-item-main-info' className='textL'>
              {props.item.mainInfo}
            </MainInfo>
          )}
        </div>
        {props.item.desktopCallouts ? props.item.desktopCallouts : null}
        {props.item.desktopKebab ? props.item.desktopKebab : null}
        {props.item.link && (
          <Link to={props.item.link} className="stretched-link"></Link>

        )}
      </ItemContent>
    </StyledItem>
  );
}

export default ListItem;
