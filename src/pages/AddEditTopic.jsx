import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaTag } from 'react-icons/fa';

import Layout from '../component/Layout';
import Modal from '../component/Modal';
import { validateEmpty } from '../validation/ValidationUtil';
import { apiGet, apiPost, apiPut } from '../ApiServices/apiServices';

import {
  FormPageWrap, FormCard, FormCardEyebrow, FormCardTitle,
  FormCardSubtitle, FormDivider, FField, FLabel, FInput,
  FError, FSubmitBtn, FBackBtn,
} from '../styles/formPage_style';

const AddEditTopic = () => {
  const { theme }  = useSelector((state) => state.themeReducer);
  const { id }     = useParams();
  const navigate   = useNavigate();
  const isEdit     = id !== undefined;

  const [formData, setFormData] = useState({ topicName: '' });
  const [error,    setError]    = useState({});
  const [show,     setShow]     = useState(false);

  // ── Prefill on edit ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!isEdit) return;
    const fetch = async () => {
      const res = await apiGet('/topic/gettopic/' + id);
      setFormData({ topicName: res.topicList.topicName });
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
    const validationErrors = validateEmpty(formData);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!isEdit) {
      const res = await apiPost('/topic/create-topic', formData);
      if (res.errorMessage)   { setError(res); return; }
      if (res.successMessage) { setFormData({ topicName: '' }); setError(res); setShow(true); }
    } else {
      const res = await apiPut('/topic/update-topic', { ...formData, topicId: id });
      if (res.errorMessage)   { setError(res); return; }
      if (res.successMessage) { setFormData({ topicName: '' }); setError(res); setShow(true); }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <FormPageWrap>
          <FormCard>
            <FormCardEyebrow>{isEdit ? 'Edit topic' : 'New topic'}</FormCardEyebrow>
            <FormCardTitle>{isEdit ? 'Edit Topic' : 'Add Topic'}</FormCardTitle>
            <FormCardSubtitle>
              {isEdit
                ? 'Update the topic name in the system.'
                : 'Enter a topic name to add it to the system.'}
            </FormCardSubtitle>
            <FormDivider />

            <form onSubmit={handleSubmit}>
              <FField>
                <FLabel htmlFor="topicName">Topic Name</FLabel>
                <FInput
                  id="topicName"
                  name="topicName"
                  type="text"
                  placeholder="e.g. Java, Data Structures…"
                  value={formData.topicName}
                  onChange={handleChange}
                />
                {error.topicName     && <FError>{error.topicName}</FError>}
                {error.errorMessage  && <FError>{error.errorMessage}</FError>}
              </FField>

              <FSubmitBtn type="submit">
                {isEdit ? 'Save Changes' : 'Add Topic'}
              </FSubmitBtn>
            </form>

            <FBackBtn to="/topic">
              <FaArrowLeft size={11} /> Back to Topics
            </FBackBtn>
          </FormCard>
        </FormPageWrap>

        {show && (
          <Modal onCancel={() => { setShow(false); navigate('/topic'); }}>
            {error.successMessage}
          </Modal>
        )}
      </Layout>
    </ThemeProvider>
  );
};

export default AddEditTopic;
