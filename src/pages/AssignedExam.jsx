import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { useSelector } from "react-redux";
import { apiGet, apiPost } from "../ApiServices/apiServices";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BackDrop from "../component/BackDrop";
import { FaSearch, FaPlay } from "react-icons/fa";
import { FaX } from "react-icons/fa6";



import { StartButton, CancelButton } from "../styles/header_style";
import { FileInput } from "../styles/form_style";
import { EmptyDesc, EmptyTitle, EmptyWrap, HeaderLeft, ListWrap, PageHeader, PageLabel, PageSubtitle, PageWrapper, Panel, PanelBadge, PanelHeader, PanelTitle, ResultCount, RowCard, RowLeft, RowSub, RowTitle, SearchInput, SearchWrap, StatCard, StatIcon, StatInfo, StatsRow, Toolbar } from "../styles/AsignedExam_style";


/* ───────── Component ───────── */
export default function AssignedExam() {
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [examId, setExamId] = useState("");
  const [userData, setUserData] = useState({ password: "" });

  const partyId = useSelector((state) => state.userReducer.partyId);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const res = await apiGet(`/exam/getexam-by-partyId/${partyId}`);
      setExamList(res.examList || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = examList.filter(e =>
    !search ||
    e.examName?.toLowerCase().includes(search.toLowerCase()) ||
    e.examId?.toLowerCase().includes(search.toLowerCase())
  );

  const handleStartExam = async (id) => {
    await apiPost('/generate-question/generate-questions', { examId: id });
    setExamId(id);
    setShowBackDrop(true);
  };

  const handleSubmit = async () => {
    const res = await apiPost(`/start-exam/exam-start`, {
      ...userData,
      examId,
      partyId
    });

    setShowBackDrop(false);

    if (res.successMessage) {
      toast.success(res.successMessage);
      navigate(`/examquestionlist/${examId}/${partyId}`);
    } else {
      toast.error(res.errorMessage);
    }
  };

  return (
    <Layout>
      <PageWrapper>

        {/* Header */}
        <PageHeader>
          <HeaderLeft>
            <PageLabel>Assigned</PageLabel>
            <PageSubtitle>Available Exams</PageSubtitle>
          </HeaderLeft>
        </PageHeader>

        {/* Stats */}
        <StatsRow>
          <StatCard>
            <StatIcon>📘</StatIcon>
            <StatInfo>
              <div className="val">{loading ? "—" : examList.length}</div>
              <div className="lbl">Total Exams</div>
            </StatInfo>
          </StatCard>
        </StatsRow>

        {/* Search */}
        <Toolbar>
          <SearchWrap>
            <FaSearch />
            <SearchInput
              placeholder="Search exam..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </SearchWrap>

          <ResultCount>
            {filtered.length} results
          </ResultCount>
        </Toolbar>

        {/* List */}
        <Panel>
          <PanelHeader>
            <PanelTitle>Assigned Exams</PanelTitle>
            <PanelBadge>{filtered.length}</PanelBadge>
          </PanelHeader>

          <ListWrap>
            {filtered.length === 0 ? (
              <EmptyWrap>
                <EmptyTitle>No Exams</EmptyTitle>
                <EmptyDesc>No assigned exams available</EmptyDesc>
              </EmptyWrap>
            ) : (
              filtered.map((exam, i) => (
                <RowCard key={i}>
                  <RowLeft>
                    <RowTitle>{exam.examName}</RowTitle>
                    <RowSub>{exam.examId}</RowSub>
                  </RowLeft>

                  <StartButton onClick={() => handleStartExam(exam.examId)}>
                    Start <FaPlay />
                  </StartButton>
                </RowCard>
              ))
            )}
          </ListWrap>
        </Panel>

        {/* Modal */}
        {showBackDrop && (
          <Backdrop>
            <h3>Enter Password</h3>
            <FileInput
              value={userData.password}
              onChange={(e) => setUserData({ password: e.target.value })}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <StartButton onClick={handleSubmit}>Start</StartButton>
              <CancelButton onClick={() => setShowBackDrop(false)}>
                <FaX />
              </CancelButton>
            </div>
          </Backdrop>
        )}

      </PageWrapper>
    </Layout>
  );
}