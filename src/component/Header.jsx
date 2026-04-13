import { HeaderButton, HeaderContainer, HeaderLogo, HeaderLogoIcon, HeaderAppName, HeaderNav, NavButton } from '../styles/header_style'
import { useDispatch, useSelector } from 'react-redux'
import { userAction } from '../store/userSlice';
import { FaKey } from "react-icons/fa";

const Header = () => {
  const { user, role } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const removeUser = () => {
    dispatch(userAction.removeFromUserLogin({ partyId: user[0], role: role[0] }));
  }

  return (
    <HeaderContainer>
      <HeaderLogo>
        <HeaderLogoIcon><FaKey style={{"color":"white"}}></FaKey></HeaderLogoIcon>
        <HeaderAppName>Sphinx</HeaderAppName>
      </HeaderLogo>
      {user.length!==0 &&
      <HeaderNav>
        <HeaderButton to="/adduser">Add user / admin</HeaderButton>
        <HeaderButton to="/userlist">Users</HeaderButton>
        <HeaderButton to="/questionList">Questions</HeaderButton>
        <HeaderButton to="/topic">Topics</HeaderButton>
        <HeaderButton to={'/admin-dashboard'}>Home</HeaderButton>
        <NavButton style={{color:`white`}} to={'/'} onClick={removeUser}>Logout</NavButton>
     
      </HeaderNav>
}
    </HeaderContainer>
  )
}

export default Header
