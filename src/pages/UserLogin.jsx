import React from 'react'
import Layout from '../component/Layout'
import { FieldContainer, LoginButton, LoginContainer, LoginForm, LoginHeading, LoginInput, LoginLabel } from '../Styles/UserLogin.style'

const UserLogin = () => {
  return (
    <Layout>
        <LoginHeading>User Login</LoginHeading>
        <LoginContainer>    
            <LoginForm>
            <FieldContainer>
                <LoginLabel htmlFor='UserName'></LoginLabel>
                <LoginInput type="text" name='userName' placeholder='Enter your name'></LoginInput>
            </FieldContainer>

            <FieldContainer>
                <LoginLabel htmlFor='UserName'></LoginLabel>
                <LoginInput type="password" name='userPassword' placeholder='Enter your password' required></LoginInput>

            </FieldContainer>


            </LoginForm>
            <LoginButton type='submit'>Login</LoginButton>
        </LoginContainer>
    </Layout>
  )
}

export default UserLogin
