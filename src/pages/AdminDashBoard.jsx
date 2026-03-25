import React from 'react'
import Layout from '../component/Layout'
import { NavButton } from '../styles/header.style'
import { Container } from '../styles/common.style'

const AdminDashBoard = () => {
  return (
    <Layout> 
      <Container>
        
      <NavButton to="/adduser">Add user</NavButton>
      <NavButton to="/topic">Topics</NavButton>
      <NavButton to="/createquestion">Create question</NavButton>  
      </Container>
    </Layout>
  )
}

export default AdminDashBoard
