


import { UserCard } from '../component/UserCard'
import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import {
  ButtonContainer,
  Button,
  CommonContainer,
  CommonHeading,
  CommonSection,
  CommonTable,
  Content,
  ExamContainer,
  ExamContent,
  TableRow,
  ExamHeader,
  AddButton,
  DeleteButton,
  ContentHeading
} from "../styles/common_style";
import { useSelector } from "react-redux";
import { apiGet, apiPost } from "../ApiServices/apiServices";
import ExamCard from "../component/ExamCard";
import { UserExamTable } from "../component/UserExamTable";
import Empty from "../component/Empty";
import { FaAngleDoubleDown, FaArrowAltCircleRight } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { toast } from "sonner";
import BackDrop from "../component/BackDrop";
import { FileInput } from "../styles/form_style";
import { useNavigate } from 'react-router-dom';

export default function AssignedExam(){

    const [examList, setExamList] = useState([]);
      const navigate=useNavigate();
        const [showBackDrop,setShowBackDrop]=useState(false);
            const [userData,setUserData]=useState({
              password:""
            })
            const [examId,setExamId]=useState("")
            const handleChange=(key,value)=>{
              setUserData({...userData,[key]:value})
            }
            const handleStartExam=(examId)=>{
              setExamId(examId)
              setShowBackDrop(!showBackDrop)
            }
    
      const partyId = useSelector((state) => state.userReducer.user[0]);
      console.log(partyId);
    
      const fetchPartyDetails = async () => {
        const response = await apiGet(`/exam/getexam-by-partyId/${partyId}`);
        console.log(response);
        setExamList(response.examList);
      };
      useEffect(() => {
        fetchPartyDetails();
      }, []);
    
      const handleSubmit=async()=>{
        const response=await apiPost(`/start-exam/exam-start`,{...userData,examId:examId,partyId:partyId})
        console.log(response);
        setUserData({password:""});
        setShowBackDrop(!showBackDrop);
    
        if(response.successMessage!==undefined){
          toast.success(response.successMessage,{position:"top-center"})
          navigate(`/examquestionlist/${examId}/${partyId}`)
        }
        if(response.errorMessage!==undefined){
          toast.error(response.errorMessage,{position:"top-center"})
        }
      } 
    return(
        <>
         <Layout>
              <CommonContainer>
        <CommonHeading>Assigned Exam</CommonHeading>
                               <CommonSection>
                  <CommonTable>
                    {examList?.length === 0 ? (
                      <Empty>No exam available</Empty>
                    ) : (
                      examList.map((exam, index) => {
                        return (
                          <>
                            <UserExamTable data={exam} key={index} handleStartExam={handleStartExam}>
                              
                            </UserExamTable>
                          </>
                        );
                      })
                    )}
                  </CommonTable>
                </CommonSection>
              </CommonContainer>
               {showBackDrop && <BackDrop>
                              <CommonHeading>Instructions & Conditions</CommonHeading>
                              <ExamContainer style={{ display: "block", textAlign: "left", maxHeight: "none", marginBottom: "15px", padding: "15px" }}>
                                <ContentHeading style={{ marginBottom: "8px" }}>1. Do not refresh or navigate away from the page.</ContentHeading>
                                <ContentHeading style={{ marginBottom: "8px" }}>2. Ensure you have a stable internet connection.</ContentHeading>
                                <ContentHeading style={{ marginBottom: "8px" }}>3. The exam will be auto-submitted when the time is up.</ContentHeading>
                                <ContentHeading>4. Once started, the exam cannot be paused.</ContentHeading>
                              </ExamContainer>
                              <Content>Enter security code to start exam</Content>
                              <ExamHeader>
                                Security code:
                              </ExamHeader>
                              <FileInput type="text" name="examPassword" value={userData.password} onChange={(e)=>{handleChange("password",e.target.value)}}></FileInput>
                              <ButtonContainer>
                                <AddButton onClick={()=>{handleSubmit()}}>Start<FaArrowAltCircleRight/></AddButton>
                                <DeleteButton onClick={()=>{setShowBackDrop(!showBackDrop)}}><FaX/>Cancel</DeleteButton>
                              </ButtonContainer>
                              </BackDrop>
                }
            </Layout>
        
        </>
    )
}