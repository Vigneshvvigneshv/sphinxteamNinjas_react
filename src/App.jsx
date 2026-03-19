import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/adminLogin'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/adminlogin" element={<AdminLogin></AdminLogin>}></Route>
      <Route path="/userlogin" element={<UserLogin></UserLogin>}></Route>
    </Routes>
    </>
  )
}

export default App
