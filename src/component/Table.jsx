import React from 'react'
import { Button, ButtonContainer, CommonTable, Content, TableRow } from '../styles/common_style'
import { useNavigate } from 'react-router-dom';
import { NavButton } from '../styles/header_style';
import { apiDelete } from '../ApiServices/apiServices';

const Table = ({ data }) => {
  return (
    <CommonTable>
      <TableRow>
        <Content>{data.topicName}</Content>
        <ButtonContainer>
          <NavButton to={`/question/${data.topicId}`}>Questions</NavButton>
          <NavButton to={`/addtopic/${data.topicId}`}>Edit</NavButton>
        </ButtonContainer>
      </TableRow>
    </CommonTable>
  )
}

export default Table
