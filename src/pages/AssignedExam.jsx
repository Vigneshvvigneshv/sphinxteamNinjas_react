import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";

import {
  ButtonContainer,
  Button,
  CommonContainer,
  CommonHeading,
  CommonSection,
  CommonTable,
  Content,
  ExamContainer,
  ExamContent,
  TableRow,
  ExamHeader,
  AddButton,
  DeleteButton,
  ContentHeading,
  CommonHeader,
  CancelButton, StartButton
} from "../styles/common_style";
import { useSelector } from "react-redux";
import { apiGet, apiPost } from "../ApiServices/apiServices";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BackDrop from "../component/BackDrop";
import { FaSearch, FaPlay, FaWifi, FaInfoCircle, FaClock, FaLock, FaClipboardList, FaShieldAlt, FaTimes, FaExclamationTriangle, FaArrowAltCircleRight, FaRedo } from "react-icons/fa";
import { FaX } from "react-icons/fa6";


import { UserExamTable } from "../component/UserExamTable";

import { FileInput } from "../styles/form_style";
import { AttemptsBar,
         AttemptsBarFill, 
         BtnSpinner, 
         CancelBtn, 
         CloseBtn, 
         EmptyDesc, 
         EmptyIcon, 
         EmptyTitle, 
         EmptyWrap, 
         FieldInput, 
         FieldInputWrap, 
         FieldLabel, 
         FieldWrap, InstrIcon, InstrText, InstructionItem, InstructionsList, ModalBody, ModalCard, ModalFooter, ModalHeader, ModalHeaderLeft, ModalIconWrap, ModalSubtitle, ModalTitle, Overlay, PageHeader, PageLabel, PageSubtitle, PageTitle, PageWrapper, Panel, PanelBadge, PanelHeader, PanelTitle, ResultCount, SearchInput, SearchWrap, SkeletonBar, SkeletonRow, StartBtn, StatCard, StatIcon, StatInfo, StatsRow, Toolbar, WarnChip } from "../styles/AsignedExam_style";


