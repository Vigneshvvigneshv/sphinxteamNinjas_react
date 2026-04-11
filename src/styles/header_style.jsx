import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  background: ${({theme})=>theme.colors.headerBackground};
  padding: 0 24px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.06);
`;

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1;
`;

export const HeaderLogoIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background 0.2s;
  &:hover { background: rgba(255,255,255,0.14); }
`;

export const HeaderAppName = styled.h1`
  font-size: 19px;
  font-weight: 700;
  color: ${({theme})=>theme.colors.cream};
  margin: 0;
  letter-spacing: 0.05em;
  font-family: ${({theme})=>theme.fontSerif};
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2px;
  z-index: 1;
`;

export const HeaderButton = styled(NavLink)`
  text-decoration: none;
  padding: 7px 13px;
  border-radius: 7px;
  color: rgba(255,255,255,0.65);
  font-size: 13px;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: rgba(255,255,255,0.09);
    color: rgba(255,255,255,0.92);
  }
  &.active {
    background: rgba(255,255,255,0.13);
    color: ${({theme})=>theme.colors.surface};
  }
`;

export const NavButton = styled(NavLink)`
  display: inline-flex;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 18px;
  border: none;
  border-radius: 8px;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.16);
  color: ${({theme})=>theme.colors.textPrimary};
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  &:hover  {
    background: rgba(255,255,255,0.17);
    transform: translateY(-1px);
  }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
`;
