import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { useSelector } from "react-redux";
import { apiGet, apiPost, apiPostBlob, apiPut } from "../ApiServices/apiServices";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  FaClipboardList,
  FaClock,
  FaRedo,
  FaArrowLeft,
  FaCheckCircle,
  FaDownload,
  FaTimesCircle,
  FaMinusCircle,
  FaPercentage,
  FaClipboardCheck,
  FaUserPlus,
  FaSave,
  FaPen,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { LuNotepadText } from "react-icons/lu";
import {
  AttemptsBar,
  AttemptsBarFill,
  AttemptsLabel,
  CardBadge,
  CardGrid,
  CardIconBox,
  CardId,
  CardName,
  CardNameBlock,
  CardTopRow,
  EmptyDesc,
  EmptyIcon,
  EmptyTitle,
  EmptyWrap,
  ExamCard,
  MetaChip,
  MetaRow,
  PageHeader,
  PageSubtitle,
  PageTitle,
  PageWrapper,
  Panel,
  PanelBadge,
  PanelHeader,
  PanelTitle,
  SkeletonBar,
  SkeletonRow,
} from "../styles/AsignedExam_style";
import {
  CompletedCard,
  ActionRow,
  ResultBtn,
  CertBtn,
  CertSpinner,
} from "../styles/CompletedExam_style";
import {
  ScorePanel,
  ScoreCircle,
  ScoreInfo,
  StatusBadge,
  StatsRow,
  StatCard,
  StatIconBox,
  StatInfo,
  DetailsPanel,
  DetailsPanelHeader,
  DetailsPanelIconBox,
  DetailsPanelTitle,
  DetailItem,
} from "../styles/ResultPage_style";
import { FBackBtn } from "../styles/formPage_style";
import {
  ActionIconBtn,
  TooltipChip,
  TooltipWrapper,
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

/* ─────────────────────────────────────────
   Tab config
───────────────────────────────────────── */
const TABS = [
  { key: "assigned",  label: "Assigned Assessments",  icon: <FaClipboardList /> },
  { key: "completed", label: "Completed Assessments", icon: <FaCheckCircle />   },
];

/* ─────────────────────────────────────────
   Skeleton – list rows (assigned)
───────────────────────────────────────── */
function SkeletonRows() {
  return (
    <>
      {[75, 55, 85, 65].map((w, i) => (
        <SkeletonRow key={i}>
          <SkeletonBar $w="40px" $h="40px" style={{ borderRadius: 10 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <SkeletonBar $w={`${w}%`} $h="13px" />
            <SkeletonBar $w="38%"     $h="11px" />
          </div>
          <SkeletonBar $w="96px" $h="34px" style={{ borderRadius: 10 }} />
        </SkeletonRow>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────
   Skeleton – cards (completed)
───────────────────────────────────────── */
function SkeletonCards() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            background: "#FAFBFF",
            border: "1.5px solid #E8EAF0",
            borderRadius: 16,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 15,
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <SkeletonBar $w="44px" $h="44px" style={{ borderRadius: 11 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <SkeletonBar $w="68%" $h="13px" />
              <SkeletonBar $w="36%" $h="11px" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <SkeletonBar $w="50%" $h="38px" style={{ borderRadius: 10 }} />
            <SkeletonBar $w="50%" $h="38px" style={{ borderRadius: 10 }} />
          </div>
        </div>
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   ASSIGNED TAB
   – FaUserPlus in panel header  →  Assign modal
   – FaPen on each exam card     →  Edit modal
═══════════════════════════════════════════════════════════ */
function AssignedTab({ partyId, adminPartyId }) {
  const [examList,  setExamList]  = useState([]);
  const [allExams,  setAllExams]  = useState([]);   // full catalogue for assign dropdown
  const [loading,   setLoading]   = useState(true);
  // const{partyId} =useSelector((state)=>state.userReducer);
  // ── Assign modal ──────────────────────────────────────────────────────────
  const [showAssign, setShowAssign] = useState(false);
  const [assignForm, setAssignForm] = useState({ examId: "", allowedAttempts: "3", timeoutDays: "5" });
  const [assigning,  setAssigning]  = useState(false);

  // ── Edit modal ────────────────────────────────────────────────────────────
  const [showEdit,  setShowEdit]  = useState(false);
  const [editExam,  setEditExam]  = useState(null);
  const [editForm,  setEditForm]  = useState({ allowedAttempts: "", timeoutDays: "" });
  const [saving,    setSaving]    = useState(false);

  /* ── fetch assigned exams + full catalogue ── */
  const fetchData = async () => {
    setLoading(true);
    try {
      const [assignedRes, allRes] = await Promise.all([
        apiGet(`/exam/getallexam-by-partyId/${partyId}`),
        apiPost("/exam/getall-exam", { partyId: adminPartyId }),
      ]);
      setExamList(assignedRes.examList || []);
      setAllExams(allRes.examList      || []);
    } catch (e) {
      console.error(e);
      setExamList([]);
      setAllExams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [partyId]);

  /* exams not yet assigned to this user */
  const unassignedExams = () => {
    const assignedIds = new Set(examList.map((e) => e.examId));
    return allExams.filter((e) => !assignedIds.has(e.examId));
  };

  /* ── open modals ── */
  const openAssignModal = () => {
    setAssignForm({ examId: "", allowedAttempts: "3", timeoutDays: "5" });
    setShowAssign(true);
  };

  const openEditModal = (exam) => {
    setEditExam(exam);
    setEditForm({
      allowedAttempts: exam.allowedAttempts ?? "3",
      timeoutDays:     exam.timeoutDays     ?? "5",
    });
    setShowEdit(true);
  };

  /* ── Assign submit (same API as UserList) ── */
  const submitAssign = async () => {
    if (!assignForm.examId) {
      toast.error("Please select an assessment.", { position: "top-center" });
      return;
    }
    setAssigning(true);
    try {
      const res = await apiPost("/exam-assign/assign-exam", {
        examId: assignForm.examId,
        assignedUserList: [{
          partyId,
          allowedAttempts: assignForm.allowedAttempts,
          timeoutDays:     assignForm.timeoutDays,
        }],
      });
      if (res.errorMessage) {
        toast.error(res.errorMessage, { position: "top-center" });
      } else if (res.successMessage) {
        toast.success(res.successMessage, { position: "top-center" });
        // fire-and-forget email notification
        apiPost("/email/send-exam-email", {
          examId:      assignForm.examId,
          partyIdList: [partyId],
        });
        setShowAssign(false);
        await fetchData();
      }
    } catch {
      toast.error("Something went wrong", { position: "top-center" });
    } finally {
      setAssigning(false);
    }
  };

  /* ── Edit submit (same API as UserList) ── */
  const submitEdit = async () => {
    setSaving(true);
    try {
       const res = await apiPut("/exam-assign/update-assigned-exam", {
        examId: editExam.examId,
        partyId,
        allowedAttempts: editForm.allowedAttempts,
        timeoutDays:     editForm.timeoutDays,
        
      });
      if (res.errorMessage) {
        toast.error(res.errorMessage, { position: "top-center" });
      } else if (res.successMessage) {
        toast.success("Assignment updated successfully", { position: "top-center" });
        setShowEdit(false);
        await fetchData();
      }
    } catch {
      toast.error("Something went wrong", { position: "top-center" });
    } finally {
      setSaving(false);
    }
  };

  /* ─────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Panel ── */}
      <Panel>
        <PanelHeader>
          <PanelTitle>Assigned Assessments</PanelTitle>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {!loading && <PanelBadge>{examList.length} assigned</PanelBadge>}

            {/* ── FaUserPlus: open Assign modal ── */}
            <TooltipWrapper>
              <TooltipChip>Assign assessment</TooltipChip>
              <ActionIconBtn className="assign" onClick={openAssignModal}>
                <FaUserPlus />
              </ActionIconBtn>
            </TooltipWrapper>
          </div>
        </PanelHeader>

        {loading ? (
          <SkeletonRows />
        ) : examList.length === 0 ? (
          <EmptyWrap>
            <EmptyIcon><FaClipboardList /></EmptyIcon>
            <EmptyTitle>No assessments assigned</EmptyTitle>
            <EmptyDesc>
              This user has no assigned assessments yet. Click add to assign one.
            </EmptyDesc>
          </EmptyWrap>
        ) : (
          <CardGrid>
            {examList.map((exam, index) => {
              const attemptsUsed    = exam?.noOfAttempts    ?? 0;
              const totalAttempts   = exam?.allowedAttempts ?? 1;
              const attemptsLeft    = totalAttempts - attemptsUsed;
              const noAttemptsLeft  = attemptsLeft <= 0;
              const attemptsPercent = Math.min((attemptsUsed / totalAttempts) * 100, 100);
              const barColor = noAttemptsLeft
                ? "#EF4444"
                : attemptsPercent > 60 ? "#F59E0B" : "#4F46E5";

              return (
                <ExamCard key={exam?.examId || index} $i={index}>
                  {/* Top row: icon + name + badge + FaPen edit icon */}
                  <CardTopRow>
                    <CardIconBox><FaClipboardList /></CardIconBox>
                    <CardNameBlock>
                      <CardName>{exam?.examName || "Untitled Exam"}</CardName>
                      <CardId>ID: {exam?.examId || "—"}</CardId>
                    </CardNameBlock>
                    {/* <CardBadge $available={!noAttemptsLeft}>
                      {noAttemptsLeft ? "Exhausted" : "Available"}
                    </CardBadge> */}

                    {/* ── FaPen: open Edit modal for this exam ── */}
                    <TooltipWrapper>
                      <TooltipChip>Edit assignment</TooltipChip>
                      <ActionIconBtn
                        className="edit"
                        onClick={() => openEditModal(exam)}
                        style={{ width: 30, height: 30, fontSize: 12 }}
                      >
                        <FaPen />
                      </ActionIconBtn>
                    </TooltipWrapper>
                  </CardTopRow>

                  {/* Meta chips */}
                  <MetaRow>
                    <MetaChip $color="#F59E0B">
                      <FaClock size={11} /> {exam?.duration ?? "—"} mins
                    </MetaChip>
                    <MetaChip $color="#4F46E5">
                      <FaClipboardList size={11} /> {exam?.noOfQuestions ?? "—"} Qs
                    </MetaChip>
                    <MetaChip $color={noAttemptsLeft ? "#EF4444" : "#10B981"}>
                      <FaRedo size={11} />
                      {attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""} left
                    </MetaChip>
                  </MetaRow>

                  {/* Attempts progress bar */}
                  <div>
                    <AttemptsLabel>
                      <span>Attempts used</span>
                      <span>{attemptsUsed} / {totalAttempts}</span>
                    </AttemptsLabel>
                    <AttemptsBar>
                      <AttemptsBarFill $percent={attemptsPercent} $color={barColor} />
                    </AttemptsBar>
                  </div>
                </ExamCard>
              );
            })}
          </CardGrid>
        )}
      </Panel>

      {/* ══════════════════════════════════════════════════════
          ASSIGN MODAL
      ══════════════════════════════════════════════════════ */}
      {showAssign && (
        <ModalBackdrop>
          <AssignModal>
            <ModalHeader>
              <ModalTitle>Assign Assessment</ModalTitle>
              <ModalClose onClick={() => setShowAssign(false)}><FaX /></ModalClose>
            </ModalHeader>

            <ModalBody>
              {/* Assessment select – only shows exams not yet assigned */}
              <ModalFieldGroup>
                <ModalLabel>Assessment</ModalLabel>
                <ModalSelect
                  value={assignForm.examId}
                  onChange={(e) => setAssignForm((p) => ({ ...p, examId: e.target.value }))}
                >
                  <option value="">Select an assessment…</option>
                  {unassignedExams().map((exam) => (
                    <option key={exam.examId} value={exam.examId}>
                      {exam.examName}
                    </option>
                  ))}
                </ModalSelect>
                {unassignedExams().length === 0 && (
                  <span style={{ fontSize: 12, color: "#6b7280", marginTop: 6, display: "block" }}>
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
                  onChange={(e) => setAssignForm((p) => ({ ...p, allowedAttempts: e.target.value }))}
                />
              </ModalFieldGroup>

              {/* Timeout days */}
              <ModalFieldGroup>
                <ModalLabel>Timeout Days</ModalLabel>
                <ModalInput
                  type="number"
                  placeholder="e.g. 5"
                  value={assignForm.timeoutDays}
                  onChange={(e) => setAssignForm((p) => ({ ...p, timeoutDays: e.target.value }))}
                />
              </ModalFieldGroup>
            </ModalBody>

            <ModalFooter>
              <ModalCancelBtn onClick={() => setShowAssign(false)}>
                <FaX /> Cancel
              </ModalCancelBtn>
              <ModalSaveBtn
                onClick={submitAssign}
                disabled={assigning || unassignedExams().length === 0}
                style={unassignedExams().length === 0 ? { opacity: 0.5, cursor: "not-allowed" } : {}}
              >
                <FaUserPlus /> {assigning ? "Assigning…" : "Assign"}
              </ModalSaveBtn>
            </ModalFooter>
          </AssignModal>
        </ModalBackdrop>
      )}

      {/* ══════════════════════════════════════════════════════
          EDIT MODAL
      ══════════════════════════════════════════════════════ */}
      {showEdit && editExam && (
        <ModalBackdrop>
          <AssignModal>
            <ModalHeader>
              <ModalTitle>Edit Assignment</ModalTitle>
              <ModalClose onClick={() => setShowEdit(false)}><FaX /></ModalClose>
            </ModalHeader>

            <ModalBody>
              {/* Exam name – read-only, same pattern as UserList */}
              <ModalFieldGroup>
                <ModalLabel>Assessment</ModalLabel>
                <ModalInfoRow>{editExam.examName ?? editExam.examId}</ModalInfoRow>
              </ModalFieldGroup>

              {/* Allowed attempts */}
              <ModalFieldGroup>
                <ModalLabel>Allowed Attempts</ModalLabel>
                <ModalInput
                  type="number"
                  placeholder="e.g. 3"
                  value={editForm.allowedAttempts}
                  onChange={(e) => setEditForm((p) => ({ ...p, allowedAttempts: e.target.value }))}
                />
              </ModalFieldGroup>

              {/* Timeout days */}
              <ModalFieldGroup>
                <ModalLabel>Timeout Days</ModalLabel>
                <ModalInput
                  type="number"
                  placeholder="e.g. 5"
                  value={editForm.timeoutDays}
                  onChange={(e) => setEditForm((p) => ({ ...p, timeoutDays: e.target.value }))}
                />
              </ModalFieldGroup>
            </ModalBody>

            <ModalFooter>
              <ModalCancelBtn onClick={() => setShowEdit(false)}>
                <FaX /> Cancel
              </ModalCancelBtn>
              <ModalSaveBtn onClick={submitEdit} disabled={saving}>
                <FaSave /> {saving ? "Saving…" : "Update"}
              </ModalSaveBtn>
            </ModalFooter>
          </AssignModal>
        </ModalBackdrop>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPLETED TAB
═══════════════════════════════════════════════════════════ */
function CompletedTab({ partyId, onViewResult }) {
  const [examList,      setExamList]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await apiGet(`/exam/getcompletedexam-by-partyId/${partyId}`);
        setExamList(res.completedExamList || []);
      } catch (e) {
        console.error(e);
        setExamList([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [partyId]);

  const handleDownload = async (examId) => {
    setDownloadingId(examId);
    try {
      const blob = await apiPostBlob(`/certificate/generate/`, { examId, partyId });
      if (!blob || blob.size === 0) {
        toast.error("Failed to download certificate", { position: "top-center" });
        return;
      }
      const url  = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href     = url;
      link.download = "sphinx-certificate.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      toast.error("Failed to download certificate", { position: "top-center" });
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Completed Assessments</PanelTitle>
        {!loading && <PanelBadge>{examList.length} completed</PanelBadge>}
      </PanelHeader>

      {loading ? (
        <CardGrid><SkeletonCards /></CardGrid>
      ) : examList.length === 0 ? (
        <EmptyWrap>
          <EmptyIcon><FaCheckCircle /></EmptyIcon>
          <EmptyTitle>No completed assessments yet</EmptyTitle>
          <EmptyDesc>This user hasn't completed any assessments.</EmptyDesc>
        </EmptyWrap>
      ) : (
        <CardGrid>
          {examList.map((exam, index) => {
            const isDownloading = downloadingId === exam?.examId;
            return (
              <CompletedCard key={exam?.examId || index} $i={index}>
                <CardTopRow>
                  <CardIconBox><FaClipboardList /></CardIconBox>
                  <CardNameBlock>
                    <CardName>{exam?.examName || "Untitled Exam"}</CardName>
                    <CardId>ID: {exam?.examId || "—"}</CardId>
                  </CardNameBlock>
                </CardTopRow>

                <ActionRow>
                  <ResultBtn onClick={() => onViewResult(exam?.examId, exam?.examName)}>
                    <LuNotepadText size={14} /> Result
                  </ResultBtn>
                  {/* <CertBtn
                    onClick={() => !isDownloading && handleDownload(exam?.examId)}
                    $loading={isDownloading}
                  >
                    {isDownloading ? (
                      <><CertSpinner /> Downloading…</>
                    ) : (
                      <><FaDownload size={12} /> Certificate</>
                    )}
                  </CertBtn> */}
                </ActionRow>
              </CompletedCard>
            );
          })}
        </CardGrid>
      )}
    </Panel>
  );
}

/* ═══════════════════════════════════════════════════════════
   RESULT PANEL  –  inline, no edit / no retry
═══════════════════════════════════════════════════════════ */
function ResultPanel({ examId, examName, partyId, onBack }) {
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await apiPost(`/exam-result/getexam-result`, { examId, partyId });
        setResult(res?.resultList || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [examId, partyId]);

  const isPassed = result?.passed === 1;

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Result — {examName || examId}</PanelTitle>
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "none", border: "1.5px solid #E8EAF0",
            borderRadius: 8, padding: "6px 14px",
            cursor: "pointer", fontSize: 13,
            color: "#4F46E5", fontWeight: 500,
          }}
        >
          <FaArrowLeft size={11} /> Back to Completed
        </button>
      </PanelHeader>

      {loading && (
        <EmptyWrap>
          <EmptyIcon><FaClipboardCheck /></EmptyIcon>
          <EmptyTitle>Fetching result…</EmptyTitle>
          <EmptyDesc>Please wait a moment.</EmptyDesc>
        </EmptyWrap>
      )}

      {!loading && !result && (
        <EmptyWrap>
          <EmptyIcon><FaClipboardCheck /></EmptyIcon>
          <EmptyTitle>No Result Found</EmptyTitle>
          <EmptyDesc>We couldn't retrieve the details for this exam.</EmptyDesc>
        </EmptyWrap>
      )}

      {!loading && result && (
        <>
          <ScorePanel>
            <ScoreCircle className={isPassed ? "pass" : "fail"}>
              <span className="score-val">{result.score ?? "—"}</span>
              <span className="score-lbl">Score</span>
            </ScoreCircle>
            <ScoreInfo>
              <div className="exam-label">Exam ID</div>
              <div className="exam-title">{result.examId}</div>
              <StatusBadge className={isPassed ? "pass" : "fail"}>
                {isPassed ? "Passed" : "Failed"}
              </StatusBadge>
            </ScoreInfo>
          </ScorePanel>

          <StatsRow>
            <StatCard $delay="0s" $accent="#10B981">
              <StatIconBox $bg="#ECFDF5" $color="#10B981"><FaCheckCircle /></StatIconBox>
              <StatInfo>
                <div className="value">{result.correctCount ?? "—"}</div>
                <div className="label">Correct</div>
              </StatInfo>
            </StatCard>
            <StatCard $delay="0.06s" $accent="#EF4444">
              <StatIconBox $bg="#FEF2F2" $color="#EF4444"><FaTimesCircle /></StatIconBox>
              <StatInfo>
                <div className="value">{result.wrongCount ?? "—"}</div>
                <div className="label">Incorrect</div>
              </StatInfo>
            </StatCard>
            <StatCard $delay="0.12s" $accent="#F59E0B">
              <StatIconBox $bg="#FFFBEB" $color="#F59E0B"><FaMinusCircle /></StatIconBox>
              <StatInfo>
                <div className="value">{result.skippedCount ?? "—"}</div>
                <div className="label">Skipped</div>
              </StatInfo>
            </StatCard>
            <StatCard $delay="0.18s" $accent="#3B82F6">
              <StatIconBox $bg="#EFF6FF" $color="#3B82F6"><FaPercentage /></StatIconBox>
              <StatInfo>
                <div className="value">{result.percentage ?? "—"}%</div>
                <div className="label">Percentage</div>
              </StatInfo>
            </StatCard>
          </StatsRow>

          <DetailsPanel>
            <DetailsPanelHeader>
              <DetailsPanelIconBox $bg="#EFF6FF" $color="#3B82F6">
                <FaClipboardCheck />
              </DetailsPanelIconBox>
              <DetailsPanelTitle>Result Details</DetailsPanelTitle>
            </DetailsPanelHeader>
            <DetailItem>
              <span className="key">Total Marks</span>
              <span className="val">{result.totalMarks ?? "—"}</span>
            </DetailItem>
            <DetailItem>
              <span className="key">Score Obtained</span>
              <span className="val">{result.score ?? "—"}</span>
            </DetailItem>
            <DetailItem>
              <span className="key">Attempt No</span>
              <span className="val">{result.attemptNo ?? "—"}</span>
            </DetailItem>
            <DetailItem>
              <span className="key">Submitted Date</span>
              <span className="val">
                {result.submittedDate
                  ? new Date(result.submittedDate).toLocaleString()
                  : "—"}
              </span>
            </DetailItem>
            <DetailItem>
              <span className="key">Status</span>
              <span className="val">
                <StatusBadge className={isPassed ? "pass" : "fail"}>
                  {isPassed ? "Passed" : "Failed"}
                </StatusBadge>
              </span>
            </DetailItem>
          </DetailsPanel>
        </>
      )}
    </Panel>
  );
}

/* ─────────────────────────────────────────
   Tab bar
───────────────────────────────────────── */
function TabBar({ active, onChange }) {
  return (
    <div
      style={{
        display: "flex", gap: 4,
        background: "#F3F4F6", borderRadius: 12,
        padding: 4, marginBottom: 20, width: "fit-content",
      }}
    >
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "8px 18px", borderRadius: 9, border: "none",
            cursor: "pointer", fontSize: 13, fontWeight: 500,
            transition: "all 0.18s ease",
            background: active === tab.key ? "#fff"       : "transparent",
            color:      active === tab.key ? "#4F46E5"    : "#6B7280",
            boxShadow:  active === tab.key ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
          }}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN – Admin Userpage
═══════════════════════════════════════════════════════════ */
export default function Userpage() {
  const { id: partyId } = useParams();
  const navigate         = useNavigate();

  // Admin's own partyId – needed to load the full exam catalogue for the assign dropdown
  const adminPartyId = useSelector((state) => state.userReducer.partyId);

  const [activeTab,     setActiveTab]     = useState("assigned");
  const [viewingResult, setViewingResult] = useState(null); // { examId, examName }

  const handleTabChange = (key) => {
    setActiveTab(key);
    setViewingResult(null);
  };

  return (
    <Layout>
      <PageWrapper>
        {/* ── Page Header ── */}
        <PageHeader>
          <div>
            <PageTitle>User Assessment Report</PageTitle>
            <PageSubtitle>
              Manage and review assessments for this user.
            </PageSubtitle>
          </div>
        </PageHeader>

        {/* ── Tab Bar ── */}
        <TabBar active={activeTab} onChange={handleTabChange} />

        {/* ── Assigned Tab ── */}
        {activeTab === "assigned" && (
          <AssignedTab partyId={partyId} adminPartyId={adminPartyId} />
        )}

        {/* ── Completed Tab ── */}
        {activeTab === "completed" && !viewingResult && (
          <CompletedTab
            partyId={partyId}
            onViewResult={(examId, examName) => setViewingResult({ examId, examName })}
          />
        )}

        {/* ── Result Panel (inside Completed tab) ── */}
        {activeTab === "completed" && viewingResult && (
          <ResultPanel
            examId={viewingResult.examId}
            examName={viewingResult.examName}
            partyId={partyId}
            onBack={() => setViewingResult(null)}
          />
        )}

        <FBackBtn onClick={() => navigate(-1)}>
          <FaArrowLeft size={11} /> Back
        </FBackBtn>
      </PageWrapper>
    </Layout>
  );
}