import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiPost } from '../ApiServices/apiServices';

import Layout from '../component/Layout';
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

  const { examId, partyId } = useParams(); // ✅ fixed
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await apiPost(`/exam-result/getexam-result`, { examId, partyId });
        console.log("Result", response);

     
        const data = response?.resultList || null;
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
                <ActionButton onClick={() => navigate('/user-dashboard')}>
                  Go to Dashboard
                </ActionButton>
              </ActionContainer>
            </ResultContainer>
          ) : (
            <ResultContainer>
              <Header>
                <h2>Exam Result</h2>
                <p>You have successfully completed the exam.</p>
              </Header>

          
              <ScoreCircle className={result.passed === 1 ? 'pass' : 'fail'}>
                <h3>{result.score ?? '-'}</h3>
                <span>Score</span>
              </ScoreCircle>

             
              <StatsGrid>
                <StatCard>
                  <div className="value">{result.totalMarks ?? '-'}</div>
                  <div className="label">Total Marks</div>
                </StatCard>

                <StatCard>
                  <div className="value" style={{ color: '#10b981' }}>
                    {result.correctCount ?? '-'}
                  </div>
                  <div className="label">Correct</div>
                </StatCard>

                <StatCard>
                  <div className="value" style={{ color: '#ef4444' }}>
                    {result.wrongCount ?? '-'}
                  </div>
                  <div className="label">Incorrect</div>
                </StatCard>

                <StatCard>
                  <div className="value">
                    {result.skippedCount ?? '-'}
                  </div>
                  <div className="label">Skipped</div>
                </StatCard>

                <StatCard>
                  <div className="value">
                    {result.percentage ?? '-'}%
                  </div>
                  <div className="label">Percentage</div>
                </StatCard>

                <StatCard>
                  <div className="value">
                    {result.passed === 1 ? 'Pass' : 'Fail'}
                  </div>
                  <div className="label">Status</div>
                </StatCard>
              </StatsGrid>

   
              <DetailsList>
                <DetailItem>
                  <span className="key">Attempt No</span>
                  <span className="val">{result.attemptNo}</span>
                </DetailItem>

                <DetailItem>
                  <span className="key">Submitted Date</span>
                  <span className="val">
                    {new Date(result.submittedDate).toLocaleString()}
                  </span>
                </DetailItem>
              </DetailsList>

              <ActionContainer>
                <ActionButton onClick={() => navigate('/user-dashboard')}>
                  Back to Dashboard
                </ActionButton>
              </ActionContainer>
            </ResultContainer>
          )}
    
    </Layout>
  )
}

export default ResultPage;