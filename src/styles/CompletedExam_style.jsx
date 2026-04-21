import styled, { keyframes } from "styled-components";

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;
 
export const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`;
 
export const spin = keyframes`to { transform: rotate(360deg); }`;
 
// ─── Page ─────────────────────────────────────────────────────────────────────
export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.pageBg};
  padding: 36px 32px 60px;
`;
 
// ─── Header ───────────────────────────────────────────────────────────────────
export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 28px;
  animation: ${fadeUp} 0.4s ease both;
`;
 
export const HeaderLeft = styled.div``;
 
export const PageLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.success};
  background: ${({ theme }) => theme.colors.successBorder};
  border: 1px solid ${({ theme }) => theme.colors.successBorder};
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 10px;
`;
 
export const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontSerif};
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.02em;
  margin: 0 0 6px;
`;
 
export const PageSubtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 0;
`;
 
// ─── Stats row ────────────────────────────────────────────────────────────────
export const StatsRow = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 28px;
  animation: ${fadeUp} 0.4s 0.08s ease both;
`;
 
export const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 14px 20px;
  box-shadow: ${({ theme }) => theme.shadowSm};
  min-width: 160px;
  flex: 1;
`;
 
export const StatIcon = styled.div`
  width: 40px; height: 40px;
  border-radius: 10px;
  background: ${({ $bg }) => $bg};
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  color: ${({ $color }) => $color};
  flex-shrink: 0;
`;
 
export const StatInfo = styled.div`
  .val {
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .lbl {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.subtitle};
    margin-top: 3px;
    font-weight: 500;
  }
`;
 
// ─── Toolbar ──────────────────────────────────────────────────────────────────
export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  animation: ${fadeUp} 0.4s 0.12s ease both;
`;
 
export const SearchWrap = styled.div`
  position: relative;
  flex: 1;
  min-width: 220px;
  max-width: 360px;
 
  svg {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textHint};
    font-size: 13px;
    pointer-events: none;
  }
`;
 
export const SearchInput = styled.input`
  width: 100%;
  padding: 9px 14px 9px 36px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-family: ${({ theme }) => theme.fontSerif};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: ${({ theme }) => theme.shadowSm};
 
  &::placeholder { color: ${({ theme }) => theme.colors.textHint}; }
  &:focus {
    border-color: #4F46E5;
    box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
  }
`;
 
export const ResultCount = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.subtitle};
  font-weight: 500;
  white-space: nowrap;
`;
 
// ─── Content panel ────────────────────────────────────────────────────────────
export const Panel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  box-shadow: ${({ theme }) => theme.shadowMd};
  overflow: hidden;
  animation: ${fadeUp} 0.4s 0.16s ease both;
`;
 
export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
`;
 
export const PanelTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.07em;
`;
 
export const PanelBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  background: rgba(16,185,129,0.1);
  color: ${({ theme }) => theme.colors.success};
  border: 1px solid ${({ theme }) => theme.colors.successBorder};
`;
 
export const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
 
// ─── Skeleton loader ──────────────────────────────────────────────────────────
export const SkeletonRow = styled.div`
  padding: 18px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: 16px;
  align-items: center;
 
  &:last-child { border-bottom: none; }
`;
 
export const SkeletonBar = styled.div`
  height: ${({ $h }) => $h || "14px"};
  width: ${({ $w }) => $w || "100%"};
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 25%,
    ${({ theme }) => theme.colors.cream} 50%,
    ${({ theme }) => theme.colors.border} 75%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
  flex-shrink: 0;
`;

export const EmptyWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  gap: 14px;
  text-align: center;
`;
 
export const EmptyIcon = styled.div`
  width: 72px; height: 72px;
  border-radius: 18px;
  background: rgba(16,185,129,0.08);
  border: 1px solid ${({ theme }) => theme.colors.successBorder};
  display: flex; align-items: center; justify-content: center;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.success};
  margin-bottom: 6px;
`;
 
export const EmptyTitle = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
 
export const EmptyDesc = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.subtitle};
  max-width: 320px;
  line-height: 1.6;
`;