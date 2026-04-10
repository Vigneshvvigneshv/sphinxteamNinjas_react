import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { NavButton } from '../styles/header_style'
import { CommonContainer, CommonHeader, CommonHeading, CommonSection } from '../styles/common_style'
import ExamTable from '../component/ExamTable'
import Empty from '../component/Empty'
import { apiGet } from '../ApiServices/apiServices'
import { useLocation } from 'react-router-dom'
import { SuccessMessage } from '../styles/form_style'
import Modal from '../component/Modal'
import { toast } from 'sonner'

const AdminDashBoard = () => {
  const[data,setData]=useState("");
  
  const location=useLocation();
  const message=location.state?.msg;
  const[show,setShow]=useState(false);

  const changeShow=()=>{
    setShow(!show);
  }
  
  useEffect(()=>{
    const fetchData = async () => {
      const response= await apiGet('/exam/getall-exam');
      setData(response);
    
    }
    fetchData()
  },[]);

  console.log(data);
  

  return (
    <Layout> 
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>Available Exams</CommonHeading>
          <NavButton to="/addexam">Add exam</NavButton>
        </CommonHeader>
        
        <CommonSection>
          {message && <SuccessMessage>{message}</SuccessMessage>}
          {(data.responseMessage === 'success') && (data.examList.length > 0)
            ? data.examList.map((e) => <ExamTable data={e} key={e.examId} />)
            : <Empty>No exam available</Empty>
          }
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default AdminDashBoard
