import React, { useState } from 'react'
import { validate } from '../Validation/SignUpFormValidation';
import Layout from '../component/Layout';
import { ErrorMessage, FieldContainer, Form, FormContainer, FormHeading, FormInput, FormLabel, SubmitButton } from '../styles/form.style';



const SignUp = () => {
     const[error,setError]=useState({});
     const[formData, setFormData] = useState({
            userName: "",
            firstName:"",
            lastName:"",
            email:"",
            password: "",
            role: "USER"
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


        const response = await fetch("https://localhost:8443/sphinx/api/user/signup", {
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
      <FormContainer>
        <FormHeading>Singup Form</FormHeading>
            <Form onSubmit={handleSubmit}>
                <FieldContainer>
                <FormLabel htmlFor='userName'>Username </FormLabel>
                <FormInput type='text'
                        name="userName"
                        placeholder='Enter your username'
                        value={formData.userName}
                        onChange={handleChange}></FormInput>

                 {error.userName && <ErrorMessage>{error.userName}</ErrorMessage>}
                </FieldContainer>

                <FieldContainer>
                <FormLabel htmlFor='firstName'>First Name </FormLabel>
                <FormInput type='text'
                        name="firstName"
                        placeholder='Enter your first name'
                        value={formData.firstName}
                        onChange={handleChange}></FormInput>
                        {error.firstName && <ErrorMessage>{error.firstName}</ErrorMessage>}
                </FieldContainer>

                <FieldContainer>
                <FormLabel htmlFor='lastName'>Last Name </FormLabel>
                <FormInput type='text'
                        name="lastName"
                        placeholder='Enter your last name'
                        value={formData.lastName}
                        onChange={handleChange}></FormInput>
                        {error.lastName && <ErrorMessage>{error.lastName}</ErrorMessage>}
                </FieldContainer>

                <FieldContainer>
                <FormLabel htmlFor='email'>Email </FormLabel>
                <FormInput type='text'
                        name="email"
                        placeholder='Enter your email'
                        value={formData.email}
                        onChange={handleChange}></FormInput>
                        {error.email && <ErrorMessage>{error.email}</ErrorMessage>}
                </FieldContainer>

                <FieldContainer>
                <FormLabel htmlFor='password'>Password </FormLabel>
                <FormInput type='password'
                        name="password"
                        placeholder='Enter your password'
                        value={formData.password}
                        onChange={handleChange}></FormInput>
                        {error.password && <ErrorMessage>{error.password}</ErrorMessage>}
                </FieldContainer>

                <SubmitButton>Submit</SubmitButton>
            </Form>
            
      </FormContainer>
     </Layout>
  )
}

export default SignUp
