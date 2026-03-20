import React, { useState } from 'react'
import Layout from '../component/Layout'
import {  LoginContainer, LoginForm, LoginHeading } from '../Styles/UserLogin.style'
import Login from '../component/Login';

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

    const response = await fetch("https://localhost:8443/sphinx/api/user/login", {
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
              <Login change={handleChange} username={formData}></Login>
            </LoginForm>
        </LoginContainer>
    </Layout>
  )
}

export default UserLogin
