import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
`;

// ─── Page Wrapper ─────────────────────────────────────────────────────────────

export const ExamTopicPage = styled.div`
  padding: 32px 40px 60px;
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 60px - 58px);
  font-family: ${({ theme }) => theme.fontSerif};

  @media (max-width: 768px) {
    padding: 20px 16px 40px;
  }
`;

// ─── Page Header ──────────────────────────────────────────────────────────────

export const ExamTopicHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 12px;
  animation: ${fadeUp} 0.35s ease both;
`;

export const ExamTopicTitle = styled.h1`
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

export const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const AddTopicBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  padding: 9px 16px;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.addButtonBg};
  color: #fff;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontSerif};
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadowMd};
  }
  &:active { transform: translateY(0); }
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }
`;

export const BackBtn = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  padding: 9px 16px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.subtitle};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontSerif};
  text-decoration: none;
  transition: background 0.15s, color 0.15s, border-color 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.pageBg};
    color: ${({ theme }) => theme.colors.textPrimary};
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

// ─── Stats Strip ──────────────────────────────────────────────────────────────

export const StatStrip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.38s ease 0.05s both;
`;

export const StatBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subtitle};
  box-shadow: ${({ theme }) => theme.shadowSm};

  svg {
    color: ${({ $iconColor }) => $iconColor || "#3B82F6"};
    font-size: 11px;
  }
`;

export const PercentBadge = styled(StatBadge)`
  color: ${({ $over }) => ($over ? "#DC2626" : $over === false ? "#059669" : undefined)};
  border-color: ${({ $over }) => ($over ? "#FECACA" : $over === false ? "#A7F3D0" : undefined)};
  background: ${({ $over }) => ($over ? "#FEF2F2" : $over === false ? "#ECFDF5" : undefined)};

  svg {
    color: ${({ $over }) => ($over ? "#DC2626" : "#059669")};
  }
`;

// ─── Panel ────────────────────────────────────────────────────────────────────

export const Panel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowSm};
  overflow: hidden;
  animation: ${scaleIn} 0.35s ease 0.1s both;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
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

// ─── Table ────────────────────────────────────────────────────────────────────

export const TableWrap = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.div`
  min-width: 600px;
`;

export const TableHead = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 90px;
  gap: 12px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.cream};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderStrong};
`;

export const TableHeadCell = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.subtitle};
  text-transform: uppercase;
  letter-spacing: 0.6px;
  text-align: ${({ $center }) => ($center ? "center" : "left")};
  text-align: ${({ $right }) => ($right ? "right" : undefined)};
`;

export const TableBody = styled.div``;

export const TableRowItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 90px;
  gap: 12px;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.15s;
  animation: ${fadeUp} 0.3s ease ${({ $delay }) => $delay || "0s"} both;

  &:last-child { border-bottom: none; }
  &:hover { background: ${({ theme }) => theme.colors.pageBg}; }
`;

// ─── Form Controls inside table ───────────────────────────────────────────────

export const SelectField = styled.select`
  width: 100%;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ $error }) => ($error ? "#EF4444" : "var(--border)")};
  border-color: ${({ $error, theme }) => ($error ? "#EF4444" : theme.colors.border)};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 30px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
  }
`;

export const NumberField = styled.input`
  width: 100%;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ $error, theme }) => ($error ? "#EF4444" : theme.colors.border)};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  text-align: center;

  &::placeholder { color: ${({ theme }) => theme.colors.textHint}; font-size: 12px; }

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  &[type=number] { -moz-appearance: textfield; }
`;

export const FieldError = styled.p`
  font-size: 11px;
  color: #EF4444;
  margin: 3px 0 0;
`;

// ─── Action buttons in row ────────────────────────────────────────────────────

export const RowActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 6px;
`;

export const IconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.subtitle};
  font-size: 12px;
  cursor: pointer;
  transition: color 0.15s, background 0.15s, border-color 0.15s, transform 0.12s;

  &.delete:hover {
    color: #DC2626;
    background: #FEF2F2;
    border-color: #FECACA;
    transform: translateY(-1px);
  }
`;

// ─── Empty state ──────────────────────────────────────────────────────────────

export const EmptyWrap = styled.div`
  padding: 52px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textHint};

  svg { font-size: 28px; opacity: 0.3; }
  p { font-size: 13px; color: ${({ theme }) => theme.colors.subtitle}; margin: 0; }
`;

// ─── Footer ───────────────────────────────────────────────────────────────────

export const PanelFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
  gap: 12px;
  flex-wrap: wrap;
`;

export const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const GenerateBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  padding: 9px 20px;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.addButtonBg};
  color: #fff;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontSerif};
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadowMd};
  }
  &:active { transform: translateY(0); }
`;

// ─── Error banner ─────────────────────────────────────────────────────────────

export const ErrorBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radius};
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #DC2626;
  font-size: 12px;
  font-weight: 600;
  margin: 0 20px 0;
`;
