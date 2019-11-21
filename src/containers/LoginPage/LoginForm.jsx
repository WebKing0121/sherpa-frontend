import React, { useState } from 'react';

export default function LoginForm(props) {
  // state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { submit, formError } = props;

  // onchange handlers
  const changeUsername = (e) => setUsername(e.target.value);
  const changePWHandler = (e) => setPassword(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    submit(username, password);
  };

  return (
    <div>
      <div>Welcome back.</div>
      {formError ? <p>{formError}</p> : null}
      <div>
        <form onSubmit={onSubmit}>
          <input name="username" value={username} onChange={changeUsername} />
          <input name="password" type="password" value={password} onChange={changePWHandler} />
          <input type="submit" disabled={!username || !password} />
        </form>
      </div>
    </div>
  );
}
