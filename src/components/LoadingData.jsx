import React from 'react';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

const SpinWrap = styled.div`
  text-align: center;
  padding: var(--pad8);

  [class*="spinner"] {
    width: 4rem;
    height: 4rem;
    border-width: .4em;
  }
`;

const whenLoadingResults = (status, results) => status === "Fetching" && results.length === 0;

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
        (<SpinWrap><Spinner color="primary"/></SpinWrap>) :
        (whenNoResults(status, data) ?
          (<p> {emptyResultsMessage}</p>) :
          (renderData()))}
    </>
  );
};
