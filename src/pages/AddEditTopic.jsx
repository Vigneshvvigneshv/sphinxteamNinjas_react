import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { validateEmpty } from '../validation/ValidationUtil'
import {
  ErrorMessage, FieldContainer, Form, FormContainer, FormHeading,
  FormInput, FormLabel, SubmitButton, FormEyebrow, FormSubtitle
} from '../styles/form_style'
import { CommonContainer } from '../styles/common_style'
import { NavButton } from '../styles/header_style'
import { useNavigate, useParams } from 'react-router-dom'
import { apiGet, apiPost, apiPut } from '../ApiServices/apiServices'
import Modal from '../component/Modal'

const AddTopic = () => {
  const {id} = useParams();
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const changeShow = () => {
    setShow(!show);
  }

  const [formData, setFormData] = useState({
    topicName: ""
  });

  console.log(formData);

  useEffect(() => {
    if (id !== undefined) {
      console.log(id);
      const fetchData = async () => {
        const response = await apiGet('/topic/gettopic/' + id)
        console.log(response);
        setFormData({
          ...formData,
          topicName: response.topicList.topicName
        })
      }
      fetchData()
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError({
      ...error,
      [e.target.name]: ""
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateEmpty(formData);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (id === undefined) {
      const response = await apiPost('/topic/createtopic', formData);
      console.log(response);
      if (response.errorMessage !== undefined) {
        setError(response);
      } else if (response.successMessage !== undefined) {
        setFormData({ ...formData, topicName: "" });
        setError(response);
        changeShow();
      }
    } else {
      const response = await apiPut('/topic/updatetopic', {...formData, topicId: id})
      console.log(response);
      if (response.errorMessage !== undefined) {
        setError(response);
      } else if (response.successMessage !== undefined) {
        setFormData({ ...formData, topicName: "" });
        setError(response);
        changeShow();
      }
    }
  }

  return (
    <Layout>
      <CommonContainer>
        <FormContainer>
          <FormEyebrow>{id === undefined ? 'New topic' : 'Edit topic'}</FormEyebrow>
          <FormHeading>{id === undefined ? 'Add Topic' : 'Edit Topic'}</FormHeading>
          <FormSubtitle>Enter the topic name to {id === undefined ? 'add it to' : 'update it in'} the system</FormSubtitle>
          <Form onSubmit={handleSubmit}>
            <FieldContainer>
              <FormLabel>Topic</FormLabel>
              <FormInput
                name='topicName'
                placeholder='Enter the topic'
                type='text'
                onChange={handleChange}
                value={formData.topicName}
              />
              {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
            </FieldContainer>
            <SubmitButton>{id === undefined ? 'Add' : 'Edit'}</SubmitButton>
            {show && <Modal>{error.successMessage}</Modal>}
          </Form>
        </FormContainer>
        <NavButton to={'/topic'}>Back to topic</NavButton>
      </CommonContainer>
    </Layout>
  )
}

export default AddTopic
