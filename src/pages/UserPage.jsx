import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { apiGet } from '../ApiServices/apiServices'
import { CommonContainer, CommonHeader, CommonHeading, CommonSection } from '../styles/common_style';
const UserPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await apiGet('/user/getall-user')
      setData(response)
      console.log('user page ', response);
    }
    fetchUsers();
  }, [])

  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>Available Users</CommonHeading>
        </CommonHeader>

        <CommonSection>
          {/* User list — placeholder for future implementation */}
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default UserPage
