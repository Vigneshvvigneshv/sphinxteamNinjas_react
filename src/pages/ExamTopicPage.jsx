import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout';
import { AddButton, Button, CommonContainer, CommonHeader, CommonHeading, CommonSection, Content } from '../styles/common_style';
import { NavButton } from '../styles/header_style';
import Table from '../component/Table';
import Empty from '../component/Empty';
import { useLocation, useParams } from 'react-router-dom';
import { apiGet } from '../ApiServices/apiServices';
import ExamTopicTable from '../component/ExamTopicTabel';
import { SuccessMessage } from '../styles/form_style';
import { FaEdit, FaPlus } from 'react-icons/fa';

const ExamTopicPage = () => {
  const [data, setData] = useState("");
  const location = useLocation();
  const message = location.state?.msg;
  const {id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet('/exam-topic/get-topicby-examid?examId=' + id)
      setData(response);
    }
    fetchData();
  }, [])

  console.log('Exam topic page', data);

  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>{data.examName} - Available Topics</CommonHeading>
          <AddButton
            to={`/editexamtopic/${data.examId}`}
            state={{examName: data.examName, examId: data.examId}}
          >
            {(data.responseMessage === 'SUCCESS' && data.topicList.length > 0) ? <FaEdit/> : <FaPlus/>}
            {(data.responseMessage === 'SUCCESS' && data.topicList.length > 0) ? 'Edit topic' : 'Add topic'}
          </AddButton>
        </CommonHeader>

        <CommonSection>
          {message && <SuccessMessage>{message}</SuccessMessage>}
          {(data.responseMessage === 'SUCCESS' && data.topicList.length > 0)
            ? data.topicList.map((e) => <ExamTopicTable data={e} examId={data.examId} key={e.topicId} />)
            : <Empty>No topic available</Empty>
          }
        </CommonSection>

        <NavButton to={'/admin-dashboard'}>Back to exam</NavButton>
      </CommonContainer>
    </Layout>
  )
}

export default ExamTopicPage
