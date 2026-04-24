import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import Layout from "../component/Layout";
import { apiDelete, apiGet, apiPost } from "../ApiServices/apiServices";
import Modal from "../component/Modal";
import { toast } from "sonner";
import {
  FaSearch, FaUsers, FaTrash, FaUser,
  FaUserPlus, FaClipboardList, FaSave, FaRedo, FaClock,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";

import {
  UserPageWrap,
  UserPageHeader,
  UserPageTitle,
  UserStatStrip,
  UserStatBadge,
  UserSearchWrap,
  UserSearchInput,
  UserGrid,
  UserCard,
  UserCardTop,
  UserAvatar,
  UserCardInfo,
  UserName,
  UserMeta,
  UserCardActions,
  TooltipWrapper,
  TooltipChip,
  ActionIconBtn,
  CardDivider,
  CardExamsWrap,
  CardExamsLabel,
  ExamTagList,
  ExamTag,
  NoExamsText,
  RoleBadge,
  UserEmptyWrap,
  ModalBackdrop,
  AssignModal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFieldGroup,
  ModalLabel,
  ModalInfoRow,
  ModalInput,
  ModalSelect,
  ModalFooter,
  ModalCancelBtn,
  ModalSaveBtn,
} from "../styles/userPage_style";

// ── Accent palette ────────────────────────────────────────────────────────────
const PALETTE = [
  { accent: "#3B82F6", bg: "#EFF6FF", border: "#DBEAFE", color: "#2563EB" },
  { accent: "#10B981", bg: "#ECFDF5", border: "#A7F3D0", color: "#059669" },
  { accent: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A", color: "#D97706" },
  { accent: "#8B5CF6", bg: "#F5F3FF", border: "#DDD6FE", color: "#7C3AED" },
  { accent: "#EF4444", bg: "#FEF2F2", border: "#FECACA", color: "#DC2626" },
  { accent: "#06B6D4", bg: "#ECFEFF", border: "#A5F3FC", color: "#0891B2" },
  { accent: "#EC4899", bg: "#FDF2F8", border: "#FBCFE8", color: "#DB2777" },
  { accent: "#84CC16", bg: "#F7FEE7", border: "#D9F99D", color: "#65A30D" },
];

const EXAM_TAG_COLORS = [
  { bg: "#EFF6FF", color: "#2563EB", border: "#DBEAFE" },
  { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  { bg: "#F5F3FF", color: "#7C3AED", border: "#DDD6FE" },
  { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
];

const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
};

const UserPage = () => {
  const { theme } = useSelector((state) => state.themeReducer);

  const [data, setData]                   = useState();
  const [examList, setExamList]           = useState([]);
  const [search, setSearch]               = useState("");
  const [showDelete, setShowDelete]       = useState(false);
  const [deletePartyId, setDeletePartyId] = useState();

  // assign modal state
  const [showAssign, setShowAssign]       = useState(false);
  const [assignTarget, setAssignTarget]   = useState(null); // user object
  const [assignForm, setAssignForm]       = useState({
    examId: "", allowedAttempts: "", timeoutDays: "",
  });

  // ── Fetch ─────────────────────────────────────────────────────────────────
const getExams = async (userList) => {
  const allExams = [];

  await Promise.all(
    userList.map(async (user) => {
      const response = await apiGet('/exam/getexam-by-partyId/' + user.partyId);
      if (response?.examList?.length > 0) {
        response.examList.forEach((exam) => {
          if (!allExams.find((e) => e.examId === exam.examId)) {
            allExams.push(exam);
          }
        });
      }
    })
  );

  setExamList(allExams);
  console.log('Exam list', allExams);
};

const getUsers = async () => {
  const response = await apiGet('/user/getall-user');
  setData(response);
  console.log('get users', response);

  const userList = response?.userList ?? [];
  if (userList.length > 0) {
    await getExams(userList);
  }
};

useEffect(() => {
  getUsers();
}, []);


  // ── Delete ────────────────────────────────────────────────────────────────
  const changeShow = (partyId) => {
    setShowDelete(!showDelete);
    setDeletePartyId(partyId);
  };
  const onDeleteLocal = (deletedPartyId) => {
    setData((prev) => ({
      ...prev,
      userList: prev.userList.filter((u) => u.partyId !== deletedPartyId),
    }));
  };
  const deleteParty = () => {
    deleteUser(deletePartyId);
    setShowDelete(!showDelete);
  };
  const deleteUser = async (partyId) => {
    const response = await apiDelete("/user/delete-user", { partyId });
    if (response.errorMessage) {
      toast.error(`${response.errorMessage}`, { position: "top-center" });
    } else if (response.successMessage) {
      toast.success(`${response.successMessage}`, { position: "top-center" });
      onDeleteLocal(partyId);
    }
  };

  // ── Assign modal ──────────────────────────────────────────────────────────
  const openAssignModal = (user) => {
    setAssignTarget(user);
    setAssignForm({ examId: "", allowedAttempts: "", timeoutDays: "" });
    setShowAssign(true);
  };
  const handleAssignField = (key, value) =>
    setAssignForm((prev) => ({ ...prev, [key]: value }));

  const submitAssign = async () => {
    if (!assignForm.examId) {
      toast.error("Please select an exam.", { position: "top-center" });
      return;
    }
    const response = await apiPost("/exam-assign/assign-exam", {
      examId: assignForm.examId,
      assignedUserList: [{
        partyId: assignTarget.partyId,
        allowedAttempts: assignForm.allowedAttempts,
        timeoutDays: assignForm.timeoutDays,
      }],
    });
    if (response.errorMessage) {
      toast.error(response.errorMessage, { position: "top-center" });
    } else if (response.successMessage) {
      toast.success(response.successMessage, { position: "top-center" });
      // send notification email
      await apiPost("/email/send-email", {
        examId: assignForm.examId,
        partyIdList: [assignTarget.partyId],
      });
      setShowAssign(false);
      // refresh user list so assigned exams update
      const userRes = await apiGet("/user/getall-user");
      setData(userRes);
    }
  };

  // ── Filtering ──────────────────────────────────────────────────────────────
  const userList = data?.userList ?? [];
  const filtered = userList.filter((u) => {
    const name = (u.userName || u.userLoginId || "").toLowerCase();
    const login = (u.userLoginId || "").toLowerCase();
    return name.includes(search.toLowerCase()) || login.includes(search.toLowerCase());
  });

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <UserPageWrap>

          {/* ── Header ──────────────────────────────────────────────────── */}
          <UserPageHeader>
            <UserPageTitle>
              Users
              <span>Manage all registered users</span>
            </UserPageTitle>
          </UserPageHeader>

          {/* ── Stats strip ─────────────────────────────────────────────── */}
          <UserStatStrip>
            <UserStatBadge $iconColor="#3B82F6">
              <FaUsers />
              {userList.length} {userList.length === 1 ? "user" : "users"} total
            </UserStatBadge>
            {search && (
              <UserStatBadge $iconColor="#10B981">
                <FaSearch />
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
              </UserStatBadge>
            )}
          </UserStatStrip>

          {/* ── Search ──────────────────────────────────────────────────── */}
          <UserSearchWrap>
            <FaSearch />
            <UserSearchInput
              type="text"
              placeholder="Search users…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </UserSearchWrap>

          {/* ── Grid ────────────────────────────────────────────────────── */}
          <UserGrid>
            {filtered.length > 0 ? (
              filtered.map((user, index) => {
                const pal         = PALETTE[index % PALETTE.length];
                const displayName = user.userName || user.userLoginId || "User";
                const assignedExams = user.assignedExams ?? user.examList ?? [];

                return (
                  <UserCard key={user.partyId} $accent={pal.accent} $delay={`${index * 0.03}s`}>

                    {/* Top row: avatar + name + action buttons */}
                    <UserCardTop>
                      <UserAvatar $bg={pal.bg} $color={pal.color} $border={pal.border}>
                        {getInitials(displayName)}
                      </UserAvatar>

                      <UserCardInfo>
                        <UserName>{displayName}</UserName>
                        <UserMeta>{user.userLoginId}</UserMeta>
                      </UserCardInfo>

                      {user.role && (
                        <RoleBadge $bg={pal.bg} $color={pal.color} $border={pal.border}>
                          {user.role}
                        </RoleBadge>
                      )}

                      <UserCardActions>
                        <TooltipWrapper>
                          <TooltipChip>Assign exam</TooltipChip>
                          <ActionIconBtn
                            className="assign"
                            onClick={() => openAssignModal(user)}
                          >
                            <FaUserPlus />
                          </ActionIconBtn>
                        </TooltipWrapper>
                        <TooltipWrapper>
                          <TooltipChip>Delete</TooltipChip>
                          <ActionIconBtn
                            className="delete"
                            onClick={() => changeShow(user.partyId)}
                          >
                            <FaTrash />
                          </ActionIconBtn>
                        </TooltipWrapper>
                      </UserCardActions>
                    </UserCardTop>

                    {/* Assigned exams section */}
                    <CardDivider />
                    <CardExamsWrap>
                      <CardExamsLabel>Assigned assessments</CardExamsLabel>
                      {assignedExams.length > 0 ? (
                        <ExamTagList>
                          {assignedExams.map((exam, ei) => {
                            const tc = EXAM_TAG_COLORS[ei % EXAM_TAG_COLORS.length];
                            return (
                              <ExamTag key={exam.examId ?? ei} $bg={tc.bg} $color={tc.color} $border={tc.border}>
                                <FaClipboardList />
                                {exam.examName ?? exam}
                              </ExamTag>
                            );
                          })}
                        </ExamTagList>
                      ) : (
                        <NoExamsText>No assessments assigned yet</NoExamsText>
                      )}
                    </CardExamsWrap>

                  </UserCard>
                );
              })
            ) : (
              <UserEmptyWrap>
                <FaUser />
                <p>{search ? `No users match "${search}"` : "No users available yet."}</p>
              </UserEmptyWrap>
            )}
          </UserGrid>

        </UserPageWrap>
      </Layout>

      {/* ── Delete modal ────────────────────────────────────────────────── */}
      {showDelete && (
        <Modal
          title="Delete User"
          onConfirm={deleteParty}
          onCancel={changeShow}
          showConfirmButton={true}
          type="delete"
        >
          Are you sure you want to delete this user? This action cannot be undone.
        </Modal>
      )}

      {/* ── Assign exam modal ────────────────────────────────────────────── */}
      {showAssign && assignTarget && (
        <ModalBackdrop>
          <AssignModal>
            <ModalHeader>
              <ModalTitle>Assign Assessment</ModalTitle>
              <ModalClose onClick={() => setShowAssign(false)}>
                <FaX />
              </ModalClose>
            </ModalHeader>

            <ModalBody>
              {/* User (read-only) */}
              <ModalFieldGroup>
                <ModalLabel>User</ModalLabel>
                <ModalInfoRow>
                  {assignTarget.userName || assignTarget.userLoginId}
                </ModalInfoRow>
              </ModalFieldGroup>

              {/* Exam select */}
              <ModalFieldGroup>
                <ModalLabel>Assessment</ModalLabel>
                <ModalSelect
                  value={assignForm.examId}
                  onChange={(e) => handleAssignField("examId", e.target.value)}
                >
                  <option value="">Select an assessment…</option>
                  {examList.map((exam) => (
                    <option key={exam.examId} value={exam.examId}>
                      {exam.examName}
                    </option>
                  ))}
                </ModalSelect>
              </ModalFieldGroup>

              {/* Allowed attempts */}
              <ModalFieldGroup>
                <ModalLabel>Allowed Attempts</ModalLabel>
                <ModalInput
                  type="number"
                  placeholder="e.g. 3"
                  value={assignForm.allowedAttempts}
                  onChange={(e) => handleAssignField("allowedAttempts", e.target.value)}
                />
              </ModalFieldGroup>

              {/* Timeout days */}
              <ModalFieldGroup>
                <ModalLabel>Timeout Days</ModalLabel>
                <ModalInput
                  type="number"
                  placeholder="e.g. 30"
                  value={assignForm.timeoutDays}
                  onChange={(e) => handleAssignField("timeoutDays", e.target.value)}
                />
              </ModalFieldGroup>
            </ModalBody>

            <ModalFooter>
              <ModalCancelBtn onClick={() => setShowAssign(false)}>
                <FaX /> Cancel
              </ModalCancelBtn>
              <ModalSaveBtn onClick={submitAssign}>
                <FaUserPlus /> Assign
              </ModalSaveBtn>
            </ModalFooter>
          </AssignModal>
        </ModalBackdrop>
      )}
    </ThemeProvider>
  );
};

export default UserPage;
