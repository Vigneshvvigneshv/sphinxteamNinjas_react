import styled from "styled-components";

export const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 40px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0,0,0,0.03);
  font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 24px;
    margin: 20px;
    border-radius: 16px;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 25px;
  border-bottom: 2px solid #f1f5f9;
  flex-wrap: wrap;
  gap: 20px;

  h3 {
    margin: 0;
    font-size: 26px;
    font-weight: 800;
    color: #0f172a;
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
  }
`;

export const RightControls = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const Timer = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: #dc2626;
  background: #fef2f2;
  padding: 10px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: inset 0 0 0 1px #fca5a5;
  letter-spacing: 0.5px;
`;

export const SubmitButtonTop = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.3px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const MainContent = styled.div`
  padding: 35px;
  background: #f8fafc;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  margin-bottom: 30px;
`;

export const QuestionNumber = styled.div`
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #6366f1;
  margin-bottom: 16px;
  display: inline-block;
  background: #e0e7ff;
  padding: 6px 14px;
  border-radius: 20px;
`;

export const Question = styled.div`
  font-size: 22px;
  font-weight: 600;
  line-height: 1.6;
  margin-bottom: 10px;
  color: #1e293b;
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 30px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const OptionBox = styled.label`
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 0;
  border-radius: 16px;
  border: 2px solid ${({ selected }) => (selected ? '#3b82f6' : '#cbd5e1')};
  cursor: pointer;
  background: ${({ selected }) => (selected ? '#eff6ff' : '#ffffff')};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: #334155;
  font-size: 16px;
  font-weight: 600;
  box-shadow: ${({ selected }) => (selected ? '0 8px 20px rgba(59, 130, 246, 0.15)' : '0 2px 4px rgba(0,0,0,0.02)')};

  &:hover {
    background: ${({ selected }) => (selected ? '#eff6ff' : '#f8fafc')};
    border-color: ${({ selected }) => (selected ? '#3b82f6' : '#94a3b8')};
    transform: ${({ selected }) => (selected ? 'none' : 'translateY(-2px)')};
    box-shadow: ${({ selected }) => (selected ? '0 8px 20px rgba(59, 130, 246, 0.15)' : '0 6px 12px rgba(0,0,0,0.05)')};
  }

  input[type="radio"], input[type="checkbox"] {
    appearance: none;
    background-color: #fff;
    margin: 0 16px 0 0;
    font: inherit;
    color: currentColor;
    width: 24px;
    height: 24px;
    border: 2.5px solid ${({ selected }) => (selected ? '#3b82f6' : '#94a3b8')};
    display: grid;
    place-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  input[type="radio"] {
    border-radius: 50%;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transform: scale(${({ selected }) => (selected ? '1' : '0')});
      transition: 0.2s transform cubic-bezier(0.4, 0, 0.2, 1);
      background-color: #3b82f6;
    }
  }

  input[type="checkbox"] {
    border-radius: 6px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-radius: 2px;
      transform: scale(${({ selected }) => (selected ? '1' : '0')});
      transition: 0.2s transform cubic-bezier(0.4, 0, 0.2, 1);
      background-color: #3b82f6;
    }
  }

  span {
    line-height: 1.5;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 14px 32px;
  border-radius: 14px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.3px;

  background: ${({ primary }) => (primary ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" : "#f1f5f9")};
  color: ${({ primary }) => (primary ? "#ffffff" : "#475569")};
  box-shadow: ${({ primary }) => (primary ? "0 8px 20px rgba(37, 99, 235, 0.25)" : "none")};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ primary }) => (primary ? "0 10px 25px rgba(37, 99, 235, 0.35)" : "0 6px 16px rgba(0, 0, 0, 0.08)")};
    background: ${({ primary }) => (primary ? "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)" : "#e2e8f0")};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const FreeTextInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  font-size: 16px;
  border-radius: 12px;
  border: 2px solid #cbd5e1;
  background: #ffffff;
  color: #334155;
  transition: all 0.2s ease;
  font-family: inherit;
  margin-top: 15px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }
`;

export const FreeTextArea = styled.textarea`
  width: 100%;
  padding: 16px 20px;
  font-size: 16px;
  border-radius: 12px;
  border: 2px solid #cbd5e1;
  background: #ffffff;
  color: #334155;
  transition: all 0.2s ease;
  font-family: inherit;
  margin-top: 15px;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }
`;