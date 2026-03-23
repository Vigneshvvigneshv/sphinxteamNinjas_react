import Layout from '../component/Layout'
import Login from '../component/Login'
import { LoginContainer, LoginForm, LoginHeading } from '../styles/userlogin.style'
import { useState } from 'react'

const AdminLogin = () => {

    const[formData, setFormData] = useState({
        userName: "",
        password: "",
        role: "ADMIN"
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
  };


  return (
   <Layout>
        <LoginContainer>    
        <LoginHeading>Admin Login</LoginHeading>
            <LoginForm onSubmit={handleSubmit}>
              <Login change={handleChange} username={formData}></Login>
            </LoginForm>
        </LoginContainer>
    </Layout>
  )
}

export default AdminLogin
