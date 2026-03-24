import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import UserLogin from './pages/LoginPage'
import AdminLogin from './pages/AdminLogin'
import SignUp from './pages/SignUp'
import AdminDashBoard from './pages/AdminDashBoard'
import UserDashBoard from './pages/UserDashBoard'
import LoginPage from './pages/LoginPage'


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route path="/adminlogin" element={<AdminLogin></AdminLogin>}></Route>
      <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
      <Route path="/admin-dashboard" element={<AdminDashBoard />} />
      <Route path="/user-dashboard" element={<UserDashBoard />} />
    </Routes>
    </>
  )
}

export default App
