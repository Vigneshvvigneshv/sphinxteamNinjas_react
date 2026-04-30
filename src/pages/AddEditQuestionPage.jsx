import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaClipboardList } from 'react-icons/fa';
import { toast } from 'sonner';

import Layout from '../component/Layout';
import Modal from '../component/Modal';
import SingleChoice from '../component/SingleChoice';
import MultiChoice from '../component/MultiChoice';
import TrueOrFalse from '../component/TrueOrFalse';
import { validateQuestion } from '../validation/ValidationUtil';
import { apiGet, apiPost, apiPut } from '../ApiServices/apiServices';

import {
  QPage,
  QPageHeader,
  QPageTitleGroup,
  QPageTitle,
  QPageSubtitle,
  QBackBtn,
  QContainer,
  QContainerHeader,
  QContainerTitleGroup,
  QContainerIconBox,
  QContainerTitle,
  QConfigRow,
  QConfigGroup,
  QConfigLabel,
  QConfigSelect,
  QTopicBadge,
  QBody,
  QSectionDivider,
  QField,
  QLabel,
  QTextarea,
  QInput,
  QError,
  QAnswerDisplay,
  QDisclaimer,
  QFooter,
  QCancelBtn,
  QSubmitBtn,
} from '../styles/question_style_unified';

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Normalise the answer value coming back from the API */
const normaliseAnswer = (raw, typeId) => {
  if (typeId === 'MULTI_CHOICE') {
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'string' && raw.length > 0) return raw.split(',').map((s) => s.trim());
    return [];
  }
  return raw ?? '';
};

// ─── Component ────────────────────────────────────────────────────────────────

