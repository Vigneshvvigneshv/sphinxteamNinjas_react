import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { validate } from '../validation/LoginFormValidation';
import { ErrorMessage, FieldContainer, Form, FormContainer, FormHeading, FormInput, FormLabel, SubmitButton } from '../styles/form.style';
import { AppName, CommonHeading, Loader, LoginContainer, PasswordEye } from '../styles/common.style';
import { apiPost } from '../ApiServices/apiServices';
import { useDispatch } from 'react-redux'
import { userAction } from '../store/userSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const LoginPage = () => {
  
  const[error,setError]=useState("");
  const [showPassword,setShowPassword]=useState(true);
  const navigate = useNavigate();
  
   const dispatch=useDispatch();
  //  const { user } = useSelector((state)=>state.userReducer);


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

    const response=await apiPost('/user/login',formData);
      if(response.errorMessage!==undefined){
          setError(response)
      }else if(response.successMessage!==undefined){

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
                <FormInput type={showPassword? "password":'text'} name='password' placeholder='Enter your password' value={formData.password}
                    onChange={handleChange} ></FormInput>
                      {error.password && <ErrorMessage>{error.password}</ErrorMessage>}
                     {formData.password!==""?<PasswordEye onClick={changeShow}>{showPassword?<FaEyeSlash/>:<FaEye/>}</PasswordEye>:""} 
            </FieldContainer>
            
            <SubmitButton type='submit'>Login</SubmitButton>
            </Form>
           
          </FormContainer> 
        </LoginContainer>
  )
}

export default LoginPage
