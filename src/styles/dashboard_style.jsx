import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

// ─── Animations ───────────────────────────────────────────────────────────────

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const subtlePulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.6; }
`;

// ─── Page Wrapper ─────────────────────────────────────────────────────────────

export const DashPage = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.pageBg};
  padding: 28px 32px 60px;
  font-family: ${({ theme }) => theme.fontSerif};
`;

export const DashPageTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: -0.2px;

  span.sub {
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textHint};
    font-size: 16px;
  }
`;

// ─── Stat Bar ─────────────────────────────────────────────────────────────────

export const StatBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 24px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const StatTile = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: ${({ theme }) => theme.shadowSm};
  animation: ${fadeUp} 0.4s ease both;
  animation-delay: ${({ $delay }) => $delay || "0s"};
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMd};
    transform: translateY(-2px);
  }
`;

export const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ $bg }) => $bg || "#EFF6FF"};
  color: ${({ $color }) => $color || "#3B82F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
`;

export const StatInfo = styled.div`
  .value {
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1;
    margin-bottom: 3px;
  }
  .label {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.subtitle};
    font-weight: 500;
  }
`;

// ─── Dashboard Grid ───────────────────────────────────────────────────────────

export const DashGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Card Shell ───────────────────────────────────────────────────────────────

export const DashCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowSm};
  overflow: hidden;
  animation: ${fadeUp} 0.4s ease both;
  animation-delay: ${({ $delay }) => $delay || "0s"};
  transition: box-shadow 0.2s;
  ${({ $span2 }) => $span2 && "grid-column: span 2;"}

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMd};
  }

  @media (max-width: 900px) {
    grid-column: span 1 !important;
  }
`;

// ─── Card Header ──────────────────────────────────────────────────────────────

export const DashCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
`;

export const DashCardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CardIconBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ $bg }) => $bg || "#EFF6FF"};
  color: ${({ $color }) => $color || "#3B82F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
`;

export const CardTitleText = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const CardCount = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subtitle};
  background: ${({ theme }) => theme.colors.border};
  padding: 2px 8px;
  border-radius: 20px;
`;

// ─── Card Add Button ──────────────────────────────────────────────────────────

export const CardAddBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.addButtonBg};
  color: #fff;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontSerif};
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  text-decoration: none;

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadowMd};
  }
`;

export const CardNavBtn = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontSerif};
  transition: background 0.15s, color 0.15s, transform 0.15s;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.headerBackground};
    color: #fff;
    transform: translateY(-1px);
  }
`;

// ─── Card Body (scrollable) ───────────────────────────────────────────────────

export const DashCardBody = styled.div`
  max-height: ${({ $maxH }) => $maxH || "320px"};
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderStrong};
    border-radius: 4px;
  }
`;

// ─── Empty State ──────────────────────────────────────────────────────────────

export const DashEmpty = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textHint};
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  svg {
    font-size: 26px;
    opacity: 0.35;
  }
`;

// ─── Exam Rows ────────────────────────────────────────────────────────────────

export const ExamRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 90px 90px 90px 36px;
  align-items: center;
  padding: 11px 18px;
  gap: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: background 0.15s, transform 0.12s;

  &:last-child { border-bottom: none; }

  &:hover {
    background: ${({ theme }) => theme.colors.pageBg};
  }
`;

export const ExamColHeader = styled(ExamRow)`
  background: ${({ theme }) => theme.colors.cream};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderStrong};
  cursor: default;
  padding: 8px 18px;

  &:hover { background: ${({ theme }) => theme.colors.cream}; }

  span {
    font-size: 11px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.subtitle};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export const ExamName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ExamMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subtitle};

  svg {
    color: ${({ theme }) => theme.colors.textHint};
    font-size: 11px;
  }
`;

export const ExamDeleteBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textHint};
  cursor: pointer;
  padding: 5px;
  border-radius: 6px;
  font-size: 13px;
  display: flex;
  align-items: center;
  transition: color 0.15s, background 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.error};
    background: #FEE2E2;
  }
`;

// ─── Topic Rows ───────────────────────────────────────────────────────────────

export const TopicRow = styled.div`
  display: flex;
  align-items: center;
  padding: 11px 18px;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: background 0.15s;

  &:last-child { border-bottom: none; }
  &:hover { background: ${({ theme }) => theme.colors.pageBg}; }
`;

export const TopicDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color || "#10B981"};
  flex-shrink: 0;
`;

export const TopicName = styled.div`
  flex: 1;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const TopicBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 20px;
  background: ${({ $bg }) => $bg || "#D1FAE5"};
  color: ${({ $color }) => $color || "#059669"};
`;

// ─── Question Table ───────────────────────────────────────────────────────────

export const QuestionColHeader = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 140px 120px;
  align-items: center;
  padding: 8px 18px;
  gap: 12px;
  background: ${({ theme }) => theme.colors.cream};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderStrong};

  span {
    font-size: 11px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.subtitle};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export const QuestionRow = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 140px 120px;
  align-items: center;
  padding: 11px 18px;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.15s;

  &:last-child { border-bottom: none; }
  &:hover { background: ${({ theme }) => theme.colors.pageBg}; }
`;

export const QIndex = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textHint};
  text-align: center;
`;

export const QText = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const QTopicBadge = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  background: #EFF6FF;
  color: #2563EB;
  border: 1px solid #DBEAFE;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
`;

export const QTypeBadge = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  background: #F5F3FF;
  color: #7C3AED;
  border: 1px solid #EDE9FE;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 110px;
`;

// ─── Card Footer / Pagination ─────────────────────────────────────────────────

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
`;

export const PaginationBtn = styled.button`
  font-size: 12px;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.textHint : theme.colors.textPrimary};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-family: ${({ theme }) => theme.fontSerif};
  transition: background 0.15s, color 0.15s;

  &:not(:disabled):hover {
    background: ${({ theme }) => theme.colors.headerBackground};
    color: #fff;
    border-color: ${({ theme }) => theme.colors.headerBackground};
  }
`;

export const PageLabel = styled.span`
  flex: 1;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.subtitle};
`;

// ─── Header Button Group ──────────────────────────────────────────────────────

export const HeaderBtnGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
