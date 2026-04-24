import styled, { keyframes } from "styled-components";

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─── Page Wrapper ─────────────────────────────────────────────────────────────

export const AssignPageWrap = styled.div`
  padding: 32px 40px 60px;
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 60px - 58px);
  font-family: ${({ theme }) => theme.fontSerif};

  @media (max-width: 768px) {
    padding: 20px 16px 40px;
  }
`;

// ─── Page Header ──────────────────────────────────────────────────────────────

export const AssignPageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 12px;
  animation: ${fadeUp} 0.35s ease both;
`;

export const AssignPageTitle = styled.h1`
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

export const AssignPageActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

// ─── Buttons ──────────────────────────────────────────────────────────────────

export const HeaderBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  padding: 9px 16px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontSerif};
  transition: background 0.15s, color 0.15s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.pageBg};
    border-color: ${({ theme }) => theme.colors.borderStrong};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadowSm};
  }
`;

export const AssignBtn = styled.button`
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

  &:hover:not(:disabled) {
    opacity: 0.88;
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadowMd};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

// ─── Section Panel ────────────────────────────────────────────────────────────

export const SectionPanel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowSm};
  overflow: hidden;
  margin-bottom: 18px;
  animation: ${fadeUp} 0.4s ease ${({ $delay }) => $delay || "0s"} both;
  transition: box-shadow 0.2s;

  &:hover { box-shadow: ${({ theme }) => theme.shadowMd}; }
`;

export const SectionPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
`;

export const SectionTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SectionIconBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ $bg }) => $bg || "#EFF6FF"};
  color: ${({ $color }) => $color || "#3B82F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
`;

export const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const SectionCount = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subtitle};
  background: ${({ theme }) => theme.colors.border};
  padding: 2px 8px;
  border-radius: 20px;
`;

// ─── Collapsible ──────────────────────────────────────────────────────────────

export const CollapsibleBody = styled.div`
  animation: ${slideDown} 0.25s ease both;
`;

export const SectionBody = styled.div`
  max-height: 420px;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderStrong};
    border-radius: 4px;
  }
`;

// ─── Assigned User Row ────────────────────────────────────────────────────────

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.15s;
  animation: ${fadeUp} 0.3s ease ${({ $delay }) => $delay || "0s"} both;

  &:last-child { border-bottom: none; }
  &:hover { background: ${({ theme }) => theme.colors.pageBg}; }
`;

// ─── Unassigned User Row (checkbox + info + inline attempt/day fields) ─────────

export const UnassignedRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.15s;
  animation: ${fadeUp} 0.3s ease ${({ $delay }) => $delay || "0s"} both;

  &:last-child { border-bottom: none; }
  &:hover { background: ${({ theme }) => theme.colors.pageBg}; }

  @media (max-width: 640px) {
    flex-wrap: wrap;
  }
`;

export const UserCheckbox = styled.input`
  width: 15px;
  height: 15px;
  accent-color: ${({ theme }) => theme.addButtonBg};
  cursor: pointer;
  flex-shrink: 0;
`;

export const UserAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg || "#EFF6FF"};
  color: ${({ $color }) => $color || "#3B82F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
  border: 2px solid ${({ $border }) => $border || "#DBEAFE"};
  text-transform: uppercase;
`;

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UserFullName = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserLoginId = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 0;
`;

// ─── Inline Input Fields (attempts / timeout) ─────────────────────────────────

export const InlineFields = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;
  align-items: flex-end;

  @media (max-width: 640px) {
    width: 100%;
    padding-left: 27px;
  }
`;

export const InlineFieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const InlineFieldLabel = styled.label`
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textHint};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
`;

export const InlineFieldInput = styled.input`
  width: 78px;
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder { color: ${({ theme }) => theme.colors.textHint}; }

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  &[type=number] { -moz-appearance: textfield; }
`;

// ─── Meta Chips ───────────────────────────────────────────────────────────────

export const MetaChip = styled.span`
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

  svg { font-size: 10px; opacity: 0.8; }
`;

// ─── Row Actions ──────────────────────────────────────────────────────────────

export const RowActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`;

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

export const RowIconBtn = styled.button`
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

  &.edit:hover {
    color: #2563eb;
    background: #eff6ff;
    border-color: #bfdbfe;
    transform: translateY(-1px);
  }

  &.delete:hover {
    color: #dc2626;
    background: #fef2f2;
    border-color: #fecaca;
    transform: translateY(-1px);
  }
`;

// ─── Selection Bar ────────────────────────────────────────────────────────────

export const SelectionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background: #eff6ff;
  border-top: 1px solid #dbeafe;
  animation: ${fadeUp} 0.2s ease both;
`;

export const SelectionText = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #2563eb;
`;

// ─── Empty State ──────────────────────────────────────────────────────────────

export const SectionEmpty = styled.div`
  padding: 40px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textHint};

  svg { font-size: 26px; opacity: 0.3; }
  p { font-size: 13px; color: ${({ theme }) => theme.colors.subtitle}; margin: 0; }
`;

// ─── Modal ────────────────────────────────────────────────────────────────────

export const EditBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`;

export const EditModal = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowMd};
  padding: 24px;
  width: 100%;
  max-width: 420px;
  animation: ${scaleIn} 0.2s ease both;
`;

export const EditModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const EditModalTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const EditModalClose = styled.button`
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

export const EditModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
`;

export const EditFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const EditLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subtitle};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const EditInfoRow = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.pageBg};
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const EditInput = styled.input`
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

export const EditModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

export const CancelBtn = styled.button`
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

export const SaveBtn = styled.button`
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
