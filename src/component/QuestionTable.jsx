import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  AnswerContainer, AnswerOption, Button, ButtonContainer,
  CommonTable, Content, TableRow
} from '../styles/common_style';
import { NavButton } from '../styles/header_style';
import { apiDelete } from '../ApiServices/apiServices';
import { Answer, AnswerHeader, Option } from '../styles/question_style';

const QuestionTable = ({ data, name }) => {
  const [answer, setAnswer] = useState();
  console.log('Question Table Page', data);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log('handle submit called');
    const response = await apiDelete('/question/deletequestion', { "questionId": data.questionId });
    console.log(response);
    navigate(0)
  }

  const showAnswer = () => {
    setAnswer(data)
  }

  return (
    <CommonTable>
      <TableRow>
        <Content>{data.questionDetail}</Content>
        <Content>{data.questionTypeId}</Content>
        <ButtonContainer>
          <Button onClick={showAnswer}>Answers</Button>
          <NavButton
            to={`/createquestion/${data.questionId}`}
            state={{ topicId: data.topicId, topicName: name }}
          >
            Edit
          </NavButton>
          <Button onClick={() => { handleSubmit(); }}>Delete</Button>
        </ButtonContainer>
      </TableRow>

      {answer && (
        <AnswerContainer>
          <AnswerHeader>
            <Content>Answer</Content>
            <Button onClick={() => { setAnswer('') }}>Hide</Button>
          </AnswerHeader>
          <AnswerOption>
            {data.optionA && <Option>Option A — {data.optionA}</Option>}
            {data.optionB && <Option>Option B — {data.optionB}</Option>}
            {data.optionC && <Option>Option C — {data.optionC}</Option>}
            {data.optionD && <Option>Option D — {data.optionD}</Option>}
          </AnswerOption>
          <Answer>Answer: option — {data.answer}</Answer>
        </AnswerContainer>
      )}
    </CommonTable>
  )
}

export default QuestionTable
