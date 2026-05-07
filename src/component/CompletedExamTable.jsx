
import {ButtonContainer, Content, TableRow,AddButton, EditButton} from '../styles/common_style'
import { LuNotepadText } from "react-icons/lu";
import { IoMdDownload } from "react-icons/io";
import React from 'react'

import { useSelector } from 'react-redux';
import { apiPost, apiPostBlob } from '../ApiServices/apiServices';
import { toast } from 'sonner';

const CompletedExamTable = ({data}) => {

    const partyId=useSelector((state)=>state.userReducer.partyId);

    const handleDownloadCertificate = async (examId, partyId) => {
  try {
    const blob = await apiPostBlob(`/certificate/generate/`, { examId, partyId });

    if (!blob || blob.size === 0) {
      toast.error("Failed to download certificate", { position: "top-center" });
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sphinx-certificate.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

  } catch (e) {
    console.error("Certificate download error:", e);
    toast.error("Failed to download certificate", { position: "top-center" });
  }
    }

  return (
    <>
      <TableRow>
        <Content>{data.examName}</Content>
        <ButtonContainer>
            {console.log("data",data.examId)}
            <AddButton to={`/exam-result/${data.examId}/${partyId}`}><LuNotepadText/>Result</AddButton>

            <EditButton onClick={()=>handleDownloadCertificate(data.examId,partyId)}><IoMdDownload />Certificate</EditButton>
        </ButtonContainer>
      </TableRow>
    </>
  )
}

export default CompletedExamTable
