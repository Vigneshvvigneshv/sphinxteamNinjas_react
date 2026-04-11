import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 0.3s ease;
`;

export const ProgressWrap = styled.div`
  background: ${({theme})=>theme.colors.border}};
  border-radius: 999px;
  height: 5px;
  overflow: hidden;
  margin-bottom: 14px;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${({ percent }) => percent ?? 0}%;
  background: ${({ $t }) => $t?.progressBg ?? "linear-gradient(90deg,#4A4A4A,#111111)"};
  border-radius: 999px;
  transition: width 0.4s ease;
`;

export const ProgressLabel = styled.p`
  font-size: 12px;
  color: ${({theme})=>theme.colors.subtitle};
  margin: 0 0 6px;
  font-weight: 500;
`;

export const QuestionHeaderContainer = styled.div`
  padding: 18px 22px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:5px;
  border-radius: ${({theme})=>theme.radius};
  background:${({theme})=>theme.colors.surface};
  border: 1px solid ${({theme})=>theme.colors.border};
  box-shadow: ${({theme})=>theme.shadowMd};
`;

export const QuestionTypeBadge = styled.span`
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: ${({theme})=>theme.colors.textSecondary};
  background:${({theme})=>theme.colors.cream};
  border: 1px solid ${({theme})=>theme.colors.border};
  padding: 3px 10px;
  border-radius: 999px;
  margin-bottom: 10px;
`;

export const QuestionText = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color:${({theme})=>theme.colors.textPrimary};
  margin: 0;
  line-height: 1.55;
  font-family:${({theme})=>theme.fontSerif};
`;

export const QuestionFormContainer = styled.div`
  padding: 24px;
  display:flex;
  flex-direction:column;
  border-radius: ${({theme})=>theme.radius};
  background:${({theme})=>theme.colors.surface};
  border: 1px solid ${({theme})=>theme.colors.border};
  box-shadow:${({theme})=>theme.shadowMd};
`;

export const QuestionFieldContainer = styled.div`
  display: flex;
  align-items: center;
  gap:10px;
  width:100%;
  padding: 9px 12px;
  border-radius: ${({theme})=>theme.radius};
  border: 1.5px solid ${({theme})=>theme.colors.border};
  // background:${({theme})=>theme.colors.cream};
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.15s, transform 0.15s;
  margin-bottom: 8px;
  &:hover {
    border-color:${({theme})=>theme.colors.borderHover}};
    background: #F4F4F4;
    transform: translateY(-1px);
    box-shadow: ${({theme})=>theme.shadowSm};
  }
  &.selected {
    border-color: ${({theme})=>theme.colors.textSecondary};
    background: ${({theme})=>theme.colors.cream};
    box-shadow: 0 0 0 3px ${({theme})=>theme.colors.boxShadow};
    transform: translateY(0);
  }
`;

export const OptionBubble = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({theme})=>theme.colors.surface};
  border: 1.5px solid ${({theme})=>theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: ${({theme})=>theme.colors.subtitle};
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  .selected & {
    background: ${({theme})=>theme.colors.textSecondary};
    border-color: ${({theme})=>theme.colors.textSecondary};
    color: #fff;
  }
`;

export const AnswerHeader = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  flex-wrap: wrap;
`;

export const Answer = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${({theme})=>theme.colors.textPrimary};
  margin: 0;
`;

export const Option = styled.h5`
  font-size: 13px;
  font-weight: 500;
  color: ${({theme})=>theme.colors.textSecondary};
  margin: 0;
  line-height: 1.45;
`;

export const QuestionNavRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
  flex-wrap: wrap;
`;

export const NavBtn = styled.button`
  padding: 9px 18px;
  border-radius: ${({theme})=>theme.radius};
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, background 0.2s, transform 0.15s;
  border: none;
  &.primary {
    background: ${({theme})=>theme.buttonBg};
    color: #fff;
    &:hover { opacity: 0.85; transform: translateY(-1px); }
    &:active { transform: translateY(0); }
  }
  &.ghost {
    background: none;
    color: ${({theme})=>theme.colors.subtitle};
    border: 1px solid ${({theme})=>theme.colors.border} !important;
    &:hover {
      background: ${({theme})=>theme.colors.cream};
      color: ${({theme})=>theme.colors.textPrimary};
      border-color: ${({theme})=>theme.colors.borderHover} !important;
    }
  }
`;


export const LeftSideContainer=styled.div`
  width:70%;
  
`

export const RightSideContainer=styled.div`
  flex:1;
 
`
export const QuestionUpperContainer=styled.div`
  display:flex;
  gap:10px;
`

export const SelectAllContainer=styled.div`
  display:flex;
  gap:5px;
`

export const PaginationContainer=styled.div`
  display: "flex";
  gap: "10px";
  marginTop: "20px"
`
export const PageNo=styled.span`

`