import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { NavButton } from '../styles/header.style'
import { CommonContainer, CommonHeader, CommonHeading, CommonSection, CommonTable , TableRow } from '../styles/common.style'
import Table from '../component/Table'
import Empty from '../component/Empty'
import { apiGet } from '../ApiServices/apiServices'

const TopicPage = () => {
  const[data,setData]=useState("");
 
  useEffect(()=>{
    const fetchData =async () => {
    const response= await apiGet('/topic/getalltopic')
    setData(response);
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
               data.topicList.map((e)=>{ return <Table data={e} key={e.topicId} ></Table>}):<Empty>No topic available</Empty>
            }
            
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default TopicPage
