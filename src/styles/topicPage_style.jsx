import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`;

// ─── Page Wrapper ─────────────────────────────────────────────────────────────

export const TopicPage = styled.div`
  padding: 32px 40px 60px;
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 60px - 58px);
  font-family: ${({ theme }) => theme.fontSerif};

  @media (max-width: 768px) {
    padding: 20px 16px 40px;
  }
`;

// ─── Page Header ──────────────────────────────────────────────────────────────

export const TopicPageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 12px;
  animation: ${fadeUp} 0.35s ease both;
`;

export const TopicPageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  letter-spacing: -0.3px;

  span {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.subtitle};
    letter-spacing: 0;
    margin-top: 3px;
  }
`;

export const TopicAddBtn = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  padding: 9px 16px;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.addButtonBg};
  color: #fff;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontSerif};
  text-decoration: none;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadowMd};
  }
  &:active { transform: translateY(0); }
`;

// ─── Stats Strip ──────────────────────────────────────────────────────────────

export const TopicStatStrip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 22px;
  animation: ${fadeUp} 0.38s ease 0.05s both;
`;

export const TopicStatBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subtitle};
  box-shadow: ${({ theme }) => theme.shadowSm};

  svg {
    color: ${({ $iconColor }) => $iconColor || '#3B82F6'};
    font-size: 11px;
  }
`;

// ─── Search Bar ───────────────────────────────────────────────────────────────

export const TopicSearchWrap = styled.div`
  position: relative;
  margin-bottom: 22px;
  max-width: 340px;
  animation: ${fadeUp} 0.38s ease 0.08s both;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textHint};
    font-size: 13px;
    pointer-events: none;
  }
`;

export const TopicSearchInput = styled.input`
  width: 100%;
  padding: 9px 12px 9px 34px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder { color: ${({ theme }) => theme.colors.textHint}; }

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.boxShadow};
  }
`;

// ─── Topic Grid ───────────────────────────────────────────────────────────────

export const TopicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
  animation: ${scaleIn} 0.35s ease 0.1s both;
  overflow: visible;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Topic Card ───────────────────────────────────────────────────────────────

const DOT_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6',
  '#EF4444', '#06B6D4', '#EC4899', '#84CC16',
];

export const TopicCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 16px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-shadow: ${({ theme }) => theme.shadowSm};
  animation: ${fadeUp} 0.35s ease ${({ $delay }) => $delay || '0s'} both;
  transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
  position: relative;

  /* accent bar */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    bottom: 10px;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: ${({ $accent }) => $accent || '#3B82F6'};
    opacity: 0.7;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMd};
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

export const TopicCardLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

export const TopicDot = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $color }) => $color || '#3B82F6'};
`;

export const TopicCardName = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// ─── Card Action Buttons ──────────────────────────────────────────────────────

export const TopicCardActions = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  flex-shrink: 0;
`;

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
  &:hover span { opacity: 1; }
`;

export const TooltipChip = styled.span`
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.headerBackground};
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s;
  letter-spacing: 0.03em;
  z-index: 100;
`;

export const CardIconBtn = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.subtitle};
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.15s, background 0.15s, border-color 0.15s, transform 0.12s;

  &.view:hover {
    color: #059669;
    background: #ECFDF5;
    border-color: #A7F3D0;
    transform: translateY(-1px);
  }

  &.edit:hover {
    color: #2563EB;
    background: #EFF6FF;
    border-color: #BFDBFE;
    transform: translateY(-1px);
  }
`;

// ─── Empty State ──────────────────────────────────────────────────────────────

export const TopicEmptyWrap = styled.div`
  grid-column: 1 / -1;
  padding: 60px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textHint};

  svg {
    font-size: 32px;
    opacity: 0.3;
  }

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.subtitle};
    margin: 0;
  }
`;
