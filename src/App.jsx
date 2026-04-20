import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import AdminDashBoard from "./pages/AdminDashBoard";
import UserDashBoard from "./pages/UserDashBoard";
import LoginPage from "./pages/LoginPage";
import CreateQuestionPage from "./pages/AddEditQuestionPage";
import TopicPage from "./pages/TopicPage";
import AddTopic from "./pages/AddEditTopic";
import QuestionPage from "./pages/QuestionPage";
import AddExam from "./pages/AddEditExam";
import AddTopicsToExam from "./pages/AddTopicsToExam";
import ExamTopicPage from "./pages/ExamTopicPage";
import UserPage from "./pages/UserPage";
import QuestionBulkUpload from "./pages/QuestionBulkUpload";
import { useSelector } from "react-redux";
import AssignExamPage from "./pages/AssignExamPage";
import ErrorPage from "./pages/ErrorPage";
import AllQuestionPage from "./pages/AllQuestionPage";
import { UnAuthorisedPage } from "./pages/UnAuthorisedPage";
import ExamQuestionList from "./pages/ExamQuestionList";

const App = () => {
  const { user, role } = useSelector((state) => state.userReducer);
  console.log("user ", user);

  const ProtectedRoute = ({ children }) => {
    console.log("inside if protected");

    if (user.length > 0) {
      console.log("inside if ", user);

      return children;
    } else {
      return <ErrorPage></ErrorPage>;
    }
  };

  const AdminAuthentication = ({ children }) => {
    if (role[0] === "SPHINX_ADMIN") {
      return children;
    } else {
      return <UnAuthorisedPage></UnAuthorisedPage>;
    }
  };

  const UserAuthentication = ({ children }) => {
    if (role[0] === "SPHINX_USER") {
      return children;
    } else {
      return <ErrorPage></ErrorPage>;
    }
  };
  return (
    <>
      <Routes>
        <Route path="/*" element={<ErrorPage />}></Route>
        <Route path="/" element={<LoginPage />}></Route>
        <Route
          path="/adduser"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <SignUp />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <AdminDashBoard />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assignexam/:id"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <AssignExamPage />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />
        <Route
          path="/topic"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <TopicPage />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />
        <Route
          path="/createquestion/:id"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <CreateQuestionPage />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />
        <Route
          path="/createquestion"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <CreateQuestionPage />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />
        <Route
          path="/addtopic"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <AddTopic />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />
        <Route
          path="/addtopic/:id"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <AddTopic />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />
        <Route
          path="/question/:id"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <QuestionPage />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />
        <Route
          path="/uploadfile"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <QuestionBulkUpload />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />
        <Route
          path="/question/addquestion"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <CreateQuestionPage />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />
        <Route
          path="/addexam"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <AddExam />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />
        <Route
          path="/getexam/:id"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <AddExam />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />
        <Route
          path="/getexamtopic/:id"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <ExamTopicPage />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />
        <Route
          path="/editexamtopic/:id"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <AddTopicsToExam />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />
        <Route
          path="/userlist"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <UserPage />
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />
        <Route
          path="/questionList"
          element={
            <ProtectedRoute>
              <AdminAuthentication>
                <AllQuestionPage></AllQuestionPage>
              </AdminAuthentication>
            </ProtectedRoute>
          }
        />

        <Route
          path="/examquestionlist/:examId/:partyId"
          element={
            <ProtectedRoute>
              <UserAuthentication>
                <ExamQuestionList></ExamQuestionList>
              </UserAuthentication>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
