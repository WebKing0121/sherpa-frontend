import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = props => {
  const { is_auth, path, component } = props;

  if (is_auth) {
    return <Route path={path} component={component} />;
  }

  return <Redirect to="/login" />;
};
