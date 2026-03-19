import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import AdminLogin from './pages/AdminLogin'


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
