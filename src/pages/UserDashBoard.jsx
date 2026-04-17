import React from 'react'
import Layout from '../component/Layout'
import { CommonContainer, CommonHeading, CommonSection } from '../styles/common_style'
import { UserCard } from '../component/UserCard'



const UserDashBoard = () => {
  return (
   
    <Layout>
      <CommonContainer>
        <CommonHeading>Welcome to the User Dashboard</CommonHeading>
        <CommonSection>
         <UserCard/>
        </CommonSection>
      </CommonContainer>
    </Layout>
    
  )
}

export default UserDashBoard
