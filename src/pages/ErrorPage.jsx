import React from 'react'
import { AddButton, Button, CommonContainer, CommonHeading, LoginContainer } from '../styles/common_style'
import { NavButton } from '../styles/header_style'

const ErrorPage = () => {
  return (
    <LoginContainer>
      <CommonContainer>
        <CommonHeading>Page not found</CommonHeading>
        <AddButton  to={'/'}>Back to login</AddButton>
      </CommonContainer>
    </LoginContainer>
  )
}

export default ErrorPage
