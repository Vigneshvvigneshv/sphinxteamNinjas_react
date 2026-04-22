import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import {
  CommonContainer,
  CommonHeader,
  CommonHeading,
  CommonSection,
  CommonTable,

} from "../styles/common_style";
import { useSelector } from "react-redux";
import { apiGet } from "../ApiServices/apiServices";

import { UserExamTable } from "../component/UserExamTable";
import Empty from "../component/Empty";
import CompletedExamTable from "../component/CompletedExamTable";
import { EmptyDesc, EmptyIcon, EmptyTitle, EmptyWrap, HeaderLeft, ListWrap, PageHeader, PageLabel, PageSubtitle, PageWrapper, Panel, PanelBadge, PanelHeader, PanelTitle, ResultCount, SearchInput, SearchWrap, SkeletonBar, SkeletonRow, StatCard, StatIcon, StatInfo, StatsRow, Toolbar } from "../styles/CompletedExam_style";
import { FaCheckCircle, FaFileAlt, FaSearch, FaTrophy } from "react-icons/fa";



function SkeletonRows() {
  return (
    <>
      {[80, 60, 90, 70].map((w, i) => (
        <SkeletonRow key={i}>
          <SkeletonBar $w="36px" $h="36px" style={{ borderRadius: 8 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <SkeletonBar $w={`${w}%`} $h="13px" />
            <SkeletonBar $w="40%" $h="11px" />
          </div>
          <SkeletonBar $w="80px" $h="28px" style={{ borderRadius: 20 }} />
        </SkeletonRow>
      ))}
    </>
  );
}
export default function CompletedExam() {
const [examList, setExamList]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const partyId = useSelector((state) => state.userReducer.partyId);
 
  const fetchPartyDetails = async () => {
    setLoading(true);
    try {
      const response = await apiGet(`/exam/getcompletedexam-by-partyId/${partyId}`);
      setExamList(response.completedExamList || []);
    } catch (e) {
      console.error(e);
      setExamList([]);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => { fetchPartyDetails(); }, []);
 
  const filtered = examList.filter((exam) =>
    !search ||
    exam?.examName?.toLowerCase().includes(search.toLowerCase()) ||
    exam?.examId?.toLowerCase().includes(search.toLowerCase())
  );
 
  // ── Stats ──
  const total    = examList.length;
  const passed   = examList.filter(e => (e.percentage ?? e.score ?? 0) >= 50).length;
  const avgScore = total
    ? Math.round(examList.reduce((s, e) => s + (e.percentage ?? e.score ?? 0), 0) / total)
    : 0;
 
  return (
    <Layout>
      <PageWrapper>
        {/* Header */}
        <PageHeader>
          <HeaderLeft>
            <PageLabel><FaCheckCircle size={10} /> Completed</PageLabel>
            <PageSubtitle>Completed Exams</PageSubtitle>
            <PageSubtitle>Review your past exam history, scores, and results.</PageSubtitle>
          </HeaderLeft>
        </PageHeader>
 
        {/* Stats */}
        <StatsRow>
          {[
            {
              icon: <FaFileAlt />,
              iconBg: "rgba(79,70,229,0.08)",
              iconColor: "#4F46E5",
              val: loading ? "—" : total,
              lbl: "Total Exams",
            },
            // {
            //   icon: <FaTrophy />,
            //   iconBg: "rgba(245,158,11,0.1)",
            //   iconColor: "#F59E0B",
            //   val: loading ? "—" : passed,
            //   lbl: "Passed",
            // },
            // {
            //   icon: <FaCheckCircle />,
            //   iconBg: "rgba(16,185,129,0.08)",
            //   iconColor: "#10B981",
            //   val: loading ? "—" : `${avgScore}%`,
            //   lbl: "Avg. Score",
            // },
          ].map((s, i) => (
            <StatCard key={i}>
              <StatIcon $bg={s.iconBg} $color={s.iconColor}>{s.icon}</StatIcon>
              <StatInfo>
                <div className="val">{s.val}</div>
                <div className="lbl">{s.lbl}</div>
              </StatInfo>
            </StatCard>
          ))}
        </StatsRow>
 
        {/* Toolbar */}
        <Toolbar>
          <SearchWrap>
            <FaSearch />
            <SearchInput
              placeholder="Search by exam name or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </SearchWrap>
          <ResultCount>
            {loading ? "Loading..." : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`}
          </ResultCount>
        </Toolbar>
 
        {/* Panel */}
        <Panel>
          <PanelHeader>
            <PanelTitle>Exam History</PanelTitle>
            {!loading && <PanelBadge>{filtered.length} exams</PanelBadge>}
          </PanelHeader>
 
          <ListWrap>
            {loading ? (
              <SkeletonRows />
            ) : filtered.length === 0 ? (
              <EmptyWrap>
                <EmptyIcon><FaCheckCircle /></EmptyIcon>
                <EmptyTitle>
                  {search ? "No results found" : "No completed exams yet"}
                </EmptyTitle>
                <EmptyDesc>
                  {search
                    ? `No exams match "${search}". Try a different keyword.`
                    : "Once you complete an exam, your results will appear here."}
                </EmptyDesc>
              </EmptyWrap>
            ) : (
              filtered.map((exam, index) => (
                <CompletedExamTable
                  data={exam}
                  key={exam?.examId || index}
                  index={index}
                  total={filtered.length}
                />
              ))
            )}
          </ListWrap>
        </Panel>
      </PageWrapper>
    </Layout>
    );
};