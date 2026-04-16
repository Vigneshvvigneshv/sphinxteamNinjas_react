import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 0.32s ease;
`;

export const ProgressWrap = styled.div`
  background: ${({ theme }) => theme.colors.border};
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
  transition: width 0.45s ease;
`;

export const ProgressLabel = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 0 0 6px;
  letter-spacing: 0.02em;
`;

export const QuestionHeaderContainer = styled.div`
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadowMd};
`;

export const QuestionTypeBadge = styled.span`
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.cream};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 3px 10px;
  border-radius: 999px;
  margin-bottom: 10px;
`;

export const QuestionText = styled.h3`
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  line-height: 1.55;
  font-family: ${({ theme }) => theme.fontSerif};
`;

export const QuestionFormContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadowMd};
`;

export const QuestionFieldContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.18s ease, transform 0.18s ease;
  margin-bottom: 8px;
  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    background: ${({ theme }) => theme.colors.cream};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadowSm};
  }
  &.selected {
    border-color: ${({ theme }) => theme.colors.textSecondary};
    background: ${({ theme }) => theme.colors.cream};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
    transform: translateY(0);
  }
`;

export const OptionBubble = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.subtitle};
  flex-shrink: 0;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  .selected & {
    background: ${({ theme }) => theme.colors.textSecondary};
    border-color: ${({ theme }) => theme.colors.textSecondary};
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
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const Option = styled.h5`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`;

export const QuestionNavRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const NavBtn = styled.button`
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radius};
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s ease, background 0.18s ease, transform 0.18s ease;
  border: none;
  &.primary {
    background: ${({ theme }) => theme.buttonBg};
    color: #fff;
    &:hover { opacity: 0.88; transform: translateY(-2px); }
    &:active { transform: translateY(0); }
  }
  &.ghost {
    background: none;
    color: ${({ theme }) => theme.colors.subtitle};
    border: 1.5px solid ${({ theme }) => theme.colors.border} !important;
    &:hover {
      background: ${({ theme }) => theme.colors.cream};
      color: ${({ theme }) => theme.colors.textPrimary};
      border-color: ${({ theme }) => theme.colors.borderHover} !important;
    }
  }
`;

export const LeftSideContainer = styled.div`
  width: 68%;
  @media (max-width: 900px) { width: 100%; }
`;

export const RightSideContainer = styled.div`
  flex: 1;
  min-width: 220px;
`;

export const QuestionUpperContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const SelectAllContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
  align-items: center;
  flex-wrap: wrap;
`;

export const PageNo = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease;
  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    background: ${({ theme }) => theme.colors.cream};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
  &.active {
    background: ${({ theme }) => theme.colors.textPrimary};
    border-color: ${({ theme }) => theme.colors.textPrimary};
    color: ${({ theme }) => theme.colors.surface};
  }
`;

export const ProfessionalHeaderContainer = styled(QuestionHeaderContainer)`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
`;

export const ConfigGroup = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-end;
  flex-wrap: wrap;
`;

export const FieldWrapper = styled.div`
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
`;

export const TopicBadge = styled.div`
  padding: 9px 13px;
  background: #f5f5f5;
  border: 1.5px solid #eaeaea;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  min-width: 180px;
  color: #333;
`;

export const ConfigDropdown = styled.select`
  padding: 9px 13px;
  border-radius: 8px;
  border: 1.5px solid #eaeaea;
  background: #fafafa;
  color: #333;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  min-width: ${({ $minWidth }) => $minWidth || '200px'};
  cursor: pointer;
  &:focus {
    border-color: #333;
    box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
  }
`;

export const FormMainContainer = styled(QuestionFormContainer)`
  padding: 32px;
`;

export const MainFieldContainer = styled(QuestionFieldContainer)`
  background: transparent;
  border: none;
  padding: 0;
  box-shadow: none;
  cursor: default;
  &:hover {
    background: transparent;
    border: none;
    box-shadow: none;
    transform: none;
  }
`;

export const QuestionInputWrapper = styled.div`
  width: 100%;
`;

export const OptionsWrapper = styled.div`
  margin-top: 24px;
`;

export const OptionsSection = styled.div`
  margin-top: 8px;
  padding: 20px;
  background: #fafafa;
  border: 1.5px solid #eaeaea;
  border-radius: 12px;
`;

export const OptionsDisclaimer = styled.p`
  font-size: 13.5px;
  color: #666;
  margin: 0;
  font-weight: 500;
`;

export const ScoringSidebar = styled(RightSideContainer)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background: #fcfcfc;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
`;

export const ScoringHeading = styled.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 700;
  color: #222;
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 8px;
`;

export const ScoringRow = styled.div`
  display: flex;
  flex-direction:column;
  gap: 16px;
`;

export const ScoringFieldWrapper = styled(FieldWrapper)`
  flex: 1;
  margin-bottom: 16px;
`;

export const ActionBottomWrapper = styled.div`
  margin-top: auto;
  padding-top: 20px;
`;

export const ActionButton = styled.button`
  width: 100%;
  margin: 0;
  padding: 15px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg,#3A3A3A,#0D0D0D);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.18s ease;
  &:hover {
    opacity: 0.88;
    transform: translateY(-2px);
  }
`;

export const QuestionInputBox = styled.textarea`
  padding: 11px 13px;
  width: 100%;
  border-radius: 8px;
  border: 1.5px solid #eaeaea;
  background: #fafafa;
  color: #333;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  resize: vertical;
  min-height: 130px;
  line-height: 1.6;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  &::placeholder {
    color: #999;
  }
  &:focus {
    border-color: #333;
    box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
    background: #fff;
  }
`;

export const SerialNumber = styled.p`
  font-size: 12px;
  font-weight: 500;
  min-width: 30px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
  padding-right: 10px;
`;
  