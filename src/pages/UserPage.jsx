import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { apiGet } from "../ApiServices/apiServices";
import {
  CommonContainer,
  CommonHeader,
  CommonHeading,
  CommonSection,
} from "../styles/common_style";
import UserTable from "../component/UserTable";
import Empty from "../component/Empty";
const UserPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await apiGet("/user/getall-user");
      setData(response);
        console.log("user page ", response);
    };
    fetchUsers();
  }, []);
{
  console.log("length",data?.userList?.length);
}
/*for UI changes only */
const onDelete=(deletedPartyId)=>{
  setData((prev) => ({
    ...prev,
    userList: prev.userList.filter((u) => u.partyId !== deletedPartyId),
  }));
}
  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>Available Users</CommonHeading>
        </CommonHeader>

        <CommonSection>
          {/* User list — placeholder for future implementation */}
          {(data?.userList===undefined || data?.userList?.length<=0) ? <Empty>No user available</Empty> 
          : data?.userList?.map((d,index) => {
            return <UserTable data={d} key={index} onDelete={onDelete}></UserTable>
          })}  
        </CommonSection>
      </CommonContainer>
    </Layout>
  );
};

export default UserPage;
