import React from 'react';
import { Spinner } from 'reactstrap';


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
        (<Spinner color="primary" />) :
        (whenNoResults(status, data) ?
          (<p> {emptyResultsMessage}</p>) :
          (renderData()))}
    </>
  );
};
