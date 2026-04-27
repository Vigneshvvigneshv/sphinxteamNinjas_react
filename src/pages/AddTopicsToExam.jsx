import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  FaPlus, FaTrash, FaLayerGroup, FaChartPie, FaArrowLeft, FaExclamationCircle,
} from 'react-icons/fa';

import Layout from '../component/Layout';
import Modal from '../component/Modal';
import { validateAddTopicExam } from '../validation/ValidationUtil';
import { apiDelete, apiGet, apiPost } from '../ApiServices/apiServices';

import {
  ExamTopicPage,
  ExamTopicHeader,
  ExamTopicTitle,
  HeaderActions,
  AddTopicBtn,
  BackBtn,
  StatStrip,
  StatBadge,
  PercentBadge,
  Panel,
  PanelHeader,
  PanelTitleGroup,
  PanelIconBox,
  PanelTitle,
  TableWrap,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRowItem,
  SelectField,
  NumberField,
  FieldError,
  RowActions,
  IconBtn,
  EmptyWrap,
  PanelFooter,
  FooterLeft,
  FooterRight,
  GenerateBtn,
  ErrorBanner,
} from '../styles/addTopicsToExam_style';

const AddTopicsToExam = () => {
  const { id } = useParams();
  const { theme } = useSelector((state) => state.themeReducer);

  const [allTopics, setAllTopics]   = useState([]);
  const [rows, setRows]             = useState([{ topicId: '', percentage: '', topicPassPercentage: '' }]);
  const [examName, setExamName]     = useState('');
  const [examId, setExamId]         = useState(null);
  const [error, setError]           = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  // ── Total percentage ────────────────────────────────────────────────────────
  const totalPct = rows.reduce((acc, r) => acc + Number(r.percentage || 0), 0);
  const pctOver  = totalPct > 100;
  const pctOk    = totalPct === 100;

  // ── Fetch all topics (for dropdown) ────────────────────────────────────────
  useEffect(() => {
    const fetch = async () => {
      const res = await apiGet('/topic/getall-topic');
      if (res?.responseMessage === 'success') setAllTopics(res.topicList);
    };
    fetch();
  }, []);

  // ── Fetch existing topics assigned to this exam ─────────────────────────────
  useEffect(() => {
    const fetch = async () => {
      const res = await apiGet(`/exam-topic/get-topicby-examid?examId=${id}`);
      if (res?.message === 'success') {
        setExamName(res.examName);
        setExamId(res.examId);
        if (res.topicList?.length > 0) setRows(res.topicList);
      }
    };
    fetch();
  }, [id]);

  // ── Row helpers ─────────────────────────────────────────────────────────────
  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
    setError({});
  };

  const addRow = () => {
    if (totalPct >= 100) {
      setError({ errorMessage: 'Total percentage is already 100. Cannot add more topics.' });
      return;
    }
    setRows([...rows, { topicId: '', percentage: '', topicPassPercentage: '' }]);
    setError({});
  };

  const removeRow = async (topicId, index) => {
    if (!topicId || topicId === 'select' || topicId === '') {
      // Row was never saved — just remove locally
      setRows((prev) => prev.filter((_, i) => i !== index));
      return;
    }
    const response = await apiDelete('/exam-topic/delete-topic-in-exam-topic', {
      examId,
      topicId,
    });
    if (response?.responseMessage === 'success') {
      toast.success(response.message, { position: 'top-center' });
      setRows((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error(response?.message || 'Failed to delete topic', { position: 'top-center' });
    }
  };

  // ── Submit (generate questions) ─────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Validate each row
    let hasError = false;
    for (const row of rows) {
      const errs = validateAddTopicExam(row);
      if (Object.keys(errs).length > 0) {
        setError(errs);
        hasError = true;
        break;
      }
    }
    if (hasError) return;

    if (!pctOk) {
      setError({ errorMessage: 'Total percentage must equal exactly 100%.' });
      return;
    }

    const response = await apiPost('/generate-questions/generate-question', {
      examId,
      topics: rows,
    });

    if (response?.errorMessage) {
      setError({ errorMessage: response.errorMessage });
    } else if (response?.successMessage) {
      toast.success('Questions generated successfully!', { position: 'top-center' });
      setShowConfirm(false);
      setError({});
    }
  };

  // ── Topics already used in current rows (to avoid duplicates in dropdown) ──
  const usedTopicIds = rows.map((r) => r.topicId).filter(Boolean);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <ExamTopicPage>

          {/* ── Header ──────────────────────────────────────────────────── */}
          <ExamTopicHeader>
            <ExamTopicTitle>
              {examName || 'Exam Topics'}
              <span>Manage topics and percentage distribution</span>
            </ExamTopicTitle>
            <HeaderActions>
              <BackBtn to={`/getexamtopic/${id}`}>
                <FaArrowLeft size={11} /> Back
              </BackBtn>
              <AddTopicBtn onClick={addRow} disabled={pctOver || pctOk}>
                <FaPlus size={10} /> Add Topic
              </AddTopicBtn>
            </HeaderActions>
          </ExamTopicHeader>

          {/* ── Stats strip ─────────────────────────────────────────────── */}
          <StatStrip>
            <StatBadge $iconColor="#3B82F6">
              <FaLayerGroup />
              {rows.length} {rows.length === 1 ? 'topic' : 'topics'}
            </StatBadge>
            <PercentBadge $over={pctOver ? true : pctOk ? false : undefined} $iconColor={pctOver ? '#DC2626' : '#059669'}>
              <FaChartPie />
              {totalPct}% / 100% allocated
            </PercentBadge>
          </StatStrip>

          {/* ── Panel ───────────────────────────────────────────────────── */}
          <Panel>
            <PanelHeader>
              <PanelTitleGroup>
                <PanelIconBox $bg="#EFF6FF" $color="#3B82F6">
                  <FaLayerGroup />
                </PanelIconBox>
                <PanelTitle>Topic Distribution</PanelTitle>
              </PanelTitleGroup>
            </PanelHeader>

            <TableWrap>
              <Table>
                {/* Column headers */}
                <TableHead>
                  <TableHeadCell>Topic</TableHeadCell>
                  <TableHeadCell $center>Percentage (%)</TableHeadCell>
                  <TableHeadCell $center>Pass Percentage (%)</TableHeadCell>
                  <TableHeadCell $right>Action</TableHeadCell>
                </TableHead>

                <TableBody>
                  {rows.length > 0 ? (
                    rows.map((row, index) => (
                      <TableRowItem key={index} $delay={`${index * 0.04}s`}>

                        {/* Topic dropdown */}
                        <div>
                          <SelectField
                            value={row.topicId}
                            $error={!!error.topicId}
                            onChange={(e) => handleChange(index, 'topicId', e.target.value)}
                          >
                            <option value="">Select a topic…</option>
                            {allTopics.map((t) => (
                              <option
                                key={t.topicId}
                                value={t.topicId}
                                disabled={
                                  usedTopicIds.includes(t.topicId) &&
                                  t.topicId !== row.topicId
                                }
                              >
                                {t.topicName}
                              </option>
                            ))}
                          </SelectField>
                          {error.topicId && <FieldError>{error.topicId}</FieldError>}
                        </div>

                        {/* Percentage */}
                        <div>
                          <NumberField
                            type="number"
                            placeholder="e.g. 40"
                            value={row.percentage}
                            $error={!!error.percentage}
                            onChange={(e) => handleChange(index, 'percentage', e.target.value)}
                          />
                          {error.percentage && <FieldError>{error.percentage}</FieldError>}
                        </div>

                        {/* Pass percentage */}
                        <div>
                          <NumberField
                            type="number"
                            placeholder="e.g. 60"
                            value={row.topicPassPercentage}
                            $error={!!error.topicPassPercentage}
                            onChange={(e) => handleChange(index, 'topicPassPercentage', e.target.value)}
                          />
                          {error.topicPassPercentage && <FieldError>{error.topicPassPercentage}</FieldError>}
                        </div>

                        {/* Delete */}
                        <RowActions>
                          <IconBtn
                            type="button"
                            className="delete"
                            onClick={() => removeRow(row.topicId, index)}
                            title="Remove topic"
                          >
                            <FaTrash />
                          </IconBtn>
                        </RowActions>

                      </TableRowItem>
                    ))
                  ) : (
                    <EmptyWrap>
                      <FaLayerGroup />
                      <p>No topics added yet. Click "Add Topic" to get started.</p>
                    </EmptyWrap>
                  )}
                </TableBody>
              </Table>
            </TableWrap>

            {/* Error banner */}
            {error.errorMessage && (
              <ErrorBanner>
                <FaExclamationCircle />
                {error.errorMessage}
              </ErrorBanner>
            )}

            {/* Footer */}
            <PanelFooter>
              <FooterLeft>
                <BackBtn to={`/getexamtopic/${id}`}>
                  <FaArrowLeft size={11} /> Back
                </BackBtn>
              </FooterLeft>
              <FooterRight>
                <GenerateBtn
                  type="button"
                  onClick={handleSubmit}
                  disabled={rows.length === 0}
                >
                  <FaChartPie size={11} /> Generate Questions
                </GenerateBtn>
              </FooterRight>
            </PanelFooter>
          </Panel>

        </ExamTopicPage>
      </Layout>

      {/* ── Confirm modal ───────────────────────────────────────────────── */}
      {showConfirm && (
        <Modal
          type="confirm"
          title="Generate Questions"
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleSubmit}
          showConfirmButton
        >
          This will generate questions for all topics. Any existing questions may be replaced. Continue?
        </Modal>
      )}
    </ThemeProvider>
  );
};

export default AddTopicsToExam;
