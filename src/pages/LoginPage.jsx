import React, { useState } from 'react'
import Layout from '../component/Layout'
import {  CreateAnAccount, LoginContainer, LoginForm, LoginHeading, NewAccountContainer, NLink } from '../styles/userlogin.style'
import Login from '../component/Login';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
    const[formData, setFormData] = useState({
        userName: "",
        password: "",
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

   {
    if (data.successMessage === "SPHINX_ADMIN") {
      navigate("/admin-dashboard");
    } else if(data.successMessage==="SPHINX_USER") {
      navigate("/user-dashboard");
    }else{
      alert("Inavlid login")
    }
  } 

  };


  return (
    
        <LoginContainer>    
        <LoginHeading>Login page</LoginHeading>
            <LoginForm onSubmit={handleSubmit}>
              <Login change={handleChange} username={formData}></Login>
            </LoginForm>
        </LoginContainer>
  )
}

export default LoginPage
