import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useParams, NavLink } from 'react-router-dom';
import {
  FaPlus, FaTrash, FaSearch, FaQuestion,
  FaFile, FaPen, FaChevronDown, FaChevronUp,
} from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { toast } from 'sonner';

import Layout from '../component/Layout';
import Modal from '../component/Modal';
import { apiDelete, apiGet } from '../ApiServices/apiServices';

import {
  QPageWrap, QPageHeader, QPageTitle, QHeaderActions,
  QAddBtn, QUploadBtn, QDeleteAllBtn,
  QControlRow, QStatStrip, QStatBadge, QSearchWrap, QSearchInput,
  QPanel, QColHeader, QRow,
  QCheckbox, QSerial, QText, QTopicBadge, QTypeBadge, QRowActions,
  TooltipWrapper, TooltipChip, QIconBtn,
  AnswerPanel, AnswerPanelHeader, AnswerPanelTitle, AnswerHideBtn,
  AnswerOptions, AnswerOptionChip, CorrectAnswer,
  QEmptyWrap, QPagination, QPageBtn, QPageLabel, QPageSizeWrap, QPageSizeInput,
} from '../styles/questionPage_style';

// ── Single Question Row (inline, no separate file) ────────────────────────────
const QuestionRow = ({ data, index, selectedIds, onCheck, onDelete, topicMode, topicName }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <>
      <QRow>
        {/* checkbox */}
        <QCheckbox
          type="checkbox"
          checked={selectedIds.includes(Number(data.questionId))}
          onChange={(e) => onCheck(e, data.questionId)}
        />

        {/* serial */}
        <QSerial>{index}</QSerial>

        {/* question text */}
        <QText title={data.questionDetail}>{data.questionDetail}</QText>

        {/* topic badge — only in all-questions mode */}
        {!topicMode
          ? <QTopicBadge title={data.topicName}>{data.topicName || '—'}</QTopicBadge>
          : ""
        }

        {/* type badge */}
        <QTypeBadge title={data.questionTypeId}>
          {data.questionTypeId?.replace(/_/g, ' ')}
        </QTypeBadge>

        {/* actions */}
        <QRowActions>
          <TooltipWrapper>
            <TooltipChip>Answers</TooltipChip>
            <QIconBtn className="answers" onClick={() => setShowAnswer((p) => !p)}>
              {showAnswer ? <FaChevronUp /> : <FaChevronDown />}
            </QIconBtn>
          </TooltipWrapper>

          <TooltipWrapper>
            <TooltipChip>Edit</TooltipChip>
            <QIconBtn
              as={NavLink}
              to={`/createquestion/${data.questionId}`}
              state={{ topicId: data.topicId, topicName: topicName || data.topicName }}
              className="edit"
            >
              <FaPen />
            </QIconBtn>
          </TooltipWrapper>

          <TooltipWrapper>
            <TooltipChip>Delete</TooltipChip>
            <QIconBtn className="delete" onClick={() => onDelete(data)}>
              <FaTrash />
            </QIconBtn>
          </TooltipWrapper>
        </QRowActions>
      </QRow>

      {/* answer expand panel */}
      {showAnswer && (
        <AnswerPanel>
          <AnswerPanelHeader>
            <AnswerPanelTitle>Answer Details</AnswerPanelTitle>
            <AnswerHideBtn onClick={() => setShowAnswer(false)}>
              <FaX size={9} /> Hide
            </AnswerHideBtn>
          </AnswerPanelHeader>
          {data.questionTypeId==='FILL_BLANKS' || data.questionTypeId==='TRUE_FALSE' || data.questionTypeId==='DETAILED_ANSWER'?
          <CorrectAnswer>Correct: {data.answer}</CorrectAnswer>:
          <>
          <AnswerOptions>
            {data.optionA && <AnswerOptionChip>A — {data.optionA}</AnswerOptionChip>}
            {data.optionB && <AnswerOptionChip>B — {data.optionB}</AnswerOptionChip>}
            {data.optionC && <AnswerOptionChip>C — {data.optionC}</AnswerOptionChip>}
            {data.optionD && <AnswerOptionChip>D — {data.optionD}</AnswerOptionChip>}
          </AnswerOptions>
          <CorrectAnswer>Correct: {data.answer}</CorrectAnswer>
          </>
          }
        </AnswerPanel>
      )}
    </>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const QuestionPage = () => {
  const { theme } = useSelector((state) => state.themeReducer);
  const partyId = useSelector((state) => state.userReducer.partyId);
  // if topicId param exists → topic mode, else → all-questions mode
  const { id: topicId } = useParams();
  const topicMode = Boolean(topicId);

  // ── State ───────────────────────────────────────────────────────────────
  const [data, setData] = useState({
    questionList: [], pageNo: 1, totalPages: 1,
    hasNext: false, hasPrevious: false,
    responseMessage: '', topicName: '', topicId: '', totalCount: '',
  });
  const [selectedIds,    setSelectedIds]    = useState([]);
  const [currentPage,    setCurrentPage]    = useState(1);
  const [limit,          setLimit]          = useState(10);
  const [search,         setSearch]         = useState('');
  const [showBulkModal,  setShowBulkModal]  = useState(false);
  const [showSingleModal,setShowSingleModal]= useState(false);
  const [deleteTarget,   setDeleteTarget]   = useState(null);

  // ── Fetch ───────────────────────────────────────────────────────────────
  const fetchData = async (page, customLimit = limit) => {
    if (page < 1) return;
    try {
      const url = topicMode
        ? `/question/getquestions-by-topic?topicId=${topicId}&pageNo=${page}&pageSize=${customLimit}`
        : `/question/getall-questions?partyId=${partyId}&pageNo=${page}&pageSize=${customLimit}`;

      const response = await apiGet(url);
      if (!response) return;

      setData({
        questionList:  response.questionList  || [],
        pageNo:        response.pageNo,
        totalPages:    response.totalPages,
        hasNext:       response.hasNext,
        hasPrevious:   response.hasPrevious,
        responseMessage: response.responseMessage,
        topicName:     response.topicName     || '',
        topicId:       response.topicId       || '',
        totalCount:    response.totalCount    || '',
      });
      setCurrentPage(response.pageNo);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (limit) fetchData(1, limit);
  }, [topicId, limit]);

  // ── Selection ───────────────────────────────────────────────────────────
  const handleCheck = (e, questionId) => {
    const id = Number(questionId);
    setSelectedIds((prev) =>
      e.target.checked ? (prev.includes(id) ? prev : [...prev, id])
                       : prev.filter((x) => x !== id)
    );
  };

  const handleSelectAll = (e) => {
    const allIds = data.questionList.map((q) => Number(q.questionId));
    setSelectedIds((prev) =>
      e.target.checked
        ? [...new Set([...prev, ...allIds])]
        : prev.filter((id) => !allIds.includes(id))
    );
  };

  const allSelected =
    data.questionList.length > 0 &&
    data.questionList.every((q) => selectedIds.includes(Number(q.questionId)));

  // ── Bulk delete ─────────────────────────────────────────────────────────
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      toast.warning('Please select questions to delete', { position: 'top-center' });
      return;
    }
    setShowBulkModal(true);
  };

  const confirmBulkDelete = async () => {
    try {
      await apiDelete('/question/delete-question', { questionIds: selectedIds });
      toast.success('Deleted successfully', { position: 'top-center' });
      setSelectedIds([]);
      setShowBulkModal(false);
      fetchData(currentPage);
    } catch (err) { console.error(err); }
  };

  // ── Single delete ───────────────────────────────────────────────────────
  const handleSingleDelete = (q) => {
    setDeleteTarget(q);
    setShowSingleModal(true);
  };

  const confirmSingleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await apiDelete('/question/delete-question', { questionIds: [deleteTarget.questionId] });
      toast.success('Question deleted', { position: 'top-center' });
      setShowSingleModal(false);
      setDeleteTarget(null);
      fetchData(currentPage);
    } catch (err) { console.error(err); }
  };

  // ── Client-side search filter ───────────────────────────────────────────
  const filtered = data.questionList.filter((q) =>
    q.questionDetail?.toLowerCase().includes(search.toLowerCase())
  );

  // ── Derived values ──────────────────────────────────────────────────────
  const pageTitle   = topicMode ? (data.topicName || 'Topic Questions') : 'All Questions';
  const pageSubtitle = topicMode
    ? `Questions under "${data.topicName || '...'}"`
    : 'View and manage all questions across topics';

  const isSuccess = topicMode
    ? data.responseMessage === 'SUCCESS'
    : data.responseMessage === 'success';

  return (
    
      <Layout>
        <QPageWrap>

          {/* ── Header ─────────────────────────────────────────────────── */}
          <QPageHeader>
            <QPageTitle>
              {pageTitle}
              <span>{pageSubtitle}</span>
            </QPageTitle>
            <QHeaderActions>
              {!topicMode && (
                <QUploadBtn to="/uploadfile">
                  <FaFile size={11} /> Upload
                </QUploadBtn>
              )}
              <QAddBtn
                to="/createquestion"
                state={{ topicId: data.topicId, topicName: data.topicName }}
              >
                <FaPlus size={10} /> Add Question
              </QAddBtn>
              <QDeleteAllBtn
                onClick={handleBulkDelete}
                disabled={selectedIds.length === 0}
              >
                <FaTrash size={10} /> Delete ({selectedIds.length})
              </QDeleteAllBtn>
            </QHeaderActions>
          </QPageHeader>

          {/* ── Control row ─────────────────────────────────────────────── */}
          <QControlRow>
            <QStatStrip>
              <QStatBadge $iconColor="#3B82F6">
                <FaQuestion />
                {data.totalCount || data.questionList.length} question{data.questionList.length !== 1 ? 's' : ''}
              </QStatBadge>
              {selectedIds.length > 0 && (
                <QStatBadge $iconColor="#EF4444">
                  <FaTrash />
                  {selectedIds.length} selected
                </QStatBadge>
              )}
              {search && (
                <QStatBadge $iconColor="#10B981">
                  <FaSearch />
                  {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                </QStatBadge>
              )}
            </QStatStrip>

            {/* <QSearchWrap>
              <FaSearch />
              <QSearchInput
                type="text"
                placeholder="Search questions…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </QSearchWrap> */}
          </QControlRow>

          {/* ── Panel ───────────────────────────────────────────────────── */}
          <QPanel>
            {/* column headers */}
            <QColHeader $hideTopic={topicMode}>
              <QCheckbox
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
              />
              <span style={{ textAlign: 'center' }}>No.</span>
              <span>Question</span>
              {!topicMode && <span className="col-topic">Topic</span>}
              <span>Type</span>
              <span style={{ textAlign: 'right' }}>Actions</span>
            </QColHeader>

            {/* rows */}
            {isSuccess && filtered.length > 0
              ? filtered.map((q, idx) => (
                  <QuestionRow
                    key={q.questionId}
                    data={q}
                    index={(Number(data.pageNo - 1) * limit) + (idx + 1)}
                    selectedIds={selectedIds}
                    onCheck={handleCheck}
                    onDelete={handleSingleDelete}
                    topicMode={topicMode}
                    topicName={data.topicName}
                  />
                ))
              : (
                <QEmptyWrap>
                  <FaQuestion />
                  <p>
                    {search
                      ? `No questions match "${search}"`
                      : 'No questions available.'}
                  </p>
                </QEmptyWrap>
              )}

            {/* pagination */}
            {data.questionList.length > 0 && (
              <QPagination>
                <QPageBtn
                  onClick={() => fetchData(currentPage - 1)}
                  disabled={!data.hasPrevious}
                >
                  ← Prev
                </QPageBtn>
                <QPageLabel>{data.pageNo} / {data.totalPages}</QPageLabel>
                <QPageBtn
                  onClick={() => fetchData(currentPage + 1)}
                  disabled={!data.hasNext}
                >
                  Next →
                </QPageBtn>
                <QPageSizeWrap>
                  <label>Per page:</label>
                  <QPageSizeInput
                    type="number"
                    min="1"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value === '' ? '' : e.target.value)}
                    onBlur={() => { if (!limit || limit < 1) setLimit(10); }}
                  />
                </QPageSizeWrap>
              </QPagination>
            )}
          </QPanel>

        </QPageWrap>

        {/* ── Modals ─────────────────────────────────────────────────────── */}
        {showBulkModal && (
          <Modal
            type="delete" title="Confirm Bulk Delete"
            showConfirmButton onConfirm={confirmBulkDelete}
            onCancel={() => setShowBulkModal(false)}
          >
            Delete {selectedIds.length} selected question{selectedIds.length > 1 ? 's' : ''}?
            This cannot be undone.
          </Modal>
        )}
        {showSingleModal && (
          <Modal
            type="delete" title="Confirm Delete"
            showConfirmButton onConfirm={confirmSingleDelete}
            onCancel={() => { setShowSingleModal(false); setDeleteTarget(null); }}
          >
            Delete this question? This cannot be undone.
          </Modal>
        )}
      </Layout>
    
  );
};

export default QuestionPage;
