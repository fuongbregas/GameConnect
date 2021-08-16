import React, { useState, useContext, Component } from 'react';
import { Button } from '../Button/Button';
import {MenuItems} from './MenuItems';
import { Link} from 'react-router-dom';
import './Navbar.css';

import {AuthContext} from '../../context/AuthContext'

const Navbar = () => {
    
    const [state, setState] = useState(false);
    
    

    const handleClick = () => {
        
        setState(!state);
    }

    
    return(
        <nav className="NavbarItems">
            <Link to="/" className="navbar-logo"><i className="fab fa-react"></i> GameConnect</Link>
            <div className="menu-icon" onClick={handleClick}>
                <i className={state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={state.clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link to={item.url} className={item.cName}>{item.title}</Link>
                        </li>  
                    )
                })}
            </ul>
            <Button>Sign In</Button>
        </nav>
    )
    
}

export default Navbar;