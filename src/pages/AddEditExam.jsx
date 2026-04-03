import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout';
import { CommonContainer } from '../styles/common.style';
import { ErrorMessage, FieldContainer, Form, FormContainer, FormHeading, FormInput, FormLabel, SubmitButton, SuccessMessage } from '../styles/form.style';
import { NavButton } from '../styles/header.style';
import { validateEmpty, validateExam } from '../validation/ValidationUtil';
import { useParams } from 'react-router-dom';
import { apiGet, apiPost, apiPut } from '../ApiServices/apiServices';

const AddExam = () => {
    const {id}=useParams();

    const [error,setError]=useState("");
    console.log(error);

    const[formData, setFormData] = useState({
        examName: "",
        description:"",
        noOfQuestions:"",
        duration:"",
        passPercentage:""
    });
    console.log(formData);
    
    useEffect(()=>{
        console.log(id);
        
        if(id!==undefined){
            const fetchData = async () => {
            const response= await apiGet('/exam/getexam/'+id);
       
            console.log(response);

                 
                 setFormData({
                    ...formData,
                    examName: response.examList.examName,
                    description:response.examList.description,
                    noOfQuestions:response.examList.noOfQuestions,
                    duration:response.examList.duration,
                    passPercentage:response.examList.passPercentage
                 })
                 
            }
             fetchData()    
        }
    },[])
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
        console.log(formData);
        
        const validationErrors = validateExam(formData);
                  setError(validationErrors);
                  if (Object.keys(validationErrors).length > 0) return;
        if(id===undefined){

            const response=await apiPost('/exam/createexam',formData)
            
            console.log(response);
            if(response.errorMessage!==null){
                setError(response);
            }else if(response.successMessage!==null){
                setFormData({
                    ...formData,
                    topicName:""
                });
                setError(response);
            }
        }else{
             const response=await apiPut('/exam/updateexam',{...formData,"examId":id});
            console.log(response);
            if(response.errorMessage!==null){
                setError(response);
            }else if(response.successMessage!==null){
                setFormData({
                    ...formData,
                    topicName:""
                });
                setError(response);
            }
        }

        
        
    }
  return (
    <Layout>
        <CommonContainer>

            <FormContainer>
            <FormHeading>{id===undefined?'Add exam':'Edit exam'}</FormHeading>
            <Form onSubmit={handleSubmit}>
                    <FieldContainer>
                        <FormLabel>Exam name</FormLabel>
                        <FormInput name='examName' placeholder='Enter the exam name'
                        type='text'
                        value={formData.examName}
                        onChange={handleChange}
                        />
                         {error.examName && <ErrorMessage>{error.examName}</ErrorMessage>}
                         {error.successMessage && <SuccessMessage>{error.successMessage}</SuccessMessage>}
                    </FieldContainer>
                     <FieldContainer>
                        <FormLabel>Description</FormLabel>
                         <FormInput name='description' placeholder='Enter the description'
                        type='text'
                        value={formData.description}
                        onChange={handleChange}
                        />
                         {error.description && <ErrorMessage>{error.description}</ErrorMessage>}
                         {error.successMessage && <SuccessMessage>{error.successMessage}</SuccessMessage>}
                    </FieldContainer>
                    <FieldContainer>
                        <FormLabel>Number of question</FormLabel>
                        <FormInput name='noOfQuestions' placeholder='Enter the number of question'
                        type='text'
                        value={formData.noOfQuestions}
                        onChange={handleChange}
                        />
                         {error.noOfQuestions && <ErrorMessage>{error.noOfQuestions}</ErrorMessage>}
                         {error.successMessage && <SuccessMessage>{error.successMessage}</SuccessMessage>}
                    </FieldContainer>
                    <FieldContainer>
                        <FormLabel>Duration</FormLabel>
                       <FormInput name='duration' placeholder='Enter the duration (in minutes)'
                        type='text'
                        value={formData.duration}
                        onChange={handleChange}
                        />
                         {error.duration && <ErrorMessage>{error.duration}</ErrorMessage>}
                         {error.successMessage && <SuccessMessage>{error.successMessage}</SuccessMessage>}
                    </FieldContainer>
                    <FieldContainer>
                        <FormLabel>Pass percentage</FormLabel>
                        <FormInput name='passPercentage' placeholder='Enter the pass percentage (0 to 100)'
                        type='text'
                        value={formData.passPercentage}
                        onChange={handleChange}
                        />
                         {error.passPercentage && <ErrorMessage>{error.passPercentage}</ErrorMessage>}
                         {error.successMessage && <SuccessMessage>{error.successMessage}</SuccessMessage>}
                    </FieldContainer>
                    
                    <SubmitButton type='submit'> {id!==undefined?'Edit':'Add'}</SubmitButton>
            </Form>
            </FormContainer>
            <NavButton to={'/admin-dashboard'}>Back to home</NavButton>
        </CommonContainer>
    </Layout>
  )
}

export default AddExam
