import styled from "styled-components";

export const MainContainer = styled.div`
  margin: 0 auto;
  padding: 28px 40px;
  background: ${({theme})=>theme.colors.background};
  min-height: calc(100vh - 58px - 56px);
  @media (max-width: 768px) { padding: 16px; }
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${({theme})=>theme.colors.textPrimary};
  margin: 0;
  font-family:${({theme})=>theme.fontSerif};
  letter-spacing: -0.01em;
`;

export const PageSubtitle = styled.p`
  font-size: 14px;
  color: ${({theme})=>theme.colors.subtitle};
  margin: 3px 0 0;
  line-height: 1.5;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({theme})=>theme.colors.border};
  margin: 22px 0;
`;
