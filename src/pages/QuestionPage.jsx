import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout';
import { CommonContainer, CommonHeader, CommonHeading, CommonSection } from '../styles/common.style';
import { NavButton } from '../styles/header.style';
import Table from '../component/Table';
import Empty from '../component/Empty';
import { useParams } from 'react-router-dom';

const QuestionPage = () => {
 const[data,setData]=useState("");
  const {id}=useParams();
  useEffect(()=>{
  
    const fetchData = async () => {
    const response= await fetch("https://localhost:8443/sphinx/api/question/getQuestionsBytopic?topicId="+id,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
    });
      const value=await response.json();
      setData(value);
    }

    fetchData();
  },[])
 
  
 
  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>{id}</CommonHeading>
          <NavButton to="/addquestion">Add question</NavButton>
        </CommonHeader>
        
        <CommonSection>
            { (data.responseMessage=== 'success')?
               data.questionList.map((e)=>{ return <Table data={e} key={e.questionId}></Table>}):<Empty>{data.errorMessage}</Empty>
            }
            
        </CommonSection>
      </CommonContainer>
    </Layout>
  )

}

export default QuestionPage
