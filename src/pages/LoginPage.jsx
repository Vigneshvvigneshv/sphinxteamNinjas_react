import React, { useState } from 'react'
import Layout from '../component/Layout'
import {  LoginContainer, LoginForm, LoginHeading } from '../styles/userlogin.style'
import Login from '../component/Login';
import { useNavigate } from 'react-router-dom';
import { validate } from '../validation/LoginFormValidation';

const LoginPage = () => {
  const[error,setError]=useState("");
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
     setError({
         ...error,
        [e.target.name]: ""
  });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validate(formData);
          setError(validationErrors);
          if (Object.keys(validationErrors).length > 0) return;

    const response = await fetch("https://localhost:8443/sphinx/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log(data);
    if(data.errorMessage!==null){
        setError(data)
    }

      if (data.role === "SPHINX_ADMIN") {
        console.log(data.role);
        
        navigate("/admin-dashboard");
      } else if(data.role==="SPHINX_USER") {
        navigate("/user-dashboard");
      }
  };


  return (
    
        <LoginContainer>    
        <LoginHeading>Login page</LoginHeading>
            <LoginForm onSubmit={handleSubmit}>
              <Login change={handleChange} username={formData} error={error}></Login>
            </LoginForm>
        </LoginContainer>
  )
}

export default LoginPage
