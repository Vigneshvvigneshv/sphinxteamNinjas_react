import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import {
  ErrorMessage, FieldContainer, Form, FormContainer, FormHeading,
  FormInput, FormLabel, FormText, SubmitButton, SuccessMessage
} from '../styles/form_style';
import {
  ButtonContainer, CommonContainer, CommonHeading,
  Container, Content, Dropdown, Title
} from '../styles/common_style';
import { useLocation, useParams } from 'react-router-dom';
import SingleChoice from '../component/SingleChoice';
import MultiChoice from '../component/MultiChoice';
import {
  QuestionContainer, QuestionFieldContainer, QuestionFormContainer,
  QuestionHeaderContainer, QuestionTypeBadge, ProgressLabel
} from '../styles/question_style';
import { validateQuestion } from '../validation/ValidationUtil';
import { apiGet, apiPost, apiPut } from '../ApiServices/apiServices';
import { NavButton } from '../styles/header_style';
import TrueOrFalse from '../component/TrueOrFalse';
import Modal from '../component/Modal';

const CreateQuestionPage = () => {
  const {id} = useParams();
  console.log('Create question page', id);

  const location = useLocation();
  const topicId = location.state?.topicId;
  const topicName = location.state?.topicName;
  console.log('create question page topic id', topicId);

  const [error, setError] = useState("");
  const [questionType, setQuestionType] = useState('SINGLE_CHOICE');
  const [difficultyLevel, setDifficultyLevel] = useState('1');
  const [show, setShow] = useState(false);
  console.log('Create question Page', show);

  const changeShow = () => {
    setShow(!show);
  }

  console.log(error);
  const [formData, setFormData] = useState({
    topicId: topicId,
    questionDetail: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
    numAnswers: 1,
    questionTypeId: questionType,
    difficultyLevel: difficultyLevel,
    answerValue: "",
    negativeMarkValue: ""
  });

  useEffect(() => {
    console.log(id);
    if (id !== undefined) {
      const fetchData = async () => {
        const response = await apiGet('/question/getquestionbyid?questionId=' + id);
        console.log('create question page', response);
        setFormData({
          questionDetail: response.question.questionDetail,
          optionA: response.question.optionA,
          optionB: response.question.optionB,
          optionC: response.question.optionC,
          optionD: response.question.optionD,
          answer: response.question.answer,
          numAnswers: response.question.numAnswers,
          answerValue: response.question.answerValue,
          negativeMarkValue: response.question.negativeMarkValue,
          questionTypeId: response.question.questionTypeId,
          difficultyLevel: response.question.difficultyLevel
        })
        setQuestionType(response.question.questionTypeId);
        setDifficultyLevel(response.question.difficultyLevel);
      }
      fetchData()
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      questionTypeId: questionType,
      difficultyLevel: difficultyLevel
    });
    setError({
      ...error,
      [e.target.name]: ""
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateQuestion(formData);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (id !== undefined) {
      const response = await apiPut('/question/updatequestion', {...formData, questionId: id});
      console.log(response);
      if (response.errorMessage !== undefined) {
        setError(response);
      } else if (response.responseMessage !== undefined) {
        setFormData({ ...formData, [e.target.name]: "" })
        setError(response);
        changeShow();
      }
    } else {
      const response = await apiPost('/question/createquestion', formData);
      console.log(response);
      if (response.errorMessage !== undefined) {
        setError(response);
      } else if (response.successMessage !== undefined) {
        setFormData({ ...formData, [e.target.name]: "" })
        setError(response);
        changeShow();
      }
    }
  }

  return (
    <Layout>
      <QuestionContainer>
        <QuestionHeaderContainer>
          <CommonHeading>{topicName} —</CommonHeading>
          <CommonHeading>Question type</CommonHeading>
          <Dropdown
            value={questionType}
            onChange={(e) => { setQuestionType(e.target.value); setError("") }}
          >
            <option value='SINGLE_CHOICE'>Single choice</option>
            <option value='MULTI_CHOICE'>Multiple choice</option>
            <option value='TRUE_FALSE'>True or false</option>
            <option value='FILL_BLANKS'>Fill in the blanks</option>
            <option value='DETAILED_ANSWER'>Detailed answer</option>
          </Dropdown>
        </QuestionHeaderContainer>

        <QuestionFormContainer>
          <Form onSubmit={handleSubmit}>
            <QuestionFieldContainer>
              <FormLabel>Question text</FormLabel>
              <FormText
                name='questionDetail'
                placeholder='Enter the question'
                type='text'
                value={formData.questionDetail}
                onChange={handleChange}
              />
              {error.questionDetail && <ErrorMessage>{error.questionDetail}</ErrorMessage>}
            </QuestionFieldContainer>

            {questionType === 'SINGLE_CHOICE' && <SingleChoice change={handleChange} error={error} data={formData} />}
            {questionType === 'MULTI_CHOICE' && <MultiChoice change={handleChange} error={error} data={formData} />}
            {questionType === 'TRUE_FALSE' && <TrueOrFalse change={handleChange} error={error} data={{...formData, optionA: "TRUE", optionB: "FALSE"}} />}

            <QuestionFieldContainer>
              <FormLabel>Answer</FormLabel>
              <FormInput
                name='answer'
                placeholder='Enter the answer option'
                type='text'
                value={formData.answer}
                onChange={handleChange}
              />
              {error.answer && <ErrorMessage>{error.answer}</ErrorMessage>}
            </QuestionFieldContainer>

            <QuestionFieldContainer>
              <FormLabel>Mark</FormLabel>
              <FormInput
                name='answerValue'
                placeholder='Enter the mark'
                type='text'
                value={formData.answerValue}
                onChange={handleChange}
              />
              {error.answerValue && <ErrorMessage>{error.answerValue}</ErrorMessage>}
            </QuestionFieldContainer>

            <QuestionFieldContainer>
              <FormLabel>Negative mark</FormLabel>
              <FormInput
                name='negativeMarkValue'
                placeholder='Enter the negative mark'
                type='text'
                value={formData.negativeMarkValue}
                onChange={handleChange}
              />
              {error.negativeMarkValue && <ErrorMessage>{error.negativeMarkValue}</ErrorMessage>}
            </QuestionFieldContainer>

            <QuestionFieldContainer>
              <FormLabel>Difficulty level</FormLabel>
              <Dropdown value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)}>
                <option value='1'>Easy</option>
                <option value='2'>Medium</option>
                <option value='3'>Hard</option>
              </Dropdown>
            </QuestionFieldContainer>

            {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
            {error.successMessage && <SuccessMessage>{error.successMessage}</SuccessMessage>}
            <SubmitButton>{id !== undefined ? 'Edit' : 'Add'}</SubmitButton>
            {show && <Modal>{error.message}</Modal>}
          </Form>
        </QuestionFormContainer>

        <CommonContainer>
          <NavButton to={`/question/${topicId}`} state={{topicId: topicId}}>Back to Question</NavButton>
        </CommonContainer>
      </QuestionContainer>
    </Layout>
  )
}

export default CreateQuestionPage
