import { HeaderButton, HeaderContainer, HeaderLogo, HeaderLogoIcon, HeaderAppName, HeaderNav, NavButton } from '../styles/header_style'
import { useDispatch, useSelector } from 'react-redux'
import { userAction } from '../store/userSlice';

const Header = () => {
  const { user, role } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const removeUser = () => {
    dispatch(userAction.removeFromUserLogin({ partyId: user[0], role: role[0] }));
  }

  return (
    <HeaderContainer>
      <HeaderLogo>
        <HeaderLogoIcon>🦁</HeaderLogoIcon>
        <HeaderAppName>Sphinx</HeaderAppName>
      </HeaderLogo>
      <HeaderNav>
        <HeaderButton to="/adduser">Add user</HeaderButton>
        <HeaderButton to="/userlist">Users</HeaderButton>
        <HeaderButton to="/topic">Topics</HeaderButton>
        <HeaderButton to={'/admin-dashboard'}>Home</HeaderButton>
      </HeaderNav>
     
        <NavButton to={'/'} onClick={removeUser}>Logout</NavButton>
     
    </HeaderContainer>
  )
}

export default Header
