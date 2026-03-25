import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import AdminDashBoard from './pages/AdminDashBoard'
import UserDashBoard from './pages/UserDashBoard'
import LoginPage from './pages/LoginPage'
import CreateQuestionPage from './pages/CreateQuestionPage'
import TopicPage from './pages/TopicPage'


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route path="/adduser" element={<SignUp></SignUp>}></Route>
      <Route path="/admin-dashboard" element={<AdminDashBoard />} />
      <Route path="/user-dashboard" element={<UserDashBoard />} />
     <Route path="/topic" element={<TopicPage />} />
     <Route path='/createquestion' element={<CreateQuestionPage/>}/>
    </Routes>
    </>
  )
}

export default App
