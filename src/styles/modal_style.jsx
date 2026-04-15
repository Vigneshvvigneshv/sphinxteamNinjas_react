import styled, { keyframes } from "styled-components";

const fadeIn  = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
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
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: ${({ theme }) => theme.zindex};
  animation: ${fadeIn} 0.2s ease;
`;

export const ModalContainer = styled.div`
  width: 400px;
  padding: 40px 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadowModal};
  animation: ${slideUp} 0.26s ease;
  text-align: center;
`;

export const ModalIconWrap = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.cream};
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 4px;
`;

export const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  font-family: ${({ theme }) => theme.fontSerif};
  line-height: 1.3;
`;

export const Message = styled.p`
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.subtitle};
  line-height: 1.65;
  margin: 0;
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ModalPrimaryBtn = styled.button`
  padding: 10px 24px;
  border-radius: ${({ theme }) => theme.radius};
  border: none;
  background: ${({ theme }) => theme.buttonBg};
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.18s ease;
  &:hover { opacity: 0.88; transform: translateY(-2px); }
  &:active { transform: translateY(0); }
`;

export const ModalGhostBtn = styled.button`
  padding: 10px 24px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: none;
  color: ${({ theme }) => theme.colors.subtitle};
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.cream};
    color: ${({ theme }) => theme.colors.textPrimary};
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`;
