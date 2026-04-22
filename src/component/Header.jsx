import React, { useState } from 'react';
import { 
  HeaderButton, 
  HeaderContainer, 
  HeaderLogo, 
  HeaderLogoIcon, 
  HeaderAppName, 
  HeaderNav, 
  NavButton, 
  MobileMenuToggle 
} from '../styles/header_style';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../store/userSlice';
import { FaKey, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { partyId, role } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const removeUser = () => {
    dispatch(userAction.removeFromUserLogin());
    closeMenu();
  };

  return (
    <HeaderContainer>
      <HeaderLogo>
        <HeaderLogoIcon><FaKey style={{ "color": "white" }} /></HeaderLogoIcon>
        <HeaderAppName>Sphinx</HeaderAppName>
      </HeaderLogo>

      {partyId !== null && (
        <>
          {/* Hamburger Icon for Mobile */}
          <MobileMenuToggle onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuToggle>

          {/* Pass $isOpen to the styled nav */}
          <HeaderNav $isOpen={isOpen}>
            {role === 'SPHINX_ADMIN' && (
              <>
                <HeaderButton to="/adduser" onClick={closeMenu}><FaUserPlus /> user / admin</HeaderButton>
                <HeaderButton to="/userlist" onClick={closeMenu}>Users</HeaderButton>
                <HeaderButton to="/questionList" onClick={closeMenu}>Questions</HeaderButton>
                <HeaderButton to="/topic" onClick={closeMenu}>Topics</HeaderButton>
                <HeaderButton to={'/admin-dashboard'} onClick={closeMenu}>Home</HeaderButton>
              </>
            )}
            {role === 'SPHINX_USER' && (
              <>
                <HeaderButton to="/userlist" onClick={closeMenu}>Reports</HeaderButton>
                <HeaderButton to="/completedexam" onClick={closeMenu}>Completed exam</HeaderButton>
                <HeaderButton to="/assignedexam" onClick={closeMenu}>Assigned exam</HeaderButton>
                <HeaderButton to={'/user-dashboard'} onClick={closeMenu}>Home</HeaderButton>
              </>
            )}

            <NavButton style={{ color: `white` }} to={'/'} onClick={removeUser}>
              Logout
            </NavButton>
          </HeaderNav>
        </>
      )}
    </HeaderContainer>
  );
};

export default Header;