import React from 'react'

import { AdminHeading, AdminInput, AdminLabel, AdminLoginForm, FormContainer, SubmitButton } from '../Styles/AdminLogin.style'

import Layout from '../component/Layout'
const AdminLogin = () => {
  return (
    <Layout>
        <AdminHeading>Admin Login</AdminHeading>
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
