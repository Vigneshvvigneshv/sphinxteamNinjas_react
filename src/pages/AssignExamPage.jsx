import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import {
  AddButton,
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
import { apiGet, apiPost } from "../ApiServices/apiServices";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import UserAssignedTable from "../component/UserAssignedTable";
import UserUnassignedTable from "../component/UserUnassignedTable";

const AssignExamPage = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [unassignedUser, setUnassignedUser] = useState();
  const [error, setError] = useState();
  const [rows, setRows] = useState([]);

  const addUser = (state, object) => {
    if (state) {
      setRows([...rows, { ...object }]);
    } else {
      const userRecords = rows.filter((userData) => {
        return userData.userLoginId !== object.userLoginId;
      });
      setRows(userRecords);
    }
  };

  // const assignUser =async()=>{
  //   const response=  await apiPost("/exam-assign/assign-exam");
  // }
  


  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet("/exam-assign/get-assigned-user/" + id);
      setData(response);
      console.log("Assing Exam Page", response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet("/exam-assign/get-unassigned-user/" + id);
      setUnassignedUser(response);
      console.log("unassign Exam Page", response);
    };
    fetchData();
  }, []);
  console.log("unAssing Exam Page", unassignedUser);

  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>Assign</CommonHeading>
        </CommonHeader>
        <CommonSection>
          {/* Assign exam form — placeholder for future implementation */}

          <CommonHeading>Assigned Users</CommonHeading>
          {data?.assignedUsers !== undefined &&
          data?.assignedUsers?.length <= 0 ? (
            <Content>No user assigned</Content>
          ) : (
            data?.assignedUsers?.map((data, index) => (
              <UserAssignedTable data={data} key={index}></UserAssignedTable>
            ))
          )}

          <CommonHeading>Unassigned Users</CommonHeading>
          <AddButton>Submit</AddButton>
          {unassignedUser?.unassignedUsers !== undefined &&
          unassignedUser?.unassignedUsers?.length <= 0 ? (
            <Content>No user Available</Content>
          ) : (
            unassignedUser?.unassignedUsers?.map((data, index) => (
              <UserUnassignedTable
                data={data}
                key={index}
                onCheck={addUser}
              ></UserUnassignedTable>
            ))
          )}
        </CommonSection>
      </CommonContainer>
    </Layout>
  );
};

export default AssignExamPage;
