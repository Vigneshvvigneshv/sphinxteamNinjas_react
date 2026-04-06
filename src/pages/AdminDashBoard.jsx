import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { NavButton } from '../styles/header.style'
import { CommonContainer, CommonHeader, CommonHeading, CommonSection } from '../styles/common.style'
import ExamTable from '../component/ExamTable'
import Empty from '../component/Empty'
import { apiGet } from '../ApiServices/apiServices'

const AdminDashBoard = () => {
  const[data,setData]=useState("");
  const partyId=data.partyId;
  console.log('Party Id',partyId);
  
  useEffect(()=>{
    const fetchData = async () => {
    const response= await apiGet('/exam/getallexam');
   
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
            { (data.responseMessage=== 'success')?
               data.examList.map((e)=>{ return <ExamTable data={e} key={e.examId} ></ExamTable>}):<Empty>No exam available</Empty>
            }
            
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default AdminDashBoard
