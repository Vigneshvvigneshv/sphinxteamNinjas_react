import styled, { keyframes } from "styled-components";
import { useTheme } from "../theme/theme";

export { useTheme };

const spin = keyframes`to { transform: rotate(360deg); }`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─────────────────────────────────────────────────────────────
// USAGE PATTERN
//   const MyComp = () => {
//     const theme = useTheme();
//     return <Title $t={theme}>Hello</Title>;
//   };
// ─────────────────────────────────────────────────────────────

export const AppName = styled.h1`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: ${({ $t }) => $t?.textLight ?? "#E8E8E8"};
  margin: 0;
  font-family: ${({ $t }) => $t?.fontSerif ?? "Georgia, serif"};
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: ${({ $t }) => $t?.textPrimary ?? "#0D0D0D"};
  margin: 0 0 6px;
  font-family: ${({ $t }) => $t?.fontSerif ?? "Georgia, serif"};
`;

export const CommonHeading = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ $t }) => $t?.textPrimary ?? "#0D0D0D"};
  margin: 0;
`;

export const Loader = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2.5px solid ${({ $t }) => $t?.goldLight ?? "#3D3D3D"};
  border-top-color: transparent;
  animation: ${spin} 0.75s linear infinite;
  vertical-align: middle;
`;

export const Required = styled.span`
  font-size: 13px;
  color: ${({ $t }) => $t?.danger ?? "#C62828"};
  display: inline;
  margin-left: 2px;
  font-weight: 600;
`;

export const Outer = styled.div`
  text-align: center;
`;

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  background: ${({ $t }) => $t?.loginBg ?? "linear-gradient(160deg,#FFFFFF,#EFEFEF)"};
  padding: 40px 20px;
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: ${({ $t }) => $t?.radiusMd ?? "8px"};
  background: ${({ $t }) => $t?.buttonBg ?? "linear-gradient(135deg,#3A3A3A,#0D0D0D)"};
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  &:hover  {
    opacity: 0.85;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.18);
  }
  &:active { transform: translateY(0); opacity: 1; box-shadow: none; }
  &:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }
`;

export const Container = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const RowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const CommonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ $t }) => $t?.radiusCard ?? "14px"};
  flex-direction: column;
  gap: 12px;
  animation: ${fadeIn} 0.3s ease both;
`;

export const CommonHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: ${({ $t }) => $t?.surface ?? "#fff"};
  padding: 12px 18px;
  border-radius: ${({ $t }) => $t?.radiusLg ?? "12px"};
  border: 1px solid ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
  box-shadow: ${({ $t }) => $t?.shadowSm};
`;

export const CommonSection = styled.section`
  margin-top: 16px;
  border-radius: ${({ $t }) => $t?.radiusLg ?? "12px"};
  width: 100%;
  animation: ${fadeIn} 0.25s ease both;
`;

export const CommonTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TableRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background: ${({ $t }) => $t?.surface ?? "#fff"};
  padding: 14px 18px;
  border-radius: ${({ $t }) => $t?.radiusLg ?? "12px"};
  border: 1px solid ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
  box-shadow: ${({ $t }) => $t?.shadowSm};
  gap: 10px;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
  &:hover {
    border-color: ${({ $t }) => $t?.borderHover ?? "rgba(0,0,0,0.22)"};
    box-shadow: ${({ $t }) => $t?.shadowMd};
    transform: translateY(-1px);
  }
`;

export const TableHeading = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: ${({ $t }) => $t?.textPrimary ?? "#0D0D0D"};
  margin: 0;
`;

export const Content = styled.p`
  width: 180px;
  font-weight: 500;
  font-size: 13px;
  color: ${({ $t }) => $t?.textSecondary ?? "#3A3A3A"};
  margin: 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  flex-wrap: wrap;
  button { padding: 7px 13px; font-size: 12px; }
`;

export const EmptyContent = styled.p`
  font-weight: 500;
  font-size: 15px;
  text-align: center;
  color: ${({ $t }) => $t?.textMuted ?? "#6B6B6B"};
  flex: 1;
  padding: 2.5rem 0;
`;

export const Dropdown = styled.select`
  padding: 9px 12px;
  border-radius: ${({ $t }) => $t?.radiusMd ?? "8px"};
  border: 1.5px solid ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
  background: ${({ $t }) => $t?.cream ?? "#FAFAFA"};
  color: ${({ $t }) => $t?.textPrimary ?? "#0D0D0D"};
  font-size: 13px;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:hover { border-color: ${({ $t }) => $t?.borderHover}; }
  &:focus {
    border-color: ${({ $t }) => $t?.gold};
    box-shadow: 0 0 0 3px ${({ $t }) => $t?.goldFocus};
  }
`;

export const AnswerContainer = styled.div`
  width: 100%;
  padding: 14px 20px;
  margin-top: 2px;
  border-radius: ${({ $t }) => $t?.radiusLg ?? "12px"};
  background: ${({ $t }) => $t?.goldPale ?? "#F7F7F7"};
  border: 1px solid ${({ $t }) => $t?.border};
  box-shadow: ${({ $t }) => $t?.shadowSm};
`;

export const AnswerOption = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PasswordEye = styled.span`
  font-weight: 700;
  font-size: 13px;
  color: ${({ $t }) => $t?.textMuted ?? "#6B6B6B"};
  position: absolute;
  top: 70%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;
  &:hover { color: ${({ $t }) => $t?.textPrimary ?? "#0D0D0D"}; }
`;
