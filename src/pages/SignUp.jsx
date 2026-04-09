import React, { useState } from 'react'
import { validate } from '../Validation/SignUpFormValidation';
import Layout from '../component/Layout';
import { ErrorMessage, FieldContainer, Form, FormContainer, FormHeading, FormInput, FormLabel, SubmitButton, FormEyebrow, FormSubtitle } from '../styles/form_style';
import { CommonContainer, Dropdown, PasswordEye } from '../styles/common_style';
import { apiPost } from '../ApiServices/apiServices';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Modal from '../component/Modal';

const SignUp = () => {
  const[error,setError]=useState({});
  const[roleTypeId,setRoleTypeId]=useState('SPHINX_USER');
  const [showPassword,setShowPassword]=useState(true);
  const[show,setShow]=useState(false);
  console.log('Singup',error);
  
  const showPop=()=>{
    setShow(!show);
  }
  const changeShow=()=>{
    setShowPassword(!showPassword);
  }
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
    setError(response);
    showPop();
  };

  return (
    <Layout>
      <CommonContainer>
        <FormContainer>
          <FormEyebrow>Create account</FormEyebrow>
          <FormHeading>Sign Up</FormHeading>
          <FormSubtitle>Register to access the Sphinx platform</FormSubtitle>
          <Form onSubmit={handleSubmit}>
            <FieldContainer>
              <FormLabel htmlFor='userName'>Username</FormLabel>
              <FormInput
                type='text'
                name="userName"
                placeholder='Enter your username'
                value={formData.userName}
                onChange={handleChange}
              />
              {error.userName && <ErrorMessage>{error.userName}</ErrorMessage>}
            </FieldContainer>

            <FieldContainer>
              <FormLabel htmlFor='firstName'>First Name</FormLabel>
              <FormInput
                type='text'
                name="firstName"
                placeholder='Enter your first name'
                value={formData.firstName}
                onChange={handleChange}
              />
              {error.firstName && <ErrorMessage>{error.firstName}</ErrorMessage>}
            </FieldContainer>

            <FieldContainer>
              <FormLabel htmlFor='lastName'>Last Name</FormLabel>
              <FormInput
                type='text'
                name="lastName"
                placeholder='Enter your last name'
                value={formData.lastName}
                onChange={handleChange}
              />
              {error.lastName && <ErrorMessage>{error.lastName}</ErrorMessage>}
            </FieldContainer>

            <FieldContainer>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <FormInput
                type='text'
                name="email"
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
              />
              {error.email && <ErrorMessage>{error.email}</ErrorMessage>}
            </FieldContainer>

            {roleTypeId === 'SPHINX_ADMIN' ?
              <FieldContainer>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <FormInput
                  type={showPassword ? "password" : 'text'}
                  name="password"
                  placeholder='Enter your password'
                  value={formData.password}
                  onChange={handleChange}
                />
                {formData.password !== "" ? (
                  <PasswordEye onClick={changeShow}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </PasswordEye>
                ) : ""}
                {error.password && <ErrorMessage>{error.password}</ErrorMessage>}
              </FieldContainer>
            : ""}

            <FieldContainer>
              <Dropdown value={roleTypeId} onChange={(e) => setRoleTypeId(e.target.value)}>
                <option value='SPHINX_USER'>User</option>
                <option value='SPHINX_ADMIN'>Admin</option>
              </Dropdown>
            </FieldContainer>

            {show && <Modal>{error.successMessage}</Modal>}
            <SubmitButton>Submit</SubmitButton>
          </Form>
        </FormContainer>
      </CommonContainer>
    </Layout>
  )
}

export default SignUp
