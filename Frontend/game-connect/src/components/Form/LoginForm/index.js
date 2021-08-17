import {useContext, useRef, React, useState} from 'react';
import {loginCall} from '../../../APICalls';
import { 
  Container, 
  FormWrap, 
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  Text,
  TextLink
} from '../FormElements';
import { Error } from './LoginFormElements';

import {AuthContext} from '../../../context/AuthContext';
import {CircularProgress} from '@material-ui/core';
import {ResetState} from '../../../context/AuthActions';

const Login = () => {
    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);
    const [err, setErr] = useState('');

    const loginClick = (e) => {
      e.preventDefault();

      loginCall (
        {email: email.current.value, 
         password: password.current.value}, 
         dispatch);
         
      setErr(error);
      dispatch(ResetState());
    };

    return (
        <>
          <Container>
            <FormWrap>
              <Icon to="/">GameConnect</Icon>
              <FormContent>
                <Form onSubmit={loginClick}>
                  <FormH1>Sign in to your account</FormH1>
                  <FormLabel htmlFor="for">Email</FormLabel>
                  <FormInput type="email" required ref={email}/>
                  <FormLabel htmlFor="for">Password</FormLabel>
                  <FormInput type="password" required ref={password}/>
                  <FormButton type="submit" disabled={isFetching}>
                    {isFetching? <CircularProgress size = "20px"/> : "Continue"} 
                  </FormButton>
                  <div>
                    { err === 418 ? <Error> The account is terminated </Error> 
                    : err === 400 ? <Error> Error logging in, please try again.</Error>
                    : err === 404 ? <Error> Error logging in, please try again.</Error>
                    : null}
                  </div>
                  <Text><TextLink to='/resetpass'>Forgot Password</TextLink></Text>
                  <Text><TextLink to='/signup'>Create New Account</TextLink></Text>
                </Form>
              </FormContent>
            </FormWrap>
          </Container>
        </>
    );
};

export default Login;