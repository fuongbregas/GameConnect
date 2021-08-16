import {useContext, useRef, React, useState} from 'react';
import {Link} from 'react-router-dom';
import './Login.css';
import {loginCall} from '../../APICalls';
import {AuthContext} from '../../context/AuthContext';
import {CircularProgress} from '@material-ui/core';
//import { useHistory } from 'react-router';

const Login = () => {
    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);
    
    
    const loginClick = (e) => {
      e.preventDefault();
      
      loginCall (
        {email: email.current.value, 
         password: password.current.value}, 
         dispatch);  
    };
    console.log(error)
    console.log(user);
    
    return (
        <>
          <div>
            <div className="form-wrap">
              <Link className="icon" to="/">GameConnect</Link>
              <div className="form-content">
                <form className="form" onSubmit={loginClick}>
                  <h1 className="form-h1">Sign in to your account</h1>
                  
                  <label className="form-label" htmlFor="for">Email</label>
                  <input className="form-input" type="email" required ref={email} />
                  <label className="form-label" htmlFor="for">Password</label>
                  <input className="form-input" type="password" required ref={password}/>
                  <button className="button" type="submit" disabled={isFetching}>
                    {isFetching? <CircularProgress size = "20px"/> : "Continue"} 
                  </button>
                  <div>
                    { error === 418 ? <p className = "failedlogin"> The account is terminated </p> 
                    : error === 400 ? <p className = "failedlogin"> Error logging in, please try again.</p>
                    : error === 404 ? <p className = "failedlogin"> Error logging in, please try again.</p>
                    : null}
                  </div>                  
                  <span className="text"><Link to='/forgot' className="nav-links">Forgot Password</Link></span>
                  <span className="text"><Link to='/signup' className="nav-links">Create New Account</Link></span>
                </form>
              </div>
            </div>
          </div>
        </>
    );
};

export default Login;
