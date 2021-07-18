import React, { Component } from 'react';
import { Button } from '../Button/Button';
import {MenuItems} from './MenuItems';
import { Link} from 'react-router-dom';
import './Navbar.css';


class Navbar extends Component {
    state = {clicked: false};

    handleClick = () => {
        this.setState({clicked: !this.state.clicked});
    }

    render() {
        return(
            <nav className="NavbarItems">
                <Link to="/" className="navbar-logo"><i className="fab fa-react"></i> GameConnect</Link>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                          <li key={index}>
                              <Link to={item.url} className={item.cName}>{item.title}</Link>
                          </li>  
                        )
                    })}
                </ul>
                <Button>Login</Button>
            </nav>
        )
    }
}

export default Navbar;