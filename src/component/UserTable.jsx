import React, { useState } from "react";
import { Button, ButtonContainer, CommonTable, Content, DeleteButton, TableRow, ExamContainer, ExamContent } from "../styles/common_style";
import { FaTrash } from "react-icons/fa";
import Modal from "./Modal";
import { apiDelete, apiGet } from "../ApiServices/apiServices";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Empty from "./Empty";
import ExamCard from "./ExamCard";

const UserTable = ({data,onDelete}) => {

    const [show, setShow] = useState(false);
    
    const [ExamResponse,setExamResponse]=useState();



  const getExams=async ()=>{
    const response = await apiGet('/exam/getexam-by-partyId/'+data.partyId);
    setExamResponse(response);
    console.log(response);
  }


  return <>
        <CommonTable>
            <TableRow>
                <Content>{data.userLoginId}</Content>
                <ButtonContainer>
                    <Button onClick={()=>{setShow(!show);show?"":getExams()}}>{show?"Hide":"View exam"}</Button>
                    <DeleteButton onClick={()=>onDelete(data.partyId)}><FaTrash></FaTrash></DeleteButton>
                </ButtonContainer>
            
            </TableRow>
            {show && <ExamContainer>
                {(ExamResponse?.examList===undefined||ExamResponse?.examList?.length<=0)?<ExamContent>No exam assigned</ExamContent>:ExamResponse?.examList?.map((data,index)=><ExamCard data={data} key={index}></ExamCard>)}
                </ExamContainer>}

        </CommonTable>
  </>;
};

export default UserTable;
