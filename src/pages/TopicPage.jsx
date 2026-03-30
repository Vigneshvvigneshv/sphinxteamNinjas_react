import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { NavButton } from '../styles/header.style'
import { CommonContainer, CommonHeader, CommonHeading, CommonSection, CommonTable , TableRow } from '../styles/common.style'
import Table from '../component/Table'
import Empty from '../component/Empty'

const TopicPage = () => {
  const[data,setData]=useState("");
 
  useEffect(()=>{
     const fetchData = async () => {
    const response= await fetch("https://localhost:8443/sphinx/api/topic/getalltopic",{
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
          <CommonHeading>Topics</CommonHeading>
          <NavButton to="/addtopic">Add topics</NavButton>
        </CommonHeader>
        
        <CommonSection>
            { (data.responseMessage=== 'success')?
               data.topicList.map((e)=>{ return <Table data={e} key={e.topicId} ></Table>}):<Empty>{data.errorMessage}</Empty>
            }
            
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default TopicPage
