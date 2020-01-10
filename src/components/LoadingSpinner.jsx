import React from 'react';
import { Spinner } from 'reactstrap';

export const LoadingSpinner = props => {
  const { color = 'primary', isLoading = false } = props;

  return isLoading ? <Spinner data-test='loading-spinner' color={color} /> : props.renderContent();
};
