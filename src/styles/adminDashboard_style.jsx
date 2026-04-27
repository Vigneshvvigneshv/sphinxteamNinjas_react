import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.93); }
  to   { opacity: 1; transform: scale(1); }
`;

// ─── Page Wrapper ─────────────────────────────────────────────────────────────

export const DashboardPage = styled.div`
  padding: 32px 40px 60px;
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 60px - 58px);
  font-family: ${({ theme }) => theme.fontSerif};

  @media (max-width: 768px) {
    padding: 20px 16px 40px;
  }
`;

// ─── Page Title Row ───────────────────────────────────────────────────────────

export const DashPageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const DashPageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  letter-spacing: -0.3px;

  span {
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.subtitle};
    margin-left: 10px;
    letter-spacing: 0;
  }
`;

// ─── Stat Cards Row ───────────────────────────────────────────────────────────

export const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
  animation: ${fadeUp} 0.4s ease both;

  @media (max-width: 860px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 20px 22px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: ${({ theme }) => theme.shadowSm};
  animation: ${fadeUp} 0.4s ease both;
  animation-delay: ${({ $delay }) => $delay || "0s"};
  transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
  position: relative;
  overflow: hidden;

  /* Subtle left accent bar */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 12px;
    bottom: 12px;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: ${({ $accent }) => $accent || "#3B82F6"};
    opacity: 0.7;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMd};
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

export const StatIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${({ $bg }) => $bg || "#EFF6FF"};
  color: ${({ $color }) => $color || "#3B82F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`;

export const StatInfo = styled.div`
  .value {
    font-size: 26px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1;
    margin-bottom: 4px;
    letter-spacing: -0.5px;
  }
  .label {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.subtitle};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

// ─── Section Layout ───────────────────────────────────────────────────────────

export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
  animation: ${fadeUp} 0.45s ease 0.1s both;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Panel (shared card shell) ────────────────────────────────────────────────

export const Panel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowSm};
  overflow: hidden;
  transition: box-shadow 0.2s;
  animation: ${scaleIn} 0.35s ease ${({ $delay }) => $delay || "0s"} both;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMd};
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
`;

export const PanelTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PanelIconBox = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 7px;
  background: ${({ $bg }) => $bg || "#EFF6FF"};
  color: ${({ $color }) => $color || "#3B82F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
`;

export const PanelTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const PanelCount = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 9px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.subtitle};
`;

export const PanelActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const PanelAddBtn = styled(NavLink)`
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
  text-decoration: none;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadowMd};
  }
`;

// ─── Panel Scrollable Body ────────────────────────────────────────────────────

export const PanelBody = styled.div`
  max-height: 340px;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderStrong};
    border-radius: 4px;
  }
`;

// ─── Exam Row ─────────────────────────────────────────────────────────────────

export const ExamRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 70px 70px 70px 120px;
  align-items: center;
  padding: 12px 18px;
  gap: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.15s;
  cursor: default;

  &:last-child { border-bottom: none; }
  &:hover { background: ${({ theme }) => theme.colors.pageBg}; }
`;

export const ExamColHeader = styled(ExamRow)`
  background: ${({ theme }) => theme.colors.cream};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderStrong};
  cursor: default;
  padding: 8px 18px;

  &:hover { background: ${({ theme }) => theme.colors.cream}; }

  span {
    font-size: 10px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.subtitle};
    text-transform: uppercase;
    letter-spacing: 0.6px;
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
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subtitle};
  text-align: center;
  font-weight: 500;
`;

export const ExamActionGroup = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: flex-end;
`;

export const ActionIconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.subtitle};
  font-size: 12px;
  cursor: pointer;
  transition: color 0.15s, background 0.15s, border-color 0.15s, transform 0.12s;

  &.edit:hover {
    color: #2563EB;
    background: #EFF6FF;
    border-color: #BFDBFE;
    transform: translateY(-1px);
  }

  &.assign:hover {
    color: #7C3AED;
    background: #F5F3FF;
    border-color: #DDD6FE;
    transform: translateY(-1px);
  }

  &.topics:hover {
    color: #059669;
    background: #ECFDF5;
    border-color: #A7F3D0;
    transform: translateY(-1px);
  }

  &.delete:hover {
    color: #DC2626;
    background: #FEF2F2;
    border-color: #FECACA;
    transform: translateY(-1px);
  }
`;

// ─── Topic Row ────────────────────────────────────────────────────────────────

export const TopicRow = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 18px;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.15s;

  &:last-child { border-bottom: none; }
  &:hover { background: ${({ theme }) => theme.colors.pageBg}; }
`;

export const TopicDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $color }) => $color || "#10B981"};
`;

export const TopicName = styled.div`
  flex: 1;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TopicActionGroup = styled(ExamActionGroup)``;

// ─── Empty State ──────────────────────────────────────────────────────────────

export const PanelEmpty = styled.div`
  padding: 36px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textHint};
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  svg {
    font-size: 24px;
    opacity: 0.3;
  }
`;

// ─── Tooltip label (hover chip) ───────────────────────────────────────────────

export const TooltipChip = styled.span`
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.headerBackground};
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s;
  letter-spacing: 0.03em;
  z-index: 10;
`;

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
  &:hover ${TooltipChip} { opacity: 1; }
`;
