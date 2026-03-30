import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { NavButton } from '../styles/header.style'
import { Container } from '../styles/common.style'
import { CommonContainer, CommonHeader, CommonHeading, CommonSection } from '../styles/common.style'
import ExamTable from '../component/ExamTable'
import Empty from '../component/Empty'

const AdminDashBoard = () => {
  const[data,setData]=useState("");
 
  useEffect(()=>{
    const fetchData = async () => {
    const response= await fetch("https://localhost:8443/sphinx/api/exam/getallexam",{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    });
    const value=await response.json();
    setData(value);
  }
    fetchData()
  },[]);
  console.log(data);
  return (
    <Layout> 
       <CommonContainer>
        <CommonHeader>
          <CommonHeading>Exams</CommonHeading>
          <NavButton to="/addexam">Add exam</NavButton>
        </CommonHeader>
        
        <CommonSection>
            { (data.responseMessage=== 'success')?
               data.examList.map((e)=>{ return <ExamTable data={e} key={e.examId} ></ExamTable>}):<Empty>{data.errorMessage}</Empty>
            }
            
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default AdminDashBoard
