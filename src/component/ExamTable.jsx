import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AddButton, Button, ButtonContainer, CommonTable, Content, DeleteButton, EditButton, ExamTableRow, Navlink, TableRow} from '../styles/common_style';
import { NavButton } from '../styles/header_style';
import Modal from './Modal';
import { apiDelete } from '../ApiServices/apiServices';
import { useSelector } from 'react-redux';
import { FaEdit, FaPen, FaTrash, FaUser } from 'react-icons/fa';
import { FaArrowUpRightFromSquare, FaDeleteLeft } from 'react-icons/fa6';


const ExamTable = ({ data }) => {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [response, setResponse] = useState();
  console.log('Exam Table', response);

  const deleteExam = async () => {
    const response = await apiDelete('/exam/delete-exam', {'deleteList':[data.examId],'partyId': user[0] });
    console.log(response);
    setResponse(response);
    navigate(0);
  }


  return (
    
    
      <ExamTableRow>
        <Content>{data.examName}</Content>
        <Content>{data.duration}</Content>
        <Content>{data.noOfQuestions}</Content>
        <Content>{data.passPercentage}</Content>
        <ButtonContainer>
          <Navlink to={`/assignexam/${data.examId}`} state={{examName:data.examName}}><FaUser/>Assign</Navlink>
          <Navlink to={`/getexamtopic/${data.examId}`}><FaArrowUpRightFromSquare />  Topics</Navlink>
          <Navlink  to={`/editexamtopic/${data.examId}`}
            state={{examName: data.examName, examId: data.examId}}><FaArrowUpRightFromSquare /> Edit Topics</Navlink>
          <EditButton to={`/getexam/${data.examId}`}><FaPen/></EditButton>
          <DeleteButton onClick={deleteExam} title='Delete'><FaTrash/></DeleteButton>
        </ButtonContainer>
        
      </ExamTableRow>
    
    
  )
}

export default ExamTable
