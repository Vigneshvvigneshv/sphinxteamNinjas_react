import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import {
  AddButton,
  AssignButton,
  Button,
  ButtonContainer,
  CommonContainer,
  CommonHeader,
  CommonHeading,
  CommonSection,
  Content,
  DeleteButton,
  Dropdown,
  EditButton,
  ExamHeader,
  TableHeading,
  TableRow,
} from "../styles/common_style";
import { NavButton } from "../styles/header_style";
import { apiDelete, apiGet, apiPost, apiPut } from "../ApiServices/apiServices";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import UserAssignedTable from "../component/UserAssignedTable";
import UserUnassignedTable from "../component/UserUnassignedTable";
import { toast } from "sonner";
import { style } from "framer-motion/client";
import Empty from "../component/Empty";
import Modal from "../component/Modal";
import BackDrop from "../component/BackDrop";
import { FileInput } from "../styles/form_style";

const AssignExamPage = () => {

  const navigate=useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [unassignedUser, setUnassignedUser] = useState();
  const [showDelete,setShowDelete]=useState(false);
  const [rows, setRows] = useState([]);
  const [partyId, setPartyId] = useState();

  //this is used to show the edit modal
    const [showEdit,setShowEdit]=useState(false);
    //this is used to store the user object from the UserAssignedTable component
    const [userObj,setUserObj]=useState({
      partyId:'',
      allowedAttempts:'',
      timeoutDays:'',
      userLoginId:''
    });
  //this is used to handle the change in the edit modal
    const handleChange=(key, value)=>{
      let newObj = {...userObj, [key]: value};
      setUserObj(newObj);
    } 
  
//this is used to show the edit modal
const changeShowEdit=(partyExamData)=>{
    setShowEdit(!showEdit);
    setUserObj(partyExamData);
}






  //this delete is used to show th modal and set the partyId 
  const changeShowDelete=(partyId)=>{
    setShowDelete(!showDelete);
    setPartyId(partyId);
  }
  //this is used to call the delete method
  const onDelete=()=>{
    deleteUser(partyId)
    setShowDelete(!showDelete);
  }
    //this method is used to delete the user from the backend by passing the partyId and examId
    const deleteUser=async(partyId)=>{
    const response=await apiDelete("/exam-assign/remove-assigned-exam",{
      examId:id,
      partyId:partyId
    })
    if(response.errorMessage!==undefined){
      toast.error(`${response.errorMessage}`, { position: 'top-center' });
    }else if(response.successMessage!==undefined){
      toast.success(response.successMessage, { position: 'top-center' });
      fetchAssignedUsers();
      fetchUnassignedUsers();
    }
  }
 
  //this is used to add the user to the rows array
  const addUser = (state, object) => {
    setRows((prevRows) => {
      if (state) {
        const filtered = prevRows.filter((userData) => userData.partyId !== object.partyId);
        return [...filtered, { ...object }];
      } else {
        return prevRows.filter((userData) => userData.partyId !== object.partyId);
      }
    });
  };

  const fetchAssignedUsers = async () => {
    const response = await apiGet("/exam-assign/get-assigned-user/" + id);
    setData(response);
    console.log("Assing Exam Page", response);
  };

  const fetchUnassignedUsers = async () => {
    const response = await apiGet("/exam-assign/get-unassigned-user/" + id);
    setUnassignedUser(response);
    console.log("unassign Exam Page", response);
  };

  const assignUser = async () => {
    const response = await apiPost("/exam-assign/assign-exam", { examId: id, assignedUserList: rows });
    if (response.errorMessage !== undefined) {
      toast.error(`${response.errorMessage}`, { position: 'top-center' });
    } else if (response.successMessage !== undefined) {
      toast.success(response.successMessage, { position: 'top-center' });
      setRows([]);
      fetchAssignedUsers();
      fetchUnassignedUsers();
    }
  };




  const updateExam=async(userObj)=>{
    const response=await apiPut("/exam-assign/update-assigned-exam",{...userObj,examId:id});
    if(response.errorMessage!==undefined){
      toast.error(`${response.errorMessage}`, { position: 'top-center' });
    }else if(response.successMessage!==undefined){
      toast.success(response.successMessage, { position: 'top-center' });
      fetchAssignedUsers();
      fetchUnassignedUsers();
    }
  }

  useEffect(() => {
    fetchAssignedUsers();
    fetchUnassignedUsers();
  }, []);
  console.log("unAssing Exam Page", unassignedUser);

  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>Assigned users</CommonHeading>
        </CommonHeader>
        <CommonSection>
          {/* Assign exam form — placeholder for future implementation */}

          {data?.assignedUsers !== undefined &&
          data?.assignedUsers?.length <= 0 ? (
            <Empty>No user assigned</Empty>
          ) : (
            data?.assignedUsers?.map((data) => (
              <UserAssignedTable data={data} key={data.partyId}  changeShowDelete={changeShowDelete}   changeShowEdit={changeShowEdit} onUpdate={updateExam}></UserAssignedTable>
            ))
          )}
          </CommonSection>
          <CommonSection>
            
          <CommonHeader>

          <CommonHeading>Unassigned users</CommonHeading>
          <AssignButton onClick={assignUser} disabled={(rows?.length<=0) } >Assign</AssignButton>
          </CommonHeader>
          {unassignedUser?.unassignedUsers !== undefined &&
          unassignedUser?.unassignedUsers?.length <= 0 ? (
            <Empty>No user Available</Empty>
          ) : (
            unassignedUser?.unassignedUsers?.map((data) => (
              <UserUnassignedTable
                data={data}
                key={data.partyId}
                onCheck={addUser}
              ></UserUnassignedTable>
            ))
          )}
            </CommonSection>
      </CommonContainer>
       {showDelete && <Modal
              title="Remove user" 
              onConfirm={onDelete}
              onCancel={changeShowDelete}
              type='delete'
              showConfirmButton={true}>
                Are you sure you want to remove this user?
              </Modal>
              }  

              {showEdit && 
          <BackDrop>
            <ExamHeader>Username : {userObj.userLoginId}</ExamHeader>
            <ExamHeader>Allowed attempts:<FileInput type="text" value={userObj.allowedAttempts} onChange={(e)=>handleChange("allowedAttempts", e.target.value)}></FileInput></ExamHeader>
            <ExamHeader>Timeout Days:<FileInput type="text" value={userObj.timeoutDays} onChange={(e)=>handleChange("timeoutDays", e.target.value)}></FileInput></ExamHeader>
            <ButtonContainer style={{width:'100%'}}>
              <DeleteButton onClick={()=>setShowEdit(!showEdit)}>Cancle</DeleteButton>
              <EditButton onClick={()=>{updateExam(userObj);setShowEdit(!showEdit)}}>Save</EditButton>
            </ButtonContainer>
          </BackDrop>
        } 
    </Layout>
  );
};

export default AssignExamPage;
