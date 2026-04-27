import styled, { keyframes } from "styled-components";

// ── Animations ────────────────────────────────────────────────────────────────
const fadeSlideIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

// ── Page Wrapper ──────────────────────────────────────────────────────────────
export const ETPWrap = styled.div`
  padding: 28px 32px;
  min-height: 100vh;
  background: #f8f9fc;
  animation: ${fadeSlideIn} 0.35s ease both;
`;

// ── Page Header ───────────────────────────────────────────────────────────────
export const ETPHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
`;

export const ETPTitle = styled.h1`
  font-family: 'Sora', 'Segoe UI', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;

  span {
    font-size: 13px;
    font-weight: 400;
    color: #6b7280;
    letter-spacing: 0.01em;
  }
`;

export const ETPHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// ── Section Card ──────────────────────────────────────────────────────────────
export const ETPSection = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  animation: ${fadeSlideIn} 0.4s ease both;
  animation-delay: ${({ $delay }) => $delay || "0s"};
`;

export const ETPSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 22px;
  border-bottom: 1px solid #f3f4f6;
  background: #fafafa;
`;

export const ETPSectionTitle = styled.h2`
  font-family: 'Sora', 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #6366f1;
    font-size: 14px;
  }
`;

export const ETPSectionBody = styled.div`
  padding: 16px 22px;
`;

// ── Progress Bar ──────────────────────────────────────────────────────────────
export const ETPProgressWrap = styled.div`
  margin: 0 22px 16px;
  padding: 12px 16px;
  background: #f0f1ff;
  border-radius: 10px;
  border: 1px solid #e0e1ff;
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const ETPProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 99px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ $pct }) => Math.min($pct, 100)}%;
    background: ${({ $pct }) =>
      $pct >= 100
        ? "linear-gradient(90deg, #10b981, #059669)"
        : $pct >= 70
        ? "linear-gradient(90deg, #f59e0b, #d97706)"
        : "linear-gradient(90deg, #6366f1, #818cf8)"};
    border-radius: 99px;
    transition: width 0.5s ease;
  }
`;

export const ETPProgressLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ $pct }) => ($pct >= 100 ? "#059669" : $pct >= 70 ? "#d97706" : "#6366f1")};
  white-space: nowrap;
  min-width: 80px;
  text-align: right;
`;

// ── Toggle Button (View Assigned Topics) ─────────────────────────────────────
export const ETPToggleBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Sora', 'Segoe UI', sans-serif;
  color: #6366f1;
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e0e7ff;
    border-color: #a5b4fc;
  }
`;

// ── Add Row Button ────────────────────────────────────────────────────────────
export const ETPAddRowBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Sora', 'Segoe UI', sans-serif;
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #818cf8);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(99,102,241,0.25);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99,102,241,0.35);
  }

  &:active { transform: translateY(0); }
`;

// ── Assigned Topic Row ────────────────────────────────────────────────────────
export const ETPTopicRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  background: #fafafa;
  border: 1px solid #f3f4f6;
  margin-bottom: 8px;
  transition: box-shadow 0.2s ease;

  &:last-child { margin-bottom: 0; }

  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    border-color: #e5e7eb;
  }
`;

export const ETPTopicName = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  font-family: 'Sora', 'Segoe UI', sans-serif;
`;

export const ETPTopicBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 99px;
  background: ${({ $type }) => $type === "pass" ? "#ecfdf5" : "#eef2ff"};
  color: ${({ $type }) => $type === "pass" ? "#059669" : "#6366f1"};
  border: 1px solid ${({ $type }) => $type === "pass" ? "#a7f3d0" : "#c7d2fe"};
`;

export const ETPTopicActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ETPEditBtn = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eef2ff;
  color: #6366f1;
  border: 1px solid #c7d2fe;
  border-radius: 7px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.18s ease;

  &:hover {
    background: #6366f1;
    color: #fff;
    border-color: #6366f1;
  }
`;

export const ETPDeleteBtn = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fef2f2;
  color: #ef4444;
  border: 1px solid #fecaca;
  border-radius: 7px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.18s ease;

  &:hover {
    background: #ef4444;
    color: #fff;
    border-color: #ef4444;
  }
`;

// ── Add-Row Form Row ──────────────────────────────────────────────────────────
export const ETPFormRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 12px;
  align-items: start;
  padding: 12px 16px;
  border-radius: 10px;
  background: #fafafa;
  border: 1px solid #f3f4f6;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ETPFieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ETPFieldLabel = styled.label`
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ETPSelect = styled.select`
  padding: 8px 10px;
  font-size: 13px;
  color: #111827;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  outline: none;
  font-family: 'Sora', 'Segoe UI', sans-serif;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  }
`;

export const ETPInput = styled.input`
  padding: 8px 10px;
  font-size: 13px;
  color: #111827;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  outline: none;
  font-family: 'Sora', 'Segoe UI', sans-serif;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  }

  &::placeholder { color: #9ca3af; }
`;

export const ETPError = styled.span`
  font-size: 11px;
  color: #ef4444;
  margin-top: 2px;
`;

// ── Footer Actions ────────────────────────────────────────────────────────────
export const ETPFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  padding: 14px 22px;
  border-top: 1px solid #f3f4f6;
  background: #fafafa;
`;

export const ETPFooterNote = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
`;

export const ETPFooterBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ETPBackBtn = styled.button`
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Sora', 'Segoe UI', sans-serif;
  color: #374151;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover { background: #f9fafb; border-color: #9ca3af; }
`;

export const ETPAssignBtn = styled.button`
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Sora', 'Segoe UI', sans-serif;
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #818cf8);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(99,102,241,0.25);
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99,102,241,0.35);
  }

  &:active { transform: translateY(0); }
`;

// ── Empty State ───────────────────────────────────────────────────────────────
export const ETPEmpty = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: #9ca3af;
  font-size: 13px;
  font-weight: 500;
  font-family: 'Sora', 'Segoe UI', sans-serif;

  svg {
    font-size: 28px;
    color: #d1d5db;
    display: block;
    margin: 0 auto 10px;
  }
`;

// ── Complete Badge ────────────────────────────────────────────────────────────
export const ETPCompleteBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  margin: 12px 0;
  border-radius: 10px;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #059669;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Sora', 'Segoe UI', sans-serif;

  svg { font-size: 18px; }
`;
