import { HeaderButton, HeaderContainer, HeaderLogo, NavButton } from '../styles/header.style'

const Header = () => {
  return (
   <>
      <HeaderContainer>
        <HeaderLogo>

        </HeaderLogo>
        <HeaderButton>
            <NavButton to="/adminlogin">Admin Login</NavButton>
            <NavButton to="/userlogin">User Login</NavButton>
            
        </HeaderButton>
      </HeaderContainer>
    </>

  )
}

export default Header
