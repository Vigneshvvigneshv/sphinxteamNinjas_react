import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, ButtonContainer, CommonContainer, CommonTable, Content, TableRow } from '../styles/common.style';
import { NavButton } from '../styles/header.style';
import Modal from './Modal';
import { apiDelete } from '../ApiServices/apiServices';
import { useSelector } from 'react-redux';

const ExamTable = ({data}) => {
  const{ user }=useSelector((state)=>state.userReducer);
  const navigate=useNavigate();
  const[show,setShow]=useState(false);
  const[response,setResponse]=useState();
  console.log('Exam Table',response);
  
    // const changeShow=()=>{
    //   setShow(!show);
    // }
    const deleteExam=async()=>{
           const response=await apiDelete('/exam/deleteexam',{'examId':data.examId,'partyId':user[0]});
           console.log(response);
           setResponse(response);
          //  changeShow();
           navigate(0);
    }
    
   
  return (
     <CommonTable>
        <TableRow>
            <Content>{data.examName}</Content>
            <ButtonContainer>
              <NavButton to={`/assignexam/${data.examId}`} >Assign exam</NavButton>
              <NavButton to={`/getexamtopic/${data.examId}`} >Topics</NavButton>
              <NavButton to={`/getexam/${data.examId}`}>Edit</NavButton>
              <Button onClick={deleteExam}>Delete</Button>
            </ButtonContainer>
        {show && <Modal>{response.successMessage}</Modal>}
        </TableRow>
       
     </CommonTable>
  )
}

export default ExamTable
