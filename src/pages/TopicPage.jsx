import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaPen, FaSearch, FaTags, FaTrash, FaArrowLeft } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import Layout from "../component/Layout";
import { apiDelete, apiGet } from "../ApiServices/apiServices";
import { SuccessMessage } from "../styles/form_style";

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
} from "../styles/topicPage_style";
import { ActionIconBtn } from "../styles/adminDashboard_style";
import Modal from "../component/Modal";
import { toast } from "sonner";
import { FBackBtn } from "../styles/formPage_style";

// ── Cycling dot colours ───────────────────────────────────────────────────────
const DOT_COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#06B6D4",
  "#EC4899",
  "#84CC16",
];

const TopicPage = () => {
  const { theme } = useSelector((state) => state.themeReducer);
  const { partyId } = useSelector((state) => state.userReducer);
  // const location = useLocation();
  const navigate=useNavigate();
  // const message = location.state?.msg;
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [topicId, setTopicId] = useState(null);

  const fetchData = async () => {
    const response = await apiGet("/topic/getall-topic/" + partyId);
    setData(response);
  };
  useEffect(() => {
    fetchData();
  }, []);

  // ── Delete Topic ──────────────────────────────────────────────────────────
  const openDeleteTopicModal = (id) => {
    setTopicId(id);
    setShow(true);
  };
  const onDeleteTopic = async () => {
    const response = await apiDelete("/topic/delete-topic", {
      topicId,
      partyId,
    });
    if (response.responseMessage === "success") {
      toast.success(response.successMessage, { position: "top-center" });
      fetchData();
      setTopicId(null);
    } else if (response.responseMessage === "error") {
      toast.error(response.errorMessage, { position: "top-center" });
      setTopicId(null);
    }
    setShow(false);
  };
  // ── Filtered list ─────────────────────────────────────────────────────────
  const topicList = data?.responseMessage === "success" ? data.topicList : [];
  const filtered = topicList.filter((t) =>
    t.topicName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
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

        {/* {message && <SuccessMessage>{message}</SuccessMessage>} */}

        {/* ── Stats strip ─────────────────────────────────────────────── */}
        <TopicStatStrip>
          <TopicStatBadge $iconColor="#3B82F6">
            <FaTags />
            {topicList.length} {topicList.length === 1 ? "topic" : "topics"}{" "}
            total
          </TopicStatBadge>
          {search && (
            <TopicStatBadge $iconColor="#10B981">
              <FaSearch />
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for
              &ldquo;{search}&rdquo;
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
          {filtered.length > 0 ? (
            filtered.map((topic, index) => {
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
                    {/* Delete */}
                    <TooltipWrapper>
                      <TooltipChip theme={theme}>Delete</TooltipChip>
                      <ActionIconBtn
                        className="delete"
                        onClick={() => openDeleteTopicModal(topic.topicId)}
                        theme={theme}
                      >
                        <FaTrash />
                      </ActionIconBtn>
                    </TooltipWrapper>
                  </TopicCardActions>
                </TopicCard>
              );
            })
          ) : (
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
        <FBackBtn onClick={() => navigate(-1)}>
          <FaArrowLeft size={11} /> Back
        </FBackBtn>
      </TopicPageWrap>
      {show && (
        <Modal
          type="delete"
          title="Delete Topic"
          onCancel={() => setShow(false)}
          onConfirm={onDeleteTopic}
          showConfirmButton={true}
        >
          Are you sure you want to delete this topic? This action cannot be
          undone.
        </Modal>
      )}
    </Layout>
  );
};

export default TopicPage;
