import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout';
import {
  AddButton,
  Button, ButtonContainer, CommonContainer, CommonHeader, CommonHeading,
  CommonSection, Container, Content, DeleteButton, Dropdown, Outer, Required,
  RowContainer, TableHeading, TableRow
} from '../styles/common_style';
import { NavButton } from '../styles/header_style';
import Empty from '../component/Empty';
import {  useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage, FieldContainer, Form, FormContainer, FormInput, FormLabel, SubmitButton } from '../styles/form_style';
import Modal from '../component/Modal';
import { validateAddTopicExam } from '../validation/ValidationUtil';
import { apiDelete, apiGet, apiPost } from '../ApiServices/apiServices';
import { toast } from 'sonner';
import { FaPlus, FaTrash } from 'react-icons/fa';

const AddTopicsToExam = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  console.log("ExamId ",id);

  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [exam, setExam] = useState(null);
  const[examId,setExamId]=useState(null);
 
  
  console.log(exam);

  const [rows, setRows] = useState([
    { topicId: "", percentage: "", topicPassPercentage: "" }
  ]);

  const changeShow = () => {
    setShow(!show);
  }

  console.log(rows);
  console.log(error);
  console.log('Add topic to exam', data);

  let percentage;
  console.log('Percentage', percentage);

  if (rows.length > 0) {
    percentage = rows.reduce((acc, ele) => {
      return acc + Number(ele.percentage);
    }, 0);
  }

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    setError({})
  };

  const addRow = () => {
    console.log(percentage);
    if (percentage < 100) {
      setRows([...rows, { topicId: "", percentage: "", topicPassPercentage: "" }]);
      setError({ ...error, 'errorMessage': '' })
    } else {
      setError({ ...error, 'errorMessage': 'percentage cannot be more than 100' })
    }
  };

  const removeRow = (topicId,index) => {
    console.log('length', rows.length);
    console.log("TopicId",topicId);

    
    if (rows.length >= 1) {
      const deleteTopic=async()=>{
        {console.log("ExamId ",examId)}
          const response = await apiDelete(`/exam-topic/delete-topic-in-exam-topic`,{examId:examId, topicId: topicId});
          console.log("Delete Topic ",response);

          
          if(response.responseMessage==="success"){
            toast.success(`${response.message}`, {position: "top-center"});
             setRows((prevRows) => prevRows.filter((_, i) => i !== index)); 
          }else {
              toast.error(`${response.message}`,{position:'top-center'})
          }
      }
       deleteTopic();
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet('/topic/getall-topic');
      console.log("AllTopic ",response)
      setData(response);
    }
    fetchData()
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet(`/exam-topic/get-topicby-examid?examId=${id}` )
      console.log('gettopicbyexamid', response);
      if (response.message === 'success' && response.topicList.length !== 0) {
        const listTopic = response.topicList;
        console.log('List of Topics', listTopic);
        setRows(listTopic);
  
      }
    }
    fetchData()
  }, []);

  useEffect(() => {
  const fetchExam = async () => {
    const res = await apiGet(`/exam-topic/get-topicby-examid?examId=${id}`);

    if (res.message === "success") {
      setExam(res.examName);
      setExamId(res.examId);
    }
  };

  fetchExam();
}, [id]);

  console.log(data);
  console.log(rows);

  const handleSubmit = async (e) => {
    e.preventDefault();
    rows.map((e) => {
      const validationErrors = validateAddTopicExam(e);
      setError(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
    })
    if (percentage < 100 || percentage > 100) {
      setError({'errorMessage': 'Percentage must be equal to 100'})
      return;
    } else {
      const response = await apiPost('/generate-questions/generate-question', {examId:examId, topics: rows})
      if (response.errorMessage !== undefined) {
        setError(response);

      } else if (response.successMessage !== undefined) {
        setError(response);
        toast.success("Successfully generated questions", {position: "top-center"})
        changeShow();
      }
    }
  }

  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          {console.log("examName",exam)
          }
          <CommonHeading>{exam}</CommonHeading>
          <AddButton onClick={addRow}><FaPlus/> Add topics</AddButton>
        </CommonHeader>
        <CommonSection>
          <Form>
            <TableRow>
              <TableHeading>Topic</TableHeading>
              <TableHeading>Percentage</TableHeading>
              <TableHeading>Pass Percentage</TableHeading>
              <TableHeading>Action</TableHeading>
            </TableRow>

            {(data.responseMessage === 'success' && rows.length > 0)
              ? rows.map((row, index) => (
                <TableRow key={index}>
                  <Dropdown
                    value={row.topicId}
                    onChange={(e) => handleChange(index, "topicId", e.target.value)}
                  >
                    <option value='select'>Select the topic</option>
                    {data.responseMessage === "success" &&
                      data.topicList.map((e) => (
                        <option key={e.topicName} value={e.topicId}>
                          {e.topicName}
                        </option>
                      ))}
                  </Dropdown>
                  {error.topicId && <ErrorMessage>{error.topicId}</ErrorMessage>}

                  <Outer>
                    <RowContainer>
                      <FormLabel>Percentage</FormLabel>
                      <FormInput
                        type="text"
                        value={row.percentage}
                        onChange={(e) => handleChange(index, "percentage", e.target.value)}
                        placeholder="Enter the percentage"
                      />
                    </RowContainer>
                    {error.percentage && <ErrorMessage>{error.percentage}</ErrorMessage>}
                  </Outer>

                  <Outer>
                    <RowContainer>
                      <FormLabel>Pass Percentage</FormLabel>
                      <FormInput
                        type="text"
                        value={row.topicPassPercentage}
                        onChange={(e) => handleChange(index, "topicPassPercentage", e.target.value)}
                        placeholder="Enter the pass percentage"
                      />
                    </RowContainer>
                    {error.topicPassPercentage && <ErrorMessage>{error.passPercentage}</ErrorMessage>}
                  </Outer>

                  <RowContainer>
                    <DeleteButton type='button' onClick={()=> removeRow(row.topicId,index)}><FaTrash/></DeleteButton>
                  </RowContainer>
                </TableRow>
              ))
              : <Empty>No topic available</Empty>
            }

            {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
            <Container>
              <NavButton to={`/getexamtopic/${id}`}>Back</NavButton>
              <NavButton onClick={handleSubmit}>Generate Question</NavButton>
            </Container>
          </Form>
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default AddTopicsToExam
