
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../component/Layout'
import { apiGet, apiPost } from '../ApiServices/apiServices'
import { useNavigate, useParams } from 'react-router-dom'
import { ActionBar, BodyLayout, DiffBadge, ExamTitle, FreeTextArea, FreeTextInput, GlobalStyle, Legend, LegendDot, LegendRow, LoadWrap, MainPanel, NavBtn, OptionBox, OptionsGrid, PageWrapper, PaletteBtn, PaletteGrid, QLabel, QMeta, QTypeBadge, QuestionCard, QuestionText, ReviewBtn, RightControls, Sidebar, SideCard, SideTitle, Spinner, StatBox, StatLabel, StatsRow, StatVal, SubmitBtn, Timer, TopBar } from '../styles/ExamQuestionList_style'

import Modal from '../component/Modal'
import { toast } from 'sonner'

const DIFF_LABEL = { 1: 'Easy', 2: 'Easy', 3: 'Medium', 4: 'Hard', 5: 'Hard' }
const TYPE_LABEL = {
  SINGLE_CHOICE: 'Single Choice',
  MULTI_CHOICE: 'Multiple Choice',
  TRUE_FALSE: 'True / False',
  FILL_BLANKS: 'Fill in Blank',
  DETAILED_ANSWER: 'Detailed Answer',
}

