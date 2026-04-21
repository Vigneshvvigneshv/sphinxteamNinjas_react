import Layout from "../component/Layout";
import { CommonContainer, CommonHeading } from "../styles/common_style";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaCheckCircle } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 10px;
  width: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background-color: ${({theme})=>theme.colors.surface};
  padding: 40px 20px;
  border-radius: ${({theme})=>theme.radius};
  box-shadow: ${({theme})=>theme.shadowSm};
  border: 1px solid ${({theme})=>theme.colors.border};
  cursor: pointer;
  flex: 1;
  min-width: 250px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px ${({theme})=>theme.colors.boxShadow};
    border-color: ${({theme})=>theme.colors.borderHover};
  }
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${({theme})=>theme.colors.textPrimary};
  margin: 0;
`;

const IconWrapper = styled.div`
  font-size: 20px;
`;

const UserDashBoard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <CommonContainer style={{ alignItems: 'flex-start' }}>
        <CommonHeading style={{ fontSize: "24px", marginBottom: "10px" }}>Welcome to Sphinx</CommonHeading>
        <Container>
          <CardContainer onClick={() => navigate('/assignedexam')}>
            <IconWrapper style={{ color: "#3498db" }}>
              <FaClipboardList />
            </IconWrapper>
            <CardTitle>Assigned Exam</CardTitle>
          </CardContainer>
          <CardContainer onClick={() => navigate('/completedexam')}>
            <IconWrapper style={{ color: "#2ecc71" }}>
              <FaCheckCircle />
            </IconWrapper>
            <CardTitle>Completed Exam</CardTitle>
          </CardContainer>
        </Container>
      </CommonContainer>
    </Layout>
  );
};

export default UserDashBoard;