const AddEditQuestionPage = () => {
  const { theme }  = useSelector((state) => state.themeReducer);
  const { id }     = useParams();
  const location   = useLocation();
  const navigate   = useNavigate();
  const isEdit     = id !== undefined;
  const partyId    = useSelector((state) => state.userReducer.partyId);
  const topicId    = location.state?.topicId;
  const topicName  = location.state?.topicName;

  // ── State ──────────────────────────────────────────────────────────────────

  // Track whether the type was changed by the USER (not by the edit loader)
  const userChangedType = useRef(false);

  const [questionType,    setQuestionType]    = useState('SINGLE_CHOICE');
  const [difficultyLevel, setDifficultyLevel] = useState('1');
  const [topicList,       setTopicList]       = useState([]);
  const [show,            setShow]            = useState(false);
  const [error,           setError]           = useState({});
  const [loading,         setLoading]         = useState(isEdit); // show nothing until data ready

  const [formData, setFormData] = useState({
    topicId:           topicId || '',
    questionDetail:    '',
    optionA: '', optionB: '', optionC: '', optionD: '',
    answer:            '',
    numAnswers:        1,
    questionTypeId:    'SINGLE_CHOICE',
    difficultyLevel:   '1',
    answerValue:       1,
    negativeMarkValue: 0,
    partyId,
  });

  // ── Fetch question for edit mode ───────────────────────────────────────────
  //
  //  KEY FIX: We set formData AND questionType in one go, atomically, so the
  //  "sync questionType → formData" effect below does NOT get a chance to wipe
  //  the answer that we just loaded from the API.
  //
  useEffect(() => {
    if (!isEdit) return;

    const fetchQuestion = async () => {
      try {
        const res = await apiGet('/question/getquestion-by-id?questionId=' + id);
        const q   = res.question;

        const fetchedType   = q.questionTypeId   || 'SINGLE_CHOICE';
        const fetchedDiff   = String(q.difficultyLevel ?? '1');
        const fetchedAnswer = normaliseAnswer(q.answer, fetchedType);

        // Mark that this type change is NOT user-initiated so the sync effect
        // won't reset the answer we are about to put into formData.
        userChangedType.current = false;

        setQuestionType(fetchedType);
        setDifficultyLevel(fetchedDiff);

        setFormData({
          topicId:           topicId || q.topicId || '',
          questionDetail:    q.questionDetail    || '',
          optionA:           q.optionA           || '',
          optionB:           q.optionB           || '',
          optionC:           q.optionC           || '',
          optionD:           q.optionD           || '',
          answer:            fetchedAnswer,
          numAnswers:        q.numAnswers        ?? 1,
          questionTypeId:    fetchedType,
          difficultyLevel:   fetchedDiff,
          answerValue:       q.answerValue       ?? 1,
          negativeMarkValue: q.negativeMarkValue ?? 0,
          partyId,
        });
      } catch (err) {
        toast.error('Failed to load question data.', { position: 'top-center' });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Fetch topics (only when not in topic context) ─────────────────────────
  useEffect(() => {
    if (topicName) return;
    const fetchTopics = async () => {
      const res = await apiGet('/topic/getall-topic/' + partyId);
      setTopicList(res.topicList || []);
    };
    fetchTopics();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Sync questionType → formData ──────────────────────────────────────────
  //
  //  KEY FIX: Only reset the answer when the user explicitly changed the type
  //  (userChangedType.current === true).  When the edit loader sets the type
  //  it leaves userChangedType.current = false, so we skip the reset and keep
  //  the answer that was already loaded from the API.
  //
  useEffect(() => {
    if (!userChangedType.current) return; // edit-load path — do nothing

    setFormData((prev) => ({
      ...prev,
      answer:         questionType === 'MULTI_CHOICE' ? [] : '',
      questionTypeId: questionType,
      // Clear option fields only for types that don't use them
      ...(questionType === 'TRUE_FALSE' || questionType === 'FILL_BLANKS' || questionType === 'DETAILED_ANSWER'
        ? { optionA: '', optionB: '', optionC: '', optionD: '' }
        : {}),
    }));
  }, [questionType]);

  // ── Sync difficultyLevel → formData ──────────────────────────────────────
  useEffect(() => {
    setFormData((prev) => ({ ...prev, difficultyLevel }));
  }, [difficultyLevel]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'answer' && questionType === 'MULTI_CHOICE') {
      setFormData((prev) => {
        const prev_ans = Array.isArray(prev.answer) ? [...prev.answer] : [];
        return {
          ...prev,
          answer: checked
            ? [...prev_ans, value]
            : prev_ans.filter((a) => a !== value),
        };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setError((prev) => ({ ...prev, [name]: '' }));
  };

  const handleTopic = (value) =>
    setFormData((prev) => ({ ...prev, topicId: value }));

  /** Called when the user manually picks a different question type */
  const handleTypeChange = (e) => {
    userChangedType.current = true;
    setQuestionType(e.target.value);
    setError({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateQuestion(formData);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (isEdit) {
      const res = await apiPut('/question/update-question', {
        ...formData,
        questionId: id,
        topicId,
      });
      if (res.errorMessage)   { setError(res); toast.error(res.errorMessage, { position: 'top-center' }); }
      if (res.successMessage) { setError(res); setShow(true); }
    } else {
      const res = await apiPost('/question/create-question', formData);
      if (res.errorMessage)   { setError(res); toast.error(res.errorMessage, { position: 'top-center' }); }
      if (res.successMessage) { setError(res); setShow(true); }
    }
  };

  // ── Derived ───────────────────────────────────────────────────────────────
  const backTo     = topicId ? `/question/${topicId}` : '/questionList';
  const isFreeText = questionType === 'FILL_BLANKS' || questionType === 'DETAILED_ANSWER';

  // ── Render ────────────────────────────────────────────────────────────────
  if (loading) return <Layout><div style={{ padding: 40 }}>Loading…</div></Layout>;

  return (
    <Layout>
      <QPage theme={theme}>

        {/* Page Header */}
        <QPageHeader>
          <QPageTitleGroup>
            <QPageTitle theme={theme}>
              {isEdit ? 'Edit Question' : 'Add Question'}
              <span>{topicName || 'Question Bank'}</span>
            </QPageTitle>
            <QPageSubtitle theme={theme}>
              {isEdit
                ? 'Update the question details below'
                : 'Fill in the details to create a new question'}
            </QPageSubtitle>
          </QPageTitleGroup>
          <QBackBtn to={backTo} theme={theme}>
            <FaArrowLeft size={11} /> Back
          </QBackBtn>
        </QPageHeader>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <QContainer theme={theme}>

            {/* ── Container Header ─────────────────────────────────── */}
            <QContainerHeader theme={theme}>
              <QContainerTitleGroup>
                <QContainerIconBox $bg="#EFF6FF" $color="#3B82F6">
                  <FaClipboardList />
                </QContainerIconBox>
                <QContainerTitle theme={theme}>
                  {isEdit ? 'Edit Question' : 'New Question'}
                </QContainerTitle>
              </QContainerTitleGroup>

              <QConfigRow>
                {/* Topic */}
                <QConfigGroup>
                  <QConfigLabel theme={theme}>Topic</QConfigLabel>
                  {topicName
                    ? <QTopicBadge theme={theme}>{topicName}</QTopicBadge>
                    : (
                      <QConfigSelect
                        theme={theme}
                        value={formData.topicId}
                        onChange={(e) => handleTopic(e.target.value)}
                      >
                        <option value="">Select topic</option>
                        {topicList.map((t) => (
                          <option key={t.topicId} value={t.topicId}>{t.topicName}</option>
                        ))}
                      </QConfigSelect>
                    )}
                </QConfigGroup>

                {/* Question Type */}
                <QConfigGroup>
                  <QConfigLabel theme={theme}>Type</QConfigLabel>
                  <QConfigSelect
                    theme={theme}
                    value={questionType}
                    onChange={handleTypeChange}
                  >
                    <option value="SINGLE_CHOICE">Single Choice</option>
                    <option value="MULTI_CHOICE">Multiple Choice</option>
                    <option value="TRUE_FALSE">True / False</option>
                    <option value="FILL_BLANKS">Fill in the Blanks</option>
                    <option value="DETAILED_ANSWER">Detailed Answer</option>
                  </QConfigSelect>
                </QConfigGroup>

                {/* Difficulty */}
                <QConfigGroup>
                  <QConfigLabel theme={theme}>Difficulty</QConfigLabel>
                  <QConfigSelect
                    theme={theme}
                    value={difficultyLevel}
                    onChange={(e) => setDifficultyLevel(e.target.value)}
                  >
                    <option value="1">Easy</option>
                    <option value="2">Medium</option>
                    <option value="3">Hard</option>
                  </QConfigSelect>
                </QConfigGroup>
              </QConfigRow>
            </QContainerHeader>

            {/* ── Body ─────────────────────────────────────────────── */}
            <QBody>

              {/* Question Text */}
              <QSectionDivider theme={theme}>Question</QSectionDivider>

              <QField>
                <QLabel theme={theme} htmlFor="questionDetail">
                  Question Text <span className="req">*</span>
                </QLabel>
                <QTextarea
                  theme={theme}
                  id="questionDetail"
                  name="questionDetail"
                  placeholder="Enter the full question text here…"
                  value={formData.questionDetail}
                  onChange={handleChange}
                  $hasError={!!error.questionDetail}
                />
                {error.questionDetail && <QError theme={theme}>{error.questionDetail}</QError>}
              </QField>

              {/* Answer Options */}
              <QSectionDivider theme={theme}>Answer Options</QSectionDivider>

              {questionType === 'SINGLE_CHOICE' && (
                <SingleChoice change={handleChange} error={error} data={formData} />
              )}
              {questionType === 'MULTI_CHOICE' && (
                <MultiChoice change={handleChange} error={error} data={formData} />
              )}
              {questionType === 'TRUE_FALSE' && (
                <TrueOrFalse change={handleChange} error={error} data={formData} />
              )}
              {isFreeText && (
                <QDisclaimer theme={theme}>
                  <FaCheckCircle />
                  No predefined options for this question type.
                </QDisclaimer>
              )}

              {/* Correct Answer */}
              <QSectionDivider theme={theme}>Correct Answer</QSectionDivider>

              <QField>
                <QLabel theme={theme}>
                  {isFreeText ? 'Answer' : 'Selected Answer'}
                  {isFreeText && <span className="req"> *</span>}
                </QLabel>

                {isFreeText ? (
                  <>
                    <QInput
                      theme={theme}
                      name="answer"
                      type="text"
                      placeholder="Type the correct answer here…"
                      value={formData.answer}
                      onChange={handleChange}
                      $hasError={!!error.answer}
                    />
                    {error.answer && <QError theme={theme}>{error.answer}</QError>}
                  </>
                ) : (
                  <>
                    <QAnswerDisplay theme={theme}>
                      {Array.isArray(formData.answer) && formData.answer.length > 0
                        ? formData.answer.map((a) => <span key={a} className="chip">{a}</span>)
                        : formData.answer
                          ? <span className="chip">{formData.answer}</span>
                          : <span className="hint">Select an option above</span>
                      }
                    </QAnswerDisplay>
                    {error.answer && <QError theme={theme}>{error.answer}</QError>}
                  </>
                )}
              </QField>

              {error.errorMessage && (
                <QError theme={theme}>{error.errorMessage}</QError>
              )}

            </QBody>

            {/* ── Footer ───────────────────────────────────────────── */}
            <QFooter theme={theme}>
              <QCancelBtn to={backTo} theme={theme}>
                <FaArrowLeft size={10} /> Cancel
              </QCancelBtn>
              <QSubmitBtn type="submit" theme={theme}>
                {isEdit ? 'Save Changes' : 'Add Question'}
              </QSubmitBtn>
            </QFooter>

          </QContainer>
        </form>

      </QPage>

      {show && (
        <Modal type={isEdit ? 'edit' : 'success'} title={error.message}>
          
        </Modal>
      )}
    </Layout>
  );
};

export default AddEditQuestionPage;
