import styled, { keyframes } from "styled-components";

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.93); }
  to   { opacity: 1; transform: scale(1); }
`;

// ─── Page Wrapper ─────────────────────────────────────────────────────────────

export const BulkUploadPage = styled.div`
  padding: 32px 40px 60px;
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 60px - 58px);
  font-family: ${({ theme }) => theme.fontSerif};

  @media (max-width: 768px) {
    padding: 20px 16px 40px;
  }
`;

// ─── Page Header ──────────────────────────────────────────────────────────────

export const BulkPageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const BulkPageTitle = styled.h1`
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

// ─── Panel Card ───────────────────────────────────────────────────────────────

export const BulkPanel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowSm};
  overflow: hidden;
  max-width: 600px;
  animation: ${scaleIn} 0.35s ease 0.1s both;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMd};
  }
`;

export const BulkPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
`;

export const BulkPanelTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const BulkPanelIconBox = styled.div`
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

export const BulkPanelTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const BulkPanelBody = styled.div`
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${fadeUp} 0.4s ease 0.15s both;
`;

// ─── File Drop Zone ───────────────────────────────────────────────────────────

export const DropZone = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 32px 20px;
  border: 2px dashed ${({ $hasFile, theme }) => $hasFile ? "#10B981" : theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ $hasFile, theme }) => $hasFile ? "#ECFDF5" : theme.colors.background};
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: #3B82F6;
    background: #EFF6FF;
  }

  svg {
    font-size: 28px;
    color: ${({ $hasFile }) => $hasFile ? "#10B981" : "#94A3B8"};
    transition: color 0.2s;
  }
`;

export const DropZoneText = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
`;

export const DropZoneSubText = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.subtitle};
  text-align: center;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const FileName = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #059669;
  background: #D1FAE5;
  padding: 4px 12px;
  border-radius: 20px;
  margin-top: 4px;
`;

// ─── Action Row ───────────────────────────────────────────────────────────────

export const BulkActionRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

export const BulkPrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const BulkSecondaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontSerif};
  transition: background 0.15s, border-color 0.15s, transform 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.borderStrong};
    transform: translateY(-1px);
  }
`;

// ─── Error / Success Messages ─────────────────────────────────────────────────

export const BulkErrorMsg = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #DC2626;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: ${({ theme }) => theme.radius};
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${fadeUp} 0.25s ease both;
`;

export const BulkSuccessMsg = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #059669;
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  border-radius: ${({ theme }) => theme.radius};
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${fadeUp} 0.25s ease both;
`;

// ─── Divider ──────────────────────────────────────────────────────────────────

export const BulkDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 4px 0;
`;
