// ─────────────────────────────────────────────────────────────────────────────
//  question_style_unified.jsx
//  Single style source for AddEditQuestionPage + SingleChoice + MultiChoice
//  + TrueOrFalse.  Import everything from here; delete the old style files.
// ─────────────────────────────────────────────────────────────────────────────

import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';

// ─── Animations ───────────────────────────────────────────────────────────────

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
`;

// ─── Page ─────────────────────────────────────────────────────────────────────

export const QPage = styled.div`
  padding: 32px 40px 60px;
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 60px - 58px);
  font-family: ${({ theme }) => theme.fontSerif};
  animation: ${fadeUp} 0.35s ease both;

  @media (max-width: 768px) {
    padding: 20px 16px 40px;
  }
`;

// ─── Page Header ──────────────────────────────────────────────────────────────

export const QPageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const QPageTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const QPageTitle = styled.h1`
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

export const QPageSubtitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 0;
`;

export const QBackBtn = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 7px 14px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.subtitle};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fontSerif};
  transition: color 0.15s, border-color 0.15s, background 0.15s, transform 0.12s;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    border-color: ${({ theme }) => theme.colors.borderStrong};
    background: ${({ theme }) => theme.colors.pageBg};
    transform: translateX(-2px);
  }
`;

// ─── Single Container Card ────────────────────────────────────────────────────

export const QContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowSm};
  overflow: hidden;
  animation: ${scaleIn} 0.3s ease both;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMd};
  }
`;

// ─── Container Header ─────────────────────────────────────────────────────────

export const QContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
  flex-wrap: wrap;
  gap: 10px;
`;

export const QContainerTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const QContainerIconBox = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 7px;
  background: ${({ $bg }) => $bg || '#EFF6FF'};
  color: ${({ $color }) => $color || '#3B82F6'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
`;

export const QContainerTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

// ─── Config row inside header ─────────────────────────────────────────────────

export const QConfigRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const QConfigGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const QConfigLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.subtitle};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
`;

export const QConfigSelect = styled.select`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 5px 9px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontSerif};
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const QTopicBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 4px 11px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.gold_bg};
  color: ${({ theme }) => theme.colors.gold};
  border: 1px solid ${({ theme }) => theme.colors.gold}33;
`;

// ─── Body ─────────────────────────────────────────────────────────────────────

export const QBody = styled.div`
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// ─── Section Divider ──────────────────────────────────────────────────────────

export const QSectionDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.subtitle};
  text-transform: uppercase;
  letter-spacing: 0.07em;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }
`;

// ─── Field ────────────────────────────────────────────────────────────────────

export const QField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const QLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};

  .req {
    color: ${({ theme }) => theme.colors.required};
    margin-left: 2px;
  }
`;

export const QTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px 12px;
  font-size: 13.5px;
  font-family: ${({ theme }) => theme.fontSerif};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.pageBg};
  border: 1px solid ${({ $hasError, theme }) => ($hasError ? theme.colors.error : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius};
  resize: vertical;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  line-height: 1.6;
  box-sizing: border-box;

  &::placeholder { color: ${({ theme }) => theme.colors.textHint}; }

  &:focus {
    border-color: ${({ $hasError, theme }) => ($hasError ? theme.colors.error : '#3B82F6')};
    box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)')};
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const QInput = styled.input`
  width: 100%;
  padding: 9px 12px;
  font-size: 13.5px;
  font-family: ${({ theme }) => theme.fontSerif};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.pageBg};
  border: 1px solid ${({ $hasError, theme }) => ($hasError ? theme.colors.error : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius};
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;

  &::placeholder { color: ${({ theme }) => theme.colors.textHint}; }

  &:focus {
    border-color: ${({ $hasError, theme }) => ($hasError ? theme.colors.error : '#3B82F6')};
    box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)')};
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const QError = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.error};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '⚠';
    font-size: 10px;
  }
`;

// ─── Options Grid ─────────────────────────────────────────────────────────────

export const QOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Option Row (used by SingleChoice / MultiChoice / TrueOrFalse) ────────────
//  Replaces QuestionFieldContainer from the old question_style + form_style mix.

export const QOptionRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const QOptionLabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

/** Styled radio / checkbox — replaces CheckBox from form_style */
export const QOptionControl = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
  cursor: pointer;
  flex-shrink: 0;
`;

/** Label next to the radio/checkbox — replaces FormLabel from form_style */
export const QOptionLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
`;

/** Text input inside an option row — replaces FormInput from form_style */
export const QOptionInput = styled(QInput)`
  /* inherits all QInput styles; override here if needed */
`;

// ─── Answer Display Chip ──────────────────────────────────────────────────────

export const QAnswerDisplay = styled.div`
  min-height: 38px;
  padding: 7px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.pageBg};
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;

  .chip {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 20px;
    background: rgba(16, 185, 129, 0.1);
    color: ${({ theme }) => theme.colors.success};
    border: 1px solid ${({ theme }) => theme.colors.success}33;
    font-size: 12px;
    font-weight: 700;
  }

  .hint {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textHint};
    font-style: italic;
  }
`;

// ─── Disclaimer ───────────────────────────────────────────────────────────────

export const QDisclaimer = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px 14px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.subtitle};
  background: ${({ theme }) => theme.colors.gold_bg};
  border: 1px solid ${({ theme }) => theme.colors.gold}33;
  border-radius: ${({ theme }) => theme.radius};

  svg {
    color: ${({ theme }) => theme.colors.gold};
    flex-shrink: 0;
    font-size: 14px;
  }
`;

// ─── Footer / Actions ─────────────────────────────────────────────────────────

export const QFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 18px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
`;

export const QCancelBtn = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.subtitle};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fontSerif};
  transition: color 0.15s, border-color 0.15s, background 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    border-color: ${({ theme }) => theme.colors.borderStrong};
    background: ${({ theme }) => theme.colors.pageBg};
  }
`;

export const QSubmitBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 22px;
  border-radius: ${({ theme }) => theme.radius};
  border: none;
  background: ${({ theme }) => theme.addButtonBg};
  color: #fff;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontSerif};
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: ${({ theme }) => theme.shadowSm};

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadowMd};
  }

  &:active {
    transform: translateY(0);
  }
`;
