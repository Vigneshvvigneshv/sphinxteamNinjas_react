import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import AdminLogin from './pages/AdminLogin'
import SignUp from './pages/SignUp'
import AdminDashBoard from './pages/AdminDashBoard'
import UserDashBoard from './pages/UserDashBoard'


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/adminlogin" element={<AdminLogin></AdminLogin>}></Route>
      <Route path="/userlogin" element={<UserLogin></UserLogin>}></Route>
      <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
      <Route path="/admin-dashboard" element={<AdminDashBoard />} />
      <Route path="/user-dashboard" element={<UserDashBoard />} />
    </Routes>
    </>
  )
}

export default App
