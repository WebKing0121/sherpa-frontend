import React from 'react';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

const SpinWrap = styled.div`
  text-align: center;
  padding: var(--pad8);
  margin-top: ${props => props.topPad ? "calc(31px + 5vw + 1rem)" : 0};
  
  [class*="spinner"] {
    width: 4rem;
    height: 4rem;
    border-width: .4em;
  }
`;

const NoResults = styled.p`
  padding: var(--pad3);
`;

const whenLoadingResults = (status, results) => (status === "" || status === "Fetching") && results.length === 0;

const whenNoResults = (status, results) => results.length === 0 && status === "Success";

// TODO: Cleanup Redux Actions to settle on an API that this component
// can use to make a generic data-loader component
export const DataLoader = (props) => {
  let {
    data, status,
    emptyResultsMessage = 'No Results Found',
    renderData } = props;

  return (
    <>
      {whenLoadingResults(status, data) ?
        (<SpinWrap topPad={props.fullPage}><Spinner color="primary" /></SpinWrap>) :
        (whenNoResults(status, data) ?
          (<NoResults> {emptyResultsMessage}</NoResults>) :
          (renderData()))}
    </>
  );
};
