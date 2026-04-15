import React from 'react'
import { Button, ButtonContainer, CommonTable, Content, EditButton, Navlink, TableRow } from '../styles/common_style'
import { useNavigate } from 'react-router-dom';
import { NavButton } from '../styles/header_style';
import { apiDelete } from '../ApiServices/apiServices';
import { FaPen } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

const Table = ({ data }) => {
  return (
    <CommonTable>
      <TableRow>
        <Content>{data.topicName}</Content>
        <ButtonContainer>
          <Navlink to={`/question/${data.topicId}`}><FaArrowUpRightFromSquare /> Questions</Navlink>
          <EditButton to={`/addtopic/${data.topicId}`}><FaPen></FaPen></EditButton>
        </ButtonContainer>
      </TableRow>
    </CommonTable>
  )
}

export default Table
