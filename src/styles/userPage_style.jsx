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

export const UserPageWrap = styled.div`
  padding: 32px 40px 60px;
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 60px - 58px);
  font-family: ${({ theme }) => theme.fontSerif};

  @media (max-width: 768px) {
    padding: 20px 16px 40px;
  }
`;

// ─── Page Header ──────────────────────────────────────────────────────────────

export const UserPageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 12px;
  animation: ${fadeUp} 0.35s ease both;
`;

export const UserPageTitle = styled.h1`
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

// ─── Stats Strip ──────────────────────────────────────────────────────────────

export const UserStatStrip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 22px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.38s ease 0.05s both;
`;

export const UserStatBadge = styled.div`
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

// ─── Search Bar ───────────────────────────────────────────────────────────────

export const UserSearchWrap = styled.div`
  position: relative;
  margin-bottom: 22px;
  max-width: 340px;
  animation: ${fadeUp} 0.38s ease 0.08s both;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textHint};
    font-size: 13px;
    pointer-events: none;
  }
`;

export const UserSearchInput = styled.input`
  width: 100%;
  padding: 9px 12px 9px 34px;
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

// ─── User Grid ────────────────────────────────────────────────────────────────

export const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  animation: ${scaleIn} 0.35s ease 0.1s both;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// ─── User Card ────────────────────────────────────────────────────────────────

export const UserCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowSm};
  animation: ${fadeUp} 0.35s ease ${({ $delay }) => $delay || "0s"} both;
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
    opacity: 0.75;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMd};
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

// ─── Card Top (avatar + name + actions) ──────────────────────────────────────

export const UserCardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px 12px;
`;

export const UserAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg || "#EFF6FF"};
  color: ${({ $color }) => $color || "#3B82F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
  border: 2px solid ${({ $border }) => $border || "#DBEAFE"};
  text-transform: uppercase;
`;

export const UserCardInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UserName = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserMeta = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserCardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`;

// ─── Tooltip ─────────────────────────────────────────────────────────────────

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;

  &:hover > span { opacity: 1; }
`;

export const TooltipChip = styled.span`
  position: absolute;
  bottom: calc(100% + 6px);
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
  letter-spacing: 0.03em;
  z-index: 20;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: ${({ theme }) => theme.colors.headerBackground};
  }
`;

export const ActionIconBtn = styled.button`
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
  flex-shrink: 0;

  &.assign:hover {
    color: #059669;
    background: #ecfdf5;
    border-color: #a7f3d0;
    transform: translateY(-1px);
  }

  &.delete:hover {
    color: #dc2626;
    background: #fef2f2;
    border-color: #fecaca;
    transform: translateY(-1px);
  }
`;

// ─── Card Divider ─────────────────────────────────────────────────────────────

export const CardDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 0 18px;
`;

// ─── Assigned Exams Section inside card ──────────────────────────────────────

export const CardExamsWrap = styled.div`
  padding: 10px 18px 14px;
`;

export const CardExamsLabel = styled.p`
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textHint};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 8px;
`;

export const ExamTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export const ExamTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  background: ${({ $bg }) => $bg || "#EFF6FF"};
  color: ${({ $color }) => $color || "#2563EB"};
  border: 1px solid ${({ $border }) => $border || "#DBEAFE"};
  white-space: nowrap;

  svg { font-size: 9px; opacity: 0.8; }
`;

export const NoExamsText = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textHint};
  margin: 0;
  font-style: italic;
`;

// ─── Role Badge ───────────────────────────────────────────────────────────────

export const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  background: ${({ $bg }) => $bg || "#EFF6FF"};
  color: ${({ $color }) => $color || "#2563EB"};
  border: 1px solid ${({ $border }) => $border || "#DBEAFE"};
  white-space: nowrap;
  flex-shrink: 0;
`;

// ─── Empty State ──────────────────────────────────────────────────────────────

export const UserEmptyWrap = styled.div`
  grid-column: 1 / -1;
  padding: 60px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textHint};

  svg { font-size: 32px; opacity: 0.3; }
  p { font-size: 13px; color: ${({ theme }) => theme.colors.subtitle}; margin: 0; }
`;

// ─── Assign Modal ─────────────────────────────────────────────────────────────

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const AssignModal = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowMd};
  padding: 24px;
  width: 100%;
  max-width: 460px;
  animation: ${scaleIn} 0.2s ease both;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ModalTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const ModalClose = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.subtitle};
  font-size: 12px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #fef2f2;
    color: #dc2626;
    border-color: #fecaca;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
`;

export const ModalFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ModalLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subtitle};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const ModalInfoRow = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.pageBg};
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ModalInput = styled.input`
  padding: 9px 12px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  &[type=number] { -moz-appearance: textfield; }
`;

export const ModalSelect = styled.select`
  padding: 9px 12px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
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
  background-position: right 12px center;
  padding-right: 34px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

export const ModalCancelBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.subtitle};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontSerif};
  transition: background 0.15s, color 0.15s, border-color 0.15s;

  &:hover {
    background: #fef2f2;
    color: #dc2626;
    border-color: #fecaca;
  }
`;

export const ModalSaveBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
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
`;
