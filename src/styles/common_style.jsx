import styled, { keyframes } from "styled-components";

import { useTheme } from "../theme/theme";

import { NavLink } from "react-router-dom";

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
  color: ${({color})=>color.error};
  margin: 0;
  font-family: ${({theme})=>theme.fontSerif};
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: ${({theme})=>theme.colors.textPrimary};
  margin: 0 0 6px;
  font-family:  ${({theme})=>theme.fontSerif};
`;

export const CommonHeading = styled.h3`
  font-size: 13px;
  font-weight: 600;
  width:200px;
  color: ${({theme})=>theme.colors.textPrimary};
  
`;

export const Loader = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2.5px solid  ${({theme})=>theme.colors.border};
  border-top-color: transparent;
  animation: ${spin} 0.75s linear infinite;
  vertical-align: middle;
`;

export const Required = styled.span`
  font-size: 13px;
  color:${({theme})=>theme.colors.error};
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
  background: ${({theme})=>theme.colors.surface};
  padding: 40px 20px;
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 12px;
  border: none;
  border-radius: ${({theme})=>theme.radius};
  color: ${({theme})=>theme.colors.textPrimary};
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  &:hover  {
    opacity: 0.85;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({theme})=>theme.colors.boxShadow};
  }
  &:active { transform: translateY(0); opacity: 1; box-shadow: none; }
  &:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }
`;
export const AssignButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 12px;
  border: none;
  border-radius: ${({theme})=>theme.radius};
  background:${({theme})=>theme.colors.headerBackground};
  color: ${({theme})=>theme.colors.surface};
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  &:hover  {
    opacity: 0.85;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({theme})=>theme.colors.boxShadow};
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
  border-radius: ${({theme})=>theme.radius};
  flex-direction: column;
  gap: 12px;
  animation: ${fadeIn} 0.3s ease both;
`;

export const CommonHeader = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  width: 100%;
  background: ${({theme})=>theme.colors.surface};
  padding: 12px 18px;
  border-radius:${({theme})=>theme.radius};
  border: 1px solid ${({theme})=>theme.colors.border};
  box-shadow: ${({theme})=>theme.shadowSm};
`;

export const ExamCommonHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background: ${({theme})=>theme.colors.surface};
  width:100%;
  padding: 12px 18px;
  border-radius:${({theme})=>theme.radius};
  border: 1px solid ${({theme})=>theme.colors.border};
  box-shadow: ${({theme})=>theme.shadowSm};
`;

export const CommonSection = styled.section`
  margin-top: 16px;
  border-radius: ${({theme})=>theme.radius};
  width: 100%;
  animation: ${fadeIn} 0.25s ease both;
`;

export const CommonTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TableRow = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  background: ${({theme}) => theme.colors.surface};
  padding: 14px 18px;
  border-radius: ${({theme})=>theme.radius};
  border: 1px solid ${({theme})=>theme.colors.border};
  box-shadow: ${({theme})=>theme.shadowSm};
  gap: 10px;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
  &:hover {
    border-color: ${({theme})=>theme.colors.borderHover};
    box-shadow: ${({theme})=>theme.colors.shadowMd};
    transform: translateY(-1px);
  }
`;

export const ExamTableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items:center;
  background: ${({theme}) => theme.colors.surface};
  padding: 14px 18px;
  border-radius: ${({theme})=>theme.radius};
  border: 1px solid ${({theme})=>theme.colors.border};
  box-shadow: ${({theme})=>theme.shadowSm};
  gap: 10px;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
  &:hover {
    border-color: ${({theme})=>theme.colors.borderHover};
    box-shadow: ${({theme})=>theme.colors.shadowMd};
    transform: translateY(-1px);
  }
`;
export const TableHeading = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme})=>theme.colors.textPrimary};
  margin: 0;
`;

export const Content = styled.p`
  text-align:left;
  font-weight: 500;
  font-size: 13px;
  color:${({theme})=>theme.colors.textSecondary};
  
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  width:250px;
  justify-content:end;
`;

export const EmptyContent = styled.p`
  font-weight: 500;
  font-size: 15px;
  text-align: center;
  color: ${({theme})=>theme.colors.subtitle};
  flex: 1;
  padding: 2.5rem 0;
`;

export const Dropdown = styled.select`
  padding: 9px 12px;
  border-radius: ${({theme})=>theme.radius};
  border: 1.5px solid ${({theme})=>theme.colors.border};
  background: ${({theme})=>theme.colors.cream};
  color:${({theme})=>theme.colors.textPrimary};
  font-size: 13px;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:hover { border-color: ${({theme})=>theme.colors.borderHover}; }
  &:focus {
    border-color: ${({theme})=>theme.colors.border};
    box-shadow: 0 0 0 3px ${({theme})=>theme.colors.boxShadow};
  }
`;

export const AnswerContainer = styled.div`
  width: 100%;
  padding: 14px 20px;
  margin-top: 2px;
  border-radius: ${({theme})=>theme.radius};
  background: ${({theme})=>theme.colors.surface};
  border: 1px solid ${({theme})=>theme.colors.border};
  box-shadow: ${({theme})=>theme.shadowSm};
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
  color: ${({theme})=>theme.colors.subtitle};
  position: absolute;
  top: 70%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;
  &:hover { color:${({theme})=>theme.colors.textPrimary}; }
`;

//add button

export const AddButton=styled(NavLink)`
display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 5px 9px;
  border: none;
  border-radius: ${({theme})=>theme.radius};
  color: green;
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  &:hover  {
    opacity: 0.85;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({theme})=>theme.colors.boxShadow};
    background: ${({theme})=>theme.addButtonBg};
    color:#fff;
  }
`;

export const EditButton=styled(NavLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 5px 9px;
  border: none;
  border-radius: ${({theme})=>theme.radius};
  color: blue;
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  &:hover  {
    opacity: 0.85;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({theme})=>theme.colors.boxShadow};
    background: ${({theme})=>theme.editButtonBg};
    color:#fff;
  }
`;
export const DeleteButton=styled(NavLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 9px;
  border: none;
  border-radius: ${({theme})=>theme.radius};
  color:${({theme})=>theme.colors.error};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  &:hover  {
    opacity: 0.85;
    transform: translateY(-1px);
    background: ${({theme})=>theme.deleteButtonBg};
    color: #fff;
  }
`;


export const ExamContainer=styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;

  max-height: 220px;
  overflow-y: auto;
  padding: 10px;
  margin-bottom:10px;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.cream};
  box-shadow: ${({ theme }) => theme.shadowLg};
`;

export const Card=styled.div`
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius};

  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #ffffff;

  box-shadow: ${({ theme }) => theme.shadowSm};

  transition: all 0.25s ease;

  display: flex;
  flex-direction: column;
  gap: 6px;

  cursor: pointer;
`;

export const ExamHeader=styled.p`
   font-weight: 600;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};

  display: flex;
  justify-content: space-between;
  align-items: center;
  
  `;
export const ExamContent=styled.span`
  font-weight: 600;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;



export const Navlink=styled(NavLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 12px;
  border: none;
  border-radius: ${({theme})=>theme.radius};
  color:${({theme})=>theme.colors.textSecondary};
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  &:hover  {
    opacity: 0.85;
    transform: translateY(-1px);
    background:${({theme})=>theme.colors.textPrimary};
    color: ${({theme})=>theme.colors.surface};
  }
`;

