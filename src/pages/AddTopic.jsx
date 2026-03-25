import React, { useState } from 'react'
import Layout from '../component/Layout'
import { validateEmpty } from '../validation/ValidationUtil'
import { ErrorMessage, FieldContainer, Form, FormContainer, FormHeading, FormInput, FormLabel, SubmitButton } from '../styles/form.style'

const AddTopic = () => {
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
            <FormContainer>
            <FormHeading>Add exam topic</FormHeading>
            <Form onSubmit={handleSubmit}>
                    <FieldContainer>
                        <FormLabel>Topic</FormLabel>
                        <FormInput name='topicName' placeholder='Enter the topic'
                        type='text'
                        onChange={handleChange}
                        />
                        {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
                    </FieldContainer>
                    <SubmitButton type='submit'>Add</SubmitButton>
            </Form>
            </FormContainer>
    </Layout>
  )
}

export default AddTopic

