import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { useParams, useNavigate } from 'react-router-dom'
import { CommonContainer, CommonHeader, CommonHeading, CommonSection } from '../styles/common_style';
import { apiPost } from '../ApiServices/apiServices';
import { 
  ResultContainer, 
  Header, 
  ScoreCircle, 
  StatsGrid, 
  StatCard, 
  DetailsList, 
  DetailItem, 
  ActionContainer, 
  ActionButton 
} from '../styles/ResultPage_style'

const ResultPage = () => {

  const {examId} = useParams();
  const {partyId} = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await apiPost(`/exam-result/getexam-result`, {examId: examId, partyId: partyId});
        console.log("Result", response);
        const data = response?.examResult || response?.result || response?.data || response;
        setResult(data);
      } catch (error) {
        console.error("Failed to fetch result", error);
      } finally {
        setLoading(false);
      }
    }
    fetchResult();
  }, [examId, partyId]);

  return (
    <Layout>
      <CommonContainer>
        <CommonHeader>
          <CommonHeading>Exam Result</CommonHeading>
        </CommonHeader>
        <CommonSection>
          {loading ? (
            <ResultContainer>
              <Header>
                <h2>Loading Result...</h2>
              </Header>
            </ResultContainer>
          ) : !result ? (
            <ResultContainer>
              <Header>
                <h2>No Result Found</h2>
                <p>We couldn't retrieve the details for this exam.</p>
              </Header>
              <ActionContainer>
                <ActionButton onClick={() => navigate('/user-dashboard')}>Go to Dashboard</ActionButton>
              </ActionContainer>
            </ResultContainer>
          ) : (
            <ResultContainer>
              <Header>
                <h2>{result.examName || 'Exam Result'}</h2>
                <p>You have successfully completed the exam.</p>
              </Header>

              <ScoreCircle className={
                result.status?.toString().toLowerCase() === 'pass' ? 'pass' : 
                result.status?.toString().toLowerCase() === 'fail' ? 'fail' : ''
              }>
                <h3>{result.score ?? result.totalScore ?? result.marks ?? '-'}</h3>
                <span>Score</span>
              </ScoreCircle>

              <StatsGrid>
                  <StatCard>
                    <div className="value">{result.totalQuestion ?? result.totalQuestions ?? '-'}</div>
                    <div className="label">Total Questions</div>
                  </StatCard>
                  <StatCard>
                    <div className="value" style={{color: '#10b981'}}>{result.correctAnswer ?? result.correctAnswers ?? '-'}</div>
                    <div className="label">Correct</div>
                  </StatCard>
                  <StatCard>
                    <div className="value" style={{color: '#ef4444'}}>{result.wrongAnswer ?? result.wrongAnswers ?? '-'}</div>
                    <div className="label">Incorrect</div>
                  </StatCard>
                  {(result.status || result.grade) && (
                    <StatCard>
                       <div className="value">{result.status ?? result.grade}</div>
                       <div className="label">Status</div>
                    </StatCard>
                  )}
              </StatsGrid>

              {Object.entries(result).filter(([k, v]) => 
                !['score', 'totalScore', 'marks', 'obtainedMarks', 'totalQuestion', 'totalQuestions', 'correctAnswer', 'correctAnswers', 'wrongAnswer', 'wrongAnswers', 'examName', 'status', 'grade'].includes(k) 
                && typeof v !== 'object' && v !== null
              ).length > 0 && (
                <DetailsList>
                  {Object.entries(result).filter(([k, v]) => 
                    !['score', 'totalScore', 'marks', 'obtainedMarks', 'totalQuestion', 'totalQuestions', 'correctAnswer', 'correctAnswers', 'wrongAnswer', 'wrongAnswers', 'examName', 'status', 'grade'].includes(k) 
                    && typeof v !== 'object' && v !== null
                  ).map(([key, val]) => (
                    <DetailItem key={key}>
                      <span className="key">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="val">{String(val)}</span>
                    </DetailItem>
                  ))}
                </DetailsList>
              )}

              <ActionContainer>
                <ActionButton onClick={() => navigate('/user-dashboard')}>Back to Dashboard</ActionButton>
              </ActionContainer>
            </ResultContainer>
          )}
        </CommonSection>
      </CommonContainer>
    </Layout>
  )
}

export default ResultPage
