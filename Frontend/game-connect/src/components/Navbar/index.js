import React, { useState, useContext } from 'react';
import {useLocation} from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { GiMouse } from "react-icons/gi";
import { Sidebar } from '../';
import { AuthContext } from '../../context/AuthContext';
import { 
  Nav, 
  NavbarContainer, 
  NavLogo, 
  MobileIcon, 
  NavMenu,
  NavItem, 
  NavLinks,
  NavBtn,
  NavBtnLink 
} from './NavbarElements';

const Navbar = () => {
    const [isOpen, setisOpen] = useState(false);
    const {user} = useContext(AuthContext);

    const toggle = () => {
      setisOpen(!isOpen);
    }

    const location = useLocation();
    if(location.pathname === "/signin" || location.pathname === "/signup" || location.pathname === "/resetpass") return null;

    return (
      <>
        <Sidebar isOpen={isOpen} toggle={toggle}/>
        <Nav>
          <NavbarContainer>
            <NavLogo to="/"><GiMouse />GameConnect</NavLogo>
            <MobileIcon onClick={toggle}>
                <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks to="/">Home</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/community">Community</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/about">About</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/profile">Profile</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/support">Support</NavLinks>
              </NavItem>
              {(user) ? 
              <NavItem>
                <NavLinks to="/message">Message</NavLinks>
              </NavItem> : null}
              
            </NavMenu>
            <NavBtn>
              {(user) ? <NavBtnLink to="/signoff">Sign Off</NavBtnLink> 
              : <NavBtnLink to="/signin">Sign In</NavBtnLink>}
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </>
    );
};

export default Navbar;