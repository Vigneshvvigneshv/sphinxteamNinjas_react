import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { NavButton } from '../styles/header_style'
import { AddButton, CommonContainer, CommonHeader, CommonHeading, CommonSection, CommonTable, Content, ContentHeading, ExamCommonHeader } from '../styles/common_style'
import ExamTable from '../component/ExamTable'
import Empty from '../component/Empty'
import { apiDelete, apiGet, apiPost } from '../ApiServices/apiServices'
import { useLocation } from 'react-router-dom'
import { SuccessMessage } from '../styles/form_style'
import Modal from '../component/Modal'
import { toast } from 'sonner'
import { FaPlus } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const AdminDashBoard = () => {
  const[data,setData]=useState("");
  const {user} = useSelector((state) => state.userReducer)
  const location=useLocation();
  const message=location.state?.msg;
  const[show,setShow]=useState(false);
  const [examId,setExamId]=useState();

  const changeShow=(examId)=>{
    setShow(!show);
    setExamId(examId);
  }
  const onDelete=()=>{
    deleteExam(examId);
    setShow(!show);
  }
   const deleteExam = async (examId) => {
      const response = await apiDelete('/exam/delete-exam', {'deleteList':examId,'partyId': user[0] });
      console.log(response);
      if(response.successMessage!==undefined){
        toast.success(response.successMessage,{position:'top-center'});
        fetchData();
      }else if(response.errorMessage!==undefined){
        toast.error(response.errorMessage,{position:'top-center'});
      }
    }


  useEffect(()=>{
    fetchData()
  },[]);

  const fetchData = async () => {
      const response= await apiPost('/exam/getall-exam',{partyId:user[0]});
      setData(response);
    
    }

  console.log(data);
  

  return (
    <Layout> 
      <CommonContainer>
        <ExamCommonHeader>
          <ContentHeading>Available Assessment</ContentHeading>
          <ContentHeading>Duration</ContentHeading>
          <ContentHeading>No of Questions</ContentHeading>
          <ContentHeading>Pass Percentage</ContentHeading>
          <AddButton to="/addexam"><FaPlus/>Add</AddButton>
        </ExamCommonHeader>
        
        <CommonSection>
          <CommonTable>

          {message && <SuccessMessage>{message}</SuccessMessage>}
          {(data.responseMessage === 'success') && (data.examList.length > 0)
            ? data.examList.map((e) => <ExamTable data={e} key={e.examId} change={changeShow}/>)
            : <Empty>No exam available</Empty>
          }
          </CommonTable>
        </CommonSection>
      </CommonContainer>
      {show && <Modal type='delete' title='Delete Exam' onCancel={changeShow} onConfirm={onDelete} showConfirmButton={true}>Are you sure want to delete exam?</Modal> }
    </Layout>
  )
}

export default AdminDashBoard;
