import React, { useState } from "react";
import { Button, ButtonContainer, CommonTable, Content, DeleteButton, EditButton, ExamHeader, TableRow } from "../styles/common_style";
import { FaPen } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import BackDrop from "./BackDrop";
import { FileInput } from "../styles/form_style";
import Modal from "../component/Modal";

const UserAssignedTable = ({data,changeShowDelete,changeShowEdit}) => {
  return (
    <>
    
        <TableRow>
            <Content>{data.userLoginId}</Content>
           <ExamHeader>Allowed attempts:<Content>{data.allowedAttempts}</Content></ExamHeader>
            <ExamHeader>Timeout Days:<Content>{data.timeoutDays}</Content></ExamHeader>
            <ButtonContainer>
            <EditButton onClick={()=>changeShowEdit(data)}><FaPen/></EditButton>
            <DeleteButton onClick={()=>changeShowDelete(data.partyId)}><FaX/></DeleteButton>
            </ButtonContainer>
        </TableRow>
       
        
      
    </>
  );
};

export default UserAssignedTable;
