import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import AdminDashBoard from './pages/AdminDashBoard'
import UserDashBoard from './pages/UserDashBoard'
import LoginPage from './pages/LoginPage'
import CreateQuestionPage from './pages/AddEditQuestionPage'
import TopicPage from './pages/TopicPage'
import AddTopic from './pages/AddEditTopic'
import QuestionPage from './pages/QuestionPage'
import AddExam from './pages/AddEditExam'
import AddTopicsToExam from './pages/AddTopicsToExam'
import ExamTopicPage from './pages/ExamTopicPage'
import UserPage from './pages/UserPage'
import QuestionBulkUpload from './pages/QuestionBulkUpload'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route path="/adduser" element={<SignUp></SignUp>}></Route>
      <Route path="/admin-dashboard" element={<AdminDashBoard />} />
      <Route path="/user-dashboard" element={<UserDashBoard />} />
      <Route path="/topic" element={<TopicPage />} />
      <Route path='/createquestion/:id' element={<CreateQuestionPage/>}/>
      <Route path='/createquestion/' element={<CreateQuestionPage/>}/>
      <Route path='/addtopic/' element={<AddTopic/>}/>
      <Route path='/addtopic/:id' element={<AddTopic/>}/>
      <Route path='/question/:id' element={<QuestionPage/>}/>
      <Route path='/uploadfile' element={<QuestionBulkUpload/>}/>
      <Route path='/question/addquestion' element={<CreateQuestionPage/>}/>
      <Route path='/addexam' element={<AddExam/>}/>
      <Route path='/getexam/:id' element={<AddExam/>}/>
      <Route path='/getexamtopic/:id' element={<ExamTopicPage/>}/>
      <Route path='/editexamtopic/:id' element={<AddTopicsToExam/>}/>
      <Route path='/userlist' element={<UserPage/>}/>
    </Routes>
    </>
  )
}

export default App
