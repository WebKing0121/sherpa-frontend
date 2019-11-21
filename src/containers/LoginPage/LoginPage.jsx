import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../store/Auth/actions';
import { authError, isAuthenticated } from '../../store/Auth/selectors';

import LoginForm from './LoginForm';

export default function LoginPage(props) {
  const formError = useSelector(authError);
  const is_authenticated = useSelector(isAuthenticated);
  const dispatch = useDispatch();

  // redirect if authenticated
  if (is_authenticated) return <Redirect to="/" />;

  // submit handler
  const submit = (username, password) => {
    dispatch(authenticate(
      { username, password },
      () => props.history.push('/')
    ));
  };

  return (
    <LoginForm submit={submit} formError={formError} />
  );
}
