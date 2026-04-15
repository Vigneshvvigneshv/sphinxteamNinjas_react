import React, { useState } from "react";
import { CommonTable, Content, Outer, RowContainer, TableRow } from "../styles/common_style";
import { FormLabel,FormInput } from "../styles/form_style";

const UserUnassignedTable = ({ data, onCheck }) => {

    if(!data) return;

    const [userObj, setUserObj] = useState({
      partyId: data.partyId, 
      allowedAttempts: '1', 
      timeoutDays: '10'
    });
    
    const [isChecked, setIsChecked] = useState(false);

    //this is used to handle the change in the edit modal
    const handleChange=(key, value)=>{
        let newObj = {...userObj, [key]: value};
        setUserObj(newObj);
        if(isChecked){
            onCheck(true, newObj);
        }
    }

    //this is used to handle the check event
    const handleCheck = (e) => {
        setIsChecked(e.target.checked);
        onCheck(e.target.checked, userObj);
    }

  return (
  
     
        <TableRow>
          <Content>{data.userLoginId}</Content>
          <Outer>
            <RowContainer>
              <FormLabel>Allowed attempts</FormLabel>
              <FormInput
                type="text"
                name="allowedAttempts"
                value={userObj.allowedAttempts}
                placeholder="Enter the Allowed attempts"
                onChange={(e)=>handleChange("allowedAttempts", e.target.value)}
              />
            </RowContainer>
          </Outer> 
           <Outer>
            <RowContainer>
              <FormLabel>Timeout days</FormLabel>
              <FormInput
                type="text"
                name="timeoutDays"
                value={userObj.timeoutDays}
                placeholder="Enter the Timeout days"
                onChange={(e)=>handleChange("timeoutDays", e.target.value)}
              />
            </RowContainer>
          </Outer> 
          <input type="checkbox" checked={isChecked} onChange={handleCheck} />
        </TableRow>
      
  );
};

export default UserUnassignedTable;
