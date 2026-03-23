import React from 'react'
import { FieldContainer, LoginButton, LoginInput, LoginLabel } from '../styles/userlogin.style'

const Login = ({change,username}) => {
  return (
    <>
    <FieldContainer>
                <LoginLabel htmlFor='UserName'>Username: </LoginLabel>
                <LoginInput 
                    type="text"  
                    name='userName'
                    placeholder='Enter your username'
                    value={username.userName}
                    onChange={change}  required>
                    </LoginInput>
            </FieldContainer>

            <FieldContainer>
                <LoginLabel htmlFor='password'>Password:</LoginLabel>
                <LoginInput type="password" name='password' placeholder='Enter your password' value={username.password}
                    onChange={change} required></LoginInput>
            </FieldContainer>
            
            <LoginButton type='submit'>Login</LoginButton>
      
    </>
  )
}

export default Login
