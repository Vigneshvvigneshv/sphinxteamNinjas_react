import Layout from "../component/Layout";
import { CommonContainer, CommonHeading } from "../styles/common_style";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { Card, CardAction, CardBadge, CardDesc, CardFooter, CardGrid, CardIconWrap, CardStat, Heading, Hero, InfoBanner, InfoDot, InfoText, PageWrapper, StatChip, StatsBar, Subtitle, WelcomeLabel } from "../styles/UserDashBoard_style";

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

  const cards = [
    {
      icon: <FaClipboardList />,
      badge: "Active",
      badgeBg: "rgba(79,70,229,0.08)",
      badgeColor: "#4F46E5",
      badgeBorder: "rgba(79,70,229,0.18)",
      iconBg: "rgba(79,70,229,0.08)",
      iconBorder: "rgba(79,70,229,0.15)",
      iconColor: "#4F46E5",
      accent: "linear-gradient(90deg,#4F46E5,#3B82F6)",
      accentBg: "rgba(79,70,229,0.05)",
      title: "Assigned Assessment",
      desc: "View and start your pending assessment. Track deadlines and attempt your scheduled assessments.",
      action: "Start Assessment",
      actionColor: "#4F46E5",
      stat: "Tap to view all",
      route: "/assignedexam",
      delay: "0.15s",
    },
    {
      icon: <FaCheckCircle />,
      badge: "Completed",
      badgeBg: "rgba(16,185,129,0.08)",
      badgeColor: "#10B981",
      badgeBorder: "rgba(16,185,129,0.18)",
      iconBg: "rgba(16,185,129,0.08)",
      iconBorder: "rgba(16,185,129,0.15)",
      iconColor: "#10B981",
      accent: "linear-gradient(90deg,#10B981,#059669)",
      accentBg: "rgba(16,185,129,0.05)",
      title: "Completed Assessment",
      desc: "Review your past assessment results, scores, and detailed performance breakdowns.",
      action: "View Results",
      actionColor: "#10B981",
      stat: "Tap to view all",
      route: "/completedexam",
      delay: "0.25s",
    },
  ];

  return (
    <Layout>
      <PageWrapper>
        {/* Hero */}
        <Hero>
          <WelcomeLabel>Student Portal</WelcomeLabel>
          <Heading>
            Welcome to <span>Sphinx</span>
          </Heading>
          <Subtitle>
            Manage your exams, track your progress, and review your results — all in one place.
          </Subtitle>
        </Hero>

        {/* Stats bar */}
        <StatsBar>
          {[
            // { label: "Assigned",  val: "—", dot: "#4F46E5" },
            // { label: "Completed", val: "—", dot: "#10B981" },
            // { label: "Pending",   val: "—", dot: "#F59E0B" },
          ].map((s) => (
            <StatChip key={s.label}>
              <div className="stat-dot" style={{ background: s.dot }} />
              <div>
                <div className="stat-val">{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </StatChip>
          ))}
        </StatsBar>

        {/* Cards */}
        <CardGrid>
          {cards.map((c) => (
            <Card
              key={c.route}
              $accent={c.accent}
              $accentBg={c.accentBg}
              $delay={c.delay}
              onClick={() => navigate(c.route)}
            >
              <CardBadge $bg={c.badgeBg} $color={c.badgeColor} $border={c.badgeBorder}>
                {c.badge}
              </CardBadge>

              <CardIconWrap
                className="card-icon"
                $bg={c.iconBg}
                $border={c.iconBorder}
                $color={c.iconColor}
              >
                {c.icon}
              </CardIconWrap>

              <CardTitle>{c.title}</CardTitle>
              <CardDesc>{c.desc}</CardDesc>

              <CardFooter>
                <CardAction $color={c.actionColor}>
                  {c.action}
                  <FaArrowRight size={11} className="card-arrow" />
                </CardAction>
                <CardStat>{c.stat}</CardStat>
              </CardFooter>
            </Card>
          ))}
        </CardGrid>

        {/* Info banner */}
        {/* <InfoBanner>
          <InfoDot />
          <InfoText>
            <strong>Tip:</strong> Your assessment timer starts as soon as you open an assigned exam.
            Make sure you have a stable internet connection before beginning.
          </InfoText>
        </InfoBanner> */}
      </PageWrapper>
    </Layout>
  );
};

export default UserDashBoard;
