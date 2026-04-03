import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { validateEmpty } from '../validation/ValidationUtil'
import { ErrorMessage, FieldContainer, Form, FormContainer, FormHeading, FormInput, FormLabel, SubmitButton, SuccessMessage } from '../styles/form.style'
import { CommonContainer } from '../styles/common.style'
import { NavButton } from '../styles/header.style'
import { useParams } from 'react-router-dom'
import { apiGet, apiPost, apiPut } from '../ApiServices/apiServices'

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
            const response= await apiGet('/topic/gettopic/'+id)
            console.log(response);    
                 setFormData({
                    ...formData,
                    topicName:response.topicList.topicName
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

            const response=await apiPost('/topic/createtopic',formData);
    
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
             const response=await apiPut('/topic/updatetopic',{...formData,topicId:id})
            
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

