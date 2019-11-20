import React from 'react';
import styled from 'styled-components';
import arrow from '../assets/images/icons/arrow.svg';

import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';

const StyledItem = styled(ListGroupItem)`
  padding-top: var(--pad2) !important;
  padding-bottom: var(--pad2) !important;
`;

const SubInfo = styled(ListGroupItemText)`
  color: var(--gray);
`;

const MainInfo = styled(ListGroupItemText)`
  line-height: 1.4 !important;
`;

const ItemLink = styled.a`
  &:hover,
  &:active {
    &:after{
      background: var(--darkNavy);
      opacity: .03;
    }
  }
`;

const ItemStatus = styled.h4`
  color: var(--sherpaBlue);
  color: ${props => props.status === "Dead" ? "var(--gray)" : "var(--sherpaBlue)"};
  margin: 0;
`;

const ItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: var(--pad1);
`;

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
`;

function ListItem(props) {
  return (
    <StyledItem>
      <ItemHeader>
        <ListGroupItemHeading className="itemName fw-bold m-0">Tillie Maldonado</ListGroupItemHeading>
        <StatusWrapper className="d-flex">
          <ItemStatus status={props.status} className="textM">{props.status || "Initial Message Sent"}</ItemStatus>
          <ItemLink href="#" className="stretched-link"><img className="ml-2" src={arrow} alt="next"/></ItemLink>
        </StatusWrapper>
      </ItemHeader>

      <SubInfo className="textM">(970) 318-9788</SubInfo>
      <MainInfo className="textL m-0">1250 S Monaco Pkwy Apt 29<br/>Colorado Springs, CO 80916</MainInfo>
    </StyledItem>
  );
}

export default ListItem;
