import React from 'react';
import {FaBars} from 'react-icons/fa';
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
    return (
      <>
        <Nav>
          <NavbarContainer>
            <NavLogo to="/">GameConnect</NavLogo>
            <MobileIcon>
                <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks to="/">Home</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="community">Community</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="about">About</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="support">Support</NavLinks>
              </NavItem>
            </NavMenu>
            <NavBtn>
              <NavBtnLink to="/signin">Sign In</NavBtnLink>
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </>
    );
};

export default Navbar;
