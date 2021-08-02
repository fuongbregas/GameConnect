import {useContext, useRef, React} from 'react';
import {Link} from 'react-router-dom';
import './Login.css';
import {loginCall} from '../../APICalls';
import {AuthContext} from '../../context/AuthContext';
import {CircularProgress} from '@material-ui/core';

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

      console.log("Check for user: " + user);
    };
    
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
                  <button className="button" type="submit">
                    {isFetching? <CircularProgress size = "20px"/> : "Continue"} 
                  </button>
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
