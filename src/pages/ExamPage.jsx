import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { FaPlus, FaSearch, FaClipboardList, FaClock, FaListUl, FaPercentage, FaUserCheck, FaPen, FaTrash } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

import Layout from '../component/Layout';
import Modal from '../component/Modal';
import { apiPost, apiDelete } from '../ApiServices/apiServices';
import { toast } from 'sonner';
import { SuccessMessage } from '../styles/form_style';

import {
  ExamPage as ExamPageWrap,
  ExamPageHeader,
  ExamPageTitle,
  ExamAddBtn,
  ExamStatStrip,
  ExamStatBadge,
  ExamSearchWrap,
  ExamSearchInput,
  ExamGrid,
  ExamCard,
  ExamCardTop,
  ExamCardName,
  ExamMetaRow,
  ExamMetaChip,
  ExamCardDivider,
  ExamCardActions,
  TooltipWrapper,
  TooltipChip,
  CardIconBtn,
  CardDeleteBtn,
  ExamEmptyWrap,
} from '../styles/examPage_style';

// ── Accent colour palette (mirrors topic page) ────────────────────────────────
const ACCENT_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6',
  '#EF4444', '#06B6D4', '#EC4899', '#84CC16',
];

const ExamPage = () => {
  const { theme }    = useSelector((state) => state.themeReducer);
  const { partyId }  = useSelector((state) => state.userReducer);
  const location     = useLocation();
  const message      = location.state?.msg;

  const [data,   setData]   = useState(null);
  const [search, setSearch] = useState('');
  const [show,   setShow]   = useState(false);
  const [examId, setExamId] = useState(null);

  const fetchExams = async () => {
    const response = await apiPost('/exam/getall-exam', { partyId:partyId });
    setData(response);
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // ── Delete handlers ──────────────────────────────────────────────────────
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
      console.log('respone',response);
      
    } else if (response.errorMessage !== undefined) {
      toast.error(response.errorMessage, { position: 'top-center' });
    }
    setShow(false);
  };

  // ── Filtered list ────────────────────────────────────────────────────────
  const examList = data?.responseMessage === 'success' ? data.examList : [];
  const filtered = examList.filter((e) =>
    e.examName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <ExamPageWrap>

          {/* ── Header ──────────────────────────────────────────────────── */}
          <ExamPageHeader>
            <ExamPageTitle>
              Assessments
              <span>Manage all exams and assessments</span>
            </ExamPageTitle>
            <ExamAddBtn to="/addexam">
              <FaPlus size={11} /> Add Assessment
            </ExamAddBtn>
          </ExamPageHeader>

          {message && <SuccessMessage>{message}</SuccessMessage>}

          {/* ── Stats strip ─────────────────────────────────────────────── */}
          <ExamStatStrip>
            <ExamStatBadge $iconColor="#3B82F6">
              <FaClipboardList />
              {examList.length} {examList.length === 1 ? 'assessment' : 'assessments'} total
            </ExamStatBadge>
            {search && (
              <ExamStatBadge $iconColor="#10B981">
                <FaSearch />
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
              </ExamStatBadge>
            )}
          </ExamStatStrip>

          {/* ── Search ────────────────────────────────────────────────────
          <ExamSearchWrap>
            <FaSearch />
            <ExamSearchInput
              type="text"
              placeholder="Search assessments…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </ExamSearchWrap> */}

          {/* ── Grid ────────────────────────────────────────────────────── */}
          <ExamGrid>
            {filtered.length > 0
              ? filtered.map((exam, index) => {
                  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
                  return (
                    <ExamCard
                      key={exam.examId}
                      $accent={accent}
                      $delay={`${index * 0.04}s`}
                    >
                      {/* Name */}
                      <ExamCardTop>
                        <ExamCardName>{exam.examName}</ExamCardName>
                      </ExamCardTop>

                      {/* Meta chips */}
                      <ExamMetaRow>
                        <ExamMetaChip $bg="#EFF6FF" $color="#2563EB" $border="#DBEAFE">
                          <FaClock /> {exam.duration}m
                        </ExamMetaChip>
                        <ExamMetaChip $bg="#F5F3FF" $color="#7C3AED" $border="#EDE9FE">
                          <FaListUl /> {exam.noOfQuestions} Q&apos;s
                        </ExamMetaChip>
                        <ExamMetaChip $bg="#ECFDF5" $color="#059669" $border="#A7F3D0">
                          <FaPercentage /> {exam.passPercentage}% pass
                        </ExamMetaChip>
                      </ExamMetaRow>

                      <ExamCardDivider />

                      {/* Actions */}
                      <ExamCardActions>
                        {/* Assign */}
                        <TooltipWrapper>
                          <TooltipChip>Assign</TooltipChip>
                          <CardIconBtn
                            to={`/assignexam/${exam.examId}`}
                            state={{ examName: exam.examName }}
                            className="assign"
                          >
                            <FaUserCheck />
                          </CardIconBtn>
                        </TooltipWrapper>

                        {/* Topics */}
                        <TooltipWrapper>
                          <TooltipChip>Topics</TooltipChip>
                          <CardIconBtn
                            to={`/getexamtopic/${exam.examId}/${exam.examName}`}
                            className="topics"
                          >
                            <FaArrowUpRightFromSquare />
                          </CardIconBtn>
                        </TooltipWrapper>

                        {/* Edit */}
                        <TooltipWrapper>
                          <TooltipChip>Edit</TooltipChip>
                          <CardIconBtn
                            to={`/getexam/${exam.examId}`}
                            className="edit"
                          >
                            <FaPen />
                          </CardIconBtn>
                        </TooltipWrapper>

                        {/* Delete */}
                        <TooltipWrapper>
                          <TooltipChip>Delete</TooltipChip>
                          <CardDeleteBtn onClick={() => openDeleteModal(exam.examId)}>
                            <FaTrash />
                          </CardDeleteBtn>
                        </TooltipWrapper>
                      </ExamCardActions>
                    </ExamCard>
                  );
                })
              : (
                <ExamEmptyWrap>
                  <FaClipboardList />
                  <p>
                    {search
                      ? `No assessments match "${search}"`
                      : 'No assessments available yet. Click "Add Assessment" to get started.'}
                  </p>
                </ExamEmptyWrap>
              )}
          </ExamGrid>

        </ExamPageWrap>
      </Layout>

      {/* ── Delete confirmation modal ──────────────────────────────────── */}
      {show && (
        <Modal
          type="delete"
          title="Delete Assessment"
          onCancel={() => setShow(false)}
          onConfirm={onDelete}
          showConfirmButton={true}
        >
          Are you sure you want to delete this assessment? This action cannot be undone.
        </Modal>
      )}
    </ThemeProvider>
  );
};

export default ExamPage;
