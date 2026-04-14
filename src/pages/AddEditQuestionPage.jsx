import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import {
  ErrorMessage, FieldContainer, Form, FormContainer, FormHeading,
  FormInput, FormLabel, FormText, LabelContainer, SubmitButton, SuccessMessage
} from '../styles/form_style';
import {
  ButtonContainer, CommonContainer, CommonHeading,
  Container, Content, Dropdown, Title
} from '../styles/common_style';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import SingleChoice from '../component/SingleChoice';
import MultiChoice from '../component/MultiChoice';
import {
  QuestionContainer, QuestionFieldContainer, QuestionFormContainer,
  QuestionHeaderContainer, QuestionTypeBadge, ProgressLabel,
  LeftSideContainer,
  RightSideContainer,
  QuestionUpperContainer,
  Option
} from '../styles/question_style';
import { validateQuestion } from '../validation/ValidationUtil';
import { apiGet, apiPost, apiPut } from '../ApiServices/apiServices';
import { NavButton } from '../styles/header_style';
import TrueOrFalse from '../component/TrueOrFalse';
import Modal from '../component/Modal';

const CreateQuestionPage = () => {
  const {id} = useParams();
  
  const navigate=useNavigate();
  const location = useLocation();
  const topicId = location.state?.topicId;
  const topicName = location.state?.topicName;
  console.log('create question page topic id', topicId);
  console.log('create question page topic Name', topicName)

  const [error, setError] = useState("");
  const [questionType, setQuestionType] = useState('SINGLE_CHOICE');
  const [difficultyLevel, setDifficultyLevel] = useState('1');
  const [show, setShow] = useState(false);
  const[topic,setTopic]=useState([]);
 

  const changeShow = () => {
    setShow(!show);
  }

  console.log(error);
  const [formData, setFormData] = useState({
    topicId: topicId || "",
    questionDetail: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
    numAnswers: 1,
    questionTypeId: questionType,
    difficultyLevel: difficultyLevel,
    answerValue: 1,
    negativeMarkValue: ""
  });

  useEffect(() => {
    console.log(id);
    if (id !== undefined) {

      const fetchData = async () => {
        const response = await apiGet('/question/getquestion-by-id?questionId=' + id);
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


//fetching all topics
  const getTopic=async()=>{
      const response = await apiGet('/topic/getall-topic');
        console.log("AllTopic ",response)
        setTopic(response.topicList);
  }

 useEffect(()=>{
    if(!topicName){
      getTopic();
    }
  },[])


  

 const handleChange = (e) => {
  const { name, value,checked } = e.target;

  if (name === "answer" && questionType === "MULTI_CHOICE") {
    setFormData((prev) => {
      let updatedAnswers = Array.isArray(prev.answer) ? [...prev.answer] : [];
      if (checked) {
        updatedAnswers.push(value);
      } else {
        updatedAnswers = updatedAnswers.filter((ans) => ans !== value);
      }

      return {
        ...prev,
        answer: updatedAnswers
      };
    });
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      questionTypeId: questionType,
      difficultyLevel: difficultyLevel, 
    }));
  }

  setError((prev) => ({
    ...prev,
    [name]: ""
  }));
};


//Whenever Question Type change answer value will be empty
useEffect(() => {
  setFormData((prev) => ({
    ...prev,
    answer: questionType === "MULTI_CHOICE" ? [] : "",
    questionTypeId: questionType
  }));
}, [questionType]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateQuestion(formData);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;


    // console.log("formData => ", formData);
    // return;
    if (id !== undefined) {
      const response = await apiPut('/question/update-question', {...formData, questionId: id});
      console.log(response);
      if (response.errorMessage !== undefined) {
        setError(response);
      } else if (response.successMessage!== undefined) {
        setFormData({ ...formData, [e.target.name]: "" })
        setError(response);
        changeShow();
      }
    } else {
      const response = await apiPost('/question/create-question', formData);
      console.log(response);
      if (response.errorMessage !== undefined) {
        setError(response);
      } else if (response.successMessage !== undefined) {
        setFormData({ ...formData, [e.target.name]: "" })
        setError(response);
        // changeShow(); 
      }
    }
  }

  useEffect(()=>{
    console.log("topicName => ",topicName)
    console.log("topicList => ",topic)
  }, [topic])


  const handleTopic=(value)=>{
    const newObj = {...formData, topicId:value}
    setFormData(newObj);
  }
  return (
    <Layout>
      <QuestionContainer>
        
        <QuestionHeaderContainer>
          {/* {console.log("TopicName ",topicName)} */}
          <CommonHeading>{topicName}</CommonHeading>
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

          

    {!topicName && 
          <Dropdown name ="" value={topicId} onChange={(e)=>handleTopic(e.target.value)}>
            {topic.map((e)=>(
              <option  value={e.topicId}>{e.topicName}</option>       
            ))}
          </Dropdown>}
        </QuestionHeaderContainer>
  
        <QuestionFormContainer>
          <Form onSubmit={handleSubmit}>
              <QuestionUpperContainer>
            <LeftSideContainer>
            <QuestionFieldContainer>
              <LabelContainer>
              <FormLabel>Question</FormLabel>
              </LabelContainer>
              <FormText
                name='questionDetail'
                placeholder='Enter the question here'
                type='text'
                value={formData.questionDetail}
                onChange={handleChange}
              />
              {error.questionDetail && <ErrorMessage>{error.questionDetail}</ErrorMessage>}
            </QuestionFieldContainer>
            {questionType === 'SINGLE_CHOICE' && <SingleChoice change={handleChange} error={error} data={formData} />}
            {questionType === 'MULTI_CHOICE' && <MultiChoice change={handleChange} error={error} data={formData} />}
            {questionType === 'TRUE_FALSE' && <TrueOrFalse change={handleChange} error={error} data={{...formData, optionA: "TRUE", optionB: "FALSE"}} />}
          </LeftSideContainer>

          <RightSideContainer>
            <QuestionFieldContainer>
              <LabelContainer>
              <FormLabel>Answer</FormLabel>
              </LabelContainer>
              <FormInput
                name='answer'
                placeholder='Enter the answer option'
                type='text' disabled={true} 
                value={formData.answer}
                onChange={handleChange}
              />
              {error.answer && <ErrorMessage>{error.answer}</ErrorMessage>}
            </QuestionFieldContainer>

            <QuestionFieldContainer>
              <LabelContainer>
              <FormLabel>Mark</FormLabel>
              </LabelContainer>
              <FormInput
                name='answerValue'
                placeholder='Enter the mark'
                type='text'
                value={formData.answerValue}
                onChange={handleChange}
              />
              {error.answerValue && <ErrorMessage>{error.answerValue}</ErrorMessage>}
            </QuestionFieldContainer>
            
            
            {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
            {error.successMessage && <SuccessMessage>{error.successMessage}</SuccessMessage>}
            </RightSideContainer>
    </QuestionUpperContainer>
    {/* negative mark */}
             <QuestionFieldContainer>
              <LabelContainer>
              <FormLabel>Negative mark</FormLabel>
              </LabelContainer>
              <FormInput
                name='negativeMarkValue'
                placeholder='Enter the negative mark'
                type='text'
                value={formData.negativeMarkValue}
                onChange={handleChange}
              />
              {error.negativeMarkValue && <ErrorMessage>{error.negativeMarkValue}</ErrorMessage>}
            </QuestionFieldContainer>
            {/* difficulty level */}
            <QuestionFieldContainer>
              <LabelContainer>
              <FormLabel>Difficulty level</FormLabel>
              </LabelContainer>
              <Dropdown value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)}>
                <option value='1'>Easy</option>
                <option value='2'>Medium</option>
                <option value='3'>Hard</option>
              </Dropdown>


            </QuestionFieldContainer>
            
            <SubmitButton>{id !== undefined ? 'Save' : 'Add'}</SubmitButton>
            {/* {show && <Modal>{error.successMessage}</Modal>} */}
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
