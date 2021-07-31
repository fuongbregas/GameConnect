import axios from 'axios';
import {useContext, useRef, React, useState} from 'react';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import './Register.css';

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
        await axios.post("/backend/register", user);
        history.push('/Signin');
      }
      catch (err) {
        console.log(err)
        setError("This account already exists!");
      }

    };

    return (
        <>
          <div>
            <div className="form-wrap">
              <Link className="icon" to="/">GameConnect</Link>
              <div className="form-content">
                <form className="form" onSubmit={registerClick}>
                  <h1 className="form-h1">Create a New Account</h1>
                  <label className="form-label" htmlFor="for">Username</label>
                  <input className="form-input" ref = {username} type="text" required />

                  <label className="form-label" htmlFor="for">Email</label>
                  <input className="form-input" ref = {email} type="email" required />

                  <label className="form-label" htmlFor="for">Password</label>
                  <input className="form-input" ref = {password} type="password" required />

                  <label className="form-label" htmlFor="for">
                    <input type="checkbox" name="remember" /> Remember me
                  </label>
                  <button className="button" type="submit">Sign Up</button>
                  <span className="text"><Link to='/signin' className="nav-links">Login to Account</Link></span>
                  {(error !== "") ? <div className="error">{error}</div>: ""}
                </form>
              </div>
            </div>
          </div>
        </>
    );
};

export default Register;
