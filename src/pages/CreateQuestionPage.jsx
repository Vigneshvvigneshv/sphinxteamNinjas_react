import React, { useState } from 'react'
import Layout from '../component/Layout'
import { ErrorMessage, FieldContainer, Form, FormContainer, FormHeading, FormInput, FormLabel, SubmitButton } from '../styles/form.style';
import { CommonContainer } from '../styles/common.style';

const CreateQuestionPage = () => {
    const [error,setError]=useState("");
        console.log(error);
        
         const[formData, setFormData] = useState({
                topicName: ""
          });
    
          const handleChange=(e)=>{
            setFormData({
                ...formData,
                [e.target.name]:e.target.value
            });
            setError({
                ...error,
                [e.target.name]: ""
            });
          }
        const handleSubmit=async(e)=>{
            e.preventDefault();
            const validationErrors = validateEmpty(formData);
                      setError(validationErrors);
                      if (Object.keys(validationErrors).length > 0) return;
            const response=await fetch("https://localhost:8443/sphinx/api/topic/createtopic",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(formData)
            });
    
            const data=await response.json();
            console.log(data);
            if(data.errorMessage!==null){
                setError(data);
            }
        }
  return (
    <Layout>
            <CommonContainer>

            <FormContainer>
            <FormHeading>Create question</FormHeading>
            <Form onSubmit={handleSubmit}>
                    <FieldContainer>
                        <FormLabel>Question text</FormLabel>
                        <FormInput name='questionDetail' placeholder='Enter the question'
                        type='text'
                        onChange={handleChange}
                        />
                        {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
                    </FieldContainer>
                    <FieldContainer>
                        <FormLabel>Option A</FormLabel>
                        <FormInput name='optionA' placeholder='Enter the option A'
                        type='text'
                        onChange={handleChange}
                        />
                        {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
                    </FieldContainer>
                    <FieldContainer>
                        <FormLabel>Option B</FormLabel>
                        <FormInput name='optionB' placeholder='Enter the option B'
                        type='text'
                        onChange={handleChange}
                        />
                        {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
                    </FieldContainer>
                    <FieldContainer>
                        <FormLabel>Option C</FormLabel>
                        <FormInput name='optionC' placeholder='Enter the option C'
                        type='text'
                        onChange={handleChange}
                        />
                        {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
                    </FieldContainer>
                    <FieldContainer>
                        <FormLabel>Option D</FormLabel>
                        <FormInput name='optionD' placeholder='Enter the option D'
                        type='text'
                        onChange={handleChange}
                        />
                        {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
                    </FieldContainer>
                    <FieldContainer>
                        <FormLabel>Number of answers</FormLabel>
                        <FormInput name='numAnswers' placeholder='Enter the number of answers'
                        type='text'
                        onChange={handleChange}
                        />
                        {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
                    </FieldContainer>
                    <FieldContainer>
                        <FormLabel>Mark</FormLabel>
                        <FormInput name='answerValue' placeholder='Enter the mark'
                        type='text'
                        onChange={handleChange}
                        />
                        {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
                    </FieldContainer>
                    <SubmitButton type='submit'>Add</SubmitButton>
            </Form>
            </FormContainer>
        </CommonContainer>
    </Layout>
  )
}

export default CreateQuestionPage
