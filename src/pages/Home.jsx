import React from 'react'
import Layout from '../component/Layout'
import AdminLogin from './adminLogin'
import UserLogin from './UserLogin'

const Home = () => {
  return (
    <>
     
      <Layout>
        <UserLogin></UserLogin>
      </Layout>
    </>
  )
}

export default Home
