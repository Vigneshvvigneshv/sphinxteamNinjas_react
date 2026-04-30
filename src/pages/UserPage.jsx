import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import Layout from "../component/Layout";
import { apiDelete, apiGet, apiPost, apiPut } from "../ApiServices/apiServices";
import Modal from "../component/Modal";
import { toast } from "sonner";
import {
  FaSearch, FaUsers, FaTrash, FaUser,
  FaUserPlus, FaClipboardList, FaSave, FaRedo, FaClock, FaPen,
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

// ── Small inline edit icon on the exam tag ────────────────────────────────────
const ExamTagEditBtn = ({ onClick }) => (
  <span
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    title="Edit assignment"
    style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: "16px", height: "16px", marginLeft: "5px",
      background: "rgba(255,255,255,0.7)", borderRadius: "4px",
      cursor: "pointer", fontSize: "9px", color: "inherit",
      transition: "background 0.15s ease",
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,1)"}
    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.7)"}
  >
    <FaPen />
  </span>
);

const ExamTagDeleteBtn = ({ onClick }) => (
  <span
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    title="Delete assignment"
    style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: "16px", height: "16px", marginLeft: "5px",
      background: "rgba(255,255,255,0.7)", borderRadius: "4px",
      cursor: "pointer", fontSize: "9px", color: "inherit",
      transition: "background 0.15s ease",
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,1)"}
    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.7)"}
  >
    <FaTrash/>
  </span>
);