function formatTime(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec < 10 ? '0' : ''}${sec}`
}

const ExamQuestionList = () => {
    const { examId, partyId } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState(null)
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // answers: { [questionId]: string | string[] }
  const [answers, setAnswers] = useState({})

  // palette status: { [pageNo]: 'unattempted'|'visited'|'answered'|'review'|'review-answered' }
  const [palette, setPalette] = useState({})

  // map pageNo → questionId (so palette can cross-reference answers)
  const [pageQidMap, setPageQidMap] = useState({})

  const [timeLeft, setTimeLeft] = useState(null)
  const [timerStarted, setTimerStarted] = useState(false)
  const [examName, setExamName] = useState('')
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const timerRef = useRef(null)

  // ── Fetch question ──
  const fetchQuestion = async (page) => {
    setLoading(true)
    try {
      const response = await apiGet(`/exam-question/get-exam-questions?examId=${examId}&pageNo=${page}`)
      setData(response)
      setTotalPages(response.totalPages ?? response.totalCount ?? 0)

      // record questionId for this page
      const qId = response.question?.questionId
      if (qId) {
        setPageQidMap(prev => ({ ...prev, [page]: qId }))
      }

      // mark as visited if not already answered or review
      setPalette(prev => {
        const cur = prev[page]
        if (!cur || cur === 'unattempted') return { ...prev, [page]: 'visited' }
        return prev
      })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchQuestion(pageNo) }, [pageNo])

  // ── Fetch exam details ──
  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await apiGet(`/exam/getexam/${examId}`)
        if (response?.examList) {
          if (response.examList.duration) {
            setTimeLeft(response.examList.duration * 60)
            setTimerStarted(true)
          }
          if (response.examList.examName) setExamName(response.examList.examName)
          // init palette
          const total = response.examList.totalQuestions || 0
          const init = {}
          for (let i = 1; i <= total; i++) init[i] = 'unattempted'
          setPalette(init)
          setTotalPages(total)
        }
      } catch (e) { console.error(e) }
    }
    fetchExamDetails()
  }, [examId])

  // ── Timer ──
  useEffect(() => {
    if (!timerStarted) return
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); handleFinalSubmit(); }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [timerStarted])

  // ── Save answer API ──
  const saveAnswer = async (questionId, answer) => {
    try {
      await apiPost('/answer/save-answer', { examId, partyId, questionId, answer })
    } catch (err) { console.error('Save failed', err) }
  }

  // ── Recompute palette status for current page ──
  const updatePaletteStatus = (page, qId, newAnswers, isReview) => {
    const ans = newAnswers[qId]
    const hasAnswer = ans !== undefined && ans !== '' && !(Array.isArray(ans) && ans.length === 0)
    setPalette(prev => {
      const wasReview = prev[page] === 'review' || prev[page] === 'review-answered'
      const nowReview = isReview !== undefined ? isReview : wasReview
      if (nowReview && hasAnswer) return { ...prev, [page]: 'review-answered' }
      if (nowReview)              return { ...prev, [page]: 'review' }
      if (hasAnswer)              return { ...prev, [page]: 'answered' }
      return { ...prev, [page]: 'visited' }
    })
  }

  // ── Handlers ──
  const handleOptionChange = (option) => {
    const qId = data.question.questionId
    const next = { ...answers, [qId]: option }
    setAnswers(next)
    updatePaletteStatus(pageNo, qId, next, undefined)
  }

  const handleMultiChoiceChange = (option, checked) => {
    const qId = data.question.questionId
    setAnswers(prev => {
      const cur = Array.isArray(prev[qId]) ? [...prev[qId]] : []
      const updated = checked ? [...cur, option] : cur.filter(a => a !== option)
      const next = { ...prev, [qId]: updated }
      updatePaletteStatus(pageNo, qId, next, undefined)
      return next
    })
  }

  const handleTextChange = (text) => {
    const qId = data.question.questionId
    const next = { ...answers, [qId]: text }
    setAnswers(next)
    updatePaletteStatus(pageNo, qId, next, undefined)
  }

  const handleMarkReview = () => {
    const qId = data.question.questionId
    setPalette(prev => {
      const cur = prev[pageNo]
      const isReview = cur !== 'review' && cur !== 'review-answered'
      const hasAnswer = answers[qId] !== undefined && answers[qId] !== '' &&
        !(Array.isArray(answers[qId]) && answers[qId].length === 0)
      if (!isReview) {
        // un-mark review
        return { ...prev, [pageNo]: hasAnswer ? 'answered' : 'visited' }
      }
      return { ...prev, [pageNo]: hasAnswer ? 'review-answered' : 'review' }
    })
  }

  // ── Navigation ──
  const goToPage = async (page) => {
    // save current answer before navigating
    if (data) {
      const qId = data.question.questionId
      const selected = answers[qId]
      if (selected !== undefined) {
        const formatted = Array.isArray(selected) ? selected.join(',') : selected
        await saveAnswer(qId, formatted)
      }
    }
    setPageNo(page)
  }

  const handleNext = () => { if (data?.hasNext) goToPage(pageNo + 1) }
  const handlePrevious = () => { if (data?.hasPrevious) goToPage(pageNo - 1) }

  // ── Submit ──
  const handleFinalSubmit = async () => {

    if (data) {
    const qId = data.question.questionId
    const selected = answers[qId]
    if (selected !== undefined) {
      const formatted = Array.isArray(selected) ? selected.join(',') : selected
      await saveAnswer(qId, formatted)
    }
  }
    try {
      const response = await apiPost('/submit-exam/submit-exam', { examId, partyId })
      if (response.responseMessage === 'SUCCESS') {
        setShowSubmitModal(false)
        navigate(`/exam-result/${examId}/${partyId}`)
      } else {
        setShowSubmitModal(false)
        toast.error('Error submitting exam', { position: 'top-center' })
      }
    } catch (e) {
      console.error(e)
      toast.error('Submission error', { position: 'top-center' })
    }
  }

  // ── Derived stats ──
  const paletteValues = Object.values(palette)
  const answeredCount     = paletteValues.filter(s => s === 'answered' || s === 'review-answered').length
  const visitedCount      = paletteValues.filter(s => s === 'visited').length
  const reviewCount       = paletteValues.filter(s => s === 'review' || s === 'review-answered').length
  const unattemptedCount  = paletteValues.filter(s => s === 'unattempted').length

  const q = data?.question
  const timerDanger = timeLeft !== null && timeLeft < 60
  const timerWarn   = timeLeft !== null && timeLeft >= 60 && timeLeft < 180
  const isReviewMarked = palette[pageNo] === 'review' || palette[pageNo] === 'review-answered'

  return (
    <>
      <GlobalStyle/>
      <Layout>
        <PageWrapper>
          {/* ── Top Bar ── */}
          <TopBar>
            <ExamTitle>{examName || 'Loading exam...'}</ExamTitle>
            <RightControls>
              <Timer $danger={timerDanger} $warn={timerWarn}>
                ⏱ {timeLeft !== null ? formatTime(timeLeft) : '--:--'}
              </Timer>
              <SubmitBtn onClick={() => setShowSubmitModal(true)}>
                Submit Exam
              </SubmitBtn>
            </RightControls>
          </TopBar>

          <BodyLayout>
            {/* ── Main ── */}
            <MainPanel>
              {loading && !q ? (
                <LoadWrap>
                  <Spinner />
                  <span style={{ fontSize: 14, color: '#9ca3af' }}>Loading question...</span>
                </LoadWrap>
              ) : q ? (
                <>
                  <QuestionCard style={{ opacity: loading ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                    <QMeta>
                      <QLabel>Question {pageNo} of {totalPages}</QLabel>
                      {q.questionTypeId && (
                        <QTypeBadge $type={q.questionTypeId}>
                          {TYPE_LABEL[q.questionTypeId] || q.questionTypeId}
                        </QTypeBadge>
                      )}
                      {q.difficultyLevel && (
                        <DiffBadge $lvl={q.difficultyLevel}>
                          {DIFF_LABEL[q.difficultyLevel]}
                        </DiffBadge>
                      )}
                      {q.answerValue > 0 && (
                        <span style={{ fontSize: 11, background: '#f0fdf4', color: '#16a34a', padding: '3px 9px', borderRadius: 6, fontWeight: 600 }}>
                          +{Number(q.answerValue).toFixed(1)} pts
                        </span>
                      )}
                      {q.negativeMarkValue > 0 && (
                        <span style={{ fontSize: 11, background: '#fef2f2', color: '#dc2626', padding: '3px 9px', borderRadius: 6, fontWeight: 600 }}>
                          -{Number(q.negativeMarkValue).toFixed(1)} neg
                        </span>
                      )}
                    </QMeta>

                    <QuestionText>{q.questionDetail}</QuestionText>

                    {/* SINGLE CHOICE*/}
                    {(!q.questionTypeId || q.questionTypeId === 'SINGLE_CHOICE' ) && (
                      <OptionsGrid>
                        {['A', 'B', 'C', 'D'].map(opt => {
                          const txt = q[`option${opt}`]
                          if (!txt) return null
                          const sel = answers[q.questionId] === opt
                          return (
                            <OptionBox key={opt} $selected={sel} as="label">
                              <input type="radio" checked={sel} onChange={() => handleOptionChange(opt)} />
                              <div className="opt-letter">{opt}</div>
                              <div className="opt-text">{txt}</div>
                            </OptionBox>
                          )
                        })}
                      </OptionsGrid>
                    )}

                    {q.questionTypeId === 'TRUE_FALSE' && (
                        <OptionsGrid>
                          {[{ opt: 'A', label: 'True' }, { opt: 'B', label: 'False' }].map(({ opt, label }) => {
                          const txt = q[`option${opt}`]
                          if (!txt) return null
                          const sel = answers[q.questionId] === opt
                          return (
                          <OptionBox key={opt} $selected={sel} as="label">
                          <input type="radio" checked={sel} onChange={() => handleOptionChange(opt)} />
                          <div className="opt-letter">{label}</div>
                          <div className="opt-text">{txt}</div>
                          </OptionBox>
                           )
                     })}
                    </OptionsGrid>
                    )}

                    {/* MULTI */}
                    {q.questionTypeId === 'MULTI_CHOICE' && (
                      <OptionsGrid>
                        {['A', 'B', 'C', 'D'].map(opt => {
                          const txt = q[`option${opt}`]
                          if (!txt) return null
                          const checked = Array.isArray(answers[q.questionId]) && answers[q.questionId].includes(opt)
                          return (
                            <OptionBox key={opt} $selected={checked} as="label">
                              <input type="checkbox" checked={checked} onChange={e => handleMultiChoiceChange(opt, e.target.checked)} />
                              <div className="opt-letter">{opt}</div>
                              <div className="opt-text">{txt}</div>
                            </OptionBox>
                          )
                        })}
                      </OptionsGrid>
                    )}

                    {/* FILL BLANK */}
                    {q.questionTypeId === 'FILL_BLANKS' && (
                      <FreeTextInput
                        type="text"
                        placeholder="Type your answer here..."
                        value={answers[q.questionId] || ''}
                        onChange={e => handleTextChange(e.target.value)}
                      />
                    )}

                    {/* DETAILED */}
                    {q.questionTypeId === 'DETAILED_ANSWER' && (
                      <FreeTextArea
                        placeholder="Type your detailed answer here..."
                        value={answers[q.questionId] || ''}
                        onChange={e => handleTextChange(e.target.value)}
                      />
                    )}
                  </QuestionCard>

                  {/* ── Action bar ── */}
                  <ActionBar>
                    <NavBtn onClick={handlePrevious} disabled={!data?.hasPrevious}>
                      ← Previous
                    </NavBtn>

                    <ReviewBtn $active={isReviewMarked} onClick={handleMarkReview}>
                      {isReviewMarked ? '🔖 Marked for Review' : '🔖 Mark for Review'}
                    </ReviewBtn>

                    <NavBtn $primary onClick={handleNext} disabled={!data?.hasNext}>
                      Next →
                    </NavBtn>
                  </ActionBar>
                </>
              ) : null}
            </MainPanel>

            {/* ── Sidebar ── */}
            <Sidebar>
              {/* Stats */}
              <SideCard>
                <SideTitle>Progress</SideTitle>
                <StatsRow>
                  <StatBox $bg="#f0fdf4" $border="#bbf7d0">
                    <StatVal $color="#16a34a">{answeredCount}</StatVal>
                    <StatLabel>Answered</StatLabel>
                  </StatBox>
                  <StatBox $bg="#fef3c7" $border="#fde68a">
                    <StatVal $color="#d97706">{reviewCount}</StatVal>
                    <StatLabel>Review</StatLabel>
                  </StatBox>
                  <StatBox $bg="#fee2e2" $border="#fca5a5">
                    <StatVal $color="#dc2626">{visitedCount}</StatVal>
                    <StatLabel>Visited</StatLabel>
                  </StatBox>
                  <StatBox $bg="#f3f4f6" $border="#e5e7eb">
                    <StatVal $color="#6b7280">{unattemptedCount}</StatVal>
                    <StatLabel>Not Visited</StatLabel>
                  </StatBox>
                </StatsRow>
              </SideCard>

              {/* Palette */}
              <SideCard>
                <SideTitle>Question Palette</SideTitle>
                <PaletteGrid>
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pg = i + 1
                    const status = palette[pg] || 'unattempted'
                    return (
                      <PaletteBtn
                        key={pg}
                        $status={status}
                        $current={pg === pageNo}
                        onClick={() => goToPage(pg)}
                        title={`Q${pg} — ${status}`}
                      >
                        {pg}
                      </PaletteBtn>
                    )
                  })}
                </PaletteGrid>
              </SideCard>

              {/* Legend */}
              <SideCard>
                <SideTitle>Legend</SideTitle>
                <Legend>
                  <LegendRow>
                    <LegendDot $bg="#dcfce7" $border="#86efac" />
                    Answered
                  </LegendRow>
                  <LegendRow>
                    <LegendDot $bg="#fee2e2" $border="#fca5a5" />
                    Visited, not answered
                  </LegendRow>
                  <LegendRow>
                    <LegendDot $bg="#fef3c7" $border="#fcd34d" />
                    Marked for review
                  </LegendRow>
                  <LegendRow>
                    <div style={{ width: 14, height: 14, borderRadius: 4, background: 'linear-gradient(135deg,#fef3c7 50%,#dcfce7 50%)', border: '1.5px solid #fcd34d', flexShrink: 0 }} />
                    Review + Answered
                  </LegendRow>
                  <LegendRow>
                    <LegendDot $bg="#f3f4f6" $border="#e5e7eb" />
                    Not visited
                  </LegendRow>
                </Legend>
              </SideCard>
            </Sidebar>
          </BodyLayout>
        </PageWrapper>

        {/* ── Submit modal ── */}
        {showSubmitModal && (
          <Modal
            title="Confirm Submit"
            onConfirm={handleFinalSubmit}
            onCancel={() => setShowSubmitModal(false)}
            showConfirmButton={true}
          >
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ fontSize: 15, color: '#374151', marginBottom: 16 }}>
                Are you sure you want to submit the exam?
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                {[
                  { label: 'Answered',   val: answeredCount,    color: '#16a34a', bg: '#f0fdf4' },
                  { label: 'Review',     val: reviewCount,      color: '#d97706', bg: '#fef3c7' },
                  { label: 'Not Done',   val: unattemptedCount + visitedCount, color: '#dc2626', bg: '#fef2f2' },
                ].map(s => (
                  <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: '10px 18px', textAlign: 'center', minWidth: 70 }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: s.color, fontFamily: 'Fira Code, monospace' }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        )}
      </Layout>
    </>
  )
}

export default ExamQuestionList
