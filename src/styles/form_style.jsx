import styled from "styled-components";

export const FormLayout = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ $t }) => $t?.formBg ?? "#FFFFFF"};
  padding: 40px 20px;
`;

export const FormContainer = styled.div`
  width: 420px;
  padding: 40px 36px;
  border-radius: ${({ $t }) => $t?.radiusCard ?? "14px"};
  background: ${({ $t }) => $t?.surface ?? "#fff"};
  border: 1px solid ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
  box-shadow: ${({ $t }) => $t?.shadowLg};
`;

export const FormEyebrow = styled.p`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $t }) => $t?.textMuted ?? "#6B6B6B"};
  margin: 0 0 6px;
`;

export const FormHeading = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ $t }) => $t?.textPrimary ?? "#0D0D0D"};
  margin: 0 0 8px;
  font-family: ${({ $t }) => $t?.fontSerif ?? "Georgia, serif"};
  letter-spacing: -0.01em;
`;

export const FormSubtitle = styled.p`
  font-size: 13px;
  color: ${({ $t }) => $t?.textMuted ?? "#6B6B6B"};
  margin: 0 0 28px;
  line-height: 1.6;
`;

export const Form = styled.form`
  display: flex;
  flex-direction:column;
  gap: 4px;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  position: relative;
`;

export const FormLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  width:100%;
  color: ${({ $t }) => $t?.textSecondary ?? "#3A3A3A"};
  &::after {
    content: "*";
    font-size: 13px;
    color: ${({ $t }) => $t?.danger ?? "#C62828"};
    display: inline;
    margin-left: 3px;
  }
`;

export const FormInput = styled.input`
  padding: 8px 13px;
  border-radius: ${({ $t }) => $t?.radiusMd ?? "8px"};
  border: 1.5px solid ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
  background: ${({ $t }) => $t?.cream ?? "#FAFAFA"};
  color: ${({ $t }) => $t?.textPrimary ?? "#0D0D0D"};
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  &::placeholder { color: ${({ $t }) => $t?.textHint ?? "#A0A0A0"}; }
  &:hover { border-color: ${({ $t }) => $t?.borderGold ?? "rgba(0,0,0,0.14)"}; }
  &:focus {
    border-color: ${({ $t }) => $t?.gold ?? "#2A2A2A"};
    box-shadow: 0 0 0 3px ${({ $t }) => $t?.goldFocus ?? "rgba(0,0,0,0.07)"};
    background: ${({ $t }) => $t?.surface ?? "#fff"};
  }
  &:disabled { opacity: 0.45; cursor: not-allowed; }
`;

export const FileInput = styled.input`
  padding: 11px 13px;
  border-radius: ${({ $t }) => $t?.radiusMd ?? "8px"};
  border: 1.5px dashed ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
  background: ${({ $t }) => $t?.cream ?? "#FAFAFA"};
  color: ${({ $t }) => $t?.textPrimary ?? "#0D0D0D"};
  font-size: 13px;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  &:hover {
    border-color: ${({ $t }) => $t?.gold ?? "#2A2A2A"};
    background: #F4F4F4;
  }
  &:focus {
    border-color: ${({ $t }) => $t?.gold ?? "#2A2A2A"};
    box-shadow: 0 0 0 3px ${({ $t }) => $t?.goldFocus};
  }
`;

export const FormText = styled.textarea`
  padding: 11px 13px;
  width:100%;
  border-radius: ${({ $t }) => $t?.radiusMd ?? "8px"};
  border: 1.5px solid ${({ $t }) => $t?.border ?? "rgba(0,0,0,0.09)"};
  background: ${({ $t }) => $t?.cream ?? "#FAFAFA"};
  color: ${({ $t }) => $t?.textPrimary ?? "#0D0D0D"};
  font-size: 14px;
  font-family: inherit;
  outline: none;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  &::placeholder { color: ${({ $t }) => $t?.textHint ?? "#A0A0A0"}; }
  &:focus {
    border-color: ${({ $t }) => $t?.gold ?? "#2A2A2A"};
    box-shadow: 0 0 0 3px ${({ $t }) => $t?.goldFocus};
    background: ${({ $t }) => $t?.surface ?? "#fff"};
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  margin-top: 8px;
  padding: 13px;
  border: none;
  border-radius: ${({ $t }) => $t?.radiusMd ?? "8px"};
  background: ${({ $t }) => $t?.buttonBg ?? "linear-gradient(135deg,#3A3A3A,#0D0D0D)"};
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  letter-spacing: 0.01em;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  &:hover  {
    opacity: 0.85;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.16);
  }
  &:active { transform: translateY(0); opacity: 1; box-shadow: none; }
  &:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }
`;

export const ErrorMessage = styled.p`
  font-size: 12px;
  color: ${({ $t }) => $t?.danger ?? "#C62828"};
  margin: 5px 0 0;
  line-height: 1.4;
`;

export const SuccessMessage = styled.p`
  font-size: 13px;
  color: ${({ $t }) => $t?.success ?? "#2E7D32"};
  font-weight: 500;
  margin: 10px 0 0;
  text-align: center;
  padding: 11px 14px;
  border-radius: ${({ $t }) => $t?.radiusMd ?? "8px"};
  background: ${({ $t }) => $t?.successBg ?? "#F0F7F0"};
  border: 1px solid ${({ $t }) => $t?.successBorder ?? "rgba(46,125,50,0.12)"};
`;

export const CheckBox=styled.input`
  
`

export const LabelContainer=styled.div`
  
`