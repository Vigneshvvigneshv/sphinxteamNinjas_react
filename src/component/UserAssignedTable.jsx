import React, { useState } from "react";
import { Button, ButtonContainer, CommonTable, Content, DeleteButton, ExamHeader, TableRow } from "../styles/common_style";
import { FaPen } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import BackDrop from "./BackDrop";
import { FileInput } from "../styles/form_style";
import Modal from "../component/Modal";

const UserAssignedTable = ({data,changeShowDelete,changeShowEdit}) => {



  

  return (
    <>
      <CommonTable>
        <TableRow>
            <Content>{data.userLoginId}</Content>
           <ExamHeader>Allowed attempts:<Content>{data.allowedAttempts}</Content></ExamHeader>
            <ExamHeader>Timeout Days:<Content>{data.timeoutDays}</Content></ExamHeader>
            <ButtonContainer>
            <Button onClick={()=>changeShowEdit(data)}><FaPen/></Button>
            <DeleteButton onClick={()=>changeShowDelete(data.partyId)}><FaX/></DeleteButton>
            </ButtonContainer>
        </TableRow>
        </CommonTable>
        
      
    </>
  );
};

export default UserAssignedTable;
