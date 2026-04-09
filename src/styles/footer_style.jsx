import styled from "styled-components";

export const FooterContainer = styled.div`
  background: ${({ $t }) => $t?.headerBg ?? "linear-gradient(135deg,#141414,#000000)"};
  padding: 18px 24px;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.06);
`;

export const FooterText = styled.p`
  text-align: center;
  color: rgba(255,255,255,0.45);
  font-size: 12px;
  margin: 0;
  position: relative;
  z-index: 1;
  strong {
    color: ${({ $t }) => $t?.textLight ?? "#E8E8E8"};
    font-weight: 600;
  }
`;

export const FooterDivider = styled.div`
  height: 1px;
  background: rgba(255,255,255,0.07);
  margin-bottom: 14px;
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 22px;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
`;

export const FooterLink = styled.a`
  color: rgba(255,255,255,0.42);
  font-size: 12px;
  text-decoration: none;
  transition: color 0.2s;
  &:hover { color: rgba(255,255,255,0.80); }
`;
