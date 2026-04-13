import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { CommonContainer, CommonHeader, CommonHeading, CommonSection, Dropdown, TableHeading, TableRow } from '../styles/common_style'
import { NavButton } from '../styles/header_style';
import { apiGet } from '../ApiServices/apiServices';
import { useParams } from 'react-router-dom';

const AssignExamPage = () => {
  const {id}=useParams();
  const [data, setData] = useState();
  const [unassignedUser, setUnassignedUser] = useState();
  const [error, setError] = useState();
  const [rows, setRows] = useState([
    { partyId: "", allowedAttempts: "", timeOutDays: "" }
  ]);

  console.log('Assign exam page data', data);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet('/exam-assign/get-assigned-user/'+id);
      setData(response);
      console.log('Assing Exam Page',response);
    }
    fetchData()
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet('/exam-assign/get-unassigned-user/'+id);
      setUnassignedUser(response);
      console.log('unassign Exam Page',response);
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
