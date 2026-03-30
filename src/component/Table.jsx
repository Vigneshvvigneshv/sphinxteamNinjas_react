
import { Button, ButtonContainer, CommonTable, Content, TableRow } from '../styles/common.style'
import { useNavigate } from 'react-router-dom';
import { NavButton } from '../styles/header.style';
import { useEffect } from 'react';

const Table = ({data}) => {
    const navigate=useNavigate();
    const handleSubmit=async()=>{
           const response=await fetch("https://localhost:8443/sphinx/api/topic/deletetopic",{
               method:"DELETE",
               headers:{
                   "Content-Type":"application/json"
               },
               body: JSON.stringify({"topicId":data.topicId})
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
              <NavButton to={`/question/${data.topicId}`} >Questions</NavButton>
              <NavButton to={`/addtopic/${data.topicId}`}>Edit topic</NavButton>
              <Button onClick={()=>{handleSubmit();}}>Delete topic</Button>
            </ButtonContainer>
        </TableRow>
     </CommonTable>
  )
}

export default Table
