import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { validate } from '../validation/LoginFormValidation';
import { ErrorMessage, FieldContainer, Form, FormContainer, FormHeading, FormInput, FormLabel, SubmitButton } from '../styles/form.style';
import { AppName, CommonHeading, Loader, LoginContainer } from '../styles/common.style';
import { apiPost } from '../ApiServices/apiServices';

const LoginPage = () => {
  
  const[error,setError]=useState("");
  const navigate = useNavigate();
  const[loading,setLoading]=useState(false);
  console.log(loading);
  
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
          try{
            
            setLoading(!loading);
            const response=await apiPost('/user/login',formData);
      if(response.errorMessage!==null){
          setError(response)
      }
      if (response.role === "SPHINX_ADMIN") {
          console.log(response.role); 
          navigate("/admin-dashboard");
      } else if(response.role==="SPHINX_USER") {
          navigate("/user-dashboard");
      }
    }catch(err){
      setLoading(!loading);
      console.log(err);
    }finally{
      setLoading(false);
    }
  };


  return (
    
        <LoginContainer>  
        <AppName>Sphinx Exam Management</AppName> 
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
            {loading && <Loader/>}
          </FormContainer> 
        </LoginContainer>
  )
}

export default LoginPage
