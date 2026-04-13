import styled from "styled-components";

export const FooterContainer = styled.div`
  background: ${({ theme }) => theme.colors.headerBackground};
  padding: 20px 28px;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

export const FooterText = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  margin: 0;
  position: relative;
  z-index: 1;
  letter-spacing: 0.01em;
  line-height: 1.6;
  strong {
    color: ${({ theme }) => theme.colors.cream};
    font-weight: 600;
  }
`;

export const FooterDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
  margin-bottom: 16px;
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 14px;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
`;

export const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.38);
  font-size: 12px;
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: color 0.2s ease;
  &:hover { color: rgba(255, 255, 255, 0.78); }
`;
