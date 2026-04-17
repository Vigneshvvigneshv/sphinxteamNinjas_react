import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import {
  AssignButton,
  Button,
  ButtonContainer,
  CommonContainer,
  CommonHeader,
  CommonHeading,
  CommonSection,
  CommonTable,
  Content,
  DeleteButton,
  EditButton,
  ExamContainer,
  ExamHeader,
} from "../styles/common_style";
import { apiDelete, apiGet, apiPost, apiPut } from "../ApiServices/apiServices";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaPlus,
  FaSave,
  FaUserPlus,
} from "react-icons/fa";
import UserAssignedTable from "../component/UserAssignedTable";
import UserUnassignedTable from "../component/UserUnassignedTable";
import { toast } from "sonner";
import Empty from "../component/Empty";
import Modal from "../component/Modal";
import BackDrop from "../component/BackDrop";
import { FileInput } from "../styles/form_style";
import { FaX } from "react-icons/fa6";

const AssignExamPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [unassignedUser, setUnassignedUser] = useState();
  const [showDelete, setShowDelete] = useState(false);
  const [showAssignedUser, setShowAssignedUser] = useState(false);
  const [rows, setRows] = useState([]);
  const [partyId, setPartyId] = useState();

  //get the state from the navigate the when click the assign in the adminDashboard
  //location is used to get the useLocation
  const location = useLocation();
  const [examName, setExamName] = useState();

  useEffect(() => {
    if (location.state !== undefined) {
      setExamName(location.state?.examName);
    }
  }, []);
  if (examName === undefined) {
    navigate("/admin-dashboard");
  }

  //this is used to show the edit modal
  const [showEdit, setShowEdit] = useState(false);
  //this is used to store the user object from the UserAssignedTable component
  const [userObj, setUserObj] = useState({
    partyId: "",
    allowedAttempts: "",
    timeoutDays: "",
    userLoginId: "",
  });
  //this is used to handle the change in the edit modal
  const handleChange = (key, value) => {
    let newObj = { ...userObj, [key]: value };
    setUserObj(newObj);
  };

  //this is used to show the edit modal
  const changeShowEdit = (partyExamData) => {
    setShowEdit(!showEdit);
    setUserObj(partyExamData);
  };

  //this delete is used to show th modal and set the partyId
  const changeShowDelete = (partyId) => {
    setShowDelete(!showDelete);
    setPartyId(partyId);
  };
  //this is used to call the delete method
  const onDelete = () => {
    deleteUser(partyId);
    setShowDelete(!showDelete);
  };
  //this method is used to delete the user from the backend by passing the partyId and examId
  const deleteUser = async (partyId) => {
    const response = await apiDelete("/exam-assign/remove-assigned-exam", {
      examId: id,
      partyId: partyId,
    });
    if (response.errorMessage !== undefined) {
      toast.error(`${response.errorMessage}`, { position: "top-center" });
    } else if (response.successMessage !== undefined) {
      toast.success(response.successMessage, { position: "top-center" });
      fetchAssignedUsers();
      fetchUnassignedUsers();
    }
  };

  //this is used to add the user to the rows array
  const addUser = (state, object) => {
    setRows((prevRows) => {
      if (state) {
        const filtered = prevRows.filter(
          (userData) => userData.partyId !== object.partyId,
        );
        return [...filtered, { ...object }];
      } else {
        return prevRows.filter(
          (userData) => userData.partyId !== object.partyId,
        );
      }
    });
  };

  const viewAssignedUser = () => {
    setShowAssignedUser(!showAssignedUser);
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
    const response = await apiPost("/exam-assign/assign-exam", {
      examId: id,
      assignedUserList: rows,
    });
    if (response.errorMessage !== undefined) {
      toast.error(`${response.errorMessage}`, { position: "top-center" });
    } else if (response.successMessage !== undefined) {
      toast.success(response.successMessage, { position: "top-center" });
      setRows([]);
      fetchUnassignedUsers();
      fetchAssignedUsers();
    }
  };

  const updateExam = async (userObj) => {
    const response = await apiPut("/exam-assign/update-assigned-exam", {
      ...userObj,
      examId: id,
    });
    if (response.errorMessage !== undefined) {
      toast.error(`${response.errorMessage}`, { position: "top-center" });
    } else if (response.successMessage !== undefined) {
      toast.success(response.successMessage, { position: "top-center" });
      fetchUnassignedUsers();
      fetchAssignedUsers();
    }
  };

  useEffect(() => {
    fetchUnassignedUsers();
    fetchAssignedUsers();
  }, []);

  console.log("unAssing Exam Page", unassignedUser);

  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>Assigned users - {examName}</CommonHeading>
          <ButtonContainer>
            <Button onClick={viewAssignedUser}>
              {!showAssignedUser ? <FaAngleDoubleDown /> : <FaAngleDoubleUp />}{" "}
              {showAssignedUser ? "Hide" : "View assigned User"}
            </Button>
          </ButtonContainer>
        </CommonHeader>
        <CommonSection>
          {/* Assign exam form — placeholder for future implementation */}
          
          <CommonTable>
            {showAssignedUser &&
            <ExamContainer style={{display:"block"}}>
              {data?.assignedUsers !== undefined &&
              data?.assignedUsers?.length <= 0 ? (
                <Empty>No user assigned</Empty>
              ) : (
                data?.assignedUsers?.map((data) => (
                  <UserAssignedTable
                    data={data}
                    key={data.partyId}
                    changeShowDelete={changeShowDelete}
                    changeShowEdit={changeShowEdit}
                  ></UserAssignedTable>
                  
                )))}</ExamContainer>
              }
          </CommonTable>
          
        </CommonSection>
        <CommonSection>
          <CommonHeader>
            <CommonHeading>Unassigned users</CommonHeading>
            <AssignButton onClick={assignUser} disabled={rows?.length <= 0}>
              <FaUserPlus />
              Assign
            </AssignButton>
          </CommonHeader>
          <CommonTable>
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
          </CommonTable>
        </CommonSection>
      </CommonContainer>
      {showDelete && (
        <Modal
          title="Remove user"
          onConfirm={onDelete}
          onCancel={changeShowDelete}
          type="delete"
          showConfirmButton={true}
        >
          Are you sure want to remove this user?
        </Modal>
      )}

      {/**exam name bug is there */}
      {showEdit && (
        <BackDrop>
          <ExamHeader>
            Username : {userObj.userLoginId} <Content>{examName}</Content>
          </ExamHeader>
          <ExamHeader>
            Allowed attempts:
            <FileInput
              type="text"
              value={userObj.allowedAttempts}
              onChange={(e) => handleChange("allowedAttempts", e.target.value)}
            ></FileInput>
          </ExamHeader>
          <ExamHeader>
            Timeout Days:
            <FileInput
              type="text"
              value={userObj.timeoutDays}
              onChange={(e) => handleChange("timeoutDays", e.target.value)}
            ></FileInput>
          </ExamHeader>
          <ButtonContainer style={{ width: "100%" }}>
            <DeleteButton onClick={() => setShowEdit(!showEdit)}>
              <FaX />
              Cancel
            </DeleteButton>
            <EditButton
              onClick={() => {
                updateExam(userObj);
                setShowEdit(!showEdit);
              }}
            >
              <FaSave />
              Save
            </EditButton>
          </ButtonContainer>
        </BackDrop>
      )}
    </Layout>
  );
};

export default AssignExamPage;
