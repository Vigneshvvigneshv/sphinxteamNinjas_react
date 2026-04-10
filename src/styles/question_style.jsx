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
  background: ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
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
  color: ${({ $t }) => $t?.textMuted ?? "#6B6B6B"};
  margin: 0 0 6px;
  font-weight: 500;
`;

export const QuestionHeaderContainer = styled.div`
  padding: 18px 22px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:5px;
  border-radius: ${({ $t }) => $t?.radiusCard ?? "14px"};
  background: ${({ $t }) => $t?.surface ?? "#fff"};
  border: 1px solid ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
  box-shadow: ${({ $t }) => $t?.shadowMd};
`;

export const QuestionTypeBadge = styled.span`
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: ${({ $t }) => $t?.textSecondary ?? "#3A3A3A"};
  background: ${({ $t }) => $t?.goldPale ?? "#F7F7F7"};
  border: 1px solid ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
  padding: 3px 10px;
  border-radius: 999px;
  margin-bottom: 10px;
`;

export const QuestionText = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: ${({ $t }) => $t?.textPrimary ?? "#0D0D0D"};
  margin: 0;
  line-height: 1.55;
  font-family: ${({ $t }) => $t?.fontSerif ?? "Georgia, serif"};
`;

export const QuestionFormContainer = styled.div`
  padding: 24px;
  display:flex;
  flex-direction:column;
  border-radius: ${({ $t }) => $t?.radiusCard ?? "14px"};
  background: ${({ $t }) => $t?.surface ?? "#fff"};
  border: 1px solid ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
  box-shadow: ${({ $t }) => $t?.shadowMd};
`;

export const QuestionFieldContainer = styled.div`
  display: flex;
  align-items: center;
  gap:10px;
  width:100%;
  padding: 9px 12px;
  border-radius: ${({ $t }) => $t?.radiusMd ?? "8px"};
  border: 1.5px solid ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
  // background: ${({ $t }) => $t?.cream ?? "#FAFAFA"};
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.15s, transform 0.15s;
  margin-bottom: 8px;
  &:hover {
    border-color: ${({ $t }) => $t?.borderHover ?? "rgba(0,0,0,0.22)"};
    background: #F4F4F4;
    transform: translateY(-1px);
    box-shadow: ${({ $t }) => $t?.shadowSm};
  }
  &.selected {
    border-color: ${({ $t }) => $t?.gold ?? "#2A2A2A"};
    background: ${({ $t }) => $t?.goldPale ?? "#F7F7F7"};
    box-shadow: 0 0 0 3px ${({ $t }) => $t?.goldFocus ?? "rgba(0,0,0,0.07)"};
    transform: translateY(0);
  }
`;

export const OptionBubble = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ $t }) => $t?.surface ?? "#fff"};
  border: 1.5px solid ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: ${({ $t }) => $t?.textMuted ?? "#6B6B6B"};
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  .selected & {
    background: ${({ $t }) => $t?.gold ?? "#2A2A2A"};
    border-color: ${({ $t }) => $t?.gold ?? "#2A2A2A"};
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
  color: ${({ $t }) => $t?.textPrimary ?? "#0D0D0D"};
  margin: 0;
`;

export const Option = styled.h5`
  font-size: 13px;
  font-weight: 500;
  color: ${({ $t }) => $t?.textSecondary ?? "#3A3A3A"};
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
  border-radius: ${({ $t }) => $t?.radiusMd ?? "8px"};
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s, background 0.2s, transform 0.15s;
  border: none;
  &.primary {
    background: ${({ $t }) => $t?.buttonBg ?? "linear-gradient(135deg,#3A3A3A,#0D0D0D)"};
    color: #fff;
    &:hover { opacity: 0.85; transform: translateY(-1px); }
    &:active { transform: translateY(0); }
  }
  &.ghost {
    background: none;
    color: ${({ $t }) => $t?.textMuted ?? "#6B6B6B"};
    border: 1px solid ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"} !important;
    &:hover {
      background: ${({ $t }) => $t?.goldPale ?? "#F7F7F7"};
      color: ${({ $t }) => $t?.textPrimary ?? "#0D0D0D"};
      border-color: ${({ $t }) => $t?.borderHover ?? "rgba(0,0,0,0.22)"} !important;
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