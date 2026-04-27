import React, { useEffect, useState } from 'react';
import Layout from '../component/Layout';
import { apiDelete, apiGet, apiPost } from '../ApiServices/apiServices';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import Modal from '../component/Modal';
import Empty from '../component/Empty';
import {
  DashboardPage,
  DashPageTitle,
  StatRow,
  StatCard,
  StatIconBox,
  StatInfo,
  SectionGrid,
  Panel,
  PanelHeader,
  PanelTitleGroup,
  PanelIconBox,
  PanelTitle,
  PanelCount,
  PanelActions,
  PanelAddBtn,
  PanelBody,
  ExamColHeader,
  ExamRow,
  ExamName,
  ExamMeta,
  ExamActionGroup,
  ActionIconBtn,
  TopicRow,
  TopicDot,
  TopicName,
  TopicActionGroup,
  PanelEmpty,
  TooltipWrapper,
  TooltipChip,
  DashPageHeader,
} from '../styles/adminDashboard_style';
import {
  FaBook,
  FaClipboardList,
  FaEdit,
  FaLayerGroup,
  FaPen,
  FaPlus,
  FaTags,
  FaTrash,
  FaUser,
  FaUserCheck,
} from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

// ── Dot colour palette for topics ────────────────────────────────────────────
const TOPIC_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6',
  '#EF4444', '#06B6D4', '#EC4899', '#84CC16',
];

