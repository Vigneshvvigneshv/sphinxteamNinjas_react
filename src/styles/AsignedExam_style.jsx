import styled, { keyframes } from "styled-components";

/* ─────────────────────────────────────────
   Keyframes
───────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.45; }
`;

const fillBar = keyframes`
  from { width: 0; }
  to   { width: var(--bar-width); }
`;

/* ─────────────────────────────────────────
   Page Shell
───────────────────────────────────────── */
export const PageWrapper = styled.div`
  min-height: 100vh;
  background: #F5F6FA;
  padding: 36px 32px 60px;
  font-family: 'DM Sans', 'Segoe UI', sans-serif;

  @media (max-width: 768px) {
    padding: 20px 14px 48px;
  }
`;

/* ─────────────────────────────────────────
   Page Header
───────────────────────────────────────── */
export const PageHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 28px;
  animation: ${fadeUp} 0.45s ease both;
`;

export const PageLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #4F46E5;
  margin-bottom: 6px;
`;

export const PageTitle = styled.h1`
  font-size: 26px;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 4px;
  letter-spacing: -0.5px;
`;

export const PageSubtitle = styled.p`
  font-size: 13.5px;
  color: #64748B;
  margin: 0;
`;

/* ─────────────────────────────────────────
   Stats Row
───────────────────────────────────────── */
export const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  animation: ${fadeUp} 0.5s ease 0.07s both;

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

export const StatCard = styled.div`
  flex: 1;
  min-width: 130px;
  background: #fff;
  border-radius: 14px;
  border: 1px solid #E8EAF0;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 13px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
`;

export const StatIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
`;

export const StatInfo = styled.div`
  .val {
    font-size: 20px;
    font-weight: 800;
    color: #0F172A;
    line-height: 1;
  }
  .lbl {
    font-size: 11.5px;
    color: #94A3B8;
    margin-top: 3px;
    font-weight: 500;
  }
`;

/* ─────────────────────────────────────────
   Toolbar
───────────────────────────────────────── */
export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
  animation: ${fadeUp} 0.5s ease 0.12s both;
`;

