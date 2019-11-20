import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../store/Auth/actions';
import { authError, isAuthenticated } from '../../store/Auth/selectors';


export default function LoginPage(props) {
  // state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const formError = useSelector(authError);
  const is_authenticated = useSelector(isAuthenticated);
  const dispatch = useDispatch();

  // redirect if authenticated
  if (is_authenticated) return <Redirect to="/" />;

  // onchange handlers
  const changeUsername = (e) => setUsername(e.target.value);
  const changePWHandler = (e) => setPassword(e.target.value);

  // submit handler
  const submit = (e) => {
    e.preventDefault();
    dispatch(authenticate(
      { username, password },
      () => props.history.push('/Styles')
    ));
  };

  return (
    <div>
      <div>Welcome back.</div>
      {formError ? <p>{formError}</p> : null}
      <div>
        <form onSubmit={submit}>
          <input name="username" value={username} onChange={changeUsername} />
          <input name="password" type="password" value={password} onChange={changePWHandler} />
          <input type="submit" disabled={!username || !password} />
        </form>
      </div>
    </div>
  );
}
