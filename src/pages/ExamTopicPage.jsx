import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout';
import { Button, CommonContainer, CommonHeader, CommonHeading, CommonSection, Content } from '../styles/common.style';
import { NavButton } from '../styles/header.style';
import Table from '../component/Table';
import Empty from '../component/Empty';
import { useParams } from 'react-router-dom';
import QuestionTable from '../component/QuestionTable';
import { apiGet } from '../ApiServices/apiServices';
import ExamTopicTable from '../component/ExamTopicTabel';

const ExamTopicPage = () => {
 const[data,setData]=useState("");
  const {id}=useParams();
  useEffect(()=>{
  
    const fetchData = async () => {
    const response= await apiGet('/examtopic/gettopicbyexamid?examId='+id)
    
      setData(response);
    }
    fetchData();
  },[])
 
  console.log('Exam topic page',data);
   
 
  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>{data.examName} - Available Topics</CommonHeading>
        <NavButton to={`/editexamtopic/${data.examId}`} state={{examName:data.examName,examId:data.examId}}>{(data.responseMessage=== 'SUCCESS' && data.topicList.length>0)?'Edit topic':'Add topic'}</NavButton>
        </CommonHeader>
        
        <CommonSection>
            { (data.responseMessage=== 'SUCCESS' && data.topicList.length>0)?
               data.topicList.map((e)=>{ return <ExamTopicTable data={e} examId={data.examId} key={e.topicId}></ExamTopicTable>}):<Empty>No topic available</Empty>
            }
            
        </CommonSection>
        <NavButton to={'/admin-dashboard'}>Back to exam</NavButton>
      </CommonContainer>
    </Layout>
  )

}

export default ExamTopicPage  
