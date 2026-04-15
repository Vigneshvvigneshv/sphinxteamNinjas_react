import React, { useState } from "react";
import { Button, ButtonContainer, CommonTable, Content, DeleteButton, TableRow, ExamContainer, ExamContent } from "../styles/common_style";
import { FaAngellist, FaAngleDoubleDown, FaTrash } from "react-icons/fa";
import Modal from "./Modal";
import { apiDelete, apiGet } from "../ApiServices/apiServices";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Empty from "./Empty";
import ExamCard from "./ExamCard";
import { FaArrowUpRightFromSquare, FaX } from "react-icons/fa6";

const UserTable = ({data,onDelete}) => {

    const [show, setShow] = useState(false);
    const [response, setResponse] = useState();
    const [ExamResponse,setExamResponse]=useState();
  const deleteUser = async () => {
    const response = await apiDelete('/user/delete-user', {'partyId': data.partyId });
    // console.log(response);
    setResponse(response);
     if(response.errorMessage!==undefined){
        toast.error(`${response.errorMessage}`,{position:'top-center'})
    }else if(response.successMessage!==undefined){
      toast.success(`${response.successMessage}`, {position: "top-center"});
      onDelete(data.partyId);
    }
  }


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
                    <Button onClick={()=>{setShow(!show);show?"":getExams()}}> {show?<FaX/>:<FaAngleDoubleDown/>} {show?"Hide":"View exam"}</Button>
                    <DeleteButton onClick={deleteUser}><FaTrash></FaTrash></DeleteButton>
                </ButtonContainer>
            
            </TableRow>
            {show && <ExamContainer>
                {(ExamResponse?.examList===undefined||ExamResponse?.examList?.length<=0)?<ExamContent>No exam assigned -</ExamContent>:ExamResponse?.examList?.map((data,index)=><ExamCard data={data} key={index}></ExamCard>)}
                </ExamContainer>}

        </CommonTable>
  </>;
};

export default UserTable;
