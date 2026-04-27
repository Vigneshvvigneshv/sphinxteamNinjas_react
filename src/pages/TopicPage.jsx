import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { FaPlus, FaPen, FaSearch, FaTags } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

import Layout from '../component/Layout';
import { apiGet } from '../ApiServices/apiServices';
import { SuccessMessage } from '../styles/form_style';

import {
  TopicPage as TopicPageWrap,
  TopicPageHeader,
  TopicPageTitle,
  TopicAddBtn,
  TopicStatStrip,
  TopicStatBadge,
  TopicSearchWrap,
  TopicSearchInput,
  TopicGrid,
  TopicCard,
  TopicCardLeft,
  TopicDot,
  TopicCardName,
  TopicCardActions,
  TooltipWrapper,
  TooltipChip,
  CardIconBtn,
  TopicEmptyWrap,
} from '../styles/topicPage_style';

// ── Cycling dot colours ───────────────────────────────────────────────────────
const DOT_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6',
  '#EF4444', '#06B6D4', '#EC4899', '#84CC16',
];

const TopicPage = () => {
  const { theme }  = useSelector((state) => state.themeReducer);
  const { partyId }  = useSelector((state) => state.userReducer);
  const location   = useLocation();
  const message    = location.state?.msg;

  const [data,   setData]   = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet('/topic/getall-topic/'+partyId);
      setData(response);
    };
    fetchData();
  }, []);

  // ── Filtered list ─────────────────────────────────────────────────────────
  const topicList = data?.responseMessage === 'success' ? data.topicList : [];
  const filtered  = topicList.filter((t) =>
    t.topicName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <TopicPageWrap>

          {/* ── Header ─────────────────────────────────────────────────── */}
          <TopicPageHeader>
            <TopicPageTitle>
              Topics
              <span>Manage all question topics</span>
            </TopicPageTitle>
            <TopicAddBtn to="/addtopic">
              <FaPlus size={11} /> Add Topic
            </TopicAddBtn>
          </TopicPageHeader>

          {message && <SuccessMessage>{message}</SuccessMessage>}

          {/* ── Stats strip ─────────────────────────────────────────────── */}
          <TopicStatStrip>
            <TopicStatBadge $iconColor="#3B82F6">
              <FaTags />
              {topicList.length} {topicList.length === 1 ? 'topic' : 'topics'} total
            </TopicStatBadge>
            {search && (
              <TopicStatBadge $iconColor="#10B981">
                <FaSearch />
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
              </TopicStatBadge>
            )}
          </TopicStatStrip>

          {/* ── Search ─────────────────────────────────────────────────── */}
          {/* <TopicSearchWrap>
            <FaSearch />
            <TopicSearchInput
              type="text"
              placeholder="Search topics…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </TopicSearchWrap> */}

          {/* ── Grid ───────────────────────────────────────────────────── */}
          <TopicGrid>
            {filtered.length > 0
              ? filtered.map((topic, index) => {
                  const accent = DOT_COLORS[index % DOT_COLORS.length];
                  return (
                    <TopicCard
                      key={topic.topicId}
                      $accent={accent}
                      $delay={`${index * 0.04}s`}
                    >
                      <TopicCardLeft>
                        <TopicDot $color={accent} />
                        <TopicCardName>{topic.topicName}</TopicCardName>
                      </TopicCardLeft>

                      <TopicCardActions>
                        {/* View questions */}
                        <TooltipWrapper>
                          <TooltipChip>Questions</TooltipChip>
                          <CardIconBtn
                            to={`/question/${topic.topicId}`}
                            className="view"
                          >
                            <FaArrowUpRightFromSquare />
                          </CardIconBtn>
                        </TooltipWrapper>

                        {/* Edit topic */}
                        <TooltipWrapper>
                          <TooltipChip>Edit</TooltipChip>
                          <CardIconBtn
                            to={`/addtopic/${topic.topicId}`}
                            className="edit"
                          >
                            <FaPen />
                          </CardIconBtn>
                        </TooltipWrapper>
                      </TopicCardActions>
                    </TopicCard>
                  );
                })
              : (
                <TopicEmptyWrap>
                  <FaTags />
                  <p>
                    {search
                      ? `No topics match "${search}"`
                      : 'No topics available yet. Click "Add Topic" to get started.'}
                  </p>
                </TopicEmptyWrap>
              )}
          </TopicGrid>

        </TopicPageWrap>
      </Layout>
    </ThemeProvider>
  );
};

export default TopicPage;
