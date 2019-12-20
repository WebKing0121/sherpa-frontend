import React from 'react';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';
import { Fetching, Success, FetchError } from '../variables';

const SpinWrap = styled.div`
  text-align: center;
  padding: var(--pad8);
  margin-top: ${props => (props.topPad ? 'calc(31px + 5vw + 1rem)' : 0)};

  [class*='spinner'] {
    width: 4rem;
    height: 4rem;
    border-width: 0.4em;
  }
`;

const NoResults = styled.p`
  padding: var(--pad3);
`;

const whenLoadingResults = (status, results) => {
  return (status === Fetching && results.length <= 0) || (status === Fetching && results.length > 0);
};

const whenNoResults = (status, results) => {
  return status === Success && results.length <= 0;
};

const whenError = status => {
  return status === FetchError;
};

// TODO: Cleanup Redux Actions to settle on an API that this component
// can use to make a generic data-loader component
export const DataLoader = props => {
  let {
    data,
    status,
    emptyResultsMessage = 'No Results Found',
    networkError = 'Cannot be displayed at this time.  Please try again later.',
    renderData,
    fullPage
  } = props;

  return (
    <>
      {whenLoadingResults(status, data) ? (
        <SpinWrap topPad={fullPage} data-test='spinner'>
          <Spinner color='primary' />
        </SpinWrap>
      ) : (
        <div data-test='displayed-data'>
          {whenNoResults(status, data) ? (
            <NoResults> {(whenError() && networkError) || emptyResultsMessage}</NoResults>
          ) : (
            renderData()
          )}
        </div>
      )}
    </>
  );
};
