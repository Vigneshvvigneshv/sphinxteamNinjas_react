import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─── Page Wrapper ─────────────────────────────────────────────────────────────

export const FormPageWrap = styled.div`
  padding: 32px 40px 60px;
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 60px - 58px);
  font-family: ${({ theme }) => theme.fontSerif};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px 16px 40px;
  }
`;

// ─── Card ─────────────────────────────────────────────────────────────────────

export const FormCard = styled.div`
  width: 100%;
  max-width: 520px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowLg};
  padding: 36px 40px 40px;
  animation: ${fadeUp} 0.38s ease both;

  @media (max-width: 600px) {
    padding: 24px 20px 28px;
  }
`;

// ─── Card top ─────────────────────────────────────────────────────────────────

export const FormCardEyebrow = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 6px;
`;

export const FormCardTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 6px;
  letter-spacing: -0.3px;
`;

export const FormCardSubtitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 0 0 28px;
  line-height: 1.6;
`;

export const FormDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0 0 24px;
`;

// ─── Field ────────────────────────────────────────────────────────────────────

export const FField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
  position: relative;
`;

export const FLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 6px;
  letter-spacing: 0.01em;

  &::after {
    content: " *";
    color: ${({ theme }) => theme.colors.error};
    font-size: 11px;
  }
`;

export const FLabelOptional = styled(FLabel)`
  &::after { content: ""; }
`;

export const FInput = styled.input`
  padding: 9px 13px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;

  &::placeholder { color: ${({ theme }) => theme.colors.textHint}; }
  &:hover { border-color: ${({ theme }) => theme.colors.borderHover}; }
  &:focus {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
    background: ${({ theme }) => theme.colors.surface};
  }
  &:disabled { opacity: 0.42; cursor: not-allowed; }
`;

export const FSelect = styled.select`
  padding: 9px 13px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover { border-color: ${({ theme }) => theme.colors.borderHover}; }
  &:focus {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
  }
`;

export const FTextarea = styled.textarea`
  padding: 9px 13px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-family: inherit;
  outline: none;
  resize: vertical;
  min-height: 90px;
  line-height: 1.6;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;

  &::placeholder { color: ${({ theme }) => theme.colors.textHint}; }
  &:hover { border-color: ${({ theme }) => theme.colors.borderHover}; }
  &:focus {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const FError = styled.p`
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.error};
  font-weight: 500;
  margin: 5px 0 0;
  line-height: 1.4;
`;

// ─── Submit button ────────────────────────────────────────────────────────────

export const FSubmitBtn = styled.button`
  width: 100%;
  margin-top: 8px;
  padding: 11px;
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.headerBackground};
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.01em;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.18s, box-shadow 0.2s;

  &:hover {
    opacity: 0.88;
    transform: translateY(-2px);
    box-shadow: 0 8px 22px ${({ theme }) => theme.colors.boxShadow};
  }
  &:active { transform: translateY(0); opacity: 1; box-shadow: none; }
  &:disabled { opacity: 0.38; cursor: not-allowed; transform: none; box-shadow: none; }
`;

// ─── Back / cancel link ───────────────────────────────────────────────────────

export const FBackBtn = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.subtitle};
  text-decoration: none;
  transition: color 0.15s;

  &:hover { color: ${({ theme }) => theme.colors.textPrimary}; }
`;

// ─── Two-column grid for scoring rows ─────────────────────────────────────────

export const FRow = styled.div`
  display: grid;
  grid-template-columns: ${({ $cols }) => $cols || '1fr 1fr'};
  gap: 14px;
`;

// ══════════════════════════════════════════════════════════════════════════════
//  Question form extras  (used only in AddEditQuestionPage)
// ══════════════════════════════════════════════════════════════════════════════

export const QFormWrap = styled.div`
  padding: 32px 40px 60px;
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 60px - 58px);
  font-family: ${({ theme }) => theme.fontSerif};

  @media (max-width: 768px) { padding: 20px 16px 40px; }
`;

export const QFormConfigPanel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 18px 22px;
  display: flex;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
  box-shadow: ${({ theme }) => theme.shadowSm};
  margin-bottom: 18px;
  animation: ${fadeUp} 0.35s ease both;
`;

export const QFormConfigGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 160px;
`;

export const QFormConfigLabel = styled.label`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: ${({ theme }) => theme.colors.subtitle};
`;

export const QFormConfigSelect = styled.select`
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  min-width: ${({ $minWidth }) => $minWidth || '160px'};
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
  }
`;

export const QFormTopicBadge = styled.div`
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  min-width: 160px;
`;

export const QFormBody = styled.div`
  display: flex;
  gap: 18px;
  align-items: flex-start;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.4s ease 0.07s both;
`;

export const QFormLeft = styled.div`
  flex: 1;
  min-width: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadowSm};
`;

export const QFormRight = styled.div`
  width: 280px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 22px;
  box-shadow: ${({ theme }) => theme.shadowSm};
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 900px) { width: 100%; }
`;

export const QFormSectionLabel = styled.p`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 0 0 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const QFormOptionsBox = styled.div`
  margin-top: 20px;
  padding: 18px;
  background: ${({ theme }) => theme.colors.cream};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
`;

export const QFormOptionsSectionLabel = styled.p`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 0 0 14px;
`;

export const QFormDisclaimer = styled.p`
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 0;
  font-weight: 500;
  line-height: 1.6;
`;

export const QFormTextarea = styled.textarea`
  padding: 10px 13px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-family: inherit;
  outline: none;
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;

  &::placeholder { color: ${({ theme }) => theme.colors.textHint}; }
  &:hover { border-color: ${({ theme }) => theme.colors.borderHover}; }
  &:focus {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const QFormActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const QFormSubmitBtn = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.headerBackground};
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;

  &:hover { opacity: 0.88; transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`;

export const QFormCancelBtn = styled(NavLink)`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.subtitle};
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.cream};
    color: ${({ theme }) => theme.colors.textPrimary};
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`;
