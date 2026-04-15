import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout';
import { CommonContainer } from '../styles/common_style';
import {
  ErrorMessage, FieldContainer, Form, FormContainer, FormHeading,
  FormInput, FormLabel, SubmitButton, FormEyebrow, FormSubtitle
} from '../styles/form_style';
import { NavButton } from '../styles/header_style';
import { validateEmpty, validateExam } from '../validation/ValidationUtil';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGet, apiPost, apiPut } from '../ApiServices/apiServices';
import { useSelector } from 'react-redux';
import Modal from '../component/Modal';

const AddExam = () => {
  const {id} = useParams();
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const changeShow = () => {
    setShow(!show);
  }

  const {user} = useSelector((state) => state.userReducer)
  const [formData, setFormData] = useState({
    examName: "",
    description: "",
    noOfQuestions: "",
    duration: "",
    passPercentage: "",
    partyId: user[0]
  });

  useEffect(() => {
    console.log(id);
    if (id !== undefined) {
      const fetchData = async () => {
        const response = await apiGet('/exam/getexam/' + id);
        console.log(response);
        setFormData({
          ...formData,
          examName: response.examList.examName,
          description: response.examList.description,
          noOfQuestions: response.examList.noOfQuestions,
          duration: response.examList.duration,
          passPercentage: response.examList.passPercentage
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
    console.log(formData);
    const validationErrors = validateExam(formData);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (id === undefined) {
      const response = await apiPost('/exam/create-exam', formData)
      console.log(response);
      if (response.errorMessage !== undefined) {
        setError(response);
      } else if (response.successMessage !== undefined) {
        setFormData({ ...formData, topicName: "" });
        setError(response);
        changeShow()
      }
    } else {
      const response = await apiPut('/exam/update-exam', {...formData, "examId": id});
      console.log(response);
      if (response.errorMessage !== undefined) {
        setError(response);
      } else if (response.successMessage !== undefined) {
        setFormData({ ...formData, topicName: "" });
        setError(response);
        changeShow()
      }
    }
  }

  return (
    <Layout>
      <CommonContainer>
        <FormContainer>
          <FormHeading>{id === undefined ? 'Add Assessment' : 'Edit Assessment'}</FormHeading>
          <FormSubtitle>Fill in the details below to {id === undefined ? 'create a new' : 'update the'} assessment</FormSubtitle>
          <Form onSubmit={handleSubmit}>
            <FieldContainer>
              <FormLabel>Exam name</FormLabel>
              <FormInput
                name='examName'
                placeholder='Enter the name'
                type='text'
                value={formData.examName}
                onChange={handleChange}
              />
              {error.examName && <ErrorMessage>{error.examName}</ErrorMessage>}
            </FieldContainer>

            <FieldContainer>
              <FormLabel>Description</FormLabel>
              <FormInput
                name='description'
                placeholder='Enter the description'
                type='text'
                value={formData.description}
                onChange={handleChange}
              />
              {error.description && <ErrorMessage>{error.description}</ErrorMessage>}
            </FieldContainer>

            <FieldContainer>
              <FormLabel>Number of questions</FormLabel>
              <FormInput
                name='noOfQuestions'
                placeholder='Enter the number of questions'
                type='text'
                value={formData.noOfQuestions}
                onChange={handleChange}
              />
              {error.noOfQuestions && <ErrorMessage>{error.noOfQuestions}</ErrorMessage>}
            </FieldContainer>

            <FieldContainer>
              <FormLabel>Duration</FormLabel>
              <FormInput
                name='duration'
                placeholder='Enter the duration (in minutes)'
                type='text'
                value={formData.duration}
                onChange={handleChange}
              />
              {error.duration && <ErrorMessage>{error.duration}</ErrorMessage>}
            </FieldContainer>

            <FieldContainer>
              <FormLabel>Pass percentage</FormLabel>
              <FormInput
                name='passPercentage'
                placeholder='Enter the pass percentage (20 to 100)'
                type='text'
                value={formData.passPercentage}
                onChange={handleChange}
              />
              {error.passPercentage && <ErrorMessage>{error.passPercentage}</ErrorMessage>}
            </FieldContainer>

            {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
            <SubmitButton>{id !== undefined ? 'Save changes' : 'Add'}</SubmitButton>
          </Form>
        </FormContainer>

        <NavButton to={'/admin-dashboard'} state={{error: error.successMessage}}>Back to home</NavButton>
      </CommonContainer>
      {show && <Modal>{error.successMessage}</Modal>}
    </Layout>
  )
}

export default AddExam
