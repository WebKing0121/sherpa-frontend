import React from 'react';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';
import { Fetching, Success, FetchError } from '../variables';

const SpinWrap = styled.div`
  text-align: center;
  padding: var(--pad8);

  [class*='spinner'] {
    width: 4rem;
    height: 4rem;
    border-width: 0.4em;
  }

  @media (max-width: 768px) {
    margin-top: 60px;
    /* navbar icon + navlink padding + nav padding */
    margin-top: ${props => (props.topPad ? 'calc(31px + 5vw + 1rem)' : 0)};
  }
`;

const NoResults = styled.p`
  padding: var(--pad3);
`;

const whenLoadingResults = (status, results) =>
  (status === Fetching && !results.length) || (status === Fetching && results.length);

const whenNoResults = (status, results) => status === Success && !results.length;

const whenError = status => status === FetchError;

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

  const renderedResults = whenNoResults(status, data) ? (
    <NoResults> {emptyResultsMessage}</NoResults>
  ) : whenError(status) ? (
    <NoResults>{networkError}</NoResults>
  ) : (
    renderData()
  );

  return (
    <>
      {whenLoadingResults(status, data) ? (
        <SpinWrap topPad={fullPage} data-test='spinner'>
          <Spinner color='primary' />
        </SpinWrap>
      ) : (
        <div data-test='displayed-data'>{renderedResults}</div>
      )}
    </>
  );
};
