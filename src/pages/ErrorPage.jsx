import React from 'react'
import { Button, CommonContainer, CommonHeading, LoginContainer } from '../styles/common_style'
import { NavButton } from '../styles/header_style'

const ErrorPage = () => {
  return (
    <LoginContainer>
      <CommonContainer>
        <CommonHeading>Page not found</CommonHeading>
        <NavButton  to={'/'}>Back to login</NavButton>
      </CommonContainer>
    </LoginContainer>
  )
}

export default ErrorPage
