import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { NavButton } from '../styles/header_style'
import { AddButton, ButtonContainer, CommonContainer, CommonHeader, CommonHeading, CommonSection, CommonTable, TableRow } from '../styles/common_style'
import Table from '../component/Table'
import Empty from '../component/Empty'
import { apiGet } from '../ApiServices/apiServices'
import { useLocation } from 'react-router-dom'
import { SuccessMessage } from '../styles/form_style'
import { FaBeer, FaPlus } from 'react-icons/fa';

const TopicPage = () => {
  const [data, setData] = useState("");
  const location = useLocation();
  const message = location.state?.msg;

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet('/topic/getall-topic')
      setData(response);
    }
    fetchData()
  }, []);

  console.log(data);

  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>Topics</CommonHeading>
          <ButtonContainer>
            <NavButton to='/uploadfile'>Upload File</NavButton>
            <AddButton to="/addtopic"><FaPlus/>Add</AddButton>
          </ButtonContainer>
        </CommonHeader>

        <CommonSection>
          {message && <SuccessMessage>{message}</SuccessMessage>}
          {(data.responseMessage === 'success')
            ? data.topicList.map((e) => <Table data={e} key={e.topicId} />)
            : <Empty>No topic available</Empty>
          }
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default TopicPage
