
import {ButtonContainer, Content, TableRow,AddButton, EditButton} from '../styles/common_style'
import { LuNotepadText } from "react-icons/lu";
import { IoMdDownload } from "react-icons/io";
import React from 'react'

import { useSelector } from 'react-redux';
import { apiPost } from '../ApiServices/apiServices';
import { toast } from 'sonner';

const CompletedExamTable = ({data}) => {

    const partyId=useSelector((state)=>state.userReducer.partyId);

  return (
    <>
      <TableRow>
        <Content>{data.examName}</Content>
        <ButtonContainer>
            {console.log("data",data.examId)}
            <AddButton to={`/exam-result/${data.examId}/${partyId}`}><LuNotepadText/>Result</AddButton>

            <EditButton><IoMdDownload />Certificate</EditButton>
        </ButtonContainer>
      </TableRow>
    </>
  )
}

export default CompletedExamTable
