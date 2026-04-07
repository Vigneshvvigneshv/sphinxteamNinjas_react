import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, ButtonContainer, CommonContainer, CommonTable, Content, TableRow } from '../styles/common.style';
import { NavButton } from '../styles/header.style';
import Modal from './Modal';
import { apiDelete } from '../ApiServices/apiServices';

const ExamTable = ({data,id}) => {
  const navigate=useNavigate();
  
  
    const deleteExam=async()=>{
           const response=await apiDelete('/exam/deleteexam',{'examId':data.examId,partyId:id});
           console.log(response);
           navigate(0);
    }
    
   
  return (
     <CommonTable>
        <TableRow>
            <Content>{data.examName}</Content>
            <ButtonContainer>
              <NavButton to={`/getexamtopic/${data.examId}`} >Assign exam</NavButton>
              <NavButton to={`/getexamtopic/${data.examId}`} >Topics</NavButton>
              <NavButton to={`/getexam/${data.examId}`}>Edit</NavButton>
              <Button onClick={deleteExam}>Delete</Button>
            </ButtonContainer>
        </TableRow>
       
     </CommonTable>
  )
}

export default ExamTable
