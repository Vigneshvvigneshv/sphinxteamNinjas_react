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
  Option,
  ProfessionalHeaderContainer, ConfigGroup, FieldWrapper, TopicBadge, ConfigDropdown, FormMainContainer, MainFieldContainer, OptionsWrapper, OptionsSection, OptionsDisclaimer, ScoringSidebar, ScoringHeading, ScoringRow, ScoringFieldWrapper, ActionBottomWrapper, ActionButton,
  QuestionInputWrapper,
  QuestionInputBox
} from '../styles/question_style';
import { validateQuestion } from '../validation/ValidationUtil';
import { apiGet, apiPost, apiPut } from '../ApiServices/apiServices';
import { NavButton } from '../styles/header_style';
import TrueOrFalse from '../component/TrueOrFalse';
import Modal from '../component/Modal';
import { toast } from 'sonner';

const CreateQuestionPage = () => {
  //questionId
  const {id} = useParams();
  console.log("Id ",id);
  const navigate=useNavigate();
  const location = useLocation();
  const topicId = location.state?.topicId;
  console.log("TopicId ",topicId)
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
    negativeMarkValue: 0
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
    const { name, value, checked } = e.target;
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
      // FIX: Removed hardcoded questionTypeId and difficultyLevel overrides.
      // These are now kept in sync via their own dedicated useEffect hooks below.
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setError((prev) => ({
      ...prev,
      [name]: ""
    }));
  };


  // Whenever Question Type changes, reset answer and sync questionTypeId into formData
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      answer: questionType === "MULTI_CHOICE" ? [] : "",
      questionTypeId: questionType,
    }));
  }, [questionType]);

  // FIX: Whenever difficultyLevel state changes, sync it into formData
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      difficultyLevel: difficultyLevel,
    }));
  }, [difficultyLevel]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateQuestion(formData);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;


    // console.log("formData => ", formData);
    // return;
    if (id!== undefined) {
      const response = await apiPut('/question/update-question', {...formData, questionId: id,topicId:topicId});
      console.log(response);
      if (response.errorMessage !== undefined) {
        setError(response);
        toast.error(`${response.errorMessage}`,{
          position:"top-center"
        })
      } else if (response.successMessage!== undefined) {
        setFormData({ ...formData, [e.target.name]: "" })
        setError(response);
        // toast.success(`${response.message}`,{
        //   position:"top-center"
        // })
        changeShow();
      }
    } else {
      const response = await apiPost('/question/create-question', formData);
      console.log(response);
      if (response.errorMessage !== undefined) {
        setError(response);
        toast.error(`${response.errorMessage}`,{
          position:"top-center"
        })
      } else if (response.successMessage !== undefined) {
        setFormData({ ...formData, [e.target.name]: "" })
        setError(response);
        toast.success(`${response.successMessage}`,{
          position:"top-center"
        })
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
        
        <ProfessionalHeaderContainer>
          <ConfigGroup>
            <FieldWrapper>
              <LabelContainer>
                <FormLabel>Topic</FormLabel>
              </LabelContainer>
              {topicName ? (
                 <TopicBadge>
                   {topicName}
                 </TopicBadge>
              ) : (
                 <ConfigDropdown name="" value={topicId} onChange={(e)=>handleTopic(e.target.value)} $minWidth="200px">
                   <option value="">Select Topic</option>
                   {topic.map((e)=>(
                     <option key={e.topicId} value={e.topicId}>{e.topicName}</option>       
                   ))}
                 </ConfigDropdown>
              )}
            </FieldWrapper>

            <FieldWrapper>
              <LabelContainer>
                <FormLabel>Question Type</FormLabel>
              </LabelContainer>
              <ConfigDropdown
                value={questionType}
                onChange={(e) => { setQuestionType(e.target.value); setError("") }}
                $minWidth="200px"
              >
                <option value='SINGLE_CHOICE'>Single choice</option>
                <option value='MULTI_CHOICE'>Multiple choice</option>
                <option value='TRUE_FALSE'>True or false</option>
                <option value='FILL_BLANKS'>Fill in the blanks</option>
                <option value='DETAILED_ANSWER'>Detailed answer</option>
              </ConfigDropdown>
            </FieldWrapper>
            
            <FieldWrapper>
              <LabelContainer>
                <FormLabel>Difficulty Level</FormLabel>
              </LabelContainer>
              <ConfigDropdown value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)} $minWidth="140px">
                <option value='1'>Easy</option>
                <option value='2'>Medium</option>
                <option value='3'>Hard</option>
              </ConfigDropdown>
            </FieldWrapper>
          </ConfigGroup>
        </ProfessionalHeaderContainer>
  
        <FormMainContainer>
          <Form onSubmit={handleSubmit}>
            <QuestionUpperContainer>
              <LeftSideContainer>
                <FieldContainer>
                  <LabelContainer>
                    <FormLabel>Question Content</FormLabel>
                  </LabelContainer>
                  <QuestionInputWrapper>
                    <QuestionInputBox
                      name='questionDetail'
                      placeholder='Enter the full question text here...'
                      type='text'
                      value={formData.questionDetail}
                      onChange={handleChange}
                    />
                  </QuestionInputWrapper>
                  {error.questionDetail && <ErrorMessage>{error.questionDetail}</ErrorMessage>}
                </FieldContainer>

                <OptionsWrapper>
                  <FormLabel>Options</FormLabel>
                  <OptionsSection>
                    {questionType === 'SINGLE_CHOICE' && <SingleChoice change={handleChange} error={error} data={formData} />}
                    {questionType === 'MULTI_CHOICE' && <MultiChoice change={handleChange} error={error} data={formData} />}
                    {questionType === 'TRUE_FALSE' && <TrueOrFalse change={handleChange} error={error} data={{...formData, optionA: "TRUE", optionB: "FALSE"}} />}
                    {questionType === 'FILL_BLANKS' && <OptionsDisclaimer>No predefined options required for Fill in the Blanks. Configure the answer directly on the right panel.</OptionsDisclaimer>}
                    {questionType === 'DETAILED_ANSWER' && <OptionsDisclaimer>No predefined options required for Detailed Answer. Configure the answer directly on the right panel.</OptionsDisclaimer>}
                  </OptionsSection>
                </OptionsWrapper>
              </LeftSideContainer>

              <ScoringSidebar>
                <div>
                  <ScoringHeading>Scoring & Answers</ScoringHeading>
                  
                  <ScoringFieldWrapper>
                    <LabelContainer>
                      <FormLabel>Correct Answer</FormLabel>
                    </LabelContainer>
                    <FormInput
                      name='answer'
                      placeholder='Enter the correct answer'
                      type='text' disabled={questionType !== 'FILL_BLANKS' && questionType !== 'DETAILED_ANSWER'} 
                      value={formData.answer}
                      onChange={handleChange}
                    />
                    {error.answer && <ErrorMessage>{error.answer}</ErrorMessage>}
                  </ScoringFieldWrapper>

                  <ScoringRow>
                    <ScoringFieldWrapper>
                      <LabelContainer>
                        <FormLabel>Mark (+)</FormLabel>
                      </LabelContainer>
                      <FormInput
                        name='answerValue'
                        placeholder='0'
                        type='number'
                        value={formData.answerValue}
                        onChange={handleChange}
                      />
                      {error.answerValue && <ErrorMessage>{error.answerValue}</ErrorMessage>}
                    </ScoringFieldWrapper>
                    
                    <ScoringFieldWrapper>
                      <LabelContainer>
                        <FormLabel>Negative Mark (-)</FormLabel>
                      </LabelContainer>
                      <FormInput
                        name='negativeMarkValue'
                        placeholder='0'
                        type='number'
                        value={formData.negativeMarkValue}
                        onChange={handleChange}
                      />
                      {error.negativeMarkValue && <ErrorMessage>{error.negativeMarkValue}</ErrorMessage>}
                    </ScoringFieldWrapper>
                  </ScoringRow>
                </div>

                {/* {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
                {error.successMessage && <SuccessMessage>{error.successMessage}</SuccessMessage>} */}
                
                <ActionBottomWrapper>
                  <NavButton>Cancel</NavButton>
                  <NavButton type="submit" >{id !== undefined ? 'Save Changes' : 'Add Question'}</NavButton>
                </ActionBottomWrapper>
              </ScoringSidebar>
            </QuestionUpperContainer>
          </Form>
        </FormMainContainer>

        <CommonContainer>
          <NavButton to={`/question/${topicId}`}>Back to Question page</NavButton>
        </CommonContainer>
        
      </QuestionContainer>
      {show && <Modal>{error.message}</Modal>}
    </Layout>
  )
}

export default CreateQuestionPage
