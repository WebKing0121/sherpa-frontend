import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import Icon from './Icon';
import TabNav from './TabNav';
import { history } from '../history';

const StyledHeader = styled.div`
  background: var(--tealBlueGradientFlip);
  padding: var(--pad4) var(--pad3) ${props => props.toggleTab ? "0" : null};

  @media (max-width: 768px) {
    margin-top: 60px;
    /* navbar icon + navlink padding + nav padding */
    margin-top: calc(31px + 5vw + 1rem);
  }
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
    history.goBack();
  }

  return (
    <StyledHeader {...props}>
      <h1 className="text-white text-left m-0">
        {props.children}
      </h1>

      {props.data.hasBackButton && <BackButton className="text-dark textL pl-0" color="link" onClick={back}><BackArrowHolster><BackArrow width="auto" name="arrowDark" /></BackArrowHolster>{props.data.fromText}</BackButton>}

      {props.toggleTab && <TabNav data={props.data.tabs} activeTab={props.activeTab} toggleTab={props.toggleTab} />}
    </StyledHeader>
  );
}

export default TabbedHeader;
