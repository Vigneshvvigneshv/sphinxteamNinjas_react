import React from 'react'
import Layout from '../component/Layout'
import { Button } from '../styles/overall.style'
import { NLink } from '../styles/userlogin.style'
import { NavButton } from '../styles/header.style'

const AdminDashBoard = () => {
  return (
    <Layout> 
      <NavButton to="/addUser">Add user</NavButton>
      <NavButton to="/addUser">Add user</NavButton>  
    </Layout>
  )
}

export default AdminDashBoard
