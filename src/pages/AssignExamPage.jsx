import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import {
  AddButton,
  AssignButton,
  Button,
  CommonContainer,
  CommonHeader,
  CommonHeading,
  CommonSection,
  Content,
  Dropdown,
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

const AssignExamPage = () => {

  const navigate=useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [unassignedUser, setUnassignedUser] = useState();
  const [showDelete,setShowDelete]=useState(false);
  const [rows, setRows] = useState([]);
  const [partyId, setPartyId] = useState();
  
  const changeShow=(partyId)=>{
    setShowDelete(!showDelete);
    setPartyId(partyId);
  }
  const onDelete=()=>{
    deleteUser(partyId)
    setShowDelete(!showDelete);
  }
 
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
              <UserAssignedTable data={data} key={data.partyId}  changeShow={changeShow} onDelete={deleteUser} onUpdate={updateExam}></UserAssignedTable>
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
              title="Delete user" 
              onConfirm={onDelete}
              onCancel={changeShow}
              showConfirmButton={true}>
                Are you sure you want to delete this user?
              </Modal>
              }   
    </Layout>
  );
};

export default AssignExamPage;
