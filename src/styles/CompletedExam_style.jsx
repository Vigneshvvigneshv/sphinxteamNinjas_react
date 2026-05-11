import styled, { keyframes } from "styled-components";

/* ─────────────────────────────────────────
   Keyframes
───────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

/* ─────────────────────────────────────────
   Completed Card  (mirrors ExamCard from
   AsignedExam_style with green accent)
───────────────────────────────────────── */
export const CompletedCard = styled.div`
  background: #FAFBFF;
  border: 1.5px solid #E8EAF0;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: box-shadow 0.22s, transform 0.22s, border-color 0.22s;
  animation: ${fadeUp} 0.4s ease both;
  animation-delay: ${({ $i }) => $i * 0.06}s;

  &:hover {
    box-shadow: 0 8px 28px rgba(16, 185, 129, 0.12);
    transform: translateY(-3px);
    border-color: #6ee7b7;
  }
`;

/* ─────────────────────────────────────────
   Card Top Row
───────────────────────────────────────── */
export const CardTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const CardIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 11px;
  background: rgba(16, 185, 129, 0.09);
  color: #10B981;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`;

export const CardNameBlock = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CardName = styled.div`
  font-size: 14.5px;
  font-weight: 700;
  color: #0F172A;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardId = styled.div`
  font-size: 11.5px;
  color: #94A3B8;
  margin-top: 3px;
`;

/* ─────────────────────────────────────────
   Action Row — Result + Certificate
───────────────────────────────────────── */
export const ActionRow = styled.div`
  display: flex;
  gap: 10px;
`;

/* Result button — indigo, outlined style */
export const ResultBtn = styled.button`
  flex: 1;
  height: 40px;
  border: 1.5px solid #4F46E5;
  border-radius: 10px;
  background: rgba(79, 70, 229, 0.05);
  color: #4F46E5;
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background 0.18s, box-shadow 0.18s, transform 0.15s;

  &:hover {
    background: rgba(79, 70, 229, 0.1);
    box-shadow: 0 3px 12px rgba(79, 70, 229, 0.18);
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;

/* Certificate button — green gradient filled */
export const CertBtn = styled.button`
  flex: 1;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: ${({ $loading }) =>
    $loading
      ? "#E2E8F0"
      : "linear-gradient(135deg, #10B981 0%, #34D399 100%)"};
  color: ${({ $loading }) => ($loading ? "#94A3B8" : "#fff")};
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: ${({ $loading }) =>
    $loading ? "none" : "0 3px 12px rgba(16, 185, 129, 0.28)"};

  &:hover:not([disabled]) {
    opacity: 0.91;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(16, 185, 129, 0.35);
  }
  &:active:not([disabled]) {
    transform: translateY(0);
  }
`;

/* Spinner inside CertBtn while downloading */
export const CertSpinner = styled.span`
  width: 13px;
  height: 13px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  display: inline-block;
  flex-shrink: 0;
`;