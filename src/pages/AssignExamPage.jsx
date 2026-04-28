import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import Layout from "../component/Layout";
import { apiDelete, apiGet, apiPost, apiPut } from "../ApiServices/apiServices";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Modal from "../component/Modal";
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaUserCheck,
  FaUserPlus,
  FaUsers,
  FaUserSlash,
  FaPen,
  FaTrash,
  FaSave,
  FaClock,
  FaRedo,
  FaArrowLeft,
} from "react-icons/fa";
import { FaClipboardList, FaNoteSticky, FaX } from "react-icons/fa6";

import {
  AssignPageWrap,
  AssignPageHeader,
  AssignPageTitle,
  AssignPageActions,
  HeaderBtn,
  AssignBtn,
  SectionPanel,
  SectionPanelHeader,
  SectionTitleGroup,
  SectionIconBox,
  SectionTitle,
  SectionCount,
  CollapsibleBody,
  SectionBody,
  SectionEmpty,
  UserRow,
  UnassignedRow,
  UserCheckbox,
  UserAvatar,
  UserInfo,
  UserFullName,
  UserLoginId,
  InlineFields,
  InlineFieldWrap,
  InlineFieldLabel,
  InlineFieldInput,
  MetaChip,
  RowActions,
  TooltipWrapper,
  TooltipChip,
  RowIconBtn,
  SelectionBar,
  SelectionText,
  EditBackdrop,
  EditModal,
  EditModalHeader,
  EditModalTitle,
  EditModalClose,
  EditModalBody,
  EditFieldGroup,
  EditLabel,
  EditInfoRow,
  EditInput,
  EditModalFooter,
  CancelBtn,
  SaveBtn,
} from "../styles/assignExamPage_style";
import { FBackBtn } from "../styles/formPage_style";

