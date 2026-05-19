import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, ButtonGroupSection, Container, Group } from "@mantine/core";
import {
  FError,
  FField,
  FInput,
  FLabel,
  FSubmitBtn,
  QFormCancelBtn,
} from "../styles/formPage_style";
import { useEffect, useState } from "react";
import { validateEmpty } from "../validation/ValidationUtil";
import { apiGet, apiPost } from "../ApiServices/apiServices";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonGroup } from "flowbite-react";
import { ContainerIcon } from "lucide-react";
import { ModalButtons, ModalGhostBtn } from "../styles/modal_style";
import { TopicAddBtn } from "../styles/topicPage_style";
import { FaPlus } from "react-icons/fa";

function AddTopicModal({ change }) {
  const [opened, { open, close }] = useDisclosure(true);
  const { partyId } = useSelector((state) => state.userReducer);
  const { theme } = useSelector((state) => state.themeReducer);
  const { id }     = useParams();
  const navigate   = useNavigate();
  const isEdit     = id !== undefined;

  const [formData, setFormData] = useState({ topicName: "" });
  const [error, setError] = useState({});
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
       const res = await apiPost('/topic/create-topic',{ ...formData,partyId:partyId});
       if (res.errorMessage)   { setError(res); return; }
       if (res.successMessage) { setFormData({ topicName: '' }); setError(res);
       toast.success(res.successMessage,{position:'top-center'});
       change(); }
     } else {
       const res = await apiPut('/topic/update-topic', { ...formData, topicId: id,partyId:partyId });
       if (res.errorMessage)   { setError(res); return; }
       if (res.successMessage) { setFormData({ topicName: '' }); setError(res); 
       toast.success(res.successMessage,{position:'top-center'});
       change(); }
     }
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
          {error.topicName && <FError>{error.topicName}</FError>}
          {error.errorMessage && <FError>{error.errorMessage}</FError>}
        </FField>
        <Group grow >

        <ModalGhostBtn onClick={change}>Cancel</ModalGhostBtn>
        <Button style={{background:"linear-gradient(135deg, #10B981 0%, #059669 100%)"}} onClick={handleSubmit}> Add Topic</Button>
        </Group>
      </Modal>
    </>
  );
}

export default AddTopicModal;
