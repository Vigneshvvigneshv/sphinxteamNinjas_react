import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { ErrorMessage, FieldContainer, Form, FormContainer, FormHeading, FormInput, FormLabel, FormText, SubmitButton, SuccessMessage } from '../styles/form.style';
import { CommonContainer, CommonHeading, Container, Content, Dropdown, Title } from '../styles/common.style';
import { useLocation, useParams } from 'react-router-dom';
import SingleChoice from '../component/SingleChoice';
import MultiChoice from '../component/MultiChoice';
import { QuestionContainer, QuestionFieldContainer, QuestionFormContainer, QuestionHeaderContainer } from '../styles/question.style';
import { validateQuestion } from '../validation/ValidationUtil';
import { apiPost } from '../ApiServices/apiServices';

const CreateQuestionPage = () => {
    const {id}=useParams();
    console.log('Create question page',id);
    
    const location=useLocation();
    const topicId=location.state?.topicId;
    const [error,setError]=useState("");
    const[questionType,setQuestionType]=useState('SINGLE_CHOICE');
    const[difficultyLevel,setDifficultyLevel]=useState('1');

        console.log(error);
         const[formData, setFormData] = useState({
                topicId: topicId,
                questionDetail:"",
                optionA:"",
                optionB:"",
                optionC:"",
                optionD:"",
                answer:"",
                numAnswers:1,
                questionTypeId:questionType,
                difficultyLevel:difficultyLevel,
                answerValue:"",
                negativeMarkValue:""
          });
    
        useEffect(()=>{
                console.log(id);
                
                if(id!==undefined){
                    const fetchData = async () => {
                    const response= await apiGet('/question/getquestionbyid?questionId='+id);
               
                    console.log(response);
        
                    }
                     fetchData()    
                }
            },[])
          const handleChange=(e)=>{
            setFormData({
                ...formData,
                [e.target.name]:e.target.value,
                questionTypeId:questionType,
                difficultyLevel:difficultyLevel

            });
            setError({
                ...error,
                [e.target.name]: ""
            });
          }
        const handleSubmit=async(e)=>{
            e.preventDefault();
            const validationErrors = validateQuestion(formData);
                      setError(validationErrors);
                      if (Object.keys(validationErrors).length > 0) return;
            const response=await apiPost('/question/createquestion',formData);
            
            console.log(response);
            if(response.errorMessage!==null){
                setError(response);
            }else if(response.successMessage!==null){
                setError(response);
                setFormData({
                    ...formData,
                    [e.target.name]: ""
                })
            }
        }
  return (
    <Layout>
        <QuestionContainer>
        <QuestionHeaderContainer className='flex-style'>
            <CommonHeading>Question type</CommonHeading>    
             <Dropdown value={questionType} onChange={(e)=>{setQuestionType(e.target.value);setError("")}}>
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
                        <FormText name='questionDetail' placeholder='Enter the question'
                        type='text'
                        value={formData.questionDetail}
                        onChange={handleChange}
                        />
                        {error.questionDetail && <ErrorMessage>{error.questionDetail}</ErrorMessage>}
                    </QuestionFieldContainer>
                    {questionType==='SINGLE_CHOICE'&& <SingleChoice change={handleChange} error={error} data={formData}/>}
                    {questionType==='MULTI_CHOICE' && <MultiChoice change={handleChange} error={error} data={formData}/>}
                     <QuestionFieldContainer>
                        <FormLabel>Answer</FormLabel>
                        <FormInput name='answer' placeholder='Enter the answer option'
                        type='text'
                        value={formData.answer}
                        onChange={handleChange}
                        />
                        {error.answer && <ErrorMessage>{error.answer}</ErrorMessage>}
                    </QuestionFieldContainer>
                    <QuestionFieldContainer>
                        <FormLabel>Mark</FormLabel>
                        <FormInput name='answerValue' placeholder='Enter the mark'
                        type='text'
                        value={formData.answerValue}
                        onChange={handleChange}
                        />
                        {error.answerValue && <ErrorMessage>{error.answerValue}</ErrorMessage>}
                    </QuestionFieldContainer>
                    <QuestionFieldContainer>
                        <FormLabel>Negative mark</FormLabel>
                        <FormInput name='negativeMarkValue' placeholder='Enter the negative mark'
                        type='text'
                        value={formData.negativeMarkValue}
                        onChange={handleChange}
                        />
                        {error.negativeMarkValue && <ErrorMessage>{error.negativeMarkValue}</ErrorMessage>}
                    </QuestionFieldContainer>
                    <QuestionFieldContainer>
                        <FormLabel>Difficulty level</FormLabel>
                        
                        <Dropdown value={difficultyLevel} onChange={(e)=>setDifficultyLevel(e.target.value)}>
                            <option value='1'>Easy</option>
                            <option value='2'>Medium</option>
                            <option value='3'>Hard</option>
                        </Dropdown>
                       
                    </QuestionFieldContainer>
                {error.successMessage && <SuccessMessage>{error.successMessage}</SuccessMessage>}
                    <SubmitButton type='submit'>Add</SubmitButton>
                </Form>

            </QuestionFormContainer>
        </QuestionContainer>
       
    </Layout>
  )
}

export default CreateQuestionPage
