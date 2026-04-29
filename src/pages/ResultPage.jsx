import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiPost } from '../ApiServices/apiServices';
import Layout from '../component/Layout';
import {
  FaClipboardCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaMinusCircle,
  FaPercentage,
  FaCalendarAlt,
  FaRedo,
  FaArrowLeft,
} from 'react-icons/fa';
import {
  ResultPage as ResultPageWrapper,
  ResultPageHeader,
  ResultPageTitle,
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
  ActionRow,
  ActionButton,
  StatePanel,
} from '../styles/ResultPage_style';

const ResultPage = () => {
  const { examId, partyId } = useParams();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.themeReducer.theme);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await apiPost(`/exam-result/getexam-result`, { examId, partyId });
        console.log('Result', response);
        setResult(response?.resultList || null);
      } catch (error) {
        console.error('Failed to fetch result', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [examId, partyId]);

  const isPassed = result?.passed === 1;

  return (
    <Layout>
      <ResultPageWrapper theme={theme}>

        {/* ── Page header ────────────────────────────────────────────────── */}
        <ResultPageHeader>
          <ResultPageTitle theme={theme}>
            Exam Result
            <span>Assessment Summary</span>
          </ResultPageTitle>
        </ResultPageHeader>

        {/* ── Loading state ──────────────────────────────────────────────── */}
        {loading && (
          <StatePanel theme={theme}>
            <FaClipboardCheck />
            <h3>Fetching your result…</h3>
            <p>Please wait a moment.</p>
          </StatePanel>
        )}

        {/* ── No result state ────────────────────────────────────────────── */}
        {!loading && !result && (
          <StatePanel theme={theme}>
            <FaClipboardCheck />
            <h3>No Result Found</h3>
            <p>We couldn't retrieve the details for this exam.</p>
            <ActionRow style={{ marginTop: 16, justifyContent: 'center' }}>
              <ActionButton theme={theme} onClick={() => navigate('/user-dashboard')}>
                <FaArrowLeft /> Go to Dashboard
              </ActionButton>
            </ActionRow>
          </StatePanel>
        )}

        {/* ── Result ────────────────────────────────────────────────────── */}
        {!loading && result && (
          <>
            {/* Score hero */}
            <ScorePanel theme={theme}>
              <ScoreCircle className={isPassed ? 'pass' : 'fail'} theme={theme}>
                <span className="score-val">{result.score ?? '-'}</span>
                <span className="score-lbl">Score</span>
              </ScoreCircle>

              <ScoreInfo theme={theme}>
                <div className="exam-label">Exam ID</div>
                <div className="exam-title">{result.examId}</div>
                <StatusBadge className={isPassed ? 'pass' : 'fail'} theme={theme}>
                  {isPassed ? 'Passed' : 'Failed'}
                </StatusBadge>
              </ScoreInfo>
            </ScorePanel>

            {/* Stats row */}
            <StatsRow>
              <StatCard theme={theme} $delay="0s" $accent="#10B981">
                <StatIconBox $bg="#ECFDF5" $color="#10B981">
                  <FaCheckCircle />
                </StatIconBox>
                <StatInfo theme={theme}>
                  <div className="value">{result.correctCount ?? '-'}</div>
                  <div className="label">Correct</div>
                </StatInfo>
              </StatCard>

              <StatCard theme={theme} $delay="0.06s" $accent="#EF4444">
                <StatIconBox $bg="#FEF2F2" $color="#EF4444">
                  <FaTimesCircle />
                </StatIconBox>
                <StatInfo theme={theme}>
                  <div className="value">{result.wrongCount ?? '-'}</div>
                  <div className="label">Incorrect</div>
                </StatInfo>
              </StatCard>

              <StatCard theme={theme} $delay="0.12s" $accent="#F59E0B">
                <StatIconBox $bg="#FFFBEB" $color="#F59E0B">
                  <FaMinusCircle />
                </StatIconBox>
                <StatInfo theme={theme}>
                  <div className="value">{result.skippedCount ?? '-'}</div>
                  <div className="label">Skipped</div>
                </StatInfo>
              </StatCard>

              <StatCard theme={theme} $delay="0.18s" $accent="#3B82F6">
                <StatIconBox $bg="#EFF6FF" $color="#3B82F6">
                  <FaPercentage />
                </StatIconBox>
                <StatInfo theme={theme}>
                  <div className="value">{result.percentage ?? '-'}%</div>
                  <div className="label">Percentage</div>
                </StatInfo>
              </StatCard>
            </StatsRow>

            {/* Details panel */}
            <DetailsPanel theme={theme}>
              <DetailsPanelHeader theme={theme}>
                <DetailsPanelIconBox $bg="#EFF6FF" $color="#3B82F6">
                  <FaClipboardCheck />
                </DetailsPanelIconBox>
                <DetailsPanelTitle theme={theme}>Result Details</DetailsPanelTitle>
              </DetailsPanelHeader>

              <DetailItem theme={theme}>
                <span className="key">Total Marks</span>
                <span className="val">{result.totalMarks ?? '-'}</span>
              </DetailItem>

              <DetailItem theme={theme}>
                <span className="key">Score Obtained</span>
                <span className="val">{result.score ?? '-'}</span>
              </DetailItem>

              <DetailItem theme={theme}>
                <span className="key">Attempt No</span>
                <span className="val">{result.attemptNo ?? '-'}</span>
              </DetailItem>

              <DetailItem theme={theme}>
                <span className="key">Submitted Date</span>
                <span className="val">
                  {result.submittedDate
                    ? new Date(result.submittedDate).toLocaleString()
                    : '-'}
                </span>
              </DetailItem>

              <DetailItem theme={theme}>
                <span className="key">Status</span>
                <span className="val">
                  <StatusBadge className={isPassed ? 'pass' : 'fail'} theme={theme}>
                    {isPassed ? 'Passed' : 'Failed'}
                  </StatusBadge>
                </span>
              </DetailItem>
            </DetailsPanel>

            {/* Actions */}
            <ActionRow theme={theme}>
              <ActionButton theme={theme} onClick={() => navigate('/user-dashboard')}>
                <FaArrowLeft /> Back to Dashboard
              </ActionButton>
            </ActionRow>
          </>
        )}

      </ResultPageWrapper>
    </Layout>
  );
};

export default ResultPage;
