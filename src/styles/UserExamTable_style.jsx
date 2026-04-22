import styled, { keyframes } from "styled-components";

// ─── Animations ───────────────────────────────────────────────────────────────
export const fadeDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─── Card wrapper ─────────────────────────────────────────────────────────────
export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadowSm};
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: ${({ theme }) => theme.buttonBg};
    opacity: ${({ $noAttempts }) => ($noAttempts ? 0.25 : 1)};
    border-radius: 16px 16px 0 0;
  }

  &:hover {
    transform: ${({ $noAttempts }) => ($noAttempts ? "none" : "translateY(-4px)")};
    box-shadow: ${({ theme, $noAttempts }) => ($noAttempts ? theme.shadowSm : theme.shadowLg)};
    border-color: ${({ theme, $noAttempts }) => ($noAttempts ? theme.colors.border : theme.colors.borderStrong)};
  }
`;

// ─── Card top ─────────────────────────────────────────────────────────────────
export const CardTop = styled.div`
  padding: 20px 20px 16px;
`;

export const CardTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

export const CardIconBox = styled.div`
  width: 44px; height: 44px;
  border-radius: 12px;
  background: rgba(79,70,229,0.08);
  border: 1px solid rgba(79,70,229,0.15);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  color: #4F46E5;
  flex-shrink: 0;
`;

export const AttemptsTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  white-space: nowrap;
  background: ${({ $left }) =>
    $left === null ? "rgba(79,70,229,0.08)" :
    $left === 0    ? "rgba(239,68,68,0.08)" :
    $left === 1    ? "rgba(245,158,11,0.1)" :
                     "rgba(16,185,129,0.08)"};
  color: ${({ $left }) =>
    $left === null ? "#4F46E5" :
    $left === 0    ? "#EF4444" :
    $left === 1    ? "#D97706" :
                     "#10B981"};
  border: 1px solid ${({ $left }) =>
    $left === null ? "rgba(79,70,229,0.18)" :
    $left === 0    ? "rgba(239,68,68,0.2)" :
    $left === 1    ? "rgba(245,158,11,0.25)" :
                     "rgba(16,185,129,0.2)"};
`;

export const CardTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 4px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardId = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textHint};
  font-family: "Fira Code", monospace;
  margin-bottom: 14px;
`;

// ─── Quick stats row ──────────────────────────────────────────────────────────
export const QuickStats = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
`;

export const QuickChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subtitle};
  background: ${({ theme }) => theme.colors.pageBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 5px 10px;
  border-radius: 8px;

  svg { color: ${({ $iconColor }) => $iconColor || "#94A3B8"}; }
`;

// ─── Attempts progress ────────────────────────────────────────────────────────
export const AttemptsRow = styled.div`
  padding: 11px 12px;
  background: ${({ theme }) => theme.colors.pageBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  margin-bottom: 2px;
`;

export const AttemptsRowTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
`;

export const AttemptsLabel = styled.div`
  font-size: 11px; font-weight: 600;
  color: ${({ theme }) => theme.colors.subtitle};
  display: flex; align-items: center; gap: 5px;
`;

export const AttemptsNumbers = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textHint};
  font-family: "Fira Code", monospace;
`;

export const Bar = styled.div`
  width: 100%; height: 5px;
  border-radius: 99px;
  background: ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

export const BarFill = styled.div`
  height: 100%; border-radius: 99px;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $pct }) =>
    $pct > 60 ? "#10B981" : $pct > 30 ? "#F59E0B" : "#EF4444"};
  transition: width 0.5s ease;
`;

// ─── Expandable details ───────────────────────────────────────────────────────
export const DetailsToggle = styled.button`
  display: flex; align-items: center; gap: 6px;
  width: 100%;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.cream};
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: ${({ $open, theme }) => $open ? `1px solid ${theme.colors.border}` : "none"};
  font-family: ${({ theme }) => theme.fontSerif};
  font-size: 12px; font-weight: 600;
  color: ${({ theme }) => theme.colors.subtitle};
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  text-transform: uppercase;
  letter-spacing: 0.06em;

  svg { margin-left: auto; }

  &:hover { background: ${({ theme }) => theme.colors.border}; color: ${({ theme }) => theme.colors.textPrimary}; }
`;

export const DetailsPanel = styled.div`
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.cream};
  display: flex; flex-direction: column; gap: 10px;
  animation: ${fadeDown} 0.2s ease;
`;

export const DetailRow = styled.div`
  display: flex; align-items: flex-start; gap: 10px;
`;

export const DetailIcon = styled.div`
  width: 28px; height: 28px; border-radius: 7px;
  background: ${({ $bg }) => $bg || "rgba(79,70,229,0.07)"};
  border: 1px solid ${({ $border }) => $border || "rgba(79,70,229,0.12)"};
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; color: ${({ $color }) => $color || "#4F46E5"};
  flex-shrink: 0;
`;

export const DetailText = styled.div`
  display: flex; flex-direction: column; justify-content: center;
  .lbl { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: ${({ theme }) => theme.colors.textHint}; }
  .val { font-size: 13px; font-weight: 600; color: ${({ theme }) => theme.colors.textPrimary}; margin-top: 2px; line-height: 1.4; }
`;

// ─── Footer ───────────────────────────────────────────────────────────────────
export const CardFooter = styled.div`
  padding: 14px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StartExamBtn = styled.button`
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 11px 20px;
  border-radius: 10px;
  background: ${({ theme }) => theme.buttonBg};
  color: #fff;
  font-family: ${({ theme }) => theme.fontSerif};
  font-size: 14px; font-weight: 700;
  border: none; cursor: pointer;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 3px 10px rgba(79,70,229,0.28);

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 5px 16px rgba(79,70,229,0.38);
  }
  &:disabled {
    background: #E2E8F0; color: #94A3B8;
    box-shadow: none; cursor: not-allowed; transform: none;
  }
`;

export const NoAttemptsMsg = styled.div`
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 11px;
  border-radius: 10px;
  background: rgba(239,68,68,0.06);
  border: 1px solid rgba(239,68,68,0.18);
  font-size: 13px; font-weight: 600;
  color: #EF4444;
`;