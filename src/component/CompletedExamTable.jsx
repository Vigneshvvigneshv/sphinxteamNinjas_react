
import {ButtonContainer, Content, TableRow,AddButton, EditButton} from '../styles/common_style'
import { LuNotepadText } from "react-icons/lu";
import { IoMdDownload } from "react-icons/io";
import React from 'react'

const CompletedExamTable = ({data}) => {
  return (
    <>
      <TableRow>
        <Content>{data.examName}</Content>
        <ButtonContainer>
            <AddButton><LuNotepadText/>Result</AddButton>
            <EditButton><IoMdDownload />Certificate</EditButton>
        </ButtonContainer>
      </TableRow>
    </>
  )
}

export default CompletedExamTable