// ── Avatar palette ────────────────────────────────────────────────────────────
const PALETTE = [
  { bg: "#EFF6FF", color: "#2563EB", border: "#DBEAFE" },
  { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
  { bg: "#F5F3FF", color: "#7C3AED", border: "#DDD6FE" },
  { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" },
  { bg: "#ECFEFF", color: "#0891B2", border: "#A5F3FC" },
];

const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
};

const AssignExamPage = () => {
  const { theme }  = useSelector((state) => state.themeReducer);
  const navigate   = useNavigate();
  const { id }     = useParams();
  const location   = useLocation();

  const [examName, setExamName]             = useState();
  const [data, setData]                     = useState();
  const [unassignedUser, setUnassignedUser] = useState();
  const [showAssigned, setShowAssigned]     = useState(false);

  // rows: array of { partyId, allowedAttempts, timeoutDays, ...user }
  const [rows, setRows]       = useState([]);
  const [partyId, setPartyId] = useState();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit]     = useState(false);
  const [userObj, setUserObj]       = useState({
    partyId: "", allowedAttempts: "", timeoutDays: "",
  });

  useEffect(() => {
    if (location.state !== undefined) setExamName(location.state?.examName);
  }, []);

  if (examName === undefined) navigate("/admin-dashboard");

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchAssignedUsers = async () => {
    const res = await apiGet("/exam-assign/get-assigned-user/" + id);
    setData(res);
  };
  const fetchUnassignedUsers = async () => {
    const res = await apiGet("/exam-assign/get-unassigned-user/" + id);
    setUnassignedUser(res);
  };
  useEffect(() => {
    fetchUnassignedUsers();
    fetchAssignedUsers();
  }, []);

  // ── Edit assigned modal ───────────────────────────────────────────────────
  const handleChange = (key, value) =>
    setUserObj((prev) => ({ ...prev, [key]: value }));

  const changeShowEdit = (partyExamData) => {
    setShowEdit(!showEdit);
    setUserObj(partyExamData);
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const changeShowDelete = (pid) => {
    setShowDelete(!showDelete);
    setPartyId(pid);
  };
  const onDelete = () => {
    deleteUser(partyId);
    setShowDelete(!showDelete);
  };
  const deleteUser = async (pid) => {
    const res = await apiDelete("/exam-assign/remove-assigned-exam", {
      examId: id, partyId: pid,
    });
    if (res.errorMessage) {
      toast.error(res.errorMessage, { position: "top-center" });
    } else if (res.successMessage) {
      toast.success(res.successMessage, { position: "top-center" });
      fetchAssignedUsers();
      fetchUnassignedUsers();
    }
  };

  // ── Checkbox toggle for unassigned rows ───────────────────────────────────
  const toggleUser = (checked, user) => {
    setRows((prev) => {
      if (checked) {
        // add with default values
        return [...prev.filter((r) => r.partyId !== user.partyId),
          { ...user, allowedAttempts: "", timeoutDays: "" }];
      }
      return prev.filter((r) => r.partyId !== user.partyId);
    });
  };

  // Update inline field value for a selected user
  const updateRowField = (pid, field, value) => {
    setRows((prev) =>
      prev.map((r) => r.partyId === pid ? { ...r, [field]: value } : r)
    );
  };

  // ── Assign ────────────────────────────────────────────────────────────────
  const assignUser = async () => {
    const response = await apiPost("/exam-assign/assign-exam", {
      examId: id, assignedUserList: rows,
    });
    if (response.errorMessage) {
      toast.error(response.errorMessage, { position: "top-center" });
    } else if (response.successMessage) {
      toast.success(response.successMessage, { position: "top-center" });
      setRows([]);
      fetchUnassignedUsers();
      fetchAssignedUsers();
    }
  };
   // ──  Set up exam ───────────────────────────────────────────────────────
   const setUpExam=async()=>{
     const list = assignedList.map((d) => d.partyId);
     const response=await apiPost("/email/send-exam-email", { examId: id, partyIdList: list });
     if(response.successMessage){
      toast.success(response.successMessage,{position:'top-center'});
     }else if(response.errorMessage){
      toast.error('Set up failed',{position:'top-center'});
     }
   }

  // ── Update assigned ───────────────────────────────────────────────────────
  const updateExam = async (obj) => {
    const response = await apiPut("/exam-assign/update-assigned-exam", {
      ...obj, examId: id,
    });
    if (response.errorMessage) {
      toast.error(response.errorMessage, { position: "top-center" });
    } else if (response.successMessage) {
      toast.success(response.successMessage, { position: "top-center" });
      fetchUnassignedUsers();
      fetchAssignedUsers();
    }
  };

  // ── Derived ───────────────────────────────────────────────────────────────
  const assignedList   = data?.assignedUsers ?? [];
  const unassignedList = unassignedUser?.unassignedUsers ?? [];

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <AssignPageWrap>

          {/* ── Header ────────────────────────────────────────────────── */}
          <AssignPageHeader>
            <AssignPageTitle>
              Assign Assessment
              <span>{examName}</span>
            </AssignPageTitle>
            <AssignPageActions>
              <AssignBtn onClick={()=>setUpExam()} >
                <FaClipboardList/>
                Set up exam
              </AssignBtn>
            </AssignPageActions>
          </AssignPageHeader>

          {/* ── Assigned Users Panel ──────────────────────────────────── */}
          <SectionPanel $delay="0.05s">
            <SectionPanelHeader>
              <SectionTitleGroup>
                <SectionIconBox $bg="#ECFDF5" $color="#059669">
                  <FaUserCheck />
                </SectionIconBox>
                <SectionTitle>Assigned Users</SectionTitle>
                <SectionCount>{assignedList.length}</SectionCount>
              </SectionTitleGroup>
              <AssignPageActions>
              <HeaderBtn onClick={() => setShowAssigned((v) => !v)}>
                {showAssigned ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
                {showAssigned ? "Hide assigned" : "View assigned"}
              </HeaderBtn>
            </AssignPageActions>
            </SectionPanelHeader>

            {showAssigned && (
              <CollapsibleBody>
                <SectionBody>
                  {assignedList.length === 0 ? (
                    <SectionEmpty>
                      <FaUsers />
                      <p>No users assigned yet.</p>
                    </SectionEmpty>
                  ) : (
                    assignedList.map((user, index) => {
                      const pal  = PALETTE[index % PALETTE.length];
                      const name = user.userName || user.userLoginId || "User";
                      return (
                        <UserRow key={user.partyId} $delay={`${index * 0.03}s`}>
                          <UserAvatar $bg={pal.bg} $color={pal.color} $border={pal.border}>
                            {getInitials(name)}
                          </UserAvatar>
                          <UserInfo>
                            <UserFullName>{name}</UserFullName>
                            <UserLoginId>{user.userLoginId}</UserLoginId>
                          </UserInfo>
                          <MetaChip $bg="#EFF6FF" $color="#2563EB" $border="#DBEAFE">
                            <FaRedo /> {user.allowedAttempts} attempts
                          </MetaChip>
                          <MetaChip $bg="#FFFBEB" $color="#D97706" $border="#FDE68A">
                            <FaClock /> {user.timeoutDays}d
                          </MetaChip>
                          <RowActions>
                            <TooltipWrapper>
                              <TooltipChip>Edit</TooltipChip>
                              <RowIconBtn className="edit" onClick={() => changeShowEdit(user)}>
                                <FaPen />
                              </RowIconBtn>
                            </TooltipWrapper>
                            <TooltipWrapper>
                              <TooltipChip>Remove</TooltipChip>
                              <RowIconBtn className="delete" onClick={() => changeShowDelete(user.partyId)}>
                                <FaTrash />
                              </RowIconBtn>
                            </TooltipWrapper>
                          </RowActions>
                        </UserRow>
                      );
                    })
                  )}
                </SectionBody>
              </CollapsibleBody>
            )}
          </SectionPanel>

          {/* ── Unassigned Users Panel ────────────────────────────────── */}
          <SectionPanel $delay="0.12s">
            <SectionPanelHeader>
              <SectionTitleGroup>
                <SectionIconBox $bg="#FEF2F2" $color="#DC2626">
                  <FaUserSlash />
                </SectionIconBox>
                <SectionTitle>Unassigned Users</SectionTitle>
                <SectionCount>{unassignedList.length}</SectionCount>
              </SectionTitleGroup>
              <AssignBtn onClick={assignUser} disabled={rows.length === 0}>
                <FaUserPlus /> Assign{rows.length > 0 ? ` (${rows.length})` : ""}
              </AssignBtn>
            </SectionPanelHeader>

            <SectionBody>
              {unassignedList.length === 0 ? (
                <SectionEmpty>
                  <FaUsers />
                  <p>All users are already assigned.</p>
                </SectionEmpty>
              ) : (
                <>
                  {unassignedList.map((user, index) => {
                    const pal     = PALETTE[index % PALETTE.length];
                    const name    = user.userName || user.userLoginId || "User";
                    const checked = rows.some((r) => r.partyId === user.partyId);
                    const rowData = rows.find((r) => r.partyId === user.partyId);

                    return (
                      <UnassignedRow key={user.partyId} $delay={`${index * 0.03}s`}>
                        <UserCheckbox
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => toggleUser(e.target.checked, user)}
                        />
                        <UserAvatar $bg={pal.bg} $color={pal.color} $border={pal.border}>
                          {getInitials(name)}
                        </UserAvatar>
                        <UserInfo>
                          <UserFullName>{name}</UserFullName>
                          <UserLoginId>{user.userLoginId}</UserLoginId>
                        </UserInfo>

                        {/* Inline attempt + timeout fields — only visible when checked */}
                        {checked && (
                          <InlineFields>
                            <InlineFieldWrap>
                              <InlineFieldLabel>Attempts</InlineFieldLabel>
                              <InlineFieldInput
                                type="number"
                                placeholder="e.g. 3"
                                value={rowData?.allowedAttempts ?? ""}
                                onChange={(e) =>
                                  updateRowField(user.partyId, "allowedAttempts", e.target.value)
                                }
                              />
                            </InlineFieldWrap>
                            <InlineFieldWrap>
                              <InlineFieldLabel>Timeout (days)</InlineFieldLabel>
                              <InlineFieldInput
                                type="number"
                                placeholder="e.g. 30"
                                value={rowData?.timeoutDays ?? ""}
                                onChange={(e) =>
                                  updateRowField(user.partyId, "timeoutDays", e.target.value)
                                }
                              />
                            </InlineFieldWrap>
                          </InlineFields>
                        )}
                      </UnassignedRow>
                    );
                  })}
                  {rows.length > 0 && (
                    <SelectionBar>
                      <SelectionText>
                        {rows.length} user{rows.length !== 1 ? "s" : ""} selected
                      </SelectionText>
                    </SelectionBar>
                  )}
                </>
              )}
            </SectionBody>
          </SectionPanel>
             <FBackBtn onClick={() => navigate(-1)}>
              <FaArrowLeft size={11} /> Back to Assessment
            </FBackBtn>
        </AssignPageWrap>
      </Layout>

      {/* ── Delete modal ────────────────────────────────────────────────── */}
      {showDelete && (
        <Modal
          title="Remove User"
          onConfirm={onDelete}
          onCancel={changeShowDelete}
          type="delete"
          showConfirmButton={true}
        >
          Are you sure you want to remove this user from the assessment?
        </Modal>
      )}

      {/* ── Edit assigned modal ─────────────────────────────────────────── */}
      {showEdit && (
        <EditBackdrop>
          <EditModal>
            <EditModalHeader>
              <EditModalTitle>Edit Assignment</EditModalTitle>
              <EditModalClose onClick={() => setShowEdit(false)}>
                <FaX />
              </EditModalClose>
            </EditModalHeader>

            <EditModalBody>
              <EditFieldGroup>
                <EditLabel>Assessment</EditLabel>
                <EditInfoRow>{examName}</EditInfoRow>
              </EditFieldGroup>
              <EditFieldGroup>
                <EditLabel>User</EditLabel>
                <EditInfoRow>{userObj.userLoginId}</EditInfoRow>
              </EditFieldGroup>
              <EditFieldGroup>
                <EditLabel>Allowed Attempts</EditLabel>
                <EditInput
                  type="number"
                  value={userObj.allowedAttempts}
                  onChange={(e) => handleChange("allowedAttempts", e.target.value)}
                  placeholder="e.g. 3"
                />
              </EditFieldGroup>
              <EditFieldGroup>
                <EditLabel>Timeout Days</EditLabel>
                <EditInput
                  type="number"
                  value={userObj.timeoutDays}
                  onChange={(e) => handleChange("timeoutDays", e.target.value)}
                  placeholder="e.g. 30"
                />
              </EditFieldGroup>
            </EditModalBody>

            <EditModalFooter>
              <CancelBtn onClick={() => setShowEdit(false)}>
                <FaX /> Cancel
              </CancelBtn>
              <SaveBtn onClick={() => { updateExam(userObj); setShowEdit(false); }}>
                <FaSave /> Save changes
              </SaveBtn>
            </EditModalFooter>
          </EditModal>
        </EditBackdrop>
      )}
    </ThemeProvider>
  );
};

export default AssignExamPage;
