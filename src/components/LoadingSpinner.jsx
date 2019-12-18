import React from 'react';
import { Spinner } from 'reactstrap';


export const LoadingSpinner = (props) => {
  const { color = "primary", isLoading = false } = props;

  return isLoading ? <Spinner color={color} /> : props.renderContent();
};
