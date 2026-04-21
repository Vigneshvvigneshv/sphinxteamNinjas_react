
import {ButtonContainer, Content, TableRow,AddButton, EditButton} from '../styles/common_style'
import { LuNotepadText } from "react-icons/lu";
import { IoMdDownload } from "react-icons/io";
import React from 'react'

import { useSelector } from 'react-redux';
import { apiPost } from '../ApiServices/apiServices';
import { toast } from 'sonner';

const CompletedExamTable = ({data}) => {

    const partyId=useSelector((state)=>state.userReducer.partyId);
    console.log("partyId:",partyId)
    console.log("examId:",data.examId);
    const fetchResult=async()=>{
        const response=await apiPost('/exam-result/getexam-result',{partyId:partyId,examId:data.examId});
        console.log(response);
        if(response.errorMessage!==undefined){
            toast.error(response.errorMessage,{position:"top-center"})
        }
    }

  return (
    <>
      <TableRow>
        <Content>{data.examName}</Content>
        <ButtonContainer>

            <AddButton onClick={() => navigate(`/exam-result/${data.examId}/${partyId}`)}><LuNotepadText/>Result</AddButton>

            <EditButton><IoMdDownload />Certificate</EditButton>
        </ButtonContainer>
      </TableRow>
    </>
  )
}

export default CompletedExamTable
