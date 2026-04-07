import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, ButtonContainer, CommonTable, Content, TableRow } from '../styles/common.style';
import { NavButton } from '../styles/header.style';
import { apiDelete, apiGet } from '../ApiServices/apiServices';

const QuestionTable = ({data,name}) => {
    const[answer,setAnswer]=useState();
   console.log('Question Table Page',data);
   
   const navigate=useNavigate();
    const handleSubmit=async()=>{
        console.log('handle submit called');
        const response=await apiDelete('/question/deletequestion',{"questionId":data.questionId});
        console.log(response);
        navigate(0)
    }
   //  const getAnswer=async(id)=>{
   //    const response=await apiGet('/')
   //  }
   
  return (
     <CommonTable>
        <TableRow>
            <Content>{data.questionDetail}</Content>
            <Content>{data.questionTypeId}</Content>
            <ButtonContainer>
              <Button>Answers</Button>
              <NavButton to={`/createquestion/${data.questionId}`} state={{topicId:data.topicId,topicName:name}}>Edit</NavButton>
              <Button onClick={()=>{handleSubmit();}}>Delete</Button>
            </ButtonContainer>
        </TableRow>
     </CommonTable>
  )
  
}

export default QuestionTable
