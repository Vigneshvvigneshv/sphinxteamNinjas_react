import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { useSelector } from "react-redux";
import { apiGet, apiPost } from "../ApiServices/apiServices";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  FaSearch, FaPlay, FaWifi, FaInfoCircle, FaClock,
  FaLock, FaClipboardList, FaShieldAlt, FaTimes,
  FaExclamationTriangle, FaArrowAltCircleRight, FaRedo,
} from "react-icons/fa";
import { AttemptsBar, AttemptsBarFill, AttemptsLabel, BtnSpinner, CancelBtn, CardBadge, CardGrid, CardIconBox, CardId, CardName, CardNameBlock, CardTopRow, CloseBtn, EmptyDesc, EmptyIcon, EmptyTitle, EmptyWrap, ExamCard, FieldInput, FieldInputWrap, FieldLabel, FieldWrap, InstrIcon, InstrText, InstructionItem, InstructionsList, MetaChip, MetaRow, ModalBody, ModalCard, ModalFooter, ModalHeader, ModalHeaderLeft, ModalIconWrap, ModalStartBtn, ModalSubtitle, ModalTitle, Overlay, PageHeader, PageLabel, PageSubtitle, PageTitle, PageWrapper, Panel, PanelBadge, PanelHeader, PanelTitle, ResultCount, SearchInput, SearchWrap, SkeletonBar, SkeletonRow, StartBtn, StatCard, StatIcon, StatInfo, StatsRow, Toolbar, WarnChip } from "../styles/AsignedExam_style";