const UserPage = () => {
  const { theme }   = useSelector((state) => state.themeReducer);
  const { partyId } = useSelector((state) => state.userReducer);

  const [data, setData]                   = useState();
  const [examList, setExamList]           = useState([]);
  const [search, setSearch]               = useState("");
  const [showDelete, setShowDelete]       = useState(false);
  const [showDeleteExam, setShowDeleteExam]       = useState(false);
  const [deletePartyId, setDeletePartyId] = useState();
  const [deleteExamId, setDeleteExamId] = useState();

  // ── Assign modal state ────────────────────────────────────────────────────
  const [showAssign, setShowAssign]     = useState(false);
  const [assignTarget, setAssignTarget] = useState(null);
  const [assignForm, setAssignForm]     = useState({ examId: "", allowedAttempts: "", timeoutDays: "" });

  // ── Edit assignment modal state ───────────────────────────────────────────
  const [showEdit, setShowEdit]     = useState(false);
  const [editTarget, setEditTarget] = useState(null);  // { user, exam }
  const [editForm, setEditForm]     = useState({ allowedAttempts: "", timeoutDays: "" });

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const getUsers = async () => {
    const userRes = await apiGet('/user/getall-user/'+partyId);
    const userList = userRes?.userList ?? [];

    const examRes = await apiPost('/exam/getall-exam', { partyId });
    setExamList(examRes?.examList ?? []);

    const enriched = await Promise.all(
      userList.map(async (user) => {
        const assigned = await apiGet('/exam/getexam-by-partyId/' + user.partyId);
        return { ...user, assignedExams: assigned?.examList ?? [] };
      })
    );

    setData({ ...userRes, userList: enriched });
  };

  useEffect(() => { getUsers(); }, []);

  // ── Delete ────────────────────────────────────────────────────────────────
  const changeShow = (partyId) => {
    setShowDelete(!showDelete);
    setDeletePartyId(partyId);
  };

    // ── Delete Assigned Exam ────────────────────────────────────────────────────────────────
  const changeShowDelete = (examId, pid) => {
    setShowDeleteExam(!showDeleteExam);
    setDeleteExamId(examId);
    setDeletePartyId(pid);
  };
  
  const onDelete = () => {
    removeExam(deleteExamId, deletePartyId);
    setShowDeleteExam(!showDeleteExam);
  };

  const removeExam = async (examId, pid) => {
    const res = await apiDelete("/exam-assign/remove-assigned-exam", {
      examId: examId, partyId: pid,
    });
    if (res.errorMessage) {
      toast.error(res.errorMessage, { position: "top-center" });
    } else if (res.successMessage) {
      toast.success(res.successMessage, { position: "top-center" });
      getUsers();
    }
  };

  const onDeleteLocal = (deletedPartyId) => {
    setData((prev) => ({
      ...prev,
      userList: prev.userList.filter((u) => u.partyId !== deletedPartyId),
    }));
  };
  const deleteParty = () => { deleteUser(deletePartyId); setShowDelete(!showDelete); };
  const deleteUser  = async (partyId) => {
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

  /**
   * Returns exams NOT yet assigned to the given user.
   * Used so already-assigned exams do not appear in the assign dropdown.
   */
  const getUnassignedExams = (user) => {
    const assignedIds = new Set((user?.assignedExams ?? []).map((e) => e.examId));
    return examList.filter((e) => !assignedIds.has(e.examId));
  };

  const submitAssign = async () => {
    if (!assignForm.examId) {
      toast.error("Please select an exam.", { position: "top-center" });
      return;
    }
    const response = await apiPost("/exam-assign/assign-exam", {
      examId: assignForm.examId,
      assignedUserList: [{
        partyId:         assignTarget.partyId,
        allowedAttempts: assignForm.allowedAttempts,
        timeoutDays:     assignForm.timeoutDays,
      }],
    });
    if (response.errorMessage) {
      toast.error(response.errorMessage, { position: "top-center" });
    } else if (response.successMessage) {
      toast.success(response.successMessage, { position: "top-center" });
      await apiPost("/email/send-exam-email", {
        examId:     assignForm.examId,
        partyIdList: [assignTarget.partyId],
      });
      setShowAssign(false);
      await getUsers();
    }
  };

  // ── Edit assignment modal ─────────────────────────────────────────────────
  const openEditModal = (user, exam) => {
    setEditTarget({ user, exam });
    // Pre-fill with existing values if the API returns them; else empty
    setEditForm({
      allowedAttempts: exam.allowedAttempts ?? "",
      timeoutDays:     exam.timeoutDays     ?? "",
    });
    setShowEdit(true);
  };

  const handleEditField = (key, value) =>
    setEditForm((prev) => ({ ...prev, [key]: value }));

  const submitEdit = async () => {
    const response = await apiPost("/exam-assign/assign-exam", {
      examId: editTarget.exam.examId,
      assignedUserList: [{
        partyId:         editTarget.user.partyId,
        allowedAttempts: editForm.allowedAttempts,
        timeoutDays:     editForm.timeoutDays,
      }],
    });
    if (response.errorMessage) {
      toast.error(response.errorMessage, { position: "top-center" });
    } else if (response.successMessage) {
      toast.success("Assignment updated successfully", { position: "top-center" });
      setShowEdit(false);
      await getUsers();
    }
  };

  // ── Filtering ─────────────────────────────────────────────────────────────
  const userList = data?.userList ?? [];
  const filtered = userList.filter((u) => {
    const name  = (u.userName  || u.userLoginId || "").toLowerCase();
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

          {/* ── Grid ────────────────────────────────────────────────────── */}
          <UserGrid>
            {filtered.length > 0 ? (
              filtered.map((user, index) => {
                const pal           = PALETTE[index % PALETTE.length];
                const displayName   = user.userName || user.userLoginId || "User";
                const assignedExams = user.assignedExams ?? user.examList ?? [];

                return (
                  <UserCard key={user.partyId} $accent={pal.accent} $delay={`${index * 0.03}s`}>

                    {/* Top row */}
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
                              <ExamTag
                                key={exam.examId ?? ei}
                                $bg={tc.bg}
                                $color={tc.color}
                                $border={tc.border}
                                style={{ display: "inline-flex", alignItems: "center" }}
                              >
                                <FaClipboardList />
                                {exam.examName ?? exam}
                                {/* ── Edit button on each exam tag ── */}
                                <ExamTagEditBtn onClick={() => openEditModal(user, exam)} />
                                <ExamTagDeleteBtn onClick={() => changeShowDelete(exam.examId,user.partyId)} />
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
       {showDeleteExam && (
              <Modal
                title="Remove Assessment"
                onConfirm={onDelete}
                onCancel={changeShowDelete}
                type="delete"
                showConfirmButton={true}
              >
                Are you sure you want to remove this assessment from the user ?
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

              {/* Exam select — only shows exams NOT yet assigned to this user */}
              <ModalFieldGroup>
                <ModalLabel>Assessment</ModalLabel>
                <ModalSelect
                  value={assignForm.examId}
                  onChange={(e) => handleAssignField("examId", e.target.value)}
                >
                  <option value="">Select an assessment…</option>
                  {getUnassignedExams(assignTarget).map((exam) => (
                    <option key={exam.examId} value={exam.examId}>
                      {exam.examName}
                    </option>
                  ))}
                </ModalSelect>
                {getUnassignedExams(assignTarget).length === 0 && (
                  <span style={{ fontSize: "12px", color: "#6b7280", marginTop: "6px", display: "block" }}>
                    All available assessments have already been assigned to this user.
                  </span>
                )}
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
              <ModalSaveBtn
                onClick={submitAssign}
                disabled={getUnassignedExams(assignTarget).length === 0}
                style={
                  getUnassignedExams(assignTarget).length === 0
                    ? { opacity: 0.5, cursor: "not-allowed" }
                    : {}
                }
              >
                <FaUserPlus /> Assign
              </ModalSaveBtn>
            </ModalFooter>
          </AssignModal>
        </ModalBackdrop>
      )}

      {/* ── Edit assignment modal ─────────────────────────────────────────── */}
      {showEdit && editTarget && (
        <ModalBackdrop>
          <AssignModal>
            <ModalHeader>
              <ModalTitle>Edit Assignment</ModalTitle>
              <ModalClose onClick={() => setShowEdit(false)}>
                <FaX />
              </ModalClose>
            </ModalHeader>

            <ModalBody>
              {/* User (read-only) */}
              <ModalFieldGroup>
                <ModalLabel>User</ModalLabel>
                <ModalInfoRow>
                  {editTarget.user.userName || editTarget.user.userLoginId}
                </ModalInfoRow>
              </ModalFieldGroup>

              {/* Exam (read-only — we're editing its assignment config) */}
              <ModalFieldGroup>
                <ModalLabel>Assessment</ModalLabel>
                <ModalInfoRow>
                  {editTarget.exam.examName ?? editTarget.exam}
                </ModalInfoRow>
              </ModalFieldGroup>

              {/* Allowed attempts */}
              <ModalFieldGroup>
                <ModalLabel>Allowed Attempts</ModalLabel>
                <ModalInput
                  type="number"
                  placeholder="e.g. 3"
                  value={editForm.allowedAttempts}
                  onChange={(e) => handleEditField("allowedAttempts", e.target.value)}
                />
              </ModalFieldGroup>

              {/* Timeout days */}
              <ModalFieldGroup>
                <ModalLabel>Timeout Days</ModalLabel>
                <ModalInput
                  type="number"
                  placeholder="e.g. 30"
                  value={editForm.timeoutDays}
                  onChange={(e) => handleEditField("timeoutDays", e.target.value)}
                />
              </ModalFieldGroup>
            </ModalBody>

            <ModalFooter>
              <ModalCancelBtn onClick={() => setShowEdit(false)}>
                <FaX /> Cancel
              </ModalCancelBtn>
              <ModalSaveBtn onClick={submitEdit}>
                <FaSave /> Update
              </ModalSaveBtn>
            </ModalFooter>
          </AssignModal>
        </ModalBackdrop>
      )}
    </ThemeProvider>
  );
};

export default UserPage;
