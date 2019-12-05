import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import Icon from './Icon';
import TabNav from './TabNav';
import { history } from '../history';

const StyledHeader = styled.div`
  background: var(--tealBlueGradientFlip);
  padding: var(--pad4) var(--pad3) ${props => props.toggleTab ? "0" : null};
  margin-top: 70px;
`;

const BackArrow = styled(Icon)`
  height: 100%;
`;

const BackButton = styled(Button)`
  align-items: center;
`;

const BackArrowHolster = styled.div`
  display: inline-block;
  margin-right: .4em;

  img {
    margin-top: -3px;
  }
`;

function TabbedHeader(props) {

  const back = () => {
    history.push(props.prevRoute);
  }

  return (
    <StyledHeader {...props}>
      <h1 className="text-white text-left m-0">
        {props.children}
      </h1>

      {props.hasBackButton && <BackButton className="text-dark textL pl-0" color="link" onClick={back}><BackArrowHolster><BackArrow width="auto" name="arrowDark" /></BackArrowHolster>{props.fromText}</BackButton>}

      {props.toggleTab && <TabNav activeTab={props.activeTab} toggleTab={props.toggleTab} />}
    </StyledHeader>
  );
}

export default TabbedHeader;
