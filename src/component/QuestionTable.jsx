import React from 'react'
import { useNavigate } from 'react-router-dom';

const QuestionTable = ({data}) => {

   const navigate=useNavigate();
    const handleSubmit=async()=>{
           const response=await fetch("https://localhost:8443/sphinx/api/question/deletequestion",{
               method:"DELETE",
               headers:{
                   "Content-Type":"application/json"
               },
               body: JSON.stringify({"questionId":data.questionId})
           });
        const deleteData= await response.json();
        console.log(deleteData);
        navigate(0);
    }
    
   
  return (
     <CommonTable>
        <TableRow>
            <Content>{data.topicName}</Content>
            <ButtonContainer>
              <NavButton to={`/question/${data.topicId}`} >Answers</NavButton>
              <NavButton to={`/updatetopic/${data.topicId}`}>Edit question</NavButton>
              <Button onClick={()=>{handleSubmit();}}>Delete question</Button>
            </ButtonContainer>
        </TableRow>
     </CommonTable>
  )
  )
}

export default QuestionTable
