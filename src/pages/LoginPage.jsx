import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { validate } from '../validation/LoginFormValidation';
import { ErrorMessage, FieldContainer, Form, FormContainer, FormHeading, FormInput, FormLabel, SubmitButton, FormEyebrow, FormSubtitle } from '../styles/form_style';
import { AppName, Button, CommonContainer, Loader, LoginContainer, PasswordEye } from '../styles/common_style';
import { apiPost } from '../ApiServices/apiServices';
import { useDispatch } from 'react-redux'
import { userAction } from '../store/userSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Layout from '../component/Layout';
import { toast } from 'sonner';
import LoaderComponent from '../component/LoaderComponent';

const LoginPage = () => {
  
  const[error,setError]=useState("");
  const [showPassword,setShowPassword]=useState(true);
  const[isLoading,setIsLoading]=useState(false);
  const navigate = useNavigate();
  
  const dispatch=useDispatch();

  const[formData, setFormData] = useState({
      userName: "",
      password: "",
  });

  const changeShow=()=>{
    setShowPassword(!showPassword);
  }

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
    setIsLoading(true);
    const response=await apiPost('/user/login',formData);
    setIsLoading(false);
    if(response.errorMessage!==undefined){
        setError(response);
        toast.error(`Invalid credentials`,{position:'top-center'})
    }else if(response.successMessage!==undefined){
      toast.success("Login Sucessfully!", {position: "top-center"});
      console.log("partyId:", response.partyId); 
       console.log("role:", response.role); 
       dispatch(userAction.addToUserLogin({partyId:response.partyId,role:response.role}));
      if (response.role === "SPHINX_ADMIN") {
          console.log(response.role); 
          navigate("/admin-dashboard" , {state:{partyId:response.partyId}});
      } else if(response.role==="SPHINX_USER") {
          navigate("/user-dashboard", {state:{partyId:response.partyId}});
      }
    }
  };

  return (
    <Layout>
      {isLoading && <LoaderComponent text='Loading..' content='Logining in...'/>}
      <CommonContainer>
        <FormContainer>

        <FormEyebrow>Welcome to sphinx</FormEyebrow>
        <FormHeading>Login</FormHeading>
        <Form onSubmit={handleSubmit}>
          <FieldContainer>
            <FormLabel htmlFor='UserName'>User name</FormLabel>
            <FormInput 
              type="text"  
              name='userName'
              placeholder='Enter your user name'
              value={formData.userName}
              onChange={handleChange}
            />
            {error.userName && <ErrorMessage>{error.userName}</ErrorMessage>}
          </FieldContainer>

          <FieldContainer>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <FormInput
              type={showPassword ? "password" : 'text'}
              name='password'
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleChange}
              />
            {error.password && <ErrorMessage>{error.password}</ErrorMessage>}
            {formData.password !== "" ? (
              <PasswordEye onClick={changeShow}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordEye>
            ) : ""}
          </FieldContainer>
          <SubmitButton type='submit'>Login</SubmitButton>
        </Form>
        </FormContainer>
      </CommonContainer> 
    </Layout>
  )
}

export default LoginPage
