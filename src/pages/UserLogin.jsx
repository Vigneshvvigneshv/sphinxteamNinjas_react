import React, { useState } from 'react'
import Layout from '../component/Layout'
import { FieldContainer, LoginButton, LoginContainer, LoginForm, LoginHeading, LoginInput, LoginLabel } from '../Styles/UserLogin.style'

const UserLogin = () => {

    const[formData, setFormData] = useState({
        userName: "",
        password: "",
        role: "USER"
  });

   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://localhost:8443/sphinx/control/validateUserLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log(data);
  };


  return (
    <Layout>
        <LoginContainer>    
        <LoginHeading>User Login</LoginHeading>
            <LoginForm onSubmit={handleSubmit}>

            <FieldContainer>
                <LoginLabel htmlFor='UserName'>UserName: </LoginLabel>
                <LoginInput type="text" name='userName' placeholder='Enter your name'></LoginInput>
            </FieldContainer>

            <FieldContainer>
                <LoginLabel htmlFor='password'>password:</LoginLabel>
                <LoginInput type="password" name='password' placeholder='Enter your password' required></LoginInput>
            </FieldContainer>
            
            <LoginButton type='submit'>Login</LoginButton>
            </LoginForm>
        </LoginContainer>
    </Layout>
  )
}

export default UserLogin
