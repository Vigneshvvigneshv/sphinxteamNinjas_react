import styled, { keyframes } from "styled-components";

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

export const float = keyframes`
  0%, 100% { transform: translateY(0px);  }
  50%       { transform: translateY(-6px); }
`;

export const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(79,70,229,0.18); }
  50%       { box-shadow: 0 0 0 10px rgba(79,70,229,0); }
`;

// ─── Page wrapper ─────────────────────────────────────────────────────────────
export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.pageBg};
  padding: 40px 32px 60px;
`;

// ─── Hero section ─────────────────────────────────────────────────────────────
export const Hero = styled.div`
  animation: ${fadeUp} 0.5s ease both;
  margin-bottom: 40px;
`;

export const WelcomeLabel = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #4F46E5;
  background: rgba(79, 70, 229, 0.08);
  border: 1px solid rgba(79, 70, 229, 0.18);
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 14px;
`;

export const Heading = styled.h1`
  font-family: ${({ theme }) => theme.fontSerif};
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 10px;

  span {
    background: ${({ theme }) => theme.buttonBg};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 0;
  line-height: 1.6;
`;

// ─── Stats bar ────────────────────────────────────────────────────────────────
export const StatsBar = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 36px;
  animation: ${fadeUp} 0.5s 0.1s ease both;
`;

export const StatChip = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 10px 18px;
  box-shadow: ${({ theme }) => theme.shadowSm};

  .stat-val {
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-variant-numeric: tabular-nums;
  }
  .stat-label {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.subtitle};
    font-weight: 500;
  }
  .stat-dot {
    width: 8px; height: 8px; border-radius: 50%;
  }
`;

// ─── Card grid ────────────────────────────────────────────────────────────────
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

export const Card = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 32px 28px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadowMd};
  animation: ${fadeUp} 0.5s ${({ $delay }) => $delay || "0.15s"} ease both;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: ${({ $accent }) => $accent};
    border-radius: 16px 16px 0 0;
    opacity: 0;
    transition: opacity 0.22s ease;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -60px; right: -60px;
    width: 160px; height: 160px;
    border-radius: 50%;
    background: ${({ $accentBg }) => $accentBg};
    transition: transform 0.3s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowLg};
    border-color: ${({ theme }) => theme.colors.borderStrong};

    &::before { opacity: 1; }
    &::after  { transform: scale(1.2); }

    .card-arrow { transform: translateX(4px); opacity: 1; }
    .card-icon  { animation: ${float} 2s ease-in-out infinite; }
  }
`;

export const CardIconWrap = styled.div`
  width: 56px; height: 56px;
  border-radius: 14px;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
  font-size: 22px;
  color: ${({ $color }) => $color};
  transition: transform 0.2s;
`;

export const CardBadge = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 20px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $border }) => $border};
  margin-bottom: 10px;
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.01em;
  margin: 0 0 8px;
`;

export const CardDesc = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.subtitle};
  line-height: 1.6;
  margin: 0 0 24px;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardAction = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ $color }) => $color};

  .card-arrow {
    opacity: 0.5;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
`;

export const CardStat = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textHint};
  font-weight: 500;
`;

// ─── Bottom section ───────────────────────────────────────────────────────────
export const InfoBanner = styled.div`
  margin-top: 36px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: ${({ theme }) => theme.shadowSm};
  animation: ${fadeUp} 0.5s 0.35s ease both;
`;

export const InfoDot = styled.div`
  width: 10px; height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.success};
  flex-shrink: 0;
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const InfoText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 0;
  line-height: 1.5;

  strong { color: ${({ theme }) => theme.colors.textPrimary}; font-weight: 600; }
`;