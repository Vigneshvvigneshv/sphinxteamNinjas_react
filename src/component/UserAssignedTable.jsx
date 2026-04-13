import React from "react";
import { CommonTable, Content, ExamHeader, TableRow } from "../styles/common_style";

const UserAssignedTable = ({data}) => {
  return (
    <>
      <CommonTable>
        <TableRow>
            <Content>{data.userLoginId}</Content>
           <ExamHeader>Allowed attempts:<Content>{data.allowedAttempts}</Content></ExamHeader>
            <ExamHeader>Timeout Days:<Content>{data.timeoutDays}</Content></ExamHeader>
        </TableRow>
      </CommonTable>
    </>
  );
};

export default UserAssignedTable;
