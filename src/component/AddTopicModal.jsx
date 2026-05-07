import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { FError, FField, FInput, FLabel, FSubmitBtn } from '../styles/formPage_style';
import { useState } from 'react';
import { validateEmpty } from '../validation/ValidationUtil';
import { apiPost } from '../ApiServices/apiServices';
import { useSelector } from 'react-redux';

function AddTopicModal({change}) {
  const [opened, { open, close }] = useDisclosure(true);
  const{partyId}=useSelector((state)=>state.userReducer);
  const [formData, setFormData] = useState({ topicName: '' });
  const [error,    setError]    = useState({});
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
  
        const res = await apiPost('/topic/create-topic',{ ...formData,partyId:partyId});
        if (res.errorMessage)   { setError(res); return; }
        if (res.successMessage) { setFormData({ topicName: '' }); setError(res);change();}
    };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Topic" centered>
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
       
                     <FSubmitBtn onClick={handleSubmit}>
                      Add Topic
                     </FSubmitBtn>
      </Modal>

      <Button variant="default" onClick={open}>
        Add Topic
      </Button>
    </>
  );
}

export default AddTopicModal;