import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { apiDelete, apiGet } from "../ApiServices/apiServices";
import {
  CommonContainer,
  CommonHeader,
  CommonHeading,
  CommonSection,
  CommonTable,
} from "../styles/common_style";
import UserTable from "../component/UserTable";
import Empty from "../component/Empty";
import Modal from "../component/Modal";
import { toast } from "sonner";

const UserPage = () => {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [response, setResponse] = useState();
  const [deletePartyId,setDeletePartyId]=useState();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await apiGet("/user/getall-user");
      setData(response);
      console.log("user page ", response);
    };
    fetchUsers();
  }, []);
  {
    console.log("length", data?.userList?.length);
  }

const changeShow=(partyId)=>{
  setShow(!show);
  setDeletePartyId(partyId);
}



  /*for UI changes only */
  const onDelete = (deletedPartyId) => {
    setData((prev) => ({
      ...prev,
      userList: prev.userList.filter((u) => u.partyId !== deletedPartyId),
    }));
  };

const deleteParty=()=>{
  deleteUser(deletePartyId);
  setShow(!show);
}

    const deleteUser = async (partyId) => {
      const response = await apiDelete('/user/delete-user', {'partyId':partyId });
      // console.log(response);
      setResponse(response);
       if(response.errorMessage!==undefined){
          toast.error(`${response.errorMessage}`,{position:'top-center'})
      }else if(response.successMessage!==undefined){
        toast.success(`${response.successMessage}`, {position: "top-center"});
        onDelete(deletePartyId);
      }
    }
  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>Available Users</CommonHeading>
        </CommonHeader>

        <CommonSection>
          <CommonTable>
            {/* User list — placeholder for future implementation */}
            {data?.userList === undefined || data?.userList?.length <= 0 ? (
              <Empty>No user available</Empty>
            ) : (
              data?.userList?.map((d, index) => {
                return (
                  <UserTable
                    data={d}
                    key={index}
                    onDelete={changeShow}
                  ></UserTable>
                );
              })
            )}
          </CommonTable>
        </CommonSection>
      </CommonContainer>
      {show && (
        <Modal
          title="Delete User"
          onConfirm={deleteParty}
          onCancel={changeShow}
          showConfirmButton={true}
        >
          Are you sure to delete user?
        </Modal>
      )}
    </Layout>
  );
};

export default UserPage;
