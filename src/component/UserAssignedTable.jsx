import React, { useState } from "react";
import { Button, ButtonContainer, CommonTable, Content, DeleteButton, ExamHeader, TableRow } from "../styles/common_style";
import { FaPen } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import BackDrop from "./BackDrop";
import { FileInput } from "../styles/form_style";
import Modal from "../component/Modal";

const UserAssignedTable = ({data,onDelete,onUpdate,changeShow}) => {
  const [showEdit,setShowEdit]=useState(false);
  // const [showDelete,setShowDelete]=useState(false);
  const [userObj,setUserObj]=useState({
    partyId:data.partyId,
    allowedAttempts:data.allowedAttempts,
    timeoutDays:data.timeoutDays
  });

  const handleChange=(key, value)=>{
    let newObj = {...userObj, [key]: value};
    setUserObj(newObj);
  } 


  

  return (
    <>
      <CommonTable>
        <TableRow>
            <Content>{data.userLoginId}</Content>
           <ExamHeader>Allowed attempts:<Content>{data.allowedAttempts}</Content></ExamHeader>
            <ExamHeader>Timeout Days:<Content>{data.timeoutDays}</Content></ExamHeader>
            <ButtonContainer>
            <Button onClick={()=>{setShowEdit(!showEdit)}}><FaPen/></Button>
            <DeleteButton onClick={()=>changeShow(data.partyId)}><FaX/></DeleteButton>
            </ButtonContainer>
        </TableRow>
        </CommonTable>
        {showEdit && 
          <BackDrop>
            <Content>{data.userLoginId}</Content>
            <ExamHeader>Allowed attempts:<FileInput type="text" value={userObj.allowedAttempts} onChange={(e)=>handleChange("allowedAttempts", e.target.value)}></FileInput></ExamHeader>
            <ExamHeader>Timeout Days:<FileInput type="text" value={userObj.timeoutDays} onChange={(e)=>handleChange("timeoutDays", e.target.value)}></FileInput></ExamHeader>
            <ButtonContainer>
              <DeleteButton onClick={()=>setShowEdit(!showEdit)}>Cancle</DeleteButton>
              <Button onClick={()=>{onUpdate(userObj);setShowEdit(!showEdit)}}>Save</Button>
            </ButtonContainer>
          </BackDrop>
        }
      
    </>
  );
};

export default UserAssignedTable;
