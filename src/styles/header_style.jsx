import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  background: ${({ theme }) => theme.colors.headerBackground};
  padding: 0 28px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  z-index: 1;
`;

export const HeaderLogoIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.09);
  border: 1px solid rgba(255, 255, 255, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background 0.2s ease;
  &:hover { background: rgba(255, 255, 255, 0.15); }
`;

export const HeaderAppName = styled.h1`
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.cream};
  margin: 0;
  font-family: ${({ theme }) => theme.fontSerif};
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2px;
  z-index: 1;
`;

export const HeaderButton = styled(NavLink)`
  display: inline-flex;
  text-decoration: none;
  align-items: center;
  gap:6px;
  padding: 7px 14px;
  border-radius: 7px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 13px;
  font-weight: 500;
  transition: background 0.18s ease, color 0.18s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.92);
  }
  &.active {
    background: rgba(255, 255, 255, 0.14);
    color: ${({ theme }) => theme.colors.surface};
    font-weight: 600;
  }
`;

export const NavButton = styled(NavLink)`
  display: inline-flex;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 18px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.headerBackground};
  color: ${({ theme }) => theme.colors.cream};
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.18s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.hoverBackground};
    transform: translateY(-1px);
  }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.38; cursor: not-allowed; transform: none; }
`;
