import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { useSelector } from "react-redux";
import { apiGet, apiPostBlob } from "../ApiServices/apiServices";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaClipboardList,
  FaDownload,
} from "react-icons/fa";
import { LuNotepadText } from "react-icons/lu";
import {
  CardGrid,
  EmptyDesc,
  EmptyIcon,
  EmptyTitle,
  EmptyWrap,
  PageHeader,
  PageLabel,
  PageSubtitle,
  PageTitle,
  PageWrapper,
  Panel,
  PanelBadge,
  PanelHeader,
  PanelTitle,
  SkeletonBar,
} from "../styles/AsignedExam_style";
import {
  CompletedCard,
  CardTopRow,
  CardIconBox,
  CardNameBlock,
  CardName,
  CardId,
  ActionRow,
  ResultBtn,
  CertBtn,
  CertSpinner,
} from "../styles/CompletedExam_style";
import { FBackBtn } from "../styles/formPage_style";

/* ─────────────────────────────────────────
   Skeleton Loader
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
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
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

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function CompletedExam() {
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  const partyId = useSelector((state) => state.userReducer.partyId);
  const navigate = useNavigate();

  /* ── Fetch completed exams ── */
  const fetchCompletedExams = async () => {
    setLoading(true);
    try {
      const response = await apiGet(
        `/exam/getcompletedexam-by-partyId/${partyId}`
      );
      setExamList(response.completedExamList || []);
    } catch (e) {
      console.error(e);
      setExamList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedExams();
  }, []);

  /* ── Download Certificate ── */
  const handleDownloadCertificate = async (examId) => {
    setDownloadingId(examId);
    try {
      const blob = await apiPostBlob(`/certificate/generate/`, {
        examId,
        partyId,
      });

      if (!blob || blob.size === 0) {
        toast.error("Failed to download certificate", {
          position: "top-center",
        });
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "sphinx-certificate.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Certificate download error:", e);
      toast.error("Failed to download certificate", { position: "top-center" });
    } finally {
      setDownloadingId(null);
    }
  };

  /* ═══════════════════════════════════════
     RENDER
  ═══════════════════════════════════════ */
  return (
    <Layout>
      <PageWrapper>
        {/* ── Page Header ── */}
        <PageHeader>
          <div>
            <PageLabel>
              <FaCheckCircle size={11} /> Completed
            </PageLabel>
            <PageTitle>Assessment History</PageTitle>
            <PageSubtitle>
              Review your past assessments, results, and download certificates.
            </PageSubtitle>
          </div>
        </PageHeader>

        {/* ── Panel ── */}
        <Panel>
          <PanelHeader>
            <PanelTitle>Completed Assessments</PanelTitle>
            {!loading && (
              <PanelBadge>{examList.length} completed</PanelBadge>
            )}
          </PanelHeader>

          {/* Loading */}
          {loading ? (
            <CardGrid>
              <SkeletonCards />
            </CardGrid>
          ) : examList.length === 0 ? (
            /* Empty state */
            <EmptyWrap>
              <EmptyIcon>
                <FaCheckCircle />
              </EmptyIcon>
              <EmptyTitle>No completed assessments yet</EmptyTitle>
              <EmptyDesc>
                Once you complete an assessment, your results will appear here.
              </EmptyDesc>
            </EmptyWrap>
          ) : (
            /* Card Grid */
            <CardGrid>
              {examList.map((exam, index) => {
                const isDownloading = downloadingId === exam?.examId;

                return (
                  <CompletedCard key={exam?.examId || index} $i={index}>
                    {/* Top row: icon + name + id */}
                    <CardTopRow>
                      <CardIconBox>
                        <FaClipboardList />
                      </CardIconBox>
                      <CardNameBlock>
                        <CardName>
                          {exam?.examName || "Untitled Exam"}
                        </CardName>
                        <CardId>ID: {exam?.examId || "—"}</CardId>
                      </CardNameBlock>
                    </CardTopRow>

                    {/* Action buttons */}
                    <ActionRow>
                      <ResultBtn
                        onClick={() =>
                          navigate(`/exam-result/${exam?.examId}/${partyId}`)
                        }
                      >
                        <LuNotepadText size={14} /> Result
                      </ResultBtn>

                      <CertBtn
                        onClick={() =>
                          !isDownloading &&
                          handleDownloadCertificate(exam?.examId)
                        }
                        $loading={isDownloading}
                      >
                        {isDownloading ? (
                          <>
                            <CertSpinner /> Downloading...
                          </>
                        ) : (
                          <>
                            <FaDownload size={12} /> Certificate
                          </>
                        )}
                      </CertBtn>
                    </ActionRow>
                  </CompletedCard>
                );
              })}
            </CardGrid>
          )}
        </Panel>

        <FBackBtn onClick={() => navigate(-1)}>
          <FaArrowLeft size={11} /> Back
        </FBackBtn>
      </PageWrapper>
    </Layout>
  );
}