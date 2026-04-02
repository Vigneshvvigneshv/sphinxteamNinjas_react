import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, ButtonContainer, CommonContainer, CommonTable, Content, TableRow } from '../styles/common.style';
import { NavButton } from '../styles/header.style';
import Modal from './Modal';
import { apiDelete } from '../ApiServices/apiServices';

const ExamTable = ({data}) => {
  const navigate=useNavigate();
  
  
    const handleSubmit=async()=>{
           const response=await apiDelete('/exam/deleteexam',{'examId':data.examId});
           console.log(response);
           navigate(0);
    }
    
   
  return (
     <CommonTable>
        <TableRow>
            <Content>{data.examName}</Content>
            <ButtonContainer>
              <NavButton to={`/getexamtopic/${data.examId}`} >Topics</NavButton>
              <NavButton to={`/getexam/${data.examId}`}>Edit exam</NavButton>
              <Button onClick={handleSubmit}>Delete exam</Button>
            </ButtonContainer>
        </TableRow>
       
     </CommonTable>
  )
}

export default ExamTable