export const SearchWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1.5px solid #E2E8F0;
  border-radius: 11px;
  padding: 0 14px;
  height: 42px;
  color: #94A3B8;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #4F46E5;
    color: #4F46E5;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13.5px;
  color: #1E293B;
  font-family: inherit;

  &::placeholder { color: #CBD5E1; }
`;

export const ResultCount = styled.div`
  font-size: 12.5px;
  color: #94A3B8;
  white-space: nowrap;
  font-weight: 600;
`;

/* ─────────────────────────────────────────
   Panel
───────────────────────────────────────── */
export const Panel = styled.div`
  background: #fff;
  border-radius: 18px;
  border: 1px solid #E8EAF0;
  padding: 22px 22px 26px;
  box-shadow: 0 2px 14px rgba(0,0,0,0.05);
  animation: ${fadeUp} 0.5s ease 0.17s both;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const PanelTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #1E293B;
`;

export const PanelBadge = styled.div`
  font-size: 11px;
  font-weight: 700;
  padding: 3px 11px;
  border-radius: 20px;
  background: rgba(79,70,229,0.08);
  color: #4F46E5;
`;

/* ─────────────────────────────────────────
   Card Grid
───────────────────────────────────────── */
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 18px;
`;

/* ─────────────────────────────────────────
   Exam Card  (replaces UserExamTable)
───────────────────────────────────────── */
export const ExamCard = styled.div`
  background: #FAFBFF;
  border: 1.5px solid #E8EAF0;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: box-shadow 0.22s, transform 0.22s, border-color 0.22s;
  animation: ${fadeUp} 0.4s ease both;
  animation-delay: ${({ $i }) => $i * 0.06}s;

  &:hover {
    box-shadow: 0 8px 28px rgba(79,70,229,0.11);
    transform: translateY(-3px);
    border-color: #c7c4f8;
  }
`;

export const CardTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const CardIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 11px;
  background: rgba(79,70,229,0.09);
  color: #4F46E5;
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
  margin-top: 2px;
`;

export const CardBadge = styled.span`
  font-size: 10.5px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  white-space: nowrap;
  flex-shrink: 0;
  background: ${({ $available }) =>
    $available ? "rgba(16,185,129,0.09)" : "rgba(239,68,68,0.09)"};
  color: ${({ $available }) => ($available ? "#10B981" : "#EF4444")};
`;

/* ─────────────────────────────────────────
   Card Meta chips
───────────────────────────────────────── */
export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const MetaChip = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  background: #F1F5F9;
  border-radius: 8px;
  padding: 4px 10px;

  svg { color: ${({ $color }) => $color || "#64748B"}; }
`;

/* ─────────────────────────────────────────
   Attempts Progress
───────────────────────────────────────── */
export const AttemptsLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #94A3B8;
  margin-bottom: 6px;
  font-weight: 500;

  span:last-child { color: #475569; font-weight: 700; }
`;

export const AttemptsBar = styled.div`
  width: 100%;
  height: 6px;
  background: #EEF0F5;
  border-radius: 99px;
  overflow: hidden;
`;

export const AttemptsBarFill = styled.div`
  --bar-width: ${({ $percent }) => $percent}%;
  height: 100%;
  width: var(--bar-width);
  background: ${({ $color }) => $color || "#4F46E5"};
  border-radius: 99px;
  animation: ${fillBar} 0.7s ease both;
`;

/* ─────────────────────────────────────────
   Start Button (card level)
───────────────────────────────────────── */
export const StartBtn = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: ${({ disabled }) =>
    disabled ? "#E2E8F0" : "linear-gradient(135deg,#4F46E5 0%,#6366F1 100%)"};
  color: ${({ disabled }) => (disabled ? "#94A3B8" : "#fff")};
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  letter-spacing: 0.01em;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: ${({ disabled }) =>
    disabled ? "none" : "0 3px 12px rgba(79,70,229,0.28)"};

  &:hover:not(:disabled) {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(79,70,229,0.35);
  }
  &:active:not(:disabled) { transform: translateY(0); }
`;

export const BtnSpinner = styled.span`
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  display: inline-block;
`;

/* ─────────────────────────────────────────
   Skeleton
───────────────────────────────────────── */
export const SkeletonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 4px;
  border-bottom: 1px solid #F1F5F9;
`;

export const SkeletonBar = styled.div`
  width: ${({ $w }) => $w || "100%"};
  height: ${({ $h }) => $h || "12px"};
  border-radius: 6px;
  background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;

/* ─────────────────────────────────────────
   Empty State
───────────────────────────────────────── */
export const EmptyWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 56px 20px;
  gap: 12px;
`;

export const EmptyIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: rgba(79,70,229,0.07);
  color: #4F46E5;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2.4s ease infinite;
`;

export const EmptyTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #1E293B;
`;

export const EmptyDesc = styled.div`
  font-size: 13px;
  color: #94A3B8;
  text-align: center;
  max-width: 320px;
  line-height: 1.6;
`;

/* ─────────────────────────────────────────
   Modal Overlay & Card
───────────────────────────────────────── */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,0.45);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:990;
  padding: 20px;
`;

export const ModalCard = styled.div`
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 24px 64px rgba(0,0,0,0.18);
  animation: ${fadeUp} 0.3s ease both;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 24px 18px;
  border-bottom: 1px solid #F1F5F9;
`;

export const ModalHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`;

export const ModalIconWrap = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(79,70,229,0.09);
  color: #4F46E5;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: #0F172A;
`;

export const ModalSubtitle = styled.div`
  font-size: 12px;
  color: #94A3B8;
  margin-top: 2px;
`;

export const CloseBtn = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: #F8FAFC;
  color: #64748B;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover { background: #FEE2E2; color: #EF4444; }
`;

export const ModalBody = styled.div`
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const InstructionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InstructionItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 11px;
  padding: 11px 13px;
  border-radius: 11px;
  background: #F8FAFC;
  border: 1px solid #EEF0F5;
`;

export const InstrIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
`;

export const InstrText = styled.div`
  font-size: 12.5px;
  color: #374151;
  line-height: 1.55;
  padding-top: 5px;
`;

export const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const FieldLabel = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const FieldInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1.5px solid #E2E8F0;
  border-radius: 10px;
  padding: 0 13px;
  height: 44px;
  background: #FAFBFF;
  color: #94A3B8;
  transition: border-color 0.2s, color 0.2s;

  &:focus-within {
    border-color: #4F46E5;
    color: #4F46E5;
  }
`;

export const FieldInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13.5px;
  color: #1E293B;
  font-family: inherit;

  &::placeholder { color: #CBD5E1; }
`;

export const WarnChip = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 11px 13px;
  border-radius: 10px;
  background: rgba(245,158,11,0.07);
  border: 1px solid rgba(245,158,11,0.2);
  font-size: 12px;
  color: #92400E;
  line-height: 1.5;
  font-weight: 500;

  svg { color: #F59E0B; margin-top: 1px; flex-shrink: 0; }
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px 22px;
  border-top: 1px solid #F1F5F9;
`;

export const CancelBtn = styled.button`
  height: 38px;
  padding: 0 18px;
  border: 1.5px solid #E2E8F0;
  border-radius: 9px;
  background: transparent;
  color: #64748B;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 7px;
  transition: background 0.15s, color 0.15s, border-color 0.15s;

  &:hover { background: #FEE2E2; color: #EF4444; border-color: #FECACA; }
`;

export const ModalStartBtn = styled.button`
  height: 38px;
  padding: 0 22px;
  border: none;
  border-radius: 9px;
  background: ${({ disabled }) =>
    disabled ? "#E2E8F0" : "linear-gradient(135deg,#4F46E5 0%,#6366F1 100%)"};
  color: ${({ disabled }) => (disabled ? "#94A3B8" : "#fff")};
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: ${({ disabled }) =>
    disabled ? "none" : "0 3px 12px rgba(79,70,229,0.3)"};
  transition: opacity 0.2s, box-shadow 0.2s;

  &:hover:not(:disabled) { opacity: 0.88; }
`;