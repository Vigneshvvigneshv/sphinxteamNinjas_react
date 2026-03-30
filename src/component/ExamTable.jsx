import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, ButtonContainer, CommonTable, Content, TableRow } from '../styles/common.style';
import { NavButton } from '../styles/header.style';
import Modal from './Modal';

const ExamTable = ({data}) => {
  const navigate=useNavigate();
  const[show,setShow]=useState(false);
    const handleSubmit=async()=>{
           const response=await fetch("https://localhost:8443/sphinx/api/exam/deleteexam",{
               method:"DELETE",
               headers:{
                   "Content-Type":"application/json"
               },
               body: JSON.stringify({"examId":data.examId})
           });
        const deleteData= await response.json();
        console.log(deleteData);
        navigate(0);
    }
    
   
  return (
     <CommonTable>
        <TableRow>
            <Content>{data.examName}</Content>
            <ButtonContainer>
              <NavButton to={`/question/${data.examId}`} >Add topics</NavButton>
              <NavButton to={`/getexam/${data.examId}`}>Edit exam</NavButton>
              <Button onClick={()=>{handleSubmit(); setShow(!show);}}>Delete exam</Button>
            </ButtonContainer>
        </TableRow>
        {show && <Modal></Modal>}
     </CommonTable>
  )
}

export default ExamTable
