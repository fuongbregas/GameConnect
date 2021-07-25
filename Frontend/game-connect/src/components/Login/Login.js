import React from 'react';
import {Link} from 'react-router-dom';
import './Login.css';

const Login = () => {
    return (
        <>
          <div>
            <div className="form-wrap">
              <Link className="icon" to="/">GameConnect</Link>
              <div className="form-content">
                <form className="form" action="#">
                  <h1 className="form-h1">Sign in to your account</h1>
                  <label className="form-label" htmlFor="for">Email</label>
                  <input className="form-input" type="email" required />
                  <label className="form-label" htmlFor="for">Password</label>
                  <input className="form-input" type="password" required />
                  <button className="button" type="submit">Continue</button>
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
