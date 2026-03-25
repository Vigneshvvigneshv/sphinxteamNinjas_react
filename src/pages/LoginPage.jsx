import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { validate } from '../validation/LoginFormValidation';
import { ErrorMessage, FieldContainer, Form, FormContainer, FormHeading, FormInput, FormLabel, SubmitButton } from '../styles/form.style';
import { LoginContainer } from '../styles/common.style';

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
          <FormContainer>
        <FormHeading>Login page</FormHeading>
            <Form onSubmit={handleSubmit}>
              <FieldContainer>
                <FormLabel htmlFor='UserName'>Username </FormLabel>
                <FormInput 
                    type="text"  
                    name='userName'
                    placeholder='Enter your username'
                    value={formData.userName}
                    onChange={handleChange} >
                    </FormInput>
                  {error.userName && <ErrorMessage>{error.userName}</ErrorMessage>}
                  
        </FieldContainer>

            <FieldContainer>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <FormInput type="password" name='password' placeholder='Enter your password' value={formData.password}
                    onChange={handleChange} ></FormInput>
                      {error.password && <ErrorMessage>{error.password}</ErrorMessage>}
            </FieldContainer>
            
            <SubmitButton type='submit'>Login</SubmitButton>
            </Form>
          </FormContainer> 
        </LoginContainer>
  )
}

export default LoginPage
