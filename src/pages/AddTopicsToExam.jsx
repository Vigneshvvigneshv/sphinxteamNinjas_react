import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout';
import { Button, ButtonContainer, CommonContainer, CommonHeader, CommonHeading, CommonSection, Container, Content, Dropdown, Outer, Required, RowContainer, TableHeading, TableRow } from '../styles/common.style';
import { NavButton } from '../styles/header.style';
import Empty from '../component/Empty';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage, FieldContainer, Form, FormContainer, FormInput, FormLabel, SubmitButton } from '../styles/form.style';
import Modal from '../component/Modal';
import { validateAddTopicExam } from '../validation/ValidationUtil';
import { apiGet, apiPost } from '../ApiServices/apiServices';

const AddTopicsToExam = () => {
  const navigate=useNavigate();
  const{id}=useParams();
  console.log(id);
  
  const[data,setData]=useState("");
  const[error,setError]=useState("");

  const location=useLocation();
  const [exam] = useState(location.state);
  console.log(exam);
  
  const [rows, setRows] = useState([
  { topicId:"",  percentage: "", topicPassPercentage: "" }
  ]);
  
    console.log(rows);
    console.log(error);
    console.log('Add topic to exam',data);
    
    
    let percentage;
   console.log('Percentage',percentage);
   
    
    if(rows.length>0){
      percentage=rows.reduce((acc,ele)=>{
         return  acc+Number(ele.percentage);
      },0);
    }

      const handleChange = (index, field, value) => {
          const updatedRows = [...rows];
          updatedRows[index][field] = value;
          setRows(updatedRows);
          setError({})
        };

          
const addRow = () => {
  
  console.log(percentage);
  if(percentage<100){
    
    setRows([
      ...rows,
      {topicId: "", percentage: "", topicPassPercentage: "" }
    ]);
    setError({
      ...error,
      'errorMessage':''
    })
  }else{
    setError({
      ...error,
      'errorMessage':'percentage cannot be more than 100'
    })
  }
};

const removeRow=(id)=>{
  console.log('length',rows.length);
  
  if(rows.length>1){

    const afterRemoved= rows.filter((e)=>{
         return e.topicId!==id;
     })
     console.log('removed row',afterRemoved);
     setRows(afterRemoved);
  }
}
  useEffect(()=>{
 
      const fetchData = async () => {
      const response= await apiGet('/topic/getalltopic');
      setData(response);
    }
      fetchData()
  },[]);

   useEffect(()=>{
      
      const fetchData = async () => {
        const response= await apiGet('/examtopic/gettopicbyexamid?examId='+id)  
        console.log('gettopicbyexamid',response);
        if(response.message==='success' && response.topicList.length!==0){
          const listTopic=response.topicList;
          console.log('List of Topics',listTopic);
          setRows(listTopic);
        }
    }
      fetchData()
   
  },[]);
  console.log(data);
  console.log(rows);
  
const handleSubmit=async(e)=>{
    e.preventDefault();
    rows.map((e)=>{

      const validationErrors = validateAddTopicExam(e);
         setError(validationErrors);
         if (Object.keys(validationErrors).length > 0) return;
    })
      if(percentage<100 || percentage >100){
        setError({'errorMessage':'Percentage must be equal to 100'})
        return;
      }else{

        const response=await apiPost('/generatequestions/generatequestion',{examId:exam.examId,topics:rows})
           
            
            if(response.errorMessage!==undefined){
               setError(response);
            }else if(response.successMessage!==undefined){
               setError(response);
               navigate(`/getexamtopic/${exam.examId}`,{
                state:{msg:response.responseMessage}
               });
            }
      }
        }
 
  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>{exam.examName}</CommonHeading>
          <NavButton onClick={addRow}> Add topics</NavButton>
        </CommonHeader>
        <CommonSection>
         
          <Form >
            <TableRow>
              <TableHeading>Topic</TableHeading>
              <TableHeading>Percentage</TableHeading>
              <TableHeading>Pass Percentage</TableHeading>
              <TableHeading>Action</TableHeading>
            </TableRow>
      
      {(data.responseMessage==='success' && rows.length>0) ?rows.map((row, index) => (
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
            onChange={(e) =>
              handleChange(index, "percentage", e.target.value)
            }
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
            onChange={(e) =>
              handleChange(index, "topicPassPercentage", e.target.value)
            }
            placeholder="Enter the pass percentage"
          />
        </RowContainer>

           {error.topicPassPercentage && <ErrorMessage>{error.passPercentage}</ErrorMessage>}
          </Outer>
          <RowContainer>
            <Button onClick={()=>{removeRow(row.topicId)}}>Remove</Button>
          </RowContainer>
    </TableRow>
    
    )) :<Empty>No topic available</Empty>}
      {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
    <ButtonContainer >
          <NavButton to={`/getexamtopic/${id}`}>Back</NavButton>
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </ButtonContainer>
     </Form>
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default AddTopicsToExam
