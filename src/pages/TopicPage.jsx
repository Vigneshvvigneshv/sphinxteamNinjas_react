import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { NavButton } from '../styles/header.style'
import { CommonContainer, CommonHeader, CommonHeading, CommonSection } from '../styles/common.style'

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
      console.log(value);
      setData(value);
    }

    fetchData();
  },[])



   console.log(data); 

  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>Topics</CommonHeading>
          <NavButton to="/topic">Add topics</NavButton>
        </CommonHeader>
        <CommonSection>
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default TopicPage
