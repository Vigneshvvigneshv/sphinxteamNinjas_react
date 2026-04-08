import React, { useState } from 'react'
import { validate } from '../Validation/SignUpFormValidation';
import Layout from '../component/Layout';
import { ErrorMessage, FieldContainer, Form, FormContainer, FormHeading, FormInput, FormLabel, SubmitButton } from '../styles/form.style';
import { CommonContainer, Dropdown, PasswordEye } from '../styles/common.style';
import { apiPost } from '../ApiServices/apiServices';



const SignUp = () => {
     const[error,setError]=useState({});
     const[roleTypeId,setRoleTypeId]=useState('SPHINX_USER');
     const[formData, setFormData] = useState({
            userName: "",
            firstName:"",
            lastName:"",
            email:"",
            password: "",
            roleTypeId: roleTypeId,
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

        const response = await apiPost('/user/signup',formData);
        console.log(response);
      };
  return (
    <Layout>
      <CommonContainer>

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
                        onChange={handleChange}></FormInput><PasswordEye class="fa-solid fa-eye"></PasswordEye>
                        {error.password && <ErrorMessage>{error.password}</ErrorMessage>}
                </FieldContainer>


                <FieldContainer>
                  <Dropdown value={roleTypeId} onChange={(e)=> setRoleTypeId(e.target.value)}>
                    <option value='SPHINX_USER'>User</option>
                    <option value='SPHINX_ADMIN'>Admin</option>
                  </Dropdown>
                </FieldContainer>
                <SubmitButton>Submit</SubmitButton>
            </Form>
            
      </FormContainer>
      </CommonContainer>
     </Layout>
  )
}

export default SignUp
