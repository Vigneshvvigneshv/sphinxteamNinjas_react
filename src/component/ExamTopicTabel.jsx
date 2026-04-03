import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, ButtonContainer, CommonContainer, CommonTable, Container, Content, TableRow } from '../styles/common.style';
import { NavButton } from '../styles/header.style';
import Modal from './Modal';
import { apiDelete } from '../ApiServices/apiServices';

const ExamTopicTable = ({data,examId}) => {
  const navigate=useNavigate();
  console.log('ExamTopicTable',data,examId);
  
    const handleSubmit=async()=>{
           const response=await apiDelete('/examtopic/deletetopicinexamtopic',{examId:examId,topicId:data.topicId});
           console.log(response);
           navigate(0);
           
    }
    
   
  return (
     <CommonTable>
        <TableRow>
            <Container>
              <Content>{data.topicName}</Content>
            </Container>
            <Container>
               <Content>Percentage - {data.percentage}</Content>
            </Container>
             <Container>
               <Content>Pass Percentage - {data.percentage}</Content>
            </Container>
        </TableRow>
       
     </CommonTable>
  )
}

export default ExamTopicTable
