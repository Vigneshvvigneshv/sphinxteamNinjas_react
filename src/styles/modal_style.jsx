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
  background: ${({ $t }) => $t?.overlay ?? "rgba(0,0,0,0.65)"};
  backdrop-filter: blur(3px);
  z-index: ${({ $t }) => $t?.zOverlay ?? 1000};
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
  border-radius: ${({ $t }) => $t?.radiusCard ?? "14px"};
  background: ${({ $t }) => $t?.surface ?? "#fff"};
  border: 1px solid ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
  box-shadow: ${({ $t }) => $t?.shadowModal ?? "0 24px 48px rgba(0,0,0,0.18)"};
  animation: ${slideUp} 0.25s ease;
  text-align: center;
`;

export const ModalIconWrap = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ $t }) => $t?.goldPale ?? "#F7F7F7"};
  border: 1px solid ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 4px;
`;

export const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ $t }) => $t?.textPrimary ?? "#0D0D0D"};
  margin: 0;
  font-family: ${({ $t }) => $t?.fontSerif ?? "Georgia, serif"};
`;

export const Message = styled.p`
  font-size: 13px;
  color: ${({ $t }) => $t?.textMuted ?? "#6B6B6B"};
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
  border-radius: ${({ $t }) => $t?.radiusMd ?? "8px"};
  border: none;
  background: ${({ $t }) => $t?.buttonBg ?? "linear-gradient(135deg,#3A3A3A,#0D0D0D)"};
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
  border-radius: ${({ $t }) => $t?.radiusMd ?? "8px"};
  border: 1px solid ${({ $t }) => $t?.borderHover ?? "rgba(0,0,0,0.22)"};
  background: none;
  color: ${({ $t }) => $t?.textMuted ?? "#6B6B6B"};
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  &:hover {
    background: ${({ $t }) => $t?.goldPale ?? "#F7F7F7"};
    color: ${({ $t }) => $t?.textPrimary ?? "#0D0D0D"};
    border-color: ${({ $t }) => $t?.borderStrong ?? "rgba(0,0,0,0.40)"};
  }
`;
