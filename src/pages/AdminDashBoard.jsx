import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { NavButton } from '../styles/header_style'
import { AddButton, CommonContainer, CommonHeader, CommonHeading, CommonSection, CommonTable, Content, ExamCommonHeader } from '../styles/common_style'
import ExamTable from '../component/ExamTable'
import Empty from '../component/Empty'
import { apiGet, apiPost } from '../ApiServices/apiServices'
import { useLocation } from 'react-router-dom'
import { SuccessMessage } from '../styles/form_style'
import Modal from '../component/Modal'
import { toast } from 'sonner'
import { FaPlus } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const AdminDashBoard = () => {
  const[data,setData]=useState("");
  const {user} = useSelector((state) => state.userReducer)
  const location=useLocation();
  const message=location.state?.msg;
  const[show,setShow]=useState(false);

  const changeShow=()=>{
    setShow(!show);
  }
  
  useEffect(()=>{
    const fetchData = async () => {
      const response= await apiPost('/exam/getall-exam',{partyId:user[0]});
      setData(response);
    
    }
    fetchData()
  },[]);

  console.log(data);
  

  return (
    <Layout> 
      <CommonContainer>
        <ExamCommonHeader>
          <CommonHeading>Available Assessment</CommonHeading>
          <Content>Duration</Content>
          <Content>No of Questions</Content>
          <Content>Pass Percentage</Content>
          <AddButton to="/addexam"><FaPlus/>Add</AddButton>
        </ExamCommonHeader>
        
        <CommonSection>
          <CommonTable>

          {message && <SuccessMessage>{message}</SuccessMessage>}
          {(data.responseMessage === 'success') && (data.examList.length > 0)
            ? data.examList.map((e) => <ExamTable data={e} key={e.examId} />)
            : <Empty>No exam available</Empty>
          }
          </CommonTable>
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default AdminDashBoard
