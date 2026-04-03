import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout';
import { CommonContainer, CommonHeader, CommonHeading, CommonSection, Content } from '../styles/common.style';
import { NavButton } from '../styles/header.style';
import Table from '../component/Table';
import Empty from '../component/Empty';
import { useParams } from 'react-router-dom';
import QuestionTable from '../component/QuestionTable';
import { apiGet } from '../ApiServices/apiServices';

const QuestionPage = () => {
 const[data,setData]=useState("");
  const {id}=useParams();
  useEffect(()=>{
    const fetchData = async () => {
    const response= await apiGet('/question/getquestionsbytopic?topicId='+id)
    
      setData(response);
    }

    fetchData();
  },[])
 
  console.log(data);
   
 
  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <Content>{data.topicName}</Content>
          <Content>Question type</Content>
          <NavButton to="/createquestion" state={{topicId:data.topicId}}>Add question</NavButton>
        </CommonHeader>
        
        <CommonSection>
            { (data.responseMessage=== 'SUCCESS')?
               data.questionList.map((e)=>{ return <QuestionTable data={e} key={e.questionId}></QuestionTable>}):<Empty>No question table</Empty>
            }
            
        </CommonSection>
      </CommonContainer>
    </Layout>
  )

}

export default QuestionPage
