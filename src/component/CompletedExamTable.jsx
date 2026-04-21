
import {ButtonContainer, Content, TableRow,AddButton, EditButton} from '../styles/common_style'
import { LuNotepadText } from "react-icons/lu";
import { IoMdDownload } from "react-icons/io";
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CompletedExamTable = ({data}) => {
  const navigate = useNavigate();
  const partyId = useSelector(state => state.userReducer.partyId);
  return (
    <>
      <TableRow>
        <Content>{data.examName}</Content>
        <ButtonContainer>
            <AddButton onClick={() => navigate(`/exam-result/${data.examId}/${partyId}`)}><LuNotepadText/>Result</AddButton>
            <EditButton><IoMdDownload />Certificate</EditButton>
        </ButtonContainer>
      </TableRow>
    </>
  )
}

export default CompletedExamTable
