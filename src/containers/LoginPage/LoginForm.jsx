import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/sherpaLogo.png';
import InputGroupBorder from '../../components/InputGroupBorder.jsx';
import { Card, Input, Label, FormGroup, Button } from 'reactstrap';

const StyledCard = styled(Card)`
  padding: var(--pad5) var(--pad4);
`;
const LogoHolster = styled.div`
  padding-bottom: var(--pad5);
  text-align: center;
`;
const CardHeader = styled.h1`
  margin-bottom: var(--pad5);
`;
const FullWidth = styled.div`
  width: 100%;
`;
const Error = styled.p`
  color: var(--red);
  text-align: center;
  line-height: 1.2;
`;

export default function LoginForm(props) {
  // state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { submit, formError } = props;

  // onchange handlers
  const changeUsername = e => setUsername(e.target.value);
  const changePWHandler = e => setPassword(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    submit(username, password);
  };

  return (
    <FullWidth>
      <LogoHolster>
        <img src={logo} alt='Sherpa Logo' />
      </LogoHolster>
      <StyledCard className='text-center'>
        <CardHeader>Welcome back.</CardHeader>
        <div>
          <form className='text-left' onSubmit={onSubmit} data-test='login-form'>
            <FormGroup>
              <Label for='username'>Email</Label>
              <InputGroupBorder>
                <Input
                  name='username'
                  value={username}
                  onChange={changeUsername}
                  placeholder='Enter email address'
                  required
                />
              </InputGroupBorder>
            </FormGroup>
            <FormGroup>
              <Label for='password'>Password</Label>
              <InputGroupBorder>
                <Input
                  name='password'
                  type='password'
                  value={password}
                  onChange={changePWHandler}
                  placeholder='Enter Password'
                  required
                />
              </InputGroupBorder>
            </FormGroup>
            {formError ? <Error data-test='login-form-error'>{formError}</Error> : null}
            <Button
              className='mt-4'
              block
              size='lg'
              color='primary'
              type='submit'
              disabled={!username || !password}
            >
              Log In
            </Button>
          </form>
        </div>
      </StyledCard>
    </FullWidth>
  );
}
