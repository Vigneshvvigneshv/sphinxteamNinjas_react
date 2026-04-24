import styled, { keyframes } from "styled-components";

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;
export const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;
export const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
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

export const PageLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #4F46E5;
  background: rgba(79,70,229,0.08);
  border: 1px solid rgba(79,70,229,0.18);
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
  min-width: 150px;
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
  .val { font-size: 22px; font-weight: 700; color: ${({ theme }) => theme.colors.textPrimary}; line-height: 1; font-variant-numeric: tabular-nums; }
  .lbl { font-size: 12px; color: ${({ theme }) => theme.colors.subtitle}; margin-top: 3px; font-weight: 500; }
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
  svg { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: ${({ theme }) => theme.colors.textHint}; font-size: 13px; pointer-events: none; }
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
  &:focus { border-color: #4F46E5; box-shadow: 0 0 0 3px rgba(79,70,229,0.1); }
`;

export const ResultCount = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.subtitle};
  font-weight: 500;
  white-space: nowrap;
`;

// ─── Panel ────────────────────────────────────────────────────────────────────
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
  background: rgba(79,70,229,0.08);
  color: #4F46E5;
  border: 1px solid rgba(79,70,229,0.18);
`;

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export const SkeletonRow = styled.div`
  padding: 18px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex; gap: 16px; align-items: center;
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
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 64px 24px; gap: 14px; text-align: center;
`;
export const EmptyIcon = styled.div`
  width: 72px; height: 72px; border-radius: 18px;
  background: rgba(79,70,229,0.07);
  border: 1px solid rgba(79,70,229,0.15);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; color: #4F46E5; margin-bottom: 6px;
`;
export const EmptyTitle = styled.div`font-size: 17px; font-weight: 700; color: ${({ theme }) => theme.colors.textPrimary};`;
export const EmptyDesc  = styled.div`font-size: 13px; color: ${({ theme }) => theme.colors.subtitle}; max-width: 300px; line-height: 1.6;`;

// ─── Modal overlay ────────────────────────────────────────────────────────────
export const Overlay = styled.div`
  position: fixed; inset: 0; z-index: 1000;
  background: ${({ theme }) => theme.colors.overlay};
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.2s ease;
`;

export const ModalCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  width: 100%; max-width: 480px;
  box-shadow: ${({ theme }) => theme.shadowModal};
  overflow: hidden;
  animation: ${scaleIn} 0.25s ease;
`;

export const ModalHeader = styled.div`
  background: ${({ theme }) => theme.buttonBg};
  padding: 22px 28px 20px;
  display: flex; align-items: center; justify-content: space-between;
`;

export const ModalHeaderLeft = styled.div`
  display: flex; align-items: center; gap: 12px;
`;

export const ModalIconWrap = styled.div`
  width: 40px; height: 40px; border-radius: 11px;
  background: rgba(255,255,255,0.15);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: #fff;
`;

export const ModalTitle = styled.h2`
  font-size: 17px; font-weight: 700; color: #fff; margin: 0;
`;
export const ModalSubtitle = styled.p`
  font-size: 12px; color: rgba(255,255,255,0.75); margin: 3px 0 0;
`;

export const CloseBtn = styled.button`
  background: rgba(255,255,255,0.15); border: none; color: #fff;
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 13px; transition: background 0.18s;
  &:hover { background: rgba(255,255,255,0.25); }
`;

export const ModalBody = styled.div`
  padding: 24px 28px;
  display: flex; flex-direction: column; gap: 20px;
`;

// Instructions
export const InstructionsList = styled.div`
  background: ${({ theme }) => theme.colors.cream};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 16px 18px;
  display: flex; flex-direction: column; gap: 11px;
`;

export const InstructionItem = styled.div`
  display: flex; align-items: flex-start; gap: 10px;
`;

export const InstrIcon = styled.div`
  width: 28px; height: 28px; border-radius: 8px;
  background: ${({ $bg }) => $bg};
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; color: ${({ $color }) => $color};
  flex-shrink: 0; margin-top: 1px;
`;

export const InstrText = styled.div`
  font-size: 13px; color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.55; font-weight: 500;
`;

// Password field
export const FieldWrap = styled.div`
display: flex; 
flex-direction: column; 
gap: 8px;
`;

export const FieldLabel = styled.label`
  font-size: 13px; font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex; align-items: center; gap: 6px;
`;

export const FieldInput = styled.input`
  width: 100%;
  padding: 11px 14px 11px 42px;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fontSerif};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  letter-spacing: 0.08em;

  &::placeholder { color: ${({ theme }) => theme.colors.textHint}; letter-spacing: 0; }
  &:focus { border-color: #4F46E5; box-shadow: 0 0 0 3px rgba(79,70,229,0.1); background: #fff; }
`;

export const FieldInputWrap = styled.div`
  position: relative;
  svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: ${({ theme }) => theme.colors.textHint}; font-size: 14px; pointer-events: none; }
`;

// Warning chip
export const WarnChip = styled.div`
  display: flex; align-items: center; gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  background: rgba(245,158,11,0.08);
  border: 1px solid rgba(245,158,11,0.22);
  font-size: 12px; color: #92400E; line-height: 1.5;
  svg { flex-shrink: 0; color: #F59E0B; }
`;

// Action buttons
export const ModalFooter = styled.div`
  display: flex; gap: 10px;
  padding: 0 28px 24px;
`;

export const StartBtn = styled.button`
  flex: 1;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px 20px;
  border-radius: 10px;
  background: ${({ theme }) => theme.buttonBg};
  color: #fff;
  font-family: ${({ theme }) => theme.fontSerif};
  font-size: 14px; font-weight: 700;
  border: none; cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  box-shadow: 0 4px 14px rgba(79,70,229,0.3);
  &:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
  &:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
`;

export const CancelBtn = styled.button`
  display: flex; align-items: center; justify-content: center; gap: 7px;
  padding: 12px 20px;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fontSerif};
  font-size: 14px; font-weight: 600;
  cursor: pointer;
  transition: border-color 0.18s, background 0.18s;
  &:hover { border-color: ${({ theme }) => theme.colors.borderStrong}; background: ${({ theme }) => theme.colors.cream}; }
`;

export const BtnSpinner = styled.div`
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

// ─── Attempts bar styled components ─────────────────────────────────────────
export const AttemptsBar = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 99px;
  background: ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

export const AttemptsBarFill = styled.div`
  height: 100%;
  border-radius: 99px;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $pct }) =>
    $pct > 60 ? "#10B981" : $pct > 30 ? "#F59E0B" : "#EF4444"};
  transition: width 0.5s ease;
`;

export const CardGrid = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px;
`;

