import axios from 'axios';
import {useRef, React, useState} from 'react';
import { useHistory } from 'react-router';
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
import { Error } from './RegisterFormElements';

const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const history = useHistory();
    const [error, setError] = useState("");

    const registerClick = async (e) => {
      e.preventDefault();

      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      console.log(user);

      try {
        await axios.post("/backend/auth/register", user);
        history.push('/signin');
      }
      catch (err) {
        console.log(err)
        setError("Email or Username already existed!");
      }

    };

    return (
        <>
          <Container>
            <FormWrap>
              <Icon to="/">GameConnect</Icon>
              <FormContent>
                <Form onSubmit={registerClick}>
                  <FormH1>Create a New Account</FormH1>
                  <FormLabel htmlFor="for">Username</FormLabel>
                  <FormInput type="text" required ref={username}/>
                  <FormLabel htmlFor="for">Email</FormLabel>
                  <FormInput type="email" required ref={email}/>
                  <FormLabel htmlFor="for">Password</FormLabel>
                  <FormInput type="password" required ref={password} minLength='6'/>
                  <FormLabel htmlFor="for">
                    <FormInput type="checkbox"/> Remember Me
                  </FormLabel>
                  <FormButton type="submit">Sign Up</FormButton>
                  <Text><TextLink to='/signin'>Login to Account</TextLink></Text>
                  {(error !== "") ? <Error>{error}</Error>: ""}
                </Form>
              </FormContent>
            </FormWrap>
          </Container>
        </>
    );
};

export default Register;