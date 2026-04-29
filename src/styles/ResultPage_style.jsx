import styled, { keyframes } from "styled-components";

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.93); }
  to   { opacity: 1; transform: scale(1); }
`;

const pulseRing = keyframes`
  0%   { box-shadow: 0 0 0 0px rgba(59,130,246,0.25); }
  100% { box-shadow: 0 0 0 14px rgba(59,130,246,0); }
`;

const pulseRingGreen = keyframes`
  0%   { box-shadow: 0 0 0 0px rgba(16,185,129,0.25); }
  100% { box-shadow: 0 0 0 14px rgba(16,185,129,0); }
`;

const pulseRingRed = keyframes`
  0%   { box-shadow: 0 0 0 0px rgba(239,68,68,0.25); }
  100% { box-shadow: 0 0 0 14px rgba(239,68,68,0); }
`;

// ─── Page Wrapper ─────────────────────────────────────────────────────────────

export const ResultPage = styled.div`
  padding: 32px 40px 60px;
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 60px - 58px);
  font-family: ${({ theme }) => theme.fontSerif};

  @media (max-width: 768px) {
    padding: 20px 16px 40px;
  }
`;

// ─── Page Header ──────────────────────────────────────────────────────────────

export const ResultPageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 12px;
  animation: ${fadeUp} 0.4s ease both;
`;

export const ResultPageTitle = styled.h1`
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

// ─── Score Hero Panel ─────────────────────────────────────────────────────────

export const ScorePanel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowSm};
  padding: 36px 32px;
  display: flex;
  align-items: center;
  gap: 36px;
  margin-bottom: 20px;
  animation: ${scaleIn} 0.35s ease 0.05s both;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMd};
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    padding: 24px 20px;
  }
`;

export const ScoreCircle = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.pageBg};
  transition: border-color 0.3s;

  &.pass {
    border-color: ${({ theme }) => theme.colors.success};
    background: rgba(16, 185, 129, 0.06);
    animation: ${pulseRingGreen} 2s ease-out infinite;

    .score-val { color: ${({ theme }) => theme.colors.success}; }
    .score-lbl { color: ${({ theme }) => theme.colors.success}; }
  }

  &.fail {
    border-color: ${({ theme }) => theme.colors.error};
    background: rgba(239, 68, 68, 0.06);
    animation: ${pulseRingRed} 2s ease-out infinite;

    .score-val { color: ${({ theme }) => theme.colors.error}; }
    .score-lbl { color: ${({ theme }) => theme.colors.error}; }
  }

  .score-val {
    font-size: 32px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1;
    letter-spacing: -1px;
  }

  .score-lbl {
    font-size: 10px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.subtitle};
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 4px;
  }
`;

export const ScoreInfo = styled.div`
  flex: 1;

  .exam-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.subtitle};
    margin-bottom: 6px;
  }

  .exam-title {
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0 0 14px 0;
    letter-spacing: -0.3px;
  }
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.06em;

  &.pass {
    background: rgba(16, 185, 129, 0.12);
    color: ${({ theme }) => theme.colors.success};
    border: 1px solid ${({ theme }) => theme.colors.successBorder};
  }

  &.fail {
    background: rgba(239, 68, 68, 0.1);
    color: ${({ theme }) => theme.colors.error};
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

// ─── Stats Grid ───────────────────────────────────────────────────────────────

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
  animation: ${fadeUp} 0.4s ease 0.1s both;

  @media (max-width: 860px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: ${({ theme }) => theme.shadowSm};
  animation: ${fadeUp} 0.4s ease ${({ $delay }) => $delay || "0s"} both;
  transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 10px;
    bottom: 10px;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: ${({ $accent }) => $accent || "#3B82F6"};
    opacity: 0.8;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMd};
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

export const StatIconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 9px;
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
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1;
    margin-bottom: 3px;
    letter-spacing: -0.5px;
  }
  .label {
    font-size: 11px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.subtitle};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

// ─── Details Panel ────────────────────────────────────────────────────────────

export const DetailsPanel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowSm};
  overflow: hidden;
  animation: ${scaleIn} 0.35s ease 0.18s both;
  margin-bottom: 20px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMd};
  }
`;

export const DetailsPanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
`;

export const DetailsPanelIconBox = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: ${({ $bg }) => $bg || "#EFF6FF"};
  color: ${({ $color }) => $color || "#3B82F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
`;

export const DetailsPanelTitle = styled.h2`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.pageBg};
  }

  .key {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.subtitle};
  }

  .val {
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

// ─── Action Row ───────────────────────────────────────────────────────────────

export const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  animation: ${fadeUp} 0.4s ease 0.22s both;
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radius};
  border: none;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontSerif};
  text-decoration: none;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  background: ${({ theme }) => theme.buttonBg};
  color: #fff;
  box-shadow: ${({ theme }) => theme.shadowSm};

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadowMd};
  }
`;

// ─── Loading / Empty States ───────────────────────────────────────────────────

export const StatePanel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowSm};
  padding: 60px 32px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textHint};
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  animation: ${scaleIn} 0.35s ease both;

  svg {
    font-size: 28px;
    opacity: 0.3;
    margin-bottom: 4px;
  }

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0;
  }

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.subtitle};
    margin: 0;
  }
`;
