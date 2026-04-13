import React, { useState } from 'react'
import { AnswerContainer, AnswerOption, Button, ButtonContainer, CommonTable, Content, DeleteButton, EditButton, TableRow } from '../styles/common_style';
import { NavButton } from '../styles/header_style';
import { Answer, AnswerHeader, Option, SelectAllContainer } from '../styles/question_style';
import { useNavigate } from 'react-router-dom';
import { CheckBox } from '../styles/form_style';
import { apiDelete } from '../ApiServices/apiServices';
import { FaPen, FaTrash } from 'react-icons/fa';

const AllQuestionsTable = ({ data, name,change,selectedIds,setSelectedIds }) => {

const [answer, setAnswer] = useState();
 

  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log('handle submit called');

    const idsToDelete =
    selectedIds.length > 0
      ? selectedIds
      : [data.questionId];

     
    const response = await apiDelete('/question/delete-question', { questionIds: idsToDelete });
    console.log(response);
    navigate(0)
  }

  const showAnswer = () => {
    setAnswer(data)
  }
  return (
    <CommonTable>
          <TableRow>
            <SelectAllContainer>
            <CheckBox type="checkbox"
                      checked={selectedIds.includes(Number(data.questionId))} 
                      onChange={(e)=>change(e,data.questionId)}
                      ></CheckBox>
            <Content>{data.questionDetail}</Content>
            </SelectAllContainer>
            <Content>{data.topicName}</Content>
            <Content>{data.questionTypeId}</Content>
            <ButtonContainer>
              <Button onClick={showAnswer}>Answers</Button>
              <EditButton
                to={`/createquestion/${data.questionId}`}
                state={{ topicId: data.topicId, topicName: name }}
              >
                <FaPen/>
              </EditButton>
              <DeleteButton onClick={() => { handleSubmit() }} ><FaTrash/></DeleteButton>
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

export default AllQuestionsTable
