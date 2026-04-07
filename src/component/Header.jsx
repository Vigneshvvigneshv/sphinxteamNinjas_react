import { HeaderButton, HeaderContainer, HeaderLogo, NavButton } from '../styles/header.style'
import { Container, Title } from '../styles/common.style'
import { useDispatch, useSelector } from 'react-redux'
import { userAction } from '../store/userSlice';
const Header = () => {

 const { user } = useSelector((state)=>state.userReducer);
  const dispatch=useDispatch();

  const removeUser=()=>{

     dispatch(userAction.removeFromUserLogin());
  }
  
  return (
 
      <HeaderContainer>
        <HeaderLogo>
          <Title>Sphinx Admin</Title>
        </HeaderLogo>
        <Container>
        <HeaderButton to="/adduser">Add user</HeaderButton>
        <HeaderButton to="/userlist">Users</HeaderButton>
        <HeaderButton to="/topic">Topics</HeaderButton>
        <HeaderButton to={'/admin-dashboard'}>Home</HeaderButton>
        <HeaderButton to={'/'} onClick={()=>removeUser}>Logout</HeaderButton>
        </Container>
      </HeaderContainer>
  )
}

export default Header
