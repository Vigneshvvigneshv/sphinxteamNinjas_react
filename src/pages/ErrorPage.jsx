import React from 'react'
import { CommonContainer, LoginContainer } from '../styles/common.style'
import { ErrorMessage } from '../styles/form.style'

const ErrorPage = () => {
  return (
    <LoginContainer>
      <CommonContainer>
        <ErrorMessage>Page not found</ErrorMessage>
      </CommonContainer>
    </LoginContainer>
  )
}

export default ErrorPage
