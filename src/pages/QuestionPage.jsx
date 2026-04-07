import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout';
import { Button, ButtonContainer, CommonContainer, CommonHeader, CommonHeading, CommonSection, Content } from '../styles/common.style';
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
 
  console.log('Question Page',data);
   
 
  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <Content>{data.topicName}</Content>
          <Content>Question type</Content>
          <ButtonContainer>
          <NavButton to={'/uploadfile'}>Upload File</NavButton>
          <NavButton to="/createquestion" state={{topicId:data.topicId,topicName:data.topicName}}>Add question</NavButton>
          </ButtonContainer>
        </CommonHeader>
        
        <CommonSection>
            { (data.responseMessage=== 'SUCCESS' && data.questionList.length>0)?
               data.questionList.map((e)=>{ return <QuestionTable data={e} name={data.topicName} key={e.questionId}></QuestionTable>}):<Empty>No question available</Empty>
            }
            
        </CommonSection>
      </CommonContainer>
    </Layout>
  )

}

export default QuestionPage
