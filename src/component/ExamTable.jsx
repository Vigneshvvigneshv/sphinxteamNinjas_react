import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AddButton, Button, ButtonContainer, CommonTable, Content, DeleteButton, EditButton, TableRow } from '../styles/common_style';
import { NavButton } from '../styles/header_style';
import Modal from './Modal';
import { apiDelete } from '../ApiServices/apiServices';
import { useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaUser } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';


const ExamTable = ({ data }) => {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [response, setResponse] = useState();
  console.log('Exam Table', response);

  const deleteExam = async () => {
    const response = await apiDelete('/exam/deleteexam', { 'examId': data.examId, 'partyId': user[0] });
    console.log(response);
    setResponse(response);
    navigate(0);
  }


  return (
    
    <CommonTable>
      <TableRow>
        <Content>{data.examName}</Content>
        <ButtonContainer>
          <Button to={`/assignexam/${data.examId}`}><FaUser/>Assign</Button>
          <Button to={`/getexamtopic/${data.examId}`}>Topics</Button>
          <EditButton to={`/getexam/${data.examId}`}><FaEdit/>Edit</EditButton>
          <DeleteButton onClick={deleteExam}><FaTrash/>Delete</DeleteButton>
        </ButtonContainer>
        {show && <Modal>{response.successMessage}</Modal>}
      </TableRow>
    </CommonTable>
    
  )
}

export default ExamTable
