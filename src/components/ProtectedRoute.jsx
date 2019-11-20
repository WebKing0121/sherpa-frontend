import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export const ProtectedRoute = (props) => {
  const { is_authenticated, path, component } = props;

  if (is_authenticated) {
    return (
      <Route path={path} component={component} />
    );
  }

  return <Redirect to="/login" />;
};
