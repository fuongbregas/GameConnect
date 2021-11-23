import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { 
    SidebarContainer, 
    Icon, 
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrap,
    SidebarRoute
} from './SidebarElements';

const Sidebar = ({isOpen, toggle}) => {
    const {user} = useContext(AuthContext);
    // TEST: comment previous line, uncomment next line
    //const user = "userA";
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
          <Icon onClick={toggle}>
            <CloseIcon />
          </Icon>
          <SidebarWrapper>
            <SidebarMenu>
              <SidebarLink to="/">Home</SidebarLink>
              <SidebarLink to="/community">Community</SidebarLink>
              <SidebarLink to="/about">About</SidebarLink>
              {user ? <SidebarLink to={`/profile/${user}`}>Profile</SidebarLink> : null}
              <SidebarLink to="/support">Support</SidebarLink>
              {user ? <SidebarLink to="/message">Message</SidebarLink> : null}
            </SidebarMenu>
            <SideBtnWrap>
              {(user) ? <SidebarRoute to="/signoff">Sign Off</SidebarRoute> 
              : <SidebarRoute to="/signin">Sign In</SidebarRoute>}
            </SideBtnWrap>
          </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar