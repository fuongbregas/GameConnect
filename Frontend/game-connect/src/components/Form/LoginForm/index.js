import {useContext, useRef, React} from 'react';
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

import {AuthContext} from '../../../context/AuthContext';
import {CircularProgress} from '@material-ui/core';
//import { useHistory } from 'react-router';

const Login = () => {
    const email = useRef();
    const password = useRef();
    const {user, isFetching, dispatch} = useContext(AuthContext);
    //const history = useHistory();
    
    const loginClick = (e) => {
      e.preventDefault();
      
      loginCall (
        {email: email.current.value, 
         password: password.current.value}, 
         dispatch);     
      
    };
    console.log(user);
    
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
