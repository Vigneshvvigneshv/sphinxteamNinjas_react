import React from "react";
import { CommonTable, Content, Outer, RowContainer, TableRow } from "../styles/common_style";
import { FormLabel,FormInput } from "../styles/form_style";

const UserUnassignedTable = ({ data }) => {








  return (
    <>
      <CommonTable>
        <TableRow>
          <Content>{data.userLoginId}</Content>
          <Outer>
            <RowContainer>
              <FormLabel>Allowed attempts</FormLabel>
              <FormInput
                type="text"
                // value={row.percentage}
                // onChange={(e) =>
                //   handleChange(index, "percentage", e.target.value)
                // }
                placeholder="Enter the Allowed attempts"
              />
            </RowContainer>
          </Outer> 
           <Outer>
            <RowContainer>
              <FormLabel>Timeout days</FormLabel>
              <FormInput
                type="text"
                // value={row.percentage}
                // onChange={(e) =>
                //   handleChange(index, "percentage", e.target.value)
                // }
                placeholder="Enter the Timeout days"
              />
            </RowContainer>
          </Outer> 
          
        </TableRow>
      </CommonTable>
    </>
  );
};

export default UserUnassignedTable;
