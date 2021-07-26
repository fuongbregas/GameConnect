import {useContext, useRef, React} from 'react';
import {Link} from 'react-router-dom';
import './Register.css';

const Register = () => {

    const email = useRef(null);
    const password = useRef(null);
    
    const registerClick = (e) => {
      e.preventDefault();
      
    };

    return (
        <>
          <div>
            <div className="form-wrap">
              <Link className="icon" to="/">GameConnect</Link>
              <div className="form-content">
                <form className="form" action="#">
                  <h1 className="form-h1">Create a New Account</h1>
                  <label className="form-label" htmlFor="for">Username</label>
                  <input className="form-input" type="text" required />
                  <label className="form-label" htmlFor="for">Email</label>
                  <input className="form-input" type="email" required />
                  <label className="form-label" htmlFor="for">Password</label>
                  <input className="form-input" type="password" required />
                  <label className="form-label" htmlFor="for">
                    <input type="checkbox" name="remember" /> Remember me
                  </label>
                  <button className="button" type="submit">Sign Up</button>
                  <span className="text"><Link to='/signin' className="nav-links">Login to Account</Link></span>
                </form>
              </div>
            </div>
          </div>
        </>
    );
};

export default Register;
