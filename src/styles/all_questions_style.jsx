import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const PageWrapper = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: ${(props) => props.theme.colors.pageBg};
`;

export const ControlHeader = styled.div`
  background: ${(props) => props.theme.colors.surface};
  padding: 20px 24px;
  border-radius: ${(props) => props.theme.radius};
  box-shadow: ${(props) => props.theme.shadowSm};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.border};
  position: sticky;
  top: 70px; /* Adjust based on your header height */
  z-index: 10;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

export const BulkActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 640px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const TableContainer = styled.div`
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.radius};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadowSm};
  overflow: hidden;
`;

export const TableHeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 50px 60px 1fr 180px 150px 120px;
  padding: 16px 24px;
  background: ${(props) => props.theme.colors.headerBackground};
  color: white;
  font-weight: 600;
  font-size: 14px;
  align-items: center;

  @media (max-width: 1024px) {
    display: none; /* Hide headers on mobile, use card view in AllQuestionsTable */
  }
`;

export const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
`;

/* Pagination Styles */
export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: ${(props) => props.theme.colors.surface};
  border-top: 1px solid ${(props) => props.theme.colors.border};

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const PaginationTools = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LimitInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${(props) => props.theme.colors.textSecondary};

  input {
    width: 50px;
    padding: 6px;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors.border};
    text-align: center;
    font-weight: 600;
    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.colors.gold};
    }
  }
`;

/* Styled Buttons using theme gradients */
export const StyledAddButton = styled(NavLink)`
  background: ${(props) => props.theme.addButtonBg};
  color: white;
  padding: 10px 18px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.1s;
  &:hover { transform: translateY(-1px); }
`;

export const StyledDeleteButton = styled.button`
  background: ${(props) => props.disabled ? props.theme.colors.border : props.theme.deleteButtonBg};
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 600;
  cursor: ${(props) => props.disabled ? "not-allowed" : "pointer"};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledUploadButton = styled(NavLink)`
  background: ${(props) => props.theme.buttonBg};
  color: white;
  padding: 10px 18px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;