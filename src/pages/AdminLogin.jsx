import React from 'react'
import { AdminInput, AdminLabel, AdminLoginForm, FormContainer, SubmitButton } from '../Styles/AdminLogin.style'
import Layout from '../component/Layout'
const AdminLogin = () => {
  return (
    <Layout>
        <FormContainer>
        <FormHeading>Admin Login</FormHeading>

        <AdminLoginForm action={""} method='post'>
            <AdminLabel htmlFor='adminName'>
                <AdminInput type='text' placeholder='Enter your username' name='adminName' required></AdminInput>
            </AdminLabel>

            <AdminLabel htmlFor='adminpassword'>
                <AdminInput type='password' placeholder='Enter your password' name='adminPassword' required></AdminInput>
            </AdminLabel>

            <SubmitButton type='submit'>Login</SubmitButton>
        </AdminLoginForm>

        </FormContainer>
    </Layout>
  )
}

export default AdminLogin
