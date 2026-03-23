import React, { useState } from 'react'
import { ErrorMessage, FieldContainer, SignUpContainer, SignupForm, SignUpHeading, SignUpInput, SignUpLabel, SingupLayout, SubmitButton} from '../styles/signup.style'
import { validate } from '../Validation/SignUpFormValidation';



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
    <SingupLayout>
      <SignUpContainer>
        <SignUpHeading>Singup Form</SignUpHeading>
            <SignupForm onSubmit={handleSubmit}>
                <FieldContainer>
                <SignUpLabel htmlFor='userName'>Username: </SignUpLabel>
                <SignUpInput type='text'
                        name="userName"
                        placeholder='Enter your username'
                        value={formData.userName}
                        onChange={handleChange}></SignUpInput>

                 {error.userName && <ErrorMessage>{error.userName}</ErrorMessage>}
                </FieldContainer>

                <FieldContainer>
                <SignUpLabel htmlFor='firstName'>First Name: </SignUpLabel>
                <SignUpInput type='text'
                        name="firstName"
                        placeholder='Enter your first name'
                        value={formData.firstName}
                        onChange={handleChange}></SignUpInput>
                        {error.firstName && <ErrorMessage>{error.firstName}</ErrorMessage>}
                </FieldContainer>

                <FieldContainer>
                <SignUpLabel htmlFor='lastName'>Last Name: </SignUpLabel>
                <SignUpInput type='text'
                        name="lastName"
                        placeholder='Enter your last name'
                        value={formData.lastName}
                        onChange={handleChange}></SignUpInput>
                        {error.lastName && <ErrorMessage>{error.lastName}</ErrorMessage>}
                </FieldContainer>

                <FieldContainer>
                <SignUpLabel htmlFor='email'>Email: </SignUpLabel>
                <SignUpInput type='text'
                        name="email"
                        placeholder='Enter your email'
                        value={formData.email}
                        onChange={handleChange}></SignUpInput>
                        {error.email && <ErrorMessage>{error.email}</ErrorMessage>}
                </FieldContainer>

                <FieldContainer>
                <SignUpLabel htmlFor='password'>Password: </SignUpLabel>
                <SignUpInput type='password'
                        name="password"
                        placeholder='Enter your password'
                        value={formData.password}
                        onChange={handleChange}></SignUpInput>
                        {error.password && <ErrorMessage>{error.password}</ErrorMessage>}
                </FieldContainer>

                <SubmitButton>Submit</SubmitButton>
            </SignupForm>
            
      </SignUpContainer>
     </SingupLayout>
  )
}

export default SignUp
