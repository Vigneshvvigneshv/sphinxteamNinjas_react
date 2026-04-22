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

      {(partyId!==null) &&
      <HeaderNav>
        {(role==='SPHINX_ADMIN') &&  
        <>
        <HeaderButton to="/adduser"><FaUserPlus/> user / admin</HeaderButton>
        <HeaderButton to="/userlist">Users</HeaderButton>
        <HeaderButton to="/questionList">Questions</HeaderButton>
        <HeaderButton to="/topic">Topics</HeaderButton>
        <HeaderButton to={'/admin-dashboard'}>Home</HeaderButton>
        </>
        }
         {(role==='SPHINX_USER') &&  
        <>
        <HeaderButton to="/completedexam">Completed exam</HeaderButton>
        <HeaderButton to="/assignedexam">Assinged exam</HeaderButton>
        <HeaderButton to={'/user-dashboard'}>Home</HeaderButton>
        </>
        }

           <NavButton style={{ color: `white` }} to={'/'} onClick={removeUser}>
              Logout
            </NavButton>
          </HeaderNav>
      
      }
    </HeaderContainer>
  );
};

export default Header;