import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authenticate } from '../../store/Auth/actions';

export default function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const changeUsername = (e) => setUsername(e.target.value);
  const changePWHandler = (e) => setPassword(e.target.value);

  const submit = (e) => {
    e.preventDefault();
    dispatch(authenticate({ username, password }));
  };

  return (
    <div>
      <div>Welcome back.</div>
      <div>
        <form onSubmit={submit}>
          <input name="username" value={username} onChange={changeUsername} />
          <input name="password" value={password} onChange={changePWHandler} />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
