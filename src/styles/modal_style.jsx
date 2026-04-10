import styled, { keyframes } from "styled-components";

const fadeIn  = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(18px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: ${({theme})=>theme.colors.overlay};
  backdrop-filter: blur(3px);
  z-index: ${({theme})=>theme.zindex};
  animation: ${fadeIn} 0.2s ease;
`;

export const ModalContainer = styled.div`
  width: 380px;
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: ${({theme})=>theme.radius};
  background: ${({theme})=>theme.colors.surface};
  border: 1px solid ${({theme})=>theme.colors.border};
  box-shadow: ${({theme})=>theme.shadowModal};
  animation: ${slideUp} 0.25s ease;
  text-align: center;
`;

export const ModalIconWrap = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({theme})=>theme.colors.cream};
  border: 1px solid ${({theme})=>theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 4px;
`;

export const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({theme})=>theme.colors.textPrimary};
  margin: 0;
  font-family: ${({theme})=>theme.fontSerif};
`;

export const Message = styled.p`
  font-size: 13px;
  color: ${({theme})=>theme.colors.subtitle};
  line-height: 1.6;
  margin: 0;
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ModalPrimaryBtn = styled.button`
  padding: 10px 22px;
  border-radius:${({theme})=>theme.radius};
  border: none;
  background: ${({theme})=>theme.buttonBg};
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  &:hover { opacity: 0.85; transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`;

export const ModalGhostBtn = styled.button`
  padding: 10px 22px;
  border-radius: ${({theme})=>theme.radius};
  border: 1px solid ${({theme})=>theme.colors.borderHover};
  background: none;
  color: ${({theme})=>theme.colors.subtitle};
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  &:hover {
    background: ${({theme})=>theme.colors.cream};
    color: ${({theme})=>theme.colors.textPrimary};
    border-color: ${({theme})=>theme.colors.borderStrong};
  }
`;
