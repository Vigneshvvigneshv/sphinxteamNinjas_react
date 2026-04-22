import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─── Page Wrapper ─────────────────────────────────────────────────────────────

export const QPageWrap = styled.div`
  padding: 32px 40px 60px;
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 60px - 58px);
  font-family: ${({ theme }) => theme.fontSerif};

  @media (max-width: 768px) {
    padding: 20px 16px 40px;
  }
`;

// ─── Page Header ──────────────────────────────────────────────────────────────

export const QPageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 22px;
  flex-wrap: wrap;
  gap: 12px;
  animation: ${fadeUp} 0.35s ease both;
`;

export const QPageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  letter-spacing: -0.3px;

  span {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.subtitle};
    letter-spacing: 0;
    margin-top: 3px;
  }
`;

export const QHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const QAddBtn = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.addButtonBg};
  color: #fff;
  border: none;
  text-decoration: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontSerif};
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadowMd};
  }
`;

export const QUploadBtn = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-decoration: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontSerif};
  transition: background 0.15s, color 0.15s, border-color 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.headerBackground};
    color: #fff;
    border-color: ${({ theme }) => theme.colors.headerBackground};
  }
`;

export const QDeleteAllBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius};
  background: transparent;
  color: ${({ theme }) => theme.colors.error};
  border: 1px solid ${({ theme }) => theme.colors.error};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontSerif};
  transition: background 0.15s, color 0.15s;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background: ${({ theme }) => theme.colors.error};
    color: #fff;
  }
`;

// ─── Stat + Search row ────────────────────────────────────────────────────────

export const QControlRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.38s ease 0.05s both;
`;

export const QStatStrip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

export const QStatBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subtitle};
  box-shadow: ${({ theme }) => theme.shadowSm};

  svg { color: ${({ $iconColor }) => $iconColor || '#3B82F6'}; font-size: 11px; }
`;

export const QSearchWrap = styled.div`
  position: relative;
  width: 280px;

  svg {
    position: absolute;
    left: 11px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textHint};
    font-size: 12px;
    pointer-events: none;
  }

  @media (max-width: 600px) { width: 100%; }
`;

export const QSearchInput = styled.input`
  width: 100%;
  padding: 8px 12px 8px 32px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder { color: ${({ theme }) => theme.colors.textHint}; }
  &:focus {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
  }
`;

// ─── Panel Shell ──────────────────────────────────────────────────────────────

export const QPanel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowSm};
  overflow: hidden;
  animation: ${fadeUp} 0.4s ease 0.1s both;
`;

// ─── Column Header ────────────────────────────────────────────────────────────

export const QColHeader = styled.div`
  display: grid;
  grid-template-columns: 36px 48px 1fr 140px 130px 110px;
  align-items: center;
  padding: 9px 18px;
  gap: 10px;
  background: ${({ theme }) => theme.colors.cream};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderStrong};

  span {
    font-size: 10px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.subtitle};
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }

  /* hide topic col when not needed */
  .col-topic { display: ${({ $hideTopic }) => ($hideTopic ? 'none' : 'block')}; }
`;

// ─── Question Row ─────────────────────────────────────────────────────────────

export const QRow = styled.div`
  display: grid;
  grid-template-columns: 36px 48px 1fr 140px 130px 110px;
  align-items: center;
  padding: 12px 18px;
  gap: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.15s;

  &:last-child { border-bottom: none; }
  &:hover { background: ${({ theme }) => theme.colors.pageBg}; }
`;

export const QCheckbox = styled.input`
  width: 15px;
  height: 15px;
  border-radius: 4px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.textPrimary};
`;

export const QSerial = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textHint};
  text-align: center;
`;

export const QText = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
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
  max-width: 120px;
`;

export const QRowActions = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: flex-end;
`;

// ─── Tooltip ──────────────────────────────────────────────────────────────────

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
  &:hover span { opacity: 1; }
`;

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
  z-index: 10;
`;

export const QIconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.subtitle};
  font-size: 11px;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.15s, background 0.15s, border-color 0.15s, transform 0.12s;

  &.answers:hover {
    color: #7C3AED;
    background: #F5F3FF;
    border-color: #DDD6FE;
    transform: translateY(-1px);
  }
  &.edit:hover {
    color: #2563EB;
    background: #EFF6FF;
    border-color: #BFDBFE;
    transform: translateY(-1px);
  }
  &.delete:hover {
    color: #DC2626;
    background: #FEF2F2;
    border-color: #FECACA;
    transform: translateY(-1px);
  }
`;

// ─── Answer Expand Panel ──────────────────────────────────────────────────────

export const AnswerPanel = styled.div`
  padding: 14px 20px 16px 72px;
  background: ${({ theme }) => theme.colors.cream};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  animation: ${slideDown} 0.22s ease both;
`;

export const AnswerPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const AnswerPanelTitle = styled.p`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 0;
`;

export const AnswerHideBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.subtitle};
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.headerBackground};
    color: #fff;
    border-color: ${({ theme }) => theme.colors.headerBackground};
  }
`;

export const AnswerOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
`;

export const AnswerOptionChip = styled.span`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CorrectAnswer = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.success};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '✓';
    font-size: 13px;
  }
`;

// ─── Empty State ──────────────────────────────────────────────────────────────

export const QEmptyWrap = styled.div`
  padding: 56px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textHint};

  svg { font-size: 28px; opacity: 0.3; }
  p { font-size: 13px; color: ${({ theme }) => theme.colors.subtitle}; margin: 0; }
`;

// ─── Pagination ───────────────────────────────────────────────────────────────

export const QPagination = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
  flex-wrap: wrap;
`;

export const QPageBtn = styled.button`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme, disabled }) => disabled ? theme.colors.textHint : theme.colors.textPrimary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-family: inherit;
  transition: background 0.15s, color 0.15s;

  &:not(:disabled):hover {
    background: ${({ theme }) => theme.colors.headerBackground};
    color: #fff;
    border-color: ${({ theme }) => theme.colors.headerBackground};
  }
`;

export const QPageLabel = styled.span`
  flex: 1;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subtitle};
`;

export const QPageSizeWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;

  label {
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.subtitle};
    white-space: nowrap;
  }
`;

export const QPageSizeInput = styled.input`
  width: 56px;
  padding: 5px 8px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
  font-family: inherit;
  outline: none;
  text-align: center;
  transition: border-color 0.2s;

  &:focus { border-color: ${({ theme }) => theme.colors.borderHover}; }
`;
