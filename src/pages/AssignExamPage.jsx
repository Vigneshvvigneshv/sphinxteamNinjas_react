import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { Button, CommonContainer, CommonHeader, CommonHeading, CommonSection, Dropdown, TableHeading, TableRow } from '../styles/common_style'
import Empty from '../component/Empty';
import { NavButton } from '../styles/header_style';
import { apiGet } from '../ApiServices/apiServices';

const AssignExamPage = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [rows, setRows] = useState([
    { partyId: "", allowedAttempts: "", timeOutDays: "" }
  ]);

  console.log('Assign exam page data', data);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet('/user/getalluser');
      setData(response);
      console.log('Assing Exam Page', response);
    }
    fetchData()
  }, []);

  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>Assign</CommonHeading>
          <NavButton>Add topics</NavButton>
        </CommonHeader>
        <CommonSection>
          {/* Assign exam form — placeholder for future implementation */}
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default AssignExamPage
