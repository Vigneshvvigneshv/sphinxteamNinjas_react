import React from 'react'
<<<<<<< HEAD
import { AdminInput, AdminLabel, AdminLoginForm, FormContainer, FormHeading, SubmitButton } from '../Styles/AdminLogin.style'
=======
import { AdminInput, AdminLabel, AdminLoginForm, FormContainer, AdminHeading, SubmitButton } from '../Styles/AdminLogin.style'
>>>>>>> 277a416d4c07dc70404604e09d9ae6872e84d298
import Layout from '../component/Layout'
const AdminLogin = () => {
  return (
    <Layout>
        
        <FormContainer>

        <AdminLoginForm action={""} method='post'>
            <AdminLabel htmlFor='adminName'>AdminName:</AdminLabel>
            <AdminInput type='text' placeholder='Enter your username' name='adminName' required></AdminInput>

            <AdminLabel htmlFor='adminpassword'>AdminPassword</AdminLabel>
                <AdminInput type='password' placeholder='Enter your password' name='adminPassword' required></AdminInput>
            <SubmitButton type='submit'>Login</SubmitButton>
        </AdminLoginForm>

        </FormContainer>
    </Layout>
  )
}

export default AdminLogin
