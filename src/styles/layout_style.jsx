import styled from "styled-components";

export const MainContainer = styled.div`
  margin: 0 auto;
  padding: 28px 40px;
  background: ${({ $t }) => $t?.pageBg ?? "#F3F3F3"};
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
  color: ${({ $t }) => $t?.textPrimary ?? "#0D0D0D"};
  margin: 0;
  font-family: ${({ $t }) => $t?.fontSerif ?? "Georgia, serif"};
  letter-spacing: -0.01em;
`;

export const PageSubtitle = styled.p`
  font-size: 14px;
  color: ${({ $t }) => $t?.textMuted ?? "#6B6B6B"};
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
  border-top: 1px solid ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
  margin: 22px 0;
`;
