import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { validateEmpty } from '../validation/ValidationUtil'
import { ErrorMessage, FieldContainer, Form, FormContainer, FormHeading, FormInput, FormLabel, SubmitButton, SuccessMessage } from '../styles/form.style'
import { CommonContainer } from '../styles/common.style'
import { NavButton } from '../styles/header.style'
import { useParams } from 'react-router-dom'

const AddTopic = () => {
    const {id}=useParams();
    const [error,setError]=useState("");

    const[formData, setFormData] = useState({
           topicName: ""
     });

    console.log(formData);

    useEffect(()=>{
        
        if(id!==undefined){
            console.log(id);
            
            const fetchData = async () => {
            const response= await fetch("https://localhost:8443/sphinx/api/topic/gettopic/"+id,{
             method:"GET",
             headers:{
                 "Content-Type":"application/json"
             }
            });
            const value=await response.json();
                 console.log(value);    
                 setFormData({
                    ...formData,
                    topicName:value.topicList.topicName
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
        const validationErrors = validateEmpty(formData);
                  setError(validationErrors);
                  if (Object.keys(validationErrors).length > 0) return;

        if(id===undefined){

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
            }else if(data.successMessage!==null){
                setFormData({
                    ...formData,
                    topicName:""
                });
                setError(data);
            }
        }else{
             const response=await fetch("https://localhost:8443/sphinx/api/topic/updatetopic",{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    topicId:id
                })
            });
    
            const data=await response.json();
            console.log(data);
            if(data.errorMessage!==null){
                setError(data);
            }else if(data.successMessage!==null){
                setFormData({
                    ...formData,
                    topicName:""
                });
                setError(data);
            }
        }
    }
  return (
    <Layout>
        <CommonContainer>

            <FormContainer>
            <FormHeading>{ id===undefined?'Add exam topic':'Edit exam topic'}</FormHeading>
            <Form onSubmit={handleSubmit}>
                    <FieldContainer>
                        <FormLabel>Topic</FormLabel>
                        <FormInput name='topicName' placeholder='Enter the topic'
                        type='text'
                        onChange={handleChange}
                        value={formData.topicName}
                        />
                        {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
                         {error.successMessage && <SuccessMessage>{error.successMessage}</SuccessMessage>}
                    </FieldContainer>
                    <SubmitButton type='submit'>{id===undefined?'Add':'Edit'}</SubmitButton>
            </Form>
            </FormContainer>
            <NavButton to={'/topic'}>Back to topic</NavButton>
        </CommonContainer>
    </Layout>
  )
}

export default AddTopic

