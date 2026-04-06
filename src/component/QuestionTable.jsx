import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, ButtonContainer, CommonTable, Content, TableRow } from '../styles/common.style';
import { NavButton } from '../styles/header.style';
import { apiDelete } from '../ApiServices/apiServices';

const QuestionTable = ({data}) => {
    
   
   const navigate=useNavigate();
    const handleSubmit=async()=>{
        console.log('handle submit called');
        const response=await apiDelete('/question/deletequestion',{"questionId":data.questionId});
        console.log(response);
        navigate(0)
       
    }
    
   
  return (
     <CommonTable>
        <TableRow>
            <Content>{data.questionDetail}</Content>
            <Content>{data.questionTypeId}</Content>
            <ButtonContainer>
              <NavButton to={'/getanswers'}>Answers</NavButton>
              <NavButton to={`/createquestion/${data.questionId}`} state={{topicId:data.topicId}}>Edit question</NavButton>
              <Button onClick={()=>{handleSubmit();}}>Delete question</Button>
            </ButtonContainer>
        </TableRow>
     </CommonTable>
  )
  
}

export default QuestionTable
