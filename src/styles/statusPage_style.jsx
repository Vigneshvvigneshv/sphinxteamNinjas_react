import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const floatAnim = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%       { opacity: 0.8; transform: scale(1.04); }
`;

// ─── Full-screen Centering Shell ──────────────────────────────────────────────

export const FullPageWrap = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme?.colors?.background || "#F8FAFC"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme?.fontSerif || "inherit"};
  padding: 24px;
`;

// ─── Card ─────────────────────────────────────────────────────────────────────

export const StatusCard = styled.div`
  background: ${({ theme }) => theme?.colors?.surface || "#fff"};
  border: 1px solid ${({ theme }) => theme?.colors?.border || "#E2E8F0"};
  border-radius: ${({ theme }) => theme?.radius || "12px"};
  box-shadow: ${({ theme }) => theme?.shadowMd || "0 4px 24px rgba(0,0,0,0.08)"};
  padding: 48px 40px 40px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  animation: ${fadeUp} 0.4s ease both;

  @media (max-width: 480px) {
    padding: 36px 24px 32px;
  }
`;

// ─── Illustration Icon ────────────────────────────────────────────────────────

export const StatusIconWrap = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg || "#FEF2F2"};
  color: ${({ $color }) => $color || "#EF4444"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 0 auto 24px;
  animation: ${floatAnim} 3s ease-in-out infinite;
  border: 2px solid ${({ $border }) => $border || "#FECACA"};
`;

// ─── Code / Badge ─────────────────────────────────────────────────────────────

export const StatusCode = styled.div`
  font-size: 56px;
  font-weight: 800;
  color: ${({ $color }) => $color || "#EF4444"};
  line-height: 1;
  margin-bottom: 8px;
  letter-spacing: -2px;
  opacity: 0.15;
  animation: ${pulse} 3s ease-in-out infinite;
`;

// ─── Heading ─────────────────────────────────────────────────────────────────

export const StatusHeading = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme?.colors?.textPrimary || "#1E293B"};
  margin: 0 0 8px;
  letter-spacing: -0.3px;
`;

// ─── Description ─────────────────────────────────────────────────────────────

export const StatusDesc = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme?.colors?.subtitle || "#64748B"};
  margin: 0 0 28px;
  line-height: 1.6;
`;

// ─── Back Button ─────────────────────────────────────────────────────────────

export const StatusBackBtn = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme?.radius || "8px"};
  background: ${({ $bg }) => $bg || "#EF4444"};
  color: #fff;
  text-decoration: none;
  font-family: inherit;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  }
  &:active { transform: translateY(0); }
`;

// ─── Divider ─────────────────────────────────────────────────────────────────

export const StatusDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme?.colors?.border || "#E2E8F0"};
  margin: 24px 0;
`;

// ─── Hint text ───────────────────────────────────────────────────────────────

export const StatusHint = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme?.colors?.textHint || "#94A3B8"};
  margin: 0;
`;
