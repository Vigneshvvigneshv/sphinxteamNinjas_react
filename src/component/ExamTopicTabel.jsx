import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CommonTable, Container, Content, TableRow } from '../styles/common_style';

const ExamTopicTable = ({ data, examId }) => {
  const navigate = useNavigate();
  console.log('ExamTopicTable', data, examId);

  return (
    <CommonTable>
      <TableRow>
        <Container>
          <Content>{data.topicName}</Content>
        </Container>
        <Container>
          <Content>Percentage — {data.percentage}</Content>
        </Container>
        <Container>
          <Content>Pass Percentage — {data.topicPassPercentage}</Content>
        </Container>
      </TableRow>
    </CommonTable>
  )
}

export default ExamTopicTable
