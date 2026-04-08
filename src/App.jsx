import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
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
import { useSelector } from 'react-redux'
import AssignExamPage from './pages/AssignExamPage'
import ErrorPage from './pages/ErrorPage'

const App = () => {
  const { user } = useSelector((state)=>state.userReducer);
  console.log("user ",user);

  const ProtectedRoute = ({children}) =>{
    console.log("inside if protected")
    
    if(user.length>0){
      console.log("inside if ",user)
      
      return children;
    }else{
      return <Navigate to={'/error'}/>
    }
  }
  return (
    <>
    <Routes>
      <Route path="/error" element={<ErrorPage/>}></Route>
      <Route path="/" element={<LoginPage/>}></Route>
      <Route path="/adduser" element={<ProtectedRoute><SignUp/></ProtectedRoute>}></Route>
      <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashBoard /></ProtectedRoute>} />
      <Route path="/user-dashboard" element={<ProtectedRoute><UserDashBoard/></ProtectedRoute>} />
      <Route path="/assignexam/:id" element={<ProtectedRoute><AssignExamPage/></ProtectedRoute>} />
      <Route path="/topic" element={<ProtectedRoute><TopicPage/></ProtectedRoute>} />
      <Route path='/createquestion/:id' element={<ProtectedRoute><CreateQuestionPage/></ProtectedRoute>}/>
      <Route path='/createquestion' element={<ProtectedRoute><CreateQuestionPage/></ProtectedRoute>}/>
      <Route path='/addtopic' element={<ProtectedRoute><AddTopic/></ProtectedRoute>}/>
      <Route path='/addtopic/:id' element={<ProtectedRoute><AddTopic/></ProtectedRoute>}/>
      <Route path='/question/:id' element={<ProtectedRoute><QuestionPage/></ProtectedRoute>}/>
      <Route path='/uploadfile' element={<ProtectedRoute><QuestionBulkUpload/></ProtectedRoute>}/>
      <Route path='/question/addquestion' element={<ProtectedRoute><CreateQuestionPage/></ProtectedRoute>}/>
      <Route path='/addexam' element={<ProtectedRoute><AddExam/></ProtectedRoute>}/>
      <Route path='/getexam/:id' element={<ProtectedRoute><AddExam/></ProtectedRoute>}/>
      <Route path='/getexamtopic/:id' element={<ProtectedRoute><ExamTopicPage/></ProtectedRoute>}/>
      <Route path='/editexamtopic/:id' element={<ProtectedRoute><AddTopicsToExam/></ProtectedRoute>}/>
      <Route path='/userlist' element={<ProtectedRoute><UserPage/></ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default App
