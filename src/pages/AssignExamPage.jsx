import React from 'react'
import Layout from '../component/Layout'
import { CommonContainer, CommonHeader, CommonHeading } from '../styles/common.style'

const AssignExamPage = () => {
  return (
     <Layout> 
       <CommonContainer>
        <CommonHeader>
          <CommonHeading>Available Exams</CommonHeading>
          <NavButton to="/addexam">Add exam</NavButton>
        </CommonHeader>
        
        <CommonSection>
          {message && <SuccessMessage>{message}</SuccessMessage>}
            { (data.responseMessage=== 'success')?
               data.examList.map((e)=>{ return <ExamTable data={e} id={partyId} key={e.examId} ></ExamTable>}):<Empty>No exam available</Empty>
            }
            
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default AssignExamPage
