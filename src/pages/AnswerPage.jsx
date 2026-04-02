import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout';
import { CommonContainer, CommonHeader, CommonHeading, CommonSection } from '../styles/common.style';
import { NavButton } from '../styles/header.style';
import Table from '../component/Table';
import Empty from '../component/Empty';
import { useParams } from 'react-router-dom';
import QuestionTable from '../component/QuestionTable';

const QuestionPage = () => {
 const[data,setData]=useState("");
  const {id}=useParams();
  useEffect(()=>{
  
    const fetchData = async () => {
    const response= await fetch("https://localhost:8443/sphinx/api/question/getquestionsbytopic?topicId="+id,{
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
 
  console.log(data);
   
 
  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>{data.topicName}</CommonHeading>
          <NavButton to="/createquestion" state={{topicId:data.topicId}}>Add question</NavButton>
        </CommonHeader>
        
        <CommonSection>
            { (data.status=== 'SUCCESS')?
               data.questionList.map((e)=>{ return <QuestionTable data={e} key={e.questionId}></QuestionTable>}):<Empty>{data.errorMessage}</Empty>
            }
            
        </CommonSection>
      </CommonContainer>
    </Layout>
  )

}

export default QuestionPage