/* ─────────────────────────────────────────
   Skeleton Loader
───────────────────────────────────────── */
function SkeletonRows() {
  return (
    <>
      {[75, 55, 85, 65].map((w, i) => (
        <SkeletonRow key={i}>
          <SkeletonBar $w="40px" $h="40px" style={{ borderRadius: 10 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <SkeletonBar $w={`${w}%`} $h="13px" />
            <SkeletonBar $w="38%" $h="11px" />
          </div>
          <SkeletonBar $w="96px" $h="34px" style={{ borderRadius: 10 }} />
        </SkeletonRow>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────
   Modal Instructions config
───────────────────────────────────────── */
const INSTRUCTIONS = [
  {
    icon: <FaWifi />,
    bg: "rgba(79,70,229,0.08)",
    color: "#4F46E5",
    text: "Ensure you have a stable internet connection.",
  },
  {
    icon: <FaInfoCircle />,
    bg: "rgba(59,130,246,0.08)",
    color: "#3B82F6",
    text: "Do not refresh or navigate away during the exam.",
  },
  {
    icon: <FaClock />,
    bg: "rgba(245,158,11,0.10)",
    color: "#F59E0B",
    text: "The exam will be auto-submitted when time is up.",
  },
  {
    icon: <FaLock />,
    bg: "rgba(239,68,68,0.08)",
    color: "#EF4444",
    text: "Once started, the exam cannot be paused.",
  },
];

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function AssignedExam() {
  const [examList, setExamList]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [showModal, setShowModal]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [examId, setExamId]         = useState("");
  const [startingId, setStartingId] = useState(null);
  const [userData, setUserData]     = useState({ password: "" });

  const partyId  = useSelector((state) => state.userReducer.partyId);
  const navigate = useNavigate();

  /* ── Fetch exams ── */
  const fetchExams = async () => {
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

  useEffect(() => { fetchExams(); }, []);

  /* ── Generate questions + open modal ── */
  const handleStartExam = async (id) => {
    setStartingId(id);
    setExamId(id);
    try {
      const response = await apiPost("/generate-question/generate-questions", { examId: id });
      if (response.status === "SUCCESS") {
        setShowModal(true);
      } else {
        toast.error("Please try again later", { position: "top-center" });
      }
    } catch {
      toast.error("Failed to prepare exam", { position: "top-center" });
    } finally {
      setStartingId(null);
    }
  };

  /* ── Submit security code ── */
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
      if (response.successMessage) {
        toast.success(response.successMessage, { position: "top-center" });
        navigate(`/examquestionlist/${examId}/${partyId}`);
      }
      if (response.errorMessage) {
        toast.error(response.errorMessage, { position: "top-center" });
      }
    } catch {
      toast.error("Something went wrong", { position: "top-center" });
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Close modal ── */
  const closeModal = () => {
    setShowModal(false);
    setUserData({ password: "" });
  };

  /* ── Search filter ── */
  const filtered = examList.filter(
    (exam) =>
      !search ||
      exam?.examName?.toLowerCase().includes(search.toLowerCase()) ||
      exam?.examId?.toLowerCase().includes(search.toLowerCase())
  );

  /* ═══════════════════════════════════════
     RENDER
  ═══════════════════════════════════════ */
  return (
    <Layout>
      <PageWrapper>

        {/* ── Page Header ── */}
        <PageHeader>
          <div>
            <PageLabel><FaClipboardList size={10} /> Assigned</PageLabel>
            <PageTitle>Assigned Assessment</PageTitle>
            <PageSubtitle>View and start your scheduled exams below.</PageSubtitle>
          </div>
        </PageHeader>

        {/* ── Stats ── */}
        <StatsRow>
          {[
            {
              icon: <FaClipboardList />,
              bg: "rgba(79,70,229,0.08)",
              color: "#4F46E5",
              val: loading ? "—" : examList.length,
              lbl: "Total Assigned",
            },
            {
              icon: <FaShieldAlt />,
              bg: "rgba(16,185,129,0.08)",
              color: "#10B981",
              val: "Live",
              lbl: "Status",
            },
          ].map((s, i) => (
            <StatCard key={i}>
              <StatIcon $bg={s.bg} $color={s.color}>{s.icon}</StatIcon>
              <StatInfo>
                <div className="val">{s.val}</div>
                <div className="lbl">{s.lbl}</div>
              </StatInfo>
            </StatCard>
          ))}
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
            {loading
              ? "Loading..."
              : `${filtered.length} exam${filtered.length !== 1 ? "s" : ""}`}
          </ResultCount>
        </Toolbar>

        {/* ── Panel ── */}
        <Panel>
          <PanelHeader>
            <PanelTitle>Assessment List</PanelTitle>
            {!loading && <PanelBadge>{filtered.length} assigned</PanelBadge>}
          </PanelHeader>

          {/* Loading */}
          {loading ? (
            <SkeletonRows />
          ) : filtered.length === 0 ? (
            /* Empty */
            <EmptyWrap>
              <EmptyIcon><FaClipboardList /></EmptyIcon>
              <EmptyTitle>
                {search ? "No results found" : "No exams assigned"}
              </EmptyTitle>
              <EmptyDesc>
                {search
                  ? `No exams match "${search}". Try a different keyword.`
                  : "You have no assigned exams at the moment. Check back later."}
              </EmptyDesc>
            </EmptyWrap>
          ) : (
            /* Card Grid */
            <CardGrid>
              {filtered.map((exam, index) => {
                const attemptsUsed    = exam?.attemptUsed    ?? 0;
                const totalAttempts   = exam?.totalAttempts  ?? 1;
                const attemptsLeft    = totalAttempts - attemptsUsed;
                const noAttemptsLeft  = attemptsLeft <= 0;
                const attemptsPercent = Math.min((attemptsUsed / totalAttempts) * 100, 100);
                const isStarting      = startingId === exam?.examId;

                const barColor = noAttemptsLeft
                  ? "#EF4444"
                  : attemptsPercent > 60
                  ? "#F59E0B"
                  : "#4F46E5";

                return (
                  <ExamCard key={exam?.examId || index} $i={index}>

                    {/* Top row: icon + name + badge */}
                    <CardTopRow>
                      <CardIconBox>
                        <FaClipboardList />
                      </CardIconBox>
                      <CardNameBlock>
                        <CardName>{exam?.examName || "Untitled Exam"}</CardName>
                        <CardId>ID: {exam?.examId || "—"}</CardId>
                      </CardNameBlock>
                      <CardBadge $available={!noAttemptsLeft}>
                        {noAttemptsLeft ? "Exhausted" : "Available"}
                      </CardBadge>
                    </CardTopRow>

                    {/* Meta chips */}
                    <MetaRow>
                      <MetaChip $color="#F59E0B">
                        <FaClock size={11} />
                        {exam?.duration ?? "—"} mins
                      </MetaChip>
                      <MetaChip $color="#4F46E5">
                        <FaClipboardList size={11} />
                        {exam?.totalQuestions ?? "—"} Qs
                      </MetaChip>
                      <MetaChip $color={noAttemptsLeft ? "#EF4444" : "#10B981"}>
                        <FaRedo size={11} />
                        {attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""} left
                      </MetaChip>
                    </MetaRow>

                    {/* Attempts progress */}
                    <div>
                      <AttemptsLabel>
                        <span>Attempts used</span>
                        <span>{attemptsUsed} / {totalAttempts}</span>
                      </AttemptsLabel>
                      <AttemptsBar>
                        <AttemptsBarFill $percent={attemptsPercent} $color={barColor} />
                      </AttemptsBar>
                    </div>

                    {/* Start button */}
                    <StartBtn
                      onClick={() => handleStartExam(exam?.examId)}
                      disabled={isStarting || noAttemptsLeft}
                    >
                      {isStarting ? (
                        <><BtnSpinner /> Preparing...</>
                      ) : noAttemptsLeft ? (
                        <><FaTimes size={12} /> No Attempts Left</>
                      ) : (
                        <><FaPlay size={12} /> Start Exam</>
                      )}
                    </StartBtn>

                  </ExamCard>
                );
              })}
            </CardGrid>
          )}
        </Panel>

      </PageWrapper>

      {/* ═══════════════════════════════════════
          Start Exam Modal
      ═══════════════════════════════════════ */}
      {showModal && (
        <Overlay onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <ModalCard>

            {/* Header */}
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

            {/* Body */}
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

              {/* Security code */}
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
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
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
              <ModalStartBtn onClick={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <><BtnSpinner /> Starting...</>
                ) : (
                  <><FaArrowAltCircleRight /> Start Exam</>
                )}
              </ModalStartBtn>
            </ModalFooter>

          </ModalCard>
        </Overlay>
      )}
    </Layout>
  );
}