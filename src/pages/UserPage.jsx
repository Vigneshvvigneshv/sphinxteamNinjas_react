import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { apiGet } from '../ApiServices/apiServices'
import { CommonContainer, CommonHeader, CommonHeading, CommonSection } from '../styles/common.style';
import { NavButton } from '../styles/header.style';

const UserPage = () => {
    const[data,setData]=useState();
    useEffect(()=>{
        const fetchUsers= async()=>{
            const response=await apiGet('/user/getalluser')
            setData(response)
            console.log('user page ',response);   
        }
        fetchUsers();
    },[])
  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>Available Users</CommonHeading>
    
        </CommonHeader>
        
        <CommonSection>
            {/* { (data.responseMessage=== 'success')?
               data.topicList.map((e)=>{ return <Table data={e} key={e.topicId} ></Table>}):<Empty>No topic available</Empty>
            }
             */}
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default UserPage
