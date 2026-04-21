import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import {
  CommonContainer,
  CommonHeading,
  CommonSection,
  CommonTable,

} from "../styles/common_style";
import { useSelector } from "react-redux";
import { apiGet } from "../ApiServices/apiServices";

import { UserExamTable } from "../component/UserExamTable";
import Empty from "../component/Empty";
import CompletedExamTable from "../component/CompletedExamTable";


export default function CompletedExam() {
const [examList, setExamList] = useState([]);
const partyId = useSelector((state) => state.userReducer.user[0]);

    const fetchPartyDetails = async () => {
            const response = await apiGet(`/exam/getcompletedexam-by-partyId/${partyId}`);
            console.log("completed exam",response);
            setExamList(response.completedExamList);
          };
          useEffect(() => {
            fetchPartyDetails();
          }, []);
    return (
       <Layout>
              <CommonContainer>
                <CommonHeading>Completed Exam</CommonHeading>
                <CommonSection>
                  <CommonTable>
                    {examList?.length === 0 ? (
                      <Empty>No completed exam available</Empty>
                    ) : (
                      examList?.map((exam, index) => {
                        return (
                          <>
                            <CompletedExamTable data={exam} key={index}>
                              
                            </CompletedExamTable>
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