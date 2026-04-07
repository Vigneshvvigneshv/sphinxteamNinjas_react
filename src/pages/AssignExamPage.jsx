import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { Button, CommonContainer, CommonHeader, CommonHeading, CommonSection, Dropdown, TableHeading, TableRow } from '../styles/common.style'
import { ErrorMessage, Form, FormInput, FormLabel } from '../styles/form.style';
import Empty from '../component/Empty';
import { NavButton } from '../styles/header.style';
import { apiGet } from '../ApiServices/apiServices';

const AssignExamPage = () => {
    const[data,setData]=useState();
    const[error,setError]=useState();
    const [rows, setRows] = useState([
      { partyId:"", allowedAttempts: "" ,timeOutDays:""}
      ]);

      console.log('Assign exam page data',data);
      
    useEffect(()=>{
     
          const fetchData = async () => {
          const response= await apiGet('/user/getalluser');
          setData(response);
          console.log('Assing Exam Page',response);
          
        }
          fetchData()
      },[]);

    //  useEffect(()=>{
          
    //       const fetchData = async () => {
    //         const response= await apiGet('/user/gettopicbyexamid?examId='+id)  
    //         console.log('gettopicbyexamid',response);
    //         if(response.message==='success' && response.topicList.length!==0){
    //           const listTopic=response.topicList;
    //           console.log('List of Topics',listTopic);
    //           setRows(listTopic);
    //         }
    //     }
    //       fetchData()
       
    //   },[]);
  return (
     <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>Assing</CommonHeading>
          <NavButton > Add topics</NavButton>
        </CommonHeader>
        <CommonSection>
         
          {/* <Form>
            <TableRow>
              <TableHeading>User</TableHeading>
              <TableHeading>Allowded attempts</TableHeading>
              <TableHeading>Timeout days</TableHeading>
              <TableHeading>Action</TableHeading>
            </TableRow>
      
      {(data.responseMessage==='success' && rows.length>0) ?rows.map((row, index) => (
      <TableRow key={index}>
        <Dropdown
          value={row.partyId}
          onChange={(e) => handleChange(index, "partyId", e.target.value)}
        >
          <option value='select'>Select the topic</option>
          {data.responseMessage === "success" &&
            data.userList.map((e) => (
              <option key={e.firstName} value={e.partyId}>
                {e.firstName}
              </option>
            ))}
        </Dropdown>
             {error.partyId && <ErrorMessage>{error.partyId}</ErrorMessage>} 

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
           
            placeholder="Enter the pass percentage"
          />
        </RowContainer>

           {error.topicPassPercentage && <ErrorMessage>{error.passPercentage}</ErrorMessage>}
          </Outer>
          <RowContainer>
            <Button>Remove</Button>
          </RowContainer>
    </TableRow>
    
    )) :<Empty>No topic available</Empty>}
      {error.errorMessage && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
    <ButtonContainer >
          <NavButton to={`/getexamtopic/${id}`}>Back</NavButton>
          <SubmitButton>Submit</SubmitButton>
    </ButtonContainer>
     </Form> */}
     
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default AssignExamPage
