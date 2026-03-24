import React from 'react'
import { FieldContainer, FormContainer, LoginButton, LoginInput, LoginLabel } from '../styles/userlogin.style'
import { ErrorMessage } from '../styles/signup.style'

const Login = ({change,username,error}) => {
  
  return (
    <FormContainer>
    <FieldContainer>
                <LoginLabel htmlFor='UserName'>Username </LoginLabel>
                <LoginInput 
                    type="text"  
                    name='userName'
                    placeholder='Enter your username'
                    value={username.userName}
                    onChange={change} >
                    </LoginInput>
                  {error.userName && <ErrorMessage>{error.userName}</ErrorMessage>}
                  
        </FieldContainer>

            <FieldContainer>
                <LoginLabel htmlFor='password'>Password</LoginLabel>
                <LoginInput type="password" name='password' placeholder='Enter your password' value={username.password}
                    onChange={change} ></LoginInput>
                      {error.password && <ErrorMessage>{error.password}</ErrorMessage>}
            </FieldContainer>
            
            <LoginButton type='submit'>Login</LoginButton>
      
    </FormContainer>
  )
}

export default Login
