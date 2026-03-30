import { HeaderButton, HeaderContainer, HeaderLogo, NavButton } from '../styles/header.style'
import { Container, Title } from '../styles/common.style'
const Header = () => {
  return (
 
      <HeaderContainer>
        <HeaderLogo>
          <Title>Sphinx</Title>
        </HeaderLogo>
        <Container>
        <HeaderButton to="/adduser">Add user</HeaderButton>
        <HeaderButton to="/topic">Topics</HeaderButton>
        <HeaderButton to={'/admin-dashboard'}>Home</HeaderButton>
        </Container>
      </HeaderContainer>
  )
}

export default Header
