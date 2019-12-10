import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon.jsx';
import IconHolster from './IconHolster.jsx';
import { Link } from 'react-router-dom';

import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';

const StyledItem = styled(ListGroupItem)`
  padding: var(--pad2) var(--pad3) !important;
  width: 100%;
  height: 100%;
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid rgba(0,0,0,0.125);
`;

const SubInfo = styled.div`
  color: var(--gray);
`;

const MainInfo = styled(ListGroupItemText)`
  line-height: 1.4 !important;
  margin: 0;
  margin-top: var(--pad1) !important;
`;

const ItemLink = styled(Link)`
  &:hover,
  &:active {
    &:after{
      background: var(--darkNavy);
      opacity: .03;
    }
  }
`;

const ItemIndicator = styled.h4`
  margin: 0;
`;

const ItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: var(--pad1);
`;
const ItemName = styled(ListGroupItemHeading)`
  font-weight: ${props => props.isBold ? "900" : "400"};
`;
const StatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
`;

const ItemBody = styled.div`
`;
const ItemContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .itemBody {
    flex-basis: 100%;
    flex-shrink: 1;
  }
`;

function ListItem(props) {
  return (
    <StyledItem style={props.style}>
      <ItemContent>
        <IconHolster icon={props.item.icon} readable={props.item.readable} isRead={props.item.isRead} />
        <ItemBody className="itemBody">
          <ItemHeader>
            <ItemName className="itemName m-0" >{props.item.name}</ItemName>
            <StatusWrapper className="d-flex">
              <ItemIndicator className="textM">{props.item.indicator}</ItemIndicator>
              <ItemLink to={props.item.link} className="stretched-link"><Icon margin="ml-2" width="10px" name="arrow" alt="next" /></ItemLink>
            </StatusWrapper>
          </ItemHeader>

          <SubInfo className="textM m-0">{props.item.subInfo}</SubInfo>
          <MainInfo className="textL">{props.item.mainInfo}</MainInfo>
        </ItemBody>
      </ItemContent>
    </StyledItem>
  );
}

export default ListItem;