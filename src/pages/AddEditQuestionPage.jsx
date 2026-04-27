import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'sonner';

import Layout from '../component/Layout';
import Modal from '../component/Modal';
import SingleChoice from '../component/SingleChoice';
import MultiChoice from '../component/MultiChoice';
import TrueOrFalse from '../component/TrueOrFalse';
import { validateQuestion } from '../validation/ValidationUtil';
import { apiGet, apiPost, apiPut } from '../ApiServices/apiServices';
import { ErrorMessage } from '../styles/form_style';
import { LabelContainer, FormLabel, FormInput, FieldContainer } from '../styles/form_style';

import {
  QFormWrap, QFormConfigPanel, QFormConfigGroup, QFormConfigLabel,
  QFormConfigSelect, QFormTopicBadge, QFormBody, QFormLeft, QFormRight,
  QFormSectionLabel, QFormOptionsBox, QFormOptionsSectionLabel,
  QFormDisclaimer, QFormTextarea, QFormActions, QFormSubmitBtn, QFormCancelBtn,
  FBackBtn, FRow, FField, FLabel, FInput, FError,
} from '../styles/formPage_style';

const AddEditQuestionPage = () => {
  const { theme }  = useSelector((state) => state.themeReducer);
  const { id }     = useParams();           // questionId (edit mode)
  const location   = useLocation();
  const navigate   = useNavigate();
  const isEdit     = id !== undefined;
  const partyId = useSelector((state) => state.userReducer.partyId);
  const topicId   = location.state?.topicId;
  const topicName = location.state?.topicName;

  const [questionType,    setQuestionType]    = useState('SINGLE_CHOICE');
  const [difficultyLevel, setDifficultyLevel] = useState('1');
  const [topicList,       setTopicList]       = useState([]);
  const [show,            setShow]            = useState(false);
  const [error,           setError]           = useState({});

  const [formData, setFormData] = useState({
    topicId:          topicId || '',
    questionDetail:   '',
    optionA: '', optionB: '', optionC: '', optionD: '',
    answer:           '',
    numAnswers:       1,
    questionTypeId:   'SINGLE_CHOICE',
    difficultyLevel:  '1',
    answerValue:      1,
    negativeMarkValue: 0,
    partyId:partyId,
  });

  console.log('AddEditQuestion',formData);
  

  // ── Fetch question data (edit mode) ──────────────────────────────────────
  useEffect(() => {
    if (!isEdit) return;
    const fetch = async () => {
      const res = await apiGet('/question/getquestion-by-id?questionId=' + id);
      const q   = res.question;
      console.log('Question',q.answer);
      
      setFormData({
        questionDetail:   q.questionDetail,
        optionA: q.optionA, optionB: q.optionB,
        optionC: q.optionC, optionD: q.optionD,
        answer:           q.answer,
        numAnswers:       q.numAnswers,
        answerValue:      q.answerValue,
        negativeMarkValue: q.negativeMarkValue,
        questionTypeId:   q.questionTypeId,
        difficultyLevel:  q.difficultyLevel,
      });
      setQuestionType(q.questionTypeId);
      setDifficultyLevel(q.difficultyLevel);
    };
    fetch();
  }, []);

  // ── Fetch topic list (when no topicName passed) ──────────────────────────
  useEffect(() => {
    if (topicName) return;
    const fetch = async () => {
      const res = await apiGet('/topic/getall-topic/'+partyId);
      setTopicList(res.topicList || []);
    };
    fetch();
  }, []);

  // ── Sync questionType → formData ─────────────────────────────────────────
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      answer:         questionType === 'MULTI_CHOICE' ? [] : '',
      questionTypeId: questionType,
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

  const handleTopic = (value) => setFormData((prev) => ({ ...prev, topicId: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateQuestion(formData);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (isEdit) {
      const res = await apiPut('/question/update-question', { ...formData, questionId: id, topicId });
      if (res.errorMessage)   { setError(res); toast.error(res.errorMessage, { position: 'top-center' }); }
      if (res.successMessage) { setError(res); setShow(true); }
    } else {
      const res = await apiPost('/question/create-question', formData);
      if (res.errorMessage)   { setError(res); toast.error(res.errorMessage, { position: 'top-center' }); }
      if (res.successMessage) { setError(res); setShow(true) }
    }
  };

  // ── Back destination ──────────────────────────────────────────────────────
  const backTo = topicId ? `/question/${topicId}` : '/questionList';

  return (
    
      <Layout>
        <QFormWrap>

          {/* ── Config bar ─────────────────────────────────────────────── */}
          <QFormConfigPanel>

            {/* Topic */}
            <QFormConfigGroup>
              <QFormConfigLabel>Topic</QFormConfigLabel>
              {topicName
                ? <QFormTopicBadge>{topicName}</QFormTopicBadge>
                : (
                  <QFormConfigSelect
                    value={formData.topicId}
                    onChange={(e) => handleTopic(e.target.value)}
                    $minWidth="200px"
                  >
                    <option value="">Select topic</option>
                    {topicList.map((t) => (
                      <option key={t.topicId} value={t.topicId}>{t.topicName}</option>
                    ))}
                  </QFormConfigSelect>
                )}
            </QFormConfigGroup>

            {/* Question type */}
            <QFormConfigGroup>
              <QFormConfigLabel>Question Type</QFormConfigLabel>
              <QFormConfigSelect
                value={questionType}
                onChange={(e) => { setQuestionType(e.target.value); setError({}); }}
                $minWidth="190px"
              >
                <option value="SINGLE_CHOICE">Single Choice</option>
                <option value="MULTI_CHOICE">Multiple Choice</option>
                <option value="TRUE_FALSE">True / False</option>
                <option value="FILL_BLANKS">Fill in the Blanks</option>
                <option value="DETAILED_ANSWER">Detailed Answer</option>
              </QFormConfigSelect>
            </QFormConfigGroup>

            {/* Difficulty */}
            <QFormConfigGroup>
              <QFormConfigLabel>Difficulty</QFormConfigLabel>
              <QFormConfigSelect
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
                $minWidth="130px"
              >
                <option value="1">Easy</option>
                <option value="2">Medium</option>
                <option value="3">Hard</option>
              </QFormConfigSelect>
            </QFormConfigGroup>

          </QFormConfigPanel>

          {/* ── Main body ──────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit}>
            <QFormBody>

              {/* Left — question + options */}
              <QFormLeft>
                <QFormSectionLabel>
                  {isEdit ? 'Edit Question' : 'New Question'}
                </QFormSectionLabel>

                <FField>
                  <FLabel htmlFor="questionDetail">Question Content</FLabel>
                  <QFormTextarea
                    id="questionDetail"
                    name="questionDetail"
                    placeholder="Enter the full question text here…"
                    value={formData.questionDetail}
                    onChange={handleChange}
                  />
                  {error.questionDetail && <FError>{error.questionDetail}</FError>}
                </FField>

                <QFormOptionsBox>
                  <QFormOptionsSectionLabel>Answer Options</QFormOptionsSectionLabel>
                  {questionType === 'SINGLE_CHOICE' && (
                    <SingleChoice change={handleChange} error={error} data={formData} />
                  )}
                  {questionType === 'MULTI_CHOICE' && (
                    <MultiChoice change={handleChange} error={error} data={formData} />
                  )}
                  {questionType === 'TRUE_FALSE' && (
                    <TrueOrFalse
                      change={handleChange} error={error}
                      data={{ ...formData, optionA: 'TRUE', optionB: 'FALSE' }}
                    />
                  )}
                  {(questionType === 'FILL_BLANKS' || questionType === 'DETAILED_ANSWER') && (
                    <QFormDisclaimer>
                      No predefined options required for this question type.
                      Enter the correct answer in the scoring panel on the right.
                    </QFormDisclaimer>
                  )}
                </QFormOptionsBox>
              </QFormLeft>

              {/* Right — scoring */}
              <QFormRight>
                <QFormSectionLabel>Scoring &amp; Answer</QFormSectionLabel>

                <FField>
                  <FLabel>Correct Answer</FLabel>
                  <FInput
                    name="answer"
                    type="text"
                    placeholder="Enter correct answer"
                    value={formData.answer}
                    onChange={handleChange}
                    disabled={
                      questionType !== 'FILL_BLANKS' &&
                      questionType !== 'DETAILED_ANSWER'
                    }
                  />
                  {error.answer && <FError>{error.answer}</FError>}
                </FField>

                <FRow>
                  <FField>
                    <FLabel>Mark (+)</FLabel>
                    <FInput
                      name="answerValue"
                      type="number"
                      placeholder="1"
                      value={formData.answerValue}
                      onChange={handleChange}
                    />
                    {error.answerValue && <FError>{error.answerValue}</FError>}
                  </FField>

                  {/* <FField>
                    <FLabel>Negative (−)</FLabel>
                    <FInput
                      name="negativeMarkValue"
                      type="number"
                      placeholder="0"
                      value={formData.negativeMarkValue}
                      onChange={handleChange}
                    />
                    {error.negativeMarkValue && <FError>{error.negativeMarkValue}</FError>}
                  </FField> */}
                </FRow>

                {error.errorMessage && <FError>{error.errorMessage}</FError>}

                <QFormActions>
                  <QFormCancelBtn to={backTo}>
                    <FaArrowLeft size={10} /> Cancel
                  </QFormCancelBtn>
                  <QFormSubmitBtn type="submit">
                    {isEdit ? 'Save Changes' : 'Add Question'}
                  </QFormSubmitBtn>
                </QFormActions>
              </QFormRight>

            </QFormBody>
          </form>

        </QFormWrap>

        {show && (
          <Modal type={isEdit?'edit':'success'}>
            {error.successMessage}
          </Modal>
        )}
      </Layout>
   
  );
};

export default AddEditQuestionPage;
