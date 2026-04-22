import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import Layout from '../component/Layout';
import Modal from '../component/Modal';
import { validateExam } from '../validation/ValidationUtil';
import { apiGet, apiPost, apiPut } from '../ApiServices/apiServices';

import {
  FormPageWrap, FormCard, FormCardEyebrow, FormCardTitle,
  FormCardSubtitle, FormDivider, FField, FLabel, FLabelOptional,
  FInput, FTextarea, FError, FSubmitBtn, FBackBtn, FRow,
} from '../styles/formPage_style';

const AddEditExam = () => {
  const { theme }   = useSelector((state) => state.themeReducer);
  const { partyId } = useSelector((state) => state.userReducer);
  const { id }      = useParams();
  const navigate    = useNavigate();
  const isEdit      = id !== undefined;

  const [formData, setFormData] = useState({
    examName: '', description: '', noOfQuestions: '',
    duration: '', passPercentage: '', partyId,
  });
  const [error, setError] = useState({});
  const [show,  setShow]  = useState(false);

  // ── Prefill on edit ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!isEdit) return;
    const fetch = async () => {
      const res = await apiGet('/exam/getexam/' + id);
      const e   = res.examList;
      setFormData((prev) => ({
        ...prev,
        examName:       e.examName,
        description:    e.description,
        noOfQuestions:  e.noOfQuestions,
        duration:       e.duration,
        passPercentage: e.passPercentage,
      }));
    };
    fetch();
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateExam(formData);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!isEdit) {
      const res = await apiPost('/exam/create-exam', formData);
      if (res.errorMessage)   { setError(res); return; }
      if (res.successMessage) { setError(res); setShow(true); }
    } else {
      const res = await apiPut('/exam/update-exam', { ...formData, examId: id });
      if (res.errorMessage)   { setError(res); return; }
      if (res.successMessage) { setError(res); setShow(true); }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <FormPageWrap>
          <FormCard>
            <FormCardEyebrow>{isEdit ? 'Edit assessment' : 'New assessment'}</FormCardEyebrow>
            <FormCardTitle>{isEdit ? 'Edit Assessment' : 'Add Assessment'}</FormCardTitle>
            <FormCardSubtitle>
              {isEdit
                ? 'Update the assessment details below.'
                : 'Fill in the details below to create a new assessment.'}
            </FormCardSubtitle>
            <FormDivider />

            <form onSubmit={handleSubmit}>
              <FField>
                <FLabel htmlFor="examName">Assessment Name</FLabel>
                <FInput
                  id="examName"
                  name="examName"
                  type="text"
                  placeholder="e.g. Java Fundamentals"
                  value={formData.examName}
                  onChange={handleChange}
                />
                {error.examName && <FError>{error.examName}</FError>}
              </FField>

              <FField>
                <FLabelOptional htmlFor="description">Description</FLabelOptional>
                <FTextarea
                  id="description"
                  name="description"
                  placeholder="Brief description of the exam…"
                  value={formData.description}
                  onChange={handleChange}
                />
                {error.description && <FError>{error.description}</FError>}
              </FField>

              <FRow>
                <FField>
                  <FLabel htmlFor="noOfQuestions">Number of Questions</FLabel>
                  <FInput
                    id="noOfQuestions"
                    name="noOfQuestions"
                    type="text"
                    placeholder="e.g. 20"
                    value={formData.noOfQuestions}
                    onChange={handleChange}
                  />
                  {error.noOfQuestions && <FError>{error.noOfQuestions}</FError>}
                </FField>

                <FField>
                  <FLabel htmlFor="duration">Duration (minutes)</FLabel>
                  <FInput
                    id="duration"
                    name="duration"
                    type="text"
                    placeholder="e.g. 60"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                  {error.duration && <FError>{error.duration}</FError>}
                </FField>
              </FRow>

              <FField>
                <FLabel htmlFor="passPercentage">Pass Percentage (20–100)</FLabel>
                <FInput
                  id="passPercentage"
                  name="passPercentage"
                  type="text"
                  placeholder="e.g. 60"
                  value={formData.passPercentage}
                  onChange={handleChange}
                />
                {error.passPercentage && <FError>{error.passPercentage}</FError>}
              </FField>

              {error.errorMessage && <FError>{error.errorMessage}</FError>}

              <FSubmitBtn type="submit">
                {isEdit ? 'Save Changes' : 'Add Assessment'}
              </FSubmitBtn>
            </form>

            <FBackBtn to="/admin-dashboard">
              <FaArrowLeft size={11} /> Back to Dashboard
            </FBackBtn>
          </FormCard>
        </FormPageWrap>

        {show && (
          <Modal onCancel={() => { setShow(false); navigate('/admin-dashboard'); }}>
            {error.successMessage}
          </Modal>
        )}
      </Layout>
    </ThemeProvider>
  );
};

export default AddEditExam;
