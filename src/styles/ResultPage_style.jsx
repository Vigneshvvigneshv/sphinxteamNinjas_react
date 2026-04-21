import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ResultContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 40px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0,0,0,0.03);
  font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 24px;
    margin: 20px;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h2 {
    font-size: 32px;
    font-weight: 800;
    margin: 0 0 10px 0;
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: #64748b;
    font-size: 16px;
    margin: 0;
  }
`;

export const ScoreCircle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto 40px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 8px solid #3b82f6;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);

  h3 {
    margin: 0;
    font-size: 42px;
    font-weight: 800;
    color: #1e3a8a;
    line-height: 1;
  }

  span {
    font-size: 14px;
    color: #3b82f6;
    font-weight: 600;
    margin-top: 5px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  &.pass {
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    border-color: #10b981;
    h3 { color: #065f46; }
    span { color: #10b981; }
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.2);
  }
  
  &.fail {
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
    border-color: #ef4444;
    h3 { color: #991b1b; }
    span { color: #ef4444; }
    box-shadow: 0 10px 25px rgba(239, 68, 68, 0.2);
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const StatCard = styled.div`
  background: #f8fafc;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.04);
  }

  .value {
    font-size: 24px;
    font-weight: 700;
    color: #334155;
    margin-bottom: 5px;
  }

  .label {
    font-size: 13px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }
`;

export const DetailsList = styled.div`
  margin-top: 30px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }

  .key {
    font-weight: 600;
    color: #475569;
    text-transform: capitalize;
  }

  .val {
    font-weight: 700;
    color: #1e293b;
  }
`;

export const ActionContainer = styled.div`
  margin-top: 40px;
  text-align: center;
`;

export const ActionButton = styled.button`
  padding: 14px 32px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.35);
  }
`;
