import React from 'react'
import { Button, CommonContainer, CommonHeading, LoginContainer } from '../styles/common.style'
import { ErrorMessage } from '../styles/form.style'
import { NavButton } from '../styles/header.style'

const ErrorPage = () => {
  return (
    <LoginContainer>
      <CommonContainer>
        <CommonHeading>Page not found</CommonHeading>
        <NavButton to={'/'}>Back to login</NavButton>
      </CommonContainer>
    </LoginContainer>
  )
}

export default ErrorPage