function SkeletonRows() {
  return (
    <>
      {[75, 55, 85, 65].map((w, i) => (
        <SkeletonRow key={i}>
          <SkeletonBar $w="36px" $h="36px" style={{ borderRadius: 8 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <SkeletonBar $w={`${w}%`} $h="13px" />
            <SkeletonBar $w="38%" $h="11px" />
          </div>
          <SkeletonBar $w="90px" $h="30px" style={{ borderRadius: 8 }} />
        </SkeletonRow>
      ))}
    </>
  );
}
/* ───────── Component ───────── */
export default function AssignedExam() {
  const [examList, setExamList]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [showModal, setShowModal]     = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [examId, setExamId]           = useState("");
  const [userData, setUserData]       = useState({ password: "" });

  const partyId  = useSelector((state) => state.userReducer.partyId);
  const navigate = useNavigate();

  // ── Fetch exams ──
  const fetchPartyDetails = async () => {
    setLoading(true);
    try {
      const response = await apiGet(`/exam/getexam-by-partyId/${partyId}`);
      setExamList(response.examList || []);
    } catch (e) {
      console.error(e);
      setExamList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPartyDetails(); }, []);

  // ── Generate questions + open modal ──
  const handleStartExam = async (id) => {
    setExamId(id);
    try {
      const response = await apiPost("/generate-question/generate-questions", { examId: id });
      if (response.status=== "SUCCESS") {
        setShowModal(true);
      } else if (response.status=== "ERROR") {
        toast.error("Please try again later", { position: "top-center" });
      }
    } catch (e) {
      toast.error("Failed to prepare exam", { position: "top-center" });
    }
  };

  // ── Submit ──
  const handleSubmit = async () => {
    if (!userData.password.trim()) {
      toast.error("Please enter the security code", { position: "top-center" });
      return;
    }
    setSubmitting(true);
    try {
      const response = await apiPost("/start-exam/exam-start", {
        ...userData,
        examId,
        partyId,
      });
      setUserData({ password: "" });
      setShowModal(false);
      if (response.successMessage !== undefined) {
        toast.success(response.successMessage, { position: "top-center" });
        navigate(`/examquestionlist/${examId}/${partyId}`);
      }
      if (response.errorMessage !== undefined) {
        toast.error(response.errorMessage, { position: "top-center" });
      }
    } catch (e) {
      toast.error("Something went wrong", { position: "top-center" });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Search filter ──
  const filtered = examList.filter(
    (exam) =>
      !search ||
      exam?.examName?.toLowerCase().includes(search.toLowerCase()) ||
      exam?.examId?.toLowerCase().includes(search.toLowerCase())
  );

  const closeModal = () => {
    setShowModal(false);
    setUserData({ password: "" });
  };

  const INSTRUCTIONS = [
    { icon: <FaWifi />,   bg: "rgba(79,70,229,0.08)",   color: "#4F46E5", text: "Ensure you have a stable internet connection." },
    { icon: <FaInfoCircle />, bg: "rgba(59,130,246,0.08)", color: "#3B82F6", text: "Do not refresh or navigate away during the exam." },
    { icon: <FaClock />,  bg: "rgba(245,158,11,0.1)",   color: "#F59E0B", text: "The exam will be auto-submitted when time is up." },
    { icon: <FaLock />,   bg: "rgba(239,68,68,0.08)",   color: "#EF4444", text: "Once started, the exam cannot be paused." },
  ];

  return (
    <Layout>
      <PageWrapper>
        {/* ── Header ── */}
        <PageHeader>
          <div>
            <PageLabel><FaClipboardList size={10} /> Assigned</PageLabel>
            <PageTitle>Assigned Exams</PageTitle>
            <PageSubtitle>View and start your scheduled exams below.</PageSubtitle>
          </div>
        </PageHeader>

        {/* ── Stats ── */}
        <StatsRow>
          {[
            { icon: <FaClipboardList />, bg: "rgba(79,70,229,0.08)",  color: "#4F46E5", val: loading ? "—" : examList.length,  lbl: "Total Assigned" },
            { icon: <FaClock />,         bg: "rgba(245,158,11,0.1)",  color: "#F59E0B", val: loading ? "—" : filtered.length,  lbl: "Pending" },
            { icon: <FaShieldAlt />,     bg: "rgba(16,185,129,0.08)", color: "#10B981", val: "Live",                            lbl: "Status" },
          ].map((s, i) => (
            <StatCard key={i}>
              <StatIcon $bg={s.bg} $color={s.color}>{s.icon}</StatIcon>
              <StatInfo>
                 <div className="val">{s.val}</div>
                <div className="lbl">{s.lbl}</div> 
              </StatInfo>
            </StatCard>
          ))}

          {/* Attempts Remaining card */}
          {/* {!loading && (() => {
            const totalAllowed   = examList.reduce((sum, e) => sum + (e.numAttempts ?? e.maxAttempts ?? e.allowedAttempts ?? 1), 0);
            const totalUsed      = examList.reduce((sum, e) => sum + (e.usedAttempts ?? e.attemptsMade ?? 0), 0);
            const totalRemaining = Math.max(0, totalAllowed - totalUsed);
            const pct            = totalAllowed > 0 ? Math.round((totalRemaining / totalAllowed) * 100) : 100;
            const color          = pct > 60 ? "#10B981" : pct > 30 ? "#F59E0B" : "#EF4444";
            const bg             = pct > 60 ? "rgba(16,185,129,0.08)" : pct > 30 ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.08)";
            return (
              <StatCard key="attempts" style={{ flexDirection: "column", alignItems: "flex-start", gap: 10, minWidth: 190 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
                  <StatIcon $bg={bg} $color={color}><FaRedo /></StatIcon>
                  <StatInfo>
                    <div className="val" style={{ color }}>{totalRemaining}</div>
                    <div className="lbl">Attempts Remaining</div>
                  </StatInfo>
                </div>
                <div style={{ width: "100%", paddingLeft: 2, paddingRight: 2 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94A3B8", marginBottom: 5 }}>
                    <span>{totalUsed} used</span>
                    <span>{totalAllowed} total</span>
                  </div>
                  <AttemptsBar>
                    <AttemptsBarFill $pct={pct} />
                  </AttemptsBar>
                </div>
              </StatCard> */}
            {/* );
          })()} */}
        </StatsRow>

        {/* ── Toolbar ── */}
        <Toolbar>
          <SearchWrap>
            <FaSearch />
            <SearchInput
              placeholder="Search by exam name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchWrap>
          <ResultCount>
            {loading ? "Loading..." : `${filtered.length} exam${filtered.length !== 1 ? "s" : ""}`}
          </ResultCount>
        </Toolbar>

        {/* ── Panel ── */}
        <Panel>
          <PanelHeader>
            <PanelTitle>Exam List</PanelTitle>
            {!loading && <PanelBadge>{filtered.length} assigned</PanelBadge>}
          </PanelHeader>

          {loading ? (
            <SkeletonRows />
          ) : filtered.length === 0 ? (
            <EmptyWrap>
              <EmptyIcon><FaClipboardList /></EmptyIcon>
              <EmptyTitle>{search ? "No results found" : "No exams assigned"}</EmptyTitle>
              <EmptyDesc>
                {search
                  ? `No exams match "${search}". Try a different keyword.`
                  : "You have no assigned exams at the moment. Check back later."}
              </EmptyDesc>
            </EmptyWrap>
          ) : (
            filtered.map((exam, index) => (
              <UserExamTable
                data={exam}
                key={exam?.examId || index}
                handleStartExam={handleStartExam}
              />
            ))
          )}
        </Panel>
      </PageWrapper>

      {/* ── Start Exam Modal ── */}
      {showModal && (
        <Overlay onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <ModalCard>
            {/* Modal header */}
            <ModalHeader>
              <ModalHeaderLeft>
                <ModalIconWrap><FaShieldAlt /></ModalIconWrap>
                <div>
                  <ModalTitle>Start Exam</ModalTitle>
                  <ModalSubtitle>Read instructions before proceeding</ModalSubtitle>
                </div>
              </ModalHeaderLeft>
              <CloseBtn onClick={closeModal}><FaTimes /></CloseBtn>
            </ModalHeader>

            <ModalBody>
              {/* Instructions */}
              <InstructionsList>
                {INSTRUCTIONS.map((ins, i) => (
                  <InstructionItem key={i}>
                    <InstrIcon $bg={ins.bg} $color={ins.color}>{ins.icon}</InstrIcon>
                    <InstrText>{ins.text}</InstrText>
                  </InstructionItem>
                ))}
              </InstructionsList>

              {/* Password */}
              <FieldWrap>
                <FieldLabel>
                  <FaShieldAlt size={12} style={{ color: "#4F46E5" }} />
                  Security Code
                </FieldLabel>
                <FieldInputWrap>
                  <FaLock />
                  <FieldInput
                    type="password"
                    placeholder="Enter exam security code"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    autoFocus
                  />
                </FieldInputWrap>
              </FieldWrap>

              {/* Warning */}
              <WarnChip>
                <FaExclamationTriangle size={13} />
                Once you start, the timer begins immediately and cannot be paused.
              </WarnChip>
            </ModalBody>

            {/* Footer */}
            <ModalFooter>
              <CancelBtn onClick={closeModal}>
                <FaTimes size={12} /> Cancel
              </CancelBtn>
              <StartBtn onClick={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <><BtnSpinner /> Starting...</>
                ) : (
                  <><FaArrowAltCircleRight/> Start Exam</>
                )}
              </StartBtn>
            </ModalFooter>
          </ModalCard>
        </Overlay>
      )}
    </Layout>
  );
}