const AdminDashBoard = () => {
  const { partyId } = useSelector((state) => state.userReducer);
  const theme = useSelector((state) => state.themeReducer.theme);

  const [examData, setExamData]   = useState({ examList: [], responseMessage: '' });
  const [topicData, setTopicData] = useState({ topicList: [], responseMessage: '' });
  const [show, setShow]           = useState(false);
  const [examId, setExamId]       = useState(null);

  // ── Fetch helpers ────────────────────────────────────────────────────────
  const fetchExams = async () => {
    const response = await apiPost('/exam/getall-exam', { partyId });
    setExamData(response);
  };

  const fetchTopics = async () => {
    const response = await apiGet('/topic/getall-topic');
    setTopicData(response);
  };

  //  const fetchQuestions = async () => {
  //   const response = await apiGet('/topic/getall-topic');
  //   setTopicData(response);
  // };

  useEffect(() => {
    fetchExams();
    fetchTopics();
  }, []);

  // ── Delete exam ──────────────────────────────────────────────────────────
  const openDeleteModal = (id) => {
    setExamId([id]);
    setShow(true);
  };

  const onDelete = async () => {
    const response = await apiDelete('/exam/delete-exam', {
      deleteList: examId,
      partyId,
    });
    if (response.successMessage !== undefined) {
      toast.success(response.successMessage, { position: 'top-center' });
      fetchExams();
    } else if (response.errorMessage !== undefined) {
      toast.error(response.errorMessage, { position: 'top-center' });
    }
    setShow(false);
  };

  // ── Derived counts ───────────────────────────────────────────────────────
  const examCount  = examData?.examList?.length  ?? 0;
  const topicCount = topicData?.topicList?.length ?? 0;

  return (
    <Layout>
      <DashboardPage theme={theme}>

        {/* ── Page title ───────────────────────────────────────────────── */}
        <DashPageHeader>
          <DashPageTitle theme={theme}>
            Dashboard
            <span>Welcome back, Admin</span>
          </DashPageTitle>
        </DashPageHeader>

        {/* ── Stat cards ───────────────────────────────────────────────── */}
        <StatRow>
          <StatCard theme={theme} $delay="0s" $accent={theme.colors.textSecondary}>
            <StatIconBox $bg="#EFF6FF" $color="#3B82F6">
              <FaClipboardList />
            </StatIconBox>
            <StatInfo theme={theme}>
              <div className="value">{examCount}</div>
              <div className="label">Total Assessments</div>
            </StatInfo>
          </StatCard>

          <StatCard theme={theme} $delay="0.07s" $accent="#10B981">
            <StatIconBox $bg="#ECFDF5" $color="#10B981">
              <FaTags />
            </StatIconBox>
            <StatInfo theme={theme}>
              <div className="value">{topicCount}</div>
              <div className="label">Topics</div>
            </StatInfo>
          </StatCard>

          {/* <StatCard theme={theme} $delay="0.14s" $accent="#8B5CF6">
            <StatIconBox $bg="#F5F3FF" $color="#8B5CF6">
              <FaBook />
            </StatIconBox>
            <StatInfo theme={theme}>
              <div className="value">
                {examData?.examList?.reduce((acc, e) => acc + Number(e.noOfQuestions || 0), 0)}
              </div>
              <div className="label">Total Questions</div>
            </StatInfo>
          </StatCard> */}
        </StatRow>

        {/* ── Panels grid ──────────────────────────────────────────────── */}
        <SectionGrid>

          {/* ── Exam panel ─────────────────────────────────────────────── */}
          <Panel theme={theme} $delay="0.15s">
            <PanelHeader theme={theme}>
              <PanelTitleGroup>
                <PanelIconBox $bg="#EFF6FF" $color="#3B82F6">
                  <FaClipboardList />
                </PanelIconBox>
                <PanelTitle theme={theme}>Assessments</PanelTitle>
                <PanelCount theme={theme}>{examCount}</PanelCount>
              </PanelTitleGroup>
              <PanelActions>
                <PanelAddBtn to="/addexam" theme={theme}>
                  <FaPlus size={10} /> Add Assessment
                </PanelAddBtn>
              </PanelActions>
            </PanelHeader>

            {/* column headers */}
            <ExamColHeader theme={theme}>
              <span>Name</span>
              <span style={{ textAlign: 'center' }}>Duration</span>
              <span style={{ textAlign: 'center' }}>Q&apos;s</span>
              <span style={{ textAlign: 'center' }}>Pass%</span>
              <span style={{ textAlign: 'center' }}>Actions</span>
            </ExamColHeader>

            <PanelBody theme={theme}>
              {examData.responseMessage === 'success' && examData.examList.length > 0
                ? examData.examList.map((exam) => (
                    <ExamRow key={exam.examId} theme={theme}>
                      <ExamName theme={theme}>{exam.examName}</ExamName>
                      <ExamMeta theme={theme}>{exam.duration}m</ExamMeta>
                      <ExamMeta theme={theme}>{exam.noOfQuestions}</ExamMeta>
                      <ExamMeta theme={theme}>{exam.passPercentage}%</ExamMeta>
                      <ExamActionGroup>
                        {/* Assign */}
                        <TooltipWrapper>
                          <TooltipChip theme={theme}>Assign</TooltipChip>
                          <ActionIconBtn
                            as={NavLink}
                            to={`/assignexam/${exam.examId}`}
                            state={{ examName: exam.examName }}
                            className="assign"
                            theme={theme}
                          >
                            <FaUserCheck />
                          </ActionIconBtn>
                        </TooltipWrapper>

                        {/* Topics */}
                        <TooltipWrapper>
                          <TooltipChip theme={theme}>Topics</TooltipChip>
                          <ActionIconBtn
                            as={NavLink}
                            to={`/getexamtopic/${exam.examId}/${exam.examName}`}
                            className="topics"
                            theme={theme}
                          >
                            <FaArrowUpRightFromSquare />
                          </ActionIconBtn>
                        </TooltipWrapper>

                        {/* Edit */}
                        <TooltipWrapper>
                          <TooltipChip theme={theme}>Edit</TooltipChip>
                          <ActionIconBtn
                            as={NavLink}
                            to={`/getexam/${exam.examId}`}
                            className="edit"
                            theme={theme}
                          >
                            <FaPen />
                          </ActionIconBtn>
                        </TooltipWrapper>

                        {/* Delete */}
                        <TooltipWrapper>
                          <TooltipChip theme={theme}>Delete</TooltipChip>
                          <ActionIconBtn
                            className="delete"
                            onClick={() => openDeleteModal(exam.examId)}
                            theme={theme}
                          >
                            <FaTrash />
                          </ActionIconBtn>
                        </TooltipWrapper>
                      </ExamActionGroup>
                    </ExamRow>
                  ))
                : (
                  <PanelEmpty theme={theme}>
                    <FaClipboardList />
                    No exams available
                  </PanelEmpty>
                )}
            </PanelBody>
          </Panel>

          {/* ── Topic panel ─────────────────────────────────────────────── */}
          <Panel theme={theme} $delay="0.22s">
            <PanelHeader theme={theme}>
              <PanelTitleGroup>
                <PanelIconBox $bg="#ECFDF5" $color="#10B981">
                  <FaTags />
                </PanelIconBox>
                <PanelTitle theme={theme}>Topics</PanelTitle>
                <PanelCount theme={theme}>{topicCount}</PanelCount>
              </PanelTitleGroup>
              <PanelActions>
                <PanelAddBtn to="/addtopic" theme={theme}>
                  <FaPlus size={10} /> Add Topic
                </PanelAddBtn>
              </PanelActions>
            </PanelHeader>

            <PanelBody theme={theme}>
              {topicData.responseMessage === 'success' && topicData.topicList.length > 0
                ? topicData.topicList.map((topic, index) => (
                    <TopicRow key={topic.topicId} theme={theme}>
                      <TopicDot $color={TOPIC_COLORS[index % TOPIC_COLORS.length]} />
                      <TopicName theme={theme}>{topic.topicName}</TopicName>
                      <TopicActionGroup>
                        {/* Questions */}
                        <TooltipWrapper>
                          <TooltipChip theme={theme}>Questions</TooltipChip>
                          <ActionIconBtn
                            as={NavLink}
                            to={`/question/${topic.topicId}`}
                            className="topics"
                            theme={theme}
                          >
                            <FaArrowUpRightFromSquare />
                          </ActionIconBtn>
                        </TooltipWrapper>

                        {/* Edit */}
                        <TooltipWrapper>
                          <TooltipChip theme={theme}>Edit</TooltipChip>
                          <ActionIconBtn
                            as={NavLink}
                            to={`/addtopic/${topic.topicId}`}
                            className="edit"
                            theme={theme}
                          >
                            <FaPen />
                          </ActionIconBtn>
                        </TooltipWrapper>
                      </TopicActionGroup>
                    </TopicRow>
                  ))
                : (
                  <PanelEmpty theme={theme}>
                    <FaTags />
                    No topics available
                  </PanelEmpty>
                )}
            </PanelBody>
          </Panel>

        </SectionGrid>
      </DashboardPage>

      {/* ── Delete confirmation modal ─────────────────────────────────── */}
      {show && (
        <Modal
          type="delete"
          title="Delete Exam"
          onCancel={() => setShow(false)}
          onConfirm={onDelete}
          showConfirmButton={true}
        >
          Are you sure you want to delete this exam? This action cannot be undone.
        </Modal>
      )}
    </Layout>
  );
};

export default AdminDashBoard;
