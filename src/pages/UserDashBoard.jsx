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
} from "../styles/common_style";
import { useSelector } from "react-redux";
import { apiGet } from "../ApiServices/apiServices";
import ExamCard from "../component/ExamCard";
import { UserExamTable } from "../component/UserExamTable";
import Empty from "../component/Empty";
import { FaAngleDoubleDown } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const UserDashBoard = () => {
  const [examList, setExamList] = useState([]);


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
  return (
    <Layout>
      <CommonContainer>
        <CommonHeading>Welcome to Sphinx</CommonHeading>
        <CommonSection>
          <CommonTable>
            {examList?.length === 0 ? (
              <Empty>No exam available</Empty>
            ) : (
              examList.map((exam, index) => {
                return (
                  <>
                    <UserExamTable data={exam} key={index}>
                      
                    </UserExamTable>
                  </>
                );
              })
            )}
          </CommonTable>
        </CommonSection>
      </CommonContainer>
    </Layout>
  );
};

export default UserDashBoard;
