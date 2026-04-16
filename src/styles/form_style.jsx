import styled from "styled-components";

export const FormLayout = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
  padding: 48px 20px;
`;

export const FormContainer = styled.div`
  width: 440px;
  padding: 44px 40px;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadowLg};
`;

export const FormEyebrow = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 2px 4px;
  width: fit-content;
  border-radius: 20px;
  margin: 0 0 6px;
`;

export const FormHeading = styled.h2`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 8px;
  font-family: ${({ theme }) => theme.fontSerif};
  line-height: 1.25;
`;

export const FormSubtitle = styled.p`
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 0 0 30px;
  line-height: 1.65;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
  position: relative;
`;

export const FormLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 6px;
  letter-spacing: 0.01em;
  &::after {
    content: "*";
    font-size: 12px;
    color: ${({ theme }) => theme.colors.error};
    display: inline;
    margin-left: 3px;
  }
`;

export const FormInput = styled.input`
  padding: 9px 13px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  &::placeholder { color: ${({ theme }) => theme.colors.textHint}; }
  &:hover { border-color: ${({ theme }) => theme.colors.borderHover}; }
  &:focus {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
    background: ${({ theme }) => theme.colors.surface};
  }
  &:disabled { opacity: 0.42; cursor: not-allowed; }
`;

export const FileInput = styled.input`
  padding: 11px 15px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px dashed ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    background: ${({ theme }) => theme.colors.surface};
  }
  &:focus {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
  }
`;

export const FormText = styled.textarea`
  padding: 11px 13px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-family: inherit;
  outline: none;
  resize: vertical;
  min-height: 100px;
  line-height: 1.6;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  &::placeholder { color: ${({ theme }) => theme.colors.textHint}; }
  &:hover { border-color: ${({ theme }) => theme.colors.borderHover}; }
  &:focus {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  margin-top: 10px;
  padding: 13px;
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  background:${({ theme }) => theme.colors.headerBackground};
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.01em;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.18s ease, box-shadow 0.2s ease;
  &:hover {
    opacity: 0.88;
    transform: translateY(-2px);
    box-shadow: 0 8px 22px ${({ theme }) => theme.colors.boxShadow};
  }
  &:active  { transform: translateY(0); opacity: 1; box-shadow: none; }
  &:disabled { opacity: 0.38; cursor: not-allowed; transform: none; box-shadow: none; }
`;

export const ErrorMessage = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
  margin: 5px 0 0;
  line-height: 1.45;
  font-weight: 500;
`;

export const SuccessMessage = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.success};
  font-weight: 500;
  margin: 12px 0 0;
  text-align: center;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.successBorder};
  line-height: 1.5;
`;

export const CheckBox = styled.input`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.textPrimary};
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